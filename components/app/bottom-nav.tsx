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

const navDescriptions = {
  "/journey": "Tiếp bước đang sáng lên.",
  "/catalog": "Chọn mầm hợp nhịp học.",
  "/diary": "Giữ lại điều vừa thấy.",
  "/showcase": "Xem khu trưng bày đã lọc.",
} as const;

type BottomNavProps = {
  mode: "mobile" | "desktop";
};

export function BottomNav({ mode }: BottomNavProps) {
  const pathname = usePathname();

  if (mode === "desktop") {
    return (
      <nav className="hidden lg:block" aria-label="Điều hướng chính">
        <div className="rounded-[2rem] border border-white/10 bg-surface/60 p-3 shadow-soft backdrop-blur-xl">
          <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent/80">Điều hướng</p>
            <p className="mt-2 text-sm leading-6 text-text/72">Chọn một màn để tiếp tục nuôi mầm, ghi lại hoặc nhìn thành quả sáng lên.</p>
          </div>

          <ul className="mt-3 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = iconMap[item.href];

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-start gap-3 rounded-[1.6rem] border px-4 py-4 transition-all duration-200",
                      isActive
                        ? "border-accent/25 bg-white/10 text-white shadow-soft"
                        : "border-white/10 bg-transparent text-text/72 hover:border-white/20 hover:bg-white/5 hover:text-text",
                    )}
                  >
                    <div
                      className={cn(
                        "icon-shell mt-0.5 h-11 w-11 rounded-2xl p-2.5 transition-colors duration-200",
                        isActive ? "bg-accent-soft/75 text-white" : "bg-surface-strong/80 text-accent",
                      )}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2.2} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">{item.label}</p>
                        {isActive ? <span className="h-2 w-2 rounded-full bg-accent" /> : null}
                      </div>
                      <p className="mt-1 text-sm leading-6 text-text/60">{navDescriptions[item.href]}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-md border-t border-white/10 bg-surface-strong/90 px-4 pb-6 pt-3 backdrop-blur-xl lg:hidden"
      aria-label="Điều hướng chính"
    >
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
                <div className={cn("icon-shell h-9 w-9 rounded-2xl", isActive ? "bg-accent-soft/70 text-white" : "text-accent") }>
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
