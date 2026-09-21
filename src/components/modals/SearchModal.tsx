"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { servicesData } from "@/data/siteData";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? servicesData.filter((s) =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: "#ffffff",
        borderRadius: "14px",
        maxWidth: "560px",
        width: "100%",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.35)",
        border: "1px solid #e7dfcf",
        overflow: "hidden",
        animation: "modalScale 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
      }}>
        {/* Search Input */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 20px",
          borderBottom: "1px solid #e7dfcf"
        }}>
          <Search size={20} style={{ color: "#b88646", flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services... (e.g. IEPF, Demat, Dividends)"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "1rem",
              color: "#131f18",
              background: "transparent",
              fontFamily: "inherit"
            }}
          />
          <button onClick={onClose} style={{ color: "#748278" }}>
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div style={{ maxHeight: "340px", overflowY: "auto" }}>
          {query.trim() && filtered.length === 0 && (
            <div style={{ padding: "32px 20px", textAlign: "center" }}>
              <p style={{ fontSize: "0.92rem", color: "#748278" }}>
                No services found for &ldquo;{query}&rdquo;
              </p>
            </div>
          )}

          {filtered.map((service) => (
            <a
              key={service.id}
              href="#services"
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 20px",
                borderBottom: "1px solid #f0ebe0",
                transition: "background 0.15s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fdfaf5")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#131f18", marginBottom: "2px" }}>
                  {service.title}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#748278" }}>
                  {service.description}
                </div>
              </div>
              <ArrowRight size={15} style={{ color: "#b88646", flexShrink: 0 }} />
            </a>
          ))}

          {/* Quick Links when empty */}
          {!query.trim() && (
            <div style={{ padding: "20px" }}>
              <p style={{ fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.1em", color: "#748278", textTransform: "uppercase", marginBottom: "12px" }}>
                Popular Searches
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["IEPF Recovery", "Physical to Demat", "Unclaimed Dividends", "Transmission", "NRI Recovery", "PF Claims"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    style={{
                      padding: "6px 14px",
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      color: "#38473e",
                      background: "#f5efe4",
                      borderRadius: "9999px",
                      border: "1px solid #e7dfcf",
                      transition: "all 0.2s ease",
                      cursor: "pointer"
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
