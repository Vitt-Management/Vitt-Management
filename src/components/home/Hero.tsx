import React from "react";
import Link from "next/link";
import HeroSlider from "@/components/home/HeroSlider";
import type { Banner } from "@/lib/banners";

export default function Hero({ banners }: { banners: Banner[] }) {
  return (
    <section style={{ backgroundColor: "#faf8f5", paddingTop: "40px", paddingBottom: "48px", borderBottom: "1px solid #e7dfcf", position: "relative" }}>
      <div className="container-custom">
        <div style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: "40px", alignItems: "center" }} className="hero-grid">
          
          {/* Left Hero Text Column */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="section-tag" style={{ color: "#a47336", letterSpacing: "0.16em", marginBottom: "14px" }}>
              LOST INVESTMENTS. REAL SOLUTIONS.
            </span>

            <h1 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
              fontWeight: 700,
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
              fontSize: "0.96rem",
              lineHeight: 1.65,
              color: "#526057",
              maxWidth: "520px",
              marginBottom: "32px"
            }}>
              We help you trace, recover and secure your shares, dividends and other financial assets — with expertise, transparency and care.
            </p>

            {/* Action Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "0", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary-gold" style={{ fontSize: "0.96rem", padding: "13px 28px" }}>
                Check Your Investments
              </Link>
              
              <Link href="/contact" 
                className="btn-outline-white" 
                style={{ fontSize: "0.96rem", padding: "13px 26px" }}
              >
                Contact Now
              </Link>
            </div>
          </div>

          {/* Right Hero Image Column */}
          <div style={{ position: "relative" }} className="hero-image-col">
            <div style={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 22px 45px -10px rgba(22, 38, 29, 0.2), 0 0 0 1px rgba(184, 134, 70, 0.25)",
              aspectRatio: "1 / 1",
              // Square frame never taller than the visible window (navbar 80px + hero padding 88px + breathing room)
              width: "min(100%, max(340px, calc(100svh - 190px)))",
              marginLeft: "auto"
            }}>
              <HeroSlider banners={banners} />

              {/* Gradient Vignette for Depth */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(16, 28, 22, 0.65) 100%)",
                pointerEvents: "none"
              }} />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
