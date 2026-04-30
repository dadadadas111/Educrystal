export const locale = "vi" as const;

export const navItems = [
  { href: "/journey", label: "Hành trình" },
  { href: "/catalog", label: "Chương trình" },
  { href: "/diary", label: "Nhật ký" },
  { href: "/showcase", label: "Chia sẻ" },
] as const;

export const appCopy = {
  brand: {
    name: "Educrystal",
    tagline: "Góc nuôi tinh thể vui và đầy màu sắc",
    demoLabel: "Bản MVP vui nhộn",
  },
  home: {
    eyebrow: "Bạn nhỏ mê tinh thể ơi",
    title: "Nuôi tinh thể như chơi một chuyến phiêu lưu nhỏ.",
    description:
      "Chọn program, làm từng bước ngắn và giữ lại mọi khoảnh khắc lấp lánh của riêng mình.",
    primaryCta: "Khám phá program",
    secondaryCta: "Cách chơi ra sao",
    featuredTitle: "Chọn mầm đầu tiên",
    featuredDescription: "Ba program mở màn, mỗi program là một kiểu khám phá khác nhau.",
    heroBadges: ["Chọn bài", "Làm từng bước", "Ghi nhật ký"],
    processSteps: [
      {
        title: "Chọn đúng program",
        body: "Nhìn một lượt là biết mầm nào hợp sức mình nhất.",
      },
      {
        title: "Theo từng bước ngắn",
        body: "Vật liệu, thao tác và lưu ý quan trọng nằm gọn trong một luồng xem.",
      },
      {
        title: "Xem tinh thể lớn dần",
        body: "Mỗi đổi khác nhỏ đều có mốc vui và chỗ để lưu lại ngay.",
      },
    ],
    pillars: [
      {
        title: "Dễ bắt đầu",
        body: "Thấy ngay program nào hợp sức của mình.",
      },
      {
        title: "Tiến độ vui mắt",
        body: "Mỗi bước và mỗi mốc đều rõ ràng, không bị rối chữ.",
      },
      {
        title: "Nhật ký riêng tư",
        body: "Lưu quan sát của mình trước khi nghĩ đến chia sẻ.",
      },
    ],
  },
  catalog: {
    title: "Danh mục program",
    description: "Mỗi program là một kiểu nuôi tinh thể khác nhau: nhanh, sáng tạo hoặc bền bỉ hơn.",
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
    title: "Tinh thể của mình đang lớn lên từng bước thật vui.",
    description:
      "Xem ngay bước đang làm, mốc sắp chạm và lúc nên quay lại ngắm tiếp.",
    progressLabel: "Tiến độ hiện tại",
    stepCountLabel: "bước đã vững",
    streakLabel: "Nhịp theo dõi",
    nextCheckInLabel: "Lần xem tiếp",
    latestObservationLabel: "Ghi nhận mới nhất",
    focusTitle: "Việc vui ngay lúc này",
    nextActionLabel: "Bước tiếp theo",
    stepListTitle: "Luồng bước của program",
    stepListDescription: "Lướt một lượt là biết mình đang ở đâu.",
    milestoneTitle: "Cột mốc trên đường đi",
    milestoneDescription: "Mỗi mốc là một dịp reo lên vì tinh thể vừa đổi khác.",
    primaryCta: "Đánh dấu bước này đã xong",
    openDiaryCta: "Mở nhật ký riêng",
    detailCta: "Xem lại toàn bộ program",
    nextProgramCta: "Xem các program khác",
    doneStateLabel: "Đã hoàn thành",
    activeStateLabel: "Đang theo",
    finishedTitle: "Program này đã hoàn thành rồi nhé.",
    finishedBody: "Giờ là lúc lưu điều đáng nhớ nhất vào nhật ký riêng hoặc chọn thêm một hành trình mới.",
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
    title: "Những ghi chép nhỏ làm tinh thể của mình trở nên thật sống động.",
    description:
      "Ghi nhanh điều vừa thấy để lần ngắm tiếp theo còn vui hơn nữa.",
    privacyBadge: "Chỉ mình bạn thấy",
    privacyTitle: "Nhật ký này là góc riêng của bạn.",
    privacyBody: "Chưa cần đăng công khai, chưa cần hoàn hảo. Chỉ cần ghi lại điều mình vừa quan sát được thôi.",
    activeProgramLabel: "Program đang theo",
    entryCountLabel: "mục ghi",
    newEntryTitle: "Ghi nhanh hôm nay",
    newEntryDescription: "Một tiêu đề, vài dòng và một mood là đủ rồi.",
    titleFieldLabel: "Tiêu đề ngắn",
    titlePlaceholder: "Ví dụ: Mầm hôm nay đã sắc cạnh hơn",
    bodyFieldLabel: "Điều mình muốn lưu lại",
    bodyPlaceholder:
      "Tinh thể trông thế nào, mình thấy gì khác hôm nay, hay có điều gì muốn nhớ cho lần sau?",
    moodLabel: "Cảm giác chính",
    saveCta: "Lưu vào góc riêng",
    savedNote: "Đã lưu vào nhật ký riêng của bạn.",
    timelineTitle: "Dòng thời gian riêng",
    timelineDescription: "Cuộn xuống là thấy hành trình sáng dần lên.",
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
      title: "Khu chia sẻ sẽ là nơi thành quả đã được chọn lọc bắt đầu tỏa sáng",
      body: "Bài công khai chỉ xuất hiện sau kiểm duyệt để giữ cảm giác triển lãm học tập, không phải feed mở.",
    },
  },
} as const;
