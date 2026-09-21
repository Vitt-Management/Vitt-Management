-- Contact details and contact-page text, managed from the admin dashboard.
-- A single row (id is always true) that the whole website reads.
create table if not exists public.site_settings (
  id                 boolean primary key default true check (id),
  updated_at         timestamptz not null default now(),

  phone              text not null check (char_length(phone) between 5 and 30),        -- shown to visitors and used for tel: links
  whatsapp_number    text not null default '' check (whatsapp_number ~ '^[0-9]{0,15}$'), -- digits only, with country code; empty hides the button
  whatsapp_message   text not null default '' check (char_length(whatsapp_message) <= 300),
  email              text not null check (char_length(email) between 3 and 320),
  address            text not null default '' check (char_length(address) <= 300),
  working_hours      text not null default '' check (char_length(working_hours) <= 100),
  map_query          text not null default '' check (char_length(map_query) <= 300),   -- what the Google map shows; falls back to address

  contact_heading    text not null default '' check (char_length(contact_heading) <= 150),
  contact_subheading text not null default '' check (char_length(contact_subheading) <= 300),

  linkedin_url       text not null default '' check (char_length(linkedin_url) <= 300),
  x_url              text not null default '' check (char_length(x_url) <= 300),
  facebook_url       text not null default '' check (char_length(facebook_url) <= 300),
  instagram_url      text not null default '' check (char_length(instagram_url) <= 300),
  youtube_url        text not null default '' check (char_length(youtube_url) <= 300)
);

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();

-- RLS on, no policies: only the server (service role) reads/writes.
alter table public.site_settings enable row level security;

-- Starting values = what the website showed before (placeholders until you edit them in the admin).
insert into public.site_settings
  (id, phone, whatsapp_number, whatsapp_message, email, address, working_hours, map_query, contact_heading, contact_subheading)
values
  (true, '+91 98765 43210', '919876543210',
   'Hello Vitt Management, I would like to know more about recovering my investments.',
   'info@vittmanagement.in', 'Mumbai, India', 'Mon-Sat, 9 AM - 7 PM', 'Mumbai, India',
   'We''re here to help you recover what''s yours',
   'Tell us about your case and a recovery expert will get back to you within 24 hours.')
on conflict (id) do nothing;
