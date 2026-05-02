import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createSupabaseAdminServerClient } from "@/lib/supabase-admin-server";
import { getGoogleAccessTokenFromRefresh } from "@/lib/google-oauth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, start, end } = body;

    if (!title || !start || !end) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    if (!supabase) return NextResponse.json({ error: "no_supabase" }, { status: 500 });

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

    const admin = await createSupabaseAdminServerClient();
    if (!admin) return NextResponse.json({ error: "no_admin_client" }, { status: 500 });

    const { data, error } = await admin.from("profiles").select("google_refresh_token").eq("id", user.id).maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const refresh = data?.google_refresh_token;
    if (!refresh) return NextResponse.json({ error: "no_refresh_token" }, { status: 400 });

    const { accessToken } = await getGoogleAccessTokenFromRefresh(refresh);

    const eventBody = {
      summary: title,
      description: description ?? undefined,
      start: { dateTime: start },
      end: { dateTime: end },
    };

    const res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventBody),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text }, { status: 500 });
    }

    const json = await res.json();
    return NextResponse.json({ ok: true, event: json });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "unexpected" }, { status: 500 });
  }
}
