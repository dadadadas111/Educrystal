import "server-only";

import type { Blog } from "@/data/blogs";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const BLOGS_CACHE_TAG = "blogs";

type BlogRow = {
  id: string;
  slug: string;
  title: string;
  body: string;
  cover_image: string | null;
  source_url: string | null;
  source_name: string | null;
  published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
};

type BlogVoteRow = {
  id: string;
  user_id: string;
  blog_id: string;
  vote: number;
  created_at: string;
};

function mapBlog(row: BlogRow): Blog {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    body: row.body,
    coverImage: row.cover_image ?? undefined,
    sourceUrl: row.source_url ?? undefined,
    sourceName: row.source_name ?? undefined,
    published: row.published,
    viewCount: row.view_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listBlogs({
  search,
  sort = "newest",
  filter = "all",
}: {
  search?: string;
  sort?: "newest" | "oldest" | "views" | "votes";
  filter?: "all" | "viewed" | "exploring";
} = {}): Promise<Blog[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  let query = supabase
    .from("exploring_blogs")
    .select("id, slug, title, body, cover_image, source_url, source_name, published, view_count, created_at, updated_at");

  if (filter === "exploring") {
    query = query.eq("published", true);
  }

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  switch (sort) {
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "views":
      query = query.order("view_count", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error("[listBlogs]", error?.message);
    return [];
  }

  return data.map(mapBlog);
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("exploring_blogs")
    .select("id, slug, title, body, cover_image, source_url, source_name, published, view_count, created_at, updated_at")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapBlog(data);
}

export async function incrementBlogViewCount(blogId: string): Promise<void> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return;
  }

  await supabase.rpc("increment_blog_view", { blog_id: blogId });
}

export async function getBlogVotes(blogId: string): Promise<{ upvotes: number; downvotes: number }> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { upvotes: 0, downvotes: 0 };
  }

  const { data, error } = await supabase
    .from("blog_votes")
    .select("vote")
    .eq("blog_id", blogId);

  if (error || !data) {
    return { upvotes: 0, downvotes: 0 };
  }

  const votes = data as BlogVoteRow[];
  return {
    upvotes: votes.filter((v) => v.vote === 1).length,
    downvotes: votes.filter((v) => v.vote === -1).length,
  };
}

export async function getUserVoteForBlog(blogId: string, userId: string): Promise<number> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return 0;
  }

  const { data, error } = await supabase
    .from("blog_votes")
    .select("vote")
    .eq("blog_id", blogId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    return 0;
  }

  return (data as BlogVoteRow).vote;
}

export async function setUserVote(blogId: string, userId: string, vote: number): Promise<void> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    console.error("[setUserVote] No supabase client");
    return;
  }

  const { error } = await supabase
    .from("blog_votes")
    .upsert(
      { user_id: userId, blog_id: blogId, vote },
      { onConflict: "user_id,blog_id" }
    );

  if (error) {
    console.error("[setUserVote] Error:", error.message);
  }
}

export async function removeUserVote(blogId: string, userId: string): Promise<void> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return;
  }

  await supabase.from("blog_votes").delete().eq("blog_id", blogId).eq("user_id", userId);
}