-- ==============================================================================
-- Migration: Create Blogs Table & Seed Initial Vitt Management Articles
-- ==============================================================================

create table if not exists public.blogs (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  published_at      timestamptz not null default now(),
  slug              text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title             text not null check (char_length(title) between 1 and 300),
  excerpt           text not null default '' check (char_length(excerpt) <= 600),
  content           text not null default '',
  category          text not null default 'IEPF Recovery',
  author            text not null default 'Vitt Legal & Financial Desk',
  image_url         text,
  read_time         text not null default '5 min read',
  is_published      boolean not null default true,
  is_featured       boolean not null default false,
  meta_title        text,
  meta_description  text
);

-- Indexes for lightning fast listing, category filtering & slug lookups
create index if not exists blogs_slug_idx on public.blogs (slug);
create index if not exists blogs_published_idx on public.blogs (is_published, published_at desc);
create index if not exists blogs_category_idx on public.blogs (category);
create index if not exists blogs_featured_idx on public.blogs (is_featured);

-- Auto-update updated_at timestamp trigger
create or replace function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists blogs_set_updated_at on public.blogs;
create trigger blogs_set_updated_at before update on public.blogs
  for each row execute function public.set_updated_at();

-- Enable Row Level Security (RLS)
alter table public.blogs enable row level security;

-- Public can read published blogs (if querying directly with anon key)
create policy "Allow public read access for published blogs"
  on public.blogs for select
  using (is_published = true);


-- ==============================================================================
-- Initial Seed Data: High Quality Articles for Vitt Management Services
-- ==============================================================================

insert into public.blogs (
  slug,
  title,
  excerpt,
  category,
  author,
  image_url,
  read_time,
  is_published,
  is_featured,
  meta_title,
  meta_description,
  content
)
values
(
  'how-to-file-form-iepf-5-claim-shares-unclaimed-dividends',
  'How to File Form IEPF-5: Complete Step-by-Step Guide to Claim Shares & Unpaid Dividends',
  'A comprehensive legal roadmap on claiming shares and dividends transferred to the Investor Education and Protection Fund (IEPF) Authority under MCA rules.',
  'IEPF Recovery',
  'Vitt Legal Desk',
  '/images/service-iepf.jpg',
  '6 min read',
  true,
  true,
  'How to File Form IEPF-5 | Claim Unclaimed Shares & Dividends - Vitt',
  'Learn how to file MCA Form IEPF-5 online, avoid verification report rejections, and recover shares transferred to the IEPF Authority.',
  '## What is IEPF and Why Are Shares Transferred?

Under Section 124(6) of the Companies Act, 2013, if dividends on physical or demat shares remain unpaid or unclaimed for **seven consecutive years**, the company is legally mandated to transfer both the unpaid dividends and the underlying shares to the **Investor Education and Protection Fund (IEPF) Authority** established by the Ministry of Corporate Affairs (MCA).

---

## 3 Critical Steps in the IEPF-5 Recovery Process

### 1. Document Reconciliation & Folio Verification
Before filing the online claim form, you must verify:
- Exact number of shares transferred with company Registrar & Transfer Agent (RTA).
- Matching of name and signature with company records.
- Demat account details (Client Master List - CML) where recovered shares will be credited.

### 2. Online Filing of MCA Form IEPF-5
Submit the e-form on the MCA portal with required self-attested attachments:
- Copy of PAN card and Aadhaar card
- Client Master List (CML) stamped by DP
- Proof of entitlement (Original share certificates / Dividend warrants / Folio confirmation)

### 3. Submission of Physical Claim Kit to the Nodal Officer
Once the online SRN (Service Request Number) is generated, a physical verification dossier must be couriered to the company''s appointed Nodal Officer along with an Indemnity Bond and Advance Stamped Receipt.

---

## Why Do Claims Get Delayed or Rejected?
- Signature mismatch between company records and recent signature.
- Incorrect details in the Indemnity Bond or non-judicial stamp value mismatch.
- Failure of company Nodal Officer to submit the verification report within 60 days.

*Need expert assistance in filing your IEPF-5 without rejections? Contact Vitt Management for end-to-end recovery handling.*'
),
(
  'how-to-convert-old-physical-shares-to-demat',
  'Found Old Paper Share Certificates? How to Convert Physical Shares to Demat in 2026',
  'Step-by-step procedure to dematerialize physical share certificates, handle name mismatches, and resolve RTA verification issues.',
  'Physical to Demat',
  'Vitt Advisory Team',
  '/images/service-demat.jpg',
  '5 min read',
  true,
  false,
  'How to Convert Physical Shares to Demat in India | Vitt Management',
  'Complete guide on converting ancestral paper share certificates into Demat format, dealing with lost certificates and RTAs.',
  '## Why You Cannot Trade Physical Share Certificates Anymore

SEBI regulations mandate that physical transfer of listed securities is completely discontinued. If you or your family members hold physical paper share certificates (such as Reliance, Tata Motors, ITC, L&T, HDFC), they must be converted into **Demat form** to trade, sell, or claim dividend entitlements.

---

## Required Documents for Dematerialization
1. **Original Share Certificates**
2. **Dematerialization Request Form (DRF)** in triplicate provided by your DP
3. **Self-attested PAN Card & Aadhaar Card**
4. **Cancelled Cheque** with holder''s name printed
5. **ISR-1, ISR-2 & Form SH-13 (Nomination)** as per latest SEBI circulars

---

## Common Roadblocks and Solutions
- **Name Mismatch / Spelling Error:** Provide a gazette notification or self-declaration affidavit.
- **Address Change:** Submit updated KYC documents to the RTA using Form ISR-1.
- **Damaged or Mutilated Certificate:** Apply for duplicate certificates with an Indemnity Bond and FIR if misplaced.

*Vitt Management assists families in digitizing legacy shareholdings with zero hassle.*'
),
(
  'transmission-of-shares-after-death-legal-heir-guide',
  'Transmission of Shares After Demise of Holder: Legal Heir vs Nominee Rights Explained',
  'How legal heirs can claim shares held by deceased parents or relatives, navigate Succession Certificates, Probate, and NOC procedures.',
  'Transmission of Shares',
  'Vitt Legal Desk',
  '/images/service-transmission.jpg',
  '7 min read',
  true,
  false,
  'Transmission of Shares After Death | Legal Heir Process in India - Vitt',
  'Learn how to transmit shares after the death of a shareholder. Understanding nominee rights, succession certificates, and NOC requirements.',
  '## Transmission vs Transfer: Understanding the Legal Difference

While a **transfer** of shares is a voluntary sale or gift between living parties, **transmission of shares** takes place by operation of law upon the death or insolvency of a shareholder.

---

## Scenario A: Where Nomination Exists
If the deceased holder registered a valid nominee with the company or Depository:
- The nominee acts as a legal trustee to receive the shares.
- Required documents: Transmission Request Form (TRF), original death certificate, client master list of nominee, and self-attested KYC.

## Scenario B: Where No Nomination Was Registered
When shares are held without a nominee, the legal heirs must provide:
- **Succession Certificate / Letter of Administration / Probate of Will** (if value exceeds statutory threshold).
- **No Objection Certificates (NOC)** / Relinquishment deed from other legal heirs.
- **Affidavit & Indemnity Bond** on requisite stamp paper.

*If you are dealing with inherited shares stuck in legal red tape, our legal team can prepare and fast-track your transmission claim.*'
)
on conflict (slug) do nothing;
