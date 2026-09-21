"use client";

import React, { useActionState, useState } from "react";
import { serviceOptions } from "@/data/siteData";
import { submitContact, type ContactFormState } from "@/app/(site)/contact/actions";

const initialState: ContactFormState = {
  status: "idle",
  message: "",
  values: { name: "", email: "", phone: "", service: "", message: "" },
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "1rem",
  fontWeight: 600,
  color: "var(--text-headline)",
  marginBottom: "8px",
};

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [dismissed, setDismissed] = useState<ContactFormState | null>(null);
  const showSuccess = state.status === "success" && dismissed !== state;
  const v = state.values;

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
        padding: "36px",
      }}
    >
      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.9rem", fontWeight: 700, color: "var(--text-headline)", marginBottom: "8px" }}>
        Send us a message
      </h2>
      <p style={{ fontSize: "1.05rem", color: "var(--text-body)", marginBottom: "28px", lineHeight: 1.6 }}>
        Fields marked * are required.
      </p>

      {showSuccess ? (
        <div style={{ textAlign: "center", padding: "48px 12px" }}>
          <div style={{ width: "68px", height: "68px", borderRadius: "50%", background: "#e8f5e9", color: "#2e7d32", fontSize: "2rem", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
            ✓
          </div>
          <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text-headline)", marginBottom: "8px" }}>Thank you!</h3>
          <p style={{ fontSize: "1.05rem", color: "var(--text-body)", marginBottom: "22px" }}>
            Our expert will contact you shortly.
          </p>
          <button onClick={() => setDismissed(state)} style={{ fontSize: "1rem", fontWeight: 600, color: "var(--gold-dark)", textDecoration: "underline" }}>
            Send another message
          </button>
        </div>
      ) : (
        <form action={formAction} className="contact-form">
          {/* Honeypot: hidden from people, bots fill it in */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }} />

          <div>
            <label htmlFor="cf-name" style={labelStyle}>Full name *</label>
            <input id="cf-name" name="name" className="form-input contact-input" required maxLength={200} autoComplete="name" defaultValue={v.name} />
          </div>

          <div className="contact-form-row">
            <div>
              <label htmlFor="cf-email" style={labelStyle}>Email *</label>
              <input id="cf-email" name="email" type="email" className="form-input contact-input" required maxLength={320} autoComplete="email" defaultValue={v.email} />
            </div>
            <div>
              <label htmlFor="cf-phone" style={labelStyle}>Phone *</label>
              <input id="cf-phone" name="phone" type="tel" className="form-input contact-input" required maxLength={30} autoComplete="tel" defaultValue={v.phone} />
            </div>
          </div>

          <div>
            <label htmlFor="cf-service" style={labelStyle}>Service</label>
            <select id="cf-service" name="service" className="form-input contact-input" defaultValue={v.service}>
              <option value="">Select a service</option>
              {serviceOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cf-message" style={labelStyle}>Message</label>
            <textarea id="cf-message" name="message" className="form-input contact-input" rows={5} maxLength={5000} style={{ resize: "vertical" }} placeholder="Briefly describe your case" defaultValue={v.message} />
          </div>

          {state.status === "error" && (
            <p role="alert" style={{ fontSize: "1.05rem", fontWeight: 600, color: "#b3261e" }}>
              {state.message}
            </p>
          )}

          <button type="submit" disabled={pending} className="btn-primary-gold" style={{ width: "100%", justifyContent: "center", padding: "16px 24px", fontSize: "1.1rem", opacity: pending ? 0.7 : 1 }}>
            {pending ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
