import { CatalogBrowser } from "@/components/catalog/catalog-browser";
import { getCourses } from "@/lib/courses";
import { getUserAppState } from "@/lib/user-state";

export default async function CatalogPage() {
  const [courses, initialState] = await Promise.all([getCourses(), getUserAppState()]);

  return <CatalogBrowser courses={courses} initialState={initialState} />;
}
