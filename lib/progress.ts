"use client";

export type CourseProgressState = {
  activeStepIndex: number;
  completedSteps: number[];
  reminderAt?: string;
  updatedAt: string;
};

export type DiaryEntry = {
  id: string;
  title: string;
  body: string;
  courseSlug?: string;
  courseTitle?: string;
  createdAt: string;
};

export type AppState = {
  courses: Record<string, CourseProgressState>;
  diaryEntries: DiaryEntry[];
  reminders: Array<{
    courseSlug: string;
    stepIndex: number;
    reminderAt: string;
    note: string;
  }>;
};

const STORAGE_KEY = "educrystal:app-state";

const emptyState: AppState = {
  courses: {},
  diaryEntries: [],
  reminders: [],
};

export function createEmptyAppState(): AppState {
  return structuredClone(emptyState);
}

export function loadAppState(): AppState {
  if (typeof window === "undefined") {
    return createEmptyAppState();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return createEmptyAppState();
  }

  try {
    return JSON.parse(raw) as AppState;
  } catch {
    return createEmptyAppState();
  }
}

export function saveAppState(state: AppState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getCourseProgress(state: AppState, courseSlug: string): CourseProgressState {
  return state.courses[courseSlug] ?? {
    activeStepIndex: 0,
    completedSteps: [],
    updatedAt: new Date().toISOString(),
  };
}

export function upsertCourseProgress(state: AppState, courseSlug: string, nextState: CourseProgressState): AppState {
  return {
    ...state,
    courses: {
      ...state.courses,
      [courseSlug]: nextState,
    },
  };
}

export function addReminder(
  state: AppState,
  reminder: { courseSlug: string; stepIndex: number; reminderAt: string; note: string },
): AppState {
  return {
    ...state,
    reminders: [reminder, ...state.reminders],
  };
}

export function addDiaryEntry(state: AppState, entry: DiaryEntry): AppState {
  return {
    ...state,
    diaryEntries: [entry, ...state.diaryEntries],
  };
}
