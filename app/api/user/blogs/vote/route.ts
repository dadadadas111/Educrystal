import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { getUserVoteForBlog, setUserVote, removeUserVote } from "@/lib/blogs";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { blogId, vote } = (await request.json()) as { blogId: string; vote: number | null };

  try {
    if (vote === null) {
      await removeUserVote(blogId, user.id);
    } else {
      await setUserVote(blogId, user.id, vote);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}