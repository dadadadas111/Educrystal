import { BlogForm } from "@/components/admin/blog-form";
import type { Blog } from "@/data/blogs";

function createDraftBlog(): Blog {
  return {
    id: "",
    slug: "",
    title: "",
    body: "",
    coverImage: undefined,
    sourceUrl: undefined,
    sourceName: undefined,
    published: true,
    viewCount: 0,
    createdAt: "",
    updatedAt: "",
  };
}

export default function NewAdminBlogPage() {
  return <BlogForm mode="create" initialBlog={createDraftBlog()} />;
}
