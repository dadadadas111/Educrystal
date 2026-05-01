import { notFound } from "next/navigation";

import { CourseFormEditor } from "@/components/admin/course-form-editor";
import { getAdminCourseBySlug } from "@/lib/course-admin";

type EditAdminCoursePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EditAdminCoursePage({ params }: EditAdminCoursePageProps) {
  const { slug } = await params;
  const course = await getAdminCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CourseFormEditor mode="edit" initialCourse={course} sourceSlug={slug} />;
}
