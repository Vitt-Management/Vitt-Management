update public.services
set image_url = '/images/pf_final image.jpeg'
where slug = 'pf-recovery-assistance'
   or lower(title) = 'pf recovery assistance';

update public.services
set image_url = '/images/esi & pf.jpeg'
where slug = 'esi-pf-compliance'
   or lower(title) like '%esi%pf%compliance%'
   or lower(title) like '%gst%pf%compliance%';
