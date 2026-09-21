"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { quickLinks, footerServices } from "@/data/siteData";

export default function Footer() {
  return (
    <footer id="contact" style={{
      background: "linear-gradient(180deg, #0f1814 0%, #0b130f 100%)",
      color: "#c5d0c9",
      paddingTop: "56px",
      paddingBottom: "0"
    }}>
      <div className="container-custom">

        {/* Top Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 0.8fr 0.9fr 1fr 1fr",
          gap: "36px",
          paddingBottom: "44px",
          borderBottom: "1px solid rgba(255,255,255,0.07)"
        }} className="footer-grid">

          {/* Brand Column */}
          <div>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                <div style={{ display: "flex", gap: "3px" }}>
                  <span style={{ width: "5px", height: "20px", background: "#b88646", transform: "skewX(-20deg)", borderRadius: "1px" }}></span>
                  <span style={{ width: "5px", height: "20px", background: "#ffffff", transform: "skewX(-20deg)", borderRadius: "1px" }}></span>
                  <span style={{ width: "5px", height: "20px", background: "#b88646", transform: "skewX(-20deg)", borderRadius: "1px" }}></span>
                </div>
                <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.03em" }}>
                  VITT
                </span>
              </div>
              <span style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.22em", color: "#748278", textTransform: "uppercase" }}>
                MANAGEMENT
              </span>
            </div>

            <p style={{ fontSize: "0.84rem", lineHeight: 1.6, color: "#8e9d93", maxWidth: "240px", marginBottom: "18px" }}>
              Recover Today. <br />
              Secure Tomorrow.
            </p>

            <div style={{ display: "flex", gap: "8px" }}>
              {["twitter", "linkedin", "facebook", "instagram"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#8e9d93",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    transition: "all 0.2s ease"
                  }}
                >
                  {s.charAt(0).toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: "0.82rem", fontWeight: 700, color: "#ffffff", letterSpacing: "0.06em", marginBottom: "16px", textTransform: "uppercase" }}>
              Quick Links
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {quickLinks.map((link) => (
                <Link key={link.name} href={link.href} style={{ fontSize: "0.84rem", color: "#8e9d93", transition: "color 0.2s ease" }}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: "0.82rem", fontWeight: 700, color: "#ffffff", letterSpacing: "0.06em", marginBottom: "16px", textTransform: "uppercase" }}>
              Our Services
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {footerServices.map((s) => (
                <Link key={s} href="#services" style={{ fontSize: "0.84rem", color: "#8e9d93", transition: "color 0.2s ease" }}>
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ fontSize: "0.82rem", fontWeight: 700, color: "#ffffff", letterSpacing: "0.06em", marginBottom: "16px", textTransform: "uppercase" }}>
              Contact Us
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <Phone size={15} style={{ color: "#b88646", marginTop: "3px", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "0.84rem", color: "#c5d0c9" }}>+91 98765 43210</div>
                  <div style={{ fontSize: "0.74rem", color: "#6a7c71" }}>Mon-Sat 9AM - 7PM</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <Mail size={15} style={{ color: "#b88646", marginTop: "3px", flexShrink: 0 }} />
                <span style={{ fontSize: "0.84rem", color: "#c5d0c9" }}>info@vittmanagement.in</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <MapPin size={15} style={{ color: "#b88646", marginTop: "3px", flexShrink: 0 }} />
                <span style={{ fontSize: "0.84rem", color: "#c5d0c9", lineHeight: 1.45 }}>
                  Mumbai, India
                </span>
              </div>
            </div>
          </div>

          {/* Follow Us & Brand Commitment */}
          <div>
            <h4 style={{ fontSize: "0.82rem", fontWeight: 700, color: "#ffffff", letterSpacing: "0.06em", marginBottom: "16px", textTransform: "uppercase" }}>
              Follow Us
            </h4>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "32px", flexWrap: "wrap" }}>
              {["linkedin", "twitter", "facebook", "instagram", "youtube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "#1c2b23",
                    border: "1px solid rgba(255,255,255,0.14)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    transition: "all 0.2s ease"
                  }}
                >
                  {s === "linkedin" ? "in" : s === "twitter" ? "𝕏" : s === "facebook" ? "f" : s === "instagram" ? "ig" : "yt"}
                </a>
              ))}
            </div>

            {/* Accent Line and Tagline */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <div style={{ width: "32px", height: "2px", background: "#b88646", marginTop: "8px" }} />
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#ffffff", lineHeight: 1.3 }}>
                  Your Investments
                </div>
                <div style={{ fontSize: "0.78rem", color: "#b88646", fontWeight: 600 }}>
                  Our Commitment
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "20px",
          paddingBottom: "20px",
          flexWrap: "wrap",
          gap: "12px"
        }}>
          <span style={{ fontSize: "0.78rem", color: "#5a6b60" }}>
            © 2024 Vitt Management. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="#" style={{ fontSize: "0.78rem", color: "#5a6b60" }}>Privacy Policy</Link>
            <Link href="#" style={{ fontSize: "0.78rem", color: "#5a6b60" }}>Terms & Conditions</Link>
          </div>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
