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
        <div className="icon-shell h-12 w-12 rounded-[1.25rem] bg-rose/25 text-coral">
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </div>
        <span className="rounded-full border-2 border-outline bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-coral">
          {index}
        </span>
      </div>
      <h3 className="font-display text-xl text-text">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
    </div>
  );
}
