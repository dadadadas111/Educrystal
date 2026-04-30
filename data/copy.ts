export const locale = "vi" as const;

export const navItems = [
  { href: "/journey", label: "Hành trình" },
  { href: "/catalog", label: "Program" },
  { href: "/diary", label: "Nhật ký" },
  { href: "/showcase", label: "Chia sẻ" },
] as const;

export const appCopy = {
  brand: {
    name: "Educrystal",
    tagline: "Học nuôi tinh thể theo hành trình riêng",
    demoLabel: "Bản demo đầu tiên",
  },
  home: {
    eyebrow: "Ứng dụng học tập cá nhân hóa về tinh thể",
    title: "Mỗi tinh thể lớn lên theo một hành trình rõ ràng và an toàn.",
    description:
      "Educrystal giúp người mới bắt đầu chọn đúng program, chuẩn bị vật liệu, đi qua từng bước và nhìn thấy tiến độ của mình một cách ấm áp, dễ hiểu.",
    primaryCta: "Khám phá program",
    secondaryCta: "Xem cách hoạt động",
    featuredTitle: "3 program mở đầu cho hành trình đầu tiên",
    featuredDescription:
      "Mỗi program là một mini-course nhỏ với độ khó, thời lượng, milestone và lưu ý an toàn riêng.",
    pillars: [
      {
        title: "Bắt đầu có định hướng",
        body: "Hiểu ngay nên chọn program nào thay vì tự đoán và làm rời rạc.",
      },
      {
        title: "Theo dõi tiến độ thật",
        body: "Mỗi bước và milestone đều được viết ngắn gọn để người học thấy mình đang đi tới đâu.",
      },
      {
        title: "Nhật ký riêng tư trước",
        body: "Khi đã sẵn sàng, thành quả mới có thể được đưa sang khu showcase đã kiểm duyệt.",
      },
    ],
  },
  catalog: {
    title: "Danh mục program",
    description:
      "Chọn một hành trình phù hợp với thời gian, độ khó và phong cách khám phá của bạn.",
  },
  detail: {
    materials: "Vật liệu cần chuẩn bị",
    steps: "Các bước thực hiện",
    milestones: "Cột mốc hành trình",
    safety: "Lưu ý an toàn",
    goal: "Mục tiêu hoàn thành",
    start: "Bắt đầu hành trình",
    back: "Quay về catalog",
  },
  journey: {
    eyebrow: "Program đang theo",
    title: "Hành trình tinh thể của mình đang tiến lên từng bước.",
    description:
      "Từ bước đang làm tới milestone tiếp theo, mọi thứ được gom về một bảng điều khiển nhỏ, sáng rõ và dễ quay lại mỗi ngày.",
    progressLabel: "Tiến độ hiện tại",
    stepCountLabel: "bước đã vững",
    streakLabel: "Nhịp theo dõi",
    nextCheckInLabel: "Lần xem tiếp",
    latestObservationLabel: "Ghi nhận mới nhất",
    focusTitle: "Tiêu điểm ngay lúc này",
    nextActionLabel: "Việc nhỏ tiếp theo",
    stepListTitle: "Luồng bước của program",
    stepListDescription: "Mỗi bước đều rõ trạng thái để bạn luôn biết mình đã đi tới đâu.",
    milestoneTitle: "Cột mốc trên đường đi",
    milestoneDescription: "Milestone không phải để vội. Nó chỉ nhắc bạn rằng từng thay đổi nhỏ đều đáng nhìn lại.",
    primaryCta: "Đánh dấu bước này đã xong",
    openDiaryCta: "Mở nhật ký riêng",
    detailCta: "Xem lại toàn bộ program",
    nextProgramCta: "Xem các program khác",
    doneStateLabel: "Đã hoàn thành",
    activeStateLabel: "Đang theo",
    finishedTitle: "Program này đã hoàn thành trọn vẹn.",
    finishedBody: "Giờ là lúc lưu lại điều đáng nhớ nhất trong nhật ký riêng hoặc chọn thêm một hành trình mới.",
    milestoneStates: {
      done: "Đã chạm",
      current: "Đang tới gần",
      upcoming: "Tiếp theo",
    },
    stepStates: {
      done: "Đã xong",
      current: "Đang làm",
      upcoming: "Sắp tới",
    },
  },
  diary: {
    eyebrow: "Nhật ký riêng",
    title: "Những ghi chép nhỏ giúp hành trình trở nên rất thật.",
    description:
      "Mọi quan sát và cảm xúc đầu tiên nên được giữ ở góc riêng của mình trước khi nghĩ tới chia sẻ.",
    privacyBadge: "Chỉ mình bạn thấy",
    privacyTitle: "Nhật ký này đang ở chế độ riêng tư trước.",
    privacyBody: "Chưa có đăng công khai, chưa cần hoàn hảo. Bạn chỉ cần ghi lại điều mình nhìn thấy để lần sau quay lại sẽ thấy hành trình đã lớn lên ra sao.",
    activeProgramLabel: "Program đang theo",
    entryCountLabel: "mục ghi",
    newEntryTitle: "Ghi nhanh hôm nay",
    newEntryDescription:
      "Chỉ cần vài dòng về điều mình nhìn thấy, điều mình cảm thấy hoặc điều mình muốn nhớ cho lần xem tiếp theo.",
    titleFieldLabel: "Tiêu đề ngắn",
    titlePlaceholder: "Ví dụ: Mầm hôm nay đã sắc cạnh hơn",
    bodyFieldLabel: "Điều mình muốn lưu lại",
    bodyPlaceholder:
      "Tinh thể trông thế nào, mình thấy gì khác hôm nay, hay có điều gì muốn nhớ cho lần sau?",
    moodLabel: "Cảm giác chính",
    saveCta: "Lưu vào góc riêng",
    savedNote: "Đã lưu vào nhật ký riêng của bạn.",
    timelineTitle: "Dòng thời gian riêng",
    timelineDescription: "Mỗi mục được giữ theo thứ tự gần nhất để bạn dễ nhìn lại tiến trình của chính mình.",
    fallbackEntryTitle: "Ghi nhanh hôm nay",
  },
  futureSections: {
    journey: {
      title: "Hành trình sẽ bắt đầu từ program đầu tiên của bạn",
      body: "Khi người học chọn bắt đầu một program, đây sẽ là nơi hiển thị bước hiện tại, tiến độ tổng và milestone tiếp theo.",
    },
    diary: {
      title: "Nhật ký là góc ghi chép riêng của mỗi người học",
      body: "Nhật ký riêng sẽ lưu ảnh, quan sát và cảm xúc theo từng mốc mà không biến thành một feed xã hội.",
    },
    showcase: {
      title: "Khu chia sẻ là nơi lưu lại những thành quả đã được chọn lọc",
      body: "Bài công khai chỉ xuất hiện sau kiểm duyệt để giữ cảm giác tham khảo học tập thay vì mạng xã hội mở.",
    },
  },
} as const;
