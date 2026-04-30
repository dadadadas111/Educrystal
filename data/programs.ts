export type Program = {
  slug: string;
  title: string;
  summary: string;
  tagline: string;
  coverLabel: string;
  coverHint: string;
  difficulty: string;
  duration: string;
  goal: string;
  recommendedFor: string;
  atmosphere: string;
  materials: Array<{
    name: string;
    amount: string;
    note: string;
  }>;
  steps: Array<{
    title: string;
    body: string;
    tip: string;
  }>;
  milestones: Array<{
    title: string;
    detail: string;
  }>;
  safetyNotes: string[];
  palette: {
    from: string;
    to: string;
    accent: string;
    tone: "aqua" | "rose" | "gold";
  };
};

export const programs: Program[] = [
  {
    slug: "mam-phen-chua-dau-tien",
    title: "Mầm phèn chua đầu tiên",
    summary:
      "Program nhập môn dành cho người mới muốn nhìn thấy tinh thể đầu đời bằng quy trình ngắn, sáng rõ và dễ lặp lại.",
    tagline: "Nhìn tinh thể đầu tiên xuất hiện chỉ sau vài ngày chăm sóc nhẹ nhàng.",
    coverLabel: "Mầm đầu",
    coverHint: "Trong veo · dễ bắt đầu",
    difficulty: "Dễ bắt đầu",
    duration: "3-5 ngày",
    goal: "Tạo được một tinh thể phèn chua nhỏ, trong và có thể quan sát được bằng mắt thường.",
    recommendedFor: "Phù hợp với người mới, học sinh nhỏ và gia đình muốn bắt đầu thật an toàn.",
    atmosphere: "Trong trẻo, chậm rãi và rất hợp để làm quen với cảm giác chờ tinh thể lớn lên.",
    materials: [
      {
        name: "Phèn chua",
        amount: "5-6 muỗng canh",
        note: "Dùng loại sạch, dễ hòa tan trong nước ấm.",
      },
      {
        name: "Nước ấm",
        amount: "1 cốc lớn",
        note: "Nước càng ấm càng giúp phèn chua tan nhanh hơn.",
      },
      {
        name: "Ly thủy tinh trong",
        amount: "1 chiếc",
        note: "Chọn ly cao để dễ theo dõi mầm tinh thể.",
      },
      {
        name: "Dây chỉ và que gỗ",
        amount: "1 bộ nhỏ",
        note: "Dùng để treo mầm tinh thể vào giữa ly.",
      },
    ],
    steps: [
      {
        title: "Pha dung dịch bão hòa",
        body: "Cho phèn chua vào cốc nước ấm từng ít một và khuấy đến khi gần như không tan thêm nữa.",
        tip: "Nếu đáy cốc còn một ít hạt chưa tan, dung dịch đã đủ đậm cho bước tiếp theo.",
      },
      {
        title: "Lọc và để nguội",
        body: "Rót phần nước trong sang ly mới để tránh cặn, sau đó để ly nghỉ ở nơi yên và thoáng.",
        tip: "Không lắc ly sau khi đã rót để tinh thể mọc đều hơn.",
      },
      {
        title: "Chọn mầm đẹp nhất",
        body: "Sau khoảng một đêm, chọn tinh thể nhỏ rõ cạnh nhất làm mầm và buộc vào đầu dây chỉ.",
        tip: "Mầm càng đều thì tinh thể lớn lên càng đẹp và dễ quan sát.",
      },
      {
        title: "Treo mầm vào giữa ly",
        body: "Đặt que gỗ ngang miệng ly và treo mầm sao cho không chạm đáy hay thành ly.",
        tip: "Giữ dây đủ ngắn để mầm đứng cân ở giữa dung dịch.",
      },
      {
        title: "Quan sát mỗi ngày",
        body: "Mỗi ngày nhìn hình dạng, độ trong và kích thước để thấy tinh thể đang lớn lên như thế nào.",
        tip: "Ghi lại thay đổi nhỏ nhất sẽ giúp hành trình có cảm giác rất thật.",
      },
    ],
    milestones: [
      {
        title: "Mốc 1: Mầm xuất hiện",
        detail: "Bạn đã tạo được những tinh thể đầu tiên và chọn được hạt mầm phù hợp.",
      },
      {
        title: "Mốc 2: Tinh thể đủ để trưng bày",
        detail: "Tinh thể đạt kích thước đủ rõ, cạnh sắc hơn và có thể chụp ảnh lưu nhật ký.",
      },
    ],
    safetyNotes: [
      "Không nếm dung dịch và luôn rửa tay sau khi chạm vào vật liệu.",
      "Dùng nước ấm vừa phải, có người lớn hỗ trợ nếu người học còn nhỏ.",
      "Đặt ly ở vị trí cố định để tránh đổ hoặc va chạm.",
    ],
    palette: {
      from: "from-accent-soft/75",
      to: "to-sky/45",
      accent: "bg-accent",
      tone: "aqua",
    },
  },
  {
    slug: "tao-hinh-tinh-the-sac-mau",
    title: "Tạo hình tinh thể sắc màu",
    summary:
      "Program trung cấp giúp người học thử tạo khung hình, nhuộm sắc và quan sát cách tinh thể bám theo cấu trúc sáng tạo.",
    tagline: "Biến dây kẽm mềm thành một khung nhỏ để tinh thể bám lên như món đồ thủ công khoa học.",
    coverLabel: "Sắc màu",
    coverHint: "Tạo hình · vui mắt",
    difficulty: "Tự tin hơn",
    duration: "5-7 ngày",
    goal: "Hoàn thành một cụm tinh thể có màu nhẹ bám trên khung tạo hình đơn giản.",
    recommendedFor: "Phù hợp với người đã từng làm program nhập môn và muốn thử sáng tạo hình dáng.",
    atmosphere: "Nhiều cảm giác thủ công hơn, vui mắt hơn nhưng vẫn cần kiên nhẫn và giữ nhịp quan sát.",
    materials: [
      {
        name: "Borax hoặc phèn chua",
        amount: "6-7 muỗng canh",
        note: "Chọn một loại để dung dịch ổn định và dễ theo dõi hơn.",
      },
      {
        name: "Nước nóng",
        amount: "1 cốc lớn",
        note: "Cần nóng hơn program cơ bản để chất tan tốt.",
      },
      {
        name: "Dây kẽm mềm",
        amount: "2-3 đoạn",
        note: "Dùng để uốn thành ngôi sao, trái tim hoặc giọt tinh thể.",
      },
      {
        name: "Màu thực phẩm",
        amount: "1-2 giọt",
        note: "Chỉ dùng lượng rất ít để giữ độ trong của tinh thể.",
      },
      {
        name: "Lọ thủy tinh cao",
        amount: "1 chiếc",
        note: "Nên đủ rộng để khung không chạm thành lọ.",
      },
    ],
    steps: [
      {
        title: "Uốn khung tạo hình",
        body: "Tạo một khung đơn giản bằng dây kẽm, gọn và cân để tinh thể bám đều quanh các cạnh.",
        tip: "Khung càng gọn thì càng dễ treo cân giữa lọ.",
      },
      {
        title: "Pha dung dịch và thêm màu",
        body: "Hòa tan vật liệu vào nước nóng rồi thêm một đến hai giọt màu để tạo sắc độ nhẹ.",
        tip: "Màu quá đậm có thể làm tinh thể mất cảm giác trong trẻo.",
      },
      {
        title: "Treo khung đúng vị trí",
        body: "Buộc khung bằng chỉ vào que gỗ và treo vào giữa lọ, tránh chạm thành hoặc đáy.",
        tip: "Khoảng trống đều quanh khung giúp cụm tinh thể lớn cân hơn.",
      },
      {
        title: "Giữ môi trường yên ổn",
        body: "Đặt lọ ở nơi ít rung, ít nắng trực tiếp và quan sát mỗi ngày mà không khuấy lại dung dịch.",
        tip: "Nhiệt độ thay đổi quá nhanh có thể làm mặt tinh thể bị rối.",
      },
      {
        title: "Tinh chỉnh lần cuối",
        body: "Khi lớp tinh thể đã đủ dày, nhấc khung ra nhẹ nhàng và để khô tự nhiên trước khi chụp ảnh.",
        tip: "Chạm quá nhiều vào cạnh tinh thể có thể làm lớp ngoài dễ vỡ.",
      },
    ],
    milestones: [
      {
        title: "Mốc 1: Khung bám tinh thể đều",
        detail: "Tinh thể đã bám quanh phần lớn khung, cho thấy dung dịch và vị trí treo đang phù hợp.",
      },
      {
        title: "Mốc 2: Hình khối hoàn thiện",
        detail: "Bạn đã có một món tinh thể nhỏ có phong cách riêng để lưu nhật ký hoặc chuẩn bị showcase sau này.",
      },
    ],
    safetyNotes: [
      "Chỉ dùng màu thực phẩm lượng nhỏ và tránh để dính vào mắt.",
      "Nước nóng cần được chuẩn bị cùng người lớn hỗ trợ.",
      "Không dùng vật chứa ăn uống hằng ngày cho việc lưu dung dịch sau khi thực nghiệm.",
    ],
    palette: {
      from: "from-rose/60",
      to: "to-gold/40",
      accent: "bg-rose",
      tone: "rose",
    },
  },
  {
    slug: "hanh-trinh-cum-tinh-the-nang-cao",
    title: "Hành trình cụm tinh thể nâng cao",
    summary:
      "Program nâng cao cho người đã quen quan sát tăng trưởng tinh thể và muốn thử nhiều vòng nuôi để tạo cụm rõ lớp, rõ cạnh.",
    tagline: "Kiên nhẫn hơn một chút để thấy một cụm tinh thể có cấu trúc phức tạp dần hiện ra.",
    coverLabel: "Nâng cao",
    coverHint: "Nhiều lớp · kiên nhẫn",
    difficulty: "Nâng cao",
    duration: "7-10 ngày",
    goal: "Tạo được một cụm tinh thể nhiều lớp với bề mặt rõ cạnh, có nhật ký quan sát theo từng mốc.",
    recommendedFor: "Phù hợp với người đã hoàn thành ít nhất một program cơ bản và thích theo dõi thay đổi rất chi tiết.",
    atmosphere: "Tập trung hơn, khoa học hơn và mang cảm giác như đang chăm một thí nghiệm nhỏ mỗi ngày.",
    materials: [
      {
        name: "Phèn chua tinh khiết",
        amount: "7-8 muỗng canh",
        note: "Nên dùng cùng một loại cho toàn bộ chu kỳ để kết quả ổn định.",
      },
      {
        name: "Hai lọ thủy tinh",
        amount: "2 chiếc",
        note: "Một lọ cho mầm ban đầu, một lọ cho giai đoạn nuôi tiếp.",
      },
      {
        name: "Nước ấm",
        amount: "2 cốc",
        note: "Chuẩn bị riêng cho từng giai đoạn lọc và nuôi tiếp.",
      },
      {
        name: "Nhíp nhỏ",
        amount: "1 chiếc",
        note: "Giúp chuyển mầm mà không chạm tay trực tiếp quá nhiều.",
      },
      {
        name: "Sổ quan sát hoặc nhật ký ảnh",
        amount: "1 bộ",
        note: "Ghi lại thay đổi theo ngày để so sánh kích thước và độ trong.",
      },
    ],
    steps: [
      {
        title: "Tạo lô mầm đầu tiên",
        body: "Pha dung dịch bão hòa, để yên qua đêm và tạo nhiều mầm nhỏ để có lựa chọn tốt nhất cho giai đoạn nuôi chính.",
        tip: "Chụp ảnh nhóm mầm cùng lúc sẽ giúp so sánh hình dạng dễ hơn.",
      },
      {
        title: "Chọn mầm cân đối nhất",
        body: "Dùng nhíp chọn tinh thể có cạnh rõ và đặt sang lọ mới chứa dung dịch trong hơn để tiếp tục nuôi.",
        tip: "Một mầm đẹp thường quyết định phần lớn vẻ ngoài của cụm cuối cùng.",
      },
      {
        title: "Nuôi theo chu kỳ ngắn",
        body: "Quan sát 1-2 ngày một lần, nếu thấy nhiều cặn hoặc cạnh mờ thì thay sang dung dịch mới đã pha sẵn.",
        tip: "Việc thay chu kỳ giúp cụm tinh thể sạch hơn và rõ lớp hơn.",
      },
      {
        title: "Theo dõi bề mặt và cạnh",
        body: "Ghi lại khi nào tinh thể đậm khối hơn, cạnh sắc hơn hoặc xuất hiện cụm phụ bám quanh mầm chính.",
        tip: "Những thay đổi nhỏ ở cạnh thường báo hiệu giai đoạn phát triển thú vị nhất.",
      },
      {
        title: "Hoàn tất và để khô ổn định",
        body: "Khi cụm đã đạt kích thước mong muốn, đưa ra khỏi dung dịch, thấm nhẹ phần đáy và để khô ở nơi thoáng.",
        tip: "Để yên vài giờ trước khi cầm ngắm gần sẽ giúp bề mặt ổn định hơn.",
      },
    ],
    milestones: [
      {
        title: "Mốc 1: Mầm nâng cấp thành cụm nhỏ",
        detail: "Tinh thể chính bắt đầu có lớp mới bám quanh và hình khối rõ rệt hơn ban đầu.",
      },
      {
        title: "Mốc 2: Cụm tinh thể hoàn chỉnh",
        detail: "Bạn đã hoàn thành một cụm tinh thể nâng cao đủ đẹp để kể lại câu chuyện quan sát theo từng giai đoạn.",
      },
    ],
    safetyNotes: [
      "Luôn rửa tay sau khi xử lý vật liệu và giữ dung dịch tránh xa đồ ăn thức uống.",
      "Khi dùng nhíp hoặc lọ thủy tinh, thao tác chậm và trên mặt phẳng ổn định để tránh rơi vỡ.",
      "Nếu người học còn nhỏ, nên có người lớn đồng hành xuyên suốt giai đoạn thay dung dịch.",
    ],
    palette: {
      from: "from-gold/60",
      to: "to-lavender/35",
      accent: "bg-gold",
      tone: "gold",
    },
  },
];

export function getProgramBySlug(slug: string) {
  return programs.find((program) => program.slug === slug);
}
