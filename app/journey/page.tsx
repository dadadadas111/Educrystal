"use client";

import Link from "next/link";
import { CheckCheck, CheckCircle2, ChevronRight, Compass, Milestone, NotebookPen, Sparkles } from "lucide-react";
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

  return (
    <div className="space-y-6 pb-6 lg:space-y-8 lg:pb-0">
      <SectionHeading
        eyebrow={appCopy.journey.eyebrow}
        title={appCopy.journey.title}
        description={appCopy.journey.description}
      />

      <section className={`section-glow overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${program.palette.from} ${program.palette.to} p-5 shadow-soft lg:p-6 xl:p-7`}>
        <div className="grid gap-5 rounded-[1.75rem] border border-white/10 bg-surface/78 p-5 backdrop-blur-sm xl:grid-cols-[minmax(0,1.02fr)_minmax(20rem,0.98fr)] xl:p-6">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{program.difficulty}</Badge>
              <Badge className="tracking-[0.12em]">{program.duration}</Badge>
              <Badge className="border-accent/30 bg-accent/12 text-accent">{isComplete ? appCopy.journey.doneStateLabel : appCopy.journey.activeStateLabel}</Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="font-display text-[2.2rem] leading-tight text-white md:text-[2.6rem]">{program.title}</h1>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-text/76">{program.summary}</p>
                </div>
                <div className={`icon-shell h-12 w-12 rounded-2xl ${program.palette.accent} text-white`}>
                  <Compass className="h-5 w-5" strokeWidth={2.2} />
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="crystal-card p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-accent/80">Bắt đầu từ</p>
                <p className="mt-2 font-display text-2xl text-white">{startedLabel}</p>
                <p className="mt-2 text-sm leading-6 text-text/72">{activeJourneySeed.rhythmLabel}</p>
              </div>

              <div className="crystal-card p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent/82">
                  <Sparkles className="h-3.5 w-3.5" />
                  {appCopy.journey.latestObservationLabel}
                </div>
                <p className="mt-3 text-sm leading-6 text-text/78">{activeJourneySeed.latestObservation}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 xl:content-start">
            <div className="crystal-card p-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent/80">{appCopy.journey.progressLabel}</p>
                  <p className="mt-2 font-display text-4xl text-white">{progress}%</p>
                  <p className="mt-2 text-sm leading-6 text-text/72">
                    {completedStepsCount}/{totalSteps} {appCopy.journey.stepCountLabel}
                  </p>
                </div>

                <div
                  className="progress-orb flex h-36 w-36 shrink-0 items-center justify-center p-3"
                  style={{ background: `conic-gradient(rgb(var(--color-accent)) ${progressAngle}, rgb(255 255 255 / 0.08) 0deg)` }}
                >
                  <div className="progress-orb flex h-full w-full flex-col items-center justify-center bg-surface-strong/95 text-center">
                    <p className="font-display text-4xl text-white">{progress}%</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent/82">Đã lớn lên</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="metric-tile px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-accent/80">{appCopy.journey.streakLabel}</p>
                <p className="mt-2 font-display text-3xl text-white">{activeJourneySeed.streakDays}</p>
              </div>
              <div className="metric-tile px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-accent/80">{appCopy.journey.nextCheckInLabel}</p>
                <p className="mt-2 text-sm font-semibold leading-5 text-white">{nextCheckInLabel}</p>
              </div>
              <div className="metric-tile px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-accent/80">Milestone</p>
                <p className="mt-2 font-display text-3xl text-white">{milestoneCards.length}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel-soft section-glow space-y-4">
        <div className="flex items-center gap-3">
          <div className="icon-shell h-11 w-11 rounded-2xl bg-accent-soft/75 text-white">
            <Milestone className="h-4 w-4" />
          </div>
          <h2 className="font-display text-2xl text-white">{appCopy.journey.focusTitle}</h2>
        </div>

        {isComplete ? (
          <div className="space-y-4 rounded-[1.6rem] border border-success/20 bg-success/10 p-4">
            <div className="flex items-start gap-3">
              <CheckCheck className="mt-1 h-5 w-5 text-success" />
              <div>
                <h3 className="text-base font-semibold text-white">{appCopy.journey.finishedTitle}</h3>
                <p className="mt-2 text-sm leading-6 text-text/76">{appCopy.journey.finishedBody}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/diary" className="w-full justify-center gap-2">
                <NotebookPen className="h-4 w-4" />
                {appCopy.journey.openDiaryCta}
              </Button>
              <Button href="/catalog" variant="secondary" className="w-full justify-center">
                {appCopy.journey.nextProgramCta}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-3 xl:grid-cols-2">
              <div className="crystal-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-accent/80">{appCopy.journey.nextActionLabel}</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">
                      Bước {completedStepsCount + 1}: {currentStep?.title}
                    </h3>
                  </div>
                  <CrystalCluster size="sm" tone={program.palette.tone} />
                </div>
                <p className="mt-4 text-sm leading-6 text-text/80">{currentStep?.body}</p>
                <div className="mt-4 rounded-[1.25rem] bg-surface-strong/68 px-4 py-3 text-sm leading-6 text-text/80">
                  <p className="text-xs uppercase tracking-[0.18em] text-accent/80">Gợi ý để bước này trơn tru hơn</p>
                  <p className="mt-2">{currentStep?.tip}</p>
                </div>
                <div className="mt-3 rounded-[1.25rem] bg-white/5 px-4 py-3 text-sm leading-6 text-text/76">
                  <p className="text-xs uppercase tracking-[0.18em] text-accent/80">Điểm cần chú ý nhất</p>
                  <p className="mt-2">{activeJourneySeed.focusNote}</p>
                </div>
              </div>

              <div className="crystal-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-accent/80">{appCopy.journey.milestoneTitle}</p>
                    <h3 className="mt-2 text-base font-semibold text-white">{currentMilestone.title}</h3>
                  </div>
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold">
                    {appCopy.journey.milestoneStates[currentMilestone.status as keyof typeof appCopy.journey.milestoneStates]}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-text/76">{currentMilestone.detail}</p>
                {currentMilestone.celebration ? (
                  <div className="mt-4 rounded-[1.25rem] bg-gold/10 px-4 py-3 text-sm leading-6 text-text/78">
                    {currentMilestone.celebration}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => setCompletedStepsCount((current) => Math.min(current + 1, totalSteps))} className="w-full justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                {appCopy.journey.primaryCta}
              </Button>
              <Button href="/diary" variant="secondary" className="w-full justify-center gap-2">
                <NotebookPen className="h-4 w-4" />
                {appCopy.journey.openDiaryCta}
              </Button>
            </div>
          </>
        )}

        <Link href={`/catalog/${program.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-text/72 transition-colors hover:text-accent">
          {appCopy.journey.detailCta}
          <ChevronRight className="h-4 w-4" />
        </Link>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] xl:items-start">
        <section className="panel-soft section-glow space-y-4">
          <div className="space-y-2">
            <h2 className="font-display text-2xl text-white">{appCopy.journey.stepListTitle}</h2>
            <p className="text-sm leading-6 text-text/72">{appCopy.journey.stepListDescription}</p>
          </div>
          <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            {program.steps.map((step, index) => {
              const status = index < completedStepsCount ? "done" : index === completedStepsCount && !isComplete ? "current" : "upcoming";
              const statusClasses =
                status === "done"
                  ? "bg-success/18 text-success"
                  : status === "current"
                    ? "bg-accent/16 text-accent"
                    : "bg-white/8 text-text/70";

              return (
                <div key={step.title} className="crystal-card p-4">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl font-display text-lg text-white ${status === "done" ? "bg-success/30" : status === "current" ? "bg-accent-soft/75" : "bg-surface-strong/80"}`}>
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${statusClasses}`}>
                          {appCopy.journey.stepStates[status as keyof typeof appCopy.journey.stepStates]}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-text/74">{step.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="panel-soft section-glow space-y-4">
          <div className="space-y-2">
            <h2 className="font-display text-2xl text-white">{appCopy.journey.milestoneTitle}</h2>
            <p className="text-sm leading-6 text-text/72">{appCopy.journey.milestoneDescription}</p>
          </div>
          <div className="space-y-3">
            {milestoneCards.map((milestone) => {
              const statusTone =
                milestone.status === "done"
                  ? "border-success/20 bg-success/10 text-success"
                  : milestone.status === "current"
                    ? "border-gold/20 bg-gold/10 text-gold"
                    : "border-white/10 bg-white/6 text-text/72";

              return (
                <div key={milestone.title} className="crystal-card p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white">{milestone.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-text/72">{milestone.detail}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${statusTone}`}>
                      {appCopy.journey.milestoneStates[milestone.status as keyof typeof appCopy.journey.milestoneStates]}
                    </span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/8">
                    <div
                      className={`h-full rounded-full ${milestone.status === "done" ? "bg-success" : milestone.status === "current" ? "bg-gold" : "bg-white/20"}`}
                      style={{ width: `${Math.min((Math.min(completedStepsCount, milestone.targetStep) / milestone.targetStep) * 100, 100)}%` }}
                    />
                  </div>
                  {milestone.celebration ? <p className="mt-3 text-sm leading-6 text-text/70">{milestone.celebration}</p> : null}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
