import { LoadingStatePanel } from "@/components/admin/status-empty-states";

export default function AdminCoursesLoading() {
  return (
    <LoadingStatePanel
      eyebrow="Đang tải admin"
      title="Đang tải khu quản trị khóa học"
      description="Educrystal đang gom bảng khóa học, tài khoản và tiến độ học tập để bạn có đủ dữ liệu quản lý trong một lần tải."
      tone="rose"
      layout="table"
      cardCount={4}
    />
  );
}
