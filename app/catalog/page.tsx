import { CatalogBrowser } from "@/components/catalog/catalog-browser";
import { getCourses } from "@/lib/courses";

export default async function CatalogPage() {
  const courses = await getCourses();

  return <CatalogBrowser courses={courses} />;
}
