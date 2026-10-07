-- Update the public contact email while preserving any explicitly configured
-- replacement address.
update public.site_settings
set email = 'tara.juneja@vittmanagement.in'
where id = true
  and email in ('info@vittmanagement.in', 'komal.goswami@vittmanagement.in');
