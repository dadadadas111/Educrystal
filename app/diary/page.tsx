import { DiaryPanel } from "@/components/diary/diary-panel";
import { getCourses } from "@/lib/courses";

export default async function DiaryPage() {
  const courses = await getCourses();
  return <DiaryPanel courses={courses} />;
}
