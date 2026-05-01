import { LoadingStatePanel } from "@/components/admin/status-empty-states";

export default function EditAdminCourseLoading() {
  return (
    <LoadingStatePanel
      eyebrow="Đang tải form"
      title="Đang mở khu chỉnh sửa khóa học"
      description="Form khóa học đang nạp metadata, ảnh và thứ tự các bước để bạn chỉnh ngay trên đúng slug hiện tại."
      tone="accent"
      layout="form"
    />
  );
}
