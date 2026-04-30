import type { LucideIcon } from "lucide-react";

type ValuePillarCardProps = {
  title: string;
  body: string;
  index: string;
  icon: LucideIcon;
};

export function ValuePillarCard({ title, body, index, icon: Icon }: ValuePillarCardProps) {
  return (
    <div className="crystal-card section-glow h-full p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="icon-shell h-11 w-11 rounded-2xl bg-accent-soft/72 text-white">
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </div>
        <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent/84">
          {index}
        </span>
      </div>
      <h3 className="font-display text-xl text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-text/72">{body}</p>
    </div>
  );
}
