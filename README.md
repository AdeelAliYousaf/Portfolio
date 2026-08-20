# Adeel Ali Yousaf — Portfolio

A comic-book styled portfolio built with **Next.js 16 (App Router) + TypeScript**. Self-hosted comic
fonts, scroll-triggered "impact stamp" animations, and SEO wired in the idiomatic Next.js way
(file-based metadata, JSON-LD, static generation).

## Quick start

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build      # production build (fully static — every route prerenders)
npm run start       # serve the production build
npm run lint         # ESLint
```

Requires Node.js 18.18+ (Node 20/22 recommended).

## Before you deploy — update these

1. **`.env.example` → `.env.local`**: set `NEXT_PUBLIC_SITE_URL` to your real domain. It drives the
   canonical URL, Open Graph/Twitter metadata, JSON-LD and `sitemap.xml`.
2. **`lib/site-config.ts`**: replace the placeholder `links.linkedin` and `links.github` URLs
   (currently `"#"`) with your real profile links.
3. **Google Search Console**: once you have a verification token, uncomment and fill in the
   `verification.google` field in `app/layout.tsx`.

## Project structure

```
app/
  layout.tsx          Root layout: next/font wiring, full SEO metadata, JSON-LD
  page.tsx             Composes all sections
  globals.css          Design tokens + shared comic-UI classes (.btn, .tag, .panel, .reveal, .burst…)
  sitemap.ts            → /sitemap.xml
  robots.ts              → /robots.txt
  manifest.ts            → /manifest.webmanifest
  icon.svg                → favicon
  apple-icon.png            → iOS home-screen icon
  opengraph-image.jpg        → OG share image
  twitter-image.jpg           → Twitter card image
  fonts/                       Bangers, Permanent Marker, Comic Neue (self-hosted .ttf)

components/
  Header.tsx / .module.css        Sticky nav, scrollspy, mobile menu, scroll progress meter
  ScrollProgress.tsx               "Ink meter" that fills as you read
  Hero.tsx / HeroVisual.tsx / HeroSpeedlines.tsx    Cover section + parallax
  Origin.tsx, Powers.tsx, Missions.tsx, CaseFiles.tsx, Training.tsx, TeamUp.tsx, Footer.tsx
  Reveal.tsx                        Reusable IntersectionObserver scroll-reveal wrapper
  Burst.tsx                          Reusable comic "POW!/ZAP!" impact-stamp SVG

lib/
  site-config.ts    Name, contact info, nav items, social links (single source of truth)
  fonts.ts             next/font/local definitions
```

## SEO checklist already applied

- Static generation — every route prerenders to plain HTML (`○ Static` in the build output).
- `metadataBase`, canonical URL, title template, keyword/description meta, `robots` directives.
- Open Graph + Twitter Card via Next's file-based image convention (auto-generates the right tags).
- JSON-LD (`Person` + `WebSite` + `ProfilePage`) injected in `app/layout.tsx`.
- `sitemap.xml` and `robots.txt` generated from `lib/site-config.ts` (no hand-maintained duplicates).
- Self-hosted fonts via `next/font/local` — no external font request, no layout shift.
- Semantic HTML (`header`/`main`/`section`/`footer`), single `h1`, logical heading order, skip link.
- `prefers-reduced-motion` respected throughout (animations disable automatically).

## Deploying

Any Next.js-compatible host works. The easiest path is **Vercel**: push this to a GitHub repo and
import it at vercel.com — it detects Next.js automatically. Set `NEXT_PUBLIC_SITE_URL` as an
environment variable in the project settings before the first production deploy.
