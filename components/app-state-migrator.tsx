"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import type { AppState } from "@/lib/progress";

const STORAGE_KEY = "educrystal:app-state";
const MIGRATION_KEY = "educrystal:server-migration-complete";

export function AppStateMigrator() {
  const router = useRouter();

  useEffect(() => {
    const migrate = async () => {
      if (typeof window === "undefined") {
        return;
      }

      if (window.localStorage.getItem(MIGRATION_KEY)) {
        return;
      }

      const raw = window.localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        window.localStorage.setItem(MIGRATION_KEY, "1");
        return;
      }

      try {
        const payload = JSON.parse(raw) as AppState;
        const response = await fetch("/api/user-state/migrate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          return;
        }

        window.localStorage.setItem(MIGRATION_KEY, "1");
        window.localStorage.removeItem(STORAGE_KEY);
        router.refresh();
      } catch {
        // Keep legacy state for a later retry.
      }
    };

    void migrate();
  }, [router]);

  return null;
}
