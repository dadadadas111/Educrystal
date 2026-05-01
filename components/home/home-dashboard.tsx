"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { EmptyStatePanel } from "@/components/admin/status-empty-states";
import type { Course } from "@/data/courses";
import { createEmptyAppState, getCourseProgress, type AppState } from "@/lib/progress";

type HomeDashboardProps = {
  courses: Course[];
  initialState?: AppState;
};

export function HomeDashboard({ courses, initialState }: HomeDashboardProps) {
  const [state] = useState(initialState ?? createEmptyAppState());

  const courseCards = useMemo(() => {
    return courses.map((course) => {
      const progress = getCourseProgress(state, course.slug);
      const completed = progress.completedSteps.length;
      const total = course.steps.length;
      return {
        course,
        progress,
        completed,
        total,
        percent: Math.round((completed / total) * 100),
        currentStep: course.steps[Math.min(progress.activeStepIndex, total - 1)],
      };
    });
  }, [courses, state]);

  const activeCourses = courseCards.filter((item) => item.completed < item.total);
  const finishedCourses = courseCards.filter((item) => item.completed >= item.total);
  const nextUp = activeCourses[0] ?? courseCards[0];
  const recentDiary = state.diaryEntries[0];

  if (courseCards.length === 0) {
    return (
      <div className="space-y-6">
        <section className="panel-soft section-glow">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Trang chủ</p>
          <h1 className="mt-2 font-display text-4xl leading-[0.95] text-slate-900">Hôm nay mình làm gì?</h1>
        </section>

        <EmptyStatePanel
          eyebrow="Trang chủ"
          title="Chưa có khóa học nào để bắt đầu"
          description="Khi catalog có khóa được xuất bản, trang chủ sẽ hiện tiến độ, khóa đang làm và bước tiếp theo thay vì để màn hình trống."
          highlights={["Trang chủ sẽ ưu tiên đúng bước tiếp theo để quay lại", "Tiến độ và nhật ký gần nhất sẽ tự xuất hiện khi có dữ liệu"]}
          action={
            <Link href="/catalog" className="inline-flex rounded-full border-2 border-outline bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-soft">
              Mở catalog
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="panel-soft section-glow">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Trang chủ</p>
        <h1 className="mt-2 font-display text-4xl leading-[0.95] text-slate-900">Hôm nay mình làm gì?</h1>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="playful-stage text-slate-900">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Tiếp tục ngay</p>
          {nextUp ? (
            <div className="mt-3 space-y-3">
              <h2 className="font-display text-[2.15rem] leading-[0.95]">{nextUp.course.title}</h2>
              <p className="text-sm leading-6 text-slate-600">Bước {nextUp.completed + 1}: {nextUp.currentStep?.title}</p>
              <div className="h-3 overflow-hidden rounded-full bg-white/70">
                <div className="h-3 rounded-full bg-gradient-to-r from-gold via-accent to-sky" style={{ width: `${nextUp.percent}%` }} />
              </div>
              <p className="text-sm text-slate-600">{nextUp.completed}/{nextUp.total} bước · {nextUp.percent}%</p>
              <Link href={`/catalog/${nextUp.course.slug}/step/${Math.min(nextUp.progress.activeStepIndex, nextUp.total - 1)}`} className="inline-flex rounded-full border-2 border-outline bg-white px-4 py-3 text-sm font-bold text-slate-900 shadow-soft">
                Tiếp tục
              </Link>
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-600">Chưa có khóa nào đang làm.</p>
          )}
        </div>

        <div className="grid gap-4">
          <div className="panel-soft section-glow">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Nhật ký</p>
            <p className="mt-2 font-display text-3xl text-slate-900">{recentDiary ? "Đã ghi" : "Chưa ghi"}</p>
            <p className="mt-1 text-sm text-slate-600">{recentDiary ? recentDiary.title : "Ghi một dòng ngắn để lưu hôm nay."}</p>
            <div className="mt-4 flex gap-3">
              <Link href="/diary" className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-outline bg-sky-100 px-4 py-3 text-sm font-bold text-sky-900 shadow-soft">Mở nhật ký</Link>
              <Link href="/diary" className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-outline bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-soft">Ghi mới</Link>
            </div>
          </div>

          <div className="panel-soft section-glow">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Tổng quan</p>
            <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
              <span>Đang làm</span>
              <span className="font-bold text-slate-900">{activeCourses.length}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
              <span>Hoàn thành</span>
              <span className="font-bold text-slate-900">{finishedCourses.length}</span>
            </div>
            <Link href="/catalog" className="mt-4 inline-flex rounded-full border-2 border-outline bg-amber-100 px-4 py-3 text-sm font-bold text-amber-900 shadow-soft">
              Đi đến khóa học
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-slate-900">Khóa đang làm</h2>
          <Link href="/catalog" className="text-sm font-semibold text-slate-500">Xem tất cả</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {activeCourses.map((item) => (
            <Link key={item.course.slug} href={`/catalog/${item.course.slug}`} className="list-card transition-transform hover:-translate-y-0.5">
              <div className="overflow-hidden rounded-[1.5rem] bg-slate-50">
                <img src={item.course.coverImage} alt={item.course.whatYouMake} className="aspect-[4/3] w-full object-cover" />
              </div>
              <div className="mt-3 space-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{item.percent}%</p>
                <h3 className="text-lg font-black text-slate-900">{item.course.title}</h3>
                <p className="text-sm text-slate-600">Bước tiếp theo: {item.currentStep?.title}</p>
              </div>
            </Link>
          ))}
          {activeCourses.length === 0 ? (
            <EmptyStatePanel
              eyebrow="Đang làm"
              title="Chưa có khóa nào đang mở"
              description="Bắt đầu một khóa trong catalog để trang chủ luôn có bước tiếp theo rõ ràng cho lần quay lại sau."
              tone="sky"
              highlights={["Một khóa vừa bắt đầu sẽ hiện ngay ở đây", "Tiến độ bước và nút tiếp tục sẽ thay cho trạng thái rỗng này"]}
            />
          ) : null}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl text-slate-900">Khóa đã xong</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {finishedCourses.map((item) => (
            <Link key={item.course.slug} href={`/catalog/${item.course.slug}`} className="list-card transition-transform hover:-translate-y-0.5">
              <img src={item.course.coverImage} alt={item.course.whatYouMake} className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" />
              <div className="mt-3">
                <h3 className="text-lg font-black text-slate-900">{item.course.title}</h3>
                <p className="text-sm text-slate-600">Đã hoàn thành</p>
              </div>
            </Link>
          ))}
          {finishedCourses.length === 0 ? (
            <EmptyStatePanel
              eyebrow="Hoàn thành"
              title="Chưa có khóa nào hoàn thành"
              description="Khi một hành trình kết thúc, thành quả của bé sẽ được gom lại ở đây để nhìn lại và tiếp tục thử khóa mới."
              tone="gold"
              highlights={["Khóa đã xong sẽ được tách riêng để dễ nhìn lại", "Đây cũng là nơi phụ huynh thấy tiến trình dài hạn của bé"]}
            />
          ) : null}
        </div>
      </section>
    </div>
  );
}
