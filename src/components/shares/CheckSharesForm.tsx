"use client";

import React, { useActionState, useEffect, useState } from "react";
import { submitCheckShares, type CheckSharesFormState } from "@/app/(site)/check-your-shares/actions";
import { CheckCircle2, FileSearch, HelpCircle, Search, ShieldCheck } from "lucide-react";

const initialState: CheckSharesFormState = {
  status: "idle",
  message: "",
  values: {
    shareholderName: "",
    companyName: "",
    folioNumber: "",
    addressOnRecord: "",
    phone: "",
    email: "",
    message: "",
  },
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "var(--text-headline)",
  marginBottom: "8px",
};

export default function CheckSharesForm() {
  const [state, formAction, pending] = useActionState(submitCheckShares, initialState);
  const [dismissed, setDismissed] = useState<CheckSharesFormState | null>(null);
  const showSuccess = state.status === "success" && dismissed !== state;
  const v = state.values;

  // Auto-trigger mail client redirection upon submission
  useEffect(() => {
    if (state.status === "success" && state.mailtoUrl && dismissed !== state) {
      const timer = setTimeout(() => {
        window.location.href = state.mailtoUrl!;
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [state, dismissed]);

  return (
    <div
      id="check-shares-form"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lg)",
        padding: "clamp(24px, 5vw, 40px)",
      }}
    >
      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--gold-pale)", color: "var(--gold-dark)", padding: "6px 14px", borderRadius: "var(--radius-full)", fontSize: "0.85rem", fontWeight: 700, marginBottom: "16px" }}>
        <FileSearch size={16} />
        <span>COMPLIMENTARY ASSET SEARCH &amp; TRACING</span>
      </div>

      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)", fontWeight: 700, color: "var(--text-headline)", marginBottom: "8px" }}>
        Tell Us About Your Investments
      </h2>
      <p style={{ fontSize: "1rem", color: "var(--text-body)", marginBottom: "26px", lineHeight: 1.6 }}>
        Fill in whatever information is currently available with you. Even partial details (like company name and shareholder name) are enough for our team to initiate preliminary tracing.
      </p>

      {showSuccess ? (
        <div style={{ textAlign: "center", padding: "36px 16px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "#e8f5e9",
              color: "#2e7d32",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <CheckCircle2 size={42} />
          </div>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-headline)", marginBottom: "10px" }}>
            Details Submitted Successfully!
          </h3>
          <p style={{ fontSize: "1.02rem", color: "var(--text-body)", marginBottom: "24px", maxWidth: "480px", margin: "0 auto 24px", lineHeight: 1.6 }}>
            Your case information has been securely received by our recovery desk. Our experts will review your details and contact you within 24 hours.
          </p>

          <div>
            <button
              type="button"
              onClick={() => setDismissed(state)}
              style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--gold-dark)",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Check details for another company / folio
            </button>
          </div>
        </div>
      ) : (
        <form action={formAction} className="contact-form">
          {/* Honeypot field */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }}
          />

          {/* Shareholder Name & Company Name */}
          <div className="contact-form-row">
            <div>
              <label htmlFor="cs-shareholder" style={labelStyle}>
                Name of Shareholder *
              </label>
              <input
                id="cs-shareholder"
                name="shareholderName"
                placeholder="e.g. Ramesh Chandra Sharma (or Late ...)"
                className="form-input contact-input"
                required
                maxLength={200}
                defaultValue={v.shareholderName}
              />
            </div>
            <div>
              <label htmlFor="cs-company" style={labelStyle}>
                Company Name *
              </label>
              <input
                id="cs-company"
                name="companyName"
                placeholder="e.g. Reliance, ITC, Tata Motors, L&T"
                className="form-input contact-input"
                required
                maxLength={200}
                defaultValue={v.companyName}
              />
            </div>
          </div>

          {/* Folio Number & Address */}
          <div className="contact-form-row">
            <div>
              <label htmlFor="cs-folio" style={labelStyle}>
                Folio Number (If available)
              </label>
              <input
                id="cs-folio"
                name="folioNumber"
                placeholder="e.g. 0012345 / Don't have"
                className="form-input contact-input"
                maxLength={100}
                defaultValue={v.folioNumber}
              />
            </div>
            <div>
              <label htmlFor="cs-address" style={labelStyle}>
                Address of Investments (As per Company Records)
              </label>
              <input
                id="cs-address"
                name="addressOnRecord"
                placeholder="e.g. Old ancestral address / City & State"
                className="form-input contact-input"
                maxLength={300}
                defaultValue={v.addressOnRecord}
              />
            </div>
          </div>

          {/* Phone & Email */}
          <div className="contact-form-row">
            <div>
              <label htmlFor="cs-phone" style={labelStyle}>
                Your Phone / WhatsApp *
              </label>
              <input
                id="cs-phone"
                name="phone"
                type="tel"
                placeholder="+91 92752 31114"
                className="form-input contact-input"
                required
                maxLength={30}
                autoComplete="tel"
                defaultValue={v.phone}
              />
            </div>
            <div>
              <label htmlFor="cs-email" style={labelStyle}>
                Your Email Address *
              </label>
              <input
                id="cs-email"
                name="email"
                type="email"
                placeholder="yourname@example.com"
                className="form-input contact-input"
                required
                maxLength={320}
                autoComplete="email"
                defaultValue={v.email}
              />
            </div>
          </div>

          {/* Message / Details */}
          <div>
            <label htmlFor="cs-message" style={labelStyle}>
              Message &amp; Any Available Details (Certificates, Demat status, etc.)
            </label>
            <textarea
              id="cs-message"
              name="message"
              className="form-input contact-input"
              rows={4}
              maxLength={5000}
              style={{ resize: "vertical" }}
              placeholder="Tell us what documents you have (physical certificate copy, dividend warrant, old letters) or if the shareholder has passed away."
              defaultValue={v.message}
            />
          </div>

          {state.status === "error" && (
            <div
              role="alert"
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#b3261e",
                background: "#fdf2f2",
                padding: "12px 16px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid #f8b4b4",
              }}
            >
              {state.message}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="btn-primary-gold"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "16px 24px",
              fontSize: "1.1rem",
              opacity: pending ? 0.7 : 1,
              marginTop: "8px",
            }}
          >
            {pending ? "Submitting Case Details..." : "Check My Shares Now"}
          </button>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "16px", color: "var(--text-muted)", fontSize: "0.88rem" }}>
            <ShieldCheck size={16} style={{ color: "var(--gold-primary)" }} />
            <span>100% Confidential • Free Initial Viability Audit • Zero Obligation</span>
          </div>
        </form>
      )}
    </div>
  );
}
