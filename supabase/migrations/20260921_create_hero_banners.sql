-- Home page hero banner images, managed from the admin dashboard.
create table if not exists public.hero_banners (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  image_path   text not null unique,       -- object path inside the storage bucket
  image_url    text not null,              -- public URL of that object
  alt_text     text not null default '' check (char_length(alt_text) <= 200),
  sort_order   integer not null default 0,
  is_active    boolean not null default true
);

create index if not exists hero_banners_order_idx on public.hero_banners (sort_order);

-- RLS on, no policies: only the server (service role) reads/writes.
alter table public.hero_banners enable row level security;

-- Public bucket: images are served by URL; uploads go through signed URLs issued to admins.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('banners', 'banners', true, 5242880, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update
  set public = true, file_size_limit = 5242880,
      allowed_mime_types = array['image/jpeg','image/png','image/webp','image/avif'];
