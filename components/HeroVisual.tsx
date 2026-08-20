"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export default function HeroVisual() {
  const badgeRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if (badgeRef.current && y < 700) {
          badgeRef.current.style.transform = `translateY(${y * 0.05}px) rotate(${y * 0.01}deg)`;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.heroVisual} aria-hidden="true">
      <svg ref={badgeRef} className={styles.heroBadge} viewBox="0 0 320 320">
        <polygon
          points="160,10 179,58 228,36 226,89 279,90 254,136 300,164 254,192 279,238 226,239 228,292 179,270 160,318 141,270 92,292 94,239 41,238 66,192 20,164 66,136 41,90 94,89 92,36 141,58"
          fill="var(--yellow)"
          stroke="var(--ink)"
          strokeWidth={7}
          strokeLinejoin="round"
        />
        <circle cx="160" cy="164" r="78" fill="var(--paper)" stroke="var(--ink)" strokeWidth={6} />
        <text x="160" y="182" textAnchor="middle" fontFamily="var(--font-display-stack)" fontSize="52" fill="var(--ink)">
          AAY
        </text>
      </svg>

      <span className={`${styles.heroChip} chipFloat`} style={{ top: "6%", left: "2%", ["--fd" as string]: ".2s", ["--rot" as string]: "-6deg" }}>
        <span className="tag">React Native</span>
      </span>
      <span className={`${styles.heroChip} chipFloat`} style={{ bottom: "10%", left: "-2%", ["--fd" as string]: "1.1s", ["--rot" as string]: "4deg" }}>
        <span className="tag">ASP.NET Core</span>
      </span>
      <span className={`${styles.heroChip} chipFloat`} style={{ top: "2%", right: "0%", ["--fd" as string]: ".6s", ["--rot" as string]: "5deg" }}>
        <span className="tag">Laravel</span>
      </span>
      <span className={`${styles.heroChip} chipFloat`} style={{ bottom: "4%", right: "2%", ["--fd" as string]: "1.6s", ["--rot" as string]: "-4deg" }}>
        <span className="tag">PostgreSQL</span>
      </span>
    </div>
  );
}
