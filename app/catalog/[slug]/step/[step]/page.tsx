import { notFound } from "next/navigation";

import { CourseStepPlayer } from "@/components/course/course-step-player";
import { getCourseBySlug, getCourses } from "@/lib/courses";

type CourseStepPageProps = {
  params: Promise<{
    slug: string;
    step: string;
  }>;
};

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.flatMap((course) => course.steps.map((step) => ({ slug: course.slug, step: String(step.order - 1) })));
}

export default async function CourseStepPage({ params }: CourseStepPageProps) {
  const { slug, step } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const stepIndex = Number(step);
  const currentStep = course.steps[stepIndex];

  if (!Number.isInteger(stepIndex) || !currentStep) {
    notFound();
  }

  return <CourseStepPlayer course={course} stepIndex={stepIndex} />;
}
