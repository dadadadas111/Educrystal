"use client";

import { Lock, Sparkles, Stars } from "lucide-react";
import type { ComponentProps } from "react";
import { useMemo, useState } from "react";

import { CrystalGuide } from "@/components/app/crystal-guide";
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

const moodToneMap: Record<(typeof diaryMoodOptions)[number], string> = {
  "Bình yên": "bg-accent-soft text-text",
  "Tò mò": "bg-sky/35 text-text",
  "Tự hào": "bg-rose/30 text-text",
};

const moodEmojiMap: Record<(typeof diaryMoodOptions)[number], string> = {
  "Bình yên": "😌",
  "Tò mò": "🤔",
  "Tự hào": "🥳",
};

export default function DiaryPage() {
  const program = getProgramBySlug(activeJourneySeed.programSlug) ?? programs[0];
  const [entries, setEntries] = useState<DiaryEntrySeed[]>(sampleDiaryEntries);
  const [draft, setDraft] = useState<DiaryDraft>(initialDraft);
  const [savedMessage, setSavedMessage] = useState(false);

  const timeline = useMemo(
    () => [...entries].sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()),
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
    <div className="space-y-6 pb-6 lg:space-y-8 lg:pb-0">
      <SectionHeading
        eyebrow={appCopy.diary.eyebrow}
        title={appCopy.diary.title}
        description={appCopy.diary.description}
      />

      <section className="panel-soft section-glow overflow-hidden p-4 lg:p-5">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] xl:items-start">
          <div className="playful-stage space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Badge className="bg-accent-soft text-text">{appCopy.diary.privacyBadge}</Badge>
              <span className="glass-pill text-xs font-bold text-text">
                {timeline.length} {appCopy.diary.entryCountLabel}
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-[2.2rem] leading-[0.96] text-text md:text-[2.7rem]">Hôm nay tinh thể đổi gì rồi?</h2>
              <p className="max-w-2xl text-sm leading-6 text-muted">{appCopy.diary.newEntryDescription}</p>
            </div>

            <div className="speech-cloud text-sm leading-6 text-text">
              <div className="flex items-start gap-3">
                <div className="icon-shell h-11 w-11 shrink-0 rounded-[1.15rem] bg-sky/35 p-2.5 text-coral">
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">{appCopy.diary.privacyTitle}</p>
                  <p className="mt-2">{appCopy.diary.privacyBody}</p>
                </div>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-coral" htmlFor="diary-title">
                  {appCopy.diary.titleFieldLabel}
                </label>
                <div className="field-shell bg-white/95">
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
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-coral" htmlFor="diary-body">
                  {appCopy.diary.bodyFieldLabel}
                </label>
                <div className="field-shell bg-white/95">
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
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">{appCopy.diary.moodLabel}</p>
                <div className="flex flex-wrap gap-2">
                  {diaryMoodOptions.map((mood) => {
                    const isActive = draft.mood === mood;

                    return (
                      <button
                        key={mood}
                        type="button"
                        className={`rounded-full border-2 px-4 py-2.5 text-sm font-bold transition-colors duration-200 ${
                          isActive
                            ? `${moodToneMap[mood]} border-outline shadow-soft`
                            : "border-outline bg-white text-muted hover:border-gold hover:text-text"
                        }`}
                        onClick={() => {
                          setDraft((current) => ({ ...current, mood }));
                          setSavedMessage(false);
                        }}
                      >
                        <span className="mr-2">{moodEmojiMap[mood]}</span>
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
                {savedMessage ? <div className="reward-strip text-center text-sm font-bold text-text">🎉 {appCopy.diary.savedNote}</div> : null}
              </div>
            </form>
          </div>

          <CrystalGuide
            eyebrow={appCopy.diary.activeProgramLabel}
            title={program.title}
            body={program.goal}
            cheer={savedMessage ? "Đã cất gọn vào góc riêng rồi đó." : `Mood hôm nay là ${draft.mood.toLowerCase()}. Ghi ngắn thôi cũng rất quý.`}
            tone={program.palette.tone}
            clusterSize="md"
            aside={
              <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                <div className="metric-tile px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-coral">Nhật ký</p>
                  <p className="mt-2 font-display text-3xl text-text">{timeline.length}</p>
                </div>
                <div className="metric-tile px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-coral">Cảm giác</p>
                  <p className="mt-2 font-display text-3xl text-text">{moodEmojiMap[draft.mood]}</p>
                </div>
                <div className="crystal-card p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-coral">Điều đáng ghi nhất</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{activeJourneySeed.latestObservation}</p>
                </div>
              </div>
            }
          />
        </div>
      </section>

      <section className="panel-soft section-glow space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="icon-shell h-11 w-11 rounded-[1.15rem] bg-accent-soft/70 text-coral">
              <Stars className="h-4 w-4" />
            </div>
            <h2 className="font-display text-[2rem] text-text">{appCopy.diary.timelineTitle}</h2>
          </div>
          <p className="text-sm leading-6 text-muted">{appCopy.diary.timelineDescription}</p>
        </div>

        <div className="grid gap-3 2xl:grid-cols-2">
          {timeline.map((entry, index) => (
            <article key={entry.id} className={`crystal-card paper-grid p-4 ${index === 0 ? "2xl:col-span-2" : ""}`}>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={`${moodToneMap[entry.mood as keyof typeof moodToneMap]} border-outline tracking-[0.12em]`}>
                  {moodEmojiMap[entry.mood as keyof typeof moodEmojiMap]} {entry.mood}
                </Badge>
                <span className="text-xs text-muted">{dateFormatter.format(new Date(entry.createdAt))}</span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <h3 className="text-base font-bold text-text">{entry.title}</h3>
                <div className="icon-shell h-9 w-9 rounded-[1rem] bg-sky/30 text-coral">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{entry.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
