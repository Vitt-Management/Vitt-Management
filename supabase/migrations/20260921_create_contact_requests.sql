-- Leads submitted from the website contact form (viewed later in the admin dashboard).
create table if not exists public.contact_requests (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 200),
  email       text not null check (char_length(email) between 3 and 320),
  phone       text not null check (char_length(phone) between 5 and 30),
  service     text,
  message     text check (char_length(message) <= 5000),
  source      text not null default 'contact_page',
  status      text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  notes       text
);

create index if not exists contact_requests_created_at_idx
  on public.contact_requests (created_at desc);
create index if not exists contact_requests_status_idx
  on public.contact_requests (status);

-- RLS on with no policies: anon/authenticated keys cannot read or write.
-- The website inserts via the server-side service role key; the admin
-- dashboard will get its own policies for authenticated admins.
alter table public.contact_requests enable row level security;
