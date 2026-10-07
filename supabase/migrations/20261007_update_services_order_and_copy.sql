-- Keep the public service catalogue in the requested chronology.
-- This migration is safe to run against databases that already contain the
-- service rows created through the admin panel.

update public.services
set title = 'Transmission of Shares',
    short_description = 'Transferring shares of a deceased shareholder to the rightful legal heir.'
where slug = 'transmission-of-shares';

update public.services
set title = 'IEPF Claim of Shares and Dividends'
where slug = 'iepf-share-dividend-recovery';

update public.services
set title = 'Other Financial Assets Recovery Assistance',
    short_description = 'Trace and recover unclaimed bank deposits, insurance, mutual funds, bonds and other financial assets.',
    tagline = 'Help with bank deposits, insurance, mutual funds, bonds and other financial assets that have gone unclaimed.',
    overview = 'Forgotten money is not limited to shares. Inactive bank deposits, old insurance policies, mutual fund folios, bonds and debentures can also go unclaimed, especially after a change of address or the death of the investor.

We help you trace these financial assets, identify the institution that holds them, confirm their current status and prepare the right recovery claim. Each asset type has its own rules and forms, so we guide you through the process that applies to yours.'
where slug = 'other-financial-asset-assistance';

-- Correct titles and descriptions for records created with older wording.
update public.services
set title = 'Mutual Funds and Bonds Recovery'
where lower(title) like 'mutual funds%bond%recovery%';

update public.services
set title = 'Insurance Claims – Unclaimed Insurance'
where lower(title) like 'insurance claims%';

update public.services
set title = 'ESI and PF Compliance',
    short_description = 'ESI and PF registration, filings, audits and compliance support.',
    image_url = '/images/esi & pf.jpeg',
    overview = 'Employee State Insurance (ESI) and Provident Fund (PF) compliance requires accurate registrations, employee records, periodic filings and timely contributions.

We help employers manage ESI and PF registrations, monthly filings, contribution records, reconciliations, employee queries, claim support and compliance notices so that statutory obligations are handled correctly and on time.'
where lower(title) like '%gst%pf%compliance%'
   or lower(title) like '%esi%pf%compliance%';

update public.services
set title = 'Tax & GST Compliance'
where lower(title) like 'tax%gst%compliance%';

update public.services
set title = 'ITR Filing & Tax Consultancy'
where lower(title) like 'itr%tax%';

update public.services
set title = 'Company & LLP Registrations'
where lower(title) like 'company%llp%registration%';

update public.services
set title = 'ROC & MCA Compliance'
where lower(title) like 'roc%mca%compliance%';

update public.services
set title = 'Labour Law Compliances',
    image_url = '/images/service-labour-law.jpg',
    short_description = 'EPF & ESIC registrations, statutory filings, audits, and compliance management.'
where slug = 'labour-law-compliances'
   or lower(title) like 'labour law%';

with requested_order(slug, sort_order) as (
  values
    ('iepf-share-dividend-recovery', 1),
    ('physical-shares-to-demat', 2),
    ('transmission-of-shares', 3),
    ('lost-duplicate-share-certificates', 4),
    ('unclaimed-dividends', 5),
    ('nri-investment-recovery', 6),
    ('pf-recovery-assistance', 7),
    ('mutual-funds-bonds-recovery', 8),
    ('insurance-claims-unclaimed-insurance', 9),
    ('esi-pf-compliance', 10),
    ('labour-law-compliances', 11),
    ('tax-gst-compliance', 12),
    ('itr-filing-tax-consultancy', 13),
    ('company-llp-registrations', 14),
    ('roc-mca-compliance', 15),
    ('other-financial-asset-assistance', 16)
)
update public.services s
set sort_order = requested_order.sort_order
from requested_order
where s.slug = requested_order.slug;

-- Also order records whose slugs were generated differently by matching their
-- final visible titles.
update public.services s
set sort_order = case s.title
  when 'Mutual Funds and Bonds Recovery' then 8
  when 'Insurance Claims – Unclaimed Insurance' then 9
  when 'ESI and PF Compliance' then 10
  when 'Labour Law Compliances' then 11
  when 'Tax & GST Compliance' then 12
  when 'ITR Filing & Tax Consultancy' then 13
  when 'Company & LLP Registrations' then 14
  when 'ROC & MCA Compliance' then 15
  when 'Other Financial Assets Recovery Assistance' then 16
  else s.sort_order
end
where s.title in (
  'Mutual Funds and Bonds Recovery',
  'Insurance Claims – Unclaimed Insurance',
  'ESI and PF Compliance',
  'Labour Law Compliances',
  'Tax & GST Compliance',
  'ITR Filing & Tax Consultancy',
  'Company & LLP Registrations',
  'ROC & MCA Compliance',
  'Other Financial Assets Recovery Assistance'
);
