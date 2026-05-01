import { notFound } from "next/navigation";

import { CourseStepPlayer } from "@/components/course/course-step-player";
import { getCourseBySlug } from "@/lib/courses";
import { getUserAppState } from "@/lib/user-state";

type CourseStepPageProps = {
  params: Promise<{
    slug: string;
    step: string;
  }>;
};

export default async function CourseStepPage({ params }: CourseStepPageProps) {
  const { slug, step } = await params;
  const [course, initialState] = await Promise.all([getCourseBySlug(slug), getUserAppState()]);

  if (!course) {
    notFound();
  }

  const stepIndex = Number(step);
  const currentStep = course.steps[stepIndex];

  if (!Number.isInteger(stepIndex) || !currentStep) {
    notFound();
  }

  return <CourseStepPlayer course={course} stepIndex={stepIndex} initialState={initialState} />;
}
