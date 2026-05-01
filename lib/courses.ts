import type { Course } from "@/data/courses";
import { normalizeCourseAssetPath } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { ensureCourseCatalogSeeded } from "@/lib/course-seed";

type CourseRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  what_you_make: string;
  level: "Dễ" | "Vừa" | "Khó";
  duration: string;
  age_band: string;
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

function combineCourseData(courseRows: CourseRow[], stepRows: CourseStepRow[]): Course[] {
  return courseRows
    .filter((course) => course.published)
    .map((course) => {
      const mappedSteps = stepRows
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
        }));

      return {
        id: course.id,
        slug: course.slug,
        title: course.title,
        summary: course.summary,
        whatYouMake: course.what_you_make,
        level: course.level,
        duration: course.duration,
        ageBand: course.age_band,
        coverImage: normalizeCourseAssetPath(course.cover_image),
        youtubeUrl: course.youtube_url ?? undefined,
        accent: course.accent,
        published: course.published,
        preparation: {
          tools: course.tools ?? [],
          ingredients: course.ingredients ?? [],
        },
        steps: mappedSteps,
      };
    });
}

export async function getCourses(): Promise<Course[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  try {
    await ensureCourseCatalogSeeded(supabase);
  } catch (error) {
    console.error("[getCourses] seed failed", error);
  }

  let coursesResult;
  let stepsResult;

  try {
    [coursesResult, stepsResult] = await Promise.all([
      supabase.from("courses").select("id, slug, title, summary, what_you_make, level, duration, age_band, cover_image, youtube_url, accent, tools, ingredients, published"),
      supabase.from("course_steps").select("course_id, order_index, title, body, kind, notes, pass_criteria, wait_days, wait_hint, media_src, media_alt"),
    ]);
  } catch (error) {
    console.error("[getCourses] query failed", error);
    return [];
  }

  if (coursesResult.error || stepsResult.error || !coursesResult.data || !stepsResult.data) {
    console.error("[getCourses] query returned error", coursesResult.error ?? stepsResult.error);
    return [];
  }

  return combineCourseData(coursesResult.data as CourseRow[], stepsResult.data as CourseStepRow[]);
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  const courses = await getCourses();
  return courses.find((course) => course.slug === slug);
}
