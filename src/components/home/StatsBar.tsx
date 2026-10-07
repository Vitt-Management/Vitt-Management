"use client";

import { Smile, Coins, Award, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { statsData, StatItem } from "@/data/siteData";

const icons: Record<string, React.ReactNode> = {
  smile: <Smile size={20} />,
  coins: <Coins size={20} />,
  award: <Award size={20} />,
  shield: <Shield size={20} />,
};

export default function StatsBar() {
  const [values, setValues] = useState(() => statsData.map(() => 1));

  useEffect(() => {
    const start = performance.now();
    const duration = 900;
    let frame = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValues(statsData.map((stat) => Math.max(1, Math.round(stat.value * eased))));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="stats-section">
      <div className="container-custom">
        <div className="stats-grid">
          {statsData.map((stat: StatItem) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-icon">{icons[stat.icon] ?? icons.award}</div>
              <div className="stat-value">
                {stat.prefix}
                {values[statsData.indexOf(stat)]}
                {stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
