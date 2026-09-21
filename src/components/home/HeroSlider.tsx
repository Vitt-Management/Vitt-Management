"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import type { Banner } from "@/lib/banners";

const INTERVAL_MS = 5000;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

// Crossfades between the banner images. Stops auto-advancing on hover/focus
// and for visitors who prefer reduced motion.
export default function HeroSlider({ banners }: { banners: Banner[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const count = banners.length;
  const current = active % count;

  useEffect(() => {
    if (count < 2 || paused || reducedMotion) return;
    const id = setInterval(() => setActive((i) => (i + 1) % count), INTERVAL_MS);
    return () => clearInterval(id);
  }, [count, paused, reducedMotion, current]);

  return (
    <div
      style={{ position: "absolute", inset: 0 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {banners.map((b, i) => (
        <Image
          key={b.id}
          src={b.image_url}
          alt={b.alt_text}
          fill
          priority={i === 0}
          sizes="(max-width: 900px) 100vw, 50vw"
          aria-hidden={i !== current}
          style={{
            objectFit: "cover",
            opacity: i === current ? 1 : 0,
            transition: reducedMotion ? "none" : "opacity 1.2s ease-in-out",
          }}
        />
      ))}

      {count > 1 && (
        <div style={{ position: "absolute", left: "22px", bottom: "22px", display: "flex", gap: "10px", zIndex: 2 }}>
          {banners.map((b, i) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show banner ${i + 1} of ${count}`}
              aria-current={i === current}
              style={{
                width: i === current ? "30px" : "12px",
                height: "12px",
                borderRadius: "6px",
                background: i === current ? "#dfb87c" : "rgba(255,255,255,0.75)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
