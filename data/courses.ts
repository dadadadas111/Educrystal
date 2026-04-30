export type CourseStep = {
  order: number;
  title: string;
  body: string;
  kind?: "instant" | "wait";
  waitDays?: number;
  waitHint?: string;
  media?: {
    kind: "image";
    src: string;
    alt: string;
  };
};

export type Course = {
  slug: string;
  title: string;
  summary: string;
  whatYouMake: string;
  ageBand: string;
  level: "Dễ" | "Vừa" | "Khó";
  duration: string;
  coverImage: string;
  accent: "sky" | "rose" | "gold";
  materials: string[];
  steps: CourseStep[];
};

export const seedCourses: Course[] = [
  {
    slug: "mam-tinh-the-trong",
    title: "Mầm tinh thể trong",
    summary: "Bài đầu tiên để trẻ nhìn thấy tinh thể mọc lên thật nhanh và dễ hiểu.",
    whatYouMake: "Một mầm tinh thể nhỏ trong veo",
    level: "Dễ",
    duration: "3-5 ngày",
    ageBand: "6+",
    coverImage: "/covers/crystal-bloom.svg",
    accent: "sky",
    materials: ["Phèn chua", "Nước ấm", "Ly thủy tinh", "Que treo"],
    steps: [
      { order: 1, title: "Pha nước", body: "Cho bột vào nước ấm và khuấy nhẹ cho tan.", kind: "instant", media: { kind: "image", src: "/covers/crystal-bloom.svg", alt: "Ly tinh thể đang được pha" } },
      { order: 2, title: "Để yên", body: "Đổ vào ly, đặt chỗ yên tĩnh, chờ tinh thể xuất hiện.", kind: "wait", waitDays: 2, waitHint: "Để yên 2 ngày rồi xem tiếp.", media: { kind: "image", src: "/covers/crystal-bloom.svg", alt: "Ly tinh thể đang chờ mọc" } },
      { order: 3, title: "Chọn mầm", body: "Lấy một hạt đẹp nhất để nuôi tiếp.", kind: "instant", media: { kind: "image", src: "/covers/crystal-bloom.svg", alt: "Hạt mầm tinh thể" } },
      { order: 4, title: "Treo mầm", body: "Treo ở giữa ly để tinh thể lớn đều hơn.", kind: "wait", waitDays: 1, waitHint: "Ngày mai xem lại nhé.", media: { kind: "image", src: "/covers/crystal-bloom.svg", alt: "Mầm tinh thể treo giữa ly" } },
    ],
  },
  {
    slug: "khung-tinh-the-sac-mau",
    title: "Khung tinh thể sắc màu",
    summary: "Trẻ uốn một khung nhỏ và xem tinh thể bám thành hình đẹp mắt.",
    whatYouMake: "Một khung tinh thể màu nhẹ",
    level: "Vừa",
    duration: "5-7 ngày",
    ageBand: "8+",
    coverImage: "/covers/rainbow-frame.svg",
    accent: "rose",
    materials: ["Borax", "Dây kẽm mềm", "Màu thực phẩm", "Lọ cao"],
    steps: [
      { order: 1, title: "Uốn khung", body: "Tạo hình ngôi sao hoặc trái tim bằng dây kẽm.", kind: "instant", media: { kind: "image", src: "/covers/rainbow-frame.svg", alt: "Khung tinh thể đang uốn" } },
      { order: 2, title: "Pha màu", body: "Thêm một ít màu để tinh thể có sắc nhẹ.", kind: "instant", media: { kind: "image", src: "/covers/rainbow-frame.svg", alt: "Dung dịch có màu nhẹ" } },
      { order: 3, title: "Treo khung", body: "Giữ khung ở giữa lọ, không chạm thành lọ.", kind: "wait", waitDays: 2, waitHint: "Chờ 2 ngày để lớp tinh thể bám đều.", media: { kind: "image", src: "/covers/rainbow-frame.svg", alt: "Khung được treo trong lọ" } },
      { order: 4, title: "Chờ lớn", body: "Để yên vài ngày cho tinh thể bám đều quanh khung.", kind: "wait", waitDays: 3, waitHint: "Xem lại vào cuối tuần.", media: { kind: "image", src: "/covers/rainbow-frame.svg", alt: "Khung tinh thể sau vài ngày" } },
    ],
  },
  {
    slug: "cum-tinh-the-lon",
    title: "Cụm tinh thể lớn",
    summary: "Bài nâng cao cho trẻ muốn thấy một cụm tinh thể rõ cạnh và đẹp hơn.",
    whatYouMake: "Một cụm tinh thể nhiều lớp",
    level: "Khó",
    duration: "7-10 ngày",
    ageBand: "10+",
    coverImage: "/covers/cluster-lab.svg",
    accent: "gold",
    materials: ["Phèn chua tinh khiết", "Hai lọ", "Nhíp", "Sổ ghi chép"],
    steps: [
      { order: 1, title: "Tạo mầm", body: "Làm ra nhiều hạt nhỏ để chọn hạt đẹp nhất.", kind: "instant", media: { kind: "image", src: "/covers/cluster-lab.svg", alt: "Nhóm mầm tinh thể" } },
      { order: 2, title: "Chọn hạt đẹp", body: "Chuyển hạt tốt nhất sang lọ mới.", kind: "instant", media: { kind: "image", src: "/covers/cluster-lab.svg", alt: "Chọn mầm tinh thể" } },
      { order: 3, title: "Nuôi tiếp", body: "Thay dung dịch khi thấy nước đục hoặc cặn.", kind: "wait", waitDays: 2, waitHint: "Theo dõi 2 ngày rồi đổi dung dịch nếu cần.", media: { kind: "image", src: "/covers/cluster-lab.svg", alt: "Cụm tinh thể đang lớn" } },
      { order: 4, title: "Hoàn thiện", body: "Để khô tự nhiên và ghi lại kết quả.", kind: "wait", waitDays: 3, waitHint: "Chờ khô hẳn trước khi chạm vào.", media: { kind: "image", src: "/covers/cluster-lab.svg", alt: "Cụm tinh thể hoàn thiện" } },
    ],
  },
];

export function getSeedCourseBySlug(slug: string) {
  return seedCourses.find((course) => course.slug === slug);
}
