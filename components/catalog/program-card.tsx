import Link from "next/link";
import { ArrowUpRight, Clock3, Gem } from "lucide-react";

import type { Program } from "@/data/programs";

import { Badge } from "@/components/ui/badge";

type ProgramCardProps = {
  program: Program;
};

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Link
      href={`/catalog/${program.slug}`}
      className={`group block overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${program.palette.from} ${program.palette.to} p-5 shadow-soft transition-transform duration-200 hover:-translate-y-1`}
    >
      <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-surface/80 p-5 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Badge>{program.difficulty}</Badge>
            <div>
              <h2 className="font-display text-2xl leading-tight text-white">{program.title}</h2>
              <p className="mt-2 text-sm leading-6 text-text/72">{program.summary}</p>
            </div>
          </div>
          <div className={`rounded-2xl p-3 ${program.palette.accent}`}>
            <Gem className="h-5 w-5 text-white" strokeWidth={2.1} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-text/70">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-2">
            <Clock3 className="h-3.5 w-3.5" />
            {program.duration}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-2">
            <Gem className="h-3.5 w-3.5" />
            {program.goal}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm font-semibold text-white">
          <span>Xem chi tiết</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
