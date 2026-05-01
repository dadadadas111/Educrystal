import { seedCourses, type Course } from "@/data/courses";
import { denormalizeCourseAssetPath } from "@/lib/supabase";

type SeedCourseRow = {
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

let seedCourseCatalogPromise: Promise<boolean> | null = null;

function toCourseRow(course: Course): SeedCourseRow {
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

async function seedCourseCatalogIfEmpty(supabase: any) {
  const { data: existingCourses, error: existingError } = await supabase.from("courses").select("id");

  if (existingError) {
    throw new Error(existingError.message);
  }

  if ((existingCourses?.length ?? 0) > 0) {
    return false;
  }

  const { data: seededCourses, error: courseError } = await supabase
    .from("courses")
    .upsert(seedCourses.map(toCourseRow), { onConflict: "slug" })
    .select("id, slug");

  if (courseError || !seededCourses) {
    throw new Error(courseError?.message ?? "Unable to seed courses");
  }

  const courseIdBySlug = new Map<string, string>(
    seededCourses.map((course: { id: string; slug: string }) => [course.slug, course.id] as [string, string])
  );

  const stepRows = seedCourses.flatMap((course: Course) => {
    const courseId = courseIdBySlug.get(course.slug);

    if (!courseId) {
      return [];
    }

    return toStepRows(courseId, course);
  });

  if (stepRows.length === 0) {
    return true;
  }

  const { error: stepError } = await supabase.from("course_steps").upsert(stepRows, {
    onConflict: "course_id,order_index",
  });

  if (stepError) {
    throw new Error(stepError.message);
  }

  return true;
}

export function ensureCourseCatalogSeeded(supabase: any) {
  if (!seedCourseCatalogPromise) {
    seedCourseCatalogPromise = seedCourseCatalogIfEmpty(supabase).catch((error) => {
      seedCourseCatalogPromise = null;
      throw error;
    });
  }

  return seedCourseCatalogPromise;
}