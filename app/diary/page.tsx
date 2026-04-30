"use client";

import { Lock, NotebookPen, Sparkles } from "lucide-react";
import type { ComponentProps } from "react";
import { useMemo, useState } from "react";

import { SectionHeading } from "@/components/app/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { appCopy, locale } from "@/data/copy";
import { activeJourneySeed, diaryMoodOptions, sampleDiaryEntries, type DiaryEntrySeed } from "@/data/mvp";
import { getProgramBySlug, programs } from "@/data/programs";

const dateFormatter = new Intl.DateTimeFormat(locale, {
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Ho_Chi_Minh",
});

type DiaryDraft = {
  mood: (typeof diaryMoodOptions)[number];
};

const initialDraft: DiaryDraft = {
  mood: diaryMoodOptions[0],
};

export default function DiaryPage() {
  const program = getProgramBySlug(activeJourneySeed.programSlug) ?? programs[0];
  const [entries, setEntries] = useState<DiaryEntrySeed[]>(sampleDiaryEntries);
  const [draft, setDraft] = useState<DiaryDraft>(initialDraft);
  const [savedMessage, setSavedMessage] = useState(false);

  const timeline = useMemo(
    () =>
      [...entries].sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()),
    [entries],
  );

  const handleSubmit: NonNullable<ComponentProps<"form">["onSubmit"]> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const titleValue = String(formData.get("title") ?? "").trim();
    const bodyValue = String(formData.get("body") ?? "").trim();

    if (!bodyValue) {
      return;
    }

    const title = titleValue || appCopy.diary.fallbackEntryTitle;

    setEntries((current) => [
      {
        id: `entry-${Date.now()}`,
        createdAt: new Date().toISOString(),
        title,
        body: bodyValue,
        mood: draft.mood,
      },
      ...current,
    ]);
    setDraft(initialDraft);
    setSavedMessage(true);
    event.currentTarget.reset();
  };

  return (
    <div className="space-y-6 pb-6">
      <SectionHeading
        eyebrow={appCopy.diary.eyebrow}
        title={appCopy.diary.title}
        description={appCopy.diary.description}
      />

      <section className="panel-soft space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Badge className="border-success/20 bg-success/10 text-success">{appCopy.diary.privacyBadge}</Badge>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-text/72">
            {timeline.length} {appCopy.diary.entryCountLabel}
          </span>
        </div>

        <div className="flex items-start gap-3 rounded-[1.6rem] border border-white/10 bg-white/6 p-4">
          <div className="rounded-2xl bg-accent-soft/70 p-2.5">
            <Lock className="h-4 w-4 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-2xl text-white">{appCopy.diary.privacyTitle}</h2>
            <p className="text-sm leading-6 text-text/74">{appCopy.diary.privacyBody}</p>
          </div>
        </div>

        <div className={`overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br ${program.palette.from} ${program.palette.to} p-4`}>
          <div className="space-y-3 rounded-[1.5rem] border border-white/10 bg-surface/78 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-accent/80">{appCopy.diary.activeProgramLabel}</p>
            <h3 className="font-display text-2xl text-white">{program.title}</h3>
            <p className="text-sm leading-6 text-text/76">{program.goal}</p>
          </div>
        </div>
      </section>

      <section className="panel-soft space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-rose/15 p-2.5">
            <NotebookPen className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="font-display text-2xl text-white">{appCopy.diary.newEntryTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-text/72">{appCopy.diary.newEntryDescription}</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/82" htmlFor="diary-title">
              {appCopy.diary.titleFieldLabel}
            </label>
            <div className="field-shell">
              <input
                id="diary-title"
                name="title"
                className="field-input"
                onInput={() => setSavedMessage(false)}
                placeholder={appCopy.diary.titlePlaceholder}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/82" htmlFor="diary-body">
              {appCopy.diary.bodyFieldLabel}
            </label>
            <div className="field-shell">
              <textarea
                id="diary-body"
                name="body"
                className="field-input field-textarea"
                onInput={() => setSavedMessage(false)}
                placeholder={appCopy.diary.bodyPlaceholder}
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/82">{appCopy.diary.moodLabel}</p>
            <div className="flex flex-wrap gap-2">
              {diaryMoodOptions.map((mood) => {
                const isActive = draft.mood === mood;

                return (
                  <button
                    key={mood}
                    type="button"
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                      isActive
                        ? "bg-accent text-slate-950 shadow-crystal"
                        : "border border-white/10 bg-surface-strong/72 text-text/76 hover:border-accent/30 hover:text-text"
                    }`}
                    onClick={() => {
                      setDraft((current) => ({ ...current, mood }));
                      setSavedMessage(false);
                    }}
                  >
                    {mood}
                  </button>
                );
              })}
            </div>
          </div>

            <div className="space-y-3">
            <Button className="w-full justify-center gap-2" type="submit">
                <Sparkles className="h-4 w-4" />
                {appCopy.diary.saveCta}
              </Button>
            {savedMessage ? <p className="text-center text-sm text-success">{appCopy.diary.savedNote}</p> : null}
          </div>
        </form>
      </section>

      <section className="panel-soft space-y-4">
        <div className="space-y-2">
          <h2 className="font-display text-2xl text-white">{appCopy.diary.timelineTitle}</h2>
          <p className="text-sm leading-6 text-text/72">{appCopy.diary.timelineDescription}</p>
        </div>

        <div className="space-y-3">
          {timeline.map((entry) => (
            <article key={entry.id} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="tracking-[0.12em]">{entry.mood}</Badge>
                <span className="text-xs text-text/62">{dateFormatter.format(new Date(entry.createdAt))}</span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{entry.title}</h3>
              <p className="mt-3 text-sm leading-6 text-text/76">{entry.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
