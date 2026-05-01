"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

import type { CourseStep } from "@/data/courses";
import { ImageUploadField } from "@/components/admin/image-upload-field";

type StepEditorTableProps = {
  courseSlug: string;
  steps: CourseStep[];
  onChangeAction: (nextSteps: CourseStep[]) => void;
};

const inputClass =
  "w-full rounded-[1.45rem] border-2 border-outline bg-white px-4 py-3 text-sm text-slate-700 shadow-soft outline-none transition focus:border-sky focus:ring-0";

const textareaClass = `${inputClass} min-h-[120px]`;

function createEmptyStep(order: number): CourseStep {
  return {
    order,
    title: "",
    body: "",
    kind: order === 1 ? "prepare" : "instant",
    notes: [],
    passCriteria: "",
  };
}

function normalizeSteps(steps: CourseStep[]) {
  return steps.map((step, index) => ({
    ...step,
    order: index + 1,
    kind: index === 0 ? "prepare" : step.kind,
  }));
}

function swap<T>(items: T[], from: number, to: number) {
  const next = [...items];
  const target = next[from];
  next[from] = next[to];
  next[to] = target;
  return next;
}

function createEmptyNote() {
  return "";
}

export function StepEditorTable({ courseSlug, steps, onChangeAction }: StepEditorTableProps) {
  const updateStep = (index: number, updater: (step: CourseStep) => CourseStep) => {
    onChangeAction(normalizeSteps(steps.map((step, currentIndex) => (currentIndex === index ? updater(step) : step))));
  };

  const setNote = (stepIndex: number, noteIndex: number, value: string) => {
    updateStep(stepIndex, (step) => {
      const nextNotes = [...(step.notes ?? [])];
      nextNotes[noteIndex] = value;

      return {
        ...step,
        notes: nextNotes,
      };
    });
  };

  const addNote = (index: number) => {
    updateStep(index, (step) => ({
      ...step,
      notes: [...(step.notes ?? []), createEmptyNote()],
    }));
  };

  const removeNote = (stepIndex: number, noteIndex: number) => {
    updateStep(stepIndex, (step) => {
      const nextNotes = (step.notes ?? []).filter((_, currentIndex) => currentIndex !== noteIndex);

      return {
        ...step,
        notes: nextNotes,
      };
    });
  };

  const addStep = () => {
    onChangeAction(normalizeSteps([...steps, createEmptyStep(steps.length + 1)]));
  };

  const removeStep = (index: number) => {
    if (steps.length === 1) {
      return;
    }

    onChangeAction(normalizeSteps(steps.filter((_, currentIndex) => currentIndex !== index)));
  };

  const moveStep = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= steps.length) {
      return;
    }

    onChangeAction(normalizeSteps(swap(steps, index, targetIndex)));
  };

  return (
    <section className="space-y-4 panel-soft section-glow">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Các bước</p>
          <h2 className="mt-2 font-display text-3xl text-slate-900">Step editor</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Sắp xếp đúng thứ tự, khóa bước đầu là chuẩn bị, và quản lý riêng ảnh cho từng bước ngay trong bảng biên tập.</p>
        </div>
        <button type="button" onClick={addStep} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-outline bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-soft">
          <Plus className="h-4 w-4" />
          Thêm bước
        </button>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <article key={`${step.order}-${index}`} className="quest-card space-y-4">
            <div className="flex flex-col gap-3 border-b border-outline/70 pb-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Bước {index + 1}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {index === 0 ? "Bước đầu tiên luôn là chuẩn bị để khớp backend validation." : "Bạn có thể đổi loại bước và sắp xếp lại thứ tự."}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => moveStep(index, "up")} disabled={index === 0} className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-soft disabled:cursor-not-allowed disabled:opacity-50">
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => moveStep(index, "down")} disabled={index === steps.length - 1} className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-soft disabled:cursor-not-allowed disabled:opacity-50">
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => removeStep(index)} disabled={steps.length === 1} className="inline-flex items-center justify-center rounded-full border-2 border-outline bg-rose/20 px-3 py-2 text-sm font-bold text-rose-900 shadow-soft disabled:cursor-not-allowed disabled:opacity-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Tiêu đề bước</label>
                <input value={step.title} onChange={(event) => updateStep(index, (current) => ({ ...current, title: event.target.value }))} placeholder="Ví dụ: Pha dung dịch" className={inputClass} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Loại bước</label>
                <select value={index === 0 ? "prepare" : step.kind} disabled={index === 0} onChange={(event) => updateStep(index, (current) => ({ ...current, kind: event.target.value as CourseStep["kind"] }))} className={inputClass}>
                  <option value="prepare">Chuẩn bị</option>
                  <option value="instant">Làm ngay</option>
                  <option value="wait">Chờ quan sát</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Mô tả cho phụ huynh và trẻ</label>
              <textarea value={step.body} onChange={(event) => updateStep(index, (current) => ({ ...current, body: event.target.value }))} placeholder="Mô tả rõ việc cần làm ở bước này" className={textareaClass} />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Điều kiện hoàn thành</label>
                <textarea value={step.passCriteria} onChange={(event) => updateStep(index, (current) => ({ ...current, passCriteria: event.target.value }))} placeholder="Ví dụ: Tinh thể xuất hiện rõ ở đáy ly" className={`${inputClass} min-h-[96px]`} />
              </div>
              <div className="space-y-2">
                <div className="flex items-end justify-between gap-3">
                  <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Ghi chú từng dòng</label>
                  <button type="button" onClick={() => addNote(index)} className="inline-flex rounded-full border-2 border-outline bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-soft">
                    Thêm dòng
                  </button>
                </div>

                <div className="space-y-3">
                  {(step.notes && step.notes.length > 0 ? step.notes : [createEmptyNote()]).map((note, noteIndex) => (
                    <div key={`${step.order}-note-${noteIndex}`} className="flex gap-2">
                      <input
                        value={note}
                        onChange={(event) => setNote(index, noteIndex, event.target.value)}
                        placeholder={noteIndex === 0 ? "Ví dụ: Không dùng cốc nhựa mỏng" : "Thêm lưu ý khác"}
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => removeNote(index, noteIndex)}
                        disabled={(step.notes?.length ?? 0) === 0 && noteIndex === 0}
                        className="inline-flex shrink-0 items-center justify-center rounded-full border-2 border-outline bg-rose/20 px-4 py-3 text-sm font-bold text-rose-900 shadow-soft disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                </div>

                <p className="text-sm leading-6 text-slate-500">Mỗi dòng là một ghi chú riêng. Có thể thêm từng dòng như phần dụng cụ để sửa cho nhanh hơn.</p>
              </div>
            </div>

            {step.kind === "wait" ? (
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Số ngày chờ</label>
                  <input type="number" min={1} value={step.waitDays ?? ""} onChange={(event) => updateStep(index, (current) => ({ ...current, waitDays: event.target.value ? Number(event.target.value) : undefined }))} placeholder="2" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Nhắc khi chờ</label>
                  <input value={step.waitHint ?? ""} onChange={(event) => updateStep(index, (current) => ({ ...current, waitHint: event.target.value }))} placeholder="Ví dụ: Sau 48 giờ quay lại kiểm tra" className={inputClass} />
                </div>
              </div>
            ) : null}

            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <ImageUploadField
                label="Ảnh bước"
                description="Tải ảnh thật của bước này hoặc dán đường dẫn đã có. API upload sẽ trả về path để lưu vào step.media.src."
                courseSlug={courseSlug}
                scope={`step-${step.order}`}
                value={step.media?.src ?? ""}
                onChangeAction={(nextValue) =>
                  updateStep(index, (current) => ({
                    ...current,
                    media: nextValue
                      ? {
                          kind: "image",
                          src: nextValue,
                          alt: current.media?.alt ?? current.title,
                        }
                      : undefined,
                  }))
                }
              />

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Alt text ảnh bước</label>
                <input
                  value={step.media?.alt ?? ""}
                  onChange={(event) =>
                    updateStep(index, (current) => ({
                      ...current,
                      media: {
                        kind: "image",
                        src: current.media?.src ?? "",
                        alt: event.target.value,
                      },
                    }))
                  }
                  placeholder="Mô tả ngắn cho ảnh bước"
                  className={inputClass}
                />
                <p className="text-sm leading-6 text-slate-500">Nếu chưa có ảnh, alt text sẽ được giữ lại và tự dùng khi bạn tải ảnh sau.</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
