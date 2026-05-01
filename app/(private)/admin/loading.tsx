import { LoadingStatePanel } from "@/components/admin/status-empty-states";

export default function AdminLoading() {
  return (
    <LoadingStatePanel
      eyebrow="Đang tải admin"
      title="Đang mở bảng điều phối Educrystal"
      description="Khu quản trị đang kết nối khóa học, hồ sơ người dùng và dữ liệu tiến độ để bạn nhìn toàn cảnh trước khi chỉnh sửa nội dung."
      tone="rose"
      layout="table"
      cardCount={3}
    />
  );
}
