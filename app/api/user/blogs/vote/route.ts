import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { getUserVoteForBlog, setUserVote, removeUserVote } from "@/lib/blogs";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    console.log("[vote] No user, returning 401");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("[vote] User:", user.id);

  const { blogId, vote } = (await request.json()) as { blogId: string; vote: number | null };

  console.log("[vote] BlogId:", blogId, "Vote:", vote);

  try {
    if (vote === null) {
      await removeUserVote(blogId, user.id);
    } else {
      await setUserVote(blogId, user.id, vote);
    }
    console.log("[vote] Success");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[vote] Error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}