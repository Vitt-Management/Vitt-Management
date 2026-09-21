"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";

interface CtaBannerProps {
  onOpenConsultation: () => void;
}

export default function CtaBanner({ onOpenConsultation }: CtaBannerProps) {
  return (
    <section style={{
      background: "linear-gradient(135deg, #101c16 0%, #182820 50%, #14221d 100%)",
      paddingTop: "64px",
      paddingBottom: "68px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Subtle radial glow */}
      <div style={{
        position: "absolute",
        top: "-40%",
        right: "-10%",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(184, 134, 70, 0.08) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div className="container-custom">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 0.85fr",
          gap: "48px",
          alignItems: "center"
        }} className="cta-grid">

          {/* Left Text Column */}
          <div>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2.3rem",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              marginBottom: "16px"
            }}>
              Ready to Recover <br />
              Your Investments?
            </h2>

            <p style={{
              fontSize: "1rem",
              lineHeight: 1.65,
              color: "#b8c7bd",
              marginBottom: "32px",
              maxWidth: "460px"
            }}>
              Take the first step today. Our experts are here to help.
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button
                onClick={onOpenConsultation}
                className="btn-primary-gold"
                style={{ fontSize: "0.94rem", padding: "13px 28px" }}
              >
                Get a Free Consultation <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Image / Mockup Column */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(184, 134, 70, 0.2)",
              aspectRatio: "16 / 10",
              background: "linear-gradient(135deg, #1b2a22 0%, #111a15 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "24px 28px",
              gap: "20px"
            }}>
              {/* Background ambient lighting */}
              <div style={{
                position: "absolute",
                top: "-30%",
                right: "10%",
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(184, 134, 70, 0.15) 0%, transparent 70%)",
                pointerEvents: "none"
              }} />

              {/* White Ceramic Coffee Mug with Vitt Logo */}
              <div style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: "0 0 42%"
              }}>
                <div style={{
                  position: "relative",
                  width: "120px",
                  height: "136px",
                  background: "linear-gradient(135deg, #ffffff 0%, #f4f2ec 50%, #e8e3d8 100%)",
                  borderRadius: "6px 6px 16px 16px",
                  boxShadow: "-8px 12px 24px rgba(0,0,0,0.35), inset -4px 0 8px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px",
                  border: "1px solid rgba(255,255,255,0.8)"
                }}>
                  {/* Mug Handle */}
                  <div style={{
                    position: "absolute",
                    left: "-22px",
                    top: "24px",
                    width: "26px",
                    height: "72px",
                    border: "8px solid #ece8de",
                    borderRadius: "18px 0 0 24px",
                    borderRight: "none",
                    boxShadow: "-4px 4px 10px rgba(0,0,0,0.25)"
                  }} />

                  {/* Printed Brand on Mug */}
                  <div style={{ display: "flex", gap: "2.5px", marginBottom: "4px" }}>
                    <span style={{ width: "3.5px", height: "14px", background: "#b88646", transform: "skewX(-20deg)", borderRadius: "1px" }}></span>
                    <span style={{ width: "3.5px", height: "14px", background: "#131f18", transform: "skewX(-20deg)", borderRadius: "1px" }}></span>
                    <span style={{ width: "3.5px", height: "14px", background: "#b88646", transform: "skewX(-20deg)", borderRadius: "1px" }}></span>
                  </div>
                  <span style={{ fontSize: "0.88rem", fontWeight: 900, color: "#131f18", letterSpacing: "-0.02em" }}>
                    VITT
                  </span>
                  <span style={{ fontSize: "0.42rem", fontWeight: 700, letterSpacing: "0.18em", color: "#6a7c71", textTransform: "uppercase" }}>
                    MANAGEMENT
                  </span>
                  <div style={{ width: "24px", height: "1px", background: "#b88646", margin: "6px 0 4px" }} />
                  <span style={{ fontSize: "0.44rem", color: "#8a968f", textAlign: "center", lineHeight: 1.2 }}>
                    Recover Today. <br /> Secure Tomorrow.
                  </span>
                </div>
              </div>

              {/* Stack of 6 Executive Books with Gold Spines */}
              <div style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                flex: "1"
              }}>
                {[
                  { title: "SHARES", tone: "#261d15" },
                  { title: "DIVIDENDS", tone: "#1b251e" },
                  { title: "IEPF", tone: "#2a1e16" },
                  { title: "MUTUAL FUNDS", tone: "#1e2820" },
                  { title: "PF", tone: "#281b15" },
                  { title: "INSURANCE", tone: "#18241c" },
                ].map((book) => (
                  <div key={book.title} style={{
                    height: "25px",
                    background: `linear-gradient(90deg, ${book.tone} 0%, #362920 40%, ${book.tone} 100%)`,
                    borderRadius: "3px 5px 5px 3px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
                    borderLeft: "3px solid #b88646",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 12px",
                    position: "relative"
                  }}>
                    <span style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      letterSpacing: "0.14em",
                      color: "#dfba82",
                      textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                      textAlign: "center"
                    }}>
                      {book.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </section>
  );
}
