"use client";

import { useMemo, useState } from "react";

import { EmptyStatePanel, StatusBanner } from "@/components/admin/status-empty-states";
import type { Course } from "@/data/courses";
import { createEmptyAppState, type AppState } from "@/lib/progress";

type SettingsPanelProps = {
  courses: Course[];
  initialState?: AppState;
};

export function SettingsPanel({ courses, initialState }: SettingsPanelProps) {
  const [state] = useState(initialState ?? createEmptyAppState());

  const reminders = useMemo(() => state.reminders, [state.reminders]);

  return (
    <div className="space-y-6">
      <section className="panel-soft section-glow">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Cài đặt</p>
        <h1 className="mt-2 font-display text-4xl leading-[0.95] text-slate-900">Nhắc lịch và kết nối</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Nơi này chỉ chứa thứ phụ huynh và hệ thống cần, không đưa chi tiết kỹ thuật lên UI.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="list-card">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Nhắc lịch</p>
          <h2 className="mt-2 font-display text-3xl text-slate-900">Calendar sync</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Tạm thời demo bằng nhắc nội bộ. Sau này có thể nối Google Calendar hoặc nhắc đẩy.</p>
        </div>

        <div className="list-card">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Tiến độ</p>
          <h2 className="mt-2 font-display text-3xl text-slate-900">Khóa đang theo</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{courses.length > 0 ? `${courses.length} khóa đã có trong catalog. Mỗi khóa có thể chạy song song.` : "Hiện chưa có khóa nào được hiển thị trong catalog."}</p>
        </div>
      </section>

      {courses.length === 0 ? (
        <StatusBanner
          title="Catalog chưa có khóa học"
          description="Khi có khóa xuất bản, phần cài đặt sẽ có dữ liệu để bám theo."
          tone="sky"
        />
      ) : null}

      <section className="space-y-3 panel-soft section-glow">
        <h2 className="font-display text-3xl text-slate-900">Nhắc lại đã lưu</h2>
        {reminders.length === 0 ? (
          <EmptyStatePanel
            eyebrow="Nhắc lịch"
            title="Chưa có nhắc nào được lưu"
            description="Bước chờ nào cần quay lại sẽ hiện ở đây."
            tone="gold"
          />
        ) : null}
        <div className="space-y-3">
          {reminders.map((reminder, index) => (
            <div key={`${reminder.courseSlug}-${index}`} className="quest-card">
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
