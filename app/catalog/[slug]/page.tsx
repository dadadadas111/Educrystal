import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, Compass, Gem, ShieldAlert, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

import { CrystalCluster } from "@/components/app/crystal-cluster";
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
    <div className="space-y-6 pb-6 lg:space-y-8 lg:pb-0">
      <Link href="/catalog" className="inline-flex items-center gap-2 text-sm font-medium text-text/72 transition-colors hover:text-accent">
        <ArrowLeft className="h-4 w-4" />
        {appCopy.detail.back}
      </Link>

      <section className={`section-glow overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${program.palette.from} ${program.palette.to} p-5 shadow-soft lg:p-6 xl:p-7`}>
        <div className="grid gap-5 rounded-[1.75rem] border border-white/10 bg-surface/78 p-5 backdrop-blur-sm xl:grid-cols-[minmax(0,1.02fr)_minmax(20rem,0.98fr)] xl:items-start xl:gap-6 xl:p-6">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge>{program.difficulty}</Badge>
              <Badge className="tracking-[0.12em]">{program.duration}</Badge>
            </div>
            <div className="space-y-3">
              <h1 className="font-display text-[2.4rem] leading-tight text-white md:text-[2.7rem]">{program.title}</h1>
              <p className="text-base leading-7 text-text/84">{program.tagline}</p>
              <p className="max-w-3xl text-sm leading-6 text-text/72">{program.summary}</p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="crystal-card p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent/84">
                  <Sparkles className="h-3.5 w-3.5" />
                  Phù hợp với ai
                </div>
                <p className="mt-3 text-sm leading-6 text-text/78">{program.recommendedFor}</p>
              </div>
              <div className="crystal-card p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-rose/84">
                  <Compass className="h-3.5 w-3.5" />
                  Cảm giác
                </div>
                <p className="mt-3 text-sm leading-6 text-text/78">{program.atmosphere}</p>
              </div>
              <div className="crystal-card p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold/90">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {appCopy.detail.goal}
                </div>
                <p className="mt-3 text-sm leading-6 text-text/78">{program.goal}</p>
              </div>
            </div>

            <Button href="/journey" className="w-full justify-center sm:w-auto sm:px-7">
              {appCopy.detail.start}
            </Button>
          </div>

          <div className="grid gap-3 text-sm text-text/80">
            <div className="crystal-card overflow-hidden p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent/80">Bản đồ program</p>
                  <p className="mt-2 font-display text-3xl text-white">Một cụm bước ngắn, nhìn là muốn bắt đầu</p>
                </div>
                <CrystalCluster size="md" tone={program.palette.tone} className="shrink-0" />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="metric-tile px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent/80">Thời lượng</p>
                  <p className="mt-2 font-display text-3xl text-white">{program.duration}</p>
                </div>
                <div className="metric-tile px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent/80">Bước chính</p>
                  <p className="mt-2 font-display text-3xl text-white">{program.steps.length}</p>
                </div>
                <div className="metric-tile px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent/80">Milestone</p>
                  <p className="mt-2 font-display text-3xl text-white">{program.milestones.length}</p>
                </div>
                <div className="metric-tile px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent/80">Lưu ý an toàn</p>
                  <p className="mt-2 font-display text-3xl text-white">{program.safetyNotes.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(17rem,0.78fr)_minmax(0,1.22fr)] xl:items-start">
        <section className="panel-soft section-glow space-y-4">
          <div className="flex items-center gap-3">
            <div className="icon-shell h-11 w-11 rounded-2xl bg-accent-soft/70 p-2.5 text-white">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h2 className="font-display text-2xl text-white">{appCopy.detail.materials}</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
            {program.materials.map((material) => (
              <div key={material.name} className="crystal-card p-4">
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

        <section className="panel-soft section-glow space-y-4">
          <div className="flex items-center gap-3">
            <div className="icon-shell h-11 w-11 rounded-2xl bg-rose/15 p-2.5 text-white">
              <Clock3 className="h-4 w-4 text-white" />
            </div>
            <h2 className="font-display text-2xl text-white">{appCopy.detail.steps}</h2>
          </div>
          <div className="space-y-3">
            {program.steps.map((step, index) => (
              <div key={step.title} className="crystal-card p-4 lg:p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-soft/75 font-display text-lg text-white">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-white">{step.title}</h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-text/74">
                    Bước {index + 1}
                  </span>
                </div>
                <p className="text-sm leading-6 text-text/76">{step.body}</p>
                <p className="mt-3 rounded-[1.25rem] bg-white/5 px-3 py-3 text-sm leading-6 text-accent/90">{step.tip}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="grid gap-4 lg:grid-cols-2 lg:items-start">
        <div className="panel-soft section-glow space-y-4">
          <div className="flex items-center gap-3">
            <div className="icon-shell h-11 w-11 rounded-2xl bg-success/20 p-2.5 text-success">
              <CheckCircle2 className="h-4 w-4 text-success" />
            </div>
            <h2 className="font-display text-2xl text-white">{appCopy.detail.milestones}</h2>
          </div>
          <div className="grid gap-3">
            {program.milestones.map((milestone, index) => (
              <div key={milestone.title} className="crystal-card p-4">
                <h3 className="text-sm font-semibold text-white">{milestone.title}</h3>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent/80">Mốc {index + 1}</p>
                <p className="mt-2 text-sm leading-6 text-text/72">{milestone.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-soft section-glow space-y-4">
          <div className="flex items-center gap-3">
            <div className="icon-shell h-11 w-11 rounded-2xl bg-gold/20 p-2.5 text-gold">
              <ShieldAlert className="h-4 w-4 text-gold" />
            </div>
            <h2 className="font-display text-2xl text-white">{appCopy.detail.safety}</h2>
          </div>
          <div className="space-y-3">
            {program.safetyNotes.map((note, index) => (
              <div key={note} className="crystal-card flex items-start gap-3 p-4 text-sm leading-6 text-text/76">
                <div className="icon-shell flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gold/16 text-gold">
                  <Gem className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold/86">Lưu ý {index + 1}</p>
                  <p className="mt-1">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
