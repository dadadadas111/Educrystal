import { LoadingStatePanel } from "@/components/admin/status-empty-states";

export default function CatalogLoading() {
  return (
    <LoadingStatePanel
      eyebrow="Đang tải catalog"
      title="Đang sắp xếp các khóa học"
      description="Catalog đang chuẩn bị danh sách khóa, ảnh bìa và trạng thái tiến độ để bạn duyệt hành trình phù hợp nhất."
      tone="sky"
      layout="cards"
    />
  );
}
