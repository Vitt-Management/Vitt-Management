"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Headphones } from "lucide-react";
import { servicesData, ServiceItem } from "@/data/siteData";

interface ServicesGridProps {
  onOpenConsultation: () => void;
}

export default function ServicesGrid({ onOpenConsultation }: ServicesGridProps) {
  return (
    <section id="services" style={{ backgroundColor: "#ffffff", paddingTop: "68px", paddingBottom: "76px", borderBottom: "1px solid #e7dfcf" }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Complete support for all your unclaimed and forgotten financial assets.
            </p>
          </div>

          <a 
            href="#services" 
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "6px", 
              fontSize: "0.88rem", 
              fontWeight: 600, 
              color: "#131f18",
              transition: "color 0.2s ease"
            }}
            className="view-all-link"
          >
            View All Services <ArrowRight size={15} />
          </a>
        </div>

        {/* 10 Services Grid (5 columns per row on desktop) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "20px"
        }} className="services-grid-layout">
          {servicesData.map((service: ServiceItem) => {
            if (service.isSpecial) {
              return (
                <div key={service.id} className="service-card-special">
                  <div style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(184, 134, 70, 0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#b88646",
                    marginBottom: "16px",
                    boxShadow: "0 4px 10px rgba(184, 134, 70, 0.15)"
                  }}>
                    <Headphones size={26} />
                  </div>

                  <h3 style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "#131f18",
                    marginBottom: "8px",
                    lineHeight: 1.3
                  }}>
                    {service.title}
                  </h3>

                  <p style={{
                    fontSize: "0.84rem",
                    color: "#606d64",
                    marginBottom: "20px",
                    lineHeight: 1.45
                  }}>
                    {service.description}
                  </p>

                  <button 
                    onClick={onOpenConsultation}
                    className="btn-primary-gold" 
                    style={{ fontSize: "0.82rem", padding: "9px 18px", width: "100%" }}
                  >
                    {service.ctaText} <ArrowRight size={14} />
                  </button>
                </div>
              );
            }

            return (
              <div key={service.id} className="service-card">
                {service.image && (
                  <div className="service-card-img-wrapper">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                      className="service-card-img"
                    />
                  </div>
                )}
                
                <div className="service-card-content">
                  <h3 className="service-card-title">
                    {service.title}
                  </h3>

                  <p className="service-card-desc">
                    {service.description}
                  </p>

                  <button 
                    onClick={onOpenConsultation}
                    className="service-card-link"
                  >
                    Learn More <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style jsx>{`
        .view-all-link:hover {
          color: #b88646 !important;
        }
        @media (max-width: 1200px) {
          .services-grid-layout {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 840px) {
          .services-grid-layout {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 540px) {
          .services-grid-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
