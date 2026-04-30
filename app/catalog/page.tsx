import { Compass, Gem, Sparkles } from "lucide-react";

import { ProgramCard } from "@/components/catalog/program-card";
import { SectionHeading } from "@/components/app/section-heading";
import { Badge } from "@/components/ui/badge";
import { appCopy } from "@/data/copy";
import { programs } from "@/data/programs";

const compareIcons = [Gem, Sparkles, Compass] as const;

export default function CatalogPage() {
  return (
    <div className="space-y-6 pb-6 lg:space-y-8 lg:pb-0">
      <section className="panel-soft section-glow overflow-hidden p-4 lg:p-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:items-center">
          <div className="space-y-5">
            <SectionHeading
              eyebrow={appCopy.catalog.eyebrow}
              title={appCopy.catalog.title}
              description={appCopy.catalog.description}
            />

            <div className="flex flex-wrap gap-2">
              {programs.map((program) => (
                <Badge key={program.slug}>{program.coverLabel}</Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            {programs.map((program, index) => {
              const Icon = compareIcons[index];

              return (
                <div key={program.slug} className="crystal-card flex items-center gap-4 p-4">
                  <div className={`icon-shell h-11 w-11 rounded-[1rem] ${index === 0 ? "bg-sky/30 text-coral" : index === 1 ? "bg-rose/20 text-coral" : "bg-gold/30 text-coral"}`}>
                    <Icon className="h-4 w-4" strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text">{program.title}</p>
                    <p className="mt-1 text-sm text-muted">{program.coverHint}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading title={appCopy.catalog.compareTitle} description={appCopy.catalog.compareDescription} />
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {programs.map((program, index) => (
            <ProgramCard key={program.slug} program={program} className={index === 0 ? "md:col-span-2 2xl:col-span-2" : undefined} />
          ))}
        </div>
      </section>
    </div>
  );
}
