import { NextRequest, NextResponse } from "next/server";

import { createDiaryEntryForCurrentUser } from "@/lib/user-state";

type DiaryPayload = {
  id?: string;
  title: string;
  body: string;
  courseSlug?: string;
  createdAt?: string;
};

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as DiaryPayload;

  try {
    const entry = await createDiaryEntryForCurrentUser(payload);
    return NextResponse.json({ data: entry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
