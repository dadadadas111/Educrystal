import type { Course } from "@/data/courses";

type CourseCoverProps = {
  course: Course;
  className?: string;
};

export function CourseCover({ course, className }: CourseCoverProps) {
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
        <img src={course.coverImage} alt={course.whatYouMake} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
