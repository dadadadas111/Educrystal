import { ShieldCheck, Sparkles } from "lucide-react";

import { CrystalCluster } from "@/components/app/crystal-cluster";
import { SectionHeading } from "@/components/app/section-heading";
import { Button } from "@/components/ui/button";
import { appCopy } from "@/data/copy";

export default function ShowcasePage() {
  return (
    <div className="space-y-6 pb-6 lg:space-y-8 lg:pb-0">
      <SectionHeading
        eyebrow="Khu chia sẻ đã kiểm duyệt"
        title={appCopy.futureSections.showcase.title}
        description={appCopy.futureSections.showcase.body}
      />

      <section className="panel-soft section-glow overflow-hidden lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] lg:gap-5">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="icon-shell h-11 w-11 rounded-2xl bg-gold/20 p-2.5 text-gold">
              <Sparkles className="h-4 w-4 text-gold" />
            </div>
            <h2 className="font-display text-2xl text-white">Một phòng trưng bày nhỏ, sáng và đã được lọc kỹ</h2>
          </div>
          <p className="text-sm leading-6 text-text/74">Khi mở ra, nơi này sẽ chỉ giữ những thành quả, góc chụp và ghi chú thật sự giúp ích cho người học khác.</p>
          <div className="crystal-card p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-success" />
              <p className="text-sm text-text/82">Mọi bài ở đây đều đi qua kiểm duyệt trước khi xuất hiện để giữ không gian tham khảo luôn gọn và an toàn.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="metric-tile px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-accent/80">Ảnh tinh thể</p>
              <p className="mt-2 text-sm leading-6 text-text/76">Cụm đẹp, rõ và thật.</p>
            </div>
            <div className="metric-tile px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-accent/80">Ghi chú ngắn</p>
              <p className="mt-2 text-sm leading-6 text-text/76">Điều học được sau hành trình.</p>
            </div>
            <div className="metric-tile px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-accent/80">Kiểm duyệt</p>
              <p className="mt-2 text-sm leading-6 text-text/76">Giữ cảm giác triển lãm, không phải feed.</p>
            </div>
          </div>
          <Button href="/catalog" variant="secondary" className="w-full justify-center sm:w-auto sm:px-7">
            Xem lại các program nguồn
          </Button>
        </div>

        <div className="mt-4 grid gap-3 lg:mt-0 lg:content-start">
          <div className="crystal-card flex items-center justify-between gap-4 p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">Trạng thái hiện tại</p>
              <p className="mt-2 font-display text-3xl text-white">Đang giữ chỗ cho những cụm đầu tiên</p>
            </div>
            <CrystalCluster size="md" tone="gold" className="shrink-0" />
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="crystal-card h-28 bg-gradient-to-br from-white/10 to-transparent p-4" />
            <div className="crystal-card h-28 bg-gradient-to-br from-accent/10 to-transparent p-4" />
            <div className="crystal-card h-28 bg-gradient-to-br from-gold/10 to-transparent p-4" />
          </div>
        </div>
      </section>
    </div>
  );
}
