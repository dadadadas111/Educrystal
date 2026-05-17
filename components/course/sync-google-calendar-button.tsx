"use client";

import { useState } from "react";

type Props = {
  courseSlug: string;
  courseTitle: string;
};

function downloadIcs(title: string, description: string, start: Date, end: Date) {
  const fmt = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  };

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Educrystal//EN",
    "BEGIN:VEVENT",
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "lich-hoc.ics";
  a.click();
  URL.revokeObjectURL(url);
}

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
