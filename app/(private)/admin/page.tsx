import Link from "next/link";

import { listAdminCourses } from "@/lib/course-admin";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const courses = await listAdminCourses();
  const publishedCount = courses.filter((course) => course.published).length;
  const firstCourse = courses[0];

  return (
    <div className="space-y-6">
      <section className="playful-stage grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Admin</p>
          <h1 className="mt-2 font-display text-4xl leading-[0.95] text-slate-900">Quản lý khóa học và nội dung</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Mở bảng khóa học để sửa ngay, hoặc tạo một khóa mới từ đúng schema đang chạy.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/admin/courses" className="inline-flex rounded-full border-2 border-outline bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-soft">
              Mở bảng quản trị
            </Link>
            <Link href="/admin/courses/new" className="inline-flex rounded-full border-2 border-outline bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-soft">
              Tạo khóa mới
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="metric-tile">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Khóa học</p>
            <p className="mt-2 font-display text-4xl text-slate-900">{courses.length}</p>
            <p className="mt-1 text-sm text-slate-500">Tổng số khóa trong DB</p>
          </div>
          <div className="metric-tile">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Đang hiển thị</p>
            <p className="mt-2 font-display text-4xl text-slate-900">{publishedCount}</p>
            <p className="mt-1 text-sm text-slate-500">Có thể thấy ở catalog</p>
          </div>
          <div className="metric-tile">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Sửa nhanh</p>
            <p className="mt-2 font-display text-4xl text-slate-900">{firstCourse ? "1 click" : "N/A"}</p>
            <p className="mt-1 text-sm text-slate-500">Mở course gần nhất</p>
          </div>
        </div>
      </section>

      <section className="panel-soft section-glow space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Lối tắt</p>
            <h2 className="mt-2 font-display text-3xl text-slate-900">Đi thẳng vào course gần nhất</h2>
          </div>
          <Link href="/admin/courses" className="text-sm font-semibold text-slate-500 underline-offset-2 hover:underline">
            Xem toàn bộ
          </Link>
        </div>

        {firstCourse ? (
          <Link href={`/admin/courses/${firstCourse.slug}`} className="list-card flex items-center justify-between gap-4 transition-transform hover:-translate-y-0.5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Course gần nhất</p>
              <h3 className="mt-2 text-lg font-black text-slate-900">{firstCourse.title}</h3>
              <p className="mt-1 text-sm text-slate-600">/{firstCourse.slug}</p>
            </div>
            <span className="rounded-full border-2 border-outline bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-soft">Chỉnh sửa</span>
          </Link>
        ) : (
          <div className="text-sm text-slate-500">Chưa có course nào. Tạo khóa đầu tiên để bắt đầu.</div>
        )}
      </section>
    </div>
  );
}
