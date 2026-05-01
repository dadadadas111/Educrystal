import { LoadingStatePanel } from "@/components/admin/status-empty-states";

export default function HomeLoading() {
  return (
    <LoadingStatePanel
      eyebrow="Đang tải trang chủ"
      title="Đang ghép nhịp học hôm nay"
      description="Trang chủ đang lấy tiến độ hiện tại, bước tiếp theo và ghi chú gần nhất để mở ra đúng việc cần làm tiếp theo."
      tone="accent"
      layout="cards"
    />
  );
}
