import { NextRequest, NextResponse } from "next/server";

import type { AppState } from "@/lib/progress";
import { migrateLegacyAppStateForCurrentUser } from "@/lib/user-state";

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as AppState;

  try {
    await migrateLegacyAppStateForCurrentUser(payload);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
