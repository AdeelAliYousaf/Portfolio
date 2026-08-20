import localFont from "next/font/local";

// Self-hosted via next/font: Next.js inlines the font files at build time,
// serves them from the same origin, and injects preload + font-display
// automatically — no external font request, no layout shift.

export const bangers = localFont({
  src: "../app/fonts/Bangers-Regular.ttf",
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

export const permanentMarker = localFont({
  src: "../app/fonts/PermanentMarker-Regular.ttf",
  variable: "--font-hand",
  weight: "400",
  display: "swap",
});

export const comicNeue = localFont({
  src: "../app/fonts/ComicNeue-Bold.ttf",
  variable: "--font-body",
  weight: "700",
  display: "swap",
});
