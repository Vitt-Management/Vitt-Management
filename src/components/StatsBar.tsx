"use client";

import React from "react";
import { Smile, Coins, Award, Shield } from "lucide-react";
import { statsData, StatItem } from "@/data/siteData";

export default function StatsBar() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "smile": return <Smile size={20} />;
      case "coins": return <Coins size={20} />;
      case "award": return <Award size={20} />;
      case "shield": return <Shield size={20} />;
      default: return <Award size={20} />;
    }
  };

  return (
    <section style={{
      background: "linear-gradient(135deg, #101c16 0%, #182820 40%, #14221d 100%)",
      paddingTop: "44px",
      paddingBottom: "48px"
    }}>
      <div className="container-custom">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px"
        }} className="stats-grid">
          {statsData.map((stat: StatItem, i: number) => (
            <div key={i} className="stat-card" style={{
              borderRight: i < statsData.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none"
            }}>
              <div className="stat-icon">
                {getIcon(stat.icon)}
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
