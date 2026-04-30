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
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge>{program.difficulty}</Badge>
              <Badge className="bg-surface-soft tracking-[0.12em]">{program.duration}</Badge>
            </div>

            <div>
              <h3 className="font-display text-lg leading-tight text-text truncate">{program.title}</h3>
              <p className="mt-1 text-sm text-muted truncate">{program.tagline}</p>
            </div>
          </div>

          <div className="mt-auto pt-3">
            <div className="flex items-center justify-end">
              <div className="inline-flex items-center gap-2 rounded-[1.2rem] border-2 border-outline bg-white px-4 py-2 shadow-soft">
                <span>Bắt đầu</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
