// Loads (or refreshes) the service pages content in the `services` table.
// Safe to re-run: rows are matched on `slug` and overwritten with the content below.
// Usage: node scripts/seed-services.mjs
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const env = Object.fromEntries(
  readFileSync(new URL("../.env", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).trim()])
);
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const step = (title, description) => ({ title, description });
const faq = (question, answer) => ({ question, answer });

const services = [
  {
    slug: "iepf-share-dividend-recovery",
    title: "IEPF Share & Dividend Recovery",
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
      step("Check the status", "We trace your holding and confirm whether your shares or dividends have been transferred to IEPF."),
      step("Assess eligibility", "We review whether you are the original holder or a legal heir, and list exactly what is needed."),
      step("Prepare the claim", "We help you fill in the online claim form (Form IEPF-5) and organise the supporting documents."),
      step("Submit and coordinate", "We help you submit the claim and coordinate with the company's nodal officer and the IEPF authority."),
      step("Track until resolved", "We follow up on queries or deficiencies and keep you updated until the shares or dividends are credited."),
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
      faq("Have I lost my shares if they were transferred to IEPF?", "No. The transfer does not cancel your ownership. You can claim the shares and dividends back by applying to the IEPF Authority."),
      faq("Can legal heirs claim on behalf of a deceased shareholder?", "Yes. Legal heirs can apply, and will need to provide documents such as the death certificate and proof of their relationship or entitlement."),
      faq("How long does the process take?", "The time depends on the company, the IEPF authority and how complete your documents are. After reviewing your case we will give you a realistic idea of the steps involved."),
      faq("Do I need to know my folio number?", "It helps, but it is not always required. If you only have old certificates or a company name, we can help trace the details."),
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
      step("Review your certificates", "We check your certificates and confirm the company, folio and holder details."),
      step("Fix mismatches", "We identify gaps such as name, signature or address differences and guide you on resolving them."),
      step("Set up your demat account", "We help you use an existing demat account or open one with a Depository Participant."),
      step("Submit the conversion request", "We help prepare and submit the dematerialisation request along with the original certificates."),
      step("Follow up until credited", "We track the request with the company's registrar until the shares are credited to your demat account."),
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
      faq("Are my old share certificates still valid?", "In most cases the shares remain yours, but the certificate's status should be checked with the company or its registrar. We can help you check."),
      faq("Can I sell shares that are still in physical form?", "Generally, shares need to be in demat form to be traded on the stock exchanges, so conversion is usually the first step."),
      faq("What if the name on the certificate is different from mine?", "This is common, and can usually be resolved with supporting documents. We will tell you what your case needs."),
      faq("Do I need to send my original certificates?", "Usually the original certificates are submitted with the conversion request, so we prepare everything carefully before anything is sent."),
    ],
  },
  {
    slug: "transmission-of-shares",
    title: "Transmission of Shares",
    short_description: "Assistance for inherited shares after a shareholder's demise.",
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
      step("Identify the holdings", "We help you find out which companies, folios and demat accounts the shares are held in."),
      step("Choose the right route", "We explain whether transmission is through nomination, a will, a succession certificate or a legal heir certificate."),
      step("Prepare the documents", "We prepare the claim forms, affidavits, indemnities and supporting papers."),
      step("Submit and coordinate", "We submit to the company, registrar or depository participant and respond to their queries."),
      step("Confirm the transfer", "We follow up until the shares are credited to your demat account."),
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
      faq("Do I need a succession certificate?", "It depends on your case, including the value of the holding, whether there is a nominee and whether a will exists. The company or depository decides what it will accept, and we will tell you what your case is likely to need."),
      faq("What if there is a nominee?", "Having a nominee can make the process simpler, although requirements vary. We will explain what applies in your case."),
      faq("What if one of the heirs lives abroad?", "That is fine. Documents can be signed and attested abroad, and we guide you through the requirements."),
      faq("Can this be done if the shareholder passed away many years ago?", "In many cases, yes. Older cases may need extra documents, and we will help you work out what is required."),
    ],
  },
  {
    slug: "lost-duplicate-share-certificates",
    title: "Lost / Duplicate Share Certificates",
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
      step("Confirm the holding", "We trace the company, folio and certificate details from any records you have."),
      step("Explain the requirements", "We tell you what the company and its registrar need in your case."),
      step("Prepare the paperwork", "We help with the police complaint, affidavit, indemnity bond and application."),
      step("Submit and follow up", "We submit to the registrar and respond to their queries."),
      step("Receive your shares", "Once approved, the shares are issued to you in the form the company currently allows, which can then be moved to a demat account if you wish."),
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
      faq("What if I do not remember the certificate numbers?", "The registrar can often trace the details from the company's records if you know the company name and the holder details. We help you with this."),
      faq("Is a police complaint mandatory?", "For lost or stolen certificates, companies commonly ask for one. We will confirm what your company requires."),
      faq("Will I get a paper certificate again?", "Current rules and company practice vary. We will explain what form the shares will be issued in for your case."),
      faq("Can I sell the shares in the meantime?", "Not until the shares are issued in a tradable form, which is usually demat. Getting them there is the goal."),
    ],
  },
  {
    slug: "unclaimed-dividends",
    title: "Unpaid / Unclaimed Dividends",
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
      step("Trace pending dividends", "We search for companies and folios where dividends may be pending."),
      step("Locate the money", "We confirm whether it is still with the company or has moved to IEPF."),
      step("Update your details", "We help correct bank, address and KYC details in the records."),
      step("Raise the claim", "We prepare and submit the claim to the company, registrar or IEPF authority."),
      step("Follow up", "We track the claim until the dividend is paid to your bank account."),
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
      faq("Is there a deadline to claim?", "If dividends stay unclaimed for seven years they are transferred to IEPF, but they can still be claimed from there. It is best not to wait."),
      faq("What if my bank account is closed?", "You can provide new bank details, and we help you update the records."),
      faq("Do I need my old certificates?", "They help, but claims can often be made with folio or company details, and we help you trace any missing information."),
    ],
  },
  {
    slug: "forgotten-shares-search",
    title: "Old / Forgotten Shares Search",
    short_description: "Trace your lost or forgotten investments.",
    image_url: "/images/service-forgotten-shares.jpg",
    tagline: "Trace shares and investments that you or your family may have forgotten about.",
    overview:
      "Many families have investments made decades ago that nobody remembers: shares bought by a parent, a few certificates in an old cupboard, or a company that has since changed its name or merged. These forgotten holdings can be worth recovering.\n\nWe start with whatever you have, even a single old paper or a company name, and search for where the holding stands today. Companies change names, merge and shift registrars, so tracing takes patience and knowing where to look.",
    who_for: [
      "You found old share certificates or papers among family belongings",
      "A relative mentioned investing in shares but left no records",
      "The company name on your certificate no longer exists",
      "You have not checked on old investments in many years",
      "You want a clear picture of what you or your family may be owed",
    ],
    how_we_help: [
      step("Gather the clues", "We review the papers, names and details you have, however incomplete."),
      step("Trace the company", "We follow name changes, mergers and registrar changes to find where the holding is now."),
      step("Check the status", "We confirm whether the shares are held with the company, in demat, or with IEPF."),
      step("Report and advise", "We give you a clear summary of what exists and what can be recovered."),
      step("Recover", "If you wish, we take the case forward under the appropriate service."),
    ],
    documents: [
      "Old share certificates, letters or dividend warrants",
      "Old bank passbooks or statements showing dividend credits",
      "Any names, folio numbers or company names you remember",
      "PAN card and identity proof",
      "For family holdings: proof of relationship to the original holder",
    ],
    faqs: [
      faq("What if I only remember the company name?", "That can be enough to start. We search from what you have."),
      faq("What if the company no longer exists?", "Companies are often renamed or merged rather than closed, and holdings usually carry over. We trace what happened."),
      faq("Will you find everything?", "We cannot promise to find every holding, since it depends on how much information is available, but we will give you an honest picture of what we find."),
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
      step("Understand your situation", "We review your investments, residential status and what you know of your holdings."),
      step("Trace and verify", "We locate your holdings and confirm their present status."),
      step("Prepare NRI documents", "We list the documents you need, including attestation requirements for the country you live in."),
      step("Coordinate in India", "We liaise with companies and registrars in India on your behalf, where permitted."),
      step("Complete and update", "We follow up until the recovery is complete and your records are updated."),
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
      faq("Can I do this without coming to India?", "In many cases, yes. Documents can be signed and attested abroad, and we coordinate the work in India. Some cases may still need in-person steps, and we will tell you upfront."),
      faq("Can I transfer the money abroad?", "Moving funds out of India is subject to RBI and FEMA rules and to your account type. We can point you to the rules that apply, and you should also speak to a tax or foreign exchange adviser about your own case."),
      faq("Does my NRI status affect my old investments?", "It can. Residential status affects how some investments are held and reported. We will flag what applies to you."),
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
      step("Locate your accounts", "We help you find your UAN and old PF accounts."),
      step("Check the records", "We look for mismatches in name, date of birth, KYC and bank details."),
      step("Correct the details", "We guide you on getting the records corrected, including through your employer where required."),
      step("File the claim", "We prepare and help submit the withdrawal, transfer or settlement claim."),
      step("Follow up", "We track the claim and respond to rejections or queries."),
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
      faq("What if I do not know my UAN?", "It can usually be traced with your other details, and we help you with that."),
      faq("Why was my claim rejected?", "Common reasons include KYC mismatches, wrong bank details or details that differ between records. We find the reason and help you fix it."),
      faq("Can I claim the PF of a family member who passed away?", "Yes, eligible family members or nominees can claim, and we guide you on the documents needed."),
    ],
  },
  {
    slug: "other-financial-asset-assistance",
    title: "Other Financial Asset Assistance",
    short_description: "Mutual funds, insurance, bank deposits, bonds and more.",
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
      step("Discuss your case", "You tell us what you know or suspect."),
      step("Identify the assets", "We help work out which institutions may hold something for you."),
      step("Verify the status", "We confirm whether the asset is active, matured, inactive or unclaimed."),
      step("Prepare the claim", "We prepare the forms and documents that each institution needs."),
      step("Follow up", "We track the claim until the money or units reach you."),
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
      faq("Which assets can you help with?", "Mutual funds, insurance, bank deposits, bonds and similar financial assets. If you are not sure whether we can help, just ask us."),
      faq("What if I have no documents?", "We can often start from names, dates and the institution's name, though more documents make the process easier."),
      faq("Do I have to know the account numbers?", "It helps, but it is not essential. We can help you trace them."),
    ],
  },
];

const rows = services.map((s, i) => ({ ...s, sort_order: i, is_active: true }));
const { error } = await db.from("services").upsert(rows, { onConflict: "slug" });
if (error) {
  console.error("Seed failed:", error.message);
  process.exit(1);
}
console.log(`Seeded ${rows.length} services.`);
