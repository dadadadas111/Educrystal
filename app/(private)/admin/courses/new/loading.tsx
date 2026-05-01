import { LoadingStatePanel } from "@/components/admin/status-empty-states";

export default function NewAdminCourseLoading() {
  return (
    <LoadingStatePanel
      eyebrow="Đang tải form"
      title="Đang mở trình tạo khóa học"
      description="Educrystal đang chuẩn bị form metadata, media và step editor để bạn bắt đầu dựng khóa học mới ngay trong một màn hình liền mạch."
      tone="accent"
      layout="form"
    />
  );
}
