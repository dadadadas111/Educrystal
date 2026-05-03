import { Suspense } from "react";
import { Compass } from "lucide-react";
import { listBlogs, getBlogVotes, getUserVoteForBlog } from "@/lib/blogs";
import { getCurrentUser } from "@/lib/auth";
import { BlogList } from "@/components/exploring/blog-list";

export const dynamic = "force-dynamic";

export default async function ExploringPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string; filter?: string }>;
}) {
  const params = await searchParams;
  const search = params.q ?? "";
  const sort = (params.sort as "newest" | "oldest" | "views" | "votes") ?? "newest";
  const filter = (params.filter as "all" | "viewed" | "exploring") ?? "all";

  const [blogs, user] = await Promise.all([listBlogs({ search, sort, filter }), getCurrentUser()]);

  const blogsWithVotes = await Promise.all(
    blogs.map(async (blog) => {
      const votes = await getBlogVotes(blog.id);
      let userVote = 0;
      if (user) {
        userVote = await getUserVoteForBlog(blog.id, user.id);
      }
      return { ...blog, upvotes: votes.upvotes, downvotes: votes.downvotes, userVote };
    })
  );

  return (
    <div className="space-y-6">
      <section className="playful-stage">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender-soft shadow-soft">
            <Compass className="h-6 w-6 text-lavender" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Khám phá</p>
            <h1 className="font-display text-3xl leading-[0.95] text-slate-900">Bài viết</h1>
          </div>
        </div>
      </section>

      <BlogList blogs={blogsWithVotes} />
    </div>
  );
}