import Link from "next/link";

import { cn } from "@/lib/utils";

type ScreenTab = {
  href: string;
  label: string;
};

type ScreenTabsProps = {
  items: ScreenTab[];
  currentHref: string;
  className?: string;
};

export function ScreenTabs({ items, currentHref, className }: ScreenTabsProps) {
  return (
    <nav className={cn("flex flex-wrap gap-2", className)} aria-label="Điều hướng trong màn hình">
      {items.map((item) => {
        const isActive = item.href === currentHref;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex items-center rounded-full border-2 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors duration-200",
              isActive
                ? "border-accent bg-accent-soft/70 text-text shadow-soft"
                : "border-outline bg-white/90 text-muted hover:border-gold hover:text-text",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
