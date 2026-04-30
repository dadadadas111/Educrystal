import { cn } from "@/lib/utils";

type CrystalClusterProps = {
  size?: "sm" | "md" | "lg";
  tone?: "aqua" | "rose" | "gold";
  className?: string;
};

const sizeMap = {
  sm: {
    shell: "h-24 w-24",
    core: "h-14 w-14 rounded-[1.2rem]",
    shard: "h-8 w-8 rounded-[0.9rem]",
    pebble: "h-4 w-4 rounded-full",
  },
  md: {
    shell: "h-32 w-32",
    core: "h-20 w-20 rounded-[1.45rem]",
    shard: "h-10 w-10 rounded-[1rem]",
    pebble: "h-5 w-5 rounded-full",
  },
  lg: {
    shell: "h-44 w-44",
    core: "h-28 w-28 rounded-[1.8rem]",
    shard: "h-14 w-14 rounded-[1.2rem]",
    pebble: "h-6 w-6 rounded-full",
  },
} as const;

const toneMap = {
  aqua: {
    shell: "from-sky/35 to-accent-soft/45",
    core: "from-sky via-accent-soft to-white",
    shard: "from-white to-sky/65",
    pebble: "bg-accent",
  },
  rose: {
    shell: "from-rose/35 to-gold/35",
    core: "from-rose via-gold/75 to-white",
    shard: "from-white to-rose/65",
    pebble: "bg-rose",
  },
  gold: {
    shell: "from-gold/35 to-lavender/30",
    core: "from-gold via-accent-soft/80 to-white",
    shard: "from-white to-gold/60",
    pebble: "bg-gold",
  },
} as const;

export function CrystalCluster({ size = "md", tone = "aqua", className }: CrystalClusterProps) {
  const scale = sizeMap[size];
  const palette = toneMap[tone];

  return (
    <div className={cn("relative isolate", scale.shell, className)} aria-hidden="true">
      <div className={cn("absolute inset-2 rounded-[38%] border-2 border-outline/70 bg-gradient-to-br", palette.shell)} />
      <div className="absolute inset-0 animate-float-slow">
        <div
          className={cn(
            "absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-white bg-gradient-to-br shadow-crystal",
            scale.core,
            palette.core,
          )}
        >
          <div className="absolute inset-0 -rotate-45">
            <div className="absolute left-1/2 top-[34%] flex -translate-x-1/2 gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-text" />
              <span className="h-1.5 w-1.5 rounded-full bg-text" />
            </div>
            <div className="absolute left-1/2 top-[52%] h-2.5 w-5 -translate-x-1/2 rounded-b-full border-b-2 border-text" />
            <div className="absolute left-[26%] top-[48%] h-2 w-2 rounded-full bg-rose/45" />
            <div className="absolute right-[26%] top-[48%] h-2 w-2 rounded-full bg-rose/45" />
          </div>
        </div>

        <div
          className={cn(
            "absolute left-[18%] top-[38%] -translate-x-1/2 -translate-y-1/2 rotate-[24deg] border-2 border-white bg-gradient-to-br shadow-soft",
            scale.shard,
            palette.shard,
          )}
        />
        <div
          className={cn(
            "absolute right-[10%] top-[32%] -translate-y-1/2 rotate-[58deg] border-2 border-white bg-gradient-to-br shadow-soft",
            scale.shard,
            palette.shard,
          )}
        />
        <div className={cn("absolute bottom-[16%] left-[18%] border-2 border-white shadow-soft", scale.pebble, palette.pebble)} />
        <div className="absolute right-[14%] top-[10%] flex h-8 w-8 items-center justify-center rounded-full border-2 border-outline bg-white text-gold">★</div>
        <div className="absolute left-[18%] top-[16%] h-4 w-4 rounded-full bg-rose/60" />
      </div>
    </div>
  );
}
