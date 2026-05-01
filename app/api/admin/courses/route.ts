import { NextRequest, NextResponse } from "next/server";

import type { Course } from "@/data/courses";
import { createAdminCourse, listAdminCourses } from "@/lib/course-admin";

export const runtime = "nodejs";

export async function GET(_request: NextRequest) {
  try {
    const courses = await listAdminCourses();
    return NextResponse.json({ data: courses });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 403 });
  }
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as Course;

  try {
    const created = await createAdminCourse(payload);
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
