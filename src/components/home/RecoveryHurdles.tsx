import React from "react";
import Link from "next/link";
import { 
  MapPin, 
  FileQuestion, 
  Coins, 
  UserMinus, 
  FileEdit, 
  FileText, 
  Building2, 
  FileWarning, 
  Globe,
  ArrowRight
} from "lucide-react";

const hurdles = [
  {
    icon: MapPin,
    title: "Changed Addresses",
    desc: "Communication lost due to outdated residential records.",
  },
  {
    icon: FileQuestion,
    title: "Lost Certificates",
    desc: "Missing, misplaced, or damaged original share certificates.",
  },
  {
    icon: Coins,
    title: "Unpaid Dividends",
    desc: "Unclaimed payouts accumulating over multiple years.",
  },
  {
    icon: UserMinus,
    title: "Shareholder's Demise",
    desc: "Complex legal transmission & inheritance procedures.",
  },
  {
    icon: FileEdit,
    title: "Name Discrepancies",
    desc: "Spelling variations, maiden names, or mismatch with PAN/Aadhaar.",
  },
  {
    icon: FileText,
    title: "Physical Certificates",
    desc: "Mandatory dematerialisation and folio conversion requirements.",
  },
  {
    icon: Building2,
    title: "Transfer of Shares to IEPF",
    desc: "Assets moved to Investor Education and Protection Fund authority.",
  },
  {
    icon: FileWarning,
    title: "Incomplete Documentation",
    desc: "Deficiencies, missing KYC, or non-compliant paperwork.",
  },
  {
    icon: Globe,
    title: "Living Overseas",
    desc: "Cross-border regulatory hurdles and NRI compliance.",
  },
];

export default function RecoveryHurdles() {
  return (
    <section 
      style={{ 
        backgroundColor: "#faf8f5", 
        paddingTop: "72px", 
        paddingBottom: "80px", 
        borderBottom: "1px solid #e7dfcf",
        position: "relative"
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto 48px auto" }}>
          <span className="section-tag" style={{ color: "#a47336", letterSpacing: "0.15em", marginBottom: "12px" }}>
            Asset Recovery Challenges
          </span>
          <h2 
            className="section-title"
            style={{ 
              fontSize: "clamp(2rem, 3.2vw, 2.75rem)", 
              lineHeight: 1.25, 
              color: "#131f18",
              marginBottom: "16px"
            }}
          >
            Your Old Investment/Wealth Shouldn&apos;t Get Lost in the Hurdles of the Process.
          </h2>
          <p 
            style={{ 
              fontSize: "1.05rem", 
              color: "#526057", 
              fontWeight: 500,
              lineHeight: 1.6
            }}
          >
            Old investments can become difficult to access because of:
          </p>
        </div>

        {/* 9 Hurdles Grid */}
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "20px",
            marginBottom: "48px"
          }}
        >
          {hurdles.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e7dfcf",
                borderRadius: "14px",
                padding: "22px 20px",
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                boxShadow: "0 2px 8px rgba(22, 38, 29, 0.04)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
              }}
              className="hurdle-card"
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(184, 134, 70, 0.12)",
                  color: "#a47336",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 
                  style={{ 
                    fontSize: "1rem", 
                    fontWeight: 700, 
                    color: "#131f18", 
                    marginBottom: "4px",
                    lineHeight: 1.3
                  }}
                >
                  {title}
                </h3>
                <p 
                  style={{ 
                    fontSize: "0.86rem", 
                    color: "#6b7770", 
                    lineHeight: 1.45,
                    margin: 0 
                  }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Resolution & CTA Banner */}
        <div
          style={{
            backgroundColor: "#131f18",
            color: "#ffffff",
            borderRadius: "18px",
            padding: "32px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
            boxShadow: "0 14px 34px -8px rgba(19, 31, 24, 0.35)",
            border: "1px solid rgba(184, 134, 70, 0.35)"
          }}
          className="hurdles-cta-banner"
        >
          <div style={{ maxWidth: "620px" }}>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.15rem, 2vw, 1.4rem)",
                fontWeight: 600,
                lineHeight: 1.4,
                color: "#f5f3ef",
                margin: 0
              }}
            >
              We help you identify what exists, understand where it stands and navigate the recovery process.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link
              href="#services"
              style={{
                color: "#e2c490",
                fontSize: "0.95rem",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 14px",
                transition: "color 0.2s ease"
              }}
              className="hurdles-explore-link"
            >
              Explore Our Services <ArrowRight size={16} />
            </Link>

            <Link
              href="/contact"
              className="btn-primary-gold"
              style={{
                fontSize: "0.96rem",
                padding: "13px 28px",
                whiteSpace: "nowrap"
              }}
            >
              Start Your Recovery
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
