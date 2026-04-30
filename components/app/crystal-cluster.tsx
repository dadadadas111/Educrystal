import { cn } from "@/lib/utils";

type CrystalClusterProps = {
  size?: "sm" | "md" | "lg";
  tone?: "aqua" | "rose" | "gold";
  className?: string;
};

const sizeMap = {
  sm: {
    shell: "h-24 w-24",
    core: "h-12 w-12 rounded-[1rem]",
    shard: "h-10 w-10 rounded-[0.9rem]",
    pebble: "h-6 w-6 rounded-xl",
  },
  md: {
    shell: "h-32 w-32",
    core: "h-16 w-16 rounded-[1.25rem]",
    shard: "h-12 w-12 rounded-[1rem]",
    pebble: "h-7 w-7 rounded-[0.85rem]",
  },
  lg: {
    shell: "h-44 w-44",
    core: "h-24 w-24 rounded-[1.55rem]",
    shard: "h-16 w-16 rounded-[1.15rem]",
    pebble: "h-9 w-9 rounded-[1rem]",
  },
} as const;

const toneMap = {
  aqua: {
    glow: "bg-accent/30",
    core: "from-accent/75 via-white/24 to-accent-soft/40",
    shard: "from-white/24 to-accent-soft/42",
    pebble: "from-white/22 to-accent/38",
  },
  rose: {
    glow: "bg-rose/24",
    core: "from-rose/72 via-white/20 to-accent-soft/36",
    shard: "from-white/22 to-rose/38",
    pebble: "from-rose/28 to-accent/30",
  },
  gold: {
    glow: "bg-gold/22",
    core: "from-gold/72 via-white/24 to-accent/30",
    shard: "from-white/22 to-gold/36",
    pebble: "from-gold/30 to-accent/28",
  },
} as const;

export function CrystalCluster({ size = "md", tone = "aqua", className }: CrystalClusterProps) {
  const scale = sizeMap[size];
  const palette = toneMap[tone];

  return (
    <div className={cn("relative isolate", scale.shell, className)} aria-hidden="true">
      <div className={cn("absolute inset-3 rounded-full blur-3xl animate-crystal-pulse", palette.glow)} />

      <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2">
        <div
          className={cn(
            "absolute left-1/2 top-1/2 border border-white/18 bg-gradient-to-br shadow-crystal backdrop-blur-sm animate-float-slow",
            scale.core,
            palette.core,
            "-translate-x-1/2 -translate-y-1/2 rotate-45",
          )}
        />

        <div
          className={cn(
            "absolute left-[20%] top-[42%] border border-white/18 bg-gradient-to-br shadow-soft backdrop-blur-sm animate-float-sway",
            scale.shard,
            palette.shard,
            "-translate-x-1/2 -translate-y-1/2 rotate-[28deg]",
          )}
        />

        <div
          className={cn(
            "absolute left-[76%] top-[38%] border border-white/18 bg-gradient-to-br shadow-soft backdrop-blur-sm animate-float-slow",
            scale.shard,
            palette.shard,
            "-translate-x-1/2 -translate-y-1/2 rotate-[62deg]",
          )}
        />

        <div
          className={cn(
            "absolute left-[68%] top-[76%] border border-white/14 bg-gradient-to-br shadow-soft backdrop-blur-sm animate-float-sway",
            scale.pebble,
            palette.pebble,
            "-translate-x-1/2 -translate-y-1/2 rotate-45",
          )}
        />

        <div className="absolute left-[18%] top-[72%] h-2.5 w-2.5 rounded-full bg-white/45 blur-[2px]" />
        <div className="absolute left-[78%] top-[16%] h-2 w-2 rounded-full bg-accent/70 blur-[1px]" />
        <div className="absolute left-[32%] top-[14%] h-1.5 w-1.5 rounded-full bg-rose/70 blur-[1px]" />
      </div>
    </div>
  );
}
