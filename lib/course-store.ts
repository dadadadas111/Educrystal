import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { seedCourses, type Course } from "@/data/courses";

const STORE_PATH = path.join(process.cwd(), "data", "courses.admin.json");

function cloneSeedCourses() {
  return structuredClone(seedCourses);
}

export async function readLocalCourses(): Promise<Course[]> {
  try {
    const raw = await readFile(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Course[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return cloneSeedCourses();
    }
    return parsed;
  } catch {
    return cloneSeedCourses();
  }
}

export async function writeLocalCourses(courses: Course[]) {
  await mkdir(path.dirname(STORE_PATH), { recursive: true });
  await writeFile(STORE_PATH, JSON.stringify(courses, null, 2), "utf-8");
}

export async function createCourse(course: Course) {
  const current = await readLocalCourses();
  if (current.some((item) => item.slug === course.slug)) {
    throw new Error("Course slug already exists");
  }
  const next = [...current, course];
  await writeLocalCourses(next);
  return course;
}

export async function updateCourse(slug: string, nextCourse: Course) {
  const current = await readLocalCourses();
  const index = current.findIndex((item) => item.slug === slug);

  if (index < 0) {
    return null;
  }

  if (nextCourse.slug !== slug && current.some((item) => item.slug === nextCourse.slug)) {
    throw new Error("New course slug already exists");
  }

  current[index] = nextCourse;
  await writeLocalCourses(current);
  return nextCourse;
}

export async function deleteCourse(slug: string) {
  const current = await readLocalCourses();
  const filtered = current.filter((item) => item.slug !== slug);
  if (filtered.length === current.length) {
    return false;
  }
  await writeLocalCourses(filtered);
  return true;
}
