"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { StepView } from "@/components/app/step-view";
import { getProgramBySlug } from "@/data/programs";
import { useJourneyProgress } from "@/lib/mvp-client-state";

type Props = {
  slug: string;
  stepIndex: number;
};

export function StepRunner({ slug, stepIndex }: Props) {
  const router = useRouter();
  const program = getProgramBySlug(slug);
  const totalSteps = program?.steps.length ?? 0;
  const { completeStep } = useJourneyProgress(totalSteps);

  if (!program) return <div>Không tìm thấy khoá học.</div>;

  const step = program.steps[stepIndex];

  if (!step) return <div>Bước không tồn tại.</div>;

  const handleNext = () => {
    completeStep();
    const nextIndex = stepIndex + 1;
    if (nextIndex < totalSteps) {
      router.push(`/catalog/${slug}/plan/step/${nextIndex}`);
    } else {
      router.push(`/journey`);
    }
  };

  const handleBack = () => router.back();

  return <StepView step={{ title: step.title, body: step.body, tip: step.tip }} onNext={handleNext} onBack={handleBack} />;
}

export default StepRunner;
