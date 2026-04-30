import { ArrowRight, Compass, Gem, ShieldCheck } from "lucide-react";

import { ProgramCard } from "@/components/catalog/program-card";
import { SectionHeading } from "@/components/app/section-heading";
import { ValuePillarCard } from "@/components/home/value-pillar-card";
import { Button } from "@/components/ui/button";
import { appCopy } from "@/data/copy";
import { programs } from "@/data/programs";

const highlights = [
  {
    icon: Compass,
    label: "Hành trình có định hướng",
  },
  {
    icon: ShieldCheck,
    label: "Lưu ý an toàn ở ngay trong program",
  },
  {
    icon: Gem,
    label: "Chủ đề tinh thể sáng rõ, ấm áp và dễ theo dõi",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8 pb-6">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-accent-soft/30 via-surface/88 to-surface-strong/96 px-5 py-6 shadow-soft">
        <div className="space-y-6 rounded-[1.75rem] border border-white/10 bg-surface/72 p-5 backdrop-blur-sm">
          <SectionHeading
            eyebrow={appCopy.home.eyebrow}
            title={appCopy.home.title}
            description={appCopy.home.description}
          />

          <div className="grid grid-cols-1 gap-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="rounded-2xl bg-accent-soft/70 p-2.5">
                    <Icon className="h-4 w-4 text-white" strokeWidth={2.2} />
                  </div>
                  <p className="text-sm leading-6 text-text/82">{item.label}</p>
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
      </section>

      <section id="cach-hoat-dong" className="space-y-4">
        <div className="panel-soft">
          <h2 className="font-display text-2xl text-white">Từ khám phá đến tinh thể hoàn chỉnh</h2>
          <p className="mt-3 text-sm leading-6 text-text/72">
            Educrystal không bắt đầu từ một feed. Nó bắt đầu từ một program phù hợp, rồi dẫn bạn qua từng bước,
            từng cột mốc và những quan sát nhỏ đáng nhớ trong suốt hành trình.
          </p>
          <div className="mt-5 space-y-3">
            <div className="list-card">
              <p className="text-xs uppercase tracking-[0.22em] text-accent/80">Bước 1</p>
              <p className="mt-2 text-sm text-text/82">Chọn program theo độ khó, thời lượng và mục tiêu bạn muốn thử đầu tiên.</p>
            </div>
            <div className="list-card">
              <p className="text-xs uppercase tracking-[0.22em] text-accent/80">Bước 2</p>
              <p className="mt-2 text-sm text-text/82">Xem vật liệu, bước làm, milestone và lưu ý an toàn ngay trong cùng một luồng.</p>
            </div>
            <div className="list-card">
              <p className="text-xs uppercase tracking-[0.22em] text-accent/80">Bước 3</p>
              <p className="mt-2 text-sm text-text/82">Bắt đầu hành trình để sẵn sàng ghi nhật ký riêng và chia sẻ thành quả khi bạn muốn lan tỏa kết quả của mình.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading
          title={appCopy.home.featuredTitle}
          description={appCopy.home.featuredDescription}
        />
        <div className="space-y-4">
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
        <div className="grid gap-4">
          {appCopy.home.pillars.map((pillar, index) => (
            <ValuePillarCard key={pillar.title} index={`0${index + 1}`} title={pillar.title} body={pillar.body} />
          ))}
        </div>
      </section>
    </div>
  );
}
