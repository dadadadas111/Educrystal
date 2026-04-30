import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, Compass, Gem, ShieldAlert, Sparkles, Stars } from "lucide-react";
import { notFound } from "next/navigation";

import { CrystalGuide } from "@/components/app/crystal-guide";
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
      <Link href="/catalog" className="inline-flex items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-coral">
        <ArrowLeft className="h-4 w-4" />
        {appCopy.detail.back}
      </Link>

      <section className={`overflow-hidden rounded-[2rem] border-2 border-outline bg-gradient-to-br ${program.palette.from} ${program.palette.to} p-4 shadow-soft lg:p-5`}>
        <div className="grid gap-5 rounded-[1.7rem] border-2 border-white/80 bg-white/92 p-5 xl:grid-cols-[minmax(0,1.02fr)_minmax(20rem,0.98fr)] xl:items-start xl:gap-6">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge>{program.difficulty}</Badge>
              <Badge className="bg-surface-soft tracking-[0.12em]">{program.duration}</Badge>
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-[2.35rem] leading-[0.95] text-text md:text-[2.9rem]">{program.title}</h1>
              <p className="text-base leading-7 text-text">{program.tagline}</p>
              <p className="max-w-3xl text-sm leading-6 text-muted">{program.summary}</p>
            </div>

            <div className="reward-strip space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {appCopy.detail.goal}
              </div>
              <p className="font-display text-[2rem] leading-[0.96] text-text">{program.goal}</p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="crystal-card p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-coral">
                    <Sparkles className="h-3.5 w-3.5" />
                    Phù hợp với ai
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">{program.recommendedFor}</p>
                </div>
                <div className="crystal-card p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-rose">
                    <Compass className="h-3.5 w-3.5" />
                    Cảm giác
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">{program.atmosphere}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/journey" className="w-full justify-center gap-2 sm:w-auto sm:px-7">
                <Sparkles className="h-4 w-4" />
                {appCopy.detail.start}
              </Button>
              <Button href="/catalog" variant="secondary" className="w-full justify-center sm:w-auto">
                Xem program khác
              </Button>
            </div>
          </div>

          <CrystalGuide
            eyebrow="Bản đồ program"
            title="Nhìn một lượt là muốn bắt đầu ngay."
            body="Cụm bước ngắn, mốc vui rõ và đủ gợi ý để không bị ngợp khi mới chạm vào."
            cheer="Tớ sẽ kéo bạn qua từng bước nhỏ thôi, không cần đọc thật nhiều đâu."
            tone={program.palette.tone}
            clusterSize="lg"
            aside={
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="metric-tile px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-coral">Thời lượng</p>
                  <p className="mt-2 font-display text-3xl text-text">{program.duration}</p>
                </div>
                <div className="metric-tile px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-coral">Bước chính</p>
                  <p className="mt-2 font-display text-3xl text-text">{program.steps.length}</p>
                </div>
                <div className="metric-tile px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-coral">Milestone</p>
                  <p className="mt-2 font-display text-3xl text-text">{program.milestones.length}</p>
                </div>
                <div className="metric-tile px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-coral">Lưu ý an toàn</p>
                  <p className="mt-2 font-display text-3xl text-text">{program.safetyNotes.length}</p>
                </div>
              </div>
            }
          />
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(17rem,0.78fr)_minmax(0,1.22fr)] xl:items-start">
        <section className="panel-soft section-glow space-y-4">
          <div className="flex items-center gap-3">
            <div className="icon-shell h-11 w-11 rounded-[1.15rem] bg-accent-soft/75 p-2.5 text-coral">
              <Sparkles className="h-4 w-4" />
            </div>
            <h2 className="font-display text-[2rem] text-text">{appCopy.detail.materials}</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
            {program.materials.map((material) => (
              <div key={material.name} className="crystal-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-text">{material.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{material.note}</p>
                  </div>
                  <span className="rounded-full border-2 border-outline bg-gold/25 px-3 py-1.5 text-xs font-bold text-text">{material.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel-soft section-glow space-y-4">
          <div className="flex items-center gap-3">
            <div className="icon-shell h-11 w-11 rounded-[1.15rem] bg-rose/20 p-2.5 text-coral">
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
                <p className="mt-3 rounded-[1.25rem] border-2 border-outline bg-surface-soft px-3 py-3 text-sm leading-6 text-muted">{step.tip}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="grid gap-4 lg:grid-cols-2 lg:items-start">
        <div className="panel-soft section-glow space-y-4">
          <div className="flex items-center gap-3">
            <div className="icon-shell h-11 w-11 rounded-[1.15rem] bg-accent-soft/70 p-2.5 text-coral">
              <Stars className="h-4 w-4" />
            </div>
            <h2 className="font-display text-[2rem] text-text">{appCopy.detail.milestones}</h2>
          </div>
          <div className="grid gap-3">
            {program.milestones.map((milestone, index) => (
              <div key={milestone.title} className="reward-strip p-4">
                <h3 className="text-sm font-bold text-text">{milestone.title}</h3>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-coral">Mốc {index + 1}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{milestone.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-soft section-glow space-y-4">
          <div className="flex items-center gap-3">
            <div className="icon-shell h-11 w-11 rounded-[1.15rem] bg-gold/25 p-2.5 text-coral">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <h2 className="font-display text-[2rem] text-text">{appCopy.detail.safety}</h2>
          </div>
          <div className="space-y-3">
            {program.safetyNotes.map((note, index) => (
              <div key={note} className="crystal-card flex items-start gap-3 p-4 text-sm leading-6 text-muted">
                <div className="icon-shell flex h-9 w-9 shrink-0 items-center justify-center rounded-[1rem] bg-gold/20 text-coral">
                  <Gem className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-coral">Lưu ý {index + 1}</p>
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
