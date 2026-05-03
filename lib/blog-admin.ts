import "server-only";

import type { Blog } from "@/data/blogs";
import { createSupabaseAdminServerClient } from "@/lib/supabase-admin-server";

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
    createdAt: "",
    updatedAt: "",
  };
}

export async function listAdminBlogs(): Promise<Blog[]> {
  const supabase = await createSupabaseAdminServerClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("exploring_blogs")
    .select("id, slug, title, body, cover_image, source_url, source_name, published, view_count")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("[listAdminBlogs]", error?.message);
    return [];
  }

  return data.map(mapBlog);
}

export async function getAdminBlogById(id: string): Promise<Blog | null> {
  const supabase = await createSupabaseAdminServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("exploring_blogs")
    .select("id, slug, title, body, cover_image, source_url, source_name, published, view_count")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapBlog(data);
}

export async function createAdminBlog(blog: Blog): Promise<Blog> {
  const supabase = await createSupabaseAdminServerClient();

  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const { data, error } = await supabase
    .from("exploring_blogs")
    .insert({
      slug: blog.slug,
      title: blog.title,
      body: blog.body,
      cover_image: blog.coverImage ?? null,
      source_url: blog.sourceUrl ?? null,
      source_name: blog.sourceName ?? null,
      published: blog.published ?? true,
    })
    .select("id, slug, title, body, cover_image, source_url, source_name, published, view_count")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Unable to create blog");
  }

  return mapBlog(data);
}

export async function updateAdminBlog(id: string, blog: Blog): Promise<Blog> {
  const supabase = await createSupabaseAdminServerClient();

  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const { error } = await supabase
    .from("exploring_blogs")
    .update({
      slug: blog.slug,
      title: blog.title,
      body: blog.body,
      cover_image: blog.coverImage ?? null,
      source_url: blog.sourceUrl ?? null,
      source_name: blog.sourceName ?? null,
      published: blog.published,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  const updated = await getAdminBlogById(id);
  if (!updated) {
    throw new Error("Blog not found");
  }

  return updated;
}

export async function deleteAdminBlog(id: string): Promise<void> {
  const supabase = await createSupabaseAdminServerClient();

  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const { error } = await supabase.from("exploring_blogs").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}