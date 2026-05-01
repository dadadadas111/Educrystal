import type { Course } from "@/data/courses";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { CourseCover } from "@/components/course-cover";

type LandingPageProps = {
  courses: Course[];
  canSignIn: boolean;
};

export function LandingPage({ courses, canSignIn }: LandingPageProps) {
  const totalSteps = courses.reduce((sum, course) => sum + course.steps.length, 0);
  const totalTools = courses.reduce((sum, course) => sum + course.preparation.tools.length, 0);
  const featuredCourse = courses[0];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <section className="playful-stage grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="space-y-5">
          <span className="glass-pill w-fit text-xs font-bold text-slate-700">
            <span className="text-sm leading-none">✦</span>
            Educrystal
          </span>
          <div className="space-y-3">
            <h1 className="font-display text-5xl leading-[0.92] text-slate-900 sm:text-6xl">
              Cùng bé khám phá cách tinh thể lớn lên từng ngày.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Một không gian học vui, đủ trực quan để trẻ thấy thành quả của mình, và đủ rõ ràng để phụ huynh đồng hành suốt cả hành trình nuôi tinh thể tại nhà.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {canSignIn ? (
              <GoogleSignInButton
                className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-soft"
              />
            ) : (
              <div className="rounded-[1.5rem] border-2 border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-soft">
                Chưa cấu hình Supabase nên nút đăng nhập đang tạm khóa.
              </div>
            )}
            <a
              href="#featured-courses"
              className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-soft"
            >
              Xem khóa học mẫu
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="metric-tile">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Khóa mẫu</p>
              <p className="mt-2 font-display text-4xl text-slate-900">{courses.length}</p>
              <p className="mt-1 text-sm text-slate-500">Đã sẵn sàng để bắt đầu</p>
            </div>
            <div className="metric-tile">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Bước học</p>
              <p className="mt-2 font-display text-4xl text-slate-900">{totalSteps}</p>
              <p className="mt-1 text-sm text-slate-500">Rõ ràng theo từng ngày</p>
            </div>
            <div className="metric-tile">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Nhịp học</p>
              <p className="mt-2 font-display text-4xl text-slate-900">1 chạm</p>
              <p className="mt-1 text-sm text-slate-500">Vào lại đúng chỗ đang làm</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="speech-cloud text-sm leading-6 text-slate-600">
              Vừa đủ mềm mại cho trẻ thấy thích thú, nhưng vẫn đủ chặt chẽ để phụ huynh nắm được tiến độ thật.
            </div>
            <div className="quest-card">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Chuẩn bị có hướng dẫn</p>
              <p className="mt-2 font-display text-3xl text-slate-900">{totalTools}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">Dụng cụ được gom rõ theo từng khóa để việc chuẩn bị không bị rối.</p>
            </div>
          </div>
        </div>

        <div className="panel-soft section-glow overflow-hidden">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Không gian trải nghiệm</p>
              <h2 className="mt-2 font-display text-3xl text-slate-900">Một góc học nhỏ nhưng có nhịp điệu</h2>
            </div>
            <div className="icon-shell h-14 w-14 text-xl text-slate-900">✦</div>
          </div>

          {featuredCourse ? (
            <div className="mt-4 overflow-hidden rounded-[1.8rem] border-2 border-outline bg-white shadow-soft">
              <div className="grid gap-0 md:grid-cols-[0.92fr_1.08fr]">
                <CourseCover course={featuredCourse} className="aspect-[4/3] h-full" />
                <div className="flex flex-col justify-between gap-4 p-4">
                  <div>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">{featuredCourse.level}</span>
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-900">{featuredCourse.duration}</span>
                      <span className="rounded-full bg-sky-100 px-2.5 py-1 text-sky-800">{featuredCourse.ageBand}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-black leading-tight text-slate-900">{featuredCourse.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{featuredCourse.summary}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.35rem] border border-outline/70 bg-surface-soft px-3 py-3">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Sản phẩm cuối</p>
                      <p className="mt-1 text-sm font-black text-slate-900">{featuredCourse.whatYouMake}</p>
                    </div>
                    <div className="rounded-[1.35rem] border border-outline/70 bg-white px-3 py-3">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Số bước</p>
                      <p className="mt-1 text-sm font-black text-slate-900">{featuredCourse.steps.length} bước rõ ràng</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-4 space-y-3">
            {[
              "Đăng nhập bằng Google để lưu tiến độ cho từng bé.",
              "Mở khóa học, xem từng bước và theo dõi các giai đoạn cần chờ.",
              "Ghi nhật ký thực hành để lần sau quay lại vẫn tiếp tục đúng chỗ.",
            ].map((item, index) => (
              <div key={item} className="quest-card flex items-start gap-3">
                <span className="icon-shell h-10 w-10 shrink-0 text-sm font-black text-slate-900">0{index + 1}</span>
                <p className="pt-1 text-sm leading-6 text-slate-600">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 speech-cloud text-sm leading-6 text-slate-600">
            Mọi thẻ nội dung đều được làm để phụ huynh nhìn lướt là biết: đang ở đâu, cần chờ bao lâu, và bước kế tiếp của bé là gì.
          </div>
        </div>
      </section>

      <section id="featured-courses" className="space-y-4">
        <div className="panel-soft section-glow">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Khóa học nổi bật</p>
          <h2 className="mt-2 font-display text-3xl text-slate-900">Khám phá một vài hành trình trước khi vào học</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Mỗi khóa đều có lộ trình ngắn gọn, ảnh minh họa rõ ràng và nhịp chờ phù hợp để trẻ thực sự quan sát được sự lớn lên của tinh thể.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <article key={course.slug} className="list-card space-y-3">
              <CourseCover course={course} className="aspect-[4/3]" />
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1">{course.level}</span>
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-900">{course.duration}</span>
                  <span className="rounded-full bg-sky-100 px-2.5 py-1 text-sky-800">{course.ageBand}</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">{course.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{course.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="reward-strip grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Dành cho phụ huynh</p>
          <h2 className="mt-2 font-display text-3xl text-slate-900">Không chỉ đẹp mắt mà còn giúp theo dõi thật</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">Educrystal được dựng như một khu học tập nhỏ: có chỗ xem tiến độ, chỗ ghi lại quan sát, và các bước chờ đủ rõ để cả nhà không bị lạc nhịp giữa các ngày.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="quest-card">
            <p className="text-sm font-black text-slate-900">Theo dõi được</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">Mỗi khóa ghi nhớ bước đang làm và phần đã hoàn thành.</p>
          </div>
          <div className="quest-card">
            <p className="text-sm font-black text-slate-900">Nhớ được cảm xúc</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">Nhật ký ngắn giúp bé và phụ huynh nhìn lại thành quả qua từng ngày.</p>
          </div>
          <div className="quest-card">
            <p className="text-sm font-black text-slate-900">Chờ không bị quên</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">Các bước cần đợi được tách rõ, phù hợp với nhịp quan sát tinh thể lớn dần.</p>
          </div>
          <div className="quest-card">
            <p className="text-sm font-black text-slate-900">Admin biên tập gọn</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">Khóa học, media và bước thực hành được quản lý trong một khu chỉnh sửa liền mạch.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
