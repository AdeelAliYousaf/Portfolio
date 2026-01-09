import Home from "./HomePage";

// Home page metadata for SEO and social sharing
export const metadata = {
  metadataBase: new URL("https://adeelaliyousaf.vercel.app"),
  title: "Adeel Ali Yousaf | Portfolio 2026 | Software Engineer & Full Stack Developer",
  description:
    "Welcome to the portfolio of Adeel Ali Yousaf, a passionate Software Engineer and Full Stack Developer. Explore projects, education, certifications, and contact details. Modern, animated, mobile-first, and PWA-ready.",
  keywords: [
    "Adeel Ali Yousaf",
    "Portfolio",
    "Software Engineer",
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Projects",
    "Certifications",
    "Education",
    "Contact",
    "Resume",
    "PWA",
    "Modern UI",
    "Animated Portfolio"
  ],
  authors: [{ name: "Adeel Ali Yousaf", url: "https://adeelaliyousaf.vercel.app" }],
  creator: "Adeel Ali Yousaf",
  openGraph: {
    title: "Adeel Ali Yousaf | Portfolio 2026",
    description:
      "Explore the modern, animated portfolio of Adeel Ali Yousaf, Software Engineer & Full Stack Developer. View projects, certifications, and contact info.",
    url: "https://adeelaliyousaf.vercel.app",
    siteName: "Adeel Ali Yousaf Portfolio 2026",
    images: [
      {
        url: "/LogoDark.png",
        width: 1200,
        height: 630,
        alt: "Adeel Ali Yousaf Portfolio 2026"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Adeel Ali Yousaf | Portfolio 2026",
    description:
      "Explore the modern, animated portfolio of Adeel Ali Yousaf, Software Engineer & Full Stack Developer. View projects, certifications, and contact info.",
    site: "@adeelaliyousaf", // Replace with your Twitter handle
    creator: "@adeelaliyousaf", // Replace with your Twitter handle
    images: [
      {
        url: "/Adeel.jpeg", // Replace with your Twitter OG image path
        alt: "Adeel Ali Yousaf Portfolio 2026"
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxVideoPreview: -1,
      maxImagePreview: "large",
      maxSnippet: -1
    }
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico"
  },
  manifest: "/manifest.json"
};



export default function Page() {
  return (
    <main>
      <Home />
    </main>
  );
}
