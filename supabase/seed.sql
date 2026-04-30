insert into public.courses (slug, title, summary, what_you_make, level, duration, age_band, cover_image, accent, materials, published)
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
    array['Phèn chua', 'Nước ấm', 'Ly thủy tinh', 'Que treo'],
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
    array['Borax', 'Dây kẽm mềm', 'Màu thực phẩm', 'Lọ cao'],
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
    array['Phèn chua tinh khiết', 'Hai lọ', 'Nhíp', 'Sổ ghi chép'],
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
  materials = excluded.materials,
  published = excluded.published;

with course_ids as (
  select id, slug from public.courses where slug in (
    'mam-tinh-the-trong',
    'khung-tinh-the-sac-mau',
    'cum-tinh-the-lon'
  )
)
insert into public.course_steps (course_id, order_index, title, body)
select course_ids.id, step.order_index, step.title, step.body
from course_ids
join (values
  ('mam-tinh-the-trong', 1, 'Pha nước', 'Cho bột vào nước ấm và khuấy nhẹ cho tan.', 'instant', null, null, '/covers/crystal-bloom.svg', 'Ly tinh thể đang được pha'),
  ('mam-tinh-the-trong', 2, 'Để yên', 'Đổ vào ly, đặt chỗ yên tĩnh, chờ tinh thể xuất hiện.', 'wait', 2, 'Để yên 2 ngày rồi xem tiếp.', '/covers/crystal-bloom.svg', 'Ly tinh thể đang chờ mọc'),
  ('mam-tinh-the-trong', 3, 'Chọn mầm', 'Lấy một hạt đẹp nhất để nuôi tiếp.', 'instant', null, null, '/covers/crystal-bloom.svg', 'Hạt mầm tinh thể'),
  ('mam-tinh-the-trong', 4, 'Treo mầm', 'Treo ở giữa ly để tinh thể lớn đều hơn.', 'wait', 1, 'Ngày mai xem lại nhé.', '/covers/crystal-bloom.svg', 'Mầm tinh thể treo giữa ly'),
  ('khung-tinh-the-sac-mau', 1, 'Uốn khung', 'Tạo hình ngôi sao hoặc trái tim bằng dây kẽm.', 'instant', null, null, '/covers/rainbow-frame.svg', 'Khung tinh thể đang uốn'),
  ('khung-tinh-the-sac-mau', 2, 'Pha màu', 'Thêm một ít màu để tinh thể có sắc nhẹ.', 'instant', null, null, '/covers/rainbow-frame.svg', 'Dung dịch có màu nhẹ'),
  ('khung-tinh-the-sac-mau', 3, 'Treo khung', 'Giữ khung ở giữa lọ, không chạm thành lọ.', 'wait', 2, 'Chờ 2 ngày để lớp tinh thể bám đều.', '/covers/rainbow-frame.svg', 'Khung được treo trong lọ'),
  ('khung-tinh-the-sac-mau', 4, 'Chờ lớn', 'Để yên vài ngày cho tinh thể bám đều quanh khung.', 'wait', 3, 'Xem lại vào cuối tuần.', '/covers/rainbow-frame.svg', 'Khung tinh thể sau vài ngày'),
  ('cum-tinh-the-lon', 1, 'Tạo mầm', 'Làm ra nhiều hạt nhỏ để chọn hạt đẹp nhất.', 'instant', null, null, '/covers/cluster-lab.svg', 'Nhóm mầm tinh thể'),
  ('cum-tinh-the-lon', 2, 'Chọn hạt đẹp', 'Chuyển hạt tốt nhất sang lọ mới.', 'instant', null, null, '/covers/cluster-lab.svg', 'Chọn mầm tinh thể'),
  ('cum-tinh-the-lon', 3, 'Nuôi tiếp', 'Thay dung dịch khi thấy nước đục hoặc cặn.', 'wait', 2, 'Theo dõi 2 ngày rồi đổi dung dịch nếu cần.', '/covers/cluster-lab.svg', 'Cụm tinh thể đang lớn'),
  ('cum-tinh-the-lon', 4, 'Hoàn thiện', 'Để khô tự nhiên và ghi lại kết quả.', 'wait', 3, 'Chờ khô hẳn trước khi chạm vào.', '/covers/cluster-lab.svg', 'Cụm tinh thể hoàn thiện')
) as step(slug, order_index, title, body, kind, wait_days, wait_hint, media_src, media_alt)
on step.slug = course_ids.slug
on conflict (course_id, order_index) do update
set title = excluded.title,
    body = excluded.body,
    kind = excluded.kind,
    wait_days = excluded.wait_days,
    wait_hint = excluded.wait_hint,
    media_src = excluded.media_src,
    media_alt = excluded.media_alt;
