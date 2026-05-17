"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Bell, CheckCircle2, Clock3, Sparkles } from "lucide-react";

import { InstallAppCta } from "@/components/landing/install-app-cta";
import { RevealSection } from "@/components/landing/reveal-section";
import type { Course } from "@/data/courses";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { cn } from "@/lib/utils";

type LandingPageProps = {
  courses: Course[];
  canSignIn: boolean;
};

function GoogleSignInAction({ canSignIn, className }: { canSignIn: boolean; className?: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    const supabase = createSupabaseBrowserClient();

    if (!supabase) return;

    setIsLoading(true);

    const redirectTo = new URL("/auth/callback", window.location.origin);
    redirectTo.searchParams.set("next", "/home");

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectTo.toString(),
      },
    });

    setIsLoading(false);
  };

  if (!canSignIn) {
    return (
      <div className={cn("inline-flex items-center justify-center rounded-full border-2 border-outline bg-amber-100 px-5 py-3 text-sm font-bold text-amber-900 shadow-soft", className)}>
        Đăng nhập tạm khóa
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        "inline-flex items-center justify-center rounded-full border-2 border-outline bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70",
        className,
      )}
    >
      {isLoading ? "Đang mở Google…" : "Đăng nhập với Google"}
    </button>
  );
}

export function LandingPage({ courses, canSignIn }: LandingPageProps) {
  const featured = courses[0];
  const totalSteps = courses.reduce((sum, course) => sum + course.steps.length, 0);
  const totalPreparationItems = courses.reduce(
    (sum, course) => sum + course.preparation.tools.length + course.preparation.ingredients.length,
    0,
  );

  const featureCards = useMemo(
    () => [
      {
        icon: CheckCircle2,
        title: "Hướng dẫn chi tiết",
        body: "",
      },
      {
        icon: Clock3,
        title: "Đảm bảo an toàn",
        body: "",
      },
      {
        icon: Bell,
        title: "Ghi nhật ký riêng",
        body: "",
      },
    ],
    [],
  );

  const process = [
    { step: "01", title: "Đơn giản, thân thiện", body: "" },
    { step: "02", title: "Chọn hành trình", body: "" },
    { step: "03", title: "Làm theo chỉ dẫn", body: "" },
    { step: "04", title: "Tận hưởng thành quả", body: "" },
  ];

  return (
    <main id="top" className="relative overflow-hidden pb-44 text-slate-900 sm:pb-40 lg:pb-32">
      <div className="pointer-events-none absolute inset-0 bg-aurora" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-4 top-10 h-16 w-24 rounded-full bg-white/75 blur-[0.5px]" />
        <div className="absolute left-14 top-12 h-16 w-16 rounded-full bg-white/75 blur-[0.5px]" />
        <div className="absolute right-8 top-20 h-14 w-24 rounded-full bg-white/70 blur-[0.5px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-4 sm:px-6 lg:px-8 lg:gap-16 lg:py-6">
        <header className="sticky top-3 z-40 rounded-[2rem] border-2 border-outline bg-white/95 px-4 py-4 shadow-soft backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[1.1rem] border-2 border-outline bg-white shadow-soft sm:h-14 sm:w-14">
                <Image src="/logo.png" alt="Educrystal" width={3000} height={3000} className="h-full w-full object-contain p-[12%]" priority={false} />
              </div>
              <div className="min-w-0">
                <p className="font-display text-2xl leading-none text-slate-900 sm:text-3xl">Educrystal</p>
                <p className="truncate text-xs text-slate-500 sm:text-sm">Nuôi tinh thể cho trẻ</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 text-sm font-semibold text-slate-600 md:flex">
              <a href="#features" className="glass-pill text-xs font-bold text-slate-700">Tính năng</a>
              <a href="#courses" className="glass-pill text-xs font-bold text-slate-700">Hành trình</a>
              <GoogleSignInAction canSignIn={canSignIn} className="px-4 py-2.5 text-xs" />
            </nav>
          </div>
        </header>

        <RevealSection>
          <section className="playful-stage grid gap-7 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="space-y-6">
              <div className="glass-pill w-fit text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Nuôi tinh thể dễ dàng
              </div>

              <div className="space-y-4">
                <h1 className="font-display text-5xl leading-[0.9] text-slate-900 sm:text-6xl lg:text-7xl">
                  Educrystal
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  Một cách đơn giản để trẻ tìm hiểu về tinh thể — dễ hiểu, an toàn và không rối mắt.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <GoogleSignInAction canSignIn={canSignIn} className="w-full sm:w-auto" />
                <a href="#courses" className="inline-flex w-full items-center justify-center rounded-full border-2 border-outline bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-soft transition-transform hover:-translate-y-0.5 sm:w-auto">
                  Xem hành trình
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>

              <p className="max-w-xl text-xs leading-5 text-slate-500">
                Đăng nhập để lưu tiến độ. Xem <Link href="/terms" className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4">Điều khoản dịch vụ</Link> và <Link href="/privacy-policy" className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4">Chính sách riêng tư</Link>.
              </p>
            </div>

            <div className="grid gap-3">
              {featured ? (
                <article className="overflow-hidden rounded-[2rem] border-2 border-outline bg-white shadow-crystal">
                  <div className="relative aspect-[4/3] bg-surface-soft">
                    <Image src={featured.coverImage} alt={featured.whatYouMake} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 46vw" priority />
                  </div>
                  <div className="space-y-4 p-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Hành trình nổi bật</p>
                      <h2 className="mt-2 font-display text-3xl leading-none text-slate-900">{featured.title}</h2>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                      <span className="glass-pill py-1 text-slate-700">{featured.level}</span>
                      <span className="glass-pill py-1 text-amber-900">{featured.duration}</span>
                      <span className="glass-pill py-1 text-sky-800">{featured.ageBand}</span>
                    </div>
                  </div>
                </article>
              ) : null}

              <div className="grid grid-cols-3 gap-3">
                <div className="metric-tile">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Hành trình</p>
                  <p className="mt-2 font-display text-3xl text-slate-900">{courses.length}</p>
                </div>
                <div className="metric-tile">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Bước</p>
                  <p className="mt-2 font-display text-3xl text-slate-900">{totalSteps}</p>
                </div>
                <div className="metric-tile">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Chuẩn bị</p>
                  <p className="mt-2 font-display text-3xl text-slate-900">{totalPreparationItems}</p>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        <RevealSection delay={120}>
          <section id="features" className="grid gap-4 md:grid-cols-3">
            {featureCards.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="crystal-card transition-transform duration-300 hover:-translate-y-1">
                  <div className="icon-shell h-12 w-12">
                    <Icon className="h-5 w-5 text-slate-900" />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                </article>
              );
            })}
          </section>
        </RevealSection>

        <RevealSection delay={160}>
          <section className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Cách dùng</p>
              <h2 className="font-display text-4xl leading-[0.95] text-slate-900">Đơn giản, dễ theo.</h2>
              <p className="max-w-xl text-sm leading-7 text-slate-600">Giao diện thân thiện với trẻ em, ai cũng làm được.</p>
            </div>

            <div className="grid gap-3">
              {process.map((item) => (
                <article key={item.step} className="list-card grid grid-cols-[auto_1fr] gap-4 transition-transform hover:-translate-y-0.5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">{item.step}</span>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </RevealSection>

        <RevealSection delay={200}>
          <section id="courses" className="space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Hành trình</p>
              <h2 className="mt-2 font-display text-4xl leading-none text-slate-900">Bắt đầu từ bài phù hợp.</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <article key={course.slug} className="group overflow-hidden rounded-[2rem] border-2 border-outline bg-white shadow-soft transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-soft">
                    <Image src={course.coverImage} alt={course.whatYouMake} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" priority={false} />
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">{course.level}</span>
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-900">{course.duration}</span>
                      <span className="rounded-full bg-sky-100 px-2.5 py-1 text-sky-800">{course.ageBand}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-black leading-tight text-slate-900">{course.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{course.summary}</p>
                    </div>
                    <Link href={`/catalog/${course.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline decoration-slate-300 underline-offset-4">
                      Xem bài
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </RevealSection>

        <RevealSection delay={240}>
          <section className="rounded-[2rem] border-2 border-outline bg-slate-900 px-6 py-7 text-white shadow-soft sm:px-8 sm:py-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300">Sẵn sàng bắt đầu</p>
                <h2 className="font-display text-4xl leading-[0.95] text-white">Lưu tiến độ để lần sau mở app là tiếp tục ngay.</h2>
                <p className="max-w-2xl text-sm leading-7 text-slate-300">Educrystal giúp trẻ học từng bước, theo dõi tiến độ và quay lại đúng chỗ đã dừng.</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <GoogleSignInAction canSignIn={canSignIn} />
                <a href="#top" className="inline-flex items-center justify-center rounded-full border-2 border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5">
                  Lên đầu trang
                </a>
              </div>
            </div>
          </section>
        </RevealSection>
      </div>

      <InstallAppCta />
    </main>
  );
}
