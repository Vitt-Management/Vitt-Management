"use client";

import { useModals } from "@/context/ModalContext";
import React from "react";
import Image from "next/image";

export default function OldDocumentsBanner() {
  const { openConsultation } = useModals();
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
              aspectRatio: "3 / 2"
            }}>
              <Image
                src="/images/still-have-old-documents.webp"
                alt="Old documents could be valuable investments"
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
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
              onClick={openConsultation}
              className="btn-primary-gold"
              style={{ fontSize: "0.94rem", padding: "12px 28px" }}
            >
              Get Them Checked
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}
