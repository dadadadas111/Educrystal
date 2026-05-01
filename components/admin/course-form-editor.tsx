"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import type { Course, CourseIngredient, CourseStep, CourseTool } from "@/data/courses";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { EmptyStatePanel, StatusBanner } from "@/components/admin/status-empty-states";
import { StepEditorTable } from "@/components/admin/step-editor-table";
import { normalizeCourseAssetPath } from "@/lib/supabase";

type AdminEditableCourse = Course & {
  youtubeUrl?: string;
  published?: boolean;
};

type CourseFormEditorProps = {
  mode: "create" | "edit";
  initialCourse: AdminEditableCourse;
  sourceSlug?: string;
};

type ApiResponse = {
  data?: AdminEditableCourse | null;
  error?: string;
};

type StatusTone = "sky" | "gold" | "rose" | "accent";

type StatusState = {
  tone: StatusTone;
  title: string;
  description: string;
} | null;

const inputClass =
  "w-full rounded-[1.45rem] border-2 border-outline bg-white px-4 py-3 text-sm text-slate-700 shadow-soft outline-none transition focus:border-sky focus:ring-0";

const textareaClass = `${inputClass} min-h-[120px]`;

const levelOptions: Course["level"][] = ["Dễ", "Vừa", "Khó"];
const accentOptions: Course["accent"][] = ["sky", "rose", "gold"];
const ingredientUnits: CourseIngredient["unit"][] = ["g", "kg", "ml", "l", "muong", "goi", "cai"];

function hasText(value: string | undefined) {
  return Boolean(value?.trim());
}

function createEmptyTool(): CourseTool {
  return { name: "", spec: "" };
}

function createEmptyIngredient(): CourseIngredient {
  return { name: "", amount: 0, unit: "g", note: "" };
}

function normalizeCourse(course: AdminEditableCourse): AdminEditableCourse {
  const nextSteps = course.steps.map((step, index) => {
    const mediaSrc = step.media?.src.trim() ?? "";
    const mediaAlt = step.media?.alt.trim() ?? step.title.trim();
    const isWaitStep = (index === 0 ? "prepare" : step.kind) === "wait";

    return {
      ...step,
      order: index + 1,
      title: step.title.trim(),
      body: step.body.trim(),
      kind: index === 0 ? "prepare" : step.kind,
      notes: (step.notes ?? []).map((note) => note.trim()).filter(Boolean),
      passCriteria: step.passCriteria.trim(),
      waitDays: isWaitStep && step.waitDays ? step.waitDays : undefined,
      waitHint: isWaitStep ? step.waitHint?.trim() || undefined : undefined,
      media: mediaSrc
        ? {
            kind: "image" as const,
            src: mediaSrc,
            alt: mediaAlt || step.title.trim(),
          }
        : undefined,
    } satisfies CourseStep;
  });

  return {
    ...course,
    slug: course.slug.trim().toLowerCase(),
    title: course.title.trim(),
    summary: course.summary.trim(),
    whatYouMake: course.whatYouMake.trim(),
    ageBand: course.ageBand.trim(),
    duration: course.duration.trim(),
    coverImage: course.coverImage.trim(),
    youtubeUrl: course.youtubeUrl?.trim() || undefined,
    published: Boolean(course.published),
    preparation: {
      tools: course.preparation.tools.map((tool) => ({ name: tool.name.trim(), spec: tool.spec.trim() })).filter((tool) => tool.name || tool.spec),
      ingredients: course.preparation.ingredients
        .map((ingredient) => ({
          name: ingredient.name.trim(),
          amount: Number.isFinite(ingredient.amount) ? ingredient.amount : 0,
          unit: ingredient.unit,
          note: ingredient.note?.trim() || undefined,
        }))
        .filter((ingredient) => ingredient.name),
    },
    steps: nextSteps,
  };
}

function validateCourse(course: AdminEditableCourse) {
  if (!course.slug || !course.title || !course.summary || !course.whatYouMake) {
    return "Vui lòng điền slug, tiêu đề, tóm tắt và sản phẩm cuối.";
  }

  if (!course.coverImage) {
    return "Khóa học cần có ảnh bìa trước khi lưu.";
  }

  if (course.steps.length === 0) {
    return "Khóa học phải có ít nhất một bước.";
  }

  if (course.steps.some((step) => !step.title || !step.body || !step.passCriteria)) {
    return "Mỗi bước cần có tiêu đề, mô tả và điều kiện hoàn thành.";
  }

  if (course.steps.some((step) => step.kind === "wait" && !step.waitDays)) {
    return "Bước chờ cần có số ngày chờ rõ ràng.";
  }

  return null;
}

export function CourseFormEditor({ mode, initialCourse, sourceSlug }: CourseFormEditorProps) {
  const router = useRouter();
  const [course, setCourse] = useState<AdminEditableCourse>(initialCourse);
  const [status, setStatus] = useState<StatusState>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const normalizedCourseSlug = useMemo(() => course.slug.trim().toLowerCase() || "course-moi", [course.slug]);
  const courseStats = useMemo(() => {
    const toolsCount = course.preparation.tools.filter((tool) => hasText(tool.name) || hasText(tool.spec)).length;
    const ingredientsCount = course.preparation.ingredients.filter((ingredient) => hasText(ingredient.name)).length;
    const completedSteps = course.steps.filter((step) => hasText(step.title) && hasText(step.body) && hasText(step.passCriteria)).length;
    const waitSteps = course.steps.filter((step) => step.kind === "wait").length;

    return {
      toolsCount,
      ingredientsCount,
      completedSteps,
      waitSteps,
    };
  }, [course]);

  const tools = course.preparation.tools.length > 0 ? course.preparation.tools : [createEmptyTool()];
  const ingredients = course.preparation.ingredients.length > 0 ? course.preparation.ingredients : [createEmptyIngredient()];

  const setTool = (index: number, field: keyof CourseTool, value: string) => {
    setCourse((current) => ({
      ...current,
      preparation: {
        ...current.preparation,
        tools: tools.map((tool, currentIndex) => (currentIndex === index ? { ...tool, [field]: value } : tool)),
      },
    }));
  };

  const setIngredient = <Field extends keyof CourseIngredient>(index: number, field: Field, value: CourseIngredient[Field]) => {
    setCourse((current) => ({
      ...current,
      preparation: {
        ...current.preparation,
        ingredients: ingredients.map((ingredient, currentIndex) => (currentIndex === index ? { ...ingredient, [field]: value } : ingredient)),
      },
    }));
  };

  const handleSave = async () => {
    const payload = normalizeCourse(course);
    const validationError = validateCourse(payload);

    if (validationError) {
      setStatus({ tone: "rose", title: "Chưa thể lưu khóa học", description: validationError });
      return;
    }

    setIsSaving(true);
    setStatus({ tone: "sky", title: "Đang lưu", description: "Educrystal đang gửi dữ liệu khóa học qua đúng admin API hiện có." });

    try {
      const response = await fetch(mode === "create" ? "/api/admin/courses" : `/api/admin/courses/${sourceSlug ?? initialCourse.slug}`,
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

      const result = (await response.json()) as ApiResponse;

      if (!response.ok || !result.data) {
        throw new Error(result.error ?? "Không thể lưu khóa học");
      }

      setCourse(result.data);
      setStatus({ tone: "accent", title: "Đã lưu khóa học", description: "Dữ liệu mới đã đồng bộ xong. Mình sẽ chuyển bạn tới trang chỉnh sửa chính của khóa học này." });
      router.push(`/admin/courses/${result.data.slug}`);
      router.refresh();
    } catch (error) {
      setStatus({ tone: "rose", title: "Lưu thất bại", description: (error as Error).message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (mode !== "edit") {
      return;
    }

    if (!window.confirm(`Xóa khóa học “${course.title || course.slug}”? Hành động này không thể hoàn tác.`)) {
      return;
    }

    setIsDeleting(true);
    setStatus({ tone: "gold", title: "Đang xóa khóa học", description: "Mình đang gọi đúng API DELETE hiện có để xóa khóa học khỏi hệ quản trị." });

    try {
      const response = await fetch(`/api/admin/courses/${sourceSlug ?? initialCourse.slug}`, {
        method: "DELETE",
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Không thể xóa khóa học");
      }

      router.push("/admin/courses");
      router.refresh();
    } catch (error) {
      setStatus({ tone: "rose", title: "Xóa thất bại", description: (error as Error).message });
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="playful-stage grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{mode === "create" ? "Khóa học mới" : "Chỉnh sửa khóa học"}</p>
          <h1 className="mt-2 font-display text-4xl leading-[0.95] text-slate-900">{mode === "create" ? "Dựng một hành trình học mới" : course.title || "Hoàn thiện khóa học"}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Khu biên tập này bám theo đúng schema course hiện tại: slug, metadata, ảnh bìa, YouTube, danh sách chuẩn bị và thứ tự step có media riêng.</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
            <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-600">/{normalizedCourseSlug}</span>
            <span className="rounded-full bg-sky/20 px-3 py-2 text-sky-900">{course.steps.length} bước</span>
            <span className="rounded-full bg-gold/20 px-3 py-2 text-amber-900">{courseStats.toolsCount} tools</span>
            <span className={course.published ? "rounded-full bg-accent-soft px-3 py-2 text-slate-900" : "rounded-full bg-slate-100 px-3 py-2 text-slate-500"}>
              {course.published ? "Đang hiển thị" : "Bản nháp"}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/admin/courses" className="inline-flex rounded-full border-2 border-outline bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-soft">
              Quay về bảng khóa học
            </Link>
            {course.slug ? (
              <Link href={`/catalog/${course.slug}`} className="inline-flex rounded-full border-2 border-outline bg-sky-100 px-4 py-3 text-sm font-bold text-sky-900 shadow-soft">
                Xem trang công khai
              </Link>
            ) : null}
          </div>
        </div>

        <div className="reward-strip">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Checklist nhanh</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.4rem] border border-outline/70 bg-white/75 px-3 py-3 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Nội dung</p>
              <p className="mt-1 text-sm font-black text-slate-900">{courseStats.completedSteps}/{course.steps.length} bước đã đủ dữ liệu</p>
            </div>
            <div className="rounded-[1.4rem] border border-outline/70 bg-white/75 px-3 py-3 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Chờ quan sát</p>
              <p className="mt-1 text-sm font-black text-slate-900">{courseStats.waitSteps} bước cần nhắc lại</p>
            </div>
            <div className="rounded-[1.4rem] border border-outline/70 bg-white/75 px-3 py-3 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Chuẩn bị</p>
              <p className="mt-1 text-sm font-black text-slate-900">{courseStats.toolsCount} tools · {courseStats.ingredientsCount} ingredients</p>
            </div>
            <div className="rounded-[1.4rem] border border-outline/70 bg-white/75 px-3 py-3 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Đường xuất bản</p>
              <p className="mt-1 text-sm font-black text-slate-900">{course.published ? "Catalog công khai" : "Chỉ hiện trong admin"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-4">
        <div className="metric-tile">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Slug</p>
          <p className="mt-2 text-sm font-black text-slate-900 break-all">/{normalizedCourseSlug}</p>
        </div>
        <div className="metric-tile">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Media</p>
          <p className="mt-2 text-sm font-black text-slate-900">{course.coverImage ? "Có ảnh bìa" : "Thiếu ảnh bìa"}</p>
          <p className="mt-1 text-xs text-slate-500">{course.steps.filter((step) => step.media?.src).length}/{course.steps.length} bước có ảnh</p>
        </div>
        <div className="metric-tile">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Video</p>
          <p className="mt-2 text-sm font-black text-slate-900">{course.youtubeUrl ? "Có YouTube" : "Chưa gắn video"}</p>
        </div>
        <div className="metric-tile">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Xuất bản</p>
          <p className="mt-2 text-sm font-black text-slate-900">{course.published ? "Đang hiển thị" : "Bản nháp"}</p>
        </div>
      </section>

      {status ? <StatusBanner title={status.title} description={status.description} tone={status.tone} /> : null}

      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="panel-soft section-glow space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Thông tin cơ bản</p>
            <h2 className="mt-2 font-display text-3xl text-slate-900">Nội dung và định vị khóa học</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Slug</label>
              <input value={course.slug} onChange={(event) => setCourse((current) => ({ ...current, slug: event.target.value }))} placeholder="mam-tinh-the-trong" className={inputClass} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Tiêu đề</label>
              <input value={course.title} onChange={(event) => setCourse((current) => ({ ...current, title: event.target.value }))} placeholder="Mầm tinh thể trong" className={inputClass} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Tóm tắt</label>
            <textarea value={course.summary} onChange={(event) => setCourse((current) => ({ ...current, summary: event.target.value }))} placeholder="Mô tả ngắn để hiện ở catalog và landing page" className={textareaClass} />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Thành phẩm</label>
            <input value={course.whatYouMake} onChange={(event) => setCourse((current) => ({ ...current, whatYouMake: event.target.value }))} placeholder="Một mầm tinh thể nhỏ trong veo" className={inputClass} />
          </div>
        </div>

        <div className="panel-soft section-glow space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Metadata</p>
            <h2 className="mt-2 font-display text-3xl text-slate-900">Độ khó, độ tuổi, video</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Nhóm tuổi</label>
              <input value={course.ageBand} onChange={(event) => setCourse((current) => ({ ...current, ageBand: event.target.value }))} placeholder="6+" className={inputClass} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Thời lượng</label>
              <input value={course.duration} onChange={(event) => setCourse((current) => ({ ...current, duration: event.target.value }))} placeholder="3-5 ngày" className={inputClass} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Độ khó</label>
              <select value={course.level} onChange={(event) => setCourse((current) => ({ ...current, level: event.target.value as Course["level"] }))} className={inputClass}>
                {levelOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Accent</label>
              <select value={course.accent} onChange={(event) => setCourse((current) => ({ ...current, accent: event.target.value as Course["accent"] }))} className={inputClass}>
                {accentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">YouTube URL</label>
            <input value={course.youtubeUrl ?? ""} onChange={(event) => setCourse((current) => ({ ...current, youtubeUrl: event.target.value }))} placeholder="https://www.youtube.com/watch?v=..." className={inputClass} />
          </div>

          <label className="quest-card flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black text-slate-900">Hiển thị công khai</p>
              <p className="mt-1 text-sm leading-6 text-slate-500">Bật để khóa học xuất hiện ở catalog thay vì chỉ nằm trong admin.</p>
            </div>
            <input type="checkbox" checked={Boolean(course.published)} onChange={(event) => setCourse((current) => ({ ...current, published: event.target.checked }))} className="h-5 w-5 rounded border-outline text-slate-900" />
          </label>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="panel-soft section-glow space-y-4">
          <ImageUploadField
            label="Ảnh bìa khóa học"
            description="Bạn có thể tải ảnh trực tiếp hoặc dán path đã có. Giá trị được lưu vào coverImage bằng đúng path API trả về."
            courseSlug={normalizedCourseSlug}
            scope="cover"
            value={course.coverImage}
            onChangeAction={(nextValue) => setCourse((current) => ({ ...current, coverImage: nextValue }))}
          />
        </div>

        <div className="panel-soft section-glow space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Preview</p>
          {course.coverImage ? (
            <div className="overflow-hidden rounded-[1.75rem] border-2 border-outline bg-white shadow-soft">
              <img src={normalizeCourseAssetPath(course.coverImage)} alt={course.whatYouMake || course.title || "Ảnh bìa khóa học"} className="aspect-[4/3] w-full object-cover" />
            </div>
          ) : (
            <EmptyStatePanel
              eyebrow="Ảnh bìa"
              title="Chưa có ảnh"
              tone="sky"
            />
          )}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="panel-soft section-glow space-y-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Dụng cụ</p>
              <h2 className="mt-2 font-display text-3xl text-slate-900">Danh sách tools</h2>
            </div>
            <button type="button" onClick={() => setCourse((current) => ({ ...current, preparation: { ...current.preparation, tools: [...tools, createEmptyTool()] } }))} className="inline-flex rounded-full border-2 border-outline bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-soft">
              Thêm tool
            </button>
          </div>

          <div className="space-y-3">
            {tools.map((tool, index) => (
              <div key={index} className="quest-card space-y-3">
                <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                  <input value={tool.name} onChange={(event) => setTool(index, "name", event.target.value)} placeholder="Tên dụng cụ" className={inputClass} />
                  <input value={tool.spec} onChange={(event) => setTool(index, "spec", event.target.value)} placeholder="Quy cách / số lượng" className={inputClass} />
                  <button type="button" onClick={() => setCourse((current) => ({ ...current, preparation: { ...current.preparation, tools: tools.filter((_, currentIndex) => currentIndex !== index) } }))} className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-rose/20 px-4 py-3 text-sm font-bold text-rose-900 shadow-soft">
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-soft section-glow space-y-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Nguyên liệu</p>
              <h2 className="mt-2 font-display text-3xl text-slate-900">Danh sách ingredients</h2>
            </div>
            <button type="button" onClick={() => setCourse((current) => ({ ...current, preparation: { ...current.preparation, ingredients: [...ingredients, createEmptyIngredient()] } }))} className="inline-flex rounded-full border-2 border-outline bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-soft">
              Thêm nguyên liệu
            </button>
          </div>

          <div className="space-y-3">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="quest-card space-y-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <input value={ingredient.name} onChange={(event) => setIngredient(index, "name", event.target.value)} placeholder="Tên nguyên liệu" className={inputClass} />
                  <input value={ingredient.note ?? ""} onChange={(event) => setIngredient(index, "note", event.target.value)} placeholder="Ghi chú ngắn" className={inputClass} />
                </div>
                <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                  <input type="number" min={0} step="0.1" value={ingredient.amount} onChange={(event) => setIngredient(index, "amount", Number(event.target.value))} placeholder="0" className={inputClass} />
                  <select value={ingredient.unit} onChange={(event) => setIngredient(index, "unit", event.target.value as CourseIngredient["unit"])} className={inputClass}>
                    {ingredientUnits.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={() => setCourse((current) => ({ ...current, preparation: { ...current.preparation, ingredients: ingredients.filter((_, currentIndex) => currentIndex !== index) } }))} className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-rose/20 px-4 py-3 text-sm font-bold text-rose-900 shadow-soft">
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StepEditorTable courseSlug={normalizedCourseSlug} steps={course.steps} onChangeAction={(nextSteps) => setCourse((current) => ({ ...current, steps: nextSteps }))} />

      <section className="panel-soft section-glow">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Hành động</p>
            <h2 className="mt-2 font-display text-3xl text-slate-900">Lưu hoặc dọn lại bản khóa học</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Sau khi lưu thành công, đường dẫn chỉnh sửa sẽ chuyển theo slug mới nếu bạn vừa đổi slug.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => void handleSave()} disabled={isSaving || isDeleting} className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-soft disabled:cursor-not-allowed disabled:opacity-60">
              {isSaving ? "Đang lưu..." : mode === "create" ? "Tạo khóa học" : "Lưu thay đổi"}
            </button>
            {mode === "edit" ? (
              <button type="button" onClick={() => void handleDelete()} disabled={isDeleting || isSaving} className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-rose/20 px-5 py-3 text-sm font-bold text-rose-900 shadow-soft disabled:cursor-not-allowed disabled:opacity-60">
                {isDeleting ? "Đang xóa..." : "Xóa khóa học"}
              </button>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
