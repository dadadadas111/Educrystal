import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, ShieldAlert, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

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

  return (
    <div className="space-y-6 pb-6">
      <Link href="/catalog" className="inline-flex items-center gap-2 text-sm font-medium text-text/72 transition-colors hover:text-accent">
        <ArrowLeft className="h-4 w-4" />
        {appCopy.detail.back}
      </Link>

      <section className={`overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${program.palette.from} ${program.palette.to} p-5 shadow-soft`}>
        <div className="space-y-5 rounded-[1.75rem] border border-white/10 bg-surface/78 p-5 backdrop-blur-sm">
          <div className="flex flex-wrap gap-2">
            <Badge>{program.difficulty}</Badge>
            <Badge className="tracking-[0.12em]">{program.duration}</Badge>
          </div>
          <div className="space-y-3">
            <h1 className="font-display text-[2.4rem] leading-tight text-white">{program.title}</h1>
            <p className="text-base leading-7 text-text/82">{program.tagline}</p>
            <p className="text-sm leading-6 text-text/72">{program.summary}</p>
          </div>

          <div className="grid gap-3 text-sm text-text/80">
            <div className="list-card">
              <p className="text-xs uppercase tracking-[0.2em] text-accent/80">Phù hợp với ai</p>
              <p className="mt-2 leading-6">{program.recommendedFor}</p>
            </div>
            <div className="list-card">
              <p className="text-xs uppercase tracking-[0.2em] text-accent/80">Cảm giác hành trình</p>
              <p className="mt-2 leading-6">{program.atmosphere}</p>
            </div>
            <div className="list-card">
              <p className="text-xs uppercase tracking-[0.2em] text-accent/80">{appCopy.detail.goal}</p>
              <p className="mt-2 leading-6">{program.goal}</p>
            </div>
          </div>

          <Button href="/journey" className="w-full justify-center">
            {appCopy.detail.start}
          </Button>
        </div>
      </section>

      <section className="panel-soft space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-accent-soft/70 p-2.5">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <h2 className="font-display text-2xl text-white">{appCopy.detail.materials}</h2>
        </div>
        <div className="grid gap-3">
          {program.materials.map((material) => (
            <div key={material.name} className="list-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-white">{material.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-text/72">{material.note}</p>
                </div>
                <span className="rounded-full bg-white/8 px-3 py-1.5 text-xs font-semibold text-accent">{material.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel-soft space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-rose/15 p-2.5">
            <Clock3 className="h-4 w-4 text-white" />
          </div>
          <h2 className="font-display text-2xl text-white">{appCopy.detail.steps}</h2>
        </div>
        <div className="space-y-3">
          {program.steps.map((step, index) => (
            <div key={step.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-accent-soft/75 font-display text-lg text-white">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-white">{step.title}</h3>
              </div>
              <p className="text-sm leading-6 text-text/76">{step.body}</p>
              <p className="mt-3 rounded-[1.25rem] bg-white/5 px-3 py-3 text-sm leading-6 text-accent/90">{step.tip}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <div className="panel-soft space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-success/20 p-2.5">
              <CheckCircle2 className="h-4 w-4 text-success" />
            </div>
            <h2 className="font-display text-2xl text-white">{appCopy.detail.milestones}</h2>
          </div>
          <div className="space-y-3">
            {program.milestones.map((milestone) => (
              <div key={milestone.title} className="list-card">
                <h3 className="text-sm font-semibold text-white">{milestone.title}</h3>
                <p className="mt-2 text-sm leading-6 text-text/72">{milestone.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-soft space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gold/20 p-2.5">
              <ShieldAlert className="h-4 w-4 text-gold" />
            </div>
            <h2 className="font-display text-2xl text-white">{appCopy.detail.safety}</h2>
          </div>
          <div className="space-y-3">
            {program.safetyNotes.map((note) => (
              <div key={note} className="list-card text-sm leading-6 text-text/76">
                {note}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
