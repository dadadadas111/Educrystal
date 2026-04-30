import { ArrowRight, Compass, Gem, Milestone, NotebookPen, ShieldCheck, Sparkles } from "lucide-react";

import { CrystalCluster } from "@/components/app/crystal-cluster";
import { ProgramCard } from "@/components/catalog/program-card";
import { SectionHeading } from "@/components/app/section-heading";
import { ValuePillarCard } from "@/components/home/value-pillar-card";
import { Button } from "@/components/ui/button";
import { appCopy } from "@/data/copy";
import { programs } from "@/data/programs";

const highlights = [
  {
    icon: Compass,
    label: "Luôn thấy bước tiếp theo",
  },
  {
    icon: ShieldCheck,
    label: "An toàn nằm ngay trong flow",
  },
  {
    icon: Gem,
    label: "Tinh thể là nhân vật chính",
  },
];

const processIcons = [Compass, Milestone, NotebookPen] as const;
const pillarIcons = [Sparkles, Gem, NotebookPen] as const;

export default function HomePage() {
  return (
    <div className="space-y-8 pb-6 lg:space-y-10 lg:pb-0">
      <section className="section-glow overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-accent-soft/30 via-surface/88 to-surface-strong/96 px-5 py-6 shadow-soft lg:px-6 lg:py-6 xl:px-7 xl:py-7">
        <div className="grid gap-6 rounded-[1.75rem] border border-white/10 bg-surface/72 p-5 backdrop-blur-sm lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:gap-6 lg:p-6">
          <div className="space-y-6">
            <SectionHeading
              eyebrow={appCopy.home.eyebrow}
              title={appCopy.home.title}
              description={appCopy.home.description}
            />

            <div className="flex flex-wrap gap-2">
              {appCopy.home.heroBadges.map((badge) => (
                <span key={badge} className="glass-pill text-xs font-semibold text-text/84">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {badge}
                </span>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="crystal-card p-4">
                    <div className="icon-shell h-10 w-10 rounded-2xl bg-accent-soft/72 text-white">
                      <Icon className="h-4 w-4" strokeWidth={2.2} />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-text/82">{item.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href="/catalog">{appCopy.home.primaryCta}</Button>
              <Button href="#cach-hoat-dong" variant="secondary">
                {appCopy.home.secondaryCta}
              </Button>
            </div>
          </div>

          <div className="grid gap-3 lg:content-start">
            <div className="crystal-card overflow-hidden p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/82">Trạm nuôi tinh thể</p>
                  <h2 className="mt-2 font-display text-3xl text-white">Một góc học tập biết phát sáng</h2>
                </div>
                <CrystalCluster size="lg" />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="metric-tile px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent/80">Program</p>
                  <p className="mt-2 font-display text-3xl text-white">{programs.length}</p>
                </div>
                <div className="metric-tile px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent/80">Nhịp xem</p>
                  <p className="mt-2 font-display text-3xl text-white">5p</p>
                </div>
                <div className="metric-tile px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent/80">Không gian</p>
                  <p className="mt-2 font-display text-3xl text-white">Riêng</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="crystal-card p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-accent/80">Bắt đầu</p>
                <p className="mt-2 text-sm leading-6 text-text/78">Chọn một program hợp sức và thấy ngay mục tiêu đầu tiên.</p>
              </div>
              <div className="crystal-card p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-accent/80">Lớn dần</p>
                <p className="mt-2 text-sm leading-6 text-text/78">Theo từng mốc sáng lên thay vì đọc một khối hướng dẫn dài.</p>
              </div>
              <div className="crystal-card p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-accent/80">Ghi lại</p>
                <p className="mt-2 text-sm leading-6 text-text/78">Lưu cảm giác và quan sát ngay khi tinh thể vừa đổi khác.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cach-hoat-dong" className="space-y-4">
        <div className="panel-soft space-y-4">
          <SectionHeading title="Từ mầm nhỏ đến cụm tinh thể" description="Ba nhịp ngắn để mọi màn hình trông giống một hành trình đang lớn dần." />
          <div className="grid gap-3 lg:grid-cols-3">
            {appCopy.home.processSteps.map((step, index) => {
              const Icon = processIcons[index];

              return (
                <div key={step.title} className="crystal-card p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="icon-shell h-11 w-11 rounded-2xl bg-accent-soft/72 text-white">
                      <Icon className="h-4 w-4" strokeWidth={2.2} />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent/82">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-text/74">{step.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading
          title={appCopy.home.featuredTitle}
          description={appCopy.home.featuredDescription}
          className="max-w-3xl"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
        <Button href="/catalog" variant="ghost" className="gap-2 px-0 text-sm">
          Xem toàn bộ catalog
          <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
        </Button>
      </section>

      <section className="space-y-4">
        <SectionHeading title="Ba lớp giá trị cốt lõi" />
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
