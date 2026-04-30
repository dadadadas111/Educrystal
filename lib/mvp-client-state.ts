"use client";

import { useEffect, useMemo, useState } from "react";

import { activeJourneySeed, sampleDiaryEntries, type DiaryEntrySeed } from "@/data/mvp";

const JOURNEY_PROGRESS_KEY = "educrystal:journey-progress";
const DIARY_ENTRIES_KEY = "educrystal:diary-entries";

function readStoredValue<T>(key: string, fallback: T) {
  if (typeof window === "undefined") {
    return fallback;
  }

  const rawValue = window.localStorage.getItem(key);

  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

export function useJourneyProgress(totalSteps: number) {
  const [completedStepsCount, setCompletedStepsCount] = useState(activeJourneySeed.completedStepsCount);

  useEffect(() => {
    const storedCount = readStoredValue<number>(JOURNEY_PROGRESS_KEY, activeJourneySeed.completedStepsCount);
    setCompletedStepsCount(Math.min(Math.max(storedCount, 0), totalSteps));
  }, [totalSteps]);

  useEffect(() => {
    window.localStorage.setItem(JOURNEY_PROGRESS_KEY, JSON.stringify(completedStepsCount));
  }, [completedStepsCount]);

  return {
    completedStepsCount,
    completeStep: () => setCompletedStepsCount((current) => Math.min(current + 1, totalSteps)),
  };
}

export function useDiaryEntries() {
  const [entries, setEntries] = useState<DiaryEntrySeed[]>(sampleDiaryEntries);

  useEffect(() => {
    setEntries(readStoredValue<DiaryEntrySeed[]>(DIARY_ENTRIES_KEY, sampleDiaryEntries));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(DIARY_ENTRIES_KEY, JSON.stringify(entries));
  }, [entries]);

  const timeline = useMemo(
    () => [...entries].sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()),
    [entries],
  );

  return {
    entries,
    timeline,
    addEntry: (entry: DiaryEntrySeed) => setEntries((current) => [entry, ...current]),
  };
}
