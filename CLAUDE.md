# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # dev server at localhost:3000 (no Netlify functions)
netlify dev          # dev server at localhost:8888 with Netlify functions (contact form)
npm run generate     # static site generation (used for production builds)
npm run lint         # ESLint
npm run lint:css     # Stylelint (Vue + SCSS)
npm run format       # Prettier
```

There are no tests.

## Architecture

This is a personal portfolio site (acollier.ca) built with **Nuxt 4** + Vue 3, deployed to Netlify as a statically generated site (`nuxi generate`). The Nuxt 4 app directory convention puts all app code under `app/`.

### Content System

Portfolio case studies are written in Markdown under `content/en/work/`. The `content.config.ts` defines two typed `@nuxt/content` collections — `work_en` and `work_fr` — with a shared Zod schema (required: `title`, `description`, `featureImage`, `tags`, `tools`; optional: `order`, `links`). French translations live under `content/fr/work/` but are incomplete; `work/[...slug].vue` falls back to `work_en` when a French doc is missing.

### Internationalization

`@nuxtjs/i18n` uses the `prefix_except_default` strategy: English routes have no prefix (`/work`), French routes get `/fr/` prefix (`/fr/projets`). Route aliases are declared per-page via `definePageMeta({ i18n: { paths: { en: '...', fr: '...' } } })`. Translation strings live in `i18n/locales/en/index.ts` and `i18n/locales/fr/index.ts`.

### Contact Form

The contact form (`app/pages/contact.vue`) posts to the `/.netlify/functions/mail` Netlify Function (`functions/mail.js`), which sends email via Mailgun. The function requires env vars `MG_API_KEY`, `MG_DOMAIN`, and `MG_RECIPIENT`. Errors are reported to Sentry via `SENTRY_DSN`. Running `netlify dev` is required to test this locally.

### Styling

Styles use **SCSS with CSS custom properties** — no utility-class framework. The design system is defined in `app/assets/styles/_theme.scss` as CSS custom properties (color ramps, spacing scale, type scale, radius tokens). Dark/light mode is toggled via a `data-theme` attribute on `:root`, with a `prefers-color-scheme` media query fallback. The `stylelint-order` plugin enforces **alphabetical CSS property ordering** and a specific at-rule ordering (`@extend` → `@include` → declarations → nested rules → `@media`).

### Static Assets (`public/`)

`public/images/` holds all case study media, organized into subdirectories that mirror the content slugs (e.g. `public/images/agentic-analysis-report/`). Each case study directory contains a mix of `.png` screenshots and `.webm` videos. Video files are produced with `scripts/encode-webm.sh` (requires `ffmpeg`).

`public/images/tools/` contains SVG/PNG icons for the "Built with" tool list rendered on each case study page — these are referenced by the `img` field in the content frontmatter's `tools` array.

`public/docs/` holds the downloadable resume PDFs (`alex-collier-resume.pdf`, `cv-alex-collier.pdf`).

Favicon and PWA icons (`android-chrome-*.png`, `apple-touch-icon.png`, etc.) live at the root of `public/`.

### Key Config

- `NuxtLink` always appends trailing slashes (configured in `nuxt.config.ts` under `experimental.defaults.nuxtLink`).
- Google Analytics (`nuxt-gtag`) is only enabled in production.
- TypeScript type checking is enabled via `nuxt.config.ts` (`typescript.typeCheck: true`).
