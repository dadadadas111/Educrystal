import Link from "next/link";
import type { ReactNode } from "react";

import { appCopy } from "@/data/copy";

import { BottomNav } from "./bottom-nav";
import { CrystalMark } from "./crystal-mark";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-aurora text-text">
      <div className="pointer-events-none absolute inset-0">
        <div className="confetti-dots absolute inset-0 opacity-55" />
        <div className="absolute left-4 top-8 h-16 w-24 rounded-full bg-white/75" />
        <div className="absolute left-12 top-10 h-16 w-16 rounded-full bg-white/75" />
        <div className="absolute right-8 top-14 h-14 w-20 rounded-full bg-white/70" />
        <div className="absolute right-16 top-10 h-14 w-14 rounded-full bg-white/70" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-28 pt-4 lg:max-w-6xl lg:px-6 lg:pb-8 lg:pt-6 xl:px-8">
        <header className="sticky top-0 z-20 mb-5 rounded-[2rem] border-2 border-outline bg-white/95 px-4 py-4 shadow-soft backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="flex min-w-0 items-center gap-3 rounded-[1.5rem] transition-colors duration-200 hover:text-coral">
                <CrystalMark />
                <div className="min-w-0">
                  <p className="truncate font-display text-2xl leading-none text-text lg:text-[2rem]">{appCopy.brand.name}</p>
                  <p className="mt-1 truncate text-xs text-muted lg:text-sm">{appCopy.brand.tagline}</p>
                </div>
              </Link>

              <span className="hidden rounded-full border-2 border-outline bg-accent-soft px-3 py-1 text-[11px] font-bold text-text shadow-soft sm:inline-flex">
                {appCopy.brand.demoLabel}
              </span>
            </div>

            <BottomNav mode="desktop" />
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>
      </div>

      <BottomNav mode="mobile" />
    </div>
  );
}
