-- Site-wide FAQs shown on the public /faq page.
create table if not exists public.global_faqs (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  question   text not null check (char_length(question) between 1 and 300),
  answer     text not null check (char_length(answer) between 1 and 2000),
  sort_order integer not null default 0,
  is_active  boolean not null default true
);

create index if not exists global_faqs_order_idx on public.global_faqs (sort_order);

create or replace function public.set_global_faq_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists global_faqs_set_updated_at on public.global_faqs;
create trigger global_faqs_set_updated_at before update on public.global_faqs
  for each row execute function public.set_global_faq_updated_at();

-- Public reads and all writes occur through server-side service-role clients.
alter table public.global_faqs enable row level security;
