"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonialsData, TestimonialItem } from "@/data/siteData";

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(testimonialsData.length / perPage);
  const visible = testimonialsData.slice(currentPage * perPage, (currentPage + 1) * perPage);

  return (
    <section style={{
      backgroundColor: "#faf7f2",
      paddingTop: "72px",
      paddingBottom: "76px",
      borderBottom: "1px solid #e7dfcf"
    }}>
      <div className="container-custom">

        {/* Section Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <span className="section-tag">CLIENT STORIES</span>
            <h2 className="section-title">
              Real People. Real Recoveries.
            </h2>
            <p className="section-subtitle">
              Hear from individuals and families who found their lost investments with our help.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a href="#" style={{
              fontSize: "0.88rem",
              fontWeight: 600,
              color: "#131f18",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}>
              View All Stories <ArrowRight size={15} />
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "36px"
        }} className="reviews-grid">
          {visible.map((t: TestimonialItem) => (
            <div key={t.id} className="review-card">
              <div className="quote-icon">&ldquo;</div>

              <p className="review-text">{t.quote}</p>

              {/* Star Ratings */}
              <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} fill="#b88646" color="#b88646" />
                ))}
              </div>

              <div className="reviewer-profile">
                <Image
                  src={t.avatar}
                  alt={t.author}
                  width={44}
                  height={44}
                  className="reviewer-avatar"
                />
                <div>
                  <div className="reviewer-name">{t.author}</div>
                  <div className="reviewer-loc">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots & Arrows */}
        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "1px solid #e7dfcf",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: currentPage === 0 ? "#c5c0b6" : "#131f18",
                backgroundColor: "#ffffff",
                cursor: currentPage === 0 ? "not-allowed" : "pointer"
              }}
            >
              <ChevronLeft size={16} />
            </button>

            <div style={{ display: "flex", gap: "6px" }}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  style={{
                    width: currentPage === i ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: currentPage === i ? "#b88646" : "#d9cfbd",
                    transition: "all 0.3s ease",
                    cursor: "pointer"
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "1px solid #e7dfcf",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: currentPage === totalPages - 1 ? "#c5c0b6" : "#131f18",
                backgroundColor: "#ffffff",
                cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer"
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          .reviews-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .reviews-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
