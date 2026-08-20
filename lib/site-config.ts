export const siteConfig = {
  name: "Adeel Ali Yousaf",
  role: "Full-Stack & AI/ML Developer",
  title: "Adeel Ali Yousaf | Full-Stack & AI/ML Developer Portfolio",
  titleTemplate: "%s | Adeel Ali Yousaf",
  description:
    "Adeel Ali Yousaf — Full-Stack & AI/ML Developer based in Sialkot, Pakistan. React, Next.js, React Native, Node.js and PyTorch. Explore projects, skills and get in touch.",
  // Update NEXT_PUBLIC_SITE_URL in your deployment environment to your real domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://adeelaliyousaf.vercel.app",
  email: "adeelaliyousaf.dev@gmail.com",
  phoneDisplay: "+92 339 0113811",
  phoneHref: "+923390113811",
  location: "Sialkot, Pakistan",
  keywords: [
    "Adeel Ali Yousaf",
    "Full-Stack Developer",
    "AI ML Developer",
    "React Developer",
    "React Native Developer",
    "Next.js Developer",
    "Computer Vision Developer",
    "Node.js Developer",
    "Pakistan Developer Portfolio",
  ],
  // TODO: replace these with your real profile URLs before launch.
  links: {
    linkedin: "https://www.linkedin.com/in/adeel-ali-yousaf",
    github: "https://github.com/adeelaliyousaf",
    twitter: "https://twitter.com/adeelaliyousaf",
    instagram: "https://www.instagram.com/adeel.ali.yousaf",

  },
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "origin", label: "Origin" },
  { id: "powers", label: "Powers" },
  { id: "missions", label: "Missions" },
  { id: "case-files", label: "Case Files" },
  { id: "training", label: "Training" },
  { id: "team-up", label: "Team Up" },
] as const;
