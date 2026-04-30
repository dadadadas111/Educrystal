import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border-2 border-outline bg-white px-3 py-1 text-xs font-bold tracking-[0.14em] text-text uppercase shadow-[0_4px_0_rgba(255,199,84,0.14)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
