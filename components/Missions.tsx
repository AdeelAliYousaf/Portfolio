import Reveal from "./Reveal";
import styles from "./Missions.module.css";

const objectives = [
  "Developed and enhanced full-stack web applications using Laravel Breeze, Inertia.js and React.",
  "Implemented CRUD functionality for product and category management.",
  "Engineered SEO-optimized routing to boost organic visibility.",
  "Automated email workflows for smoother client operations.",
  "Shipped Progressive Web App (PWA) support for an app-like experience, delivering secure, scalable business solutions.",
];

export default function Missions() {
  return (
    <section id="missions" className={styles.missions} aria-labelledby="missions-heading">
      <div className="container">
        <Reveal as="div" className="reveal sectionHead">
          <span className="eyebrow" style={{ background: "var(--yellow)" }}>
            CHAPTER THREE
          </span>
          <h2 id="missions-heading">MISSION LOG</h2>
          <p>Field assignments completed. Objectives, verified.</p>
        </Reveal>

        <Reveal as="div" className={`reveal panel ${styles.panel}`} style={{ ["--r" as string]: "-.5deg" }}>
          <div className={styles.head}>
            <h3>Freelance Full-Stack Developer</h3>
            <span className={styles.dateBadge}>AUG 2025</span>
          </div>
          <p className={styles.clients}>Client operations: TopInWorldLeather.com &amp; VeritasEdgeGlobal.com</p>
          <ul className={styles.objectives}>
            {objectives.map((o) => (
              <li key={o}>
                <span className={styles.check}>✓</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
