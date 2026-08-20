"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode, CSSProperties } from "react";

type RevealProps = {
  as?: keyof React.JSX.IntrinsicElements;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  // Reveal wraps arbitrary HTML/SVG tags (h1, article, svg, ...), so it accepts
  // whatever attributes that tag needs (viewBox, id, aria-*, ...) without
  // re-declaring every possible intrinsic element's prop set here.
  [prop: string]: unknown;
};

/**
 * Wraps children in the shared `.reveal` (or `.burst`) styling and flips
 * `data-inview="true"` the first time the element scrolls into view.
 * Falls back to always-visible when IntersectionObserver is unavailable
 * or the visitor prefers reduced motion.
 */
export default function Reveal({ as = "div", children, className = "", style, ...rest }: RevealProps) {
  const Tag = as as React.ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      // Defer out of the synchronous effect body (React 19 flags direct
      // setState-in-effect as a potential cascading-render smell).
      const raf = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className} style={style} data-inview={inView} {...rest}>
      {children}
    </Tag>
  );
}
