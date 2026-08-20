"use client";

import { useEffect, useState } from "react";
import { navItems, siteConfig } from "@/lib/site-config";
import ScrollProgress from "./ScrollProgress";
import styles from "./Header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!("IntersectionObserver" in window) || sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.navWrap}`}>
        <a className={styles.brand} href="#home">
          <svg className={styles.brandBadge} viewBox="0 0 200 200" role="img" aria-label={`${siteConfig.name} logo badge`}>
            <polygon
              points="100.0,4.0 117.6,34.3 148.0,16.9 148.1,51.9 183.1,52.0 165.7,82.4 196.0,100.0 165.7,117.6 183.1,148.0 148.1,148.1 148.0,183.1 117.6,165.7 100.0,196.0 82.4,165.7 52.0,183.1 51.9,148.1 16.9,148.0 34.3,117.6 4.0,100.0 34.3,82.4 16.9,52.0 51.9,51.9 52.0,16.9 82.4,34.3"
              fill="var(--yellow)"
              stroke="var(--ink)"
              strokeWidth="7"
              strokeLinejoin="round"
            />
            <circle cx="100" cy="100" r="46" fill="var(--paper)" stroke="var(--ink)" strokeWidth="6" />
            <text x="100" y="116" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight={900} fontSize="50" fill="var(--ink)">
              A
            </text>
          </svg>
          <span className={styles.brandName}>
            {siteConfig.name.toUpperCase()}
            <small>{siteConfig.role.toUpperCase()}</small>
          </span>
        </a>

        <button
          className={styles.navToggle}
          aria-expanded={open}
          aria-controls="navLinks"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>

        <ul id="navLinks" className={`${styles.navLinks} ${open ? styles.open : ""}`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeId === item.id ? styles.active : ""}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ScrollProgress />
    </header>
  );
}
