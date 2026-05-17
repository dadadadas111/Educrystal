"use client";

import { useState } from "react";
import { downloadIcs } from "@/lib/calendar";

type Props = {
  courseSlug: string;
  courseTitle: string;
};

export default function SyncGoogleCalendarButton({ courseTitle }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCalendar = async () => {
    setIsLoading(true);

    const start = new Date();
    start.setDate(start.getDate() + 1);
    start.setHours(10, 0, 0, 0);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    downloadIcs(
      `${courseTitle} — Lịch học`,
      "Nhắc từ Educrystal",
      start,
      end,
    );

    setIsLoading(false);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCalendar}
      disabled={isLoading}
      className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-white px-4 py-3 text-sm font-bold text-slate-900 shadow-soft"
    >
      {isLoading ? "Đang tải…" : "Thêm vào lịch"}
    </button>
  );
}
