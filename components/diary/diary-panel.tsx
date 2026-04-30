"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { Course } from "@/data/courses";
import { addDiaryEntry, createEmptyAppState, loadAppState, saveAppState } from "@/lib/progress";

type DiaryPanelProps = {
  courses: Course[];
};

export function DiaryPanel({ courses }: DiaryPanelProps) {
  const [state, setState] = useState(createEmptyAppState());
  const [courseSlug, setCourseSlug] = useState(courses[0]?.slug ?? "");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setState(loadAppState());
  }, []);

  useEffect(() => {
    saveAppState(state);
  }, [state]);

  const selectedCourse = useMemo(() => courses.find((course) => course.slug === courseSlug) ?? courses[0], [courseSlug, courses]);

  const handleSave = () => {
    if (!title.trim() || !body.trim()) return;

    const nextState = addDiaryEntry(state, {
      id: crypto.randomUUID(),
      title: title.trim(),
      body: body.trim(),
      courseSlug: selectedCourse?.slug,
      courseTitle: selectedCourse?.title,
      createdAt: new Date().toISOString(),
    });

    setState(nextState);
    setTitle("");
    setBody("");
  };

  const entries = state.diaryEntries;

  return (
    <div className="space-y-6">
      <section className="panel-soft section-glow">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Nhật ký</p>
        <h1 className="mt-2 font-display text-4xl leading-[0.95] text-slate-900">Ghi nhanh</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Không cần viết dài. Chỉ cần ghi cảm giác, hình ảnh, hoặc một điều thú vị của hôm nay.</p>
      </section>

      <section className="playful-stage">
        <div className="grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700">Gắn vào khóa học</label>
            <select value={courseSlug} onChange={(event) => setCourseSlug(event.target.value)} className="w-full rounded-2xl border-2 border-outline bg-white px-4 py-3 text-base outline-none shadow-soft focus:border-sky-300">
              {courses.map((course) => (
                <option key={course.slug} value={course.slug}>
                  {course.title}
                </option>
              ))}
            </select>
            {selectedCourse ? <Link href={`/catalog/${selectedCourse.slug}`} className="inline-flex rounded-full border-2 border-outline bg-amber-100 px-4 py-2 text-sm font-bold text-amber-900 shadow-soft">Xem khóa</Link> : null}
          </div>

          <div className="space-y-3">
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Tiêu đề ngắn" className="w-full rounded-2xl border-2 border-outline bg-white px-4 py-3 text-base outline-none shadow-soft focus:border-sky-300" />
            <textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="Hôm nay bạn thấy gì?" rows={6} className="w-full rounded-[1.5rem] border-2 border-outline bg-white px-4 py-3 text-base outline-none shadow-soft focus:border-sky-300" />
            <button type="button" onClick={handleSave} className="inline-flex w-full items-center justify-center rounded-full border-2 border-outline bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-soft">
              Lưu ghi chú
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        {entries.length === 0 ? <div className="list-card text-sm text-slate-600">Chưa có nhật ký nào.</div> : null}
        {entries.map((note) => (
          <article key={note.id} className="list-card">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{new Date(note.createdAt).toLocaleString("vi-VN")}</p>
            <h2 className="mt-2 text-lg font-black text-slate-900">{note.title}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">{note.body}</p>
            {note.courseTitle ? <p className="mt-3 inline-flex rounded-full border-2 border-outline bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800 shadow-soft">{note.courseTitle}</p> : null}
          </article>
        ))}
      </section>
    </div>
  );
}
