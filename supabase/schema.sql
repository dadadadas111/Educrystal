create extension if not exists pgcrypto;

create or replace function public.set_row_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  age_band text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  what_you_make text not null,
  age_band text not null,
  level text not null check (level in ('Dễ', 'Vừa', 'Khó')),
  duration text not null,
  cover_image text not null,
  youtube_url text,
  accent text not null check (accent in ('sky', 'rose', 'gold')),
  tools jsonb not null default '[]'::jsonb,
  ingredients jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_steps (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  order_index integer not null,
  title text not null,
  body text not null,
  kind text not null default 'instant' check (kind in ('prepare', 'instant', 'wait')),
  notes text[] not null default '{}',
  pass_criteria text not null default '',
  wait_days integer,
  wait_hint text,
  media_src text,
  media_alt text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (course_id, order_index)
);

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id uuid references public.courses (id) on delete set null,
  title text not null,
  body text not null,
  course_slug text,
  mood text not null default 'Bình yên',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  active_step_index integer not null default 0,
  completed_steps integer[] not null default '{}',
  updated_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create table if not exists public.course_reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  step_index integer not null,
  reminder_at timestamptz not null,
  note text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, course_id, step_index)
);

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
  updated_at timestamptz not null default now(),
  unique (user_id, blog_id)
);

create index if not exists idx_blog_votes_blog_id on public.blog_votes (blog_id);
create index if not exists idx_blog_votes_user_id on public.blog_votes (user_id);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_row_updated_at();

drop trigger if exists set_courses_updated_at on public.courses;
create trigger set_courses_updated_at
before update on public.courses
for each row
execute function public.set_row_updated_at();

drop trigger if exists set_course_steps_updated_at on public.course_steps;
create trigger set_course_steps_updated_at
before update on public.course_steps
for each row
execute function public.set_row_updated_at();

drop trigger if exists set_journal_entries_updated_at on public.journal_entries;
create trigger set_journal_entries_updated_at
before update on public.journal_entries
for each row
execute function public.set_row_updated_at();

drop trigger if exists set_course_progress_updated_at on public.course_progress;
create trigger set_course_progress_updated_at
before update on public.course_progress
for each row
execute function public.set_row_updated_at();

drop trigger if exists set_course_reminders_updated_at on public.course_reminders;
create trigger set_course_reminders_updated_at
before update on public.course_reminders
for each row
execute function public.set_row_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do update
  set
    email = excluded.email,
    display_name = coalesce(excluded.display_name, public.profiles.display_name),
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

create or replace function public.is_admin(check_user_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = check_user_id
      and is_admin = true
  );
$$;

create or replace function public.increment_blog_view(blog_id uuid)
returns void
language sql
security definer
as $$
  update public.exploring_blogs
  set view_count = view_count + 1
  where id = blog_id;
$$;

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

alter table public.exploring_blogs enable row level security;
alter table public.blog_votes enable row level security;
alter table public.courses enable row level security;
alter table public.course_steps enable row level security;
alter table public.journal_entries enable row level security;
alter table public.course_progress enable row level security;
alter table public.course_reminders enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles
for select
using (auth.uid() = id or public.is_admin(auth.uid()));

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
with check (auth.uid() = id);

drop policy if exists "courses_public_read" on public.courses;
create policy "courses_public_read"
on public.courses
for select
using (published = true or public.is_admin(auth.uid()));

drop policy if exists "courses_admin_write" on public.courses;
create policy "courses_admin_write"
on public.courses
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "course_steps_public_read" on public.course_steps;
create policy "course_steps_public_read"
on public.course_steps
for select
using (
  exists (
    select 1
    from public.courses
    where public.courses.id = public.course_steps.course_id
      and (public.courses.published = true or public.is_admin(auth.uid()))
  )
);

drop policy if exists "course_steps_admin_write" on public.course_steps;
create policy "course_steps_admin_write"
on public.course_steps
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "journal_entries_own_rows" on public.journal_entries;
create policy "journal_entries_own_rows"
on public.journal_entries
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "course_progress_own_rows" on public.course_progress;
create policy "course_progress_own_rows"
on public.course_progress
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "course_reminders_own_rows" on public.course_reminders;
create policy "course_reminders_own_rows"
on public.course_reminders
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Exploring blogs: public read when published, admin full
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

-- Blog votes: own rows only
drop policy if exists "blog_votes_own_rows" on public.blog_votes;
create policy "blog_votes_own_rows"
on public.blog_votes
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('course-meta', 'course-meta', true)
on conflict (id) do update
set public = excluded.public;

drop policy if exists "course_meta_public_read" on storage.objects;
create policy "course_meta_public_read"
on storage.objects
for select
using (bucket_id = 'course-meta');

drop policy if exists "course_meta_admin_write" on storage.objects;
create policy "course_meta_admin_write"
on storage.objects
for all
using (bucket_id = 'course-meta' and public.is_admin(auth.uid()))
with check (bucket_id = 'course-meta' and public.is_admin(auth.uid()));
