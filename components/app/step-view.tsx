import React from "react";
import { Button } from "@/components/ui/button";

type Step = {
  title: string;
  body: string;
  tip?: string;
};

type Props = {
  step: Step;
  onNext?: () => void;
  onBack?: () => void;
};

export function StepView({ step, onNext, onBack }: Props) {
  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-center">
        <div className="h-40 w-40 rounded-xl bg-gradient-to-br from-accent-soft to-sky/30" />
      </div>

      <div className="text-center">
        <h3 className="font-display text-2xl">{step.title}</h3>
        <p className="mt-2 text-sm text-muted max-w-xl mx-auto">{step.body}</p>
      </div>

      {step.tip ? (
        <div className="rounded-md bg-white/60 px-3 py-2 text-sm text-muted">Gợi ý: {step.tip}</div>
      ) : null}

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Quay lại
        </Button>
        <Button onClick={onNext} className="flex-1">
          Xong
        </Button>
      </div>
    </div>
  );
}

export default StepView;
