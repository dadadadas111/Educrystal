import type { User } from "@supabase/supabase-js";
import { cache } from "react";

import { createSupabaseServerClient } from "@/lib/supabase-server";

export const getCurrentUser = cache(async function getCurrentUser(): Promise<User | null> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
});

export const isCurrentUserAdmin = cache(async function isCurrentUserAdmin(userId: string) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return false;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    return false;
  }

  return Boolean(data?.is_admin);
});

export async function requireCurrentAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const isAdmin = await isCurrentUserAdmin(user.id);

  if (!isAdmin) {
    throw new Error("Forbidden");
  }

  return user;
}

export async function requireCurrentUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
