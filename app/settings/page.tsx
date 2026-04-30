import { SettingsPanel } from "@/components/settings/settings-panel";
import { getCourses } from "@/lib/courses";

export default async function SettingsPage() {
  const courses = await getCourses();
  return <SettingsPanel courses={courses} />;
}
