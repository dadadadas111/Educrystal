import { NextRequest, NextResponse } from "next/server";

import { requireCurrentAdmin } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase-server";

function sanitizeSegment(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "") || "course";
}

export async function POST(request: NextRequest) {
  try {
    await requireCurrentAdmin();

    const supabase = await createSupabaseServerClient();

    if (!supabase) {
      throw new Error("Supabase is not configured");
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const courseSlug = String(formData.get("courseSlug") ?? "course");
    const scope = String(formData.get("scope") ?? "course");

    if (!(file instanceof File)) {
      throw new Error("Missing upload file");
    }

    const extension = file.name.includes(".") ? file.name.split(".").pop() : "bin";
    const storagePath = `${sanitizeSegment(courseSlug)}/${sanitizeSegment(scope)}-${Date.now()}.${extension}`;

    const { error } = await supabase.storage.from("course-meta").upload(storagePath, file, {
      cacheControl: "3600",
      contentType: file.type || undefined,
      upsert: false,
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      data: {
        path: storagePath,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
