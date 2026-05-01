insert into public.courses (
  slug,
  title,
  summary,
  what_you_make,
  level,
  duration,
  age_band,
  cover_image,
  accent,
  tools,
  ingredients,
  published
)
values
  (
    'mam-tinh-the-trong',
    'Mầm tinh thể trong',
    'Bài đầu tiên để trẻ nhìn thấy tinh thể mọc lên thật nhanh và dễ hiểu.',
    'Một mầm tinh thể nhỏ trong veo',
    'Dễ',
    '3-5 ngày',
    '6+',
    '/covers/crystal-bloom.svg',
    'sky',
    '[{"name":"Găng tay nitrile","spec":"1 đôi, vừa tay"},{"name":"Ly thủy tinh có vạch","spec":"500 ml"},{"name":"Cân tiểu ly","spec":"Sai số <= 0.1 g"}]'::jsonb,
    '[{"name":"Phèn chua","amount":120,"unit":"g","note":"Loại tinh khiết"},{"name":"Nước lọc","amount":300,"unit":"ml","note":"70-80°C"}]'::jsonb,
    true
  ),
  (
    'khung-tinh-the-sac-mau',
    'Khung tinh thể sắc màu',
    'Trẻ uốn một khung nhỏ và xem tinh thể bám thành hình đẹp mắt.',
    'Một khung tinh thể màu nhẹ',
    'Vừa',
    '5-7 ngày',
    '8+',
    '/covers/rainbow-frame.svg',
    'rose',
    '[{"name":"Găng tay nitrile","spec":"1 đôi"},{"name":"Kìm mũi nhọn","spec":"Đầu nhỏ"},{"name":"Cân tiểu ly","spec":"Sai số <= 0.1 g"}]'::jsonb,
    '[{"name":"Borax","amount":140,"unit":"g"},{"name":"Nước nóng","amount":400,"unit":"ml"},{"name":"Màu thực phẩm","amount":2,"unit":"ml","note":"2-3 giọt"}]'::jsonb,
    true
  ),
  (
    'cum-tinh-the-lon',
    'Cụm tinh thể lớn',
    'Bài nâng cao cho trẻ muốn thấy một cụm tinh thể rõ cạnh và đẹp hơn.',
    'Một cụm tinh thể nhiều lớp',
    'Khó',
    '7-10 ngày',
    '10+',
    '/covers/cluster-lab.svg',
    'gold',
    '[{"name":"Găng tay nitrile","spec":"1 đôi"},{"name":"Ly thủy tinh có vạch","spec":"2 ly, mỗi ly 700 ml"},{"name":"Nhíp đầu mảnh","spec":"1 chiếc"}]'::jsonb,
    '[{"name":"Phèn chua tinh khiết","amount":220,"unit":"g"},{"name":"Nước lọc","amount":600,"unit":"ml"}]'::jsonb,
    true
  )
on conflict (slug) do update
set
  title = excluded.title,
  summary = excluded.summary,
  what_you_make = excluded.what_you_make,
  level = excluded.level,
  duration = excluded.duration,
  age_band = excluded.age_band,
  cover_image = excluded.cover_image,
  accent = excluded.accent,
  tools = excluded.tools,
  ingredients = excluded.ingredients,
  published = excluded.published;

with course_ids as (
  select id, slug from public.courses where slug in ('mam-tinh-the-trong', 'khung-tinh-the-sac-mau', 'cum-tinh-the-lon')
)
insert into public.course_steps (
  course_id,
  order_index,
  title,
  body,
  kind,
  notes,
  pass_criteria,
  wait_days,
  wait_hint,
  media_src,
  media_alt
)
select
  course_ids.id,
  step.order_index,
  step.title,
  step.body,
  step.kind,
  step.notes,
  step.pass_criteria,
  step.wait_days,
  step.wait_hint,
  step.media_src,
  step.media_alt
from course_ids
join (
  values
    ('mam-tinh-the-trong', 1, 'Chuẩn bị dụng cụ và nguyên liệu', 'Đeo găng tay, cân đúng định lượng và kiểm tra dụng cụ.', 'prepare', array['Không dùng cốc nhựa mỏng', 'Bắt buộc cân phèn chua'], 'Checklist hoàn tất và định lượng đủ.', null, null, '/covers/crystal-bloom.svg', 'Chuẩn bị dụng cụ'),
    ('mam-tinh-the-trong', 2, 'Pha dung dịch bão hòa', 'Cho phèn chua vào nước ấm theo 3 lần.', 'instant', array['Không khuấy quá mạnh'], 'Dung dịch trong, không còn hạt lớn.', null, null, '/covers/crystal-bloom.svg', 'Pha dung dịch'),
    ('mam-tinh-the-trong', 3, 'Để yên tạo mầm', 'Đặt ly ở nơi phẳng và tránh rung.', 'wait', array['Không di chuyển ly 12 giờ đầu'], 'Có mầm nhỏ xuất hiện.', 2, 'Sau 48 giờ kiểm tra mầm.', '/covers/crystal-bloom.svg', 'Để yên tạo mầm'),
    ('khung-tinh-the-sac-mau', 1, 'Chuẩn bị dụng cụ và nguyên liệu', 'Đặt kìm, găng tay, cân và cân đủ borax.', 'prepare', array['Chuẩn bị khăn giấy dự phòng'], 'Checklist hoàn tất và định lượng đủ.', null, null, '/covers/rainbow-frame.svg', 'Chuẩn bị khung màu'),
    ('khung-tinh-the-sac-mau', 2, 'Uốn khung ổn định', 'Uốn dây kẽm thành khung kín.', 'instant', array['Mối nối xoắn ít nhất 2 vòng'], 'Khung đứng thẳng khi treo thử.', null, null, '/covers/rainbow-frame.svg', 'Uốn khung'),
    ('khung-tinh-the-sac-mau', 3, 'Treo khung và chờ bám', 'Treo khung giữa lọ và giữ khoảng cách đều.', 'wait', array['Nếu chạm thành sẽ bám lệch'], 'Tinh thể phủ tối thiểu 60% khung.', 2, 'Sau 2 ngày kiểm tra độ phủ.', '/covers/rainbow-frame.svg', 'Treo khung'),
    ('cum-tinh-the-lon', 1, 'Chuẩn bị dụng cụ và nguyên liệu', 'Thiết lập 2 ly riêng cho từng giai đoạn.', 'prepare', array['Đánh dấu ly A/B'], 'Bàn thí nghiệm hoàn chỉnh.', null, null, '/covers/cluster-lab.svg', 'Chuẩn bị cụm nâng cao'),
    ('cum-tinh-the-lon', 2, 'Tạo mẻ mầm ban đầu', 'Pha mẻ dung dịch đầu và để tạo mầm.', 'wait', array['Không khuấy lại trong khi chờ'], 'Có ít nhất 5 mầm để chọn.', 1, 'Ngày mai chọn mầm.', '/covers/cluster-lab.svg', 'Tạo mầm ban đầu')
) as step(slug, order_index, title, body, kind, notes, pass_criteria, wait_days, wait_hint, media_src, media_alt)
on step.slug = course_ids.slug
on conflict (course_id, order_index) do update
set
  title = excluded.title,
  body = excluded.body,
  kind = excluded.kind,
  notes = excluded.notes,
  pass_criteria = excluded.pass_criteria,
  wait_days = excluded.wait_days,
  wait_hint = excluded.wait_hint,
  media_src = excluded.media_src,
  media_alt = excluded.media_alt;
