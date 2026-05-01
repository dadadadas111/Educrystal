import Link from "next/link";

import type { Course } from "@/data/courses";
import { EmptyStatePanel } from "@/components/admin/status-empty-states";

type AdminTableCourse = Course & {
  youtubeUrl?: string;
  published?: boolean;
};

type CourseDataTableProps = {
  courses: AdminTableCourse[];
};

const accentBadgeClasses: Record<Course["accent"], string> = {
  sky: "bg-sky/20 text-sky-900",
  rose: "bg-rose/20 text-rose-900",
  gold: "bg-gold/20 text-amber-900",
};

export function CourseDataTable({ courses }: CourseDataTableProps) {
  const publishedCount = courses.filter((course) => course.published).length;
  const draftCount = courses.length - publishedCount;
  const totalSteps = courses.reduce((sum, course) => sum + course.steps.length, 0);

  if (courses.length === 0) {
    return (
      <EmptyStatePanel
        eyebrow="Khóa học"
        title="Chưa có khóa nào trong khu quản trị"
        description="Tạo khóa đầu tiên để catalog có nội dung thật."
        action={
          <Link
            href="/admin/courses/new"
            className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-soft"
          >
            Tạo khóa đầu tiên
          </Link>
        }
      />
    );
  }

  return (
    <div className="panel-soft section-glow overflow-hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Khóa học</p>
          <h2 className="mt-2 font-display text-3xl text-slate-900">Bảng quản lý khóa học</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Xem và sửa khóa học từ một nơi.</p>
        </div>
        <Link href="/admin/courses/new" className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-soft">
          Tạo khóa mới
        </Link>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="metric-tile">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Tổng khóa</p>
          <p className="mt-2 font-display text-4xl text-slate-900">{courses.length}</p>
          <p className="mt-1 text-sm text-slate-500">{totalSteps} bước học đang được quản lý</p>
        </div>
        <div className="metric-tile">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Đang hiển thị</p>
          <p className="mt-2 font-display text-4xl text-slate-900">{publishedCount}</p>
          <p className="mt-1 text-sm text-slate-500">Có mặt trên catalog công khai</p>
        </div>
        <div className="metric-tile">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Bản nháp</p>
          <p className="mt-2 font-display text-4xl text-slate-900">{draftCount}</p>
          <p className="mt-1 text-sm text-slate-500">Đang chờ hoàn thiện nội dung hoặc media</p>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              <th className="px-3 py-2">Khóa học</th>
              <th className="px-3 py-2">Slug</th>
              <th className="px-3 py-2">Bước</th>
              <th className="px-3 py-2">Trạng thái</th>
              <th className="px-3 py-2">Media</th>
              <th className="px-3 py-2 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.slug} className="list-card align-top text-sm text-slate-600 transition-transform hover:-translate-y-0.5">
                <td className="min-w-[250px] px-3 py-3">
                  <div className="flex gap-3">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-[1.35rem] border-2 border-outline bg-white shadow-soft">
                      <img src={course.coverImage} alt={course.whatYouMake} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900">{course.title}</p>
                      <p className="mt-1 leading-6">{course.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">{course.level}</span>
                        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-900">{course.duration}</span>
                        <span className="rounded-full bg-sky-100 px-2.5 py-1 text-sky-900">{course.ageBand}</span>
                        <span className={`rounded-full px-2.5 py-1 ${accentBadgeClasses[course.accent]}`}>{course.accent}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 align-top font-mono text-xs text-slate-500">/{course.slug}</td>
                <td className="px-3 py-3 align-top">
                  <p className="font-semibold text-slate-900">{course.steps.length} bước</p>
                  <p className="mt-1 text-xs text-slate-500">{course.steps.filter((step) => step.kind === "wait").length} bước chờ</p>
                  <p className="mt-2 text-xs text-slate-500">{course.preparation.tools.length} tools · {course.preparation.ingredients.length} ingredients</p>
                </td>
                <td className="px-3 py-3 align-top">
                  <span className={course.published ? "rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-slate-900" : "rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500"}>
                    {course.published ? "Đang hiển thị" : "Bản nháp"}
                  </span>
                </td>
                <td className="px-3 py-3 align-top">
                  <p className="font-semibold text-slate-900">{course.coverImage ? "Có ảnh bìa" : "Thiếu ảnh bìa"}</p>
                  <p className="mt-1 text-xs text-slate-500">{course.youtubeUrl ? "Có video YouTube" : "Chưa gắn video"}</p>
                  <p className="mt-2 text-xs text-slate-500">{course.steps.filter((step) => step.media?.src).length}/{course.steps.length} bước có media</p>
                </td>
                <td className="px-3 py-3 text-right align-top">
                  <div className="flex flex-col items-end gap-2">
                    <Link href={`/admin/courses/${course.slug}`} className="inline-flex rounded-full border-2 border-outline bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-soft">
                      Chỉnh sửa
                    </Link>
                    <Link href={`/catalog/${course.slug}`} className="text-xs font-semibold text-slate-500 underline-offset-2 hover:underline">
                      Xem trang khóa học
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
