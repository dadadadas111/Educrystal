"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, House, NotebookPen, Settings, Shield } from "lucide-react";
import type { ReactNode } from "react";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { cn } from "@/lib/utils";

type SiteShellProps = {
  children: ReactNode;
  userEmail?: string | null;
  isAdmin?: boolean;
};

export function SiteShell({ children, userEmail, isAdmin = false }: SiteShellProps) {
  const pathname = usePathname();
  const navItems = [
    { href: "/home", ariaLabel: "Nhà", icon: House },
    { href: "/catalog", ariaLabel: "Khóa học", icon: BookOpen },
    { href: "/diary", ariaLabel: "Nhật ký", icon: NotebookPen },
    { href: "/settings", ariaLabel: "Cài đặt", icon: Settings },
    ...(isAdmin ? [{ href: "/admin", ariaLabel: "Quản trị", icon: Shield }] : []),
  ] as const;

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(196,244,146,0.38),transparent_16%),radial-gradient(circle_at_86%_10%,rgba(115,205,255,0.26),transparent_18%),radial-gradient(circle_at_82%_78%,rgba(255,147,186,0.2),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.66),rgba(255,249,235,0.1)_25%,rgba(255,244,220,0.92)_100%)]" />
        <div className="absolute left-4 top-8 h-16 w-24 rounded-full bg-white/75 blur-[0.5px]" />
        <div className="absolute left-12 top-10 h-16 w-16 rounded-full bg-white/75 blur-[0.5px]" />
        <div className="absolute right-8 top-14 h-14 w-20 rounded-full bg-white/70 blur-[0.5px]" />
        <div className="absolute right-16 top-10 h-14 w-14 rounded-full bg-white/70 blur-[0.5px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-28 pt-4 sm:px-6 lg:px-8 lg:pb-8 lg:pt-6">
        <header className="sticky top-3 z-40 rounded-[2rem] border-2 border-outline bg-white/92 px-4 py-4 shadow-soft backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-4">
              <Link href="/home" className="flex min-w-0 items-center gap-3 rounded-[1.5rem] transition-colors duration-200 hover:text-coral">
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.6rem] border-2 border-outline bg-gradient-to-br from-accent-soft via-sky/60 to-rose/55 text-xl font-black text-slate-900 shadow-[0_18px_0_rgba(255,199,84,0.18)]">
                  ✦
                </div>
                <div className="min-w-0">
                  <p className="truncate font-display text-[2rem] leading-none text-slate-900 lg:text-[2.3rem]">Educrystal</p>
                  <p className="mt-1 truncate text-xs text-slate-500 lg:text-sm">Nuôi tinh thể cho trẻ</p>
                </div>
              </Link>

              <span className="hidden rounded-full border-2 border-outline bg-accent-soft px-3 py-1 text-[11px] font-bold text-slate-900 shadow-soft sm:inline-flex">
                Beta
              </span>
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              {isAdmin ? (
                <Link href="/admin/courses" className="glass-pill text-xs font-bold text-slate-700">
                  <Shield className="h-4 w-4" />
                  Quản trị
                </Link>
              ) : null}
              {userEmail ? <span className="glass-pill max-w-[220px] truncate text-xs font-bold text-slate-700">{userEmail}</span> : null}
              <SignOutButton className="rounded-full border-2 border-outline bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-soft" />
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-0 pb-28 pt-5 sm:pb-8 lg:pt-8">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-outline bg-white/96 shadow-[0_-14px_30px_rgba(62,79,117,0.12)] backdrop-blur lg:hidden">
        <div
          className={cn(
            "grid w-full grid-cols-4 px-2 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]",
            isAdmin ? "grid-cols-5" : "grid-cols-4",
          )}
        >
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.ariaLabel}
                className={cn(
                  "flex items-center justify-center rounded-[1.15rem] px-3 py-3 text-[11px] font-semibold transition-colors",
                  active ? "bg-accent-soft text-slate-900 shadow-soft" : "text-slate-500",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{item.ariaLabel}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
