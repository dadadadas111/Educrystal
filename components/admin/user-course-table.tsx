import type { AdminUserCourseRow } from "@/lib/course-admin";
import { EmptyStatePanel } from "@/components/admin/status-empty-states";

type UserCourseTableProps = {
  rows: AdminUserCourseRow[];
};

export function UserCourseTable({ rows }: UserCourseTableProps) {
  const activeLearners = new Set(rows.map((row) => row.userId)).size;
  const courseCount = new Set(rows.map((row) => row.courseSlug)).size;

  if (rows.length === 0) {
    return (
      <EmptyStatePanel
        eyebrow="Tiến độ học"
        title="Chưa có ai bắt đầu khóa học"
        description="Ngay khi có phụ huynh hoặc trẻ mở khóa học, tiến độ từng người theo từng khóa sẽ xuất hiện tại đây."
        tone="rose"
        highlights={["Bảng này phản ánh active step và số bước đã hoàn thành", "Phù hợp để kiểm tra nhanh học viên đang dừng ở đâu"]}
      />
    );
  }

  return (
    <div className="panel-soft section-glow overflow-hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Tiến độ học</p>
          <h2 className="mt-2 font-display text-3xl text-slate-900">Trạng thái người dùng theo khóa</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-600">{rows.length} lượt theo dõi</span>
          <span className="rounded-full bg-accent-soft px-3 py-2 text-slate-900">{activeLearners} người dùng</span>
          <span className="rounded-full bg-gold/20 px-3 py-2 text-amber-900">{courseCount} khóa có dữ liệu</span>
        </div>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3 text-sm text-slate-600">
          <thead>
            <tr className="text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              <th className="px-3 py-2">Người dùng</th>
              <th className="px-3 py-2">Khóa học</th>
              <th className="px-3 py-2">Bước hiện tại</th>
              <th className="px-3 py-2">Đã xong</th>
              <th className="px-3 py-2">Cập nhật</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.userId}-${row.courseSlug}`} className="list-card align-top transition-transform hover:-translate-y-0.5">
                <td className="min-w-[210px] px-3 py-3 font-semibold text-slate-900">{row.email ?? row.userId}</td>
                <td className="px-3 py-3">
                  <p className="font-semibold text-slate-900">{row.courseTitle}</p>
                  <p className="mt-1 text-xs text-slate-500">/{row.courseSlug}</p>
                </td>
                <td className="px-3 py-3">Bước {row.activeStepIndex + 1}</td>
                <td className="px-3 py-3">
                  <p className="font-semibold text-slate-900">{row.completedStepsCount} bước</p>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/75">
                    <div className="h-2 rounded-full bg-gradient-to-r from-gold via-accent to-sky" style={{ width: `${Math.min(100, row.completedStepsCount * 20)}%` }} />
                  </div>
                </td>
                <td className="px-3 py-3 text-xs text-slate-500">{new Date(row.updatedAt).toLocaleString("vi-VN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
