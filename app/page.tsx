import { ArrowRight, Compass, NotebookPen, Sparkles } from "lucide-react";

import { ProgramCover } from "@/components/catalog/program-cover";
import { ProgramCard } from "@/components/catalog/program-card";
import { SectionHeading } from "@/components/app/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { appCopy } from "@/data/copy";
import { programs } from "@/data/programs";

const processIcons = [Sparkles, Compass, NotebookPen] as const;
const starterProgram = programs[0];

export default function HomePage() {
  return (
    <div className="space-y-8 pb-6 lg:space-y-10 lg:pb-0">
      <section className="panel-soft section-glow overflow-hidden p-4 sm:p-5 lg:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:items-center">
          <div className="space-y-4">
            <SectionHeading eyebrow={appCopy.home.eyebrow} title={appCopy.home.title} />

            <div className="reward-strip space-y-3 p-4">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <h2 className="font-display text-2xl">{starterProgram.title}</h2>
                  <p className="mt-1 text-sm text-muted truncate">{starterProgram.goal}</p>
                </div>

                <div className="w-36">
                  <Button href={`/catalog/${starterProgram.slug}`} className="w-full">
                    Bắt đầu
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <ProgramCover program={starterProgram} size="hero" />
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading title={appCopy.home.processTitle} />
        <div className="grid gap-3 grid-cols-3">
          {appCopy.home.processSteps.map((step, index) => {
            const Icon = processIcons[index];

            return (
              <div key={step.title} className="crystal-card section-glow p-4 text-center">
                <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky/30 text-coral">
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div className="font-bold">{step.title}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading title={appCopy.home.featuredTitle} description={appCopy.home.featuredDescription} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {programs.map((program, index) => (
            <ProgramCard key={program.slug} program={program} className={index === 0 ? "md:col-span-2 xl:col-span-2" : undefined} />
          ))}
        </div>
        <Button href="/catalog" variant="ghost" className="gap-2 px-0 text-sm">
          Xem toàn bộ catalog
          <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
        </Button>
      </section>
    </div>
  );
}
