import { CourseDataTable } from "@/components/admin/course-data-table";
import { UserCourseTable } from "@/components/admin/user-course-table";
import { UserTable } from "@/components/admin/user-table";
import { listAdminCourses, listAdminUserCourses, listAdminUsers } from "@/lib/course-admin";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const [courses, users, userCourses] = await Promise.all([
    listAdminCourses(),
    listAdminUsers(),
    listAdminUserCourses(),
  ]);

  return (
    <div className="space-y-6">
      <section className="playful-stage grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Admin</p>
          <h1 className="mt-2 font-display text-4xl leading-[0.95] text-slate-900">Bảng điều phối nội dung Educrystal</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Từ đây bạn có thể biên tập khóa học, theo dõi người dùng và xem trạng thái học tập thực tế mà không phải mò qua nhiều route rời rạc.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="metric-tile">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Khóa học</p>
            <p className="mt-2 font-display text-4xl text-slate-900">{courses.length}</p>
            <p className="mt-1 text-sm text-slate-500">{courses.filter((course) => course.published).length} khóa đang hiển thị</p>
          </div>
          <div className="metric-tile">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Người dùng</p>
            <p className="mt-2 font-display text-4xl text-slate-900">{users.length}</p>
            <p className="mt-1 text-sm text-slate-500">{users.filter((user) => user.isAdmin).length} tài khoản admin</p>
          </div>
          <div className="metric-tile">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Tiến độ</p>
            <p className="mt-2 font-display text-4xl text-slate-900">{userCourses.length}</p>
            <p className="mt-1 text-sm text-slate-500">Lượt theo dõi khóa học đang lưu</p>
          </div>
        </div>
      </section>

      <CourseDataTable courses={courses} />

      <div className="grid gap-6 xl:grid-cols-2">
        <UserTable users={users} />
        <UserCourseTable rows={userCourses} />
      </div>
    </div>
  );
}
