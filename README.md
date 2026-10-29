# Muhammad Adil, developer portfolio

**Live site:** [muhammadadil.cloud](https://muhammadadil.cloud)

![Muhammad Adil, full stack and AI developer](public/images/og-card.jpg)

The portfolio of Muhammad Adil, a full stack and AI developer in Canada. Nine pages, prerendered to static HTML,
hydrated with React, designed around one offer (web, mobile and AI products built end to end) and one action
(start a conversation).

## Pages

| URL | Purpose |
|---|---|
| `/` | Home: hero with the portrait and sticky note facts, the fan deck of nine live sites, the five offers picker, client messages as a chat thread, the timeline path, how a project goes, FAQ, closing call to action |
| `/projects/` | Three case studies and nine live client projects with roles |
| `/projects/knowwhere/`, `/projects/bc-scrap-cars/`, `/projects/sb-traworld/` | Case studies |
| `/services/` | Five services with proof, process, pricing model, FAQ |
| `/about/` | Entity page: facts, timeline, principles, stack, profiles |
| `/contact/` | Direct lines and a validated contact form (FormSubmit) |
| `/privacy/` | Short privacy note (not indexed) |
| `/404.html` | Branded not found page (served by `.htaccess`) |

## How it is built

- **React 19 + Vite 8 + Tailwind CSS 4.** One HTML entry per page (`vite.config.js`), no client side router.
- **Prerendered.** `npm run build` runs `vite build`, then `scripts/prerender.mjs` renders every route with
  `react-dom/server` and writes the HTML into `dist/`. Crawlers and AI assistants get full content without JavaScript;
  the browser hydrates the same markup.
- **SEO data in one place.** `src/data/site.js` holds the identity used by every page, `src/seo/schema.js` builds the
  JSON-LD graph (Person, ProfilePage, WebSite, ProfessionalService, FAQPage, BreadcrumbList, SoftwareApplication) and
  `src/seo/head.js` builds the head tags.
- **Design system.** "The builder's desk, in daylight": paper white, navy ink, sky blue and leaf green taken from the
  portrait, sticky note yellow for handwritten facts. Bricolage Grotesque for type, Caveat only for handwritten
  annotations (both self hosted). Phosphor icons inlined. No animation library: a canvas dot grid that reacts to the
  pointer, a scroll driven card fan, a scroll drawn timeline and `IntersectionObserver` reveals, all in
  `src/components/` with `prefers-reduced-motion` respected.
- **Hosting.** Hostinger, continuous deployment from `main`. `public/.htaccess` redirects www to the apex, strips
  `index.html`, sets the 404 page and cache headers.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173, every page under its own path
npm run lint
npm run build    # dist/ with prerendered HTML
npm run preview  # serve dist/ locally
```

Requires Node.js 20.19 or newer.

## Updating content

- **Identity, links, stats:** `src/data/site.js`
- **Home page copy** (rolling words, sticky notes, facts, offers, steps, quotes): `src/data/home.js`
- **Client projects:** `src/data/projects.js` (screenshots in `public/images/projects/spotlight/`)
- **Case studies:** `src/data/caseStudies.js`; a new case study also needs an HTML entry under `projects/<slug>/`,
  an entry in `vite.config.js`, `src/entries/<slug>.jsx` and a line in `public/sitemap.xml`
- **Services, process:** `src/data/services.js`
- **FAQ:** `src/data/faq.js`
- **Skills, timeline:** `src/data/skills.js`
- **Resume:** edit `cv/cv.html`, print to PDF (headless Chrome, Letter, backgrounds on), copy to `cv/Muhammad-Adil-CV.pdf` and `public/files/adil-cv.pdf`
- **Social card:** `public/images/og-card.jpg` (1200x630), referenced from `src/data/site.js`
- **Portrait:** `public/images/muhammad-adil.webp` (About page) and the transparent cutout `muhammad-adil-cutout.webp` (home hero)
- **AI assistants summary:** `public/llms.txt`

## SEO files

`public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, `public/.htaccess`, `public/site.webmanifest`.
The audit and plan behind this build are in `docs/SEO_AUDIT_2026-10-12.md`.

## License

Copyright Muhammad Adil. All rights reserved. The source is shared for reference. Please do not copy the design
or content without permission.
