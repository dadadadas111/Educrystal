"use client";

import { useMemo, useState } from "react";

import { EmptyStatePanel, StatusBanner } from "@/components/admin/status-empty-states";
import { SignOutButton } from "@/components/auth/sign-out-button";
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
        <h1 className="mt-2 font-display text-4xl leading-[0.95] text-slate-900">Cài đặt</h1>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="list-card">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Nhắc lịch</p>
          <h2 className="mt-2 font-display text-3xl text-slate-900">Nhắc nhở</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Bạn sẽ được nhắc khi có bước mới</p>
        </div>

        <div className="list-card">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Tiến độ</p>
          <h2 className="mt-2 font-display text-3xl text-slate-900">Khóa học</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{courses.length > 0 ? `${courses.length} khóa` : "Chưa có khóa nào"}</p>
        </div>
      </section>

      <section className="list-card">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Tài khoản</p>
        <h2 className="mt-2 font-display text-3xl text-slate-900">Đăng xuất</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Thoát tài khoản</p>
        <SignOutButton className="mt-4 inline-flex w-full items-center justify-center rounded-full border-2 border-outline bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-soft disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto" />
      </section>

      {courses.length === 0 ? (
        <StatusBanner
          title="Chưa có khóa nào"
          tone="sky"
        />
      ) : null}

      <section className="space-y-3 panel-soft section-glow">
        <h2 className="font-display text-3xl text-slate-900">Nhắc lịch</h2>
        {reminders.length === 0 ? (
          <EmptyStatePanel
            eyebrow="Nhắc lịch"
            title="Chưa có nhắc nào"
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
