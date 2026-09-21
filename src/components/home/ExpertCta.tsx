"use client";

import { useModals } from "@/context/ModalContext";
import { Headphones } from "lucide-react";
import { servicesData } from "@/data/siteData";

export default function ExpertCta() {
  const { openConsultation } = useModals();
  const cta = servicesData.find((s) => s.isSpecial);
  if (!cta) return null;

  return (
    <section style={{ backgroundColor: "#faf8f5", paddingTop: "44px", paddingBottom: "44px", borderBottom: "1px solid #e7dfcf" }}>
      <div className="container-custom">
        <div className="expert-cta">
          <div className="expert-cta-icon">
            <Headphones size={30} />
          </div>

          <div className="expert-cta-text">
            <h2 className="expert-cta-title">{cta.title}</h2>
            <p className="expert-cta-desc">{cta.description}</p>
          </div>

          <button onClick={openConsultation} className="btn-primary-gold expert-cta-btn">
            {cta.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}
