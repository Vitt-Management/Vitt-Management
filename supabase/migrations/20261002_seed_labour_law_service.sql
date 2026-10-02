-- Seed Labour Law Compliances Service
INSERT INTO public.services (
  slug,
  title,
  short_description,
  image_url,
  tagline,
  overview,
  who_for,
  how_we_help,
  documents,
  faqs,
  sort_order,
  is_active
) VALUES (
  'labour-law-compliances',
  'Labour Law Compliances',
  'EPF & ESIC registrations, statutory filings, audits, and compliance management.',
  '/images/service-labour-law.jpg',
  'Ensuring 100% regulatory compliance, payroll governance, and risk mitigation across all Indian labour enactments.',
  'Indian labour laws are extensive and encompass various central and state-specific acts governing employment, workplace safety, social security, and fair compensation. Non-compliance can lead to hefty penalties, legal notices, and operational disruptions.

At Vitt Management, we provide comprehensive end-to-end Labour Law Compliance and Advisory Services for corporations, startups, factories, and commercial establishments. From initial registrations to monthly return filings, annual statutory audits, register maintenance, and handling government inspections/notices, we ensure your organization operates with complete peace of mind and strict adherence to the law.',
  '[
    "Startups and growing enterprises expanding their workforce",
    "Private Limited, Public Limited, and LLP companies",
    "Factories, manufacturing plants, and industrial establishments",
    "Commercial establishments, retail chains, and IT/ITES firms",
    "Principal employers managing third-party contract labour",
    "Organizations facing statutory notices or undergoing compliance audits"
  ]'::jsonb,
  '[
    {
      "title": "EPF & ESIC Compliance & Monthly Filings",
      "description": "New establishment registration, employee code generation, monthly ECR generation, challan preparation, return filings, and claim settlements."
    },
    {
      "title": "Shop & Establishment / Factory Act Governance",
      "description": "State-wise registrations, renewals, annual returns, floor compliance, working hour limits, and safety regulations."
    },
    {
      "title": "Contract Labour (CLRA) & Interstate Migrant Worker Compliance",
      "description": "Registration certificate (RC) for principal employers, contractor licensing, Form XII registers, and vendor compliance audits."
    },
    {
      "title": "Statutory Register & Payroll Maintenance",
      "description": "Maintaining physical/digital registers (Form A, B, C, D, wage registers, muster rolls, overtime, bonus, and gratuity records under applicable codes)."
    },
    {
      "title": "Bonus, Gratuity, POSH & Maternity Benefit Advisory",
      "description": "Formulation of POSH internal committees, filing annual POSH returns, gratuity trust advisory, and maternity benefit provisions."
    },
    {
      "title": "Labour Department Notice Handling & Liaison",
      "description": "Drafting formal responses to inspections/show-cause notices, handling assessments, and representation before Labour Authorities."
    }
  ]'::jsonb,
  '[
    "Certificate of Incorporation / Partnership Deed / Business Registration",
    "PAN Card & GST Registration Certificate of the establishment",
    "Proof of registered business premises (Electricity Bill, Rent Agreement, NOC)",
    "Director / Partner / Proprietor KYC documents (PAN, Aadhaar, Photo)",
    "List of employees with joining dates, Aadhaar, PAN, and salary breakup",
    "Existing EPF / ESIC code allotment letters (if already registered)",
    "Specimen signature / Digital Signature Certificate (DSC) of authorized signatory"
  ]'::jsonb,
  '[
    {
      "question": "When is EPF and ESIC registration mandatory for an organization?",
      "answer": "EPF registration is mandatory once an organization crosses 20 or more employees (voluntary registration is also allowed). ESIC registration is mandatory for units with 10 or more employees earning up to ₹21,000 per month (₹25,000 for employees with disability)."
    },
    {
      "question": "What are the consequences of non-compliance with Labour Laws in India?",
      "answer": "Non-compliance can attract heavy monetary penalties, interest on delayed statutory remittances, recovery proceedings from authorities, and in serious cases, criminal prosecution/imprisonment of directors/principal officers."
    },
    {
      "question": "Can Vitt Management handle compliance audits for our third-party vendors/contractors?",
      "answer": "Yes, under the Contract Labour (Regulation and Abolition) Act, principal employers are ultimately held liable for contractor defaults. We conduct complete third-party vendor audits to safeguard your business."
    },
    {
      "question": "How will the new Labour Codes affect existing business compliance?",
      "answer": "The upcoming 4 Labour Codes will consolidate 29 existing central labour laws, bringing changes to basic salary definitions, gratuity rules, working hours, and social security. We help organizations restructure policies to stay future-ready."
    }
  ]'::jsonb,
  (COALESCE((SELECT MAX(sort_order) FROM public.services), 0) + 1),
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  image_url = EXCLUDED.image_url,
  tagline = EXCLUDED.tagline,
  overview = EXCLUDED.overview,
  who_for = EXCLUDED.who_for,
  how_we_help = EXCLUDED.how_we_help,
  documents = EXCLUDED.documents,
  faqs = EXCLUDED.faqs,
  is_active = EXCLUDED.is_active;
