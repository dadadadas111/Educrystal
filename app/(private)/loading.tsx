import { LoadingStatePanel } from "@/components/admin/status-empty-states";

export default function PrivateLoading() {
  return (
    <div className="space-y-6">
      <LoadingStatePanel
        eyebrow="Đang tải khu riêng tư"
        title="Đang chuẩn bị khu học tập"
        description="Trang riêng tư đang tải dữ liệu khóa học, nhật ký và tiến độ để mọi khối nội dung hiện lên đầy đủ ngay khi mở."
        tone="accent"
        layout="cards"
      />
    </div>
  );
}
