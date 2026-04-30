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
        <div className="confetti-dots absolute inset-0 opacity-55" />
        <div className="absolute left-4 top-8 h-16 w-24 rounded-full bg-white/75" />
        <div className="absolute left-12 top-10 h-16 w-16 rounded-full bg-white/75" />
        <div className="absolute right-8 top-14 h-14 w-20 rounded-full bg-white/70" />
        <div className="absolute right-16 top-10 h-14 w-14 rounded-full bg-white/70" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-28 pt-4 lg:max-w-7xl lg:flex-row lg:gap-6 lg:px-6 lg:pb-8 lg:pt-6 xl:gap-8 xl:px-8">
        <aside className="hidden lg:block lg:w-[18rem] xl:w-[21rem]">
          <div className="sticky top-8 space-y-4">
            <div className="panel-soft section-glow relative overflow-hidden p-5 paper-grid">
              <div className="relative space-y-5">
                <Link href="/" className="flex min-w-0 items-center gap-4 rounded-[1.7rem] border-2 border-outline bg-white px-4 py-4 transition-colors duration-200 hover:bg-surface-soft">
                  <CrystalMark />
                  <div className="min-w-0">
                    <p className="truncate font-display text-[2rem] leading-none text-text">{appCopy.brand.name}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{appCopy.brand.tagline}</p>
                  </div>
                </Link>

                <div className="grid gap-4 rounded-[1.8rem] border-2 border-outline bg-white/95 px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="inline-flex rounded-full border-2 border-outline bg-accent-soft px-3 py-1 text-[11px] font-bold text-text">
                        {appCopy.brand.demoLabel}
                      </span>
                      <p className="mt-3 text-sm font-bold text-text">Góc học sáng rực để bé xem tinh thể lớn lên mỗi ngày.</p>
                    </div>
                    <CrystalCluster size="md" className="shrink-0" />
                  </div>

                  <div className="grid gap-2">
                    <div className="glass-pill text-xs font-bold text-text">🧪 Chọn bài phù hợp</div>
                    <div className="glass-pill text-xs font-bold text-text">🌟 Đi theo mốc vui</div>
                    <div className="glass-pill text-xs font-bold text-text">📒 Ghi lại khám phá</div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="metric-tile px-3 py-3">
                      <p className="font-display text-2xl text-text">3</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">Program</p>
                    </div>
                    <div className="metric-tile px-3 py-3">
                      <p className="font-display text-2xl text-text">5p</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">Mỗi lượt xem</p>
                    </div>
                    <div className="metric-tile px-3 py-3">
                      <p className="font-display text-2xl text-text">100%</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">Riêng tư</p>
                    </div>
                  </div>

                  <div className="rounded-[1.35rem] border-2 border-outline bg-surface-soft px-4 py-3 text-xs leading-5 text-muted">
                    Cùng Mầm Tí Xíu đi qua từng màn hình, xem tinh thể và ý tưởng lớn dần lên nhé.
                  </div>
                </div>
              </div>
            </div>

            <BottomNav mode="desktop" />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 mb-5 rounded-[2rem] border-2 border-outline bg-white/95 px-4 py-4 shadow-soft lg:hidden">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="flex min-w-0 items-center gap-3">
                <CrystalMark />
                <div className="min-w-0">
                  <p className="truncate font-display text-2xl leading-none text-text">
                    {appCopy.brand.name}
                  </p>
                  <p className="mt-1 truncate text-xs text-muted">{appCopy.brand.tagline}</p>
                </div>
              </Link>
              <div className="flex items-center gap-2">
                <span className="rounded-full border-2 border-outline bg-accent-soft px-3 py-1 text-[11px] font-bold text-text">
                  {appCopy.brand.demoLabel}
                </span>
                <div className="h-3 w-3 rounded-full bg-coral" />
              </div>
            </div>
          </header>

          <main className="flex-1 lg:px-2 xl:px-4">
            {children}
          </main>
        </div>
      </div>

      <BottomNav mode="mobile" />
    </div>
  );
}
