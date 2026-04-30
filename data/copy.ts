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
    tagline: "Học nuôi tinh thể theo hành trình riêng",
    demoLabel: "Bản demo đầu tiên",
  },
  home: {
    eyebrow: "Ứng dụng học tập cá nhân hóa về tinh thể",
    title: "Nuôi một tinh thể nhỏ thành hành trình lấp lánh của riêng mình.",
    description:
      "Chọn program, xem vật liệu, đi từng bước và giữ lại mọi thay đổi đẹp nhất trong một nhịp học ngắn, rõ và dịu mắt.",
    primaryCta: "Khám phá program",
    secondaryCta: "Xem cách hoạt động",
    featuredTitle: "Chọn mầm đầu tiên",
    featuredDescription: "Ba program mở màn với độ khó, thời lượng và cảm giác rất khác nhau.",
    heroBadges: ["Chọn program", "Nuôi mầm", "Lưu nhật ký"],
    processSteps: [
      {
        title: "Chọn một mầm hợp sức",
        body: "Mỗi program có nhịp học, độ khó và mục tiêu riêng để bắt đầu không bị rối.",
      },
      {
        title: "Đi theo cụm bước ngắn",
        body: "Vật liệu, thao tác và lưu ý an toàn nằm trong cùng một luồng sáng rõ.",
      },
      {
        title: "Nhìn tinh thể lớn dần",
        body: "Milestone và nhật ký riêng giúp mỗi thay đổi nhỏ trở nên rất thật.",
      },
    ],
    pillars: [
      {
        title: "Khởi đầu dễ chọn",
        body: "Thấy ngay program nào hợp nhịp học của mình.",
      },
      {
        title: "Tiến độ biết phát sáng",
        body: "Mỗi bước, mỗi mốc đều hiện rõ thay vì trôi qua mơ hồ.",
      },
      {
        title: "Ghi chép riêng tư trước",
        body: "Giữ lại quan sát của mình trước khi nghĩ đến chia sẻ.",
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
    title: "Hành trình tinh thể của mình đang tiến lên từng bước.",
    description:
      "Bước hiện tại, milestone kế tiếp và nhịp quan sát mỗi ngày đều gom vào một góc nhìn ngắn, sáng và dễ quay lại.",
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
    title: "Những ghi chép nhỏ làm tinh thể của mình trở nên rất thật.",
    description:
      "Lưu nhanh điều vừa thấy, điều vừa nghĩ và điều muốn nhớ cho lần nhìn tiếp theo.",
    privacyBadge: "Chỉ mình bạn thấy",
    privacyTitle: "Nhật ký này đang ở chế độ riêng tư trước.",
    privacyBody: "Chưa có đăng công khai, chưa cần hoàn hảo. Bạn chỉ cần ghi lại điều mình nhìn thấy để lần sau quay lại sẽ thấy hành trình đã lớn lên ra sao.",
    activeProgramLabel: "Program đang theo",
    entryCountLabel: "mục ghi",
    newEntryTitle: "Ghi nhanh hôm nay",
    newEntryDescription:
      "Vài dòng là đủ để giữ lại khoảnh khắc tinh thể vừa đổi khác.",
    titleFieldLabel: "Tiêu đề ngắn",
    titlePlaceholder: "Ví dụ: Mầm hôm nay đã sắc cạnh hơn",
    bodyFieldLabel: "Điều mình muốn lưu lại",
    bodyPlaceholder:
      "Tinh thể trông thế nào, mình thấy gì khác hôm nay, hay có điều gì muốn nhớ cho lần sau?",
    moodLabel: "Cảm giác chính",
    saveCta: "Lưu vào góc riêng",
    savedNote: "Đã lưu vào nhật ký riêng của bạn.",
    timelineTitle: "Dòng thời gian riêng",
    timelineDescription: "Mỗi mục nằm theo thứ tự gần nhất để nhìn lại hành trình chỉ trong một lượt cuộn.",
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
      title: "Khu chia sẻ là nơi những thành quả đã được chọn lọc bắt đầu phát sáng",
      body: "Bài công khai chỉ xuất hiện sau kiểm duyệt để giữ cảm giác triển lãm học tập, không phải feed mở.",
    },
  },
} as const;
