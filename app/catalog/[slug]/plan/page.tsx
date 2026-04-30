import Link from "next/link";
import { ArrowLeft, Clock3, Stars } from "lucide-react";
import { notFound } from "next/navigation";

import { ScreenTabs } from "@/components/app/screen-tabs";
import { ProgramCover } from "@/components/catalog/program-cover";
import { Button } from "@/components/ui/button";
import { appCopy } from "@/data/copy";
import { getProgramBySlug, programs } from "@/data/programs";

type ProgramPlanPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export default async function ProgramPlanPage({ params }: ProgramPlanPageProps) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const tabs = [
    { href: `/catalog/${program.slug}`, label: appCopy.detail.overview },
    { href: `/catalog/${program.slug}/prepare`, label: appCopy.detail.prepare },
    { href: `/catalog/${program.slug}/plan`, label: appCopy.detail.plan },
  ];

  return (
    <div className="space-y-6 pb-6 lg:space-y-8 lg:pb-0">
      <Link href="/catalog" className="inline-flex items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-coral">
        <ArrowLeft className="h-4 w-4" />
        {appCopy.detail.back}
      </Link>

      <ScreenTabs items={tabs} currentHref={`/catalog/${program.slug}/plan`} />

      <section className="grid gap-5 xl:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)] xl:items-start">
        <ProgramCover program={program} size="compact" className="xl:sticky xl:top-28" />

        <div className="panel-soft section-glow space-y-5 p-5 lg:p-6">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">{appCopy.detail.planTitle}</p>
            <h1 className="font-display text-[2.2rem] leading-[0.96] text-text md:text-[2.7rem]">{program.title}</h1>
            <p className="text-sm leading-6 text-muted">{appCopy.detail.planDescription}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="metric-tile px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-coral">{appCopy.detail.steps}</p>
              <p className="mt-2 font-display text-3xl text-text">{program.steps.length}</p>
            </div>
            <div className="metric-tile px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-coral">{appCopy.detail.milestones}</p>
              <p className="mt-2 font-display text-3xl text-text">{program.milestones.length}</p>
            </div>
            <div className="metric-tile px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-coral">Thời lượng</p>
              <p className="mt-2 font-display text-3xl text-text">{program.duration}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/journey" className="w-full justify-center sm:w-auto sm:px-7">
              {appCopy.detail.start}
            </Button>
            <Button href={`/catalog/${program.slug}/prepare`} variant="secondary" className="w-full justify-center sm:w-auto">
              {appCopy.detail.openPrepare}
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(17rem,0.92fr)] xl:items-start">
        <div className="panel-soft section-glow space-y-4">
          <div className="flex items-center gap-3">
            <div className="icon-shell h-11 w-11 rounded-[1.1rem] bg-rose/20 text-coral">
              <Clock3 className="h-4 w-4" />
            </div>
            <h2 className="font-display text-[2rem] text-text">{appCopy.detail.steps}</h2>
          </div>

          <div className="space-y-3">
            {program.steps.map((step, index) => (
              <div key={step.title} className="crystal-card p-4 lg:p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[1rem] bg-coral font-display text-lg text-white">
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-text">{step.title}</h3>
                  </div>
                  <span className="rounded-full border-2 border-outline bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                    Bước {index + 1}
                  </span>
                </div>
                <p className="text-sm leading-6 text-muted">{step.body}</p>
                <p className="mt-3 rounded-[1.2rem] border-2 border-outline bg-surface-soft px-3 py-3 text-sm leading-6 text-text">
                  {step.tip}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-soft section-glow space-y-4">
          <div className="flex items-center gap-3">
            <div className="icon-shell h-11 w-11 rounded-[1.1rem] bg-accent-soft/65 text-coral">
              <Stars className="h-4 w-4" />
            </div>
            <h2 className="font-display text-[2rem] text-text">{appCopy.detail.milestones}</h2>
          </div>

          <div className="space-y-3">
            {program.milestones.map((milestone, index) => (
              <div key={milestone.title} className="reward-strip p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-coral">Mốc {index + 1}</p>
                <h3 className="mt-2 text-sm font-bold text-text">{milestone.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{milestone.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
