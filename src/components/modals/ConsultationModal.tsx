"use client";

import React, { useState } from "react";
import { X, User, Mail, Phone, MessageSquare, ChevronDown } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-container">
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #101c16 0%, #1a2d24 100%)",
          padding: "28px 28px 24px",
          position: "relative"
        }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              transition: "background 0.2s ease"
            }}
          >
            <X size={16} />
          </button>

          <h3 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "6px"
          }}>
            Book a Free Consultation
          </h3>
          <p style={{ fontSize: "0.88rem", color: "#8e9d93", lineHeight: 1.5 }}>
            Share your details and our recovery expert will get in touch within 24 hours.
          </p>
        </div>

        {/* Form Body */}
        <div style={{ padding: "28px" }}>
          {submitted ? (
            <div style={{
              textAlign: "center",
              padding: "40px 20px"
            }}>
              <div style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "#e8f5e9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                color: "#2e7d32",
                fontSize: "1.8rem"
              }}>
                ✓
              </div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#131f18", marginBottom: "8px" }}>
                Thank You!
              </h4>
              <p style={{ fontSize: "0.92rem", color: "#526057" }}>
                Our expert will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Name */}
              <div style={{ position: "relative" }}>
                <User size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#748278" }} />
                <input
                  className="form-input"
                  style={{ paddingLeft: "40px" }}
                  placeholder="Full Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Email & Phone Row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ position: "relative" }}>
                  <Mail size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#748278" }} />
                  <input
                    className="form-input"
                    type="email"
                    style={{ paddingLeft: "40px" }}
                    placeholder="Email *"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div style={{ position: "relative" }}>
                  <Phone size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#748278" }} />
                  <input
                    className="form-input"
                    style={{ paddingLeft: "40px" }}
                    placeholder="Phone *"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Service Dropdown */}
              <div style={{ position: "relative" }}>
                <ChevronDown size={16} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "#748278", pointerEvents: "none" }} />
                <select
                  className="form-input"
                  style={{ appearance: "none", cursor: "pointer", color: formData.service ? "#131f18" : "#748278" }}
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="">Select a Service</option>
                  <option value="iepf">IEPF Share & Dividend Recovery</option>
                  <option value="demat">Physical Shares to Demat</option>
                  <option value="transmission">Transmission of Shares</option>
                  <option value="duplicate">Lost / Duplicate Share Certificates</option>
                  <option value="dividends">Unpaid / Unclaimed Dividends</option>
                  <option value="forgotten">Old / Forgotten Shares</option>
                  <option value="nri">NRI Investment Recovery</option>
                  <option value="pf">PF Recovery</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div style={{ position: "relative" }}>
                <MessageSquare size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "#748278" }} />
                <textarea
                  className="form-input"
                  style={{ paddingLeft: "40px", minHeight: "90px", resize: "vertical" }}
                  placeholder="Brief description of your case (optional)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-primary-gold"
                style={{ width: "100%", justifyContent: "center", padding: "13px 24px", fontSize: "0.96rem", marginTop: "4px" }}
              >
                Submit Request
              </button>

              <p style={{ fontSize: "0.76rem", color: "#748278", textAlign: "center" }}>
                Your information is secure and confidential.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
