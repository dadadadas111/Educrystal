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
          <div className="space-y-5">
            <SectionHeading
              eyebrow={appCopy.home.eyebrow}
              title={appCopy.home.title}
              description={appCopy.home.description}
            />

            <div className="flex flex-wrap gap-2">
              {appCopy.home.heroBadges.map((badge) => (
                <Badge key={badge}>{badge}</Badge>
              ))}
            </div>

            <div className="reward-strip space-y-4 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-white/85 tracking-[0.12em]">{starterProgram.coverLabel}</Badge>
                <Badge className="bg-gold/25 tracking-[0.12em]">{starterProgram.duration}</Badge>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">Mở nhanh nhất hôm nay</p>
                <h2 className="font-display text-[2.05rem] leading-[0.96] text-text md:text-[2.45rem]">
                  {starterProgram.title}
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-muted">{starterProgram.goal}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/catalog" className="w-full justify-center sm:w-auto sm:px-7">
                  {appCopy.home.primaryCta}
                </Button>
                <Button href="/journey" variant="secondary" className="w-full justify-center sm:w-auto">
                  {appCopy.home.secondaryCta}
                </Button>
              </div>
            </div>
          </div>

          <ProgramCover program={starterProgram} size="hero" />
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading title={appCopy.home.processTitle} description={appCopy.home.processDescription} />
        <div className="grid gap-4 lg:grid-cols-3">
          {appCopy.home.processSteps.map((step, index) => {
            const Icon = processIcons[index];

            return (
              <div key={step.title} className="crystal-card section-glow h-full p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="icon-shell h-12 w-12 rounded-[1.2rem] bg-sky/30 text-coral">
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <span className="rounded-full border-2 border-outline bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-coral">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl text-text">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{step.body}</p>
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
