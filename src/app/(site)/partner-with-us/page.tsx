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
  PhoneCall,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import PartnerForm from "@/components/partner/PartnerForm";
import { getSiteContact } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Partner with Us | Professional Recovery Collaboration | Vitt Management",
  description:
    "Join the Vitt Management Partner Program and connect clients with documentation support, process coordination, and recovery assistance for unclaimed financial assets.",
};

const benefits = [
  {
    icon: Coins,
    title: "Rewarding Referral Opportunities",
    text: "Earn an agreed referral commission when a client you introduce completes a successful asset recovery engagement.",
  },
  {
    icon: FileCheck2,
    title: "Documentation & Process Support",
    text: "We help organise required documents, coordinate with RTAs and relevant authorities, and keep each recovery process moving.",
  },
  {
    icon: Handshake,
    title: "Strengthen Client Relationships",
    text: "Extend dependable recovery assistance to clients with forgotten or unclaimed financial assets while preserving the trust you have built.",
  },
  {
    icon: TrendingUp,
    title: "Meaningful Recovery Opportunities",
    text: "Help clients address old physical shares, unclaimed dividends, IEPF claims, and other financial assets through a structured process.",
  },
  {
    icon: UserCheck,
    title: "Dedicated Partner Manager",
    text: "You receive a single point of contact who provides direct support, regular status updates, and transparent tracking for all your referrals.",
  },
  {
    icon: Zap,
    title: "Transparent Referral Payouts",
    text: "Receive clear payout updates and the agreed referral commission after a successful case completion and client receipt.",
  },
];

const targetPartners = [
  {
    icon: Building2,
    role: "Chartered Accountants (CAs)",
    desc: "Extend organised documentation and recovery coordination to clients with legacy share folios, unclaimed dividends, or old investments.",
  },
  {
    icon: TrendingUp,
    role: "Financial Advisors & MFDs",
    desc: "Connect clients with support for old physical shares, unclaimed investments, and Demat-related recovery processes.",
  },
  {
    icon: Briefcase,
    role: "Stock Brokers & Sub-brokers",
    desc: "Help clients navigate documentation for inactive accounts, lost share certificates, name mismatches, and signature updates.",
  },
  {
    icon: FileCheck2,
    role: "Company Secretaries & Compliance Professionals",
    desc: "Collaborate on documentation-intensive recovery cases that require organised records, RTA coordination, and structured follow-ups.",
  },
  {
    icon: Users,
    role: "Consultants & Networkers",
    desc: "Introduce HNIs, NRI families, and business owners who may need professional assistance with unclaimed financial assets.",
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
    title: "Introduce Your Client",
    desc: "With the client's consent, share their contact details and any available folio or asset information for an initial review.",
  },
  {
    num: "03",
    title: "We Coordinate the Process",
    desc: "Our recovery team reviews available records, provides documentation checklists, coordinates with RTAs and relevant authorities, and tracks progress.",
  },
  {
    num: "04",
    title: "Stay Updated & Earn",
    desc: "Your Partner Manager shares milestone updates, and the agreed referral commission is processed after successful recovery.",
  },
];

const partnerFaqs = [
  {
    q: "How does the partner commission structure work?",
    a: "Referral commissions are based on the case type, scope, and recovered asset value. Your Partner Manager will explain the applicable structure and payout milestones before a referral begins.",
  },
  {
    q: "Do I have to manage the documentation or client follow-up?",
    a: "No. Vitt Management provides document checklists, coordinates recovery-related communication, follows up on process milestones, and keeps both you and the client informed.",
  },
  {
    q: "What types of cases can I refer?",
    a: "You can refer clients who need assistance with IEPF recovery, physical share dematerialisation, share transmission documentation, lost certificates, unclaimed dividends, NRI investments, PF claims, or other unclaimed financial assets.",
  },
  {
    q: "How will I know the progress of my referred clients?",
    a: "Your dedicated Partner Manager provides milestone updates from the initial document review and process submission through follow-ups, approval, and recovery.",
  },
  {
    q: "Is client confidentiality protected?",
    a: "Yes. Client records and financial information are handled through controlled processes and shared only with the teams and institutions required for the recovery engagement.",
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

          {/* Main Headline */}
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
            Build Value Through <span style={{ color: "#dfb87c" }}>Professional Collaboration</span>
          </h1>

          {/* Partnership Overview */}
          <p
            style={{
              fontSize: "clamp(1.1rem, 2.2vw, 1.3rem)",
              lineHeight: 1.65,
              color: "#e3ebe6",
              maxWidth: "820px",
              marginBottom: "36px",
            }}
          >
            Connect clients who need help recovering shares, dividends, or other financial assets. We provide
            documentation support, process coordination, and regular progress updates while you remain informed and earn
            on successful referrals.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
            <a
              href="#partner-register-form"
              className="btn-primary-gold"
              style={{ padding: "16px 36px", fontSize: "1.05rem" }}
            >
              Join the Partner Network <ArrowRight size={18} style={{ marginLeft: "6px" }} />
            </a>
            <a
              href={contact.phoneHref || "tel:+919275231114"}
              className="svc-banner-outline"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "15px 28px" }}
            >
              <PhoneCall size={18} />
              <span>Speak With Our Partnership Team</span>
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
                Zero Upfront Cost
              </div>
              <div style={{ color: "#c0cdc6", fontSize: "0.95rem", marginTop: "4px" }}>No joining fee for referral partners</div>
            </div>
            <div>
              <div style={{ color: "var(--gold-light)", fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 700 }}>
                Coordinated Support
              </div>
              <div style={{ color: "#c0cdc6", fontSize: "0.95rem", marginTop: "4px" }}>Documentation and process coordination</div>
            </div>
            <div>
              <div style={{ color: "var(--gold-light)", fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 700 }}>
                Transparent Rewards
              </div>
              <div style={{ color: "#c0cdc6", fontSize: "0.95rem", marginTop: "4px" }}>Clear referral terms and payout updates</div>
            </div>
            <div>
              <div style={{ color: "var(--gold-light)", fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 700 }}>
                Pan-India Reach
              </div>
              <div style={{ color: "#c0cdc6", fontSize: "0.95rem", marginTop: "4px" }}>Collaboration with professionals nationwide</div>
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
              Why Collaborate With Vitt Management
            </h2>
            <p style={{ color: "var(--text-body)", fontSize: "1.1rem", lineHeight: 1.6 }}>
              Extend dependable recovery assistance to your clients while our team coordinates documentation,
              communication, and progress tracking.
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
              Who Can Join Our Partner Network?
            </h2>
            <p style={{ color: "var(--text-body)", fontSize: "1.08rem", lineHeight: 1.6 }}>
              Professionals who support individuals, families, and businesses can collaborate with us to connect clients
              with a structured asset recovery process.
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
              How Our Collaboration Works
            </h2>
            <p style={{ color: "#d1dcd5", fontSize: "1.08rem", lineHeight: 1.6 }}>
              A clear, coordinated workflow that keeps you informed and gives every referred client structured support.
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
                  What You Receive as a Vitt Partner
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    "Clear referral terms and commission structure",
                    "A dedicated Partner Manager and recovery coordination team",
                    "Preliminary review of available folio and asset information",
                    "Documentation checklists tailored to each recovery process",
                    "Regular case progress updates by email or WhatsApp",
                    "Transparent payout updates after successful recovery",
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
                    Want to Discuss a Referral?
                  </span>
                </div>
                <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 700, marginBottom: "8px" }}>
                  Speak With Our Partnership Team
                </h4>
                <p style={{ color: "#c0cdc6", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "20px" }}>
                  Have questions about referrals, documentation support, or coordinating multiple client cases? Our team
                  can walk you through the next steps.
                </p>
                <a
                  href={contact.phoneHref || "tel:+919275231114"}
                  className="btn-primary-gold"
                  style={{ width: "100%", justifyContent: "center", padding: "14px 20px" }}
                >
                  Call Partnership Team
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
              Partner Programme FAQs
            </h2>
            <p style={{ color: "var(--text-body)", fontSize: "1.05rem" }}>
              Clear answers about referrals, coordination, communication, and payouts.
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
