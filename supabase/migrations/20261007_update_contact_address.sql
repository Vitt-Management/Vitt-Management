-- Update the public registered address shown on the contact page and footer.
update public.site_settings
set address = 'VittEdge Global Advisory LLP. A-11, Fourth Floor, Lane No.18, Joga Bai Extension, Okhla, New Delhi, 110025. India.',
    map_query = 'A-11, Fourth Floor, Lane No.18, Joga Bai Extension, Okhla, New Delhi, 110025, India'
where id = true;
