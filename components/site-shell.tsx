"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, House, NotebookPen, Settings } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Nhà", icon: House },
  { href: "/catalog", label: "Khóa học", icon: BookOpen },
  { href: "/diary", label: "Nhật ký", icon: NotebookPen },
  { href: "/settings", label: "Cài đặt", icon: Settings },
] as const;

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffdf7_0%,#fff6e4_100%)] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-300 text-xl font-black text-slate-900 shadow-[0_8px_0_rgba(251,191,36,0.25)]">
              ✦
            </div>
            <div>
              <p className="text-sm font-extrabold leading-tight">Educrystal</p>
              <p className="text-xs text-slate-500">Nuôi tinh thể cho trẻ</p>
            </div>
          </Link>

          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800">Beta</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-5 sm:px-6 sm:pb-8 lg:pt-8">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/95 backdrop-blur lg:hidden">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-4 px-3 py-2">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[11px] font-semibold transition-colors",
                  active ? "bg-amber-100 text-slate-900" : "text-slate-500",
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
