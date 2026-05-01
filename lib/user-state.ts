import "server-only";

import { randomUUID } from "node:crypto";

import type { AppState, DiaryEntry, ReminderState } from "@/lib/progress";
import { createEmptyAppState } from "@/lib/progress";
import { createSupabaseServerClient } from "@/lib/supabase-server";

type CourseLookupRow = {
  id: string;
  slug: string;
  title: string;
};

type ProgressRow = {
  course_id: string;
  active_step_index: number;
  completed_steps: number[];
  updated_at: string;
};

type ReminderRow = {
  course_id: string;
  step_index: number;
  reminder_at: string;
  note: string;
};

type JournalRow = {
  id: string;
  title: string;
  body: string;
  course_id: string | null;
  course_slug: string | null;
  created_at: string;
};

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

async function getAuthenticatedContext() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return { supabase, user };
}

async function getCourseLookup(supabase: NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>) {
  const { data, error } = await supabase.from("courses").select("id, slug, title");

  if (error || !data) {
    return {
      byId: new Map<string, CourseLookupRow>(),
      bySlug: new Map<string, CourseLookupRow>(),
    };
  }

  const rows = data as CourseLookupRow[];

  return {
    byId: new Map(rows.map((row) => [row.id, row])),
    bySlug: new Map(rows.map((row) => [row.slug, row])),
  };
}

export async function getUserAppState(): Promise<AppState> {
  const context = await getAuthenticatedContext();

  if (!context) {
    return createEmptyAppState();
  }

  const { supabase, user } = context;
  const courseLookup = await getCourseLookup(supabase);

  const [progressResult, remindersResult, journalResult] = await Promise.all([
    supabase
      .from("course_progress")
      .select("course_id, active_step_index, completed_steps, updated_at")
      .eq("user_id", user.id),
    supabase
      .from("course_reminders")
      .select("course_id, step_index, reminder_at, note")
      .eq("user_id", user.id)
      .order("reminder_at", { ascending: true }),
    supabase
      .from("journal_entries")
      .select("id, title, body, course_id, course_slug, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  const state = createEmptyAppState();

  if (!progressResult.error && progressResult.data) {
    (progressResult.data as ProgressRow[]).forEach((row) => {
      const course = courseLookup.byId.get(row.course_id);

      if (!course) {
        return;
      }

      state.courses[course.slug] = {
        activeStepIndex: row.active_step_index,
        completedSteps: row.completed_steps ?? [],
        updatedAt: row.updated_at,
      };
    });
  }

  if (!remindersResult.error && remindersResult.data) {
    state.reminders = (remindersResult.data as ReminderRow[])
      .map((row) => {
        const course = courseLookup.byId.get(row.course_id);

        if (!course) {
          return null;
        }

        const reminder: ReminderState = {
          courseSlug: course.slug,
          stepIndex: row.step_index,
          reminderAt: row.reminder_at,
          note: row.note,
        };

        return reminder;
      })
      .filter((value): value is ReminderState => value !== null);
  }

  if (!journalResult.error && journalResult.data) {
    state.diaryEntries = (journalResult.data as JournalRow[]).map((row) => {
      const course = row.course_id ? courseLookup.byId.get(row.course_id) : undefined;

      const entry: DiaryEntry = {
        id: row.id,
        title: row.title,
        body: row.body,
        courseSlug: row.course_slug ?? course?.slug,
        courseTitle: course?.title,
        createdAt: row.created_at,
      };

      return entry;
    });
  }

  return state;
}

export async function saveCourseProgressForCurrentUser(input: {
  courseSlug: string;
  activeStepIndex: number;
  completedSteps: number[];
}) {
  const context = await getAuthenticatedContext();

  if (!context) {
    throw new Error("Unauthorized");
  }

  const { supabase, user } = context;
  const courseLookup = await getCourseLookup(supabase);
  const course = courseLookup.bySlug.get(input.courseSlug);

  if (!course) {
    throw new Error("Course not found");
  }

  const { error } = await supabase.from("course_progress").upsert(
    {
      user_id: user.id,
      course_id: course.id,
      active_step_index: input.activeStepIndex,
      completed_steps: input.completedSteps,
    },
    { onConflict: "user_id,course_id" },
  );

  if (error) {
    throw new Error(error.message);
  }
}

export async function replaceCourseRemindersForCurrentUser(input: {
  courseSlug: string;
  reminders: Array<{ stepIndex: number; reminderAt: string; note: string }>;
}) {
  const context = await getAuthenticatedContext();

  if (!context) {
    throw new Error("Unauthorized");
  }

  const { supabase, user } = context;
  const courseLookup = await getCourseLookup(supabase);
  const course = courseLookup.bySlug.get(input.courseSlug);

  if (!course) {
    throw new Error("Course not found");
  }

  const { error: deleteError } = await supabase
    .from("course_reminders")
    .delete()
    .eq("user_id", user.id)
    .eq("course_id", course.id);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  if (input.reminders.length === 0) {
    return;
  }

  const { error: insertError } = await supabase.from("course_reminders").insert(
    input.reminders.map((reminder) => ({
      user_id: user.id,
      course_id: course.id,
      step_index: reminder.stepIndex,
      reminder_at: reminder.reminderAt,
      note: reminder.note,
    })),
  );

  if (insertError) {
    throw new Error(insertError.message);
  }
}

export async function createDiaryEntryForCurrentUser(input: {
  id?: string;
  title: string;
  body: string;
  courseSlug?: string;
  createdAt?: string;
}) {
  const context = await getAuthenticatedContext();

  if (!context) {
    throw new Error("Unauthorized");
  }

  const { supabase, user } = context;
  const courseLookup = await getCourseLookup(supabase);
  const course = input.courseSlug ? courseLookup.bySlug.get(input.courseSlug) : undefined;

  const payload = {
    id: input.id && isUuid(input.id) ? input.id : randomUUID(),
    user_id: user.id,
    course_id: course?.id ?? null,
    course_slug: course?.slug ?? input.courseSlug ?? null,
    title: input.title,
    body: input.body,
    created_at: input.createdAt ?? new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("journal_entries")
    .upsert(payload, { onConflict: "id" })
    .select("id, title, body, created_at")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Unable to save diary entry");
  }

  return {
    id: data.id,
    title: data.title,
    body: data.body,
    courseSlug: course?.slug,
    courseTitle: course?.title,
    createdAt: data.created_at,
  } satisfies DiaryEntry;
}

export async function migrateLegacyAppStateForCurrentUser(legacyState: AppState) {
  const context = await getAuthenticatedContext();

  if (!context) {
    throw new Error("Unauthorized");
  }

  const { supabase, user } = context;
  const courseLookup = await getCourseLookup(supabase);

  const progressRows = Object.entries(legacyState.courses)
    .map(([slug, value]) => {
      const course = courseLookup.bySlug.get(slug);

      if (!course) {
        return null;
      }

      return {
        user_id: user.id,
        course_id: course.id,
        active_step_index: value.activeStepIndex,
        completed_steps: value.completedSteps,
        updated_at: value.updatedAt,
      };
    })
    .filter((value): value is NonNullable<typeof value> => value !== null);

  if (progressRows.length > 0) {
    const { error } = await supabase.from("course_progress").upsert(progressRows, {
      onConflict: "user_id,course_id",
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  const remindersByCourse = new Map<string, Array<{ step_index: number; reminder_at: string; note: string }>>();

  legacyState.reminders.forEach((reminder) => {
    const course = courseLookup.bySlug.get(reminder.courseSlug);

    if (!course) {
      return;
    }

    const current = remindersByCourse.get(course.id) ?? [];
    current.push({
      step_index: reminder.stepIndex,
      reminder_at: reminder.reminderAt,
      note: reminder.note,
    });
    remindersByCourse.set(course.id, current);
  });

  for (const [courseId, reminders] of remindersByCourse.entries()) {
    const { error: deleteError } = await supabase
      .from("course_reminders")
      .delete()
      .eq("user_id", user.id)
      .eq("course_id", courseId);

    if (deleteError) {
      throw new Error(deleteError.message);
    }

    if (reminders.length === 0) {
      continue;
    }

    const { error: insertError } = await supabase.from("course_reminders").insert(
      reminders.map((reminder) => ({
        user_id: user.id,
        course_id: courseId,
        step_index: reminder.step_index,
        reminder_at: reminder.reminder_at,
        note: reminder.note,
      })),
    );

    if (insertError) {
      throw new Error(insertError.message);
    }
  }

  if (legacyState.diaryEntries.length > 0) {
    const journalRows = legacyState.diaryEntries.map((entry) => {
      const course = entry.courseSlug ? courseLookup.bySlug.get(entry.courseSlug) : undefined;

      return {
        id: isUuid(entry.id) ? entry.id : randomUUID(),
        user_id: user.id,
        course_id: course?.id ?? null,
        course_slug: course?.slug ?? entry.courseSlug ?? null,
        title: entry.title,
        body: entry.body,
        created_at: entry.createdAt,
      };
    });

    const { error } = await supabase.from("journal_entries").upsert(journalRows, {
      onConflict: "id",
    });

    if (error) {
      throw new Error(error.message);
    }
  }
}
