import { NextRequest, NextResponse } from "next/server";

import type { Course } from "@/data/courses";
import { deleteAdminCourse, getAdminCourseBySlug, updateAdminCourse } from "@/lib/course-admin";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  void request;

  try {
    const { slug } = await context.params;
    const found = await getAdminCourseBySlug(slug);

    if (!found) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ data: found });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 403 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const payload = (await request.json()) as Course;

  try {
    const updated = await updateAdminCourse(slug, payload);
    if (!updated) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json({ data: updated });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  void request;

  try {
    const { slug } = await context.params;
    await deleteAdminCourse(slug);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = (error as Error).message;

    if (message === "Course not found") {
      return NextResponse.json({ error: message }, { status: 404 });
    }

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
