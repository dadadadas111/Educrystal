"use client";

import { Sparkles } from "lucide-react";
import type { ComponentProps } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { ProgramCover } from "@/components/catalog/program-cover";
import { ScreenTabs } from "@/components/app/screen-tabs";
import { SectionHeading } from "@/components/app/section-heading";
import { Button } from "@/components/ui/button";
import { appCopy } from "@/data/copy";
import { activeJourneySeed, diaryMoodOptions } from "@/data/mvp";
import { getProgramBySlug, programs } from "@/data/programs";
import { useDiaryEntries } from "@/lib/mvp-client-state";

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

const diaryTabs = [
  { href: "/diary", label: appCopy.diary.timelinePageCta },
  { href: "/diary/new", label: appCopy.diary.newPageCta },
];

export default function NewDiaryPage() {
  const router = useRouter();
  const program = getProgramBySlug(activeJourneySeed.programSlug) ?? programs[0];
  const { addEntry } = useDiaryEntries();
  const [draft, setDraft] = useState<DiaryDraft>(initialDraft);

  const handleSubmit: NonNullable<ComponentProps<"form">["onSubmit"]> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const titleValue = String(formData.get("title") ?? "").trim();
    const bodyValue = String(formData.get("body") ?? "").trim();

    if (!bodyValue) {
      return;
    }

    addEntry({
      id: `entry-${Date.now()}`,
      createdAt: new Date().toISOString(),
      title: titleValue || appCopy.diary.fallbackEntryTitle,
      body: bodyValue,
      mood: draft.mood,
    });

    router.push("/diary");
  };

  return (
    <div className="space-y-6 pb-6 lg:space-y-8 lg:pb-0">
      <SectionHeading eyebrow={appCopy.diary.eyebrow} title={appCopy.diary.newTitle} description={appCopy.diary.newDescription} />

      <ScreenTabs items={diaryTabs} currentHref="/diary/new" />

      <section className="grid gap-5 xl:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)] xl:items-start">
        <ProgramCover program={program} size="compact" />

        <div className="playful-stage space-y-5">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">{appCopy.diary.newEntryTitle}</p>
            <h2 className="font-display text-[2.1rem] leading-[0.96] text-text">{program.title}</h2>
            <p className="text-sm leading-6 text-muted">{appCopy.diary.privacyBody}</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-coral" htmlFor="diary-title">
                {appCopy.diary.titleFieldLabel}
              </label>
              <div className="field-shell bg-white/95">
                <input id="diary-title" name="title" className="field-input" placeholder={appCopy.diary.titlePlaceholder} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-coral" htmlFor="diary-body">
                {appCopy.diary.bodyFieldLabel}
              </label>
              <div className="field-shell bg-white/95">
                <textarea id="diary-body" name="body" className="field-input field-textarea" placeholder={appCopy.diary.bodyPlaceholder} />
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
                      onClick={() => setDraft({ mood })}
                    >
                      <span className="mr-2">{moodEmojiMap[mood]}</span>
                      {mood}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="w-full justify-center gap-2 sm:w-auto" type="submit">
                <Sparkles className="h-4 w-4" />
                {appCopy.diary.saveCta}
              </Button>
              <Button href="/diary" variant="secondary" className="w-full justify-center sm:w-auto">
                {appCopy.diary.timelinePageCta}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
