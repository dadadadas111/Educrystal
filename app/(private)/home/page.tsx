import { HomeDashboard } from "@/components/home/home-dashboard";
import { getCourses } from "@/lib/courses";
import { getUserAppState } from "@/lib/user-state";

export default async function HomePage() {
  const [courses, initialState] = await Promise.all([getCourses(), getUserAppState()]);
  return <HomeDashboard courses={courses} initialState={initialState} />;
}
