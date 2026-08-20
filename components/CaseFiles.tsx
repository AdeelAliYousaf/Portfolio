import Reveal from "./Reveal";
import Burst from "./Burst";
import styles from "./CaseFiles.module.css";

type Project = {
  title: string;
  meta: string;
  liveUrl?: string;
  summary: string;
  points: string[];
  tags: string[];
  tilt: "tiltL" | "tiltR";
  delay?: string;
};

const projects: Project[] = [
  {
    title: "SmartScan+",
    meta: "AI-Assisted Health Screening & Consultation Platform",
    liveUrl: "https://smartscanplus.vercel.app",
    summary:
      "A full-stack mobile health platform pairing a React Native (Expo) app in TypeScript with a Node.js backend and PostgreSQL database.",
    points: [
      "Trained computer-vision models with PyTorch and EfficientNet for AI-assisted preliminary screening of anemia and skin lesions — built as a preliminary screening aid, not a medical diagnosis.",
      "Built real-time doctor–patient consultation and chat for secure, live communication.",
      "Implemented authentication and authorization, secure data handling, and automated PDF/report generation.",
      "Shipped a Next.js admin dashboard for platform management and consultation tracking.",
    ],
    tags: ["React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL", "PyTorch", "EfficientNet", "Next.js"],
    tilt: "tiltL",
  },
  {
    title: "Real-Time Communication Web App",
    meta: "July 2025",
    summary:
      "A WebRTC-based application built with React.js and PHP, running a TURN server for reliable peer-to-peer video and audio streaming.",
    points: [
      "Implemented secure signaling for connection setup between peers.",
      "Built a responsive UI with cross-browser support for consistent real-time communication.",
    ],
    tags: ["React", "PHP", "WebRTC", "TURN Server", "Real-Time Systems"],
    tilt: "tiltR",
    delay: ".08s",
  },
  {
    title: "The Smart WebCam",
    meta: "January 2024",
    summary:
      "A Python desktop application with a Tkinter GUI and dlib-based face recognition, built for automated attendance tracking.",
    points: [
      "CSV-based attendance logging for easy record-keeping.",
      "SendGrid email alerts triggered on recognition events.",
      "Support for webcams, IP cameras and external camera sources.",
    ],
    tags: ["Python", "Tkinter", "dlib", "Computer Vision", "SendGrid"],
    tilt: "tiltL",
    delay: ".16s",
  },
];

export default function CaseFiles() {
  return (
    <section id="case-files" aria-labelledby="case-files-heading">
      <div className="container">
        <Reveal as="div" className="reveal sectionHead">
          <span className="eyebrow">CHAPTER FOUR</span>
          <h2 id="case-files-heading">THE CASE FILES</h2>
          <p>Real projects, real users, real code. Open a file to see how it was built.</p>
        </Reveal>

        <div className={styles.case}>
          {projects.map((p) => (
            <Reveal
              key={p.title}
              as="article"
              className={`reveal panel ${p.tilt} ${styles.file}`}
              style={{ ["--r" as string]: p.tilt === "tiltL" ? "-.7deg" : ".6deg", ["--d" as string]: p.delay ?? "0s" }}
            >
              <div className={styles.top}>
                <div>
                  <h3 className={styles.title}>{p.title}</h3>
                  <span className={styles.meta}>{p.meta}</span>
                </div>
                {p.liveUrl && (
                  <a className={`btn btnBlue ${styles.link}`} href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                    🔗 Visit Live
                  </a>
                )}
              </div>
              <p>{p.summary}</p>
              <ul>
                {p.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
              <div className={styles.tags}>
                {p.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}

          <Reveal as="div" className={`reveal panel ${styles.note}`} style={{ ["--r" as string]: ".4deg", ["--d" as string]: ".2s" }}>
            <p>
              <strong>Also in the archives:</strong> a Learning Management System (LMS) and a Final Year Project
              (FYP) Management System, both built as academic projects. Full case files available on request.
            </p>
          </Reveal>
        </div>
      </div>

      <Burst
        label="POW!"
        points={12}
        fill="var(--red)"
        textFill="var(--paper)"
        style={{ ["--size" as string]: "150px", top: "2%", left: "1%", ["--rot" as string]: "-12deg", ["--rot0" as string]: "-32deg" }}
      />
    </section>
  );
}
