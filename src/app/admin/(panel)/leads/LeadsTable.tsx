"use client";

import React, { useState } from "react";
import {
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Eye,
  Mail,
  MessageSquare,
  Phone,
  PhoneCall,
  User,
  X,
} from "lucide-react";
import StatusSelect from "./StatusSelect";
import { setLeadStatus } from "./actions";

export interface LeadItem {
  id: string;
  created_at: string;
  name: string;
  email: string | null;
  phone: string;
  service: string | null;
  message: string | null;
  source: string | null;
  status: string;
}

export default function LeadsTable({
  leads,
  serviceLabelMap,
}: {
  leads: LeadItem[];
  serviceLabelMap: Record<string, string>;
}) {
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [localLeads, setLocalLeads] = useState<LeadItem[]>(leads);

  const getServiceDisplay = (s: string | null) => {
    if (!s) return "General Inquiry";
    if (s === "partner_program") return "🤝 Partner Inquiry";
    if (s === "check_shares") return "🔍 Check Shares";
    return serviceLabelMap[s] || s;
  };

  const getCleanPhone = (phone: string) => {
    return phone.replace(/[^\d+]/g, "");
  };

  const getWhatsAppLink = (phone: string, name: string) => {
    let clean = phone.replace(/[^\d]/g, "");
    // If 10 digits Indian number without 91, add 91
    if (clean.length === 10) clean = `91${clean}`;
    const text = encodeURIComponent(`Hello ${name}, thank you for contacting Vitt Management regarding your case.`);
    return `https://wa.me/${clean}?text=${text}`;
  };

  const handleCopy = (lead: LeadItem) => {
    const text = [
      `--- Lead Details (${getServiceDisplay(lead.service)}) ---`,
      `Name: ${lead.name}`,
      `Phone: ${lead.phone}`,
      lead.email ? `Email: ${lead.email}` : "",
      `Service: ${getServiceDisplay(lead.service)}`,
      `Received: ${new Date(lead.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" })}`,
      lead.message ? `\nDetails:\n${lead.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleModalStatusChange = async (id: string, newStatus: string) => {
    setLocalLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
    await setLeadStatus(id, newStatus);
  };

  return (
    <>
      <div className="table-scroll">
        <table className="leads-table">
          <thead>
            <tr>
              <th style={{ width: "160px" }}>Received</th>
              <th style={{ width: "220px" }}>Contact</th>
              <th style={{ width: "190px" }}>Service</th>
              <th>Message / Case Details</th>
              <th style={{ width: "140px" }}>Status</th>
              <th style={{ width: "90px", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {localLeads.map((l) => {
              const previewText = l.message ? l.message.replace(/\n+/g, " ") : "—";
              const isLong = l.message && l.message.length > 70;

              return (
                <tr key={l.id} style={{ transition: "background-color 0.15s ease" }}>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.92rem", color: "var(--text-muted)" }}>
                    {new Date(l.created_at).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, fontSize: "1.02rem", color: "var(--text-headline)", marginBottom: "4px" }}>
                      {l.name}
                    </div>
                    {l.email ? (
                      <a
                        href={`mailto:${l.email}`}
                        style={{ color: "var(--gold-dark)", display: "block", fontSize: "0.9rem", wordBreak: "break-all", marginBottom: "2px" }}
                      >
                        {l.email}
                      </a>
                    ) : (
                      <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", display: "block", marginBottom: "2px" }}>
                        No email provided
                      </span>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                      <a
                        href={`tel:${getCleanPhone(l.phone)}`}
                        style={{ color: "var(--text-headline)", fontWeight: 600, fontSize: "0.92rem" }}
                      >
                        {l.phone}
                      </a>
                      <a
                        href={getWhatsAppLink(l.phone, l.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Chat on WhatsApp"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          background: "#25d366",
                          color: "#fff",
                        }}
                      >
                        <MessageSquare size={12} />
                      </a>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        background:
                          l.service === "partner_program"
                            ? "#fbf3e6"
                            : l.service === "check_shares"
                            ? "#eaf3fa"
                            : "#f5f5f5",
                        color:
                          l.service === "partner_program"
                            ? "#8c5d24"
                            : l.service === "check_shares"
                            ? "#155e75"
                            : "#333",
                        border: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      {getServiceDisplay(l.service)}
                    </span>
                  </td>
                  <td>
                    <div style={{ maxWidth: "320px" }}>
                      <div
                        style={{
                          fontSize: "0.92rem",
                          color: "var(--text-body)",
                          lineHeight: 1.45,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {previewText}
                      </div>
                      {l.message && (
                        <button
                          type="button"
                          onClick={() => setSelectedLead(l)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            marginTop: "4px",
                            fontSize: "0.84rem",
                            fontWeight: 700,
                            color: "var(--gold-dark)",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          <Eye size={13} />
                          <span>View Full Case</span>
                        </button>
                      )}
                    </div>
                  </td>
                  <td>
                    <StatusSelect id={l.id} status={l.status} />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      type="button"
                      onClick={() => setSelectedLead(l)}
                      title="View Lead Details"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid var(--border-subtle)",
                        backgroundColor: "#faf8f5",
                        color: "var(--text-headline)",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <Eye size={15} style={{ marginRight: "4px", color: "var(--gold-primary)" }} />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* LEAD DETAILS MODAL */}
      {selectedLead && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(16, 28, 22, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setSelectedLead(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "640px",
              maxHeight: "90vh",
              overflowY: "auto",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
              border: "1px solid var(--border-subtle)",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid var(--border-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#faf8f5",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-headline)", margin: 0 }}>
                    {selectedLead.name}
                  </h3>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "6px",
                      background:
                        selectedLead.service === "partner_program"
                          ? "#fbf3e6"
                          : selectedLead.service === "check_shares"
                          ? "#eaf3fa"
                          : "#f0fdf4",
                      color:
                        selectedLead.service === "partner_program"
                          ? "#8c5d24"
                          : selectedLead.service === "check_shares"
                          ? "#155e75"
                          : "#166534",
                      textTransform: "uppercase",
                    }}
                  >
                    {getServiceDisplay(selectedLead.service)}
                  </span>
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }}>
                  Received:{" "}
                  {new Date(selectedLead.created_at).toLocaleString("en-IN", {
                    dateStyle: "full",
                    timeStyle: "short",
                    timeZone: "Asia/Kolkata",
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  border: "1px solid var(--border-subtle)",
                  backgroundColor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Quick Action Buttons */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "10px",
                }}
              >
                <a
                  href={`tel:${getCleanPhone(selectedLead.phone)}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    backgroundColor: "#f5efe4",
                    color: "var(--gold-dark)",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    border: "1px solid var(--gold-border)",
                  }}
                >
                  <PhoneCall size={15} />
                  <span>Call Lead</span>
                </a>

                <a
                  href={getWhatsAppLink(selectedLead.phone, selectedLead.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    backgroundColor: "#e8f8ed",
                    color: "#166534",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  <MessageSquare size={15} />
                  <span>WhatsApp</span>
                </a>

                {selectedLead.email && (
                  <a
                    href={`mailto:${selectedLead.email}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      backgroundColor: "#f1f5f9",
                      color: "#334155",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      textDecoration: "none",
                      border: "1px solid #cbd5e1",
                    }}
                  >
                    <Mail size={15} />
                    <span>Send Email</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => handleCopy(selectedLead)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    backgroundColor: copied ? "#e8f5e9" : "#faf8f5",
                    color: copied ? "#2e7d32" : "var(--text-headline)",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  <span>{copied ? "Copied! ✓" : "Copy Details"}</span>
                </button>
              </div>

              {/* Key Contact Summary Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                  padding: "16px",
                  borderRadius: "10px",
                  backgroundColor: "#faf8f5",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "3px" }}>
                    Phone / WhatsApp
                  </div>
                  <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-headline)" }}>
                    {selectedLead.phone}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "3px" }}>
                    Email Address
                  </div>
                  <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-headline)", wordBreak: "break-all" }}>
                    {selectedLead.email || "—"}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "3px" }}>
                    Service / Category
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-headline)" }}>
                    {getServiceDisplay(selectedLead.service)}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "3px" }}>
                    Source
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-headline)" }}>
                    {selectedLead.source || "Website Form"}
                  </div>
                </div>
              </div>

              {/* Full Message Details Box */}
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-headline)", marginBottom: "8px" }}>
                  Complete Case Information &amp; Notes:
                </div>
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "10px",
                    padding: "16px 18px",
                    fontSize: "0.96rem",
                    color: "var(--text-headline)",
                    lineHeight: 1.65,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    fontFamily: "inherit",
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.02)",
                  }}
                >
                  {selectedLead.message || "No additional message provided."}
                </div>
              </div>

              {/* Live Status Control inside Modal */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 18px",
                  borderRadius: "10px",
                  backgroundColor: "#fdfaf6",
                  border: "1px solid var(--gold-border)",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-headline)" }}>
                    Lead Follow-up Status
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    Update this as your team processes the inquiry
                  </div>
                </div>

                <select
                  className="admin-input"
                  style={{ width: "auto", minWidth: "140px", padding: "8px 12px", fontWeight: 600 }}
                  value={selectedLead.status}
                  onChange={(e) => handleModalStatusChange(selectedLead.id, e.target.value)}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "14px 24px",
                borderTop: "1px solid var(--border-subtle)",
                display: "flex",
                justifyContent: "flex-end",
                backgroundColor: "#faf8f5",
                borderBottomLeftRadius: "16px",
                borderBottomRightRadius: "16px",
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="btn-primary-gold"
                style={{ padding: "10px 22px", fontSize: "0.95rem" }}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
