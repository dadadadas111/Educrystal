import { Gem, Orbit, Sparkles, Stars } from "lucide-react";

import type { Program } from "@/data/programs";
import { cn } from "@/lib/utils";

import { CrystalCluster } from "@/components/app/crystal-cluster";

type ProgramCoverProps = {
  program: Program;
  size?: "card" | "hero" | "compact";
  className?: string;
};

const sizeMap = {
  compact: {
    shell: "min-h-[12rem] rounded-[1.8rem] p-3",
    inner: "rounded-[1.4rem] p-4",
    cluster: "sm" as const,
    clusterWrap: "h-28 w-28",
  },
  card: {
    shell: "min-h-[16rem] rounded-[2rem] p-3",
    inner: "rounded-[1.55rem] p-4",
    cluster: "md" as const,
    clusterWrap: "h-32 w-32",
  },
  hero: {
    shell: "min-h-[19rem] rounded-[2rem] p-4 lg:min-h-[21rem] lg:p-5",
    inner: "rounded-[1.7rem] p-5 lg:p-6",
    cluster: "lg" as const,
    clusterWrap: "h-44 w-44 lg:h-48 lg:w-48",
  },
} as const;

const coverScene = {
  "mam-phen-chua-dau-tien": {
    icon: Gem,
    tone: "aqua" as const,
    badgeTone: "bg-sky/25 text-text",
    halo: "from-sky/35 via-accent-soft/45 to-white",
    orbitA: "bg-sky/35",
    orbitB: "bg-accent-soft/60",
    orbitC: "bg-white/80",
  },
  "tao-hinh-tinh-the-sac-mau": {
    icon: Sparkles,
    tone: "rose" as const,
    badgeTone: "bg-rose/25 text-text",
    halo: "from-rose/35 via-gold/45 to-white",
    orbitA: "bg-rose/35",
    orbitB: "bg-gold/45",
    orbitC: "bg-white/80",
  },
  "hanh-trinh-cum-tinh-the-nang-cao": {
    icon: Stars,
    tone: "gold" as const,
    badgeTone: "bg-gold/30 text-text",
    halo: "from-gold/35 via-lavender/35 to-white",
    orbitA: "bg-gold/35",
    orbitB: "bg-lavender/35",
    orbitC: "bg-white/80",
  },
} as const;

export function ProgramCover({ program, size = "card", className }: ProgramCoverProps) {
  const scale = sizeMap[size];
  const scene = coverScene[program.slug as keyof typeof coverScene] ?? coverScene["mam-phen-chua-dau-tien"];
  const Icon = scene.icon;

  return (
    <div
      className={cn(
        `overflow-hidden border-2 border-outline bg-gradient-to-br ${program.palette.from} ${program.palette.to} shadow-soft`,
        scale.shell,
        className,
      )}
    >
      <div className={cn("relative flex h-full flex-col justify-between border-2 border-white/80 bg-white/84", scale.inner)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.45),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.02))]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.45))]" />

        <div className="relative flex items-center justify-between gap-3">
          <span className={cn("rounded-full border-2 border-outline px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] shadow-soft", scene.badgeTone)}>
            {program.coverLabel}
          </span>
          <div className="icon-shell h-10 w-10 rounded-[1rem] bg-white/90 text-coral">
            <Icon className="h-4 w-4" strokeWidth={2.2} />
          </div>
        </div>

        <div className="relative flex flex-1 items-center justify-center py-4">
          <div className={cn("absolute h-28 w-28 rounded-full bg-gradient-to-br blur-sm", scene.halo, size === "hero" ? "h-36 w-36 lg:h-40 lg:w-40" : "")} />
          <div className={cn("relative flex items-center justify-center", scale.clusterWrap)}>
            <div className={cn("absolute left-0 top-4 h-10 w-10 rounded-[1rem] rotate-12 border-2 border-white/75", scene.orbitA)} />
            <div className={cn("absolute right-2 top-0 h-8 w-8 rounded-full border-2 border-white/75", scene.orbitB)} />
            <div className={cn("absolute bottom-2 left-5 h-6 w-6 rounded-full border-2 border-outline/70", scene.orbitC)} />
            <div className="absolute bottom-1 right-0 rounded-full border-2 border-outline bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-coral shadow-soft">
              {program.coverHint}
            </div>

            {program.slug === "tao-hinh-tinh-the-sac-mau" ? (
              <div className="absolute inset-x-6 top-8 h-5 rounded-full border-2 border-white/75 bg-gold/35 rotate-[14deg]" />
            ) : null}

            {program.slug === "hanh-trinh-cum-tinh-the-nang-cao" ? (
              <>
                <div className="absolute bottom-8 left-3 h-8 w-8 rotate-45 rounded-[0.9rem] border-2 border-white/75 bg-lavender/35" />
                <div className="absolute bottom-10 right-5 h-6 w-6 rotate-12 rounded-[0.8rem] border-2 border-white/75 bg-gold/35" />
              </>
            ) : null}

            {program.slug === "mam-phen-chua-dau-tien" ? (
              <>
                <div className="absolute left-4 top-10 h-3.5 w-3.5 rounded-full bg-sky/70" />
                <div className="absolute right-8 bottom-9 h-4 w-4 rounded-full bg-accent/80" />
              </>
            ) : null}

            <CrystalCluster size={scale.cluster} tone={scene.tone} className="relative z-10" />
          </div>
        </div>

        <div className="relative flex items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
          <span>{program.duration}</span>
          <span className="inline-flex items-center gap-1.5 text-coral">
            <Orbit className="h-3.5 w-3.5" strokeWidth={2.2} />
            {program.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
}
