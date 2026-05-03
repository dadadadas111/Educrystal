"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

interface BlogWithVotes {
  id: string;
  slug: string;
  title: string;
  body: string;
  coverImage?: string;
  sourceUrl?: string;
  sourceName?: string;
  published: boolean;
  viewCount: number;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  userVote: number;
}

interface BlogListProps {
  blogs: BlogWithVotes[];
}

export function BlogList({ blogs }: BlogListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  const currentSort = searchParams.get("sort") ?? "newest";
  const currentFilter = searchParams.get("filter") ?? "all";

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/exploring?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams("q", search);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <form onSubmit={handleSearch} className="flex flex-1 min-w-[200px] items-center gap-2 rounded-full border-2 border-outline bg-white px-4 py-2 shadow-soft">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm bài viết..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </form>

        <select
          value={currentSort}
          onChange={(e) => updateParams("sort", e.target.value)}
          className="rounded-full border-2 border-outline bg-white px-4 py-2 text-sm font-medium shadow-soft"
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
          <option value="views">Nhiều view</option>
        </select>

        <select
          value={currentFilter}
          onChange={(e) => updateParams("filter", e.target.value)}
          className="rounded-full border-2 border-outline bg-white px-4 py-2 text-sm font-medium shadow-soft"
        >
          <option value="all">Tất cả</option>
          <option value="exploring">Đã xuất bản</option>
          <option value="viewed">Đã xem</option>
        </select>
      </div>

      {blogs.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-slate-500">Chưa có bài viết nào</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group relative overflow-hidden rounded-2xl border-2 border-outline bg-white p-4 shadow-soft transition-shadow hover:shadow-crystal"
            >
              {blog.coverImage && (
                <div className="mb-3 aspect-video overflow-hidden rounded-xl">
                  <img src={blog.coverImage} alt={blog.title} className="h-full w-full object-cover" />
                </div>
              )}

              <h2 className="font-display text-lg leading-tight text-slate-900">{blog.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-slate-600">{blog.body}</p>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>{blog.viewCount} lượt xem</span>
                <div className="flex items-center gap-1">
                  <span className="text-rose">↑{blog.upvotes}</span>
                  <span className="text-sky">↓{blog.downvotes}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}