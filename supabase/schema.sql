create extension if not exists pgcrypto;

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
  accent text not null check (accent in ('sky', 'rose', 'gold')),
  materials text[] not null default '{}',
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.course_steps (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  order_index integer not null,
  title text not null,
  body text not null,
  kind text not null default 'instant' check (kind in ('instant', 'wait')),
  wait_days integer,
  wait_hint text,
  media_src text,
  media_alt text,
  created_at timestamptz not null default now(),
  unique (course_id, order_index)
);

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses (id) on delete set null,
  title text not null,
  body text not null,
  course_slug text,
  mood text not null default 'Bình yên',
  created_at timestamptz not null default now()
);

create table if not exists public.course_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  course_id uuid not null references public.courses (id) on delete cascade,
  active_step_index integer not null default 0,
  completed_steps integer[] not null default '{}',
  reminder_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, course_id)
);
