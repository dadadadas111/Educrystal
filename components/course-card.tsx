import Link from "next/link";

import type { Course } from "@/data/courses";
import { CourseCover } from "@/components/course-cover";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/catalog/${course.slug}`} className="block rounded-[2rem] bg-white p-3 shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition-transform hover:-translate-y-0.5">
      <CourseCover course={course} />
      <div className="space-y-2 px-1 pb-1 pt-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="rounded-full bg-slate-100 px-2.5 py-1">{course.level}</span>
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-900">{course.duration}</span>
          <span className="rounded-full bg-sky-100 px-2.5 py-1 text-sky-800">{course.ageBand}</span>
        </div>
        <div>
          <h3 className="text-lg font-black leading-tight text-slate-900">{course.title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{course.summary}</p>
        </div>
      </div>
    </Link>
  );
}
