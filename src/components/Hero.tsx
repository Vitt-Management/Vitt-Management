"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Eye, Globe, Award } from "lucide-react";

interface HeroProps {
  onOpenConsultation: () => void;
}

export default function Hero({ onOpenConsultation }: HeroProps) {
  return (
    <section style={{ backgroundColor: "#faf8f5", paddingTop: "52px", paddingBottom: "64px", borderBottom: "1px solid #e7dfcf", position: "relative" }}>
      <div className="container-custom">
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "48px", alignItems: "center" }} className="hero-grid">
          
          {/* Left Hero Text Column */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="section-tag" style={{ color: "#a47336", letterSpacing: "0.16em", marginBottom: "14px" }}>
              LOST INVESTMENTS. REAL SOLUTIONS.
            </span>

            <h1 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#131f18",
              letterSpacing: "-0.025em",
              marginBottom: "20px"
            }}>
              Your Forgotten <br />
              <span style={{ color: "#b88646" }}>Investments</span> <br />
              Deserve a Second <br />
              Chance.
            </h1>

            <p style={{
              fontSize: "1.05rem",
              lineHeight: 1.65,
              color: "#526057",
              maxWidth: "520px",
              marginBottom: "32px"
            }}>
              We help you trace, recover and secure your shares, dividends and other financial assets — with expertise, transparency and care.
            </p>

            {/* Action Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "44px", flexWrap: "wrap" }}>
              <button 
                onClick={onOpenConsultation}
                className="btn-primary-gold" 
                style={{ fontSize: "0.96rem", padding: "13px 28px" }}
              >
                Check Your Investments <ArrowRight size={16} />
              </button>
              
              <a 
                href="#how-it-works" 
                className="btn-outline-white" 
                style={{ fontSize: "0.96rem", padding: "13px 26px" }}
              >
                How It Works
              </a>
            </div>

            {/* Trust Badges */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "14px",
              paddingTop: "24px",
              borderTop: "1px solid #e7dfcf"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ color: "#b88646", display: "flex" }}>
                  <Award size={18} />
                </div>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#2d3a32" }}>
                  Trusted Experts
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ color: "#b88646", display: "flex" }}>
                  <Eye size={18} />
                </div>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#2d3a32" }}>
                  Transparent Process
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ color: "#b88646", display: "flex" }}>
                  <Globe size={18} />
                </div>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#2d3a32" }}>
                  Pan-India &amp; NRI Support*
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ color: "#b88646", display: "flex" }}>
                  <ShieldCheck size={18} />
                </div>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#2d3a32" }}>
                  End-to-End Assistance
                </span>
              </div>
            </div>

          </div>

          {/* Right Hero Image Column */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 22px 45px -10px rgba(22, 38, 29, 0.2), 0 0 0 1px rgba(184, 134, 70, 0.25)",
              aspectRatio: "4 / 3.1"
            }}>
              <Image 
                src="/images/hero-investments.jpg" 
                alt="Your Investments Still Matter - Vitt Management" 
                fill
                priority
                style={{ objectFit: "cover" }}
              />

              {/* Gradient Vignette for Depth */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(16, 28, 22, 0.65) 100%)",
                pointerEvents: "none"
              }} />

              {/* Script Overlay: "Let's Bring Them Back" */}
              <div style={{
                position: "absolute",
                bottom: "22px",
                right: "26px",
                fontFamily: "var(--font-script)",
                fontSize: "2.5rem",
                color: "#ffffff",
                lineHeight: 1,
                transform: "rotate(-6deg)",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.6)",
                pointerEvents: "none"
              }}>
                Let&apos;s <br />
                Bring Them <br />
                Back
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
