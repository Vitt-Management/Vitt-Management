"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface OldDocumentsBannerProps {
  onOpenConsultation: () => void;
}

export default function OldDocumentsBanner({ onOpenConsultation }: OldDocumentsBannerProps) {
  return (
    <section style={{
      backgroundColor: "#f5efe4",
      paddingTop: "60px",
      paddingBottom: "64px",
      borderBottom: "1px solid #e7dfcf"
    }}>
      <div className="container-custom">
        <div style={{
          display: "grid",
          gridTemplateColumns: "0.55fr 0.45fr",
          gap: "48px",
          alignItems: "center"
        }} className="docs-banner-grid">

          {/* Left Image with script overlay */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "relative",
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: "0 16px 36px -8px rgba(22, 38, 29, 0.16)",
              aspectRatio: "4 / 3"
            }}>
              <Image
                src="/images/old-documents-pen.jpg"
                alt="Old documents could be valuable investments"
                fill
                style={{ objectFit: "cover" }}
              />

              {/* Gradient overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(160deg, rgba(0,0,0,0) 30%, rgba(16, 28, 22, 0.5) 100%)",
                pointerEvents: "none"
              }} />

              {/* Script accent */}
              <div style={{
                position: "absolute",
                bottom: "22px",
                left: "26px",
                fontFamily: "var(--font-script)",
                fontSize: "2.2rem",
                color: "#ffffff",
                lineHeight: 1.05,
                transform: "rotate(-4deg)",
                textShadow: "0 2px 10px rgba(0,0,0,0.7)",
                pointerEvents: "none"
              }}>
                Past <br />
                Investments <br />
                New <br />
                Possibilities
              </div>
            </div>
          </div>

          {/* Right Text Column */}
          <div>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2.1rem",
              fontWeight: 700,
              lineHeight: 1.22,
              color: "#131f18",
              letterSpacing: "-0.015em",
              marginBottom: "16px"
            }}>
              Still Have Old Documents? <br />
              They Could Be Valuable.
            </h2>

            <p style={{
              fontSize: "0.96rem",
              lineHeight: 1.65,
              color: "#526057",
              marginBottom: "28px",
              maxWidth: "460px"
            }}>
              Even old share certificates, dividend warrants or letters can help
              us trace your investments. Don&apos;t throw them away.
            </p>

            <button
              onClick={onOpenConsultation}
              className="btn-primary-gold"
              style={{ fontSize: "0.94rem", padding: "12px 28px" }}
            >
              Get Them Checked <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .docs-banner-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
