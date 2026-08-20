import Reveal from "./Reveal";
import Burst from "./Burst";
import styles from "./Powers.module.css";

const powers = [
  { badge: "FE", title: "Frontend & Mobile", color: "var(--red)", tags: ["React", "Next.js", "React Native", "Expo", "Inertia.js", "PWA"] },
  { badge: "BE", title: "Backend", color: "var(--blue)", tags: ["Node.js", "ASP.NET Core MVC", "Laravel Breeze", "RESTful APIs", "MVC Architecture", "Auth & Authorization"] },
  { badge: "DB", title: "Databases", color: "var(--green)", tags: ["PostgreSQL", "MySQL", "MSSQL"] },
  { badge: "AI", title: "AI / Machine Learning", color: "var(--ink)", tags: ["PyTorch", "EfficientNet", "CNNs", "Computer Vision", "Gradio"] },
  { badge: "OPS", title: "Cloud & DevOps", color: "var(--red)", tags: ["Git", "Docker", "Oracle Cloud", "SendGrid"] },
  { badge: "{ }", title: "Languages", color: "var(--blue)", tags: ["JavaScript", "TypeScript", "Python", "PHP", "C++", "C#", "SQL"] },
  { badge: "★", title: "Core & Extras", color: "var(--green)", tags: ["OOP", "Data Structures & Algorithms", "Computer Networks", "Cybersecurity", "SEO Optimization"] },
];

const tilts = [-0.8, 0.7, -0.6, 0.9, -0.9, 0.6, -0.7];
const delays = [0, 0.06, 0.12, 0.18, 0.24, 0.3, 0.36];

/** Small pinned comic sticker-badge used in place of emoji for consistent, on-brand iconography. */
function StickerBadge({ label }: { label: string }) {
  const big = label.length > 2;
  return (
    <svg className={styles.sticker} viewBox="0 0 44 44" aria-hidden="true">
      <rect x="4" y="4" width="36" height="36" rx="9" transform="rotate(-8 22 22)" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
      <text x="22" y={big ? 27 : 28} textAnchor="middle" fontFamily="var(--font-display-stack)" fontSize={big ? 12 : 16} fill="var(--ink)" transform="rotate(-8 22 22)">
        {label}
      </text>
    </svg>
  );
}

export default function Powers() {
  return (
    <section id="powers" aria-labelledby="powers-heading">
      <div className="container">
        <Reveal as="div" className="reveal sectionHead">
          <span className="eyebrow">CHAPTER TWO</span>
          <h2 id="powers-heading">SUPERPOWERS &amp; GADGETS</h2>
          <p>The full utility belt — from pixel-perfect interfaces to computer-vision models that actually ship.</p>
        </Reveal>

        <div className={styles.grid}>
          {powers.map((p, i) => (
            <Reveal
              key={p.title}
              as="div"
              className={`reveal panel ${styles.card}`}
              style={{ ["--r" as string]: `${tilts[i]}deg`, ["--d" as string]: `${delays[i]}s` }}
            >
              <div className={styles.banner} style={{ background: p.color }}>
                <StickerBadge label={p.badge} />
                <span>{p.title}</span>
              </div>
              <div className={styles.body}>
                {p.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Burst label="ZAP!" points={10} fill="var(--yellow)" style={{ ["--size" as string]: "130px", top: "6%", right: "4%", ["--rot" as string]: "10deg", ["--rot0" as string]: "30deg" }} />
    </section>
  );
}
