import { notFound } from "next/navigation";

import { BlogForm } from "@/components/admin/blog-form";
import { getAdminBlogById } from "@/lib/blog-admin";

type EditAdminBlogPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditAdminBlogPage({ params }: EditAdminBlogPageProps) {
  const { id } = await params;
  const blog = await getAdminBlogById(id);

  if (!blog) {
    notFound();
  }

  return <BlogForm mode="edit" initialBlog={blog} />;
}
