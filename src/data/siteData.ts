export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  isSpecial?: boolean;
  ctaText?: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  location: string;
  avatar?: string;
  rating?: number;
}

export interface StatItem {
  value: string;
  label: string;
  icon: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "iepf-recovery",
    title: "IEPF Share & Dividend Recovery",
    description: "Recover shares and unpaid dividends from IEPF.",
    image: "/images/service-iepf.jpg",
  },
  {
    id: "physical-to-demat",
    title: "Physical Shares to Demat",
    description: "Convert your old physical share certificates to Demat.",
    image: "/images/service-demat.jpg",
  },
  {
    id: "transmission-shares",
    title: "Transmission of Shares",
    description: "Assistance for inherited shares after a shareholder's demise.",
    image: "/images/service-transmission.jpg",
  },
  {
    id: "duplicate-shares",
    title: "Lost / Duplicate Share Certificates",
    description: "Recover lost, stolen or damaged share certificates.",
    image: "/images/service-duplicate.jpg",
  },
  {
    id: "unclaimed-dividends",
    title: "Unpaid / Unclaimed Dividends",
    description: "Claim your pending dividends from companies.",
    image: "/images/service-dividends.jpg",
  },
  {
    id: "nri-recovery",
    title: "NRI Investment Recovery",
    description: "Assistance for NRIs to recover Indian investments.",
    image: "/images/service-nri.jpg",
  },
  {
    id: "pf-recovery",
    title: "PF Recovery Assistance",
    description: "Help with Provident Fund claims and withdrawals.",
    image: "/images/service-pf.jpg",
  },
  {
    id: "other-financial-assets",
    title: "Other Financial Asset Assistance",
    description: "NPS, PPF, Post Office Savings and more.",
    image: "/images/service-other-assets.jpg",
  },
  {
    id: "expert-consultation",
    title: "Not Sure What You Have?",
    description: "Let us help you identify your assets.",
    isSpecial: true,
    ctaText: "Talk to an Expert",
  },
];

export const processSteps: StepItem[] = [
  {
    number: "01",
    title: "Tell Us About Your Case",
    description: "Share available details (company, folio, certificates, old documents)",
    icon: "file-text",
  },
  {
    number: "02",
    title: "We Trace & Evaluate",
    description: "We identify what exists and where the asset currently stands",
    icon: "search",
  },
  {
    number: "03",
    title: "We Offer Commercials",
    description: "Finalise the scope of work, proposal sent and MoU signed between the parties.",
    icon: "clipboard-check",
  },
  {
    number: "04",
    title: "We Build, Prepare & Submit",
    description: "Requisite forms and documentation prepared and submitted",
    icon: "file-check",
  },
  {
    number: "05",
    title: "We Coordinate",
    description: "Follow up with company, RTA, IEPF authority and other stakeholders",
    icon: "users",
  },
  {
    number: "06",
    title: "We Track & Resolve",
    description: "We handle queries, deficiencies and procedural requirements",
    icon: "settings",
  },
  {
    number: "07",
    title: "Recovery",
    description: "Approved assets are credited/transferred through the prescribed process",
    icon: "shield-check",
  },
];

export const statsData: StatItem[] = [
  {
    value: "100+",
    label: "Clients",
    icon: "smile",
  },
  {
    value: "₹ 10 Cr+",
    label: "Recovered",
    icon: "coins",
  },
  {
    value: "99%",
    label: "Client Satisfaction",
    icon: "award",
  },
  {
    value: "30+",
    label: "Years of Combined Work Experience",
    icon: "shield",
  },
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: "1",
    quote: "Vitt Management helped me recover shares that my father had bought in the 1990s. I had almost given up hope!",
    author: "Ashok Singhania",
    location: "Mumbai",
    avatar: "/images/client-ashok.jpg",
  },
  {
    id: "2",
    quote: "As an NRI, I was worried about the process, but the team made it simple and handled everything smoothly.",
    author: "Radhika Menon",
    location: "Dubai",
    avatar: "/images/client-radhika.jpg",
  },
  {
    id: "3",
    quote: "Professional, transparent and knowledgeable. Highly recommended for IEPF and share recovery.",
    author: "Amit Verma",
    location: "Bengaluru",
  },
  {
    id: "4",
    quote: "Exceptional service! They recovered our ancestral physical shares and dematerialized them in record time without any hassle.",
    author: "Sunil Kothari",
    location: "Ahmedabad",
    avatar: "/images/client-sunil.jpg",
  },
  {
    id: "5",
    quote: "My old PF balance from two previous employers was stuck due to date of exit & KYC mismatch. Vitt Management coordinated everything with the EPFO and got the complete claim settled directly into my account!",
    author: "Vikram Malhotra",
    location: "Gurugram",
  },
];

export const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Partner with Us", href: "/partner-with-us" },
  { name: "Blogs", href: "/blog" },
  { name: "FAQs", href: "/faq" },
  { name: "Our Services", href: "/#services" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Contact", href: "/contact" },
];

export const serviceOptions = [
  { value: "iepf", label: "IEPF Share & Dividend Recovery" },
  { value: "demat", label: "Physical Shares to Demat" },
  { value: "transmission", label: "Transmission of Shares" },
  { value: "duplicate", label: "Lost / Duplicate Share Certificates" },
  { value: "dividends", label: "Unpaid / Unclaimed Dividends" },
  { value: "nri", label: "NRI Investment Recovery" },
  { value: "pf", label: "PF Recovery" },
  { value: "other", label: "Other" },
];
