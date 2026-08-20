"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export default function HeroSpeedlines() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        if (ref.current) ref.current.style.transform = `translateY(${window.scrollY * 0.08}px)`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <svg ref={ref} className={styles.heroSpeedlines} viewBox="0 0 1200 700" preserveAspectRatio="xMaxYMin slice" aria-hidden="true">
      <g stroke="var(--ink)" strokeWidth={2}>
        <line x1="1400" y1="-80" x2="700" y2="740" />
        <line x1="1440" y1="-40" x2="760" y2="760" />
        <line x1="1360" y1="-100" x2="640" y2="700" />
        <line x1="1300" y1="-60" x2="560" y2="720" />
        <line x1="1480" y1="0" x2="820" y2="780" />
      </g>
    </svg>
  );
}
