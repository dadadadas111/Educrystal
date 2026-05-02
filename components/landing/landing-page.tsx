"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, CalendarClock, CheckCircle2, Clock3, Sparkles, Star, Users } from "lucide-react";

import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import type { Course } from "@/data/courses";
import { cn } from "@/lib/utils";

type LandingPageProps = {
  courses: Course[];
  canSignIn: boolean;
};

function useReveal() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function RevealSection({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        visible ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[1px]",
        className,
      )}
    >
      {children}
    </section>
  );
}

function GoogleSignInAction({ canSignIn }: { canSignIn: boolean }) {
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
        scopes: "https://www.googleapis.com/auth/calendar.events",
      },
    });

    setIsLoading(false);
  };

  if (!canSignIn) {
    return (
      <div className="inline-flex items-center justify-center rounded-full border-2 border-amber-200 bg-amber-50 px-5 py-3 text-sm font-bold text-amber-900 shadow-soft">
        Đăng nhập tạm khóa
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5 disabled:opacity-70"
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
        title: "Dễ cho bé tự khám phá",
        body: "Bé có thể nhìn ảnh, đọc bước ngắn và biết ngay mình đang ở đâu trong hành trình nuôi tinh thể.",
      },
      {
        icon: Clock3,
        title: "Mỗi lần chờ đều có lý do",
        body: "Các khoảng thời gian chờ được trình bày rõ ràng để bé háo hức dõi theo tinh thể lớn lên từng ngày.",
      },
      {
        icon: CalendarClock,
        title: "Nhớ đúng lúc quay lại",
        body: "Khi đăng nhập Google, bạn có thể biến một bước học thành lời nhắc trên Calendar để không bỏ lỡ nhịp nuôi.",
      },
    ],
    [],
  );

  const process = [
    {
      step: "01",
      title: "Chọn hành trình bé thích",
      body: "Xem ảnh, mục tiêu và kết quả cuối để chọn ngay khóa học hợp với bé.",
    },
    {
      step: "02",
      title: "Làm theo từng chặng nhỏ",
      body: "Mỗi bước đều ngắn, rõ và dễ theo nên bé làm xong là thấy mình tiến gần hơn tới tinh thể hoàn chỉnh.",
    },
    {
      step: "03",
      title: "Ngắm thành quả lớn dần",
      body: "Nhật ký và nhắc hẹn giúp bé quay lại đúng chỗ đã dừng, rồi tiếp tục nhìn tinh thể lớn lên từng ngày.",
    },
  ];

  return (
    <main id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-14 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(196,244,146,0.42),transparent_68%)] blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(115,205,255,0.28),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,147,186,0.18),transparent_72%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <header className="sticky top-3 z-40 rounded-[2rem] border-2 border-outline bg-white/90 px-4 py-4 shadow-soft backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" className="flex items-center gap-3 self-start">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[1.1rem] border-2 border-outline bg-white shadow-soft sm:h-14 sm:w-14">
                <Image src="/logo.png" alt="Educrystal" width={3000} height={3000} className="h-full w-full object-contain p-[12%]" priority={false} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Educrystal</p>
                <p className="text-sm text-slate-500">Nuôi tinh thể cho trẻ</p>
              </div>
            </Link>

            <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600">
              <a href="#features" className="rounded-full border-2 border-outline bg-white px-4 py-2 shadow-soft transition-transform hover:-translate-y-0.5">Tính năng</a>
              <a href="#how" className="rounded-full border-2 border-outline bg-white px-4 py-2 shadow-soft transition-transform hover:-translate-y-0.5">Cách dùng</a>
              <a href="#courses" className="rounded-full border-2 border-outline bg-white px-4 py-2 shadow-soft transition-transform hover:-translate-y-0.5">Khóa học</a>
              <GoogleSignInAction canSignIn={canSignIn} />
            </nav>
          </div>
        </header>

        <RevealSection>
          <section className="grid gap-6">
            <div className="space-y-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-outline bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 shadow-soft">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Ứng dụng nuôi tinh thể cho trẻ em
              </div>

              <div className="space-y-4">
                <h1 className=" font-display text-5xl leading-[0.92] text-slate-900 sm:text-6xl lg:text-7xl">
                  Ứng dụng nuôi tinh thể vui mắt, dễ dùng, dành riêng cho trẻ em.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                  Educrystal biến việc nuôi tinh thể thành một hành trình thú vị cho bé: xem ảnh trực quan, làm từng bước ngắn, quay lại đúng lúc và nhìn tinh thể lớn lên mỗi ngày.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <GoogleSignInAction canSignIn={canSignIn} />
                <a href="#courses" className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-soft transition-transform hover:-translate-y-0.5">
                  Xem khóa học
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>

              <p className="max-w-xl text-xs leading-5 text-slate-500">
                Bằng cách đăng nhập, bạn đồng ý với <Link href="/terms" className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4">Terms of Service</Link> và <Link href="/privacy-policy" className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4">Privacy Policy</Link> của Educrystal.
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border-2 border-outline bg-white p-4 shadow-soft">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Khóa học</p>
                  <p className="mt-2 font-display text-4xl text-slate-900">{courses.length}</p>
                  <p className="mt-1 text-sm text-slate-500">Có thể vào xem ngay</p>
                </div>
                <div className="rounded-[1.5rem] border-2 border-outline bg-white p-4 shadow-soft">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Bước học</p>
                  <p className="mt-2 font-display text-4xl text-slate-900">{totalSteps}</p>
                  <p className="mt-1 text-sm text-slate-500">Chia nhỏ để dễ theo dõi</p>
                </div>
                <div className="rounded-[1.5rem] border-2 border-outline bg-white p-4 shadow-soft">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Chuẩn bị</p>
                  <p className="mt-2 font-display text-4xl text-slate-900">{totalPreparationItems}</p>
                  <p className="mt-1 text-sm text-slate-500">Dụng cụ và nguyên liệu</p>
                </div>
              </div>
            </div>

            {/* <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-[radial-gradient(circle_at_top_right,rgba(255,199,84,0.26),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(115,205,255,0.24),transparent_24%)] blur-2xl" />
              <div className="relative overflow-hidden rounded-[2.2rem] border-2 border-outline bg-white shadow-[0_24px_0_rgba(171,157,255,0.12)]">
                {featured ? (
                  <div className="grid gap-0 md:grid-cols-[0.92fr_1.08fr]">
                    <div className="relative min-h-[240px] bg-slate-100 sm:min-h-[320px]">
                      <Image src={featured.coverImage} alt={featured.whatYouMake} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority={false} />
                    </div>
                    <div className="flex flex-col justify-between gap-5 p-5 sm:p-6">
                      <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Khóa nổi bật</p>
                        <h2 className="font-display text-3xl text-slate-900 sm:text-4xl">{featured.title}</h2>
                        <p className="text-sm leading-7 text-slate-600">{featured.summary}</p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[1.4rem] border-2 border-outline bg-surface-soft p-4 shadow-soft">
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Kết quả</p>
                          <p className="mt-2 text-sm font-black text-slate-900">{featured.whatYouMake}</p>
                        </div>
                        <div className="rounded-[1.4rem] border-2 border-outline bg-white p-4 shadow-soft">
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Nhịp học</p>
                          <p className="mt-2 text-sm font-black text-slate-900">{featured.steps.length} bước rõ ràng</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1">{featured.level}</span>
                        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-900">{featured.duration}</span>
                        <span className="rounded-full bg-sky-100 px-2.5 py-1 text-sky-800">{featured.ageBand}</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div> */}
          </section>
        </RevealSection>

        <RevealSection delay={120}>
          <section id="features" className="grid gap-4 md:grid-cols-3">
            {featureCards.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="rounded-[1.75rem] border-2 border-outline bg-white p-5 shadow-soft">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[1.1rem] border-2 border-outline bg-surface-soft shadow-soft">
                    <Icon className="h-5 w-5 text-slate-900" />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                </article>
              );
            })}
          </section>
        </RevealSection>

        <RevealSection delay={160}>
          <section id="how" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Cách hoạt động</p>
              <h2 className="font-display text-4xl leading-[0.95] text-slate-900">Giao diện thân thiện với trẻ em, nhìn là muốn bắt tay vào làm</h2>
              <p className="max-w-xl text-sm leading-7 text-slate-600">Educrystal sắp xếp nội dung theo kiểu trực quan, dễ đọc và vui mắt để bé có thể tự theo dõi hành trình nuôi tinh thể của mình.</p>
              <p className="max-w-xl text-sm leading-7 text-slate-600">Hình ảnh lớn, chữ dễ hiểu và nút bấm rõ ràng giúp việc học trở nên nhẹ nhàng, hứng thú và tự nhiên hơn.</p>
            </div>

            <div className="grid gap-3">
              {process.map((item) => (
                <article key={item.step} className="rounded-[1.6rem] border-2 border-outline bg-white p-5 shadow-soft transition-transform duration-300 hover:-translate-y-1">
                  <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">{item.step}</span>
                  <h3 className="mt-3 text-lg font-black text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                </article>
              ))}
            </div>
          </section>
        </RevealSection>

        <RevealSection delay={200}>
          <section id="courses" className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Khóa học</p>
                <h2 className="mt-2 font-display text-4xl text-slate-900">Những hành trình nhỏ để bé bắt đầu ngay</h2>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <article key={course.slug} className="group overflow-hidden rounded-[2rem] border-2 border-outline bg-white shadow-soft transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image src={course.coverImage} alt={course.whatYouMake} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" priority={false} />
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">{course.level}</span>
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-900">{course.duration}</span>
                      <span className="rounded-full bg-sky-100 px-2.5 py-1 text-sky-800">{course.ageBand}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">{course.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">Khóa học này dẫn bé qua từng bước để tạo ra sản phẩm tinh thể của riêng mình.</p>
                    </div>
                    <Link href={`/catalog/${course.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline decoration-slate-300 underline-offset-4">
                      Bắt đầu ngay
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </RevealSection>

        <RevealSection delay={240}>
          <section className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-4 rounded-[2rem] border-2 border-outline bg-white p-6 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Dành cho bé và gia đình</p>
              <h2 className="font-display text-4xl leading-[0.95] text-slate-900">Mỗi lần mở app là một lần háo hức bắt đầu lại</h2>
              <p className="text-sm leading-7 text-slate-600">Educrystal giúp bé nhìn thấy tiến trình của mình, còn gia đình thì dễ đồng hành mà không phải giải thích quá nhiều lần.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.4rem] border-2 border-outline bg-surface-soft p-4 shadow-soft">
                  <p className="text-sm font-black text-slate-900">Bé biết mình đang ở đâu</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Mỗi bước xong là thấy ngay mình tiến gần hơn tới tinh thể hoàn chỉnh.</p>
                </div>
                <div className="rounded-[1.4rem] border-2 border-outline bg-white p-4 shadow-soft">
                  <p className="text-sm font-black text-slate-900">Quay lại đúng nhịp</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Lời nhắc giúp bé tiếp tục buổi sau mà không quên bước đang làm dở.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border-2 border-outline bg-white p-6 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Tổng quan</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.4rem] border-2 border-outline bg-white p-4 shadow-soft">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Hành trình</p>
                  <p className="mt-2 font-display text-3xl text-slate-900">{courses.length}</p>
                </div>
                <div className="rounded-[1.4rem] border-2 border-outline bg-surface-soft p-4 shadow-soft">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Bước nhỏ</p>
                  <p className="mt-2 font-display text-3xl text-slate-900">{totalSteps}</p>
                </div>
                <div className="rounded-[1.4rem] border-2 border-outline bg-surface-soft p-4 shadow-soft">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Chuẩn bị</p>
                  <p className="mt-2 font-display text-3xl text-slate-900">{totalPreparationItems}</p>
                </div>
                <div className="rounded-[1.4rem] border-2 border-outline bg-white p-4 shadow-soft">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Thao tác</p>
                  <p className="mt-2 font-display text-3xl text-slate-900">Rất dễ</p>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        <RevealSection delay={280}>
          <section className="rounded-[2rem] border-2 border-outline bg-slate-900 px-6 py-7 text-white shadow-soft sm:px-8 sm:py-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300">Bắt đầu</p>
                <h2 className="font-display text-4xl leading-[0.95] text-white">Bé chọn một hành trình, rồi cùng gia đình bắt đầu nuôi tinh thể</h2>
                <p className="max-w-2xl text-sm leading-7 text-slate-300">Đăng nhập để lưu tiến độ, tiếp tục từ bước đang làm dở và đặt lời nhắc cho lần quay lại tiếp theo.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <GoogleSignInAction canSignIn={canSignIn} />
                <a href="#top" className="inline-flex items-center justify-center rounded-full border-2 border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5">
                  Lên đầu trang
                </a>
              </div>
            </div>
          </section>
        </RevealSection>
      </div>
    </main>
  );
}
