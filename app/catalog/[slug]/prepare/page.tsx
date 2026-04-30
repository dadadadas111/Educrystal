import Link from "next/link";
import { ArrowLeft, ShieldAlert, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

import { ScreenTabs } from "@/components/app/screen-tabs";
import { ProgramCover } from "@/components/catalog/program-cover";
import { Button } from "@/components/ui/button";
import { appCopy } from "@/data/copy";
import { getProgramBySlug, programs } from "@/data/programs";

type ProgramPreparePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export default async function ProgramPreparePage({ params }: ProgramPreparePageProps) {
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

      <ScreenTabs items={tabs} currentHref={`/catalog/${program.slug}/prepare`} />

      <section className="grid gap-5 xl:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)] xl:items-start">
        <ProgramCover program={program} size="compact" className="xl:sticky xl:top-28" />

        <div className="panel-soft section-glow space-y-5 p-5 lg:p-6">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">{appCopy.detail.prepareTitle}</p>
            <h1 className="font-display text-[2.2rem] leading-[0.96] text-text md:text-[2.7rem]">{program.title}</h1>
            <p className="text-sm leading-6 text-muted">{appCopy.detail.prepareDescription}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="metric-tile px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-coral">{appCopy.detail.materials}</p>
              <p className="mt-2 font-display text-3xl text-text">{program.materials.length}</p>
            </div>
            <div className="metric-tile px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-coral">{appCopy.detail.safety}</p>
              <p className="mt-2 font-display text-3xl text-text">{program.safetyNotes.length}</p>
            </div>
            <div className="metric-tile px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-coral">Bước</p>
              <p className="mt-2 font-display text-3xl text-text">{program.steps.length}</p>
            </div>
            <div className="metric-tile px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-coral">Mốc vui</p>
              <p className="mt-2 font-display text-3xl text-text">{program.milestones.length}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={`/catalog/${program.slug}/plan`} className="w-full justify-center sm:w-auto">
              {appCopy.detail.openPlan}
            </Button>
            <Button href={`/catalog/${program.slug}`} variant="secondary" className="w-full justify-center sm:w-auto">
              {appCopy.detail.openOverview}
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(17rem,0.92fr)] xl:items-start">
        <div className="panel-soft section-glow space-y-4">
          <div className="flex items-center gap-3">
            <div className="icon-shell h-11 w-11 rounded-[1.1rem] bg-accent-soft/65 text-coral">
              <Sparkles className="h-4 w-4" />
            </div>
            <h2 className="font-display text-[2rem] text-text">{appCopy.detail.materials}</h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {program.materials.map((material) => (
              <div key={material.name} className="crystal-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-text">{material.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{material.note}</p>
                  </div>
                  <span className="rounded-full border-2 border-outline bg-gold/25 px-3 py-1.5 text-xs font-bold text-text">
                    {material.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-soft section-glow space-y-4">
          <div className="flex items-center gap-3">
            <div className="icon-shell h-11 w-11 rounded-[1.1rem] bg-gold/30 text-coral">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <h2 className="font-display text-[2rem] text-text">{appCopy.detail.safety}</h2>
          </div>

          <div className="space-y-3">
            {program.safetyNotes.map((note, index) => (
              <div key={note} className="crystal-card p-4 text-sm leading-6 text-muted">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-coral">Lưu ý {index + 1}</p>
                <p className="mt-2">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
