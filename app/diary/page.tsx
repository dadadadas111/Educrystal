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
      <SectionHeading eyebrow={appCopy.diary.eyebrow} title={appCopy.diary.title} />

      <ScreenTabs items={diaryTabs} currentHref="/diary" />

      <section className="grid gap-5 xl:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)] xl:items-start">
        <ProgramCover program={program} size="compact" />

        <div className="panel-soft section-glow space-y-4 p-5 lg:p-6">
          <div className="flex items-center justify-between">
            <Badge className="bg-accent-soft text-text">{appCopy.diary.privacyBadge}</Badge>
            <span className="text-sm text-muted">{timeline.length} {appCopy.diary.entryCountLabel}</span>
          </div>

          <div>
            <h2 className="font-display text-xl">{program.title}</h2>
            <p className="text-sm text-muted">{appCopy.diary.timelineDescription}</p>
          </div>

          <Button href="/diary/new" className="w-full justify-center">
            {appCopy.diary.newPageCta}
          </Button>
        </div>
      </section>

      <section className="panel-soft section-glow space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg">{appCopy.diary.timelineTitle}</h2>
          <Button href="/diary/new" variant="secondary">{appCopy.diary.newPageCta}</Button>
        </div>

        <div className="grid gap-3">
          {timeline.map((entry) => (
            <article key={entry.id} className="crystal-card p-3 flex items-center gap-3">
              <div className="h-12 w-12 rounded-md bg-surface-soft flex items-center justify-center text-xl">{moodEmojiMap[entry.mood as keyof typeof moodEmojiMap]}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm">{entry.title}</h3>
                  <span className="text-xs text-muted">{dateFormatter.format(new Date(entry.createdAt))}</span>
                </div>
                <p className="text-sm text-muted truncate">{entry.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
