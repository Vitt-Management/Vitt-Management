-- Services shown on the home page cards and on each /services/[slug] detail page.
create table if not exists public.services (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  slug               text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title              text not null check (char_length(title) between 1 and 200),
  short_description  text not null default '' check (char_length(short_description) <= 400),  -- card text + SEO description
  image_url          text,                                   -- card + banner image (path or full URL)
  tagline            text not null default '' check (char_length(tagline) <= 300),           -- line under the page title
  overview           text not null default '',               -- paragraphs separated by a blank line
  who_for            jsonb not null default '[]'::jsonb check (jsonb_typeof(who_for) = 'array'),      -- ["text", ...]
  how_we_help        jsonb not null default '[]'::jsonb check (jsonb_typeof(how_we_help) = 'array'),  -- [{"title","description"}, ...]
  documents          jsonb not null default '[]'::jsonb check (jsonb_typeof(documents) = 'array'),    -- ["text", ...]
  faqs               jsonb not null default '[]'::jsonb check (jsonb_typeof(faqs) = 'array'),         -- [{"question","answer"}, ...]
  sort_order         integer not null default 0,
  is_active          boolean not null default true
);

create index if not exists services_order_idx on public.services (sort_order);

create or replace function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists services_set_updated_at on public.services;
create trigger services_set_updated_at before update on public.services
  for each row execute function public.set_updated_at();

-- RLS on, no policies: only the server (service role) reads/writes.
alter table public.services enable row level security;
