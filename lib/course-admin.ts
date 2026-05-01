import "server-only";

import type { Course } from "@/data/courses";
import { requireCurrentUser } from "@/lib/auth";
import { ensureCourseCatalogSeeded } from "@/lib/course-seed";
import { denormalizeCourseAssetPath, normalizeCourseAssetPath } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";

type CourseRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  what_you_make: string;
  age_band: string;
  level: Course["level"];
  duration: string;
  cover_image: string;
  youtube_url: string | null;
  accent: Course["accent"];
  tools: Course["preparation"]["tools"];
  ingredients: Course["preparation"]["ingredients"];
  published: boolean;
};

type CourseStepRow = {
  course_id: string;
  order_index: number;
  title: string;
  body: string;
  kind: Course["steps"][number]["kind"];
  notes: string[];
  pass_criteria: string;
  wait_days: number | null;
  wait_hint: string | null;
  media_src: string | null;
  media_alt: string | null;
};

export type AdminUserRow = {
  id: string;
  email: string | null;
  displayName: string | null;
  ageBand: string | null;
  isAdmin: boolean;
  createdAt: string;
};

export type AdminUserCourseRow = {
  userId: string;
  email: string | null;
  courseSlug: string;
  courseTitle: string;
  activeStepIndex: number;
  completedStepsCount: number;
  updatedAt: string;
};

function mapCourses(courseRows: CourseRow[], stepRows: CourseStepRow[]): Course[] {
  return courseRows.map((course) => {
    return {
      id: course.id,
      slug: course.slug,
      title: course.title,
      summary: course.summary,
      whatYouMake: course.what_you_make,
      ageBand: course.age_band,
      level: course.level,
      duration: course.duration,
      coverImage: normalizeCourseAssetPath(course.cover_image),
      youtubeUrl: course.youtube_url ?? undefined,
      accent: course.accent,
      published: course.published,
      preparation: {
        tools: course.tools ?? [],
        ingredients: course.ingredients ?? [],
      },
      steps: stepRows
        .filter((step) => step.course_id === course.id)
        .sort((left, right) => left.order_index - right.order_index)
        .map((step) => ({
          order: step.order_index,
          title: step.title,
          body: step.body,
          kind: step.kind,
          notes: step.notes ?? [],
          passCriteria: step.pass_criteria,
          waitDays: step.wait_days ?? undefined,
          waitHint: step.wait_hint ?? undefined,
          media: step.media_src
            ? {
                kind: "image" as const,
                src: normalizeCourseAssetPath(step.media_src),
                alt: step.media_alt ?? step.title,
              }
            : undefined,
        })),
    };
  });
}

function validateCoursePayload(course: Course) {
  if (!course.slug || !course.title || !Array.isArray(course.steps) || course.steps.length === 0) {
    throw new Error("Invalid course payload");
  }

  if (course.steps[0]?.kind !== "prepare") {
    throw new Error("First step must be prepare");
  }
}

function toCourseRow(course: Course) {
  return {
    slug: course.slug,
    title: course.title,
    summary: course.summary,
    what_you_make: course.whatYouMake,
    age_band: course.ageBand,
    level: course.level,
    duration: course.duration,
    cover_image: denormalizeCourseAssetPath(course.coverImage),
    youtube_url: course.youtubeUrl ?? null,
    accent: course.accent,
    tools: course.preparation.tools,
    ingredients: course.preparation.ingredients,
    published: course.published ?? true,
  };
}

function toStepRows(courseId: string, course: Course) {
  return course.steps.map((step) => ({
    course_id: courseId,
    order_index: step.order,
    title: step.title,
    body: step.body,
    kind: step.kind,
    notes: step.notes ?? [],
    pass_criteria: step.passCriteria,
    wait_days: step.waitDays ?? null,
    wait_hint: step.waitHint ?? null,
    media_src: step.media?.src ? denormalizeCourseAssetPath(step.media.src) : null,
    media_alt: step.media?.alt ?? null,
  }));
}

export async function listAdminCourses() {
  await requireCurrentUser();

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  try {
    await ensureCourseCatalogSeeded(supabase);
  } catch (error) {
    console.error("[listAdminCourses] seed failed", error);
  }

  const [coursesResult, stepsResult] = await Promise.all([
    supabase.from("courses").select("id, slug, title, summary, what_you_make, age_band, level, duration, cover_image, youtube_url, accent, tools, ingredients, published").order("created_at", { ascending: true }),
    supabase.from("course_steps").select("course_id, order_index, title, body, kind, notes, pass_criteria, wait_days, wait_hint, media_src, media_alt").order("order_index", { ascending: true }),
  ]);

  if (coursesResult.error || stepsResult.error || !coursesResult.data || !stepsResult.data) {
    throw new Error(coursesResult.error?.message ?? stepsResult.error?.message ?? "Unable to load admin courses");
  }

  return mapCourses(coursesResult.data as CourseRow[], stepsResult.data as CourseStepRow[]);
}

export async function getAdminCourseBySlug(slug: string) {
  const courses = await listAdminCourses();
  return courses.find((course) => course.slug === slug) ?? null;
}

export async function createAdminCourse(course: Course) {
  await requireCurrentUser();
  validateCoursePayload(course);

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const { data: createdCourse, error: courseError } = await supabase
    .from("courses")
    .insert(toCourseRow(course))
    .select("id, slug, title, summary, what_you_make, age_band, level, duration, cover_image, youtube_url, accent, tools, ingredients, published")
    .single();

  if (courseError || !createdCourse) {
    throw new Error(courseError?.message ?? "Unable to create course");
  }

  const stepRows = toStepRows(createdCourse.id, course);

  if (stepRows.length > 0) {
    const { error: stepsError } = await supabase.from("course_steps").insert(stepRows);

    if (stepsError) {
      throw new Error(stepsError.message);
    }
  }

  return getAdminCourseBySlug(createdCourse.slug);
}

export async function updateAdminCourse(slug: string, course: Course) {
  await requireCurrentUser();
  validateCoursePayload(course);

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const { data: existing, error: existingError } = await supabase
    .from("courses")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existingError) {
    throw new Error(existingError.message);
  }

  if (!existing) {
    return null;
  }

  const { error: courseError } = await supabase.from("courses").update(toCourseRow(course)).eq("id", existing.id);

  if (courseError) {
    throw new Error(courseError.message);
  }

  const nextOrderIndexes = course.steps.map((step) => step.order);

  const { error: deleteError } = await supabase
    .from("course_steps")
    .delete()
    .eq("course_id", existing.id)
    .not("order_index", "in", `(${nextOrderIndexes.join(",") || "-1"})`);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  const { error: stepsError } = await supabase.from("course_steps").upsert(toStepRows(existing.id, course), {
    onConflict: "course_id,order_index",
  });

  if (stepsError) {
    throw new Error(stepsError.message);
  }

  return getAdminCourseBySlug(course.slug);
}

export async function deleteAdminCourse(slug: string) {
  await requireCurrentUser();

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const { error } = await supabase.from("courses").delete().eq("slug", slug);

  if (error) {
    throw new Error(error.message);
  }
}

export async function listAdminUsers(): Promise<AdminUserRow[]> {
  await requireCurrentUser();

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, display_name, age_band, is_admin, created_at")
    .order("created_at", { ascending: false });

  if (error || !data) {
    throw new Error(error?.message ?? "Unable to load users");
  }

  return data.map((row) => ({
    id: row.id,
    email: row.email,
    displayName: row.display_name,
    ageBand: row.age_band,
    isAdmin: row.is_admin,
    createdAt: row.created_at,
  }));
}

export async function listAdminUserCourses(): Promise<AdminUserCourseRow[]> {
  await requireCurrentUser();

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const [progressResult, profileResult, courseResult] = await Promise.all([
    supabase
      .from("course_progress")
      .select("user_id, course_id, active_step_index, completed_steps, updated_at")
      .order("updated_at", { ascending: false }),
    supabase.from("profiles").select("id, email"),
    supabase.from("courses").select("id, slug, title"),
  ]);

  if (progressResult.error || profileResult.error || courseResult.error || !progressResult.data || !profileResult.data || !courseResult.data) {
    throw new Error(progressResult.error?.message ?? profileResult.error?.message ?? courseResult.error?.message ?? "Unable to load user course state");
  }

  const profilesById = new Map(profileResult.data.map((profile) => [profile.id, profile.email]));
  const coursesById = new Map(courseResult.data.map((course) => [course.id, course]));

  return progressResult.data
    .map((row) => {
      const course = coursesById.get(row.course_id);

      if (!course) {
        return null;
      }

      return {
        userId: row.user_id,
        email: profilesById.get(row.user_id) ?? null,
        courseSlug: course.slug,
        courseTitle: course.title,
        activeStepIndex: row.active_step_index,
        completedStepsCount: row.completed_steps.length,
        updatedAt: row.updated_at,
      } satisfies AdminUserCourseRow;
    })
    .filter((value): value is AdminUserCourseRow => value !== null);
}
