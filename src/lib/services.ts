import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export interface ServiceSummary {
  slug: string;
  title: string;
  short_description: string;
  image_url: string | null;
}

export interface Service extends ServiceSummary {
  tagline: string;
  overview: string;
  who_for: string[];
  how_we_help: { title: string; description: string }[];
  documents: string[];
  faqs: { question: string; answer: string }[];
}

export const FALLBACK_SERVICES: Service[] = [
  {
    slug: "labour-law-compliances",
    title: "Labour Law Compliances",
    short_description: "EPF & ESIC registrations, statutory filings, audits, and compliance management.",
    image_url: "/images/service-labour-law.jpg",
    tagline: "Ensuring 100% regulatory compliance, payroll governance, and risk mitigation across all Indian labour enactments.",
    overview:
      "Indian labour laws are extensive and encompass various central and state-specific acts governing employment, workplace safety, social security, and fair compensation. Non-compliance can lead to hefty penalties, legal notices, and operational disruptions.\n\nAt Vitt Management, we provide comprehensive end-to-end Labour Law Compliance and Advisory Services for corporations, startups, factories, and commercial establishments. From initial registrations to monthly return filings, annual statutory audits, register maintenance, and handling government inspections/notices, we ensure your organization operates with complete peace of mind and strict adherence to the law.",
    who_for: [
      "Startups and growing enterprises expanding their workforce",
      "Private Limited, Public Limited, and LLP companies",
      "Factories, manufacturing plants, and industrial establishments",
      "Commercial establishments, retail chains, and IT/ITES firms",
      "Principal employers managing third-party contract labour",
      "Organizations facing statutory notices or undergoing compliance audits",
    ],
    how_we_help: [
      {
        title: "EPF & ESIC Compliance & Monthly Filings",
        description: "New establishment registration, employee code generation, monthly ECR generation, challan preparation, return filings, and claim settlements.",
      },
      {
        title: "Shop & Establishment / Factory Act Governance",
        description: "State-wise registrations, renewals, annual returns, floor compliance, working hour limits, and safety regulations.",
      },
      {
        title: "Contract Labour (CLRA) & Interstate Migrant Worker Compliance",
        description: "Registration certificate (RC) for principal employers, contractor licensing, Form XII registers, and vendor compliance audits.",
      },
      {
        title: "Statutory Register & Payroll Maintenance",
        description: "Maintaining physical/digital registers (Form A, B, C, D, wage registers, muster rolls, overtime, bonus, and gratuity records under applicable codes).",
      },
      {
        title: "Bonus, Gratuity, POSH & Maternity Benefit Advisory",
        description: "Formulation of POSH internal committees, filing annual POSH returns, gratuity trust advisory, and maternity benefit provisions.",
      },
      {
        title: "Labour Department Notice Handling & Liaison",
        description: "Drafting formal responses to inspections/show-cause notices, handling assessments, and representation before Labour Authorities.",
      },
    ],
    documents: [
      "Certificate of Incorporation / Partnership Deed / Business Registration",
      "PAN Card & GST Registration Certificate of the establishment",
      "Proof of registered business premises (Electricity Bill, Rent Agreement, NOC)",
      "Director / Partner / Proprietor KYC documents (PAN, Aadhaar, Photo)",
      "List of employees with joining dates, Aadhaar, PAN, and salary breakup",
      "Existing EPF / ESIC code allotment letters (if already registered)",
      "Specimen signature / Digital Signature Certificate (DSC) of authorized signatory",
    ],
    faqs: [
      {
        question: "When is EPF and ESIC registration mandatory for an organization?",
        answer: "EPF registration is mandatory once an organization crosses 20 or more employees (voluntary registration is also allowed). ESIC registration is mandatory for units with 10 or more employees earning up to ₹21,000 per month (₹25,000 for employees with disability).",
      },
      {
        question: "What are the consequences of non-compliance with Labour Laws in India?",
        answer: "Non-compliance can attract heavy monetary penalties, interest on delayed statutory remittances, recovery proceedings from authorities, and in serious cases, criminal prosecution/imprisonment of directors/principal officers.",
      },
      {
        question: "Can Vitt Management handle compliance audits for our third-party vendors/contractors?",
        answer: "Yes, under the Contract Labour (Regulation and Abolition) Act, principal employers are ultimately held liable for contractor defaults. We conduct complete third-party vendor audits to safeguard your business.",
      },
      {
        question: "How will the new Labour Codes affect existing business compliance?",
        answer: "The upcoming 4 Labour Codes will consolidate 29 existing central labour laws, bringing changes to basic salary definitions, gratuity rules, working hours, and social security. We help organizations restructure policies to stay future-ready.",
      },
    ],
  },
  {
    slug: "iepf-share-dividend-recovery",
    title: "IEPF Claim of Shares and Dividends",
    short_description: "Recover shares and unpaid dividends from IEPF.",
    image_url: "/images/service-iepf.jpg",
    tagline: "Get back shares and dividends that were transferred to the Investor Education and Protection Fund (IEPF).",
    overview:
      "When dividends on shares remain unpaid or unclaimed for seven consecutive years, the company transfers those dividends, and the related shares, to the Investor Education and Protection Fund Authority (IEPF). The good news is that the transfer does not cancel your ownership. As the original shareholder, or as a legal heir, you can apply to get them back.\n\nThe claim involves an online application, supporting documents and coordination with the company and the IEPF authority. A small mistake in the paperwork can cause the claim to be returned. Vitt Management guides you through each stage, prepares your documents and follows up until the claim is resolved.",
    who_for: [
      "You received dividends in the past but stopped receiving them",
      "Your company shares or dividends were transferred to IEPF",
      "You inherited shares from a family member whose holding may now be with IEPF",
      "You hold old share certificates and are not sure of their current status",
      "A company or its registrar has asked you for documents and you do not know where to start",
    ],
    how_we_help: [
      { title: "Check the status", description: "We trace your holding and confirm whether your shares or dividends have been transferred to IEPF." },
      { title: "Assess eligibility", description: "We review whether you are the original holder or a legal heir, and list exactly what is needed." },
      { title: "Prepare the claim", description: "We help you fill in the online claim form (Form IEPF-5) and organise the supporting documents." },
      { title: "Submit and coordinate", description: "We help you submit the claim and coordinate with the company's nodal officer and the IEPF authority." },
      { title: "Track until resolved", description: "We follow up on queries or deficiencies and keep you updated until the shares or dividends are credited." },
    ],
    documents: [
      "PAN card of the claimant",
      "Proof of identity and address, such as Aadhaar or passport",
      "Bank account details with a cancelled cheque or bank statement",
      "Demat account details (client master list) for receiving shares",
      "Old share certificates, dividend warrants or folio details, if available",
      "For legal heirs: death certificate and proof of relationship, such as a legal heir certificate, succession certificate or will",
      "Indemnity bond and other forms as required for your case",
    ],
    faqs: [
      { question: "Have I lost my shares if they were transferred to IEPF?", answer: "No. The transfer does not cancel your ownership. You can claim the shares and dividends back by applying to the IEPF Authority." },
      { question: "Can legal heirs claim on behalf of a deceased shareholder?", answer: "Yes. Legal heirs can apply, and will need to provide documents such as the death certificate and proof of their relationship or entitlement." },
      { question: "How long does the process take?", answer: "The time depends on the company, the IEPF authority and how complete your documents are. After reviewing your case we will give you a realistic idea of the steps involved." },
      { question: "Do I need to know my folio number?", answer: "It helps, but it is not always required. If you only have old certificates or a company name, we can help trace the details." },
    ],
  },
  {
    slug: "physical-shares-to-demat",
    title: "Physical Shares to Demat",
    short_description: "Convert your old physical share certificates to Demat.",
    image_url: "/images/service-demat.jpg",
    tagline: "Convert your old paper share certificates into safe, easy-to-manage electronic (demat) holdings.",
    overview:
      "Share certificates issued on paper can be lost, damaged or forgotten, and they are difficult to sell or transfer. Under current SEBI rules, shares generally have to be held in demat (electronic) form to be traded, so old physical certificates need to be converted (dematerialised) through a Depository Participant.\n\nThe process needs the certificate details to match your KYC records, and mismatches in names, signatures or folio details are a common reason for rejection. We check your documents first, resolve the gaps and guide you through the request so that it goes through smoothly.",
    who_for: [
      "You hold old physical share certificates",
      "You want to sell or transfer shares that are still in paper form",
      "Your name or signature has changed since the certificates were issued",
      "You found certificates among family papers and are unsure if they are valid",
      "You do not yet have a demat account",
    ],
    how_we_help: [
      { title: "Review your certificates", description: "We check your certificates and confirm the company, folio and holder details." },
      { title: "Fix mismatches", description: "We identify gaps such as name, signature or address differences and guide you on resolving them." },
      { title: "Set up your demat account", description: "We help you use an existing demat account or open one with a Depository Participant." },
      { title: "Submit the conversion request", description: "We help prepare and submit the dematerialisation request along with the original certificates." },
      { title: "Follow up until credited", description: "We track the request with the company's registrar until the shares are credited to your demat account." },
    ],
    documents: [
      "Original share certificates",
      "PAN card",
      "Proof of identity and address",
      "Demat account details, such as a client master list or statement",
      "Bank details with a cancelled cheque",
      "Signature proof",
      "Marriage certificate, gazette notification or similar, if your name has changed",
    ],
    faqs: [
      { question: "Are my old share certificates still valid?", answer: "In most cases the shares remain yours, but the certificate's status should be checked with the company or its registrar. We can help you check." },
      { question: "Can I sell shares that are still in physical form?", answer: "Generally, shares need to be in demat form to be traded on the stock exchanges, so conversion is usually the first step." },
      { question: "What if the name on the certificate is different from mine?", answer: "This is common, and can usually be resolved with supporting documents. We will tell you what your case needs." },
      { question: "Do I need to send my original certificates?", answer: "Usually the original certificates are submitted with the conversion request, so we prepare everything carefully before anything is sent." },
    ],
  },
  {
    slug: "transmission-of-shares",
    title: "Transmission of Shares",
    short_description: "Transferring shares of a deceased shareholder to the rightful legal heir.",
    image_url: "/images/service-transmission.jpg",
    tagline: "Help for families to transfer shares to legal heirs or nominees after a shareholder's demise.",
    overview:
      "When a shareholder passes away, their shares do not automatically appear in the names of the family. The shares must be formally transmitted to the nominee or legal heirs by following the procedure of the company and the depository.\n\nEvery case is different, depending on whether there is a nominee, a will, or no will at all. We help you understand which route applies, gather the right documents and deal with the company's registrar so that the process is not delayed by repeated queries.",
    who_for: [
      "You have inherited shares from a parent, spouse or relative",
      "You are named as a nominee in the shareholder's records",
      "The shareholder passed away without a will",
      "You found share certificates or demat statements among the deceased's papers",
      "Several legal heirs need to agree on how the shares are to be held",
    ],
    how_we_help: [
      { title: "Identify the holdings", description: "We help you find out which companies, folios and demat accounts the shares are held in." },
      { title: "Choose the right route", description: "We explain whether transmission is through nomination, a will, a succession certificate or a legal heir certificate." },
      { title: "Prepare the documents", description: "We prepare the claim forms, affidavits, indemnities and supporting papers." },
      { title: "Submit and coordinate", description: "We submit to the company, registrar or depository participant and respond to their queries." },
      { title: "Confirm the transfer", description: "We follow up until the shares are credited to your demat account." },
    ],
    documents: [
      "Death certificate of the shareholder (attested copy)",
      "Original share certificates or demat account statement",
      "Nominee details, if a nomination was made",
      "Proof of relationship, such as a legal heir certificate",
      "Will and probate, or succession certificate, where applicable",
      "Claimant's PAN, identity and address proof",
      "Demat account details of the claimant",
      "Indemnity bond, affidavits and no-objection letters from other heirs, where required",
    ],
    faqs: [
      { question: "Do I need a succession certificate?", answer: "It depends on your case, including the value of the holding, whether there is a nominee and whether a will exists. The company or depository decides what it will accept, and we will tell you what your case is likely to need." },
      { question: "What if there is a nominee?", answer: "Having a nominee can make the process simpler, although requirements vary. We will explain what applies in your case." },
      { question: "What if one of the heirs lives abroad?", answer: "That is fine. Documents can be signed and attested abroad, and we guide you through the requirements." },
      { question: "Can this be done if the shareholder passed away many years ago?", answer: "In many cases, yes. Older cases may need extra documents, and we will help you work out what is required." },
    ],
  },
  {
    slug: "lost-duplicate-share-certificates",
    title: "Lost/Duplicate Share Certificates",
    short_description: "Recover lost, stolen or damaged share certificates.",
    image_url: "/images/service-duplicate.jpg",
    tagline: "Get duplicate certificates for shares whose original certificates are lost, stolen or damaged.",
    overview:
      "If your share certificate has been lost, stolen, destroyed or badly damaged, you can apply to the company for a duplicate. The company must first be satisfied that the original certificate is really missing and that nobody else can claim the shares.\n\nThe process usually involves a police report, an indemnity and other formalities that the company or its registrar will specify. We guide you on the right sequence, prepare the paperwork and follow up with the registrar so that the request is not sent back.",
    who_for: [
      "Your share certificates were lost, misplaced or stolen",
      "Certificates were damaged by water, fire or age",
      "You cannot trace certificates that you know were bought long ago",
      "The company or registrar has asked for documents you do not have",
      "You want to move shares to demat form but the original certificates are missing",
    ],
    how_we_help: [
      { title: "Confirm the holding", description: "We trace the company, folio and certificate details from any records you have." },
      { title: "Explain the requirements", description: "We tell you what the company and its registrar need in your case." },
      { title: "Prepare the paperwork", description: "We help with the police complaint, affidavit, indemnity bond and application." },
      { title: "Submit and follow up", description: "We submit to the registrar and respond to their queries." },
      { title: "Receive your shares", description: "Once approved, the shares are issued to you in the form the company currently allows, which can then be moved to a demat account if you wish." },
    ],
    documents: [
      "Application to the company or registrar for a duplicate certificate",
      "Copy of the police complaint or FIR, for lost or stolen certificates",
      "Affidavit and indemnity bond on stamp paper",
      "Certificate numbers, folio number and distinctive numbers, if available",
      "PAN card and identity and address proof",
      "Bank details with a cancelled cheque",
      "The damaged certificate, in damage cases",
      "Newspaper notice, if the company requires one",
    ],
    faqs: [
      { question: "What if I do not remember the certificate numbers?", answer: "The registrar can often trace the details from the company's records if you know the company name and the holder details. We help you with this." },
      { question: "Is a police complaint mandatory?", answer: "For lost or stolen certificates, companies commonly ask for one. We will confirm what your company requires." },
      { question: "Will I get a paper certificate again?", answer: "Current rules and company practice vary. We will explain what form the shares will be issued in for your case." },
      { question: "Can I sell the shares in the meantime?", answer: "Not until the shares are issued in a tradable form, which is usually demat. Getting them there is the goal." },
    ],
  },
  {
    slug: "unclaimed-dividends",
    title: "Unpaid/Unclaimed Dividends",
    short_description: "Claim your pending dividends from companies.",
    image_url: "/images/service-dividends.jpg",
    tagline: "Claim dividends that companies declared but that never reached your bank account.",
    overview:
      "Dividends can go unpaid for many reasons: an old or closed bank account, a change of address, a missing signature or simply a forgotten folio. When the dividend stays unpaid, the company holds it in an unpaid dividend account, and if it stays unclaimed for seven years it is transferred to IEPF.\n\nIf your dividend is still with the company, you can usually claim it directly from the company or its registrar. If it has already moved to IEPF, we help you claim it from there. We identify where your money currently is and take the right route.",
    who_for: [
      "You stopped receiving dividends from a company you hold shares in",
      "Your bank account or address changed after you bought the shares",
      "You hold dividend warrants that were never encashed",
      "You suspect dividends are pending but do not know which company",
      "You are a legal heir of a shareholder whose dividends were never claimed",
    ],
    how_we_help: [
      { title: "Trace pending dividends", description: "We search for companies and folios where dividends may be pending." },
      { title: "Locate the money", description: "We confirm whether it is still with the company or has moved to IEPF." },
      { title: "Update your details", description: "We help correct bank, address and KYC details in the records." },
      { title: "Raise the claim", description: "We prepare and submit the claim to the company, registrar or IEPF authority." },
      { title: "Follow up", description: "We track the claim until the dividend is paid to your bank account." },
    ],
    documents: [
      "Folio number or demat account details, if available",
      "Old share certificates or dividend warrants",
      "PAN card",
      "Proof of identity and address",
      "Bank account details and a cancelled cheque",
      "Signature proof",
      "For legal heirs: death certificate and proof of relationship",
    ],
    faqs: [
      { question: "Is there a deadline to claim?", answer: "If dividends stay unclaimed for seven years they are transferred to IEPF, but they can still be claimed from there. It is best not to wait." },
      { question: "What if my bank account is closed?", answer: "You can provide new bank details, and we help you update the records." },
      { question: "Do I need my old certificates?", answer: "They help, but claims can often be made with folio or company details, and we help you trace any missing information." },
    ],
  },
  {
    slug: "nri-investment-recovery",
    title: "NRI Investment Recovery",
    short_description: "Assistance for NRIs to recover Indian investments.",
    image_url: "/images/service-nri.jpg",
    tagline: "Recover and manage your investments in India from anywhere in the world.",
    overview:
      "Living abroad makes it harder to keep track of investments in India. Old addresses, changed residential status and paperwork that needs to be done in person are common reasons why NRIs lose touch with their shares, dividends and other holdings.\n\nWe work with you remotely and coordinate with companies, registrars and authorities in India on your behalf where the rules allow. Your residential status also affects how investments are held and how funds can be moved, so we guide you on the documents and procedures that apply to NRIs.",
    who_for: [
      "You live outside India and have shares or deposits held in India",
      "You left India years ago and lost touch with early investments",
      "Your residential status changed after you invested",
      "You have inherited investments in India while living abroad",
      "You need documents attested or signed from another country",
    ],
    how_we_help: [
      { title: "Understand your situation", description: "We review your investments, residential status and what you know of your holdings." },
      { title: "Trace and verify", description: "We locate your holdings and confirm their present status." },
      { title: "Prepare NRI documents", description: "We list the documents you need, including attestation requirements for the country you live in." },
      { title: "Coordinate in India", description: "We liaise with companies and registrars in India on your behalf, where permitted." },
      { title: "Complete and update", description: "We follow up until the recovery is complete and your records are updated." },
    ],
    documents: [
      "Passport with visa or OCI card",
      "PAN card",
      "Overseas address proof",
      "NRE or NRO bank account details",
      "Old certificates, folio or demat details",
      "Attested or notarised copies, as required",
      "Power of attorney, where a representative in India is needed",
    ],
    faqs: [
      { question: "Can I do this without coming to India?", answer: "In many cases, yes. Documents can be signed and attested abroad, and we coordinate the work in India. Some cases may still need in-person steps, and we will tell you upfront." },
      { question: "Can I transfer the money abroad?", answer: "Moving funds out of India is subject to RBI and FEMA rules and to your account type. We can point you to the rules that apply, and you should also speak to a tax or foreign exchange adviser about your own case." },
      { question: "Does my NRI status affect my old investments?", answer: "It can. Residential status affects how some investments are held and reported. We will flag what applies to you." },
    ],
  },
  {
    slug: "pf-recovery-assistance",
    title: "PF Recovery Assistance",
    short_description: "Help with Provident Fund claims and withdrawals.",
    image_url: "/images/service-pf.jpg",
    tagline: "Get help with Provident Fund claims, transfers and withdrawals.",
    overview:
      "Many people change jobs several times and end up with old Provident Fund (PF) accounts they have not touched for years. Problems such as mismatched details, missing KYC, inactive accounts or rejected claims can leave that money stuck.\n\nWe help you sort out your PF details, correct records and file the right claim. Whether the issue is a rejected claim, a transfer between employers or an account you have lost track of, we guide you step by step.",
    who_for: [
      "You changed jobs and never withdrew or transferred your old PF",
      "Your PF claim was rejected or returned",
      "Your name, date of birth or bank details do not match in PF records",
      "You cannot remember your UAN or old member ID",
      "You are a family member seeking the PF of a deceased member",
    ],
    how_we_help: [
      { title: "Locate your accounts", description: "We help you find your UAN and old PF accounts." },
      { title: "Check the records", description: "We look for mismatches in name, date of birth, KYC and bank details." },
      { title: "Correct the details", description: "We guide you on getting the records corrected, including through your employer where required." },
      { title: "File the claim", description: "We prepare and help submit the withdrawal, transfer or settlement claim." },
      { title: "Follow up", description: "We track the claim and respond to rejections or queries." },
    ],
    documents: [
      "UAN or old PF member ID, if available",
      "Aadhaar, PAN and bank account details",
      "Cancelled cheque or bank passbook",
      "Service details of past employers",
      "Previous salary slips or offer letters",
      "For a deceased member: death certificate and proof of relationship",
    ],
    faqs: [
      { question: "What if I do not know my UAN?", answer: "It can usually be traced with your other details, and we help you with that." },
      { question: "Why was my claim rejected?", answer: "Common reasons include KYC mismatches, wrong bank details or details that differ between records. We find the reason and help you fix it." },
      { question: "Can I claim the PF of a family member who passed away?", answer: "Yes, eligible family members or nominees can claim, and we guide you on the documents needed." },
    ],
  },
  {
    slug: "other-financial-asset-assistance",
    title: "Other Financial Assets Recovery Assistance",
    short_description: "Trace and recover unclaimed bank deposits, insurance, mutual funds, bonds and other financial assets.",
    image_url: "/images/service-other-assets.jpg",
    tagline: "Help with mutual funds, insurance, bank deposits, bonds and other assets that have gone unclaimed.",
    overview:
      "Forgotten money is not limited to shares. Inactive bank deposits, old insurance policies, mutual fund folios, bonds and debentures can also go unclaimed, especially after a change of address or the death of the investor.\n\nWe help you work out what you may hold, find the institution that is now responsible and prepare the claim. Each type of asset has its own rules and forms, so we guide you through the process that applies to yours.",
    who_for: [
      "You suspect a family member had bank deposits, insurance or mutual funds that nobody knows about",
      "An old policy or deposit matured but you never received the money",
      "You hold bonds or debentures whose status you are unsure of",
      "You are a legal heir sorting out a person's financial affairs",
      "You want help identifying what you might be owed",
    ],
    how_we_help: [
      { title: "Discuss your case", description: "You tell us what you know or suspect." },
      { title: "Identify the assets", description: "We help work out which institutions may hold something for you." },
      { title: "Verify the status", description: "We confirm whether the asset is active, matured, inactive or unclaimed." },
      { title: "Prepare the claim", description: "We prepare the forms and documents that each institution needs." },
      { title: "Follow up", description: "We track the claim until the money or units reach you." },
    ],
    documents: [
      "Policy documents, fixed deposit receipts, passbooks or statements",
      "Any account, folio or policy numbers you have",
      "PAN card and identity and address proof",
      "Bank account details and a cancelled cheque",
      "For legal heirs: death certificate, and legal heir or succession documents",
      "Nomination details, where available",
    ],
    faqs: [
      { question: "Which assets can you help with?", answer: "Mutual funds, insurance, bank deposits, bonds and similar financial assets. If you are not sure whether we can help, just ask us." },
      { question: "What if I have no documents?", answer: "We can often start from names, dates and the institution's name, though more documents make the process easier." },
      { question: "Do I have to know the account numbers?", answer: "It helps, but it is not essential. We can help you trace them." },
    ],
  },
];

// Active services in display order. Falls back to static fallback data if database is unreachable.
const FALLBACK_SERVICE_ORDER = new Map([
  ["iepf-share-dividend-recovery", 1],
  ["physical-shares-to-demat", 2],
  ["transmission-of-shares", 3],
  ["lost-duplicate-share-certificates", 4],
  ["unclaimed-dividends", 5],
  ["nri-investment-recovery", 6],
  ["pf-recovery-assistance", 7],
  ["other-financial-asset-assistance", 16],
  ["labour-law-compliances", 11],
]);

const SERVICE_TITLE_ORDER = [
  [/^iepf\b/i, 1],
  [/^physical shares to demat$/i, 2],
  [/^transmission of shares$/i, 3],
  [/^lost\s*\/?\s*duplicate share certificates$/i, 4],
  [/^unpaid\s*\/?\s*unclaimed dividends$/i, 5],
  [/^nri investment recovery$/i, 6],
  [/^pf recovery assistance$/i, 7],
  [/^mutual funds.*bonds recovery$/i, 8],
  [/^insurance claims.*unclaimed insurance$/i, 9],
  [/^(esi|gst).*pf compliance$/i, 10],
  [/^labour law compliances?$/i, 11],
  [/^tax\s*&\s*gst compliance$/i, 12],
  [/^itr filing.*tax consultancy$/i, 13],
  [/^company\s*&\s*llp registrations?$/i, 14],
  [/^roc\s*&\s*mca compliance$/i, 15],
  [/^other financial assets? recovery assistance$/i, 16],
] as const;

function normalizeServiceSummary<T extends ServiceSummary>(service: T): T {
  if (/^mutual funds.*bonds recovery$/i.test(service.title)) {
    return { ...service, title: "Mutual Funds and Bonds Recovery" };
  }
  if (/^insurance claims.*unclaimed insurance$/i.test(service.title)) {
    return { ...service, title: "Insurance Claims – Unclaimed Insurance" };
  }
  if (/^(esi|gst).*pf compliance$/i.test(service.title)) {
    return {
      ...service,
      title: "ESI and PF Compliance",
      short_description: "ESI and PF registration, filings, audits and compliance support.",
      image_url: "/images/service-pf.jpg",
    };
  }
  if (/^other financial asset assistance$/i.test(service.title)) {
    return {
      ...service,
      title: "Other Financial Assets Recovery Assistance",
      short_description: "Trace and recover unclaimed bank deposits, insurance, mutual funds, bonds and other financial assets.",
    };
  }
  return service;
}

function serviceOrder(service: Pick<ServiceSummary, "slug" | "title">): number {
  const slugOrder = FALLBACK_SERVICE_ORDER.get(service.slug);
  if (slugOrder !== undefined) return slugOrder;

  const titleOrder = SERVICE_TITLE_ORDER.find(([pattern]) => pattern.test(service.title))?.[1];
  return titleOrder ?? Number.MAX_SAFE_INTEGER;
}

function sortServices<T extends Pick<ServiceSummary, "slug" | "title">>(services: T[]): T[] {
  return services
    .map((service, index) => ({ service, index }))
    .sort((a, b) => serviceOrder(a.service) - serviceOrder(b.service) || a.index - b.index)
    .map(({ service }) => service);
}

function getFallbackServiceSummaries(): ServiceSummary[] {
  return sortServices(FALLBACK_SERVICES).map(({ slug, title, short_description, image_url }) => ({
    slug,
    title,
    short_description,
    image_url,
  }));
}

export async function getServices(): Promise<ServiceSummary[]> {
  try {
    const { data, error } = await createAdminClient()
      .from("services")
      .select("slug, title, short_description, image_url")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.warn("Could not load services from Supabase, using fallback:", error.message);
      return getFallbackServiceSummaries();
    }
    return sortServices(data.map(normalizeServiceSummary));
  } catch (err) {
    console.warn("Error fetching services, using fallback:", err);
    return getFallbackServiceSummaries();
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const { data, error } = await createAdminClient()
      .from("services")
      .select("slug, title, short_description, image_url, tagline, overview, who_for, how_we_help, documents, faqs")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();

    if (error || !data) {
      if (error) console.warn(`Could not load service "${slug}" from Supabase:`, error.message);
      const fallback = FALLBACK_SERVICES.find((s) => s.slug === slug);
      return fallback ?? null;
    }
    return (data as Service | null) ?? null;
  } catch (err) {
    console.warn(`Error fetching service "${slug}", using fallback:`, err);
    const fallback = FALLBACK_SERVICES.find((s) => s.slug === slug);
    return fallback ?? null;
  }
}
