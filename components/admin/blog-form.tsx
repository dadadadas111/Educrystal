"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Blog } from "@/data/blogs";
import { StatusBanner } from "@/components/admin/status-empty-states";

type BlogFormProps = {
  mode: "create" | "edit";
  initialBlog: Blog;
};

const inputClass =
  "w-full rounded-[1.45rem] border-2 border-outline bg-white px-4 py-3 text-sm text-slate-700 shadow-soft outline-none transition focus:border-sky focus:ring-0";

const textareaClass = `${inputClass} min-h-[200px]`;

export function BlogForm({ mode, initialBlog }: BlogFormProps) {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog>(initialBlog);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = async () => {
    if (!blog.title.trim() || !blog.slug.trim()) {
      setError("Tiêu đề và slug không được để trống.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/blogs", {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mode === "create" ? blog : { ...blog, id: blog.id }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Không thể lưu bài viết");
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (mode !== "edit") return;
    if (!window.confirm(`Xóa bài viết "${blog.title}"?`)) return;

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/blogs?id=${blog.id}`, { method: "DELETE" });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error ?? "Không thể xóa bài viết");
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="panel-soft section-glow">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          {mode === "create" ? "Bài viết mới" : "Chỉnh sửa bài viết"}
        </p>
        <h1 className="mt-2 font-display text-4xl leading-[0.95] text-slate-900">
          {mode === "create" ? "Thêm bài viết Khám phá" : blog.title}
        </h1>
      </section>

      {error ? (
        <StatusBanner title="Lỗi" description={error} tone="rose" />
      ) : null}

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="panel-soft section-glow space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Thông tin</p>
            <h2 className="mt-2 font-display text-3xl text-slate-900">Nội dung bài viết</h2>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Tiêu đề</label>
              <input
                value={blog.title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                placeholder="Tiêu đề bài viết"
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Slug</label>
              <input
                value={blog.slug}
                onChange={(e) => setBlog({ ...blog, slug: e.target.value })}
                placeholder="tieu-de-bai-viet"
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Nội dung</label>
              <textarea
                value={blog.body}
                onChange={(e) => setBlog({ ...blog, body: e.target.value })}
                placeholder="Viết nội dung bài viết tại đây..."
                className={textareaClass}
              />
            </div>
          </div>
        </div>

        <div className="panel-soft section-glow space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Thông tin thêm</p>
            <h2 className="mt-2 font-display text-3xl text-slate-900">Nguồn và xuất bản</h2>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Ảnh bìa (URL)</label>
              <input
                value={blog.coverImage ?? ""}
                onChange={(e) => setBlog({ ...blog, coverImage: e.target.value || undefined })}
                placeholder="https://example.com/image.jpg"
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">URL nguồn</label>
              <input
                value={blog.sourceUrl ?? ""}
                onChange={(e) => setBlog({ ...blog, sourceUrl: e.target.value || undefined })}
                placeholder="https://example.com/article"
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Tên nguồn</label>
              <input
                value={blog.sourceName ?? ""}
                onChange={(e) => setBlog({ ...blog, sourceName: e.target.value || undefined })}
                placeholder="Ví dụ: Wikipedia"
                className={inputClass}
              />
            </div>

            <label className="quest-card flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black text-slate-900">Xuất bản</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Bật để bài viết hiển thị trong tab Khám phá.
                </p>
              </div>
              <input
                type="checkbox"
                checked={blog.published}
                onChange={(e) => setBlog({ ...blog, published: e.target.checked })}
                className="h-5 w-5 rounded border-outline text-slate-900"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="panel-soft section-glow">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Hành động</p>
            <h2 className="mt-2 font-display text-3xl text-slate-900">Lưu hoặc xóa bài viết</h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/admin/blogs"
              className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-soft"
            >
              Quay lại
            </Link>
            {mode === "edit" ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting || isSaving}
                className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-rose/20 px-5 py-3 text-sm font-bold text-rose-900 shadow-soft disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? "Đang xóa..." : "Xóa bài viết"}
              </button>
            ) : null}
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving || isDeleting}
              className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-soft disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Đang lưu..." : mode === "create" ? "Tạo bài viết" : "Lưu thay đổi"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
