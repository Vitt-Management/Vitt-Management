import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  FileSearch,
  HelpCircle,
  Lock,
  PhoneCall,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import CheckSharesForm from "@/components/shares/CheckSharesForm";
import { getSiteContact } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Check Your Shares | Trace & Recover Old Investments | Vitt Management",
  description:
    "Please tell us the basic information (Whatever the information is available with you) about your Old Shares/Lost Investment and our experts will get back to you.",
};

const helpfulTips = [
  {
    title: "Don't have the Folio Number?",
    text: "No problem. Mention 'Not Available' in the form. Our specialists can search RTA databases using the shareholder's name and old registered address.",
  },
  {
    title: "Shareholder is Deceased?",
    text: "Provide the late shareholder's name as recorded on old documents. We will guide you through the legal heir transmission and succession documentation step-by-step.",
  },
  {
    title: "Lost Physical Certificates?",
    text: "Even if physical papers are lost or destroyed, we trace the company register, establish title, and obtain duplicate certificates or direct IEPF demat credits.",
  },
  {
    title: "Old Address Changed?",
    text: "Provide the historical address where the dividend cheques or AGM notices used to arrive. It is key for matching registrar records.",
  },
];

const checkFaqs = [
  {
    q: "Is the initial share check and feasibility audit free?",
    a: "Yes, 100% complimentary. We evaluate your details, search available databases, and give you a clear roadmap of recovery with zero upfront obligation.",
  },
  {
    q: "What if I only have a company name and an old dividend slip?",
    a: "That is sufficient to start. Fill in the company name, shareholder name, and whatever address was on the slip, and our team will trace the folio.",
  },
  {
    q: "How long does it take for your experts to respond?",
    a: "Our share recovery specialists review your case and reach out via phone/WhatsApp within 24 to 48 business hours with the status and next steps.",
  },
  {
    q: "Is my personal and financial information secure?",
    a: "Yes. All shareholder details and documents shared with Vitt Management are protected by strict confidentiality and non-disclosure standards.",
  },
];

export default async function CheckYourSharesPage() {
  const contact = await getSiteContact();

  return (
    <>
      {/* Hero Banner */}
      <section style={{ position: "relative", overflow: "hidden", backgroundColor: "#101c16" }}>
        <Image
          src="/images/cta-desk-mug.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.32 }}
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
            <span aria-current="page">Check your Shares</span>
          </nav>

          {/* Main Title */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.4rem, 5.5vw, 3.8rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#ffffff",
              marginBottom: "18px",
              maxWidth: "880px",
            }}
          >
            Check Your <span style={{ color: "#dfb87c" }}>Shares</span>
          </h1>

          {/* Exact Subtitle Requested */}
          <p
            style={{
              fontSize: "clamp(1.1rem, 2.2vw, 1.3rem)",
              lineHeight: 1.65,
              color: "#e3ebe6",
              maxWidth: "820px",
              marginBottom: "32px",
            }}
          >
            Please tell us the basic information (Whatever the information is available with you) about your Old Shares/Lost Investment and our experts will get back to you.
          </p>

          {/* Quick Action */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
            <a
              href="#check-shares-form"
              className="btn-primary-gold"
              style={{ padding: "16px 36px", fontSize: "1.05rem" }}
            >
              Start Free Share Search <ArrowRight size={18} style={{ marginLeft: "6px" }} />
            </a>
            <a
              href={contact.phoneHref || "tel:+919275231114"}
              className="svc-banner-outline"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "15px 28px" }}
            >
              <PhoneCall size={18} />
              <span>Talk to Tracing Expert</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Form & Assistance Grid */}
      <section style={{ backgroundColor: "var(--bg-page)", padding: "80px 0 96px" }}>
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "start",
            }}
          >
            {/* Form */}
            <div>
              <CheckSharesForm />
            </div>

            {/* Sidebar Guidance & Support */}
            <div>
              {/* Guidance Box */}
              <div
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-lg)",
                  padding: "clamp(24px, 5vw, 36px)",
                  boxShadow: "var(--shadow-sm)",
                  marginBottom: "28px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <Sparkles size={22} style={{ color: "var(--gold-primary)" }} />
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--text-headline)",
                    }}
                  >
                    What If You Have Incomplete Info?
                  </h3>
                </div>
                <p style={{ color: "var(--text-body)", fontSize: "0.98rem", lineHeight: 1.6, marginBottom: "22px" }}>
                  Most investors don’t have complete records for ancestral or 20-30 year old investments. That is completely normal:
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  {helpfulTips.map((tip, idx) => (
                    <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <CheckCircle2 size={18} style={{ color: "var(--gold-primary)", flexShrink: 0, marginTop: "3px" }} />
                      <div>
                        <strong style={{ display: "block", color: "var(--text-headline)", fontSize: "0.98rem", marginBottom: "3px" }}>
                          {tip.title}
                        </strong>
                        <span style={{ color: "var(--text-body)", fontSize: "0.92rem", lineHeight: 1.55 }}>
                          {tip.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Support Card */}
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
                    Prefer to Speak Directly?
                  </span>
                </div>
                <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", fontWeight: 700, marginBottom: "8px" }}>
                  Speak with our Case Assessment Officer
                </h4>
                <p style={{ color: "#c0cdc6", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "20px" }}>
                  Have an urgent claim or multiple family portfolios? Give us a call directly for instant consultation.
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

      {/* Frequently Asked Questions */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 0", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container-custom" style={{ maxWidth: "880px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="section-tag" style={{ color: "var(--gold-dark)" }}>
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="section-title" style={{ marginTop: "8px", marginBottom: "14px" }}>
              How Share Tracing Works
            </h2>
            <p style={{ color: "var(--text-body)", fontSize: "1.05rem" }}>
              Quick answers about our verification, tracing, and recovery procedures.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {checkFaqs.map((faq, idx) => (
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
