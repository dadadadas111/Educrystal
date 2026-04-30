"use client";

import { useMemo, useState } from "react";

import type { Course } from "@/data/courses";
import { loadAppState } from "@/lib/progress";

type SettingsPanelProps = {
  courses: Course[];
};

export function SettingsPanel({ courses }: SettingsPanelProps) {
  const [state] = useState(loadAppState());

  const reminders = useMemo(() => state.reminders, [state.reminders]);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Cài đặt</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Nhắc lịch và kết nối</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Nơi này chỉ chứa thứ phụ huynh và hệ thống cần, không đưa chi tiết kỹ thuật lên UI.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Nhắc lịch</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">Calendar sync</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Tạm thời demo bằng nhắc nội bộ. Sau này có thể nối Google Calendar hoặc nhắc đẩy.</p>
        </div>

        <div className="rounded-[2rem] bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Tiến độ</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">Khóa đang theo</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{courses.length} khóa đã có trong catalog. Mỗi khóa có thể chạy song song.</p>
        </div>
      </section>

      <section className="space-y-3 rounded-[2rem] bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
        <h2 className="text-xl font-black text-slate-900">Nhắc lại đã lưu</h2>
        {reminders.length === 0 ? <p className="text-sm text-slate-600">Chưa có nhắc nào.</p> : null}
        <div className="space-y-3">
          {reminders.map((reminder, index) => (
            <div key={`${reminder.courseSlug}-${index}`} className="rounded-[1.5rem] bg-slate-50 p-4">
              <p className="text-sm font-black text-slate-900">{courses.find((course) => course.slug === reminder.courseSlug)?.title ?? reminder.courseSlug}</p>
              <p className="text-sm text-slate-600">{new Date(reminder.reminderAt).toLocaleString("vi-VN")}</p>
              <p className="text-sm text-slate-600">{reminder.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
