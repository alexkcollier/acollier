# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # dev server at localhost:3000 (no Netlify functions)
netlify dev          # dev server at localhost:8888 with Netlify functions (contact form)
npm run generate     # static site generation (used for production builds)
npm run lint         # ESLint
npm run lint:css     # Stylelint (Vue + CSS)
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

Styles are **plain CSS with custom properties** — no preprocessor, no PostCSS plugins, and no utility-class framework. Global stylesheets live in `app/assets/styles/*.css` and are listed explicitly in the `css` array in `nuxt.config.ts`; component styles live in the component's own `<style>` block. The design system is defined in `app/assets/styles/theme.css` (color ramps, spacing scale, type scale, radius tokens, breakpoint values).

Both themes are declared once via `light-dark()`, which resolves against `color-scheme`: `:root` is `light dark` (following the OS), and `ColorSwitcher` stamps `data-theme` on `:root` to pin a choice. There is no `prefers-color-scheme` block in the token layer.

Native CSS nesting is used for pseudo-classes, compound selectors, descendants and at-rules, but it cannot concatenate selectors, so BEM elements and modifiers are written out in full at the top level. Media and container query conditions cannot read `var()`, so breakpoints are hardcoded there and kept in sync with the `--bp-*` custom properties by hand. The `stylelint-order` plugin enforces **alphabetical CSS property ordering** and a specific ordering (custom properties → declarations → nested rules → `@media` → `@container`).

See `.claude/rules/css.md` for the full conventions.

### Static Assets (`public/`)

`public/images/` holds all case study media, organized into subdirectories that mirror the content slugs (e.g. `public/images/agentic-analysis-report/`). Each case study directory contains a mix of `.png` screenshots and `.webm` videos. Video files are produced with `scripts/encode-webm.sh` (requires `ffmpeg`).

`public/images/tools/` contains SVG/PNG icons for the "Built with" tool list rendered on each case study page — these are referenced by the `img` field in the content frontmatter's `tools` array.

`public/docs/` holds the downloadable resume PDFs (`alex-collier-resume.pdf`, `cv-alex-collier.pdf`).

Favicon and PWA icons (`android-chrome-*.png`, `apple-touch-icon.png`, etc.) live at the root of `public/`.

### Key Config

- `NuxtLink` always appends trailing slashes (configured in `nuxt.config.ts` under `experimental.defaults.nuxtLink`).
- Google Analytics (`nuxt-gtag`) is only enabled in production.
- TypeScript type checking is enabled via `nuxt.config.ts` (`typescript.typeCheck: true`).
