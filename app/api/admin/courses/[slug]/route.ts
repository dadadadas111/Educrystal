import { NextRequest, NextResponse } from "next/server";

import type { Course } from "@/data/courses";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { deleteCourse, readLocalCourses, updateCourse } from "@/lib/course-store";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "WWW-Authenticate": "Basic" } });
}

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  if (!isAdminAuthorized(request)) {
    return unauthorized();
  }

  const { slug } = await context.params;
  const courses = await readLocalCourses();
  const found = courses.find((course) => course.slug === slug);

  if (!found) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json({ data: found });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  if (!isAdminAuthorized(request)) {
    return unauthorized();
  }

  const { slug } = await context.params;
  const payload = (await request.json()) as Course;

  if (!payload?.slug || !payload?.title || !Array.isArray(payload.steps) || payload.steps.length === 0) {
    return NextResponse.json({ error: "Invalid course payload" }, { status: 400 });
  }

  if (payload.steps[0]?.kind !== "prepare") {
    return NextResponse.json({ error: "First step must be prepare" }, { status: 400 });
  }

  try {
    const updated = await updateCourse(slug, payload);
    if (!updated) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json({ data: updated });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 409 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!isAdminAuthorized(request)) {
    return unauthorized();
  }

  const { slug } = await context.params;
  const deleted = await deleteCourse(slug);

  if (!deleted) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
