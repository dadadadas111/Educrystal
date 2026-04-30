export type JourneyMilestonePlan = {
  targetStep: number;
  celebration: string;
};

export type ActiveJourneySeed = {
  programSlug: string;
  completedStepsCount: number;
  startedAt: string;
  nextCheckInAt: string;
  streakDays: number;
  rhythmLabel: string;
  latestObservation: string;
  focusNote: string;
  milestonePlan: JourneyMilestonePlan[];
};

export type DiaryEntrySeed = {
  id: string;
  createdAt: string;
  title: string;
  body: string;
  mood: string;
};

export const activeJourneySeed: ActiveJourneySeed = {
  programSlug: "mam-phen-chua-dau-tien",
  completedStepsCount: 2,
  startedAt: "2026-04-27T19:15:00+07:00",
  nextCheckInAt: "2026-04-30T19:30:00+07:00",
  streakDays: 3,
  rhythmLabel: "Mỗi tối sau giờ học, nhìn lại 5 phút là đủ giữ nhịp rồi.",
  latestObservation: "Dung dịch đã trong hơn hôm qua và mầm nhỏ bắt đầu có cạnh rõ hơn để chọn làm mầm chính.",
  focusNote: "Ưu tiên chọn một mầm cân đối rồi treo đứng giữa ly để các cạnh lớn lên đều hơn.",
  milestonePlan: [
    {
      targetStep: 3,
      celebration: "Khi chọn được mầm đẹp nhất, hãy chụp lại ngay. Đây là khoảnh khắc hành trình bắt đầu trông thật sự sống động.",
    },
    {
      targetStep: 5,
      celebration: "Sau khi tinh thể đủ rõ để trưng bày, một ghi chú ngắn về độ trong và kích thước sẽ giúp lần sau bạn lặp lại dễ hơn nhiều.",
    },
  ],
};

export const diaryMoodOptions = ["Bình yên", "Tò mò", "Tự hào"] as const;

export const sampleDiaryEntries: DiaryEntrySeed[] = [
  {
    id: "entry-mam-1",
    createdAt: "2026-04-29T20:05:00+07:00",
    title: "Ly dung dịch đã sáng và trong hơn",
    body: "Mình để ly ở góc bàn cạnh cửa sổ nhưng không có nắng gắt. Hôm nay nhìn kỹ thì phần nước trong hơn tối qua và có vài hạt nhỏ lấp lánh ở đáy.",
    mood: "Bình yên",
  },
  {
    id: "entry-mam-2",
    createdAt: "2026-04-28T19:40:00+07:00",
    title: "Đã thấy mầm đầu tiên xuất hiện",
    body: "Những tinh thể đầu tiên còn rất nhỏ nhưng đã có cạnh. Mình muốn ngày mai chọn một mầm rõ hơn để treo vào giữa ly và chụp lại trước khi chạm tay vào.",
    mood: "Tò mò",
  },
  {
    id: "entry-mam-3",
    createdAt: "2026-04-27T19:20:00+07:00",
    title: "Bắt đầu hành trình đầu tiên",
    body: "Mình đã pha dung dịch xong và cố gắng không khuấy quá mạnh. Cảm giác khá hồi hộp vì đây là lần đầu tiên mình nuôi tinh thể theo từng bước rõ ràng như vậy.",
    mood: "Tự hào",
  },
];
