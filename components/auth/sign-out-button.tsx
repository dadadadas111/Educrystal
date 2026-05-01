"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type SignOutButtonProps = {
  className?: string;
};

export function SignOutButton({ className }: SignOutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      router.push("/");
      router.refresh();
      return;
    }

    setIsLoading(true);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
    setIsLoading(false);
  };

  return (
    <button type="button" onClick={handleSignOut} disabled={isLoading} className={className}>
      {isLoading ? "Đang đăng xuất…" : "Đăng xuất"}
    </button>
  );
}
