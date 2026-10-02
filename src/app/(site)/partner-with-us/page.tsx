import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Coins,
  FileCheck2,
  Handshake,
  HelpCircle,
  PhoneCall,
  Scale,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import PartnerForm from "@/components/partner/PartnerForm";
import { getSiteContact } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Partner with Us | Make Your Network Into Your Passive Income | Vitt Management",
  description:
    "Join the Vitt Management Partner Program. Refer clients with stuck shares, IEPF claims, or physical demat issues. We handle all legal & recovery work — you earn referral commissions.",
};

const benefits = [
  {
    icon: Coins,
    title: "Attractive Passive Income",
    text: "Earn a high-percentage referral commission on every successful asset recovery case without investing upfront capital.",
  },
  {
    icon: Scale,
    title: "Zero Legal & Recovery Hassle",
    text: "We take care of all documentation, IEPF filings, RTA correspondence, court probate, and government procedures end-to-end.",
  },
  {
    icon: Handshake,
    title: "Monetize Existing Client Trust",
    text: "Provide your existing clients with a high-value recovery solution for their forgotten or disputed wealth, enhancing your credibility.",
  },
  {
    icon: TrendingUp,
    title: "High-Ticket Case Value",
    text: "Physical shares and unclaimed dividends often carry valuations in lakhs and crores, translating into substantial referral earnings.",
  },
  {
    icon: UserCheck,
    title: "Dedicated Partner Manager",
    text: "You receive a single point of contact who provides direct support, regular status updates, and transparent tracking for all your referrals.",
  },
  {
    icon: Zap,
    title: "Prompt Commission Payouts",
    text: "Referral payouts are disbursed directly to your bank account promptly upon case settlement and client receipt.",
  },
];

const targetPartners = [
  {
    icon: Building2,
    role: "Chartered Accountants (CAs)",
    desc: "Help your audit & tax clients resolve legacy share folios, unclaimed dividends, and corporate transmission bottlenecks without consuming your billable hours.",
  },
  {
    icon: TrendingUp,
    role: "Financial Advisors & MFDs",
    desc: "Unlock your clients' stuck ancestral wealth and convert old physical shares to Demat so they can seamlessly reinvest into active portfolios.",
  },
  {
    icon: Briefcase,
    role: "Stock Brokers & Sub-brokers",
    desc: "Address inactive accounts, lost share certificates, name mismatches, and signature changes for your client base smoothly.",
  },
  {
    icon: Scale,
    role: "Lawyers & Legal Practitioners",
    desc: "Partner with us for succession certificates, legal heirship disputes, probate executions, and estate transmission cases.",
  },
  {
    icon: Users,
    role: "Consultants & Networkers",
    desc: "If you have connections with HNIs, NRI families, or business owners with unclaimed financial assets, monetize your network effortlessly.",
  },
];

const steps = [
  {
    num: "01",
    title: "Connect & Register",
    desc: "Submit your basic details to register as a verified partner and connect with your dedicated Partner Manager.",
  },
  {
    num: "02",
    title: "Refer Your Client",
    desc: "Share your client's contact details or basic folio info. We perform a complimentary claim & feasibility audit.",
  },
  {
    num: "03",
    title: "We Handle All Legal Work",
    desc: "Our recovery team manages RTA liaisons, IEPF documentation, legal filings, and follow-ups with authorities.",
  },
  {
    num: "04",
    title: "Earn Referral Commission",
    desc: "Upon successful recovery of the assets/funds, your commission is directly credited with full transparency.",
  },
];

const partnerFaqs = [
  {
    q: "How does the partner commission structure work?",
    a: "We offer attractive, tiered referral commissions based on the case type and recovered asset valuation. Our Partner Manager will share the detailed agreement and commission slabs upon registration.",
  },
  {
    q: "Do I have to do any paperwork, legal filings, or client follow-up?",
    a: "No. Vitt Management handles 100% of the legal, documentation, RTA, and IEPF recovery procedures. Your role is solely to make the initial client introduction.",
  },
  {
    q: "What types of cases can I refer?",
    a: "You can refer any cases involving IEPF recovery, physical share dematerialization, transmission of shares, lost share certificates, unclaimed dividends, NRI investment recovery, and old PF/financial claims.",
  },
  {
    q: "How will I know the progress of my referred clients?",
    a: "Your dedicated Partner Manager provides milestone updates at every key stage — from document verification and RTA submission to final approval and disbursement.",
  },
  {
    q: "Is client confidentiality protected?",
    a: "Absolutely. All client records and financial details are protected by strict non-disclosure practices and handled exclusively by certified recovery specialists.",
  },
];

export default async function PartnerWithUsPage() {
  const contact = await getSiteContact();

  return (
    <>
      {/* Hero Banner */}
      <section style={{ position: "relative", overflow: "hidden", backgroundColor: "#101c16" }}>
        <Image
          src="/images/hero-investments.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.28 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(11,19,15,0.96) 0%, rgba(16,28,22,0.85) 60%, rgba(11,19,15,0.7) 100%)",
          }}
        />

        <div className="container-custom" style={{ position: "relative", paddingTop: "68px", paddingBottom: "88px" }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="svc-breadcrumb" style={{ marginBottom: "22px" }}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Partner with Us</span>
          </nav>

          {/* Main Headline Requested by User */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.4rem, 5.5vw, 3.8rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#ffffff",
              marginBottom: "20px",
              maxWidth: "880px",
            }}
          >
            Make Your Network Into your <span style={{ color: "#dfb87c" }}>Passive Income</span>
          </h1>

          {/* Exact Subheadline / Pitch Requested */}
          <p
            style={{
              fontSize: "clamp(1.1rem, 2.2vw, 1.3rem)",
              lineHeight: 1.65,
              color: "#e3ebe6",
              maxWidth: "820px",
              marginBottom: "36px",
            }}
          >
            Just Refer clients who are facing difficulties in recovering their wealth and leave the rest to us. We do
            all the legal &amp; recovery work — you earn a referral commission on every successful case.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
            <a
              href="#partner-register-form"
              className="btn-primary-gold"
              style={{ padding: "16px 36px", fontSize: "1.05rem" }}
            >
              Become a Partner <ArrowRight size={18} style={{ marginLeft: "6px" }} />
            </a>
            <a
              href={contact.phoneHref || "tel:+919275231114"}
              className="svc-banner-outline"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "15px 28px" }}
            >
              <PhoneCall size={18} />
              <span>Talk to Partner Lead</span>
            </a>
          </div>
        </div>
      </section>

      {/* Program Highlights Strip */}
      <section style={{ backgroundColor: "#182820", borderBottom: "1px solid rgba(184, 134, 70, 0.2)", padding: "28px 0" }}>
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "24px",
              textAlign: "center",
            }}
          >
            <div>
              <div style={{ color: "var(--gold-light)", fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 700 }}>
                100% Risk-Free
              </div>
              <div style={{ color: "#c0cdc6", fontSize: "0.95rem", marginTop: "4px" }}>Zero upfront investment required</div>
            </div>
            <div>
              <div style={{ color: "var(--gold-light)", fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 700 }}>
                End-to-End
              </div>
              <div style={{ color: "#c0cdc6", fontSize: "0.95rem", marginTop: "4px" }}>Full legal &amp; RTA processing by Vitt</div>
            </div>
            <div>
              <div style={{ color: "var(--gold-light)", fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 700 }}>
                High Payouts
              </div>
              <div style={{ color: "#c0cdc6", fontSize: "0.95rem", marginTop: "4px" }}>Attractive commission per closed case</div>
            </div>
            <div>
              <div style={{ color: "var(--gold-light)", fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 700 }}>
                Pan-India
              </div>
              <div style={{ color: "#c0cdc6", fontSize: "0.95rem", marginTop: "4px" }}>Network of CAs, Advisors &amp; Lawyers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner with Us */}
      <section style={{ backgroundColor: "var(--bg-page)", padding: "80px 0" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 56px" }}>
            <span className="section-tag" style={{ color: "var(--gold-dark)" }}>
              PARTNER ADVANTAGES
            </span>
            <h2 className="section-title" style={{ marginTop: "8px", marginBottom: "16px" }}>
              Why Professionals Partner With Vitt Management
            </h2>
            <p style={{ color: "var(--text-body)", fontSize: "1.1rem", lineHeight: 1.6 }}>
              Unlock the monetization potential of dormant and stuck wealth in your network without deviating from your
              core practice.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "28px",
            }}
          >
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-md)",
                    padding: "32px 28px",
                    boxShadow: "var(--shadow-sm)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "12px",
                      backgroundColor: "var(--gold-pale)",
                      color: "var(--gold-dark)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={26} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--text-headline)",
                        marginBottom: "8px",
                      }}
                    >
                      {b.title}
                    </h3>
                    <p style={{ color: "var(--text-body)", fontSize: "0.98rem", lineHeight: 1.6 }}>{b.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who Can Partner With Us */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 0", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 52px" }}>
            <span className="section-tag" style={{ color: "var(--gold-dark)" }}>
              IDEAL PARTNERS
            </span>
            <h2 className="section-title" style={{ marginTop: "8px", marginBottom: "16px" }}>
              Who Can Become a Partner?
            </h2>
            <p style={{ color: "var(--text-body)", fontSize: "1.08rem", lineHeight: 1.6 }}>
              Whether you are an established financial institution, an independent practitioner, or a well-connected
              professional, you can start earning immediately.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {targetPartners.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.role}
                  style={{
                    backgroundColor: "var(--bg-page)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-md)",
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        backgroundColor: "#101c16",
                        color: "var(--gold-light)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <h3 style={{ fontSize: "1.18rem", fontWeight: 700, color: "var(--text-headline)" }}>
                      {item.role}
                    </h3>
                  </div>
                  <p style={{ color: "var(--text-body)", fontSize: "0.95rem", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section style={{ backgroundColor: "#101c16", color: "#ffffff", padding: "84px 0" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 56px" }}>
            <span
              style={{
                color: "var(--gold-light)",
                fontSize: "0.9rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              SIMPLE 4-STEP WORKFLOW
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 700,
                color: "#ffffff",
                marginTop: "8px",
                marginBottom: "16px",
              }}
            >
              How the Referral Process Works
            </h2>
            <p style={{ color: "#d1dcd5", fontSize: "1.08rem", lineHeight: 1.6 }}>
              A straightforward, transparent mechanism designed to deliver maximum value to you and your clients.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
              position: "relative",
            }}
          >
            {steps.map((s) => (
              <div
                key={s.num}
                style={{
                  backgroundColor: "#182820",
                  border: "1px solid rgba(184, 134, 70, 0.25)",
                  borderRadius: "var(--radius-md)",
                  padding: "32px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "2.4rem",
                    fontWeight: 700,
                    color: "var(--gold-light)",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff" }}>{s.title}</h3>
                <p style={{ color: "#c0cdc6", fontSize: "0.95rem", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Registration Form & Details Grid */}
      <section style={{ backgroundColor: "var(--bg-page)", padding: "88px 0" }}>
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "start",
            }}
          >
            {/* Left Column: Form */}
            <div>
              <PartnerForm />
            </div>

            {/* Right Column: Perks & Support */}
            <div>
              <div
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-lg)",
                  padding: "clamp(24px, 5vw, 40px)",
                  boxShadow: "var(--shadow-sm)",
                  marginBottom: "28px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "var(--text-headline)",
                    marginBottom: "16px",
                  }}
                >
                  What You Get as a Vitt Partner
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    "Standardized Partner Referral Agreement with clear commission percentages",
                    "Direct liaison with dedicated Claim Specialists & Legal Associates",
                    "Zero liability or operational friction on your end",
                    "Free preliminary folio searches & claim viability audits for your clients",
                    "Regular email/WhatsApp case progress reports",
                    "Fast commission release upon claim payout",
                  ].map((perk, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <CheckCircle2 size={20} style={{ color: "var(--gold-primary)", flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ color: "var(--text-body)", fontSize: "0.98rem", lineHeight: 1.5 }}>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Contact Card */}
              <div
                style={{
                  backgroundColor: "#101c16",
                  color: "#ffffff",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px",
                  border: "1px solid rgba(184, 134, 70, 0.3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--gold-light)", marginBottom: "12px" }}>
                  <PhoneCall size={20} />
                  <span style={{ fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Prefer Direct Discussion?
                  </span>
                </div>
                <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 700, marginBottom: "8px" }}>
                  Speak with our Partnership Team
                </h4>
                <p style={{ color: "#c0cdc6", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "20px" }}>
                  Have questions regarding commission structures or multiple corporate client cases? Call our direct partner line.
                </p>
                <a
                  href={contact.phoneHref || "tel:+919275231114"}
                  className="btn-primary-gold"
                  style={{ width: "100%", justifyContent: "center", padding: "14px 20px" }}
                >
                  Call {contact.phone || "+91 92752 31114"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner FAQs */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 0", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container-custom" style={{ maxWidth: "880px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="section-tag" style={{ color: "var(--gold-dark)" }}>
              COMMON QUESTIONS
            </span>
            <h2 className="section-title" style={{ marginTop: "8px", marginBottom: "14px" }}>
              Frequently Asked Questions by Partners
            </h2>
            <p style={{ color: "var(--text-body)", fontSize: "1.05rem" }}>
              Everything you need to know about partnering with Vitt Management.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {partnerFaqs.map((faq, idx) => (
              <details
                key={idx}
                style={{
                  backgroundColor: "var(--bg-page)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  padding: "20px 24px",
                  cursor: "pointer",
                }}
              >
                <summary
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--text-headline)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span>{faq.q}</span>
                </summary>
                <p
                  style={{
                    marginTop: "14px",
                    color: "var(--text-body)",
                    fontSize: "0.98rem",
                    lineHeight: 1.65,
                    borderTop: "1px solid var(--border-light)",
                    paddingTop: "12px",
                  }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
