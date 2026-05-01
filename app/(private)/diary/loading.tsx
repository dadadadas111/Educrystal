import { LoadingStatePanel } from "@/components/admin/status-empty-states";

export default function DiaryLoading() {
  return (
    <LoadingStatePanel
      eyebrow="Đang tải nhật ký"
      title="Đang mở khu ghi chú"
      description="Educrystal đang kéo các ghi chú quan sát gần nhất để bạn có thể tiếp tục ghi lại thay đổi của tinh thể mà không bị mất mạch."
      tone="gold"
      layout="cards"
    />
  );
}
