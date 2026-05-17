"use client";

import { toast } from "sonner";
import { openGoogleCalendar } from "@/lib/calendar";

type Props = {
  courseSlug: string;
  courseTitle: string;
};

export default function SyncGoogleCalendarButton({ courseTitle }: Props) {
  const handleAddToCalendar = () => {
    const start = new Date();
    start.setDate(start.getDate() + 1);
    start.setHours(10, 0, 0, 0);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    openGoogleCalendar(
      `${courseTitle} — Lịch học`,
      `Nhắc từ Educrystal\nKhóa học: ${courseTitle}`,
      start,
      end,
    );
    toast.success("Đã mở Google Calendar!");
  };

  return (
    <button
      type="button"
      onClick={handleAddToCalendar}
      className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-white px-4 py-3 text-sm font-bold text-slate-900 shadow-soft"
    >
      Thêm vào lịch
    </button>
  );
}
