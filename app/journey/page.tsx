"use client";

import { CheckCheck, CheckCircle2, Compass, NotebookPen, Sparkles, Stars } from "lucide-react";
import { useMemo } from "react";

import { ProgramCover } from "@/components/catalog/program-cover";
import { ScreenTabs } from "@/components/app/screen-tabs";
import { SectionHeading } from "@/components/app/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

export default function JourneyPage() {
  const program = getProgramBySlug(activeJourneySeed.programSlug) ?? programs[0];
  const totalSteps = program.steps.length;
  const { completedStepsCount, completeStep } = useJourneyProgress(totalSteps);

  const isComplete = completedStepsCount >= totalSteps;
  const currentStep = !isComplete ? program.steps[completedStepsCount] : null;

  const milestoneCards = useMemo(
    () =>
      program.milestones.map((milestone, index) => {
        const plan = activeJourneySeed.milestonePlan[index];
        const targetStep = plan?.targetStep ?? totalSteps;
        const status = completedStepsCount >= targetStep ? "done" : completedStepsCount + 1 === targetStep ? "current" : "upcoming";

        return {
          ...milestone,
          targetStep,
          status,
        };
      }),
    [completedStepsCount, program.milestones, totalSteps],
  );

  const currentMilestone = milestoneCards.find((milestone) => milestone.status !== "done") ?? milestoneCards[milestoneCards.length - 1];
  const nextCheckInLabel = `${timeFormatter.format(new Date(activeJourneySeed.nextCheckInAt))} · ${dateFormatter.format(new Date(activeJourneySeed.nextCheckInAt))}`;
  const startedLabel = dateFormatter.format(new Date(activeJourneySeed.startedAt));

  return (
    <div className="space-y-6 pb-6 lg:space-y-8 lg:pb-0">
      <SectionHeading eyebrow={appCopy.journey.eyebrow} title={appCopy.journey.title} description={appCopy.journey.description} />

      <ScreenTabs items={journeyTabs} currentHref="/journey" />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(17rem,0.92fr)] xl:items-start">
        <div className="panel-soft section-glow space-y-5 p-5 lg:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{program.difficulty}</Badge>
            <Badge className="bg-surface-soft tracking-[0.12em]">{program.duration}</Badge>
            <Badge className={isComplete ? "bg-accent-soft text-text" : "bg-gold/35 text-text"}>
              {isComplete ? appCopy.journey.doneStateLabel : appCopy.journey.activeStateLabel}
            </Badge>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">{appCopy.journey.focusTitle}</p>
            <h1 className="font-display text-[2.2rem] leading-[0.95] text-text md:text-[2.8rem]">{program.title}</h1>
          </div>

          {isComplete ? (
            <div className="reward-strip space-y-4 p-5">
              <div className="flex items-start gap-3">
                <CheckCheck className="mt-1 h-5 w-5 text-success" />
                <div>
                  <h2 className="font-display text-[1.9rem] leading-[0.96] text-text">{appCopy.journey.finishedTitle}</h2>
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
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">Bước {completedStepsCount + 1}</p>
                  <h2 className="mt-2 font-display text-[2rem] leading-[0.96] text-text">{currentStep?.title}</h2>
                </div>
                <div className={`icon-shell h-12 w-12 rounded-[1.2rem] ${program.palette.accent} text-white`}>
                  <Compass className="h-5 w-5" strokeWidth={2.2} />
                </div>
              </div>

              <p className="text-sm leading-6 text-muted">{currentStep?.body}</p>

              <div className="speech-cloud text-sm leading-6 text-text">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">Mẹo nhỏ</p>
                <p className="mt-2">{currentStep?.tip}</p>
              </div>

              <div className="rounded-[1.25rem] border-2 border-outline bg-accent-soft/45 px-4 py-3 text-sm leading-6 text-text">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">{appCopy.journey.focusNoteTitle}</p>
                <p className="mt-2">{activeJourneySeed.focusNote}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={completeStep} className="w-full justify-center gap-2 sm:w-auto">
                  <CheckCircle2 className="h-4 w-4" />
                  {appCopy.journey.primaryCta}
                </Button>
                <Button href="/diary/new" variant="secondary" className="w-full justify-center gap-2 sm:w-auto">
                  <NotebookPen className="h-4 w-4" />
                  {appCopy.journey.openDiaryCta}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-4">
          <ProgramCover program={program} size="compact" />

          <div className="crystal-card p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-coral">{appCopy.journey.progressLabel}</p>
            <p className="mt-2 font-display text-4xl text-text">{completedStepsCount}/{totalSteps}</p>
            <p className="mt-2 text-sm text-muted">{appCopy.journey.stepCountLabel}</p>
          </div>

          <div className="crystal-card p-4">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-coral">
              <Stars className="h-3.5 w-3.5" />
              {appCopy.journey.milestoneTitle}
            </div>
            <p className="mt-2 text-sm font-bold text-text">{currentMilestone.title}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{currentMilestone.detail}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <div className="crystal-card p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-coral">Bắt đầu</p>
              <p className="mt-2 font-display text-2xl text-text">{startedLabel}</p>
            </div>
            <div className="crystal-card p-4">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-coral">
                <Sparkles className="h-3.5 w-3.5" />
                {appCopy.journey.nextCheckInLabel}
              </div>
              <p className="mt-2 text-sm font-bold text-text">{nextCheckInLabel}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{activeJourneySeed.latestObservation}</p>
            </div>
          </div>

          <Button href="/journey/progress" variant="secondary" className="w-full justify-center">
            {appCopy.journey.openProgressCta}
          </Button>
        </div>
      </section>
    </div>
  );
}
