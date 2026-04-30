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
    <div className="min-h-screen bg-aurora text-text">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-28 pt-5">
        <header className="sticky top-0 z-20 mb-6 rounded-[2rem] border border-white/10 bg-surface/75 px-4 py-4 shadow-soft backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <CrystalMark />
              <div className="min-w-0">
                <p className="truncate font-display text-2xl leading-none text-white">
                  {appCopy.brand.name}
                </p>
                <p className="mt-1 truncate text-xs text-text/70">{appCopy.brand.tagline}</p>
              </div>
            </Link>
            <span className="rounded-full border border-accent/20 bg-accent-soft/70 px-3 py-1 text-[11px] font-semibold text-white/90">
              {appCopy.brand.demoLabel}
            </span>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>

      <BottomNav />
    </div>
  );
}
