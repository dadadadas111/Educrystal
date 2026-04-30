import { ArrowRight, Compass, Gem, Milestone, NotebookPen, ShieldCheck, Sparkles, Stars } from "lucide-react";

import { CrystalGuide } from "@/components/app/crystal-guide";
import { ProgramCard } from "@/components/catalog/program-card";
import { SectionHeading } from "@/components/app/section-heading";
import { ValuePillarCard } from "@/components/home/value-pillar-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { appCopy } from "@/data/copy";
import { programs } from "@/data/programs";

const highlights = [
  {
    icon: Compass,
    label: "Luôn biết bước tiếp theo",
    tone: "bg-accent-soft/70 text-text",
  },
  {
    icon: ShieldCheck,
    label: "An toàn nằm ngay trong luồng học",
    tone: "bg-gold/35 text-text",
  },
  {
    icon: Gem,
    label: "Tinh thể là nhân vật chính",
    tone: "bg-rose/35 text-text",
  },
] as const;

const processIcons = [Compass, Milestone, NotebookPen] as const;
const pillarIcons = [Sparkles, Stars, NotebookPen] as const;
const starterProgram = programs[0];

export default function HomePage() {
  return (
    <div className="space-y-8 pb-6 lg:space-y-10 lg:pb-0">
      <section className="panel-soft section-glow overflow-hidden p-4 sm:p-5 lg:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.06fr)_minmax(19rem,0.94fr)] lg:items-center">
          <div className="space-y-5">
            <SectionHeading
              eyebrow={appCopy.home.eyebrow}
              title={appCopy.home.title}
              description={appCopy.home.description}
            />

            <div className="flex flex-wrap gap-2">
              {appCopy.home.heroBadges.map((badge) => (
                <Badge key={badge} className="bg-white text-text">
                  {badge}
                </Badge>
              ))}
            </div>

            <div className="reward-strip space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-gold/35 text-text">Màn chạm đầu tiên</Badge>
                <Badge className="bg-white/90 tracking-[0.12em]">{starterProgram.duration}</Badge>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">Bắt đầu dễ nhất hôm nay</p>
                <h2 className="font-display text-[2.05rem] leading-[0.96] text-text md:text-[2.45rem]">
                  Chơi ngay với {starterProgram.title.toLowerCase()}.
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-muted">{starterProgram.tagline}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href={`/catalog/${starterProgram.slug}`} className="w-full justify-center sm:w-auto sm:px-7">
                  Chơi ngay với mầm này
                </Button>
                <Button href="/catalog" variant="secondary" className="w-full justify-center sm:w-auto">
                  Xem đủ {programs.length} program
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="glass-pill min-h-[4.25rem] justify-start rounded-[1.45rem] px-4 py-3 text-left shadow-soft">
                    <div className={`icon-shell h-11 w-11 shrink-0 rounded-[1.2rem] ${item.tone}`}>
                      <Icon className="h-4 w-4" strokeWidth={2.2} />
                    </div>
                    <p className="text-sm font-semibold leading-6 text-text">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <CrystalGuide
            eyebrow="Mầm Tí Xíu đang chờ"
            title="Chạm cụm sáng nhất để cuộc chơi bật lên ngay."
            body="Tinh thể ở đây không chỉ để ngắm. Nó nhắc bước tiếp theo, báo mốc vui và kéo mình muốn quay lại thật nhanh."
            cheer="Tớ sẽ chỉ mốc vui đầu tiên và nhắc lúc nên quay lại ngắm tiếp."
            clusterSize="lg"
            tone="aqua"
            actions={
              <Button href="/journey" variant="secondary" className="w-full justify-center sm:w-auto">
                Xem hành trình mẫu đang sáng
              </Button>
            }
            aside={
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="metric-tile px-3 py-3">
                  <p className="font-display text-2xl text-text">{programs.length}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">Program</p>
                </div>
                <div className="metric-tile px-3 py-3">
                  <p className="font-display text-2xl text-text">5p</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">Mỗi lượt</p>
                </div>
                <div className="metric-tile px-3 py-3">
                  <p className="font-display text-2xl text-text">Riêng</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">Nhật ký</p>
                </div>
              </div>
            }
          />
        </div>
      </section>

      <section id="cach-hoat-dong" className="space-y-4">
        <SectionHeading title="Ba bước để cuộc phiêu lưu bắt đầu" description="Ngắn, sáng rõ và luôn biết mình cần làm gì tiếp theo." />
        <div className="grid gap-4 lg:grid-cols-3">
          {appCopy.home.processSteps.map((step, index) => {
            const Icon = processIcons[index];

            return (
              <div key={step.title} className="panel-soft section-glow h-full p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="icon-shell h-12 w-12 rounded-[1.25rem] bg-sky/30 text-coral">
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-text">
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
        <SectionHeading
          title={appCopy.home.featuredTitle}
          description={appCopy.home.featuredDescription}
          className="max-w-3xl"
        />
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

      <section className="space-y-4">
        <SectionHeading title="Ba điều làm Educrystal đáng yêu hơn" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {appCopy.home.pillars.map((pillar, index) => (
            <ValuePillarCard
              key={pillar.title}
              index={`0${index + 1}`}
              title={pillar.title}
              body={pillar.body}
              icon={pillarIcons[index]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
