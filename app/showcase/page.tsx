import { ShieldCheck, Sparkles } from "lucide-react";

import { SectionHeading } from "@/components/app/section-heading";
import { Button } from "@/components/ui/button";
import { appCopy } from "@/data/copy";

export default function ShowcasePage() {
  return (
    <div className="space-y-6 pb-6">
      <SectionHeading
        eyebrow="Khu chia sẻ đã kiểm duyệt"
        title={appCopy.futureSections.showcase.title}
        description={appCopy.futureSections.showcase.body}
      />

      <section className="panel-soft space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gold/20 p-2.5">
            <Sparkles className="h-4 w-4 text-gold" />
          </div>
          <h2 className="font-display text-2xl text-white">Khu chia sẻ sẽ chỉ giữ lại những bài thật sự đáng tham khảo</h2>
        </div>
        <p className="text-sm leading-6 text-text/74">
          Đây là nơi những bài chia sẻ đã được kiểm duyệt sẽ xuất hiện để truyền cảm hứng cho người học khác. Khu vực này chỉ
          tập trung vào thành quả, kinh nghiệm và bài học hữu ích.
        </p>
        <div className="list-card">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-4 w-4 text-success" />
            <p className="text-sm text-text/82">Mọi bài ở đây đều sẽ đi qua kiểm duyệt trước khi xuất hiện để giữ không gian tham khảo luôn gọn và an toàn.</p>
          </div>
        </div>
        <Button href="/catalog" variant="secondary" className="w-full justify-center">
          Xem lại các program nguồn
        </Button>
      </section>
    </div>
  );
}
