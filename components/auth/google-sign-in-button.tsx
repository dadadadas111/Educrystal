"use client";

import { useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type GoogleSignInButtonProps = {
  nextPath?: string;
  className?: string;
};

export function GoogleSignInButton({ nextPath = "/home", className }: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    setIsLoading(true);

    const redirectTo = new URL("/auth/callback", window.location.origin);
    redirectTo.searchParams.set("next", nextPath);

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectTo.toString(),
      },
    });

    setIsLoading(false);
  };

  return (
    <button
      type="button"
      onClick={handleSignIn}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? "Đang mở Google…" : "Đăng nhập với Google"}
    </button>
  );
}
