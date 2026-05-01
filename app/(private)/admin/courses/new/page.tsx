import { CourseFormEditor } from "@/components/admin/course-form-editor";
import type { Course } from "@/data/courses";

function createDraftCourse(): Course {
  return {
    slug: "",
    title: "",
    summary: "",
    whatYouMake: "",
    ageBand: "6+",
    level: "Dễ",
    duration: "3-5 ngày",
    coverImage: "",
    youtubeUrl: "",
    accent: "sky",
    published: false,
    preparation: {
      tools: [{ name: "", spec: "" }],
      ingredients: [{ name: "", amount: 0, unit: "g", note: "" }],
    },
    steps: [
      {
        order: 1,
        title: "",
        body: "",
        kind: "prepare",
        notes: [],
        passCriteria: "",
      },
    ],
  };
}

export default function NewAdminCoursePage() {
  return <CourseFormEditor mode="create" initialCourse={createDraftCourse()} />;
}
