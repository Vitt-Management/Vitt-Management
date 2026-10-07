"use client";

import React, { useActionState, useEffect, useState } from "react";
import { submitPartnerInquiry, type PartnerFormState } from "@/app/(site)/partner-with-us/actions";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

const initialState: PartnerFormState = {
  status: "idle",
  message: "",
  values: { name: "", email: "", phone: "", profession: "", city: "", message: "" },
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "var(--text-headline)",
  marginBottom: "8px",
};

const professionOptions = [
  { value: "Chartered Accountant (CA) / Tax Consultant", label: "Chartered Accountant (CA) / Tax Consultant" },
  { value: "Financial Advisor / MFD / Wealth Manager", label: "Financial Advisor / MFD / Wealth Manager" },
  { value: "Stock Broker / Remisier", label: "Stock Broker / Sub-broker / Remisier" },
  { value: "Company Secretary / Compliance Professional", label: "Company Secretary / Compliance Professional" },
  { value: "Independent Agent / Networker", label: "Independent Agent / Networker" },
  { value: "Corporate / Business Consultant", label: "Corporate / Business Consultant" },
  { value: "Other", label: "Other" },
];

export default function PartnerForm() {
  const [state, formAction, pending] = useActionState(submitPartnerInquiry, initialState);
  const [dismissed, setDismissed] = useState<PartnerFormState | null>(null);
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
      id="partner-register-form"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lg)",
        padding: "clamp(24px, 5vw, 44px)",
      }}
    >
      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--gold-pale)", color: "var(--gold-dark)", padding: "6px 14px", borderRadius: "var(--radius-full)", fontSize: "0.85rem", fontWeight: 700, marginBottom: "16px" }}>
        <Sparkles size={16} />
        <span>PROFESSIONAL PARTNER NETWORK</span>
      </div>

      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)", fontWeight: 700, color: "var(--text-headline)", marginBottom: "8px" }}>
        Start a Professional Collaboration
      </h2>
      <p style={{ fontSize: "1.02rem", color: "var(--text-body)", marginBottom: "28px", lineHeight: 1.6 }}>
        Share your details and referral interests. Our partnership team will connect with you to explain the process and next steps.
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
            Partnership Request Submitted!
          </h3>
          <p style={{ fontSize: "1.02rem", color: "var(--text-body)", marginBottom: "24px", maxWidth: "480px", margin: "0 auto 24px", lineHeight: 1.6 }}>
            Thank you for your interest in collaborating with Vitt Management. Our partner desk will review your details and connect with you shortly.
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
              Send another request
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

          <div>
            <label htmlFor="pf-name" style={labelStyle}>
              Your Full Name *
            </label>
            <input
              id="pf-name"
              name="name"
              placeholder="e.g. Rajesh Sharma"
              className="form-input contact-input"
              required
              maxLength={200}
              autoComplete="name"
              defaultValue={v.name}
            />
          </div>

          <div className="contact-form-row">
            <div>
              <label htmlFor="pf-email" style={labelStyle}>
                Email Address *
              </label>
              <input
                id="pf-email"
                name="email"
                type="email"
                placeholder="rajesh@example.com"
                className="form-input contact-input"
                required
                maxLength={320}
                autoComplete="email"
                defaultValue={v.email}
              />
            </div>
            <div>
              <label htmlFor="pf-phone" style={labelStyle}>
                Phone / WhatsApp *
              </label>
              <input
                id="pf-phone"
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
          </div>

          <div className="contact-form-row">
            <div>
              <label htmlFor="pf-profession" style={labelStyle}>
                Your Profession / Role *
              </label>
              <select
                id="pf-profession"
                name="profession"
                className="form-input contact-input"
                required
                defaultValue={v.profession}
              >
                <option value="">Select your profession</option>
                {professionOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pf-city" style={labelStyle}>
                City / Location
              </label>
              <input
                id="pf-city"
                name="city"
                placeholder="e.g. Mumbai, Delhi, Ahmedabad"
                className="form-input contact-input"
                maxLength={100}
                defaultValue={v.city}
              />
            </div>
          </div>

          <div>
            <label htmlFor="pf-message" style={labelStyle}>
              Referral Needs or Questions (Optional)
            </label>
            <textarea
              id="pf-message"
              name="message"
              className="form-input contact-input"
              rows={4}
              maxLength={5000}
              style={{ resize: "vertical" }}
              placeholder="Tell us about the clients or recovery needs you would like to refer, such as IEPF claims, lost shares, or Demat support"
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
            {pending ? "Sending Request..." : "Send Partnership Request"}
          </button>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "16px", color: "var(--text-muted)", fontSize: "0.88rem" }}>
            <ShieldCheck size={16} style={{ color: "var(--gold-primary)" }} />
            <span>Secure Records • Transparent Referral Terms • Dedicated Partner Manager</span>
          </div>
        </form>
      )}
    </div>
  );
}
