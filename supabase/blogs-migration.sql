-- Add exploring blogs feature to existing database
-- Safe to run on existing schema (won't affect other tables)

-- Create tables if not exist
create table if not exists public.exploring_blogs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  body text not null,
  cover_image text,
  source_url text,
  source_name text,
  published boolean not null default true,
  view_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_votes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  blog_id uuid not null references public.exploring_blogs (id) on delete cascade,
  vote integer not null check (vote in (1, -1)),
  created_at timestamptz not null default now(),
  unique (user_id, blog_id)
);

create index if not exists idx_blog_votes_blog_id on public.blog_votes (blog_id);
create index if not exists idx_blog_votes_user_id on public.blog_votes (user_id);

-- Triggers
drop trigger if exists set_exploring_blogs_updated_at on public.exploring_blogs;
create trigger set_exploring_blogs_updated_at
before update on public.exploring_blogs
for each row
execute function public.set_row_updated_at();

drop trigger if exists set_blog_votes_updated_at on public.blog_votes;
create trigger set_blog_votes_updated_at
before update on public.blog_votes
for each row
execute function public.set_row_updated_at();

-- RLS
alter table public.exploring_blogs enable row level security;
alter table public.blog_votes enable row level security;

drop policy if exists "exploring_blogs_public_read" on public.exploring_blogs;
create policy "exploring_blogs_public_read"
on public.exploring_blogs
for select
using (published = true or public.is_admin(auth.uid()));

drop policy if exists "exploring_blogs_admin_write" on public.exploring_blogs;
create policy "exploring_blogs_admin_write"
on public.exploring_blogs
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "blog_votes_own_rows" on public.blog_votes;
create policy "blog_votes_own_rows"
on public.blog_votes
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Function
create or replace function public.increment_blog_view(blog_id uuid)
returns void
language sql
security definer
as $$
  update public.exploring_blogs
  set view_count = view_count + 1
  where id = blog_id;
$$;

-- Seed data only if table is empty
insert into public.exploring_blogs (slug, title, body, source_url, source_name, published, view_count) 
select 'cach-nuoi-tinh-the-phen-chua', 'Cách nuôi tinh thể phèn chua đơn giản tại nhà', 'Phèn chua (Aluminum Potassium Sulfate) là một hợp chất vô cơ tuyệt vời để tạo ra những tinh thể lấp lánh. Để bắt đầu, bạn cần chuẩn bị: phèn chua, nước sôi, dây chỉ và cốc thủy tinh. Đun nóng khoảng 200ml nước, cho phèn chua vào từ từ và khuấy đều đến khi không tan được nữa. Để dung dịch nguội từ từ và đặt ở nơi yên tĩnh. Sau vài ngày, tinh thể sẽ bắt đầu hình thành dưới đáy cốc. Bạn có thể chọn một viên đẹp làm mồi và treo vào dung dịch mới để tinh thể phát triển lớn hơn.', 'https://tongkhohoachatvn.com/blogs/news/cach-nuoi-tinh-the-phen-chua', 'KDC Chemical', true, 0
where not exists (select 1 from public.exploring_blogs where slug = 'cach-nuoi-tinh-the-phen-chua');

insert into public.exploring_blogs (slug, title, body, source_url, source_name, published, view_count) 
select 'cach-nuoi-tinh-the-cuso4', 'Hướng dẫn nuôi tinh thể đồng sunfat (CuSO4) chi tiết', 'Tinh thể CuSO4 có màu xanh lam đặc trưng rất đẹp mắt. Để nuôi tinh thể đồng sunfat, bạn cần chuẩn bị: 150-200g CuSO4.5H2O, 500ml nước cất, lọ thủy tinh, dây cước. Đun nước đến khoảng 60-70°C, cho CuSO4 vào khuấy đều đến khi bão hòa. Để nguội và đặt ở nơi yên tĩnh. Sau vài ngày sẽ có các tinh thể nhỏ, chọn viên đẹp làm mồi treo vào dung dịch. Quá trình nuôi có thể mất 1-2 tuần để đạt kích thước mong muốn. Lưu ý: tránh chạm vào tinh thể bằng tay trần vì dầu da sẽ ảnh hưởng đến sự phát triển.', 'https://rdsic.edu.vn/blog/hoa/cong-dung-va-ung-dung-cach-nuoi-tinh-the-dong-sunfat', 'RD SIC Education', true, 0
where not exists (select 1 from public.exploring_blogs where slug = 'cach-nuoi-tinh-the-cuso4');

insert into public.exploring_blogs (slug, title, body, source_url, source_name, published, view_count) 
select 'cach-nuoi-tinh-the-muoi-an', 'Cách nuôi tinh thể muối ăn (NaCl) - Hướng dẫn chi tiết', 'Nuôi tinh thể muối ăn là thử thách thú vị vì muối khó kết tinh hơn các loại khác. Cần chuẩn bị dung dịch bão hòa bằng cách hòa tan muối vào nước ấm đến khi không tan thêm được. Để ở nơi thoáng mát và chờ đợi quá trình kết tinh. Có thể mất 1-2 tháng để có mầm đủ lớn. Mẹo: đặt trong ngăn mát tủ lạnh sẽ đẩy nhanh quá trình tạo mầm. Khi đã có mầm, cần rất kiên nhẫn vì mầm dễ tan ngược nếu kéo ra khỏi dung dịch. Tinh thể muối có hình khối vuông đặc trưng.', 'https://hoahocnguyenkhuyen.blogspot.com/p/huong-dan-nuoi-tinh-muoi-an.html', 'Hóa Học Nguyễn Khuyến', true, 0
where not exists (select 1 from public.exploring_blogs where slug = 'cach-nuoi-tinh-the-muoi-an');

insert into public.exploring_blogs (slug, title, body, source_url, source_name, published, view_count) 
select 'cach-nuoi-tinh-the-thach-anh-tim', 'Cách nuôi tinh thể thạch anh tím tại nhà', 'Thạch anh tím là một trong những tinh thể đẹp và có giá trị thẩm mỹ cao. Để làm, bạn cần vỏ trứng, phèn chua, keo dán và màu thực phẩm tím. Rửa sạch vỏ trứng, bôi keo vào mặt trong và rắc bột phèn chua. Phần phèn chua còn lại hòa tan với nước nóng thêm màu tím. Đặt vỏ trứng đã khô vào cốc dung dịch, để yên ở nơi yên tĩnh. Sau khoảng 1 tháng sẽ có tinh thể thạch anh tím hoàn chỉnh. Lưu ý: tinh thể rất mềm và dễ vỡ, cần xử lý cẩn thận.', 'https://www.topfarm.vn/post/tinh-th%E1%BB%83-l%C3%A0-g%C3%AC-h%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-c%C3%A1ch-nu%C3%B4i-tinh-th%E1%BB%83', 'TopFarm', true, 0
where not exists (select 1 from public.exploring_blogs where slug = 'cach-nuoi-tinh-the-thach-anh-tim');

insert into public.exploring_blogs (slug, title, body, source_url, source_name, published, view_count) 
select 'huong-dan-nuoi-tinh-the-tai-nha', 'Tổng hợp hướng dẫn nuôi tinh thể tại nhà từ A-Z', 'Nuôi tinh thể là một thú chơi khoa học thú vị, giúp hiểu biết hơn về quá trình kết tinh trong hóa học. Quy trình cơ bản: (1) Chuẩn bị dung dịch bão hòa - hòa tan chất tan vào nước nóng đến khi không tan thêm được; (2) Lọc dung dịch để loại bỏ tạp chất; (3) Để nguội từ từ ở nơi yên tĩnh; (4) Chọn mầm tinh thể đẹp và treo vào dung dịch; (5) Chờ đợi và theo dõi. Lưu ý quan trọng: tránh di chuyển dung dịch trong quá trình kết tinh, giữ nhiệt độ ổn định, tránh ánh nắng trực tiếp.', 'https://vietmychem.com/nuoi-tinh-the-tai-nha-hanh-trinh-kham-pha-su-ky-dieu-cua-khoa-hoc', 'Việt Mỹ Chem', true, 0
where not exists (select 1 from public.exploring_blogs where slug = 'huong-dan-nuoi-tinh-the-tai-nha');