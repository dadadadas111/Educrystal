import { LoadingStatePanel } from "@/components/admin/status-empty-states";

export default function SettingsLoading() {
  return (
    <LoadingStatePanel
      eyebrow="Đang tải cài đặt"
      title="Đang chuẩn bị nhắc lịch và kết nối"
      description="Phần cài đặt đang nạp thông tin khóa học và nhắc chờ để phụ huynh nhìn nhanh được toàn bộ hậu trường cần thiết."
      tone="sky"
      layout="cards"
    />
  );
}
