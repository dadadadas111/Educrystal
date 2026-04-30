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
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge>{program.difficulty}</Badge>
              <Badge className="bg-surface-soft tracking-[0.12em]">{program.duration}</Badge>
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-2xl leading-tight text-text">{program.title}</h1>
              <p className="text-sm text-muted truncate">{program.tagline}</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="crystal-card p-3 text-center text-sm">{program.coverLabel}</div>
              <div className="crystal-card p-3 text-center text-sm">{program.recommendedFor}</div>
              <div className="crystal-card p-3 text-center text-sm">{program.atmosphere}</div>
            </div>
          </div>

          <div className="mt-5">
            <div className="sticky bottom-4 z-20">
              <div className="flex gap-3">
                <Button href={`/catalog/${program.slug}/prepare`} className="flex-1">
                  {appCopy.detail.openPrepare}
                </Button>
                <Button href={`/catalog/${program.slug}/plan`} variant="secondary" className="flex-1">
                  {appCopy.detail.openPlan}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
