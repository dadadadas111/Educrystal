# Tổng quan redesign — Educrystal

Mục tiêu:
- Chuyển UI hiện tại thành giao diện thân thiện với trẻ em: vui tươi, ít chữ, dễ tương tác trên mobile.
- Giữ nội dung học tập (programs) nguyên vẹn nhưng trình bày theo bước "một bước một màn".
- Tối giản lựa chọn, tập trung vào hành trình: bắt đầu → làm bước → ghi nhật ký.

Đối tượng:
- Học sinh, trẻ em (6–15 tuổi) và người lớn chăm sóc.

Hạn chế & giả định:
- Phase 1 sẽ là web responsive (mobile-first) — không phải native app.
- Có sẵn dữ liệu chương trình ở `data/programs.ts`.
- Giữ tương tác offline nhẹ, sync chỉ khi user cho phép (Calendar, cloud) — kỹ tích hợp sau.

Thước đo thành công:
- Giảm mật độ chữ trên màn hình chính ≥ 50%.
- Tăng tỉ lệ hoàn thành bước đầu tiên (Start) trong 1 phiên.
- Trẻ có thể hoàn thành 1 step mà không cần người lớn (với chú thích an toàn).

Kết quả đầu ra của redesign này:
- Bộ tài liệu: danh sách màn hình, wireframes text-based, component library, hướng dẫn copy cho trẻ, style tokens, lộ trình migration.
- Một bộ mẫu component (prototype) để developer triển khai.
