import { redirect } from "next/navigation";

import { LandingPage } from "@/components/landing/landing-page";
import { getCourses } from "@/lib/courses";
import { getCurrentUser } from "@/lib/auth";
import { hasSupabaseConfig } from "@/lib/supabase";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/home");
  }

  const courses = await getCourses();

  return <LandingPage courses={courses.slice(0, 3)} canSignIn={hasSupabaseConfig()} />;
}
