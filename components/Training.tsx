import Reveal from "./Reveal";
import styles from "./Training.module.css";

const education = [
  { year: "2026", title: "BS in Computer Science", org: "University of Sialkot" },
  { year: "2024", title: "Associate Degree (ADP) in Computer Studies", org: "University of Sialkot" },
];

const certifications = [
  { letter: "O", color: "var(--red)", title: "Oracle Certified Foundations Associate", org: "Oracle · 2025" },
  { letter: "N", color: "var(--blue)", title: "Getting Started with AI on Jetson Nano", org: "NVIDIA · 2025" },
  { letter: "C", color: "var(--green)", title: "Introduction to Cybersecurity", org: "Cisco Networking Academy · 2025" },
  { letter: "D", color: "var(--yellow)", title: "AI For Everyone", org: "DeepLearning.AI · 2024" },
];

export default function Training() {
  return (
    <section id="training" className={styles.training} aria-labelledby="training-heading">
      <div className="container">
        <Reveal as="div" className="reveal sectionHead">
          <span className="eyebrow">CHAPTER FIVE</span>
          <h2 id="training-heading">THE TRAINING MONTAGE</h2>
          <p>Every hero trains before the big fight. Here&apos;s the montage — degrees and badges earned along the way.</p>
        </Reveal>

        <div className={styles.montageRow}>
          {education.map((e, i) => (
            <Reveal
              key={e.title}
              as="div"
              className={`reveal panel ${styles.montageCard}`}
              style={{ ["--r" as string]: i % 2 === 0 ? "-.6deg" : ".5deg", ["--d" as string]: `${i * 0.06}s` }}
            >
              <div className={styles.year}>{e.year}</div>
              <h4>{e.title}</h4>
              <div className={styles.org}>{e.org}</div>
            </Reveal>
          ))}
        </div>

        <div className={styles.badgeRow}>
          {certifications.map((c, i) => (
            <Reveal
              key={c.title}
              as="div"
              className={`reveal panel ${styles.certBadge}`}
              style={{ ["--r" as string]: i % 2 === 0 ? "-.4deg" : ".5deg", ["--d" as string]: `${i * 0.05}s` }}
            >
              <svg className={styles.medal} viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="46" fill={c.color} stroke="var(--ink)" strokeWidth={5} />
                <circle cx="50" cy="50" r="30" fill="var(--paper)" stroke="var(--ink)" strokeWidth={4} />
                <text x="50" y="59" textAnchor="middle" fontFamily="var(--font-display-stack)" fontSize="26" fill="var(--ink)">
                  {c.letter}
                </text>
              </svg>
              <div>
                <h4>{c.title}</h4>
                <div className={styles.org}>{c.org}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
