import { NextRequest, NextResponse } from "next/server";

import { replaceCourseRemindersForCurrentUser } from "@/lib/user-state";

type ReminderPayload = {
  courseSlug: string;
  reminders: Array<{
    stepIndex: number;
    reminderAt: string;
    note: string;
  }>;
};

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as ReminderPayload;

  try {
    await replaceCourseRemindersForCurrentUser(payload);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
