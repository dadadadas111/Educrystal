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

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-md border-t border-white/10 bg-surface-strong/90 px-4 pb-6 pt-3 backdrop-blur-xl">
      <ul className="grid grid-cols-4 gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = iconMap[item.href];

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 rounded-2xl px-2 py-3 text-[11px] font-semibold transition-all duration-200",
                  isActive
                    ? "bg-white/10 text-accent shadow-soft"
                    : "text-text/65 hover:bg-white/5 hover:text-text",
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={2.2} />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
