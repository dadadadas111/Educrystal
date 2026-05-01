export type CourseTool = {
  name: string;
  spec: string;
};

export type CourseIngredient = {
  name: string;
  amount: number;
  unit: "g" | "kg" | "ml" | "l" | "muong" | "goi" | "cai";
  note?: string;
};

export type CoursePreparation = {
  tools: CourseTool[];
  ingredients: CourseIngredient[];
};

export type CourseStep = {
  order: number;
  title: string;
  body: string;
  kind: "prepare" | "instant" | "wait";
  notes?: string[];
  passCriteria: string;
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
  preparation: CoursePreparation;
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
    preparation: {
      tools: [
        { name: "Găng tay nitrile", spec: "1 đôi, vừa tay" },
        { name: "Ly thủy tinh có vạch", spec: "500 ml" },
        { name: "Cân tiểu ly", spec: "Sai số <= 0.1 g" },
        { name: "Nhiệt kế nước", spec: "Dải 0-100°C" },
        { name: "Que khuấy", spec: "Inox hoặc thủy tinh" },
      ],
      ingredients: [
        { name: "Phèn chua", amount: 120, unit: "g", note: "Loại tinh khiết, khô" },
        { name: "Nước lọc", amount: 300, unit: "ml", note: "Đun ấm 70-80°C" },
        { name: "Dây cước", amount: 1, unit: "cai", note: "Dài 20-25 cm" },
      ],
    },
    steps: [
      {
        order: 1,
        title: "Chuẩn bị dụng cụ và nguyên liệu",
        body: "Đeo găng tay, cân đúng định lượng và kiểm tra tất cả dụng cụ trước khi pha.",
        kind: "prepare",
        notes: ["Không dùng cốc nhựa mỏng vì dễ biến dạng khi nước nóng.", "Bắt buộc cân phèn chua, không ước lượng bằng mắt."],
        passCriteria: "Tất cả dụng cụ có mặt, nguyên liệu cân đủ và ghi vào checklist.",
        media: { kind: "image", src: "/covers/crystal-bloom.svg", alt: "Bàn chuẩn bị dụng cụ" },
      },
      {
        order: 2,
        title: "Pha dung dịch bão hòa",
        body: "Cho phèn chua vào nước ấm theo 3 lần, mỗi lần khuấy 60 giây cho tan rồi mới thêm tiếp.",
        kind: "instant",
        notes: ["Nếu còn cặn lớn, tăng nhiệt lên tối đa 80°C thay vì khuấy mạnh."],
        passCriteria: "Dung dịch trong tương đối, không còn hạt lớn lơ lửng trên mặt.",
        media: { kind: "image", src: "/covers/crystal-bloom.svg", alt: "Ly tinh thể đang được pha" },
      },
      {
        order: 3,
        title: "Để yên tạo mầm",
        body: "Rót dung dịch vào ly sạch, đặt nơi phẳng, tránh rung và tránh gió trực tiếp.",
        kind: "wait",
        waitDays: 2,
        waitHint: "Sau 48 giờ quay lại kiểm tra mầm đầu tiên.",
        notes: ["Không di chuyển ly trong 12 giờ đầu.", "Tránh ánh nắng trực tiếp làm bốc hơi nhanh."],
        passCriteria: "Xuất hiện tinh thể mầm nhỏ ở đáy hoặc bám thành ly.",
        media: { kind: "image", src: "/covers/crystal-bloom.svg", alt: "Ly tinh thể đang chờ mọc" },
      },
      {
        order: 4,
        title: "Chọn mầm đạt chuẩn",
        body: "Chọn mầm có cạnh rõ, ít bể vỡ, buộc vào dây cước để nuôi lớn.",
        kind: "instant",
        notes: ["Không chọn mầm bột hoặc méo vì sẽ lớn không đều."],
        passCriteria: "Có 1 mầm chính cao >= 3 mm, hình dạng cân đối.",
        media: { kind: "image", src: "/covers/crystal-bloom.svg", alt: "Hạt mầm tinh thể" },
      },
      {
        order: 5,
        title: "Treo mầm và theo dõi",
        body: "Treo mầm ở giữa ly sao cho không chạm thành/đáy, theo dõi thêm 24 giờ.",
        kind: "wait",
        waitDays: 1,
        waitHint: "Ngày mai đo chiều dài tinh thể và ghi nhật ký.",
        notes: ["Nếu mầm chạm thành ly, tháo và treo lại ngay."],
        passCriteria: "Mầm tăng kích thước và không có dấu hiệu nứt lớn.",
        media: { kind: "image", src: "/covers/crystal-bloom.svg", alt: "Mầm tinh thể treo giữa ly" },
      },
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
    preparation: {
      tools: [
        { name: "Găng tay nitrile", spec: "1 đôi" },
        { name: "Kìm mũi nhọn", spec: "Đầu nhỏ để uốn dây" },
        { name: "Ly thủy tinh có vạch", spec: "700 ml" },
        { name: "Cân tiểu ly", spec: "Sai số <= 0.1 g" },
      ],
      ingredients: [
        { name: "Borax", amount: 140, unit: "g" },
        { name: "Nước nóng", amount: 400, unit: "ml" },
        { name: "Màu thực phẩm", amount: 2, unit: "ml", note: "2-3 giọt" },
        { name: "Dây kẽm mềm", amount: 2, unit: "cai", note: "Mỗi đoạn 20 cm" },
      ],
    },
    steps: [
      {
        order: 1,
        title: "Chuẩn bị dụng cụ và nguyên liệu",
        body: "Đặt sẵn kìm, găng tay, cân và cân đủ borax trước khi thao tác.",
        kind: "prepare",
        notes: ["Không thao tác borax khi tay ướt.", "Chuẩn bị khăn giấy để xử lý nước đổ."],
        passCriteria: "Checklist dụng cụ và định lượng hoàn tất.",
        media: { kind: "image", src: "/covers/rainbow-frame.svg", alt: "Chuẩn bị cho khung tinh thể" },
      },
      {
        order: 2,
        title: "Uốn khung ổn định",
        body: "Uốn dây kẽm thành khung kín, các cạnh không nhọn để tinh thể bám đều.",
        kind: "instant",
        notes: ["Mối nối phải xoắn tối thiểu 2 vòng để không bung trong dung dịch."],
        passCriteria: "Khung không méo, đứng thẳng khi treo thử.",
        media: { kind: "image", src: "/covers/rainbow-frame.svg", alt: "Khung tinh thể đang uốn" },
      },
      {
        order: 3,
        title: "Pha dung dịch màu",
        body: "Hòa tan borax trong nước nóng, thêm màu từng giọt đến khi đạt sắc nhẹ.",
        kind: "instant",
        notes: ["Không cho quá nhiều màu để tránh che mặt tinh thể."],
        passCriteria: "Dung dịch đồng màu, không còn hạt borax lớn.",
        media: { kind: "image", src: "/covers/rainbow-frame.svg", alt: "Dung dịch có màu nhẹ" },
      },
      {
        order: 4,
        title: "Treo khung và chờ bám",
        body: "Treo khung ở giữa lọ, giữ khoảng cách đều giữa khung và thành lọ.",
        kind: "wait",
        waitDays: 2,
        waitHint: "Sau 2 ngày kiểm tra độ phủ bề mặt.",
        notes: ["Nếu khung chạm thành, tinh thể sẽ bám lệch."],
        passCriteria: "Tinh thể phủ tối thiểu 60% bề mặt khung.",
        media: { kind: "image", src: "/covers/rainbow-frame.svg", alt: "Khung được treo trong lọ" },
      },
      {
        order: 5,
        title: "Nuôi thêm để hoàn thiện",
        body: "Giữ yên thêm vài ngày để tăng độ dày lớp tinh thể quanh khung.",
        kind: "wait",
        waitDays: 3,
        waitHint: "Cuối tuần quay lại chụp ảnh kết quả.",
        notes: ["Không lắc lọ để tránh lớp tinh thể non bị rụng."],
        passCriteria: "Lớp tinh thể dày, màu đều và khung không lộ quá 20%.",
        media: { kind: "image", src: "/covers/rainbow-frame.svg", alt: "Khung tinh thể sau vài ngày" },
      },
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
    preparation: {
      tools: [
        { name: "Găng tay nitrile", spec: "1 đôi" },
        { name: "Ly thủy tinh có vạch", spec: "2 ly, mỗi ly 700 ml" },
        { name: "Cân tiểu ly", spec: "Sai số <= 0.1 g" },
        { name: "Nhíp đầu mảnh", spec: "1 chiếc" },
        { name: "Sổ quan sát", spec: "1 quyển" },
      ],
      ingredients: [
        { name: "Phèn chua tinh khiết", amount: 220, unit: "g" },
        { name: "Nước lọc", amount: 600, unit: "ml" },
        { name: "Dây cước", amount: 2, unit: "cai", note: "Mỗi đoạn 25 cm" },
      ],
    },
    steps: [
      {
        order: 1,
        title: "Chuẩn bị dụng cụ và nguyên liệu",
        body: "Thiết lập 2 ly riêng cho giai đoạn tạo mầm và nuôi lớn; cân nguyên liệu theo đúng bảng.",
        kind: "prepare",
        notes: ["Đánh dấu ly A/B để tránh nhầm dung dịch.", "Ghi sẵn mốc thời gian kiểm tra vào sổ."],
        passCriteria: "Bố cục bàn thí nghiệm hoàn chỉnh, nguyên liệu cân xong cho từng ly.",
        media: { kind: "image", src: "/covers/cluster-lab.svg", alt: "Chuẩn bị thí nghiệm cụm tinh thể" },
      },
      {
        order: 2,
        title: "Tạo mẻ mầm ban đầu",
        body: "Pha mẻ dung dịch đầu và để tạo nhiều mầm nhỏ trong 24 giờ.",
        kind: "wait",
        waitDays: 1,
        waitHint: "Ngày mai chọn mầm tốt nhất.",
        notes: ["Không khuấy lại trong thời gian chờ để tránh vỡ mầm non."],
        passCriteria: "Có ít nhất 5 mầm để lựa chọn.",
        media: { kind: "image", src: "/covers/cluster-lab.svg", alt: "Nhóm mầm tinh thể" },
      },
      {
        order: 3,
        title: "Chọn và treo mầm chính",
        body: "Dùng nhíp gắp mầm rõ cạnh nhất, treo vào ly B chứa dung dịch sạch hơn.",
        kind: "instant",
        notes: ["Nhíp phải khô trước khi gắp để tránh tan cạnh mầm."],
        passCriteria: "Mầm chính treo cân bằng, không chạm thành ly.",
        media: { kind: "image", src: "/covers/cluster-lab.svg", alt: "Chọn mầm tinh thể" },
      },
      {
        order: 4,
        title: "Nuôi cụm tinh thể",
        body: "Theo dõi độ trong của dung dịch và thay dung dịch khi xuất hiện cặn đục.",
        kind: "wait",
        waitDays: 2,
        waitHint: "Sau 2 ngày đánh giá cạnh và độ trong.",
        notes: ["Chỉ thay 70-80% dung dịch để hạn chế sốc tinh thể."],
        passCriteria: "Tinh thể tăng kích thước, cạnh rõ hơn qua mỗi lần kiểm tra.",
        media: { kind: "image", src: "/covers/cluster-lab.svg", alt: "Cụm tinh thể đang lớn" },
      },
      {
        order: 5,
        title: "Hoàn thiện và ghi nhận",
        body: "Lấy cụm ra, để khô tự nhiên và chụp ảnh ở cùng góc để so sánh tiến độ.",
        kind: "wait",
        waitDays: 3,
        waitHint: "Chờ khô hẳn rồi đo kích thước cuối.",
        notes: ["Không dùng máy sấy vì sốc nhiệt dễ nứt cụm."],
        passCriteria: "Cụm khô ổn định, không rạn lớn và có nhật ký ảnh hoàn chỉnh.",
        media: { kind: "image", src: "/covers/cluster-lab.svg", alt: "Cụm tinh thể hoàn thiện" },
      },
    ],
  },
];

export function getSeedCourseBySlug(slug: string) {
  return seedCourses.find((course) => course.slug === slug);
}
