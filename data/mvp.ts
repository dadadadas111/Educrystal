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
  rhythmLabel: "Mỗi tối ngắm lại 5 phút là đủ giữ nhịp.",
  latestObservation: "Dung dịch đã trong hơn và mầm nhỏ bắt đầu rõ cạnh.",
  focusNote: "Chọn một mầm cân đối rồi treo đứng giữa ly.",
  milestonePlan: [
    {
      targetStep: 3,
      celebration: "Chọn được mầm đẹp nhất rồi thì chụp lại ngay nhé.",
    },
    {
      targetStep: 5,
      celebration: "Khi cụm đã đủ rõ, chỉ cần lưu một ghi chú ngắn về độ trong và kích thước.",
    },
  ],
};

export const diaryMoodOptions = ["Bình yên", "Tò mò", "Tự hào"] as const;

export const sampleDiaryEntries: DiaryEntrySeed[] = [
  {
    id: "entry-mam-1",
    createdAt: "2026-04-29T20:05:00+07:00",
    title: "Ly dung dịch đã sáng và trong hơn",
    body: "Hôm nay nước trong hơn tối qua và có vài hạt nhỏ lấp lánh ở đáy.",
    mood: "Bình yên",
  },
  {
    id: "entry-mam-2",
    createdAt: "2026-04-28T19:40:00+07:00",
    title: "Đã thấy mầm đầu tiên xuất hiện",
    body: "Những tinh thể đầu tiên còn nhỏ nhưng đã có cạnh. Ngày mai mình sẽ chọn một mầm rõ hơn.",
    mood: "Tò mò",
  },
  {
    id: "entry-mam-3",
    createdAt: "2026-04-27T19:20:00+07:00",
    title: "Bắt đầu hành trình đầu tiên",
    body: "Mình đã pha dung dịch xong và khá hồi hộp vì đây là lần đầu nuôi tinh thể.",
    mood: "Tự hào",
  },
];
