"use client";

import Link from "next/link";
import { CheckCheck, CheckCircle2, ChevronRight, Compass, NotebookPen, Sparkles, Stars } from "lucide-react";
import { useMemo, useState } from "react";

import { CrystalCluster } from "@/components/app/crystal-cluster";
import { SectionHeading } from "@/components/app/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { appCopy, locale } from "@/data/copy";
import { activeJourneySeed } from "@/data/mvp";
import { getProgramBySlug, programs } from "@/data/programs";

const dateFormatter = new Intl.DateTimeFormat(locale, {
  day: "numeric",
  month: "long",
  timeZone: "Asia/Ho_Chi_Minh",
});

const timeFormatter = new Intl.DateTimeFormat(locale, {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Ho_Chi_Minh",
});

export default function JourneyPage() {
  const program = getProgramBySlug(activeJourneySeed.programSlug) ?? programs[0];
  const totalSteps = program.steps.length;
  const [completedStepsCount, setCompletedStepsCount] = useState(activeJourneySeed.completedStepsCount);

  const isComplete = completedStepsCount >= totalSteps;
  const progress = Math.round((Math.min(completedStepsCount, totalSteps) / totalSteps) * 100);
  const currentStep = !isComplete ? program.steps[completedStepsCount] : null;

  const milestoneCards = useMemo(
    () =>
      program.milestones.map((milestone, index) => {
        const plan = activeJourneySeed.milestonePlan[index];
        const targetStep = plan?.targetStep ?? totalSteps;
        const status = completedStepsCount >= targetStep ? "done" : completedStepsCount + 1 === targetStep ? "current" : "upcoming";

        return {
          ...milestone,
          celebration: plan?.celebration,
          targetStep,
          status,
        };
      }),
    [completedStepsCount, program.milestones, totalSteps],
  );

  const currentMilestone = milestoneCards.find((milestone) => milestone.status !== "done") ?? milestoneCards[milestoneCards.length - 1];
  const nextCheckInLabel = `${timeFormatter.format(new Date(activeJourneySeed.nextCheckInAt))} · ${dateFormatter.format(new Date(activeJourneySeed.nextCheckInAt))}`;
  const startedLabel = dateFormatter.format(new Date(activeJourneySeed.startedAt));
  const progressAngle = `${progress * 3.6}deg`;
  const remainingSteps = Math.max(totalSteps - completedStepsCount, 0);
  const stepsUntilMilestone = Math.max(currentMilestone.targetStep - completedStepsCount, 0);
  const guideCheer = isComplete
    ? "Tinh thể đã sáng trọn cụm rồi. Cất khoảnh khắc này vào nhật ký nhé."
    : stepsUntilMilestone <= 1
      ? "Thêm bước này là chạm mốc vui tiếp theo đó."
      : `Còn ${stepsUntilMilestone} bước nữa là tới mốc vui ${currentMilestone.title.toLowerCase()}.`;

  return (
    <div className="space-y-6 pb-6 lg:space-y-8 lg:pb-0">
      <SectionHeading
        eyebrow={appCopy.journey.eyebrow}
        title={appCopy.journey.title}
        description={appCopy.journey.description}
      />

      <section className={`overflow-hidden rounded-[2rem] border-2 border-outline bg-gradient-to-br ${program.palette.from} ${program.palette.to} p-4 shadow-soft lg:p-5`}>
        <div className="grid gap-5 rounded-[1.7rem] border-2 border-white/80 bg-white/92 p-5 xl:grid-cols-[minmax(0,1.02fr)_minmax(20rem,0.98fr)] xl:items-start">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{program.difficulty}</Badge>
              <Badge className="bg-surface-soft tracking-[0.12em]">{program.duration}</Badge>
              <Badge className={isComplete ? "bg-accent-soft text-text" : "bg-gold/45 text-text"}>
                {isComplete ? appCopy.journey.doneStateLabel : appCopy.journey.activeStateLabel}
              </Badge>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-[2.2rem] leading-[0.95] text-text md:text-[2.8rem]">{program.title}</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{program.summary}</p>
              </div>
              <div className={`icon-shell h-12 w-12 rounded-[1.25rem] ${program.palette.accent} text-white`}>
                <Compass className="h-5 w-5" strokeWidth={2.2} />
              </div>
            </div>

            {isComplete ? (
              <div className="reward-strip space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCheck className="mt-1 h-5 w-5 text-success" />
                  <div>
                    <h2 className="font-display text-[2rem] leading-[0.96] text-text">Program này sáng rực rồi!</h2>
                    <p className="mt-2 text-sm leading-6 text-muted">{appCopy.journey.finishedBody}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button href="/diary" className="w-full justify-center gap-2 sm:w-auto">
                    <NotebookPen className="h-4 w-4" />
                    {appCopy.journey.openDiaryCta}
                  </Button>
                  <Button href="/catalog" variant="secondary" className="w-full justify-center sm:w-auto">
                    {appCopy.journey.nextProgramCta}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="quest-card space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">{appCopy.journey.focusTitle}</p>
                    <h2 className="mt-2 font-display text-[2rem] leading-[0.96] text-text">
                      Bước {completedStepsCount + 1}: {currentStep?.title}
                    </h2>
                  </div>
                  <CrystalCluster size="sm" tone={program.palette.tone} className="shrink-0" />
                </div>

                <p className="text-sm leading-6 text-muted">{currentStep?.body}</p>

                <div className="speech-cloud text-sm leading-6 text-text">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">Mẹo nhỏ cho bước này</p>
                  <p className="mt-2">{currentStep?.tip}</p>
                </div>

                <div className="rounded-[1.25rem] border-2 border-outline bg-accent-soft/45 px-4 py-3 text-sm leading-6 text-text">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">Điều cần giữ nhất</p>
                  <p className="mt-2">{activeJourneySeed.focusNote}</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button onClick={() => setCompletedStepsCount((current) => Math.min(current + 1, totalSteps))} className="w-full justify-center gap-2 sm:w-auto">
                    <CheckCircle2 className="h-4 w-4" />
                    {appCopy.journey.primaryCta}
                  </Button>
                  <Button href="/diary" variant="secondary" className="w-full justify-center gap-2 sm:w-auto">
                    <NotebookPen className="h-4 w-4" />
                    {appCopy.journey.openDiaryCta}
                  </Button>
                </div>
              </div>
            )}

            <div className="grid gap-3 md:grid-cols-2">
              <div className="crystal-card p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">Bắt đầu từ</p>
                <p className="mt-2 font-display text-2xl text-text">{startedLabel}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{activeJourneySeed.rhythmLabel}</p>
              </div>

              <div className="crystal-card p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-coral">
                  <Sparkles className="h-3.5 w-3.5" />
                  {appCopy.journey.latestObservationLabel}
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{activeJourneySeed.latestObservation}</p>
              </div>
            </div>
          </div>

          <div className="playful-stage space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="glass-pill bg-white/95 text-xs font-bold text-coral">Tinh thể đang dẫn đường</p>
                <h2 className="mt-3 font-display text-[2rem] leading-[0.96] text-text">
                  {isComplete ? "Đã sáng trọn cụm rồi!" : `${progress}% và còn ${remainingSteps} bước vui`}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {isComplete ? appCopy.journey.finishedTitle : `Mốc gần nhất là ${currentMilestone.title.toLowerCase()}.`}
                </p>
              </div>
              <CrystalCluster size="md" tone={program.palette.tone} className="shrink-0" />
            </div>

            <div className="speech-cloud text-sm leading-6 text-text">{guideCheer}</div>

            <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
              <div
                className="progress-orb mx-auto flex h-36 w-36 shrink-0 items-center justify-center p-3"
                style={{ background: `conic-gradient(rgb(var(--color-accent)) ${progressAngle}, rgb(255 255 255 / 0.8) 0deg)` }}
              >
                <div className="progress-orb flex h-full w-full flex-col items-center justify-center bg-white text-center">
                  <p className="font-display text-4xl text-text">{progress}%</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-coral">Đã lớn lên</p>
                </div>
              </div>

              <div className="grid gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">{appCopy.journey.progressLabel}</p>
                  <p className="mt-2 font-display text-4xl text-text">{completedStepsCount}/{totalSteps}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {isComplete ? "Đã chạm mốc cuối." : `${appCopy.journey.stepCountLabel} · ${nextCheckInLabel}`}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="metric-tile px-3 py-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-coral">Chuỗi vui</p>
                    <p className="mt-2 font-display text-2xl text-text">{activeJourneySeed.streakDays}</p>
                  </div>
                  <div className="metric-tile px-3 py-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-coral">Mốc</p>
                    <p className="mt-2 font-display text-2xl text-text">{milestoneCards.length}</p>
                  </div>
                  <div className="metric-tile px-3 py-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-coral">Lần xem</p>
                    <p className="mt-2 text-sm font-bold leading-5 text-text">{timeFormatter.format(new Date(activeJourneySeed.nextCheckInAt))}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] xl:items-start">
        <section className="panel-soft section-glow space-y-4">
          <div className="space-y-2">
            <h2 className="font-display text-[2rem] text-text">{appCopy.journey.stepListTitle}</h2>
            <p className="text-sm leading-6 text-muted">{appCopy.journey.stepListDescription}</p>
          </div>
          <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            {program.steps.map((step, index) => {
              const status = index < completedStepsCount ? "done" : index === completedStepsCount && !isComplete ? "current" : "upcoming";
              const statusClasses =
                status === "done"
                  ? "bg-accent-soft text-text"
                  : status === "current"
                    ? "bg-gold/45 text-text"
                    : "bg-surface-soft text-muted";

              return (
                <div key={step.title} className="crystal-card p-4">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.15rem] font-display text-lg ${status === "done" ? "bg-accent text-white" : status === "current" ? "bg-coral text-white" : "bg-white text-text"}`}>
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold text-text">{step.title}</h3>
                        <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] ${statusClasses}`}>
                          {appCopy.journey.stepStates[status as keyof typeof appCopy.journey.stepStates]}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-muted">{step.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="panel-soft section-glow space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="icon-shell h-11 w-11 rounded-[1.15rem] bg-sky/30 text-coral">
                  <Stars className="h-4 w-4" />
                </div>
                <h2 className="font-display text-[2rem] text-text">{appCopy.journey.milestoneTitle}</h2>
              </div>
              <Link href={`/catalog/${program.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-coral">
                {appCopy.journey.detailCta}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="text-sm leading-6 text-muted">{appCopy.journey.milestoneDescription}</p>
          </div>
          <div className="space-y-3">
            {milestoneCards.map((milestone) => {
              const statusTone =
                milestone.status === "done"
                  ? "border-accent bg-accent-soft/45 text-text"
                  : milestone.status === "current"
                    ? "border-gold bg-gold/25 text-text"
                    : "border-outline bg-white text-muted";

              return (
                <div key={milestone.title} className="crystal-card p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-text">{milestone.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{milestone.detail}</p>
                    </div>
                    <span className={`rounded-full border-2 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] ${statusTone}`}>
                      {appCopy.journey.milestoneStates[milestone.status as keyof typeof appCopy.journey.milestoneStates]}
                    </span>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-surface-soft">
                    <div
                      className={`h-full rounded-full ${milestone.status === "done" ? "bg-accent" : milestone.status === "current" ? "bg-coral" : "bg-outline"}`}
                      style={{ width: `${Math.min((Math.min(completedStepsCount, milestone.targetStep) / milestone.targetStep) * 100, 100)}%` }}
                    />
                  </div>
                  {milestone.celebration ? <p className="mt-3 rounded-[1.2rem] bg-accent-soft/35 px-3 py-3 text-sm leading-6 text-text">{milestone.celebration}</p> : null}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
