"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { EmptyStatePanel } from "@/components/admin/status-empty-states";
import type { Course } from "@/data/courses";
import { createEmptyAppState, getCourseProgress, type AppState } from "@/lib/progress";

type CatalogBrowserProps = {
  courses: Course[];
  initialState?: AppState;
};

const tabs = [
  { id: "active", label: "Đang làm" },
  { id: "discover", label: "Khám phá" },
  { id: "done", label: "Đã xong" },
] as const;

export function CatalogBrowser({ courses, initialState }: CatalogBrowserProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("active");
  const [state] = useState(initialState ?? createEmptyAppState());

  const grouped = useMemo(() => {
    const items = courses.map((course) => {
      const progress = getCourseProgress(state, course.slug);
      const completed = progress.completedSteps.length;
      const total = course.steps.length;
      return {
        course,
        progress,
        completed,
        total,
        percent: Math.round((completed / total) * 100),
      };
    });

    return {
      active: items.filter((item) => item.completed > 0 && item.completed < item.total),
      discover: items.filter((item) => item.completed === 0),
      done: items.filter((item) => item.completed >= item.total),
    };
  }, [courses, state]);

  const visible = grouped[activeTab];

  if (courses.length === 0) {
    return (
      <div className="space-y-6">
        <section className="panel-soft section-glow">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Khóa học</p>
          <h1 className="mt-2 font-display text-4xl leading-[0.95] text-slate-900">Chọn khóa học bạn thích</h1>
        </section>

        <EmptyStatePanel
          eyebrow="Catalog"
          title="Chưa có khóa nào"
          description=""
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="panel-soft section-glow">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Khóa học</p>
        <h1 className="mt-2 font-display text-4xl leading-[0.95] text-slate-900">Chọn khóa học bạn thích</h1>
      </section>

      <section className="flex gap-2 overflow-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? "rounded-full border-2 border-outline bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-soft" : "rounded-full border-2 border-outline bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-soft"}
          >
            {tab.label}
          </button>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((item) => (
          <Link key={item.course.slug} href={`/catalog/${item.course.slug}`} className="list-card transition-transform hover:-translate-y-0.5">
            <div className="overflow-hidden rounded-[1.75rem] bg-slate-50">
              <img src={item.course.coverImage} alt={item.course.whatYouMake} className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="space-y-2 px-1 pb-1 pt-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="rounded-full bg-slate-100 px-2.5 py-1">{item.course.level}</span>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-900">{item.percent}%</span>
                <span className="rounded-full bg-sky-100 px-2.5 py-1 text-sky-800">{item.course.duration}</span>
              </div>
              <div>
                <h3 className="text-lg font-black leading-tight text-slate-900">{item.course.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.completed > 0 ? `Bước tiếp theo: ${item.course.steps[item.completed]?.title ?? item.course.steps[item.course.steps.length - 1].title}` : item.course.summary}</p>
              </div>
            </div>
          </Link>
        ))}
        {visible.length === 0 ? (
          <EmptyStatePanel
            eyebrow={activeTab === "active" ? "Đang làm" : activeTab === "discover" ? "Khám phá" : "Đã xong"}
            title={activeTab === "active" ? "Chưa có khóa đang theo" : activeTab === "discover" ? "Chưa có khóa nào" : "Chưa có khóa nào hoàn thành"}
            description=""
            tone={activeTab === "done" ? "gold" : "sky"}
          />
          ) : null}
        </section>
    </div>
  );
}
