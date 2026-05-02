"use client";

import { useState } from "react";

type Props = {
  courseSlug: string;
  courseTitle: string;
};

export default function SyncGoogleCalendarButton({ courseSlug, courseTitle }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSync = async () => {
    setIsLoading(true);

    // Simple default event: tomorrow 10:00 local, 1 hour
    const start = new Date();
    start.setDate(start.getDate() + 1);
    start.setHours(10, 0, 0, 0);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    try {
      const res = await fetch("/api/user/calendar/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${courseTitle} — Lịch học`,
          description: `Reminder from Educrystal for ${courseTitle}`,
          start: start.toISOString(),
          end: end.toISOString(),
        }),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json?.error || "failed");

      alert("Synchronized to Google Calendar");
    } catch (err: any) {
      alert("Sync failed: " + (err?.message ?? ""));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSync}
      disabled={isLoading}
      className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-white px-4 py-3 text-sm font-bold text-slate-900 shadow-soft"
    >
      {isLoading ? "Đang đồng bộ…" : "Sync to Google Calendar"}
    </button>
  );
}
