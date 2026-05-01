import { NextRequest, NextResponse } from "next/server";

import { saveCourseProgressForCurrentUser } from "@/lib/user-state";

type ProgressPayload = {
  courseSlug: string;
  activeStepIndex: number;
  completedSteps: number[];
};

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as ProgressPayload;

  try {
    await saveCourseProgressForCurrentUser(payload);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
