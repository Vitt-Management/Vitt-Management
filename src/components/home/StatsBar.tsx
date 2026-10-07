"use client";

import { Smile, Coins, Award, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { statsData } from "@/data/siteData";
import type { StatItem } from "@/data/siteData";

const icons: Record<string, React.ReactNode> = {
  smile: <Smile size={20} />,
  coins: <Coins size={20} />,
  award: <Award size={20} />,
  shield: <Shield size={20} />,
};

export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const [values, setValues] = useState<number[]>(() => statsData.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const duration = 1200;
    let animationFrame: number | null = null;
    let wasVisible = false;

    const startAnimation = () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }

      setValues(statsData.map(() => 0));
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setValues(statsData.map((stat) => Math.round(stat.value * easedProgress)));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          animationFrame = null;
        }
      };

      animationFrame = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.2;

        if (isVisible && !wasVisible) {
          wasVisible = true;
          startAnimation();
        } else if (!isVisible) {
          wasVisible = false;
        }
      },
      {
        threshold: [0, 0.2],
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="stats-section">
      <div className="container-custom">
        <div className="stats-grid">
          {statsData.map((stat: StatItem, index: number) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-icon">{icons[stat.icon] ?? icons.award}</div>
              <div className="stat-value">
                {stat.prefix}
                {values[index]}
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
