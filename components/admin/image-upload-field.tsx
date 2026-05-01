"use client";

import { ImagePlus, LoaderCircle } from "lucide-react";
import { useId, useState } from "react";

import { normalizeCourseAssetPath } from "@/lib/supabase";

type UploadResponse = {
  data?: {
    path: string;
  };
  error?: string;
};

type ImageUploadFieldProps = {
  label: string;
  description: string;
  courseSlug: string;
  scope: string;
  value: string;
  onChangeAction: (nextValue: string) => void;
};

const inputClass =
  "w-full rounded-[1.45rem] border-2 border-outline bg-white px-4 py-3 text-sm text-slate-700 shadow-soft outline-none transition focus:border-sky focus:ring-0";

export function ImageUploadField({
  label,
  description,
  courseSlug,
  scope,
  value,
  onChangeAction,
}: ImageUploadFieldProps) {
  const fieldId = useId();
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.set("file", file);
    formData.set("courseSlug", courseSlug || "course-moi");
    formData.set("scope", scope);

    try {
      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as UploadResponse;

      if (!response.ok || !payload.data?.path) {
        throw new Error(payload.error ?? "Không thể tải ảnh lên");
      }

      onChangeAction(payload.data.path);
      setMessage("Đã tải ảnh lên và cập nhật đường dẫn.");
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-1">
        <label htmlFor={fieldId} className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          {label}
        </label>
        <p className="text-sm leading-6 text-slate-500">{description}</p>
      </div>

      <input id={fieldId} value={value} onChange={(event) => onChangeAction(event.target.value)} placeholder="covers/course-image.png" className={inputClass} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-outline bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-soft">
          {isUploading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          {isUploading ? "Đang tải ảnh..." : "Tải ảnh mới"}
          <input type="file" accept="image/*" className="sr-only" disabled={isUploading} onChange={(event) => void handleUpload(event)} />
        </label>
        {value ? <span className="text-xs font-semibold text-slate-500">Đường dẫn hiện tại: {value}</span> : null}
      </div>

      {value ? (
        <div className="overflow-hidden rounded-[1.5rem] border-2 border-outline bg-surface-soft shadow-soft">
          <img src={normalizeCourseAssetPath(value)} alt={label} className="aspect-[16/9] w-full object-cover" />
        </div>
      ) : null}

      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
    </div>
  );
}
