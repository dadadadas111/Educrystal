import Link from "next/link";
import { ArrowLeft, Compass, Sparkles, Target } from "lucide-react";
import { notFound } from "next/navigation";

import { ScreenTabs } from "@/components/app/screen-tabs";
import { ProgramCover } from "@/components/catalog/program-cover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { appCopy } from "@/data/copy";
import { getProgramBySlug, programs } from "@/data/programs";

type ProgramDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export default async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
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

      <ScreenTabs items={tabs} currentHref={`/catalog/${program.slug}`} />

      <section className="grid gap-5 xl:grid-cols-[minmax(18rem,23rem)_minmax(0,1fr)] xl:items-stretch">
        <ProgramCover program={program} size="hero" />

        <div className="panel-soft section-glow flex flex-col justify-between p-5 lg:p-6">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge>{program.difficulty}</Badge>
              <Badge className="bg-surface-soft tracking-[0.12em]">{program.duration}</Badge>
              <Badge className="bg-white/85 tracking-[0.12em]">{program.coverLabel}</Badge>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">{appCopy.detail.overviewTitle}</p>
              <h1 className="font-display text-[2.3rem] leading-[0.95] text-text md:text-[2.8rem]">{program.title}</h1>
              <p className="text-base leading-7 text-text">{program.tagline}</p>
              <p className="max-w-3xl text-sm leading-6 text-muted">{appCopy.detail.overviewDescription}</p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="reward-strip p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">
                  <Target className="h-3.5 w-3.5" />
                  {appCopy.detail.goal}
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{program.goal}</p>
              </div>

              <div className="crystal-card p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-coral">
                  <Sparkles className="h-3.5 w-3.5" />
                  {appCopy.detail.recommendedFor}
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{program.recommendedFor}</p>
              </div>

              <div className="crystal-card p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-coral">
                  <Compass className="h-3.5 w-3.5" />
                  {appCopy.detail.atmosphere}
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{program.atmosphere}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={`/catalog/${program.slug}/prepare`} variant="secondary" className="w-full justify-center sm:w-auto">
              {appCopy.detail.openPrepare}
            </Button>
            <Button href={`/catalog/${program.slug}/plan`} variant="secondary" className="w-full justify-center sm:w-auto">
              {appCopy.detail.openPlan}
            </Button>
            <Button href="/journey" className="w-full justify-center sm:w-auto sm:px-7">
              {appCopy.detail.start}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
