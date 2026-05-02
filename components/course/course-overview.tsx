"use client";

import Link from "next/link";
import { useState } from "react";
import SyncGoogleCalendarButton from "@/components/course/sync-google-calendar-button";

import type { Course } from "@/data/courses";
import { createEmptyAppState, getCourseProgress, type AppState } from "@/lib/progress";

type CourseOverviewProps = {
  course: Course;
  initialState?: AppState;
};

export function CourseOverview({ course, initialState }: CourseOverviewProps) {
  const [state] = useState(initialState ?? createEmptyAppState());

  const progress = getCourseProgress(state, course.slug);
  const total = course.steps.length;
  const completed = progress.completedSteps.length;
  const activeIndex = Math.min(progress.activeStepIndex, total - 1);
  const currentStep = course.steps[activeIndex];
  const percent = Math.round((completed / total) * 100);
  const isComplete = completed >= total;
  const buttonLabel = completed > 0 ? "Tiếp tục" : "Bắt đầu";

  return (
    <div className="space-y-6">
      <section className="playful-stage grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <img src={course.coverImage} alt={course.whatYouMake} className="w-full rounded-[1.75rem] border-2 border-outline object-cover shadow-soft" />

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <span className="glass-pill text-slate-700">{course.level}</span>
            <span className="glass-pill text-amber-900">{course.duration}</span>
            <span className="glass-pill text-sky-800">{course.ageBand}</span>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Sản phẩm cuối</p>
            <h1 className="mt-2 font-display text-4xl leading-[0.95] text-slate-900">{course.whatYouMake}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">{course.summary}</p>
          </div>

          <div className="list-card">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Tiến độ</p>
            <div className="mt-3 h-3 rounded-full bg-slate-100">
              <div className="h-3 rounded-full bg-amber-400" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-3 text-sm text-slate-600">{completed}/{total} bước · {percent}%</p>
          </div>

          <div className="quest-card">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Bước gần nhất</p>
            <p className="mt-1 text-base font-black text-slate-900">{currentStep.title}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{currentStep.body}</p>
          </div>

          <div className="flex gap-3">
            <Link href={`/catalog/${course.slug}/step/${activeIndex}`} className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-outline bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-soft">
              {buttonLabel}
            </Link>
            <Link href="#steps" className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-outline bg-sky-100 px-4 py-3 text-sm font-bold text-sky-900 shadow-soft">
              Xem bước
            </Link>
          </div>

          <div className="mt-3">
            <SyncGoogleCalendarButton courseSlug={course.slug} courseTitle={course.title} />
          </div>

          {isComplete ? <p className="text-sm font-semibold text-emerald-700">Khóa này đã hoàn thành.</p> : null}
        </div>
      </section>

      <section id="steps" className="space-y-5 panel-soft section-glow">
        <h2 className="font-display text-3xl text-slate-900">Chuẩn bị và các bước</h2>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="quest-card space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Dụng cụ cần có</p>
            <div className="space-y-2">
              {course.preparation.tools.map((tool) => (
                <div key={`${tool.name}-${tool.spec}`} className="flex items-start justify-between gap-3 rounded-xl border border-outline/70 bg-white/70 px-3 py-2 text-sm">
                  <span className="font-semibold text-slate-800">{tool.name}</span>
                  <span className="text-slate-600">{tool.spec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="quest-card space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Nguyên liệu định lượng</p>
            <div className="space-y-2">
              {course.preparation.ingredients.map((ingredient) => (
                <div key={`${ingredient.name}-${ingredient.amount}-${ingredient.unit}`} className="rounded-xl border border-outline/70 bg-white/70 px-3 py-2 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-semibold text-slate-800">{ingredient.name}</span>
                    <span className="text-slate-700">{ingredient.amount} {ingredient.unit}</span>
                  </div>
                  {ingredient.note ? <p className="mt-1 text-xs text-slate-500">{ingredient.note}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {course.steps.map((step) => (
            <Link key={step.order} href={`/catalog/${course.slug}/step/${step.order - 1}`} className="crystal-card transition-transform hover:-translate-y-0.5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Bước {step.order}</p>
              <h3 className="mt-1 text-base font-black text-slate-900">{step.title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{step.body}</p>
              <p className="mt-2 text-xs font-semibold text-emerald-700">Đạt khi: {step.passCriteria}</p>
              {step.notes && step.notes.length > 0 ? (
                <p className="mt-1 text-xs text-amber-800">Lưu ý: {step.notes[0]}</p>
              ) : null}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
