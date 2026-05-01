import { DiaryPanel } from "@/components/diary/diary-panel";
import { getCourses } from "@/lib/courses";
import { getUserAppState } from "@/lib/user-state";

export default async function DiaryPage() {
  const [courses, initialState] = await Promise.all([getCourses(), getUserAppState()]);
  return <DiaryPanel courses={courses} initialState={initialState} />;
}
