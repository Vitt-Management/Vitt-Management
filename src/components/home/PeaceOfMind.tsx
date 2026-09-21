"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function PeaceOfMind() {
  const features = [
    "Specialized Expertise",
    "No Hidden Costs",
    "NRI Support",
    "End-to-End Assistance"
  ];

  return (
    <section style={{
      backgroundColor: "#ffffff",
      paddingTop: "72px",
      paddingBottom: "76px",
      borderBottom: "1px solid #e7dfcf"
    }}>
      <div className="container-custom">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "56px",
          alignItems: "center"
        }} className="peace-grid">

          {/* Left Text Column */}
          <div>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2.3rem",
              fontWeight: 700,
              lineHeight: 1.22,
              color: "#131f18",
              letterSpacing: "-0.02em",
              marginBottom: "18px"
            }}>
              More Than Just Recovery — <br />
              It&apos;s About Your Peace of Mind.
            </h2>

            <p style={{
              fontSize: "0.96rem",
              lineHeight: 1.65,
              color: "#526057",
              marginBottom: "32px",
              maxWidth: "480px"
            }}>
              We combine expertise, transparent processes and a client-first approach to help you recover what&apos;s rightfully yours.
            </p>

            {/* Feature Badge Pills */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px"
            }}>
              {features.map((label, i) => (
                <div key={i} className="feature-badge-pill" style={{ padding: "8px 18px" }}>
                  <CheckCircle2 size={16} style={{ color: "#b88646" }} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Column */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "relative",
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: "0 20px 40px -10px rgba(22, 38, 29, 0.18)",
              aspectRatio: "3 / 2"
            }}>
              <Image
                src="/images/peace-of-mind.webp"
                alt="Peace of mind with Vitt Management"
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
