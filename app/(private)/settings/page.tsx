import { SettingsPanel } from "@/components/settings/settings-panel";
import { getCourses } from "@/lib/courses";
import { getUserAppState } from "@/lib/user-state";

export default async function SettingsPage() {
  const [courses, initialState] = await Promise.all([getCourses(), getUserAppState()]);
  return <SettingsPanel courses={courses} initialState={initialState} />;
}
