import { Camera, ShieldCheck, Sparkles, Stars } from "lucide-react";

import { CrystalGuide } from "@/components/app/crystal-guide";
import { SectionHeading } from "@/components/app/section-heading";
import { Button } from "@/components/ui/button";
import { appCopy } from "@/data/copy";

const previewCards = [
  {
    title: "Ảnh tinh thể",
    body: "Chỉ giữ những góc chụp rõ, sáng và thật sự truyền cảm hứng.",
    icon: Camera,
    tone: "bg-sky/25 text-coral",
  },
  {
    title: "Ghi chú ngắn",
    body: "Một vài dòng về điều học được sau hành trình.",
    icon: Sparkles,
    tone: "bg-rose/25 text-coral",
  },
  {
    title: "Kiểm duyệt kỹ",
    body: "Giữ cảm giác như một triển lãm nhỏ, không phải feed ồn ào.",
    icon: ShieldCheck,
    tone: "bg-accent-soft/60 text-text",
  },
] as const;

export default function ShowcasePage() {
  return (
    <div className="space-y-6 pb-6 lg:space-y-8 lg:pb-0">
      <SectionHeading
        eyebrow="Khu chia sẻ đã kiểm duyệt"
        title={appCopy.futureSections.showcase.title}
        description={appCopy.futureSections.showcase.body}
      />

      <section className="panel-soft section-glow overflow-hidden p-4 lg:p-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:items-center">
          <div className="space-y-4">
            <div className="crystal-card flex items-start gap-4 p-5">
              <div className="icon-shell h-12 w-12 rounded-[1.25rem] bg-gold/35 text-coral">
                <Stars className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-[2rem] leading-tight text-text">Một góc trưng bày nhỏ nhưng thật vui mắt</h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Khi mở ra, nơi này sẽ chỉ giữ những thành quả giúp người học khác thấy rằng khoa học cũng có thể rất đáng yêu.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {previewCards.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="metric-tile p-4">
                    <div className={`icon-shell h-10 w-10 rounded-[1rem] ${item.tone}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="mt-3 text-sm font-bold text-text">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
                  </div>
                );
              })}
            </div>

            <Button href="/catalog" variant="secondary" className="w-full justify-center sm:w-auto sm:px-7">
              Xem lại các program nguồn
            </Button>
          </div>

          <div className="grid gap-3 lg:content-start">
            <CrystalGuide
              eyebrow="Trạng thái hiện tại"
              title="Đang giữ chỗ cho những cụm đầu tiên."
              body="Khi mở ra, khu này sẽ giống một góc triển lãm khoa học vui mắt hơn là một feed ồn ào."
              cheer="Chỉ những cụm thật sáng và thật đáng yêu mới được lên đây thôi."
              tone="gold"
              clusterSize="md"
            />

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="crystal-card paper-grid h-28 p-4" />
              <div className="crystal-card confetti-dots h-28 p-4" />
              <div className="crystal-card h-28 bg-gradient-to-br from-accent-soft/40 to-rose/20 p-4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
