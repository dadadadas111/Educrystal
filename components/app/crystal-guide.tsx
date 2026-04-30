import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CrystalCluster } from "./crystal-cluster";

type CrystalGuideProps = {
  eyebrow: string;
  title: string;
  body: string;
  cheer?: string;
  tone?: "aqua" | "rose" | "gold";
  clusterSize?: "sm" | "md" | "lg";
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
};

export function CrystalGuide({
  eyebrow,
  title,
  body,
  cheer,
  tone = "aqua",
  clusterSize = "md",
  actions,
  aside,
  className,
}: CrystalGuideProps) {
  return (
    <div className={cn("playful-stage section-glow overflow-hidden", className)}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.02fr)_minmax(13rem,0.98fr)] lg:items-center">
        <div className="space-y-4">
          <p className="glass-pill w-fit bg-white/95 text-xs font-bold text-coral">{eyebrow}</p>
          <div className="space-y-3">
            <h2 className="max-w-2xl font-display text-[2.1rem] leading-[0.96] text-text md:text-[2.6rem]">
              {title}
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted">{body}</p>
          </div>
          {actions}
        </div>

        <div className="relative mx-auto flex w-full max-w-[18rem] flex-col items-center">
          {cheer ? (
            <div className="speech-cloud mb-3 w-full max-w-[13rem] self-end text-sm leading-6 text-text">
              <div className="flex items-start gap-2">
                <Sparkles className="mt-1 h-4 w-4 shrink-0 text-coral" strokeWidth={2.2} />
                <p>{cheer}</p>
              </div>
            </div>
          ) : null}

          <CrystalCluster size={clusterSize} tone={tone} className="mx-auto" />

          {aside ? <div className="mt-4 w-full">{aside}</div> : null}
        </div>
      </div>
    </div>
  );
}
