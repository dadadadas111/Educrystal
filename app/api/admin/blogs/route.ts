import { NextRequest, NextResponse } from "next/server";

import type { Blog } from "@/data/blogs";
import { listAdminBlogs, createAdminBlog, updateAdminBlog, deleteAdminBlog } from "@/lib/blog-admin";

export const runtime = "nodejs";

export async function GET(_request: NextRequest) {
  try {
    const blogs = await listAdminBlogs();
    return NextResponse.json({ data: blogs });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 403 });
  }
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as Blog;

  try {
    const created = await createAdminBlog(payload);
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  const payload = (await request.json()) as Blog & { id: string };

  try {
    const updated = await updateAdminBlog(payload.id, payload);
    return NextResponse.json({ data: updated });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    await deleteAdminBlog(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}