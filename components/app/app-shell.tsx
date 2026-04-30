import Link from "next/link";
import type { ReactNode } from "react";

import { appCopy } from "@/data/copy";

import { BottomNav } from "./bottom-nav";
import { CrystalCluster } from "./crystal-cluster";
import { CrystalMark } from "./crystal-mark";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-aurora text-text">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-soft/20 blur-3xl lg:left-24 lg:top-12 lg:h-96 lg:w-96 lg:translate-x-0" />
        <div className="absolute bottom-20 right-0 h-64 w-64 rounded-full bg-rose/10 blur-3xl lg:bottom-12 lg:h-80 lg:w-80" />
        <div className="absolute left-[10%] top-[32%] h-40 w-40 rounded-full bg-accent/8 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-28 pt-5 lg:max-w-7xl lg:flex-row lg:gap-6 lg:px-6 lg:pb-8 lg:pt-8 xl:gap-8 xl:px-8">
        <aside className="hidden lg:block lg:w-[18rem] xl:w-[21rem]">
          <div className="sticky top-8 space-y-4">
            <div className="section-glow relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-surface/72 p-5 shadow-soft backdrop-blur-xl">
              <div className="absolute -right-10 top-6 h-28 w-28 rounded-full bg-accent/10 blur-3xl" />
              <div className="relative space-y-5">
                <Link href="/" className="flex min-w-0 items-center gap-4 rounded-[1.6rem] border border-white/10 bg-white/5 px-4 py-4 transition-colors duration-200 hover:bg-white/10">
                  <CrystalMark />
                  <div className="min-w-0">
                    <p className="truncate font-display text-[2rem] leading-none text-white">{appCopy.brand.name}</p>
                    <p className="mt-2 text-sm leading-6 text-text/72">{appCopy.brand.tagline}</p>
                  </div>
                </Link>

                <div className="grid gap-4 rounded-[1.7rem] border border-white/10 bg-surface-strong/65 px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="inline-flex rounded-full border border-accent/20 bg-accent-soft/70 px-3 py-1 text-[11px] font-semibold text-white/90">
                        {appCopy.brand.demoLabel}
                      </span>
                      <p className="mt-3 text-sm font-semibold text-white">Nuôi mầm theo nhịp nhỏ, nhìn lớn lên từng ngày.</p>
                    </div>
                    <CrystalCluster size="sm" className="shrink-0" />
                  </div>

                  <div className="grid gap-2">
                    <div className="glass-pill text-xs font-semibold text-text/84">🔹 Chọn program</div>
                    <div className="glass-pill text-xs font-semibold text-text/84">✨ Theo milestone</div>
                    <div className="glass-pill text-xs font-semibold text-text/84">📓 Giữ nhật ký riêng</div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="metric-tile px-3 py-3">
                      <p className="font-display text-2xl text-white">3</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-text/68">Program</p>
                    </div>
                    <div className="metric-tile px-3 py-3">
                      <p className="font-display text-2xl text-white">5p</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-text/68">Mỗi lần xem</p>
                    </div>
                    <div className="metric-tile px-3 py-3">
                      <p className="font-display text-2xl text-white">100%</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-text/68">Riêng tư</p>
                    </div>
                  </div>

                  <div className="rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-3 text-xs leading-5 text-text/70">
                    Bản demo này giữ đúng các route hiện có, nhưng chuyển cảm giác đọc nhiều sang cảm giác chăm một tinh thể đang lớn.
                  </div>
                </div>
              </div>
            </div>

            <BottomNav mode="desktop" />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 mb-6 rounded-[2rem] border border-white/10 bg-surface/75 px-4 py-4 shadow-soft backdrop-blur-xl lg:hidden">
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
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-accent/20 bg-accent-soft/70 px-3 py-1 text-[11px] font-semibold text-white/90">
                  {appCopy.brand.demoLabel}
                </span>
                <div className="h-2.5 w-2.5 rounded-full bg-accent shadow-crystal" />
              </div>
            </div>
          </header>

          <main className="flex-1 lg:rounded-[2.5rem] lg:border lg:border-white/10 lg:bg-surface/30 lg:px-6 lg:py-6 lg:shadow-soft lg:backdrop-blur-xl xl:px-8 xl:py-8">
            {children}
          </main>
        </div>
      </div>

      <BottomNav mode="mobile" />
    </div>
  );
}
