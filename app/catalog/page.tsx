import { Gem, Milestone, Sparkles } from "lucide-react";

import { CrystalCluster } from "@/components/app/crystal-cluster";
import { ProgramCard } from "@/components/catalog/program-card";
import { SectionHeading } from "@/components/app/section-heading";
import { Badge } from "@/components/ui/badge";
import { appCopy } from "@/data/copy";
import { programs } from "@/data/programs";

const catalogStats = [
  {
    icon: Gem,
    label: "Program",
    value: String(programs.length),
    detail: "Ba chuyến khám phá mở màn",
  },
  {
    icon: Sparkles,
    label: "Cấp độ",
    value: String(new Set(programs.map((program) => program.difficulty)).size),
    detail: "Từ dễ tới thử thách hơn",
  },
  {
    icon: Milestone,
    label: "Milestone",
    value: String(programs.reduce((count, program) => count + program.milestones.length, 0)),
    detail: "Mốc nhỏ để ăn mừng",
  },
] as const;

export default function CatalogPage() {
  return (
    <div className="space-y-6 pb-6 lg:space-y-8 lg:pb-0">
      <section className="panel-soft section-glow overflow-hidden p-4 lg:p-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.92fr)] lg:items-center">
          <div className="space-y-5">
            <SectionHeading title={appCopy.catalog.title} description={appCopy.catalog.description} />
            <div className="flex flex-wrap gap-2">
              {programs.map((program) => (
                <Badge key={program.slug} className="bg-white text-text">
                  {program.difficulty}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-3 lg:content-start">
            <div className="crystal-card flex items-center justify-between gap-4 p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">Tủ program</p>
                <p className="mt-2 font-display text-3xl leading-tight text-text">Chọn bài học khiến con muốn bắt đầu ngay</p>
              </div>
              <CrystalCluster size="md" />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {catalogStats.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="metric-tile px-4 py-4">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-coral">
                      <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                      {item.label}
                    </div>
                    <p className="mt-3 font-display text-3xl text-text">{item.value}</p>
                    <p className="mt-1 text-sm text-muted">{item.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {programs.map((program, index) => (
          <ProgramCard key={program.slug} program={program} className={index === 0 ? "md:col-span-2 2xl:col-span-2" : undefined} />
        ))}
      </div>
    </div>
  );
}
