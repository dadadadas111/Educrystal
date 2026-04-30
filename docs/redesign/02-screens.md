# Danh sách màn hình & chi tiết nội dung

1) Home (Màn hình chính - mobile-first)
- Mục tiêu: đưa trẻ vào hành trình nhanh nhất.
- Layout: lớn, ít chữ.
  - Top: logo + short tagline (1 từ hoặc 2) + demo badge (nếu cần).
  - Hero: một "Starter Program" lớn với ảnh/illustration, tiêu đề 2 từ, 1 dòng goal ngắn (6-8 chữ), nút lớn `Bắt đầu`.
  - Shortcut strips (3 icon lớn): "Làm", "Nhật ký", "Khoá học" (mỗi icon mở màn hình tương ứng).
  - Footer: bottom navigation (Home, Catalog, Journal, Journey, More).
- Tương tác: swipe ngang để đổi program nổi bật; CTA rõ ràng.

2) Catalog (Danh sách khóa)
- Grid 1-column (mobile) / 2-col tablet.
- Each card: cover hình lớn, title 1-3 từ, difficulty badge, duration badge, "Xem" nút nhỏ.
- Filter: chỉ 1 control — `Độ khó` (All / Dễ / Trung bình / Khó) dưới dạng pill.

3) Program Detail (Trang khóa học)
- Header: big cover + color tone.
- Short meta row: duration + steps count + recommended age.
- "Start / Tiếp tục" button sticky bottom.
- Progress preview: big circular % (big, playful).
- Steps list collapsed: show first step expanded, others show pill with step number.
- Each step links to Step View.

4) Step View (Một bước một màn)
- Mục tiêu: chỉ 1 hành động/1 thông tin.
- Layout: Illustration lớn trên, tiêu đề step (1 dòng), body very short (1-2 câu), tip as small banner, action button `Hoàn tất` hoặc `Tiếp`.
- Optional: small timer or reminder, safety note icon.

5) Journal (Nhật ký)
- Quick-add entry: 1 tap to add photo + 1 dòng mô tả ngắn (autocomplete suggestions).
- Timeline with days: big thumbnails, tap để xem chi tiết.
- Sync toggle to connect program progress.

6) Journey / Progress
- Timeline gamified: milestones as badges, simple XP bar, encourage sharing.

7) Settings / Connect
- Calendar sync: descriptive toggles, explain briefly what it does for kids (in parent mode show details).

8) Empty states & onboarding
- Short microcopy + friendly illustrations + CTA to "Bắt đầu".

Notes về tương tác:
- Hầu hết màn có 1 primary CTA lớn.
- Secondary actions ẩn ở menu hoặc trong More.
- Không hiển thị nhiều nút, giảm cognitive load.

Wireframes (text-based) — ví dụ Step View:
- [Illustration]
- "Pha dung dịch" (title)
- "Đổ 3 muỗng phèn chua vào nước ấm. Khuấy nhẹ." (1 câu)
- Tip: "Để qua đêm. Đừng lắc." (small)
- Button: [Xong] (big)
