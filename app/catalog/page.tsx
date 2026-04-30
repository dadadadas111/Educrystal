import { Gem, Milestone, Sparkles } from "lucide-react";

import { CrystalCluster } from "@/components/app/crystal-cluster";
import { ProgramCard } from "@/components/catalog/program-card";
import { SectionHeading } from "@/components/app/section-heading";
import { appCopy } from "@/data/copy";
import { programs } from "@/data/programs";

const catalogStats = [
  {
    icon: Gem,
    label: "Program",
    value: String(programs.length),
    detail: "Ba nhịp nuôi tinh thể",
  },
  {
    icon: Sparkles,
    label: "Cấp độ",
    value: String(new Set(programs.map((program) => program.difficulty)).size),
    detail: "Từ dễ tới nâng cao",
  },
  {
    icon: Milestone,
    label: "Milestone",
    value: String(programs.reduce((count, program) => count + program.milestones.length, 0)),
    detail: "Mốc để nhìn thấy tiến bộ",
  },
] as const;

export default function CatalogPage() {
  return (
    <div className="space-y-6 pb-6 lg:space-y-8 lg:pb-0">
      <section className="panel-soft section-glow overflow-hidden lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:items-center lg:gap-6">
        <div className="space-y-5">
          <SectionHeading title={appCopy.catalog.title} description={appCopy.catalog.description} />
          <div className="flex flex-wrap gap-2">
            {programs.map((program) => (
              <span key={program.slug} className="glass-pill text-xs font-semibold text-text/82">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {program.difficulty}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 lg:mt-0">
          <div className="crystal-card flex items-center justify-between gap-4 p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">Tủ tinh thể</p>
              <p className="mt-2 font-display text-3xl text-white">Chọn một nhịp học thật hợp mình</p>
            </div>
            <CrystalCluster size="md" />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {catalogStats.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="metric-tile px-4 py-4">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent/82">
                    <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                    {item.label}
                  </div>
                  <p className="mt-3 font-display text-3xl text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-text/70">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {programs.map((program) => (
          <ProgramCard key={program.slug} program={program} />
        ))}
      </div>
    </div>
  );
}
