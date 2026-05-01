import { LoaderCircle, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tone = "gold" | "sky" | "rose" | "accent";

const toneStyles: Record<Tone, { panel: string; badge: string; orb: string; text: string }> = {
  gold: {
    panel: "bg-[linear-gradient(135deg,rgba(255,199,84,0.2),rgba(255,255,255,0.95)_45%,rgba(196,244,146,0.34))]",
    badge: "bg-gold/20 text-amber-900",
    orb: "from-gold/65 via-rose/40 to-accent-soft/65",
    text: "text-amber-900",
  },
  sky: {
    panel: "bg-[linear-gradient(135deg,rgba(115,205,255,0.18),rgba(255,255,255,0.95)_45%,rgba(171,157,255,0.2))]",
    badge: "bg-sky/20 text-sky-900",
    orb: "from-sky/70 via-lavender/45 to-white",
    text: "text-sky-900",
  },
  rose: {
    panel: "bg-[linear-gradient(135deg,rgba(255,147,186,0.18),rgba(255,255,255,0.95)_45%,rgba(255,199,84,0.18))]",
    badge: "bg-rose/20 text-rose-900",
    orb: "from-rose/70 via-gold/35 to-white",
    text: "text-rose-900",
  },
  accent: {
    panel: "bg-[linear-gradient(135deg,rgba(196,244,146,0.3),rgba(255,255,255,0.95)_45%,rgba(115,205,255,0.2))]",
    badge: "bg-accent-soft text-slate-900",
    orb: "from-accent-soft via-sky/35 to-white",
    text: "text-slate-900",
  },
};

type EmptyStatePanelProps = {
  eyebrow?: string;
  title: string;
  description: string;
  tone?: Tone;
  action?: ReactNode;
  highlights?: string[];
  icon?: ReactNode;
  className?: string;
};

export function EmptyStatePanel({
  eyebrow,
  title,
  description,
  tone = "gold",
  action,
  highlights,
  icon,
  className,
}: EmptyStatePanelProps) {
  const styles = toneStyles[tone];

  return (
    <div className={cn("panel-soft section-glow overflow-hidden", styles.panel, className)}>
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <span className={cn("glass-pill w-fit text-[11px] font-bold", styles.badge)}>
            <Sparkles className="h-4 w-4" />
            {eyebrow ?? "Educrystal"}
          </span>
          <h2 className="mt-4 font-display text-3xl leading-[0.95] text-slate-900">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
          {highlights && highlights.length > 0 ? (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="rounded-[1.35rem] border border-outline/70 bg-white/70 px-3 py-3 text-sm text-slate-600 shadow-soft">
                  {item}
                </div>
              ))}
            </div>
          ) : null}
          {action ? <div className="mt-4">{action}</div> : null}
        </div>

        <div className="relative min-h-[180px] overflow-hidden rounded-[1.9rem] border-2 border-outline bg-white/75 p-5 shadow-soft">
          <div className={cn("absolute -right-8 -top-8 h-28 w-28 rounded-[2rem] bg-gradient-to-br opacity-85 blur-[2px]", styles.orb)} />
          <div className={cn("absolute -bottom-8 left-3 h-24 w-24 rounded-[2rem] bg-gradient-to-br opacity-65 blur-[2px]", styles.orb)} />
          <div className="relative flex h-full flex-col justify-between gap-5">
            <div className="icon-shell h-14 w-14 text-slate-900">{icon ?? <Sparkles className="h-6 w-6" />}</div>
            <div className="space-y-2">
              <p className={cn("text-sm font-black", styles.text)}>{eyebrow ?? "Educrystal"}</p>
              <div className="space-y-2">
                {["Nội dung rõ ràng", "Không để khoảng trống khó hiểu", "Luôn có hướng đi tiếp"].map((item) => (
                  <div key={item} className="rounded-full border border-outline/70 bg-white/85 px-3 py-2 text-xs font-semibold text-slate-600 shadow-soft">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type StatusBannerProps = {
  title: string;
  description: string;
  tone?: Tone;
};

export function StatusBanner({ title, description, tone = "sky" }: StatusBannerProps) {
  const styles = toneStyles[tone];

  return (
    <div className={cn("rounded-[1.6rem] border-2 border-outline px-4 py-3 shadow-soft", styles.panel)}>
      <p className="text-sm font-black text-slate-900">{title}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

type LoadingStatePanelProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: Tone;
  layout?: "cards" | "table" | "form";
  cardCount?: number;
  className?: string;
};

function renderLoadingSkeleton(layout: LoadingStatePanelProps["layout"], cardCount: number) {
  if (layout === "table") {
    return (
      <div className="mt-5 space-y-3">
        <div className="grid grid-cols-[1.6fr_0.9fr_0.7fr_0.8fr] gap-3 px-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          <div className="h-4 rounded-full bg-white/80" />
          <div className="h-4 rounded-full bg-white/80" />
          <div className="h-4 rounded-full bg-white/80" />
          <div className="h-4 rounded-full bg-white/80" />
        </div>
        {Array.from({ length: Math.max(cardCount, 3) }).map((_, index) => (
          <div key={index} className="list-card animate-pulse grid gap-4 lg:grid-cols-[1.6fr_0.9fr_0.7fr_0.8fr]">
            <div className="space-y-3">
              <div className="h-5 w-2/3 rounded-full bg-white/80" />
              <div className="h-4 w-full rounded-full bg-white/80" />
              <div className="h-4 w-5/6 rounded-full bg-white/80" />
            </div>
            <div className="h-10 rounded-[1.2rem] bg-white/80" />
            <div className="h-10 rounded-[1.2rem] bg-white/80" />
            <div className="h-10 rounded-[1.2rem] bg-white/80" />
          </div>
        ))}
      </div>
    );
  }

  if (layout === "form") {
    return (
      <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="panel-soft animate-pulse space-y-4">
            <div className="h-4 w-24 rounded-full bg-white/80" />
            <div className="h-10 rounded-[1.45rem] bg-white/80" />
            <div className="h-10 rounded-[1.45rem] bg-white/80" />
            <div className="h-32 rounded-[1.6rem] bg-white/80" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: cardCount }).map((_, index) => (
        <div key={index} className="list-card animate-pulse space-y-3">
          <div className="h-28 rounded-[1.5rem] bg-white/80" />
          <div className="h-4 w-24 rounded-full bg-white/80" />
          <div className="h-6 w-3/4 rounded-full bg-white/80" />
          <div className="h-4 w-full rounded-full bg-white/80" />
          <div className="h-4 w-5/6 rounded-full bg-white/80" />
        </div>
      ))}
    </div>
  );
}

export function LoadingStatePanel({
  eyebrow = "Đang tải",
  title = "Đang tải dữ liệu",
  description = "Educrystal đang chuẩn bị nội dung để bạn không gặp màn hình trống.",
  tone = "sky",
  layout = "cards",
  cardCount = 3,
  className,
}: LoadingStatePanelProps) {
  const styles = toneStyles[tone];

  return (
    <div className={cn("panel-soft section-glow overflow-hidden", styles.panel, className)}>
      <span className={cn("glass-pill w-fit text-xs font-bold", styles.badge)}>
        <LoaderCircle className="h-4 w-4 animate-spin" />
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl text-slate-900">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
      {renderLoadingSkeleton(layout, cardCount)}
    </div>
  );
}
