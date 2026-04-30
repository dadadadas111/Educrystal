import { HomeDashboard } from "@/components/home/home-dashboard";
import { getCourses } from "@/lib/courses";

export default async function HomePage() {
  const courses = await getCourses();
  return <HomeDashboard courses={courses} />;
}
