"use client";

import Link from "next/link";

import type { Course } from "@/data/courses";
import { getCourseProgress, loadAppState } from "@/lib/progress";

type CourseOverviewProps = {
  course: Course;
};

export function CourseOverview({ course }: CourseOverviewProps) {
  const state = loadAppState();
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
      <section className="grid gap-6 rounded-[2rem] bg-white p-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:p-6">
        <img src={course.coverImage} alt={course.whatYouMake} className="w-full rounded-[1.75rem] object-cover" />

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{course.level}</span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-900">{course.duration}</span>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-800">{course.ageBand}</span>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Sản phẩm cuối</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">{course.whatYouMake}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">{course.summary}</p>
          </div>

          <div className="rounded-[1.5rem] bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Tiến độ</p>
            <div className="mt-3 h-3 rounded-full bg-slate-100">
              <div className="h-3 rounded-full bg-amber-400" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-3 text-sm text-slate-600">{completed}/{total} bước · {percent}%</p>
          </div>

          <div className="rounded-[1.5rem] bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Bước gần nhất</p>
            <p className="mt-1 text-base font-black text-slate-900">{currentStep.title}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{currentStep.body}</p>
          </div>

          <div className="flex gap-3">
            <Link href={`/catalog/${course.slug}/step/${activeIndex}`} className="inline-flex flex-1 items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-bold text-white">
              {buttonLabel}
            </Link>
            <Link href="#steps" className="inline-flex flex-1 items-center justify-center rounded-full bg-sky-100 px-4 py-3 text-sm font-bold text-sky-900">
              Xem bước
            </Link>
          </div>

          {isComplete ? <p className="text-sm font-semibold text-emerald-700">Khóa này đã hoàn thành.</p> : null}
        </div>
      </section>

      <section id="steps" className="space-y-4 rounded-[2rem] bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
        <h2 className="text-2xl font-black text-slate-900">Đồ cần và các bước</h2>
        <div className="flex flex-wrap gap-2">
          {course.materials.map((material) => (
            <span key={material} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{material}</span>
          ))}
        </div>
        <div className="grid gap-3">
          {course.steps.map((step) => (
            <Link key={step.order} href={`/catalog/${course.slug}/step/${step.order - 1}`} className="rounded-[1.5rem] bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Bước {step.order}</p>
              <h3 className="mt-1 text-base font-black text-slate-900">{step.title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{step.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
