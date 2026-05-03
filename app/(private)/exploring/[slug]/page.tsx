import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, Compass, ExternalLink, ArrowBigUp, ArrowBigDown } from "lucide-react";
import Link from "next/link";
import { getBlogBySlug, getBlogVotes, incrementBlogViewCount } from "@/lib/blogs";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const user = await getCurrentUser();
  let userVote = 0;
  
  await incrementBlogViewCount(blog.id);
  
  const votes = await getBlogVotes(blog.id);

  return (
    <div className="space-y-6">
      <Link
        href="/exploring"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-coral"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại
      </Link>

      <article className="rounded-2xl border-2 border-outline bg-white p-6 shadow-soft">
        {blog.coverImage && (
          <div className="mb-4 aspect-video overflow-hidden rounded-xl">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <Compass className="h-4 w-4" />
          <span>Khám phá</span>
          <span>•</span>
          <span>{blog.viewCount} lượt xem</span>
        </div>

        <h1 className="font-display text-2xl leading-tight text-slate-900">{blog.title}</h1>

        <div className="mt-4 prose prose-slate max-w-none">
          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{blog.body}</p>
        </div>

        {(blog.sourceUrl || blog.sourceName) && (
          <div className="mt-6 pt-4 border-t border-outline">
            <p className="text-xs text-slate-500 mb-2">Nguồn:</p>
            {blog.sourceName && (
              <p className="text-sm font-medium text-slate-700">{blog.sourceName}</p>
            )}
            {blog.sourceUrl && (
              <a
                href={blog.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-coral hover:underline"
              >
                {blog.sourceUrl}
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        )}
      </article>

      <div className="flex items-center justify-center gap-4 py-4">
        <form action={async () => {
          "use server";
          const { setUserVote } = await import("@/lib/blogs");
          if (user) {
            await setUserVote(blog.id, user.id, 1);
          }
        }}>
          <button
            type="submit"
            className={`flex items-center gap-2 rounded-full border-2 border-outline px-4 py-2 font-medium transition-colors ${
              userVote === 1
                ? "bg-rose text-white border-rose"
                : "bg-white text-slate-700 hover:bg-rose-soft"
            }`}
          >
            <ArrowBigUp className="h-5 w-5" />
            <span>{votes.upvotes}</span>
          </button>
        </form>

        <form action={async () => {
          "use server";
          const { setUserVote } = await import("@/lib/blogs");
          if (user) {
            await setUserVote(blog.id, user.id, -1);
          }
        }}>
          <button
            type="submit"
            className={`flex items-center gap-2 rounded-full border-2 border-outline px-4 py-2 font-medium transition-colors ${
              userVote === -1
                ? "bg-sky text-white border-sky"
                : "bg-white text-slate-700 hover:bg-sky-soft"
            }`}
          >
            <ArrowBigDown className="h-5 w-5" />
            <span>{votes.downvotes}</span>
          </button>
        </form>
      </div>
    </div>
  );
}