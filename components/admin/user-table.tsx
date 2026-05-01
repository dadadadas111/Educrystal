import type { AdminUserRow } from "@/lib/course-admin";
import { EmptyStatePanel } from "@/components/admin/status-empty-states";

type UserTableProps = {
  users: AdminUserRow[];
};

export function UserTable({ users }: UserTableProps) {
  const adminCount = users.filter((user) => user.isAdmin).length;
  const configuredProfiles = users.filter((user) => user.displayName || user.ageBand).length;

  if (users.length === 0) {
    return (
      <EmptyStatePanel
        eyebrow="Người dùng"
        title="Chưa có hồ sơ người dùng"
        description="Khi phụ huynh đăng nhập, hồ sơ sẽ hiện ở đây để bạn theo dõi nhóm tuổi và quyền quản trị."
        tone="sky"
        highlights={["Email và quyền admin được gom về cùng một bảng", "Nhóm tuổi giúp bạn nhìn nhanh tập người dùng hiện có"]}
      />
    );
  }

  return (
    <div className="panel-soft section-glow overflow-hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Người dùng</p>
          <h2 className="mt-2 font-display text-3xl text-slate-900">Danh sách tài khoản</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-600">{users.length} hồ sơ</span>
          <span className="rounded-full bg-rose/20 px-3 py-2 text-rose-900">{adminCount} admin</span>
          <span className="rounded-full bg-sky/20 px-3 py-2 text-sky-900">{configuredProfiles} hồ sơ đã điền thông tin</span>
        </div>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3 text-sm text-slate-600">
          <thead>
            <tr className="text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Hiển thị</th>
              <th className="px-3 py-2">Nhóm tuổi</th>
              <th className="px-3 py-2">Vai trò</th>
              <th className="px-3 py-2">Tạo lúc</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="list-card align-top transition-transform hover:-translate-y-0.5">
                <td className="min-w-[210px] px-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="icon-shell h-10 w-10 shrink-0 text-sm font-black text-slate-900">{(user.displayName ?? user.email ?? "?").slice(0, 1).toUpperCase()}</div>
                    <div>
                      <p className="font-semibold text-slate-900">{user.email ?? "Chưa có email"}</p>
                      <p className="mt-1 text-xs text-slate-500">ID: {user.id.slice(0, 8)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3">{user.displayName ?? "Chưa đặt tên"}</td>
                <td className="px-3 py-3">{user.ageBand ?? "Chưa khai báo"}</td>
                <td className="px-3 py-3">
                  <span className={user.isAdmin ? "rounded-full bg-rose/20 px-3 py-1 text-xs font-bold text-rose-900" : "rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"}>
                    {user.isAdmin ? "Admin" : "Phụ huynh"}
                  </span>
                </td>
                <td className="px-3 py-3 text-xs text-slate-500">{new Date(user.createdAt).toLocaleString("vi-VN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
