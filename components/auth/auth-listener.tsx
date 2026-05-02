"use client";

import { useEffect } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AuthListener() {
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    if (!supabase) return;

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        const refresh = (session as any)?.provider_refresh_token ?? (session as any)?.provider_refresh_token;

        if (event === "SIGNED_IN" && refresh) {
          // send refresh token to server to persist
          await fetch("/api/user/oauth/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: refresh }),
          });
        }
      } catch (err) {
        // ignore
      }
    });

    return () => {
      data?.subscription?.unsubscribe?.();
    };
  }, []);

  return null;
}
