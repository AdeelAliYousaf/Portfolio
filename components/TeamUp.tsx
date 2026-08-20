import Reveal from "./Reveal";
import Burst from "./Burst";
import { siteConfig } from "@/lib/site-config";
import styles from "./TeamUp.module.css";

export default function TeamUp() {
  return (
    <section id="team-up" className={styles.teamUp} aria-labelledby="team-up-heading">
      <div className="container">
        <span className="eyebrow">FINAL CHAPTER</span>

        <Reveal as="h2" id="team-up-heading" className={`reveal ${styles.heading}`}>
          THIS STORY NEEDS A CO-STAR
        </Reveal>

        <Reveal as="p" className={`reveal ${styles.lede}`} style={{ ["--d" as string]: ".08s" }}>
          Got a product to build, an app to ship, or an AI idea worth prototyping? Sialkot-based, remote-friendly,
          and always up for the next case file.
        </Reveal>

        <Reveal as="div" className={`reveal ${styles.ctas}`} style={{ ["--d" as string]: ".16s" }}>
          <a className="btn btnYellow" href={`mailto:${siteConfig.email}`}>
            ✉ Email Me
          </a>
          <a className="btn btnRed" href={`tel:${siteConfig.phoneHref}`}>
            ☎ Call / WhatsApp
          </a>
          <a className="btn btnBlue" href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
            💼 LinkedIn
          </a>
          <a className="btn" style={{ background: "var(--paper)" }} href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
            🐙 GitHub
          </a>
        </Reveal>

        <Reveal as="p" className={`reveal ${styles.direct}`} style={{ ["--d" as string]: ".22s" }}>
          {siteConfig.email} · {siteConfig.phoneDisplay} · {siteConfig.location}
        </Reveal>
      </div>

      <Burst
        label="YES!"
        points={10}
        fill="var(--green)"
        textFill="var(--paper)"
        style={{ ["--size" as string]: "110px", bottom: "6%", right: "6%", ["--rot" as string]: "-8deg", ["--rot0" as string]: "14deg" }}
      />
    </section>
  );
}
