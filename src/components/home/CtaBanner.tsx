"use client";

import Link from "next/link";
import { useModals } from "@/context/ModalContext";

export default function CtaBanner() {
  const { openConsultation } = useModals();
  return (
    <section className="cta-light">
      <div className="container-custom">
        <div className="cta-light-inner">
          <span className="section-tag" style={{ color: "#a47336" }}>TAKE THE FIRST STEP</span>
          <h2 className="cta-light-title">Ready to Recover Your Investments?</h2>
          <p className="cta-light-text">
            Tell us what you remember, even if it is only a company name or an old certificate. Our experts will help you find out what is yours.
          </p>
          <div className="cta-light-actions">
            <button onClick={openConsultation} className="btn-primary-gold" style={{ fontSize: "1.02rem", padding: "15px 34px" }}>
              Get a Free Consultation
            </button>
            <Link href="/contact" className="btn-outline-gold" style={{ fontSize: "1.02rem", padding: "14px 34px" }}>
              Contact Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
