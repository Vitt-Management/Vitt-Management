"use client";

import React, { useActionState, useEffect, useState } from "react";
import { serviceOptions } from "@/data/siteData";
import { submitContact, type ContactFormState } from "@/app/(site)/contact/actions";
import { CheckCircle2, FileText } from "lucide-react";

const initialState: ContactFormState = {
  status: "idle",
  message: "",
  values: {
    name: "",
    phone: "",
    email: "",
    city: "",
    service: "",
    message: "",
    howHeard: "",
  },
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "var(--text-headline)",
  marginBottom: "8px",
};

const hearAboutOptions = [
  "Google Search",
  "Social Media (LinkedIn, Instagram, Facebook)",
  "Friend / Family Recommendation",
  "Chartered Accountant / Financial Advisor",
  "News / Media Article",
  "Other",
];

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [dismissed, setDismissed] = useState<ContactFormState | null>(null);
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
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
        padding: "clamp(24px, 5vw, 36px)",
      }}
    >
      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.7rem, 3.5vw, 2.1rem)", fontWeight: 700, color: "var(--text-headline)", marginBottom: "8px" }}>
        Tell us about your case
      </h2>
      <p style={{ fontSize: "1rem", color: "var(--text-body)", marginBottom: "26px", lineHeight: 1.6 }}>
        Only <strong>Name</strong> and <strong>Phone</strong> are mandatory. Rest of the information is optional.
      </p>

      {showSuccess ? (
        <div style={{ textAlign: "center", padding: "36px 12px" }}>
          <div style={{ width: "68px", height: "68px", borderRadius: "50%", background: "#e8f5e9", color: "#2e7d32", fontSize: "2rem", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
            <CheckCircle2 size={38} />
          </div>
          <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text-headline)", marginBottom: "8px" }}>Inquiry Submitted Successfully!</h3>
          <p style={{ fontSize: "1.02rem", color: "var(--text-body)", marginBottom: "24px", lineHeight: 1.6 }}>
            Thank you for reaching out. We have received your case details and our recovery team will get back to you within 24 hours.
          </p>

          <button onClick={() => setDismissed(state)} style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--gold-dark)", textDecoration: "underline", cursor: "pointer" }}>
            Submit another query
          </button>
        </div>
      ) : (
        <form action={formAction} className="contact-form">
          {/* Honeypot: hidden from people, bots fill it in */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }} />

          {/* Name and Phone (Both Mandatory) */}
          <div className="contact-form-row">
            <div>
              <label htmlFor="cf-name" style={labelStyle}>
                Name *
              </label>
              <input
                id="cf-name"
                name="name"
                placeholder="e.g. Rahul Sharma"
                className="form-input contact-input"
                required
                maxLength={200}
                autoComplete="name"
                defaultValue={v.name}
              />
            </div>
            <div>
              <label htmlFor="cf-phone" style={labelStyle}>
                Phone *
              </label>
              <input
                id="cf-phone"
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

          {/* Email and City (Optional) */}
          <div className="contact-form-row">
            <div>
              <label htmlFor="cf-email" style={labelStyle}>
                Email <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: "0.85rem" }}>(Optional)</span>
              </label>
              <input
                id="cf-email"
                name="email"
                type="email"
                placeholder="yourname@example.com"
                className="form-input contact-input"
                maxLength={320}
                autoComplete="email"
                defaultValue={v.email}
              />
            </div>
            <div>
              <label htmlFor="cf-city" style={labelStyle}>
                City <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: "0.85rem" }}>(Optional)</span>
              </label>
              <input
                id="cf-city"
                name="city"
                placeholder="e.g. Mumbai, Delhi, Bengaluru"
                className="form-input contact-input"
                maxLength={100}
                defaultValue={v.city}
              />
            </div>
          </div>

          {/* Service and How did you hear about us (Optional) */}
          <div className="contact-form-row">
            <div>
              <label htmlFor="cf-service" style={labelStyle}>
                Service <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: "0.85rem" }}>(Optional)</span>
              </label>
              <select id="cf-service" name="service" className="form-input contact-input" defaultValue={v.service}>
                <option value="">Select a service (Optional)</option>
                {serviceOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="cf-howHeard" style={labelStyle}>
                How did you hear about us? <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: "0.85rem" }}>(Optional)</span>
              </label>
              <select id="cf-howHeard" name="howHeard" className="form-input contact-input" defaultValue={v.howHeard}>
                <option value="">Select an option</option>
                {hearAboutOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Message (Optional) */}
          <div>
            <label htmlFor="cf-message" style={labelStyle}>
              Message <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: "0.85rem" }}>(Optional)</span>
            </label>
            <textarea
              id="cf-message"
              name="message"
              className="form-input contact-input"
              rows={4}
              maxLength={5000}
              style={{ resize: "vertical" }}
              placeholder="Briefly describe your case or any specific questions"
              defaultValue={v.message}
            />
          </div>

          {state.status === "error" && (
            <p role="alert" style={{ fontSize: "1rem", fontWeight: 600, color: "#b3261e", background: "#fdf2f2", padding: "10px 14px", borderRadius: "6px", border: "1px solid #f8b4b4" }}>
              {state.message}
            </p>
          )}

          <button type="submit" disabled={pending} className="btn-primary-gold" style={{ width: "100%", justifyContent: "center", padding: "16px 24px", fontSize: "1.08rem", opacity: pending ? 0.7 : 1 }}>
            {pending ? "Saving Case Details..." : "Submit Case Details"}
          </button>
        </form>
      )}
    </div>
  );
}
