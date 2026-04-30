import Link from "next/link";
import { ArrowUpRight, Clock3, Gem, Sparkles, Target } from "lucide-react";

import { CrystalCluster } from "@/components/app/crystal-cluster";
import type { Program } from "@/data/programs";

import { Badge } from "@/components/ui/badge";

type ProgramCardProps = {
  program: Program;
};

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Link
      href={`/catalog/${program.slug}`}
      className={`group block h-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${program.palette.from} ${program.palette.to} p-5 shadow-soft transition-transform duration-200 hover:-translate-y-1`}
    >
      <div className="section-glow flex h-full flex-col space-y-4 rounded-[1.5rem] border border-white/10 bg-surface/80 p-5 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge>{program.difficulty}</Badge>
              <Badge className="tracking-[0.12em]">{program.duration}</Badge>
            </div>
            <div>
              <h2 className="font-display text-2xl leading-tight text-white">{program.title}</h2>
              <p className="mt-2 text-sm leading-6 text-text/80">{program.tagline}</p>
            </div>
          </div>
          <div className="relative shrink-0">
            <div className={`absolute inset-0 rounded-full blur-2xl ${program.palette.accent}`} />
            <CrystalCluster size="sm" tone={program.palette.tone} className="relative" />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="crystal-card p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent/84">
              <Clock3 className="h-3.5 w-3.5" />
              Nhịp học
            </div>
            <p className="mt-3 font-display text-xl text-white">{program.duration}</p>
            <p className="mt-1 text-sm text-text/68">{program.steps.length} bước nhỏ</p>
          </div>
          <div className="crystal-card p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-rose/86">
              <Sparkles className="h-3.5 w-3.5" />
              Cảm giác
            </div>
            <p className="mt-3 text-sm leading-6 text-text/78">{program.atmosphere}</p>
          </div>
        </div>

        <div className="crystal-card p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold/88">
            <Target className="h-3.5 w-3.5" />
            Mục tiêu
          </div>
          <p className="mt-3 text-sm leading-6 text-text/78">{program.goal}</p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-sm font-semibold text-white">
          <div className="flex items-center gap-2">
            <div className={`rounded-2xl p-2 ${program.palette.accent}`}>
              <Gem className="h-4 w-4 text-white" strokeWidth={2.1} />
            </div>
            <span>Xem chi tiết</span>
          </div>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
