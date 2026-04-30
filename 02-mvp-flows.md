# Educrystal MVP Flows

## MVP Goal
MVP cần giúp một người mới bắt đầu có thể hiểu Educrystal là gì, chọn được một program phù hợp, bắt đầu hành trình ngay, theo dõi tiến độ bằng nhật ký riêng và nhìn thấy rõ giá trị của public showcase mà không cần một social layer quá nặng.

## Primary User Journey
1. User mở app và hiểu ngay đây là nơi học nuôi tinh thể theo hành trình cá nhân hóa.
2. User đăng nhập bằng Google.
3. User khai báo ngày sinh hoặc nhóm tuổi để hệ thống gợi ý trải nghiệm phù hợp hơn.
4. User xem danh sách program nổi bật.
5. User mở trang chi tiết program.
6. User xem độ khó, thời lượng, vật liệu, các bước, milestone và lưu ý an toàn.
7. User bấm bắt đầu program.
8. User đi qua từng bước và từng mốc.
9. User tạo diary entries có ảnh, ghi chú và cảm nhận.
10. User xem timeline hoặc calendar để thấy mình đã tiến được đến đâu.
11. User có thể tạo public showcase post từ thành quả của mình.
12. Bài được gửi đi moderation.
13. Nếu được duyệt, bài xuất hiện trong public showcase feed.
14. Người khác có thể upvote hoặc downvote bài đó.

## Screen List
- Welcome / Home
- Onboarding nhẹ hoặc bước khai báo tuổi
- Program Catalog
- Program Detail
- Active Program Dashboard
- Step Detail
- Milestones / Progress View
- Private Diary
- Diary Entry Composer
- Public Showcase Feed
- Public Showcase Detail
- Submit Showcase Post
- Moderation State / Submission Status

## Screen-by-Screen Requirements

### 1. Welcome / Home
- Phải nói rõ Educrystal là gì chỉ trong vài giây đầu.
- Nên nổi bật lời hứa sản phẩm: học theo hành trình, theo dõi tiến trình, chia sẻ thành quả.
- Nên có CTA rõ: bắt đầu ngay hoặc khám phá program.

### 2. Onboarding / Age Input
- Chỉ thu thập thông tin tối thiểu.
- Mục đích là cá nhân hóa trải nghiệm học, không làm thủ tục phức tạp.
- Sau bước này, user nên thấy những gợi ý phù hợp hơn.

### 3. Program Catalog
- Hiển thị các program nổi bật và phù hợp.
- Mỗi card nên có tên, độ khó, thời lượng và một mô tả ngắn.
- User phải dễ nhìn ra program nào hợp với mình nhất để bắt đầu.

### 4. Program Detail
- Phải có mục tiêu của program.
- Phải có danh sách vật liệu.
- Phải có tổng số bước và milestone.
- Phải có ghi chú an toàn dễ nhìn.
- Phải có nút bắt đầu hành trình.

### 5. Active Program Dashboard
- Là trung tâm điều hướng trong lúc user đang theo program.
- Nên hiển thị bước hiện tại, tiến độ tổng, milestone gần nhất và shortcut sang diary.
- User phải cảm thấy mình đang “ở trong một hành trình”, không chỉ đang đọc thông tin.

### 6. Step Detail
- Mỗi step cần ngắn, rõ và dễ làm theo.
- Nếu có lưu ý an toàn, phải xuất hiện ngay trong step đó.
- Có thể có ảnh minh họa hoặc icon hỗ trợ hiểu nhanh.

### 7. Milestones / Progress View
- Cho user thấy tiến độ bằng timeline, progress bar hoặc calendar.
- User phải nhìn thấy những gì đã hoàn thành và bước tiếp theo.

### 8. Private Diary
- Đây là không gian cá nhân.
- Nên hiển thị program hiện tại, các entries gần đây và nút thêm entry mới.
- Phải cho cảm giác riêng tư, thân thiện và mang tính ghi chép hành trình.

### 9. Diary Entry Composer
- User thêm ảnh.
- User ghi lại quan sát, khó khăn, cảm xúc hoặc bài học.
- Có thể gắn entry vào một step hoặc milestone cụ thể.

### 10. Public Showcase Feed
- Chỉ hiển thị bài đã được duyệt.
- Mỗi bài nên mang cảm giác là “kết quả học tập” hoặc “bài chia sẻ kinh nghiệm tốt”, không phải post xã hội tự do.
- Chỉ có upvote/downvote, không có comment.

### 11. Public Showcase Detail
- Hiển thị rõ program liên quan.
- Hiển thị nội dung bài, ảnh và vote state.
- Nếu có video YouTube nhúng, phải cho cảm giác nó là phần tham khảo có chọn lọc.

### 12. Submit Showcase Post
- User soạn bài công khai.
- Có thể thêm ảnh.
- Có thể mô tả kết quả, kinh nghiệm và bài học mình rút ra.
- Có trạng thái gửi duyệt rõ ràng.

### 13. Moderation State / Submission Status
- User biết bài của mình đang pending, approved hay rejected.
- Nếu bị từ chối, cần có feedback đủ rõ để user chỉnh sửa.

## MVP Rules
- Diary là private-first.
- Public sharing là optional.
- Mọi bài public đều phải qua moderation.
- Public feed chỉ là curated knowledge showcase.
- Không có comment, không có messaging, không có follow.

## Edge Cases
- User bắt đầu program nhưng chưa ghi diary entry nào.
- User tạo nhiều diary entries trước khi đạt milestone đầu tiên.
- User submit showcase post nhưng bị reject.
- User đổi program giữa chừng.
- Một program có warning an toàn mạnh hơn bình thường.

## MVP Acceptance Criteria
- Một người mới có thể hiểu app dùng để làm gì trong chưa đến 1 phút.
- Một người mới có thể chọn program đầu tiên mà không bị rối.
- Program structure phải đủ rõ để user biết mình chuẩn bị gì, làm gì, xong khi nào.
- Diary flow phải cho cảm giác riêng tư và cá nhân.
- Public showcase phải cho cảm giác đã được chọn lọc, không phải feed mở.
