import { getSeedCourseBySlug, seedCourses, type Course } from "@/data/courses";
import { createSupabaseBrowserClient, hasSupabaseConfig } from "@/lib/supabase";

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
  accent: Course["accent"];
  materials: string[];
  published: boolean;
};

type CourseStepRow = {
  course_id: string;
  order_index: number;
  title: string;
  body: string;
};

function combineCourseData(courseRows: CourseRow[], stepRows: CourseStepRow[]): Course[] {
  return courseRows
    .filter((course) => course.published)
    .map((course) => {
      const seed = getSeedCourseBySlug(course.slug);
      const mappedSteps = stepRows
        .filter((step) => step.course_id === course.id)
        .sort((left, right) => left.order_index - right.order_index)
        .map((step) => ({ order: step.order_index, title: step.title, body: step.body }));

      return {
        ...seed,
        slug: course.slug,
        title: course.title,
        summary: course.summary,
        whatYouMake: course.what_you_make,
        level: course.level,
        duration: course.duration,
        ageBand: course.age_band,
        coverImage: course.cover_image,
        accent: course.accent,
        materials: course.materials?.length ? course.materials : seed?.materials ?? [],
        steps: mappedSteps.length > 0 ? mappedSteps : seed?.steps ?? [],
      };
    });
}

export async function getCourses(): Promise<Course[]> {
  if (!hasSupabaseConfig()) {
    return seedCourses;
  }

  const supabase = createSupabaseBrowserClient();

  if (!supabase) {
    return seedCourses;
  }

  const [coursesResult, stepsResult] = await Promise.all([
    supabase.from("courses").select("id, slug, title, summary, what_you_make, level, duration, age_band, cover_image, accent, materials, published"),
    supabase.from("course_steps").select("course_id, order_index, title, body"),
  ]);

  if (coursesResult.error || stepsResult.error || !coursesResult.data || !stepsResult.data) {
    return seedCourses;
  }

  const combined = combineCourseData(coursesResult.data as CourseRow[], stepsResult.data as CourseStepRow[]);

  return combined.length > 0 ? combined : seedCourses;
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  const courses = await getCourses();
  return courses.find((course) => course.slug === slug) ?? getSeedCourseBySlug(slug);
}
