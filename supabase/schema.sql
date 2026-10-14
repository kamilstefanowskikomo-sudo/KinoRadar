-- KinoRadar initial database schema (PostgreSQL / Supabase)
-- Review access policies before production use.
create table if not exists public.movies (
  id bigint generated always as identity primary key,
  source_key text,
  title text not null,
  original_title text,
  description text,
  duration_minutes integer,
  poster_url text,
  metadata_source text,
  updated_at timestamptz not null default now()
);
create table if not exists public.cinemas (
  id bigint generated always as identity primary key,
  source_key text not null unique,
  network text not null,
  name text not null,
  city text not null,
  address text,
  official_url text,
  updated_at timestamptz not null default now()
);
create table if not exists public.showtimes (
  id bigint generated always as identity primary key,
  source_key text not null,
  movie_id bigint not null references public.movies(id) on delete cascade,
  cinema_id bigint not null references public.cinemas(id) on delete cascade,
  starts_at timestamptz not null,
  format text,
  language text,
  booking_url text,
  source_checked_at timestamptz,
  created_at timestamptz not null default now(),
  unique(source_key, cinema_id, starts_at)
);
create index if not exists showtimes_starts_at_idx on public.showtimes(starts_at);
create index if not exists showtimes_movie_id_idx on public.showtimes(movie_id);
create index if not exists cinemas_city_idx on public.cinemas(city);
create table if not exists public.sync_logs (
  id bigint generated always as identity primary key,
  source_name text not null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  status text not null default 'running',
  records_received integer not null default 0,
  error_summary text
);
-- Production: configure Row Level Security; never expose API secrets in frontend variables.