import Reveal from "./Reveal";
import HeroSpeedlines from "./HeroSpeedlines";
import HeroVisual from "./HeroVisual";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-heading">
      <HeroSpeedlines />
      <div className={`container ${styles.heroGrid}`}>
        <div>
          <span className="eyebrow">Bring it on!</span>

          <Reveal as="h1" id="hero-heading" className="reveal" style={{ ["--d" as string]: ".05s" }}>
            <span className={styles.heroLine} style={{ ["--wob" as string]: "-1.1deg" }}>
              ADEEL ALI
            </span>
            <br />
            <span className={styles.heroLine} style={{ ["--wob" as string]: "0.8deg" }}>
              YOUSAF
            </span>
          </Reveal>

          <Reveal as="div" className={`reveal ${styles.tagbar}`} style={{ ["--d" as string]: ".15s" }}>
            FULL-STACK &amp; AI/ML DEVELOPER
          </Reveal>

          <Reveal as="p" className={`reveal ${styles.lede}`} style={{ ["--d" as string]: ".22s" }}>
            Based in Sialkot, Pakistan — building web &amp; mobile apps with React, Next.js and React Native
            by day, and training PyTorch computer-vision models by night. Mild-mannered CS student. Ships
            real products, not just prototypes.
          </Reveal>

          <Reveal as="div" className={`reveal ${styles.ctas}`} style={{ ["--d" as string]: ".3s" }}>
            <a href="#case-files" className="btn btnRed">
              📖 Read the Case Files
            </a>
            <a href="#team-up" className="btn btnYellow">
              ✉ Team Up With Me
            </a>
            <a href="/AdeelAliYousaf-Resume.pdf" className="btn" download>
              ⬇ Resume (PDF)
            </a>
          </Reveal>

          <Reveal as="div" className={`reveal ${styles.chips}`} style={{ ["--d" as string]: ".38s" }}>
            <span className="tag">React</span>
            <span className="tag">Next.js</span>
            <span className="tag">React Native</span>
            <span className="tag">Node.js</span>
            <span className="tag">PyTorch</span>
            <span className="tag">Computer Vision</span>
          </Reveal>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
