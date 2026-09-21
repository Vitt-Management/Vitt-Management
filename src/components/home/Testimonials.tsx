"use client";

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonialsData, TestimonialItem } from "@/data/siteData";

// Infinite carousel. Three identical copies of the list sit side by side and we quietly jump back to the
// middle copy after each slide, so it never runs out. With few reviews the list is repeated until one copy
// is longer than the widest screen shows at once.
const MIN_CARDS_PER_COPY = 8;
const AUTO_MS = 4200; // time between automatic slides
const SLIDE_MS = 650;
const MANUAL_PAUSE_MS = 10000; // after someone uses the arrows or swipes, auto-advance waits this long
const SWIPE_PX = 50;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function ReviewCard({ t, hidden }: { t: TestimonialItem; hidden: boolean }) {
  return (
    <div className="review-card" aria-hidden={hidden || undefined}>
      <div className="quote-icon">&ldquo;</div>

      <p className="review-text">{t.quote}</p>

      {/* Star Ratings */}
      <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }} aria-label="5 out of 5 stars" role="img">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} size={16} fill="#b88646" color="#b88646" aria-hidden="true" />
        ))}
      </div>

      <div className="reviewer-profile">
        <Image src={t.avatar} alt={hidden ? "" : t.author} width={44} height={44} className="reviewer-avatar" draggable={false} />
        <div>
          <div className="reviewer-name">{t.author}</div>
          <div className="reviewer-loc">{t.location}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const copy = useMemo(() => {
    const reps = Math.max(1, Math.ceil(MIN_CARDS_PER_COPY / testimonialsData.length));
    return Array.from({ length: reps }).flatMap((_, r) => testimonialsData.map((t: TestimonialItem) => ({ t, r })));
  }, []);
  const m = copy.length;

  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const [pos, setPos] = useState(m); // start on the first card of the middle copy
  const [animate, setAnimate] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [step, setStep] = useState(400);

  const trackRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const hovering = useRef(false);
  const dragging = useRef(false);
  const dragStart = useRef(0);
  const resumeAt = useRef(0);

  // Distance from one card to the next (changes between desktop and phone).
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const [a, b] = [track.children[0] as HTMLElement | undefined, track.children[1] as HTMLElement | undefined];
      if (a && b) setStep(b.offsetLeft - a.offsetLeft);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  // After a slide, hop back to the middle copy without animating so we never reach either end.
  const settle = useCallback(() => {
    if (!busy.current) return;
    busy.current = false;
    setAnimate(false);
    setPos((p) => (p >= 2 * m ? p - m : p < m ? p + m : p));
  }, [m]);

  const go = useCallback(
    (dir: 1 | -1, manual = false) => {
      if (busy.current) return;
      if (manual) resumeAt.current = Date.now() + MANUAL_PAUSE_MS;
      busy.current = true;
      setAnimate(!reduced);
      setPos((p) => p + dir);
      setTimeout(settle, reduced ? 0 : SLIDE_MS + 250); // safety net if transitionend never fires
    },
    [reduced, settle]
  );

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      if (document.hidden || hovering.current || dragging.current || Date.now() < resumeAt.current) return;
      go(1);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [go, reduced]);

  // Swipe / drag
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (busy.current) settle(); // finish an automatic slide right away so the swipe is not lost
    dragging.current = true;
    dragStart.current = e.clientX;
    setAnimate(false);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setDragX(e.clientX - dragStart.current);
  };
  const endDrag = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    const dx = e.clientX - dragStart.current;
    setAnimate(!reduced);
    setDragX(0);
    if (dx <= -SWIPE_PX) go(1, true);
    else if (dx >= SWIPE_PX) go(-1, true);
  };

  return (
    <section style={{
      backgroundColor: "#faf7f2",
      paddingTop: "72px",
      paddingBottom: "64px",
      borderBottom: "1px solid #e7dfcf"
    }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <span className="section-tag">CLIENT STORIES</span>
          <h2 className="section-title">
            Real People. Real Recoveries.
          </h2>
          <p className="section-subtitle" style={{ maxWidth: "620px", marginLeft: "auto", marginRight: "auto" }}>
            Hear from individuals and families who found their lost investments with our help.
          </p>
        </div>
      </div>

      <div
        className="reviews-viewport"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client reviews"
        onMouseEnter={() => { hovering.current = true; }}
        onMouseLeave={() => { hovering.current = false; }}
        onFocus={() => { hovering.current = true; }}
        onBlur={() => { hovering.current = false; }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          ref={trackRef}
          className="reviews-track"
          onTransitionEnd={(e) => { if (e.target === e.currentTarget) settle(); }}
          style={{
            transform: `translateX(${-(pos * step) + dragX}px)`,
            transition: animate ? `transform ${SLIDE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)` : "none",
          }}
        >
          {[0, 1, 2].flatMap((c) =>
            copy.map(({ t, r }, i) => (
              <ReviewCard key={`${c}-${i}`} t={t} hidden={!(c === 1 && r === 0)} />
            ))
          )}
        </div>
      </div>

      {/* Arrows: desktop only. On phones people swipe. */}
      <div className="reviews-arrows">
        <button type="button" className="reviews-arrow" onClick={() => go(-1, true)} aria-label="Previous review">
          <ChevronLeft size={20} />
        </button>
        <button type="button" className="reviews-arrow" onClick={() => go(1, true)} aria-label="Next review">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
