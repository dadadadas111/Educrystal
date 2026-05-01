import { createClient } from "@supabase/supabase-js";
import { cache } from "react";

import { getSupabaseConfig } from "@/lib/supabase";

export const createSupabaseAdminServerClient = cache(async function createSupabaseAdminServerClient() {
  const config = getSupabaseConfig();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!config || !serviceRoleKey) {
    return null;
  }

  return createClient(config.url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
});