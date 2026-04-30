"use client";

import Link from "next/link";
import { BookOpen, Compass, NotebookPen, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

import { navItems } from "@/data/copy";
import { cn } from "@/lib/utils";

const iconMap = {
  "/journey": Compass,
  "/catalog": BookOpen,
  "/diary": NotebookPen,
  "/showcase": Sparkles,
} as const;

type BottomNavProps = {
  mode: "mobile" | "desktop";
};

export function BottomNav({ mode }: BottomNavProps) {
  const pathname = usePathname();

  if (mode === "desktop") {
    return (
      <nav className="hidden lg:block" aria-label="Điều hướng chính">
        <ul className="flex flex-wrap justify-end gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = iconMap[item.href];

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold transition-all duration-200",
                    isActive
                      ? "border-accent bg-accent-soft/60 text-text shadow-soft"
                      : "border-outline bg-white text-muted hover:border-gold hover:text-text",
                  )}
                >
                  <div className={cn("icon-shell h-9 w-9 rounded-full", isActive ? "bg-accent text-white" : "bg-white text-coral")}>
                    <Icon className="h-4 w-4" strokeWidth={2.2} />
                  </div>
                  <p>{item.label}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-md px-4 pb-5 pt-3 lg:hidden"
      aria-label="Điều hướng chính"
    >
      <ul className="grid grid-cols-4 gap-2 rounded-[2rem] border-2 border-outline bg-white/95 p-2 shadow-soft">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = iconMap[item.href];

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 rounded-[1.4rem] px-2 py-3 text-[11px] font-bold transition-all duration-200",
                  isActive
                    ? "bg-accent-soft text-text shadow-soft"
                    : "text-muted hover:bg-gold/10 hover:text-text",
                )}
              >
                <div className={cn("icon-shell h-9 w-9 rounded-2xl", isActive ? "bg-accent text-white" : "bg-white text-coral") }>
                  <Icon className="h-4 w-4" strokeWidth={2.2} />
                </div>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
