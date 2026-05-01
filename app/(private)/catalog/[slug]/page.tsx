import { notFound } from "next/navigation";

import { CourseOverview } from "@/components/course/course-overview";
import { getCourseBySlug } from "@/lib/courses";
import { getUserAppState } from "@/lib/user-state";

type ProgramDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const { slug } = await params;
  const [course, initialState] = await Promise.all([getCourseBySlug(slug), getUserAppState()]);

  if (!course) {
    notFound();
  }

  return <CourseOverview course={course} initialState={initialState} />;
}
