"use client";

import { Sparkles, Stars } from "lucide-react";
import { useMemo } from "react";

import { ProgramCover } from "@/components/catalog/program-cover";
import { ScreenTabs } from "@/components/app/screen-tabs";
import { SectionHeading } from "@/components/app/section-heading";
import { appCopy, locale } from "@/data/copy";
import { activeJourneySeed } from "@/data/mvp";
import { getProgramBySlug, programs } from "@/data/programs";
import { useJourneyProgress } from "@/lib/mvp-client-state";

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

const journeyTabs = [
  { href: "/journey", label: "Bước đang làm" },
  { href: "/journey/progress", label: "Tiến độ" },
];

export default function JourneyProgressPage() {
  const program = getProgramBySlug(activeJourneySeed.programSlug) ?? programs[0];
  const totalSteps = program.steps.length;
  const { completedStepsCount } = useJourneyProgress(totalSteps);

  const progress = Math.round((Math.min(completedStepsCount, totalSteps) / totalSteps) * 100);
  const progressAngle = `${progress * 3.6}deg`;
  const nextCheckInLabel = `${timeFormatter.format(new Date(activeJourneySeed.nextCheckInAt))} · ${dateFormatter.format(new Date(activeJourneySeed.nextCheckInAt))}`;

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

  return (
    <div className="space-y-6 pb-6 lg:space-y-8 lg:pb-0">
      <SectionHeading eyebrow={appCopy.journey.eyebrow} title={appCopy.journey.progressTitle} description={appCopy.journey.progressDescription} />

      <ScreenTabs items={journeyTabs} currentHref="/journey/progress" />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(16rem,0.9fr)] xl:items-start">
        <div className="playful-stage space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="glass-pill bg-white/95 text-xs font-bold text-coral">{program.title}</p>
              <h2 className="mt-3 font-display text-[2.1rem] leading-[0.96] text-text">{progress}% đã sáng lên</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{nextCheckInLabel}</p>
            </div>

            <div
              className="progress-orb flex h-36 w-36 items-center justify-center p-3"
              style={{ background: `conic-gradient(rgb(var(--color-accent)) ${progressAngle}, rgb(255 255 255 / 0.8) 0deg)` }}
            >
              <div className="progress-orb flex h-full w-full flex-col items-center justify-center bg-white text-center">
                <p className="font-display text-4xl text-text">{progress}%</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-coral">Đã lớn lên</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="metric-tile px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-coral">{appCopy.journey.stepCountLabel}</p>
              <p className="mt-2 font-display text-3xl text-text">{completedStepsCount}</p>
            </div>
            <div className="metric-tile px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-coral">{appCopy.journey.milestoneTitle}</p>
              <p className="mt-2 font-display text-3xl text-text">{milestoneCards.length}</p>
            </div>
            <div className="metric-tile px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-coral">{appCopy.journey.streakLabel}</p>
              <p className="mt-2 font-display text-3xl text-text">{activeJourneySeed.streakDays}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <ProgramCover program={program} size="compact" />

          <div className="crystal-card p-4">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-coral">
              <Sparkles className="h-3.5 w-3.5" />
              {appCopy.journey.latestObservationLabel}
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{activeJourneySeed.latestObservation}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(17rem,0.92fr)] xl:items-start">
        <div className="panel-soft section-glow space-y-4">
          <h2 className="font-display text-[2rem] text-text">{appCopy.journey.stepListTitle}</h2>
          <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            {program.steps.map((step, index) => {
              const status = index < completedStepsCount ? "done" : index === completedStepsCount ? "current" : "upcoming";
              const statusClasses =
                status === "done"
                  ? "bg-accent-soft text-text"
                  : status === "current"
                    ? "bg-gold/35 text-text"
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
        </div>

        <div className="panel-soft section-glow space-y-4">
          <div className="flex items-center gap-3">
            <div className="icon-shell h-11 w-11 rounded-[1.1rem] bg-sky/30 text-coral">
              <Stars className="h-4 w-4" />
            </div>
            <h2 className="font-display text-[2rem] text-text">{appCopy.journey.milestoneTitle}</h2>
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
        </div>
      </section>
    </div>
  );
}
