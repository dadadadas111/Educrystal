"use client";

import { Lock, Sparkles } from "lucide-react";

import { ProgramCover } from "@/components/catalog/program-cover";
import { ScreenTabs } from "@/components/app/screen-tabs";
import { SectionHeading } from "@/components/app/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { appCopy, locale } from "@/data/copy";
import { activeJourneySeed } from "@/data/mvp";
import { getProgramBySlug, programs } from "@/data/programs";
import { useDiaryEntries } from "@/lib/mvp-client-state";

const dateFormatter = new Intl.DateTimeFormat(locale, {
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Ho_Chi_Minh",
});

const moodToneMap = {
  "Bình yên": "bg-accent-soft text-text",
  "Tò mò": "bg-sky/35 text-text",
  "Tự hào": "bg-rose/30 text-text",
} as const;

const moodEmojiMap = {
  "Bình yên": "😌",
  "Tò mò": "🤔",
  "Tự hào": "🥳",
} as const;

const diaryTabs = [
  { href: "/diary", label: appCopy.diary.timelinePageCta },
  { href: "/diary/new", label: appCopy.diary.newPageCta },
];

export default function DiaryPage() {
  const program = getProgramBySlug(activeJourneySeed.programSlug) ?? programs[0];
  const { timeline } = useDiaryEntries();

  return (
    <div className="space-y-6 pb-6 lg:space-y-8 lg:pb-0">
      <SectionHeading eyebrow={appCopy.diary.eyebrow} title={appCopy.diary.title} description={appCopy.diary.description} />

      <ScreenTabs items={diaryTabs} currentHref="/diary" />

      <section className="grid gap-5 xl:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)] xl:items-start">
        <ProgramCover program={program} size="compact" />

        <div className="panel-soft section-glow space-y-5 p-5 lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge className="bg-accent-soft text-text">{appCopy.diary.privacyBadge}</Badge>
            <span className="glass-pill text-xs font-bold text-text">
              {timeline.length} {appCopy.diary.entryCountLabel}
            </span>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">{appCopy.diary.timelineTitle}</p>
            <h2 className="font-display text-[2.1rem] leading-[0.96] text-text">{program.title}</h2>
            <p className="text-sm leading-6 text-muted">{appCopy.diary.timelineDescription}</p>
          </div>

          <div className="speech-cloud text-sm leading-6 text-text">
            <div className="flex items-start gap-3">
              <div className="icon-shell h-11 w-11 shrink-0 rounded-[1.1rem] bg-sky/35 text-coral">
                <Lock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">{appCopy.diary.privacyTitle}</p>
                <p className="mt-2">{appCopy.diary.privacyBody}</p>
              </div>
            </div>
          </div>

          <Button href="/diary/new" className="w-full justify-center sm:w-auto">
            {appCopy.diary.newPageCta}
          </Button>
        </div>
      </section>

      <section className="panel-soft section-glow space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-[2rem] text-text">{appCopy.diary.timelineTitle}</h2>
          <Button href="/diary/new" variant="secondary" className="justify-center">
            {appCopy.diary.newPageCta}
          </Button>
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
