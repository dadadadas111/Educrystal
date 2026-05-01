import { NextRequest, NextResponse } from "next/server";

import type { Course } from "@/data/courses";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { createCourse, readLocalCourses } from "@/lib/course-store";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "WWW-Authenticate": "Basic" } });
}

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return unauthorized();
  }

  const courses = await readLocalCourses();
  return NextResponse.json({ data: courses });
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return unauthorized();
  }

  const payload = (await request.json()) as Course;

  if (!payload?.slug || !payload?.title || !Array.isArray(payload.steps) || payload.steps.length === 0) {
    return NextResponse.json({ error: "Invalid course payload" }, { status: 400 });
  }

  if (payload.steps[0]?.kind !== "prepare") {
    return NextResponse.json({ error: "First step must be prepare" }, { status: 400 });
  }

  try {
    const created = await createCourse(payload);
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 409 });
  }
}
