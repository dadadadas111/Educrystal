import { listAdminBlogs } from "@/lib/blog-admin";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const blogs = await listAdminBlogs();

  return (
    <div className="space-y-6">
      <section className="playful-stage">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Admin</p>
          <h1 className="mt-2 font-display text-4xl leading-[0.95] text-slate-900">Quản lý Bài viết Khám phá</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Từ đây bạn có thể thêm, sửa, xóa các bài viết trong tab Khám phá.
          </p>
        </div>
      </section>

      <div className="overflow-x-auto rounded-2xl border-2 border-outline bg-white shadow-soft">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-outline bg-slate-50 text-left">
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Tiêu đề</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Slug</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Lượt xem</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Trạng thái</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  Chưa có bài viết nào
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id} className="border-b border-outline last:border-0">
                  <td className="p-4 font-medium text-slate-900">{blog.title}</td>
                  <td className="p-4 font-mono text-sm text-slate-600">{blog.slug}</td>
                  <td className="p-4 text-slate-600">{blog.viewCount}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        blog.published ? "bg-success/20 text-success" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {blog.published ? "Đã xuất bản" : "Nháp"}
                    </span>
                  </td>
                  <td className="p-4">
                    <a
                      href={`/admin/blogs/${blog.id}`}
                      className="text-sm font-medium text-coral hover:underline"
                    >
                      Sửa
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <a
        href="/admin/blogs/new"
        className="inline-flex rounded-full bg-coral px-6 py-3 font-bold text-white shadow-crystal transition-shadow hover:shadow-crystalHover"
      >
        + Thêm bài viết mới
      </a>
    </div>
  );
}