-- ─── Saath V1 Schema ─────────────────────────────────────────────────────────
-- Run this in your Supabase SQL editor when you're ready to migrate
-- from localStorage to a real backend.

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─── Users / Profiles ────────────────────────────────────────────────────────
create table if not exists profiles (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  partner_name  text not null,
  wedding_date  date,
  location      text,
  guest_count   integer,
  budget_range  text,
  vibes         text[],
  created_at    timestamptz default now()
);

-- ─── Polls ───────────────────────────────────────────────────────────────────
create table if not exists polls (
  id           uuid primary key default gen_random_uuid(),
  author_id    uuid references profiles(id) on delete cascade,
  author_name  text not null,
  question     text not null,
  options      jsonb not null,   -- [{label, imageUrl}]
  tags         text[],
  created_at   timestamptz default now()
);

-- ─── Votes ───────────────────────────────────────────────────────────────────
create table if not exists votes (
  id            uuid primary key default gen_random_uuid(),
  poll_id       uuid references polls(id) on delete cascade,
  user_id       uuid references profiles(id) on delete cascade,
  option_index  integer not null,
  created_at    timestamptz default now(),
  unique (poll_id, user_id)   -- one vote per user per poll
);

-- ─── Comments ────────────────────────────────────────────────────────────────
create table if not exists comments (
  id           uuid primary key default gen_random_uuid(),
  poll_id      uuid references polls(id) on delete cascade,
  author_id    uuid references profiles(id) on delete cascade,
  author_name  text not null,
  text         text not null,
  created_at   timestamptz default now()
);

-- ─── Vendors ─────────────────────────────────────────────────────────────────
create table if not exists vendors (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  category      text not null,
  location      text,
  price_range   text,
  rating        numeric(3,1),
  review_count  integer default 0,
  description   text,
  image_url     text,
  tags          text[],
  available     boolean default true,
  created_at    timestamptz default now()
);

-- ─── Useful views ─────────────────────────────────────────────────────────────

-- Poll vote counts (materialised-friendly)
create or replace view poll_vote_counts as
  select poll_id, option_index, count(*) as votes
  from votes
  group by poll_id, option_index;

-- ─── RLS Policies (basic) ─────────────────────────────────────────────────────
alter table profiles enable row level security;
alter table polls    enable row level security;
alter table votes    enable row level security;
alter table comments enable row level security;

-- Allow read-all, write-own pattern (expand as needed)
create policy "Public read profiles"  on profiles for select using (true);
create policy "Public read polls"     on polls    for select using (true);
create policy "Public read votes"     on votes    for select using (true);
create policy "Public read comments"  on comments for select using (true);
create policy "Public read vendors"   on vendors  for select using (true);
