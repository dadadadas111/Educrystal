import { notFound } from "next/navigation";

import { CourseOverview } from "@/components/course/course-overview";
import { getCourseBySlug, getCourses } from "@/lib/courses";

type ProgramDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CourseOverview course={course} />;
}
