import type { Service } from "@/lib/services";

export const AUDITED_SERVICE_DETAILS: Service[] = [
  {
    slug: "mutual-funds-bonds-recovery",
    title: "Mutual Funds and Bonds Recovery",
    short_description: "Assistance in Claiming Old/Unclaimed Mutual Funds and Bonds.",
    image_url: "/images/service-other-assets.jpg",
    tagline: "Trace inactive mutual fund folios and recover unclaimed mutual fund or bond proceeds.",
    overview:
      "Mutual fund folios and bond investments can become difficult to access when contact details, bank accounts, KYC records, or nominee information are outdated. Redemption proceeds, IDCW amounts, bond interest, and maturity proceeds may also remain unpaid or unclaimed.\n\nWe help identify the investment and the institution currently responsible, verify its status, organise the required records, and coordinate the recovery request with the AMC, RTA, issuer, or other relevant entity. The route is tailored to the asset, holder status, and available documentation.",
    who_for: [
      "You have old mutual fund statements or folio details but no recent account access",
      "Redemption proceeds or IDCW amounts were not credited to your bank account",
      "Bond interest or maturity proceeds remain unpaid or unclaimed",
      "You inherited mutual fund units or bonds from a family member",
      "A name, signature, address, bank, KYC, or nominee mismatch is blocking the request",
    ],
    how_we_help: [
      {
        title: "Trace the investment",
        description: "We use the available folio, statement, certificate, PAN-linked, and issuer details to identify the mutual fund or bond holding.",
      },
      {
        title: "Confirm the current status",
        description: "We determine whether the holding is active, inactive, matured, unpaid, or recorded as an unclaimed amount.",
      },
      {
        title: "Resolve record gaps",
        description: "We identify KYC, bank, address, signature, nomination, or holder-detail updates needed before recovery can proceed.",
      },
      {
        title: "Prepare the recovery request",
        description: "We organise the forms and supporting documents required by the AMC, RTA, bond issuer, or relevant intermediary.",
      },
      {
        title: "Coordinate through completion",
        description: "We track submissions, respond to document queries, and follow up until the eligible units or proceeds are credited.",
      },
    ],
    documents: [
      "Mutual fund statements, folio numbers, CAS, bond certificates, or allotment advice",
      "PAN and identity and address proof of the claimant",
      "Bank proof, including a cancelled cheque or recent statement",
      "Signature proof and current KYC details",
      "Demat account details where the investment is held or credited electronically",
      "Death certificate, nominee details, and entitlement documents for inherited investments",
    ],
    faqs: [
      {
        question: "Can you help if I do not know the folio number?",
        answer: "Often, yes. Old statements, emails, PAN-linked records, issuer details, or family papers may provide enough information to begin tracing.",
      },
      {
        question: "What mutual fund amounts can become unclaimed?",
        answer: "Common examples include redemption proceeds and IDCW amounts that could not be credited because investor or bank details were outdated or incomplete.",
      },
      {
        question: "Can inherited mutual funds or bonds be recovered?",
        answer: "Yes, subject to the holder record, nomination, and entitlement documents required by the AMC, RTA, issuer, or depository.",
      },
      {
        question: "Will the process be the same for mutual funds and bonds?",
        answer: "No. The responsible institution, forms, and supporting documents differ, so we first identify the asset and then map the correct process.",
      },
    ],
  },
  {
    slug: "insurance-claims",
    title: "Insurance Claims – Unclaimed Insurance",
    short_description: "Trace unclaimed insurance amounts and coordinate policy and claim documentation.",
    image_url: "/images/service-other-assets.jpg",
    tagline: "Recover eligible maturity, survival, refund, or claim amounts that remain unpaid with an insurer.",
    overview:
      "Insurance proceeds can remain unclaimed when policyholders change address or bank accounts, lose policy records, miss a maturity communication, or when beneficiaries are unaware of a policy. The amount may relate to maturity or survival benefits, a refund, an unencashed payment, or an insurance claim.\n\nWe help trace the policy and insurer, establish the present status, organise claim-specific documents, and coordinate follow-ups with the insurer. Claim admissibility and payment remain subject to the policy terms and the insurer's verification.",
    who_for: [
      "A life policy has matured but the proceeds were not received",
      "You are a nominee or family member handling a deceased policyholder's policy",
      "A survival benefit, refund, or settled amount was not credited or encashed",
      "You have limited policy information and need help identifying the insurer or policy status",
      "The insurer has requested additional KYC, bank, nominee, or claim documents",
    ],
    how_we_help: [
      {
        title: "Trace the policy or amount",
        description: "We review available policy details and help identify the insurer and any available unclaimed-amount record.",
      },
      {
        title: "Confirm the request type",
        description: "We distinguish between maturity, survival benefit, refund, death claim, or another policy payment so the correct process is used.",
      },
      {
        title: "Build the document checklist",
        description: "We map the identity, policy, bank, nominee, and event-specific documents requested for the case.",
      },
      {
        title: "Coordinate submission",
        description: "We help organise the claim package and coordinate submission and clarification with the insurer.",
      },
      {
        title: "Track the insurer's response",
        description: "We follow up on document queries and keep you informed until the insurer communicates its decision or payment status.",
      },
    ],
    documents: [
      "Policy bond, policy number, premium receipt, or insurer correspondence",
      "PAN and identity and address proof of the policyholder or claimant",
      "Bank account proof and a cancelled cheque",
      "Maturity, discharge, or claim forms required by the insurer",
      "Death certificate and nominee or claimant documents for death claims",
      "Medical, incident, or supporting records where the policy and claim type require them",
    ],
    faqs: [
      {
        question: "Can an insurance amount remain unclaimed even after a claim is approved?",
        answer: "Yes. A payment may remain unclaimed if a cheque was not encashed or a bank transfer could not be completed because the recorded details were outdated.",
      },
      {
        question: "What if I only know the insurer's name?",
        answer: "We can review the information you have and help determine the appropriate insurer search or service channel to use.",
      },
      {
        question: "Can you guarantee that an insurance claim will be paid?",
        answer: "No. The insurer decides admissibility under the policy terms. We support tracing, documentation, submission, and follow-up.",
      },
      {
        question: "Can nominees or family members seek an unclaimed amount?",
        answer: "They may be able to do so, subject to the policy record and the claimant documents required by the insurer.",
      },
    ],
  },
  {
    slug: "gst-pf-compliance",
    title: "ESI and PF Compliance",
    short_description: "ESI and PF registration, employee records, contribution workflows, and compliance support.",
    image_url: "/images/esi & pf.jpeg",
    tagline: "Employer support for ESI and PF registrations, employee records, contributions, ECR workflows, and ongoing compliance.",
    overview:
      "ESI and PF compliance requires employers to maintain accurate establishment and employee records, register eligible employees, calculate contributions, complete portal workflows, and reconcile payments with payroll. Incorrect employee details or missed compliance steps can create contribution gaps and employee-service issues.\n\nWe support employers with EPFO and ESIC onboarding, employee master-data checks, contribution working papers, ECR and challan coordination, reconciliations, and documentation for routine compliance queries. The scope is based on the establishment's coverage and workforce profile.",
    who_for: [
      "New or growing employers assessing EPF and ESIC registration requirements",
      "Establishments onboarding employees into EPFO or ESIC records",
      "Payroll teams managing recurring contribution and portal workflows",
      "Businesses with UAN, IP number, KYC, wage, exit-date, or contribution mismatches",
      "Employers reviewing historical records or responding to routine compliance queries",
    ],
    how_we_help: [
      {
        title: "Assess establishment readiness",
        description: "We review the establishment profile, workforce data, existing registrations, and records needed for the agreed compliance scope.",
      },
      {
        title: "Coordinate registrations",
        description: "We organise establishment and authorised-signatory information for EPFO and ESIC registration workflows where applicable.",
      },
      {
        title: "Validate employee records",
        description: "We check employee identity, UAN or IP details, joining and exit data, wages, and KYC records for inconsistencies.",
      },
      {
        title: "Support contribution workflows",
        description: "We assist with contribution working papers, ECR or portal data preparation, challan coordination, and payment tracking.",
      },
      {
        title: "Reconcile and maintain records",
        description: "We compare payroll, portal, and payment records and organise documentation for corrections or compliance follow-ups.",
      },
    ],
    documents: [
      "Business registration certificate, PAN, and establishment details",
      "Registered-office or workplace address proof",
      "Authorised-signatory details and digital signature, where required",
      "Employee master with joining dates, wages, PAN, Aadhaar, UAN, and ESIC IP details",
      "Payroll registers, attendance records, and contribution workings",
      "Existing EPFO or ESIC registration letters, challans, ECR files, and prior correspondence",
    ],
    faqs: [
      {
        question: "Can you support both EPF and ESI compliance?",
        answer: "Yes. The scope can cover either or both systems based on the establishment's coverage and operational requirements.",
      },
      {
        question: "Can you help correct employee-record mismatches?",
        answer: "We can identify differences in identity, joining, exit, wage, UAN, IP, or KYC records and coordinate the applicable correction workflow.",
      },
      {
        question: "Do you support recurring monthly compliance?",
        answer: "Yes. An ongoing scope can include data checks, contribution workings, portal-file preparation, challan tracking, and record reconciliation.",
      },
      {
        question: "What information is needed to begin?",
        answer: "We normally begin with establishment registrations, the employee master, payroll data, and recent contribution and payment records.",
      },
    ],
  },
  {
    slug: "tax-gst-compliance",
    title: "Tax & GST Compliance",
    short_description: "Business-focused support for GST registrations, returns, reconciliations, and tax compliance records.",
    image_url: "/images/service-labour-law.jpg",
    tagline: "Keep GST registrations, returns, reconciliations, and business tax records organised and on schedule.",
    overview:
      "GST compliance depends on accurate registration data, consistent sales and purchase records, timely return preparation, and reconciliation of portal information with the books of account. Changes in business details, missed returns, mismatched input-tax records, and incomplete invoice data can disrupt routine compliance.\n\nWe help businesses organise GST and related tax records, prepare the applicable return data, reconcile key statements, coordinate registration or amendment requests, and maintain a clear compliance calendar. The exact scope is matched to the taxpayer's registration type and filing obligations.",
    who_for: [
      "Businesses applying for, amending, or managing GST registrations",
      "Registered taxpayers that need recurring GST return support",
      "Businesses reconciling sales, purchase, e-invoice, or input-tax records",
      "Taxpayers with delayed, incomplete, or inconsistent GST filings",
      "Teams that need an organised tax-document and compliance calendar",
    ],
    how_we_help: [
      {
        title: "Review registrations and obligations",
        description: "We review the business profile, GST registrations, filing frequency, and compliance records relevant to the engagement.",
      },
      {
        title: "Organise transaction data",
        description: "We structure sales, purchase, credit-note, debit-note, e-invoice, and tax-payment information for return preparation.",
      },
      {
        title: "Reconcile records",
        description: "We compare books and available portal statements to identify gaps that need review before submission.",
      },
      {
        title: "Prepare and coordinate filings",
        description: "We prepare the applicable registration, amendment, or return workflow based on the agreed scope and supplied records.",
      },
      {
        title: "Track compliance actions",
        description: "We maintain status records, highlight pending information, and coordinate responses to routine portal queries or notices.",
      },
    ],
    documents: [
      "PAN, GSTIN certificates, and business registration records",
      "Sales and purchase registers with invoice-level details",
      "Credit notes, debit notes, e-invoice, and e-way bill records, where applicable",
      "Available GST returns, electronic ledgers, and tax-payment challans",
      "Bank statements and relevant accounting reports",
      "Authorised-signatory details and supporting documents for registration changes",
    ],
    faqs: [
      {
        question: "Can you assist with GST registration and amendments?",
        answer: "Yes. We can organise and coordinate registration or amendment requests based on the business constitution, location, and information supplied.",
      },
      {
        question: "Which GST returns can you support?",
        answer: "The applicable returns depend on the registration and taxpayer profile. We first confirm the filing obligations and then define the scope.",
      },
      {
        question: "Can you help reconcile GST data with the books?",
        answer: "Yes. We can compare transaction records with available portal statements and identify differences for review and correction.",
      },
      {
        question: "Can you guarantee approval of a registration or refund?",
        answer: "No. Approval and processing are controlled by the tax authorities. We focus on accurate records, complete submissions, and timely coordination.",
      },
    ],
  },
  {
    slug: "itr-filing-tax-consultancy",
    title: "ITR Filing & Tax Consultancy",
    short_description: "Income-tax return preparation and filing support based on your income and reporting profile.",
    image_url: "/images/service-other-assets.jpg",
    tagline: "Accurate income-tax return preparation for individuals, professionals, businesses, investors, and NRIs.",
    overview:
      "An income-tax return should reflect the taxpayer's complete income profile and reconcile with available tax records. Salary, business or professional income, interest, property income, capital gains, foreign assets, deductions, and residential status can affect the return form and reporting required.\n\nWe collect and organise the relevant records, reconcile Form 16 or 16A with AIS, TIS, and Form 26AS where applicable, prepare the appropriate return, and coordinate filing and e-verification. Advisory is based on the facts and documents provided for the relevant assessment year.",
    who_for: [
      "Salaried individuals with one or multiple income sources",
      "Freelancers, professionals, proprietors, and small businesses",
      "Investors reporting capital gains, dividends, or interest income",
      "Individuals with rental income or eligible deductions",
      "NRIs or residents with cross-border income and asset-reporting considerations",
    ],
    how_we_help: [
      {
        title: "Understand your income profile",
        description: "We review income sources, residential status, prior returns, and reporting requirements for the relevant year.",
      },
      {
        title: "Collect and reconcile records",
        description: "We organise Form 16 or 16A, AIS, TIS, Form 26AS, bank data, and supporting income and deduction records.",
      },
      {
        title: "Prepare the return",
        description: "We select the applicable return form and prepare the computation using the information and records provided.",
      },
      {
        title: "File and e-verify",
        description: "We coordinate return submission and completion of the applicable e-verification step.",
      },
      {
        title: "Support post-filing checks",
        description: "We help review acknowledgements, processing updates, and routine information requests related to the filed return.",
      },
    ],
    documents: [
      "PAN, Aadhaar, contact details, and bank account information",
      "Form 16, Form 16A, AIS, TIS, and Form 26AS, as applicable",
      "Bank interest certificates and relevant account statements",
      "Capital-gain statements for shares, mutual funds, property, or other assets",
      "Rental, business, professional, or foreign-income records, where applicable",
      "Receipts and evidence for deductions or tax payments being reported",
    ],
    faqs: [
      {
        question: "Which ITR form applies to me?",
        answer: "It depends on your income sources, residential status, entity type, and other reporting factors. We confirm the appropriate form after reviewing your profile.",
      },
      {
        question: "Do documents have to be attached to the ITR?",
        answer: "Income-tax returns are generally filed without attachments, but supporting records should be reviewed, retained, and produced if requested.",
      },
      {
        question: "Can you guarantee a tax refund?",
        answer: "No. A refund depends on the return, taxes paid, available records, and processing by the Income Tax Department.",
      },
      {
        question: "Can you help NRIs file an Indian return?",
        answer: "Yes, after reviewing residential status, Indian income, transactions, assets, and the reporting requirements that apply.",
      },
    ],
  },
  {
    slug: "company-llp-registration",
    title: "Company & LLP Registration",
    short_description: "Structured support for company and LLP name reservation, incorporation documents, and MCA registration.",
    image_url: "/images/service-labour-law.jpg",
    tagline: "Set up a company or LLP through a clear, coordinated MCA registration process.",
    overview:
      "Choosing between a private company, one person company, or limited liability partnership affects ownership, governance, fundraising, and ongoing compliance. Once the structure is selected, incorporation requires name reservation, promoter and office records, digital signatures, and the applicable MCA forms.\n\nWe help founders organise incorporation information, coordinate name and document readiness, prepare the applicable SPICe+ or FiLLiP workflow, and track the application through MCA processing. The final structure and documents are confirmed for the specific business and promoter profile.",
    who_for: [
      "Founders starting a private limited or one person company",
      "Professionals or businesses forming a limited liability partnership",
      "Existing partnerships evaluating a more structured entity format",
      "Indian promoters working with NRI or foreign participants",
      "Entrepreneurs who need coordinated name, DSC, office, and incorporation support",
    ],
    how_we_help: [
      {
        title: "Understand the proposed business",
        description: "We collect promoter, ownership, activity, capital, and registered-office details needed to map the registration workflow.",
      },
      {
        title: "Coordinate name readiness",
        description: "We help prepare proposed names and business-activity descriptions for the applicable MCA name-reservation process.",
      },
      {
        title: "Organise promoter documents",
        description: "We prepare the checklist for identity, address, digital signature, consent, subscriber, and office records.",
      },
      {
        title: "Prepare the incorporation workflow",
        description: "We coordinate the applicable company or LLP forms and linked submissions based on the selected structure.",
      },
      {
        title: "Track registration and handover",
        description: "We monitor resubmission queries and organise the incorporation records issued after approval.",
      },
    ],
    documents: [
      "PAN or passport and identity proof of proposed directors, subscribers, or partners",
      "Current address proof and contact details of each promoter",
      "Registered-office ownership proof or lease records, utility bill, and owner NOC",
      "Proposed entity names and a clear description of business activities",
      "Capital, contribution, shareholding, and partner or director details",
      "Digital signatures, consents, subscriber documents, and other MCA-linked records as applicable",
    ],
    faqs: [
      {
        question: "Should I choose a company or an LLP?",
        answer: "The choice depends on ownership, governance, fundraising, tax, and compliance needs. We help organise the comparison and registration requirements for your decision.",
      },
      {
        question: "How is a company name reserved?",
        answer: "Proposed names are submitted through the applicable MCA workflow and remain subject to naming rules, existing entities, trademarks, and MCA approval.",
      },
      {
        question: "What are SPICe+ and FiLLiP?",
        answer: "SPICe+ is used in the company-incorporation workflow, while FiLLiP is used for LLP name reservation and incorporation.",
      },
      {
        question: "Can registration approval be guaranteed?",
        answer: "No. Approval is controlled by MCA and depends on name availability, eligibility, documents, and successful verification.",
      },
    ],
  },
  {
    slug: "roc-mca-compliance",
    title: "ROC & MCA Compliance",
    short_description: "Ongoing support for company and LLP annual returns, event-based forms, and MCA compliance records.",
    image_url: "/images/service-labour-law.jpg",
    tagline: "Keep company and LLP records, annual filings, and event-based MCA compliance organised.",
    overview:
      "Companies and LLPs have recurring and event-driven obligations after incorporation. Annual financial statements and returns, director or partner updates, registered-office changes, allotments, charges, and other corporate events can each require different records, approvals, and MCA forms.\n\nWe review the entity's MCA master data and available filings, build a compliance calendar, organise supporting records, coordinate preparation and certification where required, and track submissions by their service request status. The filing scope is tailored to the entity and the corporate events involved.",
    who_for: [
      "Active companies preparing annual financial-statement and annual-return filings",
      "LLPs preparing annual returns and statements of account and solvency",
      "Entities with overdue or inconsistent MCA records",
      "Companies reporting director, office, capital, allotment, or charge-related changes",
      "Management teams seeking an organised recurring compliance calendar",
    ],
    how_we_help: [
      {
        title: "Review MCA records",
        description: "We examine available master data, prior filings, entity status, and the events that need to be reported.",
      },
      {
        title: "Map the compliance calendar",
        description: "We identify annual and event-based actions relevant to the company or LLP and the agreed scope.",
      },
      {
        title: "Collect supporting records",
        description: "We organise financial statements, resolutions, registers, director or partner details, and event-specific documents.",
      },
      {
        title: "Coordinate preparation and filing",
        description: "We prepare the applicable workflow and coordinate required review, certification, digital signatures, and submission.",
      },
      {
        title: "Track and maintain evidence",
        description: "We monitor submission status, resubmission queries, acknowledgements, and the final compliance record.",
      },
    ],
    documents: [
      "Certificate of incorporation, CIN or LLPIN, and constitutional documents",
      "Audited or approved financial statements and supporting schedules",
      "Board, member, or partner resolutions and meeting records, where applicable",
      "Director, designated-partner, KYC, and digital-signature details",
      "Prior annual returns, financial filings, and MCA acknowledgements",
      "Event-specific records for office, director, allotment, charge, or other changes",
    ],
    faqs: [
      {
        question: "What is the difference between annual and event-based compliance?",
        answer: "Annual filings recur for each financial year, while event-based forms arise when a specified corporate change or transaction occurs.",
      },
      {
        question: "Can you check whether filings are pending?",
        answer: "Yes. We can review available MCA master data and prior records to identify visible gaps and confirm the next information needed.",
      },
      {
        question: "Do companies and LLPs file the same forms?",
        answer: "No. Companies and LLPs have different forms and record requirements, so the workflow is mapped to the entity type.",
      },
      {
        question: "Can late filings involve additional fees?",
        answer: "They can. The applicable consequence depends on the form, delay, entity status, and MCA rules in force when the filing is made.",
      },
    ],
  },
  {
    slug: "labour-law-compliances",
    title: "Labour Law Compliances",
    short_description: "Workplace registrations, statutory records, workforce documentation, and labour compliance coordination.",
    image_url: "/images/service-labour-law.jpg",
    tagline: "Keep workplace registrations, employee records, statutory registers, and labour compliance actions organised.",
    overview:
      "Labour compliance extends across establishment registrations, employment records, wage and leave registers, workplace policies, contractor records, and state-specific requirements. The applicable obligations vary with the location, industry, workforce, and nature of the establishment.\n\nWe help businesses map the compliance scope, organise registers and supporting records, coordinate recurring documentation, and prepare for routine reviews or inspections. ESI and PF operational compliance is covered separately under our dedicated ESI and PF Compliance service.",
    who_for: [
      "Startups and growing businesses formalising workforce records",
      "Factories, shops, offices, and commercial establishments",
      "Principal employers engaging contractors or interstate workers",
      "Multi-location businesses coordinating state-specific workplace compliance",
      "Organisations reviewing registers, policies, or inspection readiness",
    ],
    how_we_help: [
      {
        title: "Map applicable requirements",
        description: "We review the establishment type, locations, workforce, contractors, and existing registrations to build the compliance scope.",
      },
      {
        title: "Coordinate establishment registrations",
        description: "We organise documents for Shops and Establishments, factory, contractor, or other workplace registrations in the agreed scope.",
      },
      {
        title: "Structure statutory records",
        description: "We help maintain employee, wage, attendance, leave, overtime, contractor, and other required registers and records.",
      },
      {
        title: "Review policies and recurring actions",
        description: "We coordinate documentation relating to workplace policies, bonus, gratuity, maternity benefit, POSH, and recurring returns where applicable.",
      },
      {
        title: "Prepare for reviews and inspections",
        description: "We organise available records, identify documentation gaps, and coordinate factual responses and follow-up materials.",
      },
    ],
    documents: [
      "Business registration, PAN, and workplace address records",
      "Employee master, appointment records, and organisation structure",
      "Attendance, wage, leave, overtime, bonus, and gratuity records",
      "Contractor agreements, licences, worker lists, and deployment records",
      "Existing establishment, factory, or contractor registrations and returns",
      "Workplace policies, committee records, notices, and prior inspection correspondence",
    ],
    faqs: [
      {
        question: "Which labour requirements apply to my business?",
        answer: "The scope depends on the state, establishment type, industry, workforce size, working arrangements, and use of contractors.",
      },
      {
        question: "Can you review our existing registers and records?",
        answer: "Yes. We can compare available records with the agreed compliance checklist and identify documentation gaps.",
      },
      {
        question: "Do you support contractor-compliance documentation?",
        answer: "Yes. The scope can include contractor records, worker lists, licence documentation, and principal-employer coordination.",
      },
      {
        question: "Is ESI and PF included on this page?",
        answer: "ESI and PF operational compliance is handled under the dedicated ESI and PF Compliance service so its registrations, employee records, and contribution workflows receive focused attention.",
      },
    ],
  },
  {
    slug: "other-financial-asset-assistance",
    title: "Other Financial Assets Recovery Assistance",
    short_description: "Trace dormant bank deposits, NPS, PPF, Post Office savings, and similar financial assets.",
    image_url: "/images/service-other-assets.jpg",
    tagline: "Recover dormant deposits and savings held through banks, NPS, PPF, Post Office schemes, and similar institutions.",
    overview:
      "Financial assets outside shares, mutual funds, bonds, and insurance can also become difficult to trace or claim. Dormant bank deposits, old fixed deposits, NPS accounts, PPF balances, Post Office savings, and similar holdings may be overlooked after relocation, long inactivity, or the death of the holder.\n\nWe help identify the institution and account, confirm the current status, organise KYC and entitlement records, and coordinate the applicable activation, maturity, closure, or recovery request. Dedicated mutual fund, bond, and insurance matters are handled under their respective services.",
    who_for: [
      "You are trying to locate an old or dormant bank deposit",
      "You have an inactive or untracked NPS, PPF, or Post Office savings account",
      "A matured deposit or savings amount was not received",
      "You are a nominee or family member tracing a deceased holder's savings",
      "You have partial records and need help identifying the responsible institution",
    ],
    how_we_help: [
      {
        title: "Identify the asset",
        description: "We review available receipts, passbooks, statements, account references, and family records to determine what may exist.",
      },
      {
        title: "Locate the responsible institution",
        description: "We help identify the bank, pension intermediary, Post Office, or other institution currently responsible for the account.",
      },
      {
        title: "Verify the current status",
        description: "We confirm whether the account is active, dormant, matured, transferred, or recorded as unclaimed.",
      },
      {
        title: "Prepare the applicable request",
        description: "We organise KYC, bank, nomination, and entitlement documents for activation, maturity, closure, or recovery.",
      },
      {
        title: "Coordinate and follow up",
        description: "We track the request with the responsible institution and respond to document queries through completion.",
      },
    ],
    documents: [
      "Passbooks, deposit receipts, NPS or PRAN records, PPF details, or Post Office certificates",
      "Account, customer, deposit, or scheme numbers, if available",
      "PAN and identity and address proof of the holder or claimant",
      "Current bank details and a cancelled cheque",
      "Nomination records, death certificate, and entitlement documents for inherited assets",
      "Old correspondence, maturity advice, or statements issued by the institution",
    ],
    faqs: [
      {
        question: "Which assets are covered by this service?",
        answer: "This service focuses on dormant bank deposits, fixed deposits, NPS, PPF, Post Office savings, and similar assets not covered by our dedicated share, mutual fund, bond, or insurance services.",
      },
      {
        question: "Can you begin if I only have partial records?",
        answer: "Often, yes. Names, dates, an institution, an old address, a receipt, or a passbook entry may be enough to begin identifying the account.",
      },
      {
        question: "Can nominees or family members recover these assets?",
        answer: "They may be able to, subject to the account record and the nomination or entitlement documents required by the institution.",
      },
      {
        question: "Is every institution's process the same?",
        answer: "No. Banks, NPS intermediaries, and Post Office schemes use different forms and verification steps, so we map the process after identifying the asset.",
      },
    ],
  },
];
