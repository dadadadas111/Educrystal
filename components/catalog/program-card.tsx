import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Program } from "@/data/programs";

import { Badge } from "@/components/ui/badge";
import { ProgramCover } from "@/components/catalog/program-cover";
import { cn } from "@/lib/utils";

type ProgramCardProps = {
  program: Program;
  className?: string;
};

export function ProgramCard({ program, className }: ProgramCardProps) {
  return (
    <Link
      href={`/catalog/${program.slug}`}
      className={cn(
        "group block h-full transition-transform duration-200 hover:-translate-y-1",
        className,
      )}
    >
      <div className="flex h-full flex-col gap-4">
        <ProgramCover program={program} size="card" />

        <div className="panel-soft section-glow flex flex-1 flex-col p-5">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge>{program.difficulty}</Badge>
              <Badge className="bg-surface-soft tracking-[0.12em]">{program.steps.length} bước</Badge>
            </div>

            <div>
              <h2 className="font-display text-[2rem] leading-[0.96] text-text">{program.title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-text">{program.tagline}</p>
            </div>

            <p className="text-sm leading-6 text-muted">{program.coverHint}</p>
          </div>

          <div className="mt-auto flex items-center justify-between pt-4 text-sm font-bold text-text">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border-2 border-outline bg-white px-3 py-2 text-xs uppercase tracking-[0.14em] text-coral shadow-soft">
                {program.duration}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-[1.2rem] border-2 border-outline bg-white px-4 py-3 shadow-soft">
              <span>Mở program</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
