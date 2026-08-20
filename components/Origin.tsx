import Reveal from "./Reveal";
import styles from "./Origin.module.css";

const stats = [
  { label: "Based In", value: "Sialkot, Pakistan" },
  { label: "Focus", value: "Full-Stack + AI/ML" },
  { label: "Education", value: "BS Computer Science, '26" },
  { label: "Status", value: "Open to freelance & full-time work" },
];

export default function Origin() {
  return (
    <section id="origin" className={styles.origin} aria-labelledby="origin-heading">
      <div className="container">
        <Reveal as="div" className={`reveal sectionHead`}>
          <span className="eyebrow">CHAPTER ONE</span>
          <h2 id="origin-heading">THE ORIGIN STORY</h2>
          <p>Every hero needs one. Here&apos;s how a computer-science student in Sialkot became a developer who ships.</p>
        </Reveal>

        <div className={styles.grid}>
          <Reveal as="figure" className={`reveal panel tiltL ${styles.portrait}`} style={{ ["--r" as string]: "-1.1deg" }}>
            <svg viewBox="0 0 240 240" role="img" aria-label="Illustrated comic badge with the initials A A Y" width={220} height={220}>
              <circle cx="120" cy="120" r="112" fill="var(--paper-2)" />
              <g stroke="var(--ink)" strokeWidth={2} opacity={0.5}>
                <line x1="120" y1="120" x2="120" y2="4" />
                <line x1="120" y1="120" x2="120" y2="236" />
                <line x1="120" y1="120" x2="4" y2="120" />
                <line x1="120" y1="120" x2="236" y2="120" />
                <line x1="120" y1="120" x2="36" y2="36" />
                <line x1="120" y1="120" x2="204" y2="36" />
                <line x1="120" y1="120" x2="36" y2="204" />
                <line x1="120" y1="120" x2="204" y2="204" />
              </g>
              <circle cx="120" cy="120" r="92" fill="var(--blue)" stroke="var(--ink)" strokeWidth={6} />
              <circle cx="120" cy="120" r="70" fill="var(--paper)" stroke="var(--ink)" strokeWidth={5} />
              <text x="120" y="140" textAnchor="middle" fontFamily="var(--font-display-stack)" fontSize="46" fill="var(--ink)">
                AAY
              </text>
            </svg>
            <figcaption className={styles.caption}>Sialkot, Pakistan</figcaption>
          </Reveal>

          <Reveal as="div" className="reveal" style={{ ["--d" as string]: ".1s" }}>
            <div className={`panel ${styles.copyPanel}`}>
              <div className="halftoneStrip" aria-hidden="true" />
              <div className={styles.copyBody}>
                <span className={styles.captionStrip}>OUR STORY SO FAR…</span>
                <p>
                  Every origin story starts somewhere ordinary. Mine starts at the University of Sialkot, where a
                  Computer Science degree turned into a habit of shipping real software instead of just studying
                  it. Somewhere between wiring up RESTful APIs and training a neural network to flag skin lesions,
                  code stopped being coursework and started being a craft.
                </p>
                <p>
                  Today the toolkit spans the full stack: React and Next.js on the front line, Node.js, Laravel
                  Breeze and ASP.NET Core holding the backend together, PostgreSQL, MySQL and MSSQL storing the
                  data — and PyTorch quietly doing the heavy lifting whenever a project calls for real AI. Along
                  the way: a mobile health-screening platform, a WebRTC video app, and a face-recognition
                  attendance system, each shipped end-to-end rather than left as a demo.
                </p>
                <div className={styles.statRow}>
                  {stats.map((s) => (
                    <div className={styles.statCard} key={s.label}>
                      <div className={styles.label}>{s.label}</div>
                      <div className={styles.value}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
