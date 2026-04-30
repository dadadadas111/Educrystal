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
      <SectionHeading eyebrow={appCopy.journey.eyebrow} title={appCopy.journey.title} />

      <ScreenTabs items={journeyTabs} currentHref="/journey" />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(17rem,0.92fr)] xl:items-start">
        <div className="panel-soft section-glow space-y-4 p-5 lg:p-6">
          <div className="flex items-center gap-2">
            <Badge>{program.difficulty}</Badge>
            <Badge className="bg-surface-soft tracking-[0.12em]">{program.duration}</Badge>
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-2xl">{program.title}</h1>
            {isComplete ? (
              <p className="text-sm text-muted">{appCopy.journey.finishedBody}</p>
            ) : (
              <>
                <p className="text-lg font-bold">{`Bước ${completedStepsCount + 1}: ${currentStep?.title}`}</p>
                <p className="text-sm text-muted">{currentStep?.body}</p>
              </>
            )}
          </div>

          <div className="flex gap-3">
            {!isComplete ? (
              <Button onClick={completeStep} className="flex-1 text-lg">
                {appCopy.journey.primaryCta}
              </Button>
            ) : (
              <Button href="/catalog" className="flex-1">
                {appCopy.journey.nextProgramCta}
              </Button>
            )}
            <Button href="/diary/new" variant="secondary" className="flex-1">
              {appCopy.journey.openDiaryCta}
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          <ProgramCover program={program} size="compact" />

          <div className="crystal-card p-4 text-center">
            <p className="font-display text-3xl">{completedStepsCount}/{totalSteps}</p>
            <p className="text-sm text-muted">{appCopy.journey.progressLabel}</p>
          </div>

          <div className="crystal-card p-4 text-center">
            <p className="font-bold">{currentMilestone.title}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
