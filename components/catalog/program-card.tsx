import Link from "next/link";
import { ArrowUpRight, Clock3, Gem, Sparkles, Target } from "lucide-react";

import { CrystalCluster } from "@/components/app/crystal-cluster";
import type { Program } from "@/data/programs";

import { Badge } from "@/components/ui/badge";
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
        `group block h-full overflow-hidden rounded-[2rem] border-2 border-outline bg-gradient-to-br ${program.palette.from} ${program.palette.to} p-4 shadow-soft transition-transform duration-200 hover:-translate-y-1`,
        className,
      )}
    >
      <div className="section-glow flex h-full flex-col space-y-4 rounded-[1.6rem] border-2 border-white/75 bg-white/92 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge>{program.difficulty}</Badge>
              <Badge className="bg-surface-soft tracking-[0.12em]">{program.duration}</Badge>
            </div>
            <div>
              <h2 className="font-display text-2xl leading-tight text-text">{program.title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-text">{program.tagline}</p>
            </div>
          </div>
          <div className="relative shrink-0">
            <CrystalCluster size="sm" tone={program.palette.tone} className="relative" />
          </div>
        </div>

        <div className="reward-strip p-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">
            <Target className="h-3.5 w-3.5" />
            Mục tiêu lần này
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">{program.goal}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="metric-tile p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-coral">
              <Clock3 className="h-3.5 w-3.5" />
              Nhịp học
            </div>
            <p className="mt-3 font-display text-xl text-text">{program.duration}</p>
            <p className="mt-1 text-sm text-muted">{program.steps.length} bước nhỏ</p>
          </div>
          <div className="metric-tile p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-rose">
              <Sparkles className="h-3.5 w-3.5" />
              Cảm giác
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{program.atmosphere}</p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between rounded-[1.35rem] border-2 border-outline bg-white px-4 py-3 text-sm font-bold text-text shadow-soft">
          <div className="flex items-center gap-2">
            <div className={`rounded-2xl border-2 border-white/80 p-2 ${program.palette.accent}`}>
              <Gem className="h-4 w-4 text-white" strokeWidth={2.1} />
            </div>
            <span>Bắt đầu xem</span>
          </div>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
