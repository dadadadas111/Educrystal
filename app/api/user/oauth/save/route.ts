import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createSupabaseAdminServerClient } from "@/lib/supabase-admin-server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return NextResponse.json({ error: "missing_refresh" }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();

    if (!supabase) return NextResponse.json({ error: "no_supabase" }, { status: 500 });

    const { data: userData } = await supabase.auth.getUser();

    const user = userData.user;

    if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

    const admin = await createSupabaseAdminServerClient();

    if (!admin) return NextResponse.json({ error: "no_admin_client" }, { status: 500 });

    const { error } = await admin.from("profiles").update({ google_refresh_token: refreshToken }).eq("id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "unexpected" }, { status: 500 });
  }
}
