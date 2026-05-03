"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import type { Course } from "@/data/courses";
import { addReminder, createEmptyAppState, getCourseProgress, type AppState, upsertCourseProgress } from "@/lib/progress";

type CourseStepPlayerProps = {
  course: Course;
  stepIndex: number;
  initialState?: AppState;
};

function addDays(base: Date, days: number) {
  return new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
}

export function CourseStepPlayer({ course, stepIndex, initialState }: CourseStepPlayerProps) {
  const router = useRouter();
  const [state, setState] = useState(initialState ?? createEmptyAppState());
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const progress = getCourseProgress(state, course.slug);
  const step = course.steps[stepIndex] ?? course.steps[0];
  const canGoBack = stepIndex > 0;
  const canGoNext = stepIndex < course.steps.length - 1;
  const percent = Math.round((progress.completedSteps.length / course.steps.length) * 100);
  const requiresWait = step.kind === "wait";

  const reminderAt = useMemo(() => {
    if (!step.waitDays) return null;
    return addDays(new Date(), step.waitDays).toISOString();
  }, [step.waitDays]);

  // Reset image loaded state when step changes
  useMemo(() => {
    setImageLoaded(false);
  }, [stepIndex]);

  const persist = (nextState: typeof state) => {
    setState(nextState);
  };

  const syncProgress = async (nextIndex: number, completedStepIndex?: number) => {
    try {
      setIsLoading(true);
      const nextCompleted = completedStepIndex === undefined || progress.completedSteps.includes(completedStepIndex)
        ? progress.completedSteps
        : [...progress.completedSteps, completedStepIndex];

      const nextProgress = {
        activeStepIndex: Math.max(0, Math.min(nextIndex, course.steps.length - 1)),
        completedSteps: nextCompleted,
        updatedAt: new Date().toISOString(),
      };

      persist(upsertCourseProgress(state, course.slug, nextProgress));

      await fetch("/api/user/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseSlug: course.slug,
          activeStepIndex: nextProgress.activeStepIndex,
          completedSteps: nextProgress.completedSteps,
        }),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goToStep = async (nextIndex: number) => {
    await syncProgress(nextIndex);
    router.push(`/catalog/${course.slug}/step/${nextIndex}`);
  };

  const handleComplete = async () => {
    if (requiresWait) {
      setShowConfirm(true);
      return;
    }

    await syncProgress(Math.min(stepIndex + 1, course.steps.length - 1), stepIndex);
    if (canGoNext) {
      router.push(`/catalog/${course.slug}/step/${stepIndex + 1}`);
    } else {
      router.push(`/catalog/${course.slug}`);
    }
  };

  const handleConfirmComplete = async () => {
    await syncProgress(Math.min(stepIndex + 1, course.steps.length - 1), stepIndex);
    setShowConfirm(false);
    if (canGoNext) {
      router.push(`/catalog/${course.slug}/step/${stepIndex + 1}`);
    } else {
      router.push(`/catalog/${course.slug}`);
    }
  };

  const handleReminder = async () => {
    if (!reminderAt) return;

    try {
      setIsLoading(true);
      const nextState = addReminder(
        upsertCourseProgress(state, course.slug, {
          activeStepIndex: stepIndex,
          completedSteps: progress.completedSteps,
          reminderAt,
          updatedAt: new Date().toISOString(),
        }),
        {
          courseSlug: course.slug,
          stepIndex,
          reminderAt,
          note: step.waitHint ?? "Nhắc quay lại bước này",
        },
      );

      persist(nextState);

      const courseReminders = nextState.reminders
        .filter((reminder) => reminder.courseSlug === course.slug)
        .map((reminder) => ({
          stepIndex: reminder.stepIndex,
          reminderAt: reminder.reminderAt,
          note: reminder.note,
        }));

      await fetch("/api/user/reminders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseSlug: course.slug,
          reminders: courseReminders,
        }),
      });

      setShowConfirm(false);
      router.push(`/catalog/${course.slug}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <section className="panel-soft section-glow">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Bước {step.order}</p>
        <h1 className="mt-2 font-display text-4xl leading-[0.95] text-slate-900">{step.title}</h1>
        <p className="mt-2 text-sm text-slate-600">{percent}%</p>
      </section>

      <section className="playful-stage space-y-4">
        <div className="overflow-hidden rounded-[1.75rem] border-2 border-outline bg-slate-50 shadow-soft">
          <img 
            src={step.media?.src ?? course.coverImage} 
            alt={step.media?.alt ?? course.whatYouMake} 
            className={`aspect-[4/3] w-full object-cover transition-all duration-500 ${imageLoaded ? '' : 'blur-lg'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Làm gì</p>
          <p className="mt-2 text-base leading-7 text-slate-700">{step.body}</p>
        </div>

        {step.kind === "prepare" ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="quest-card space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Dụng cụ</p>
              <div className="space-y-2">
                {course.preparation.tools.map((tool) => (
                  <div key={`${tool.name}-${tool.spec}`} className="rounded-xl border border-outline/70 bg-white/70 px-3 py-2 text-sm">
                    <p className="font-semibold text-slate-800">{tool.name}</p>
                    <p className="text-slate-600">{tool.spec}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="quest-card space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Nguyên liệu định lượng</p>
              <div className="space-y-2">
                {course.preparation.ingredients.map((ingredient) => (
                  <div key={`${ingredient.name}-${ingredient.amount}-${ingredient.unit}`} className="rounded-xl border border-outline/70 bg-white/70 px-3 py-2 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-800">{ingredient.name}</p>
                      <p className="text-slate-700">{ingredient.amount} {ingredient.unit}</p>
                    </div>
                    {ingredient.note ? <p className="text-xs text-slate-500">{ingredient.note}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {step.notes && step.notes.length > 0 ? (
          <div className="quest-card text-sm leading-6 text-amber-900">
            <p className="font-black">Lưu ý</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-900">
              {step.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="quest-card text-sm leading-6 text-emerald-800">
          <p className="font-black">Điều kiện hoàn thành</p>
          <p className="mt-1">{step.passCriteria}</p>
        </div>

        {requiresWait ? (
          <div className="quest-card text-sm leading-6 text-amber-900">
            <p className="font-black">Bước này cần chờ thêm vài ngày.</p>
            <p className="mt-1">{step.waitHint ?? "Theo dõi chậm thôi rồi quay lại khi tinh thể lớn thêm."}</p>
          </div>
        ) : null}

        <div className="flex gap-3">
            <button
              type="button"
              onClick={() => void (canGoBack ? goToStep(stepIndex - 1) : router.push(`/catalog/${course.slug}`))}
              disabled={isLoading}
              className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-outline bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 shadow-soft disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Quay lại
            </button>
            <button
              type="button"
              onClick={() => void handleComplete()}
              disabled={isLoading}
              className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-outline bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-soft disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Đang xử lý..." : (requiresWait ? "Xong giai đoạn" : "Xong bước")}
          </button>
        </div>
      </section>

      {showConfirm ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/35 p-4 sm:items-center">
          <div className="w-full max-w-lg panel-soft section-glow">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Xác nhận</p>
            <h2 className="mt-2 font-display text-3xl text-slate-900">Bước này còn cần chờ</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Nếu đã hoàn thành phần cần làm hôm nay, hãy chuyển sang bước tiếp theo hoặc đặt nhắc cho ngày sau.</p>

            <div className="mt-4 space-y-2 quest-card text-sm text-slate-700">
              <p className="font-semibold">{step.waitHint ?? "Nhớ để yên và theo dõi hằng ngày."}</p>
              {reminderAt ? <p>Nhắc lại dự kiến: {new Date(reminderAt).toLocaleDateString("vi-VN")}</p> : null}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => void handleConfirmComplete()} disabled={isLoading} className="rounded-full border-2 border-outline bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-soft disabled:opacity-60 disabled:cursor-not-allowed">
                {isLoading ? "Đang xử lý..." : "Mình đã làm xong"}
              </button>
              <button type="button" onClick={() => void handleReminder()} disabled={isLoading} className="rounded-full border-2 border-outline bg-amber-100 px-4 py-3 text-sm font-bold text-amber-900 shadow-soft disabled:opacity-60 disabled:cursor-not-allowed">
                {isLoading ? "Đang xử lý..." : "Nhắc lại khi tới ngày"}
              </button>
            </div>

            <button type="button" onClick={() => setShowConfirm(false)} disabled={isLoading} className="mt-3 w-full rounded-full border-2 border-outline bg-slate-100 px-4 py-3 text-sm font-bold text-slate-600 shadow-soft disabled:opacity-60 disabled:cursor-not-allowed">
              Đóng
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
