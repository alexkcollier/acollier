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

Portfolio case studies are written in Markdown, but the content itself does not live in this repo — `content.config.ts` defines two typed `@nuxt/content` collections, `work_en` and `work_fr`, that pull from a remote content repository (`contentRepoConfig`, configured via the `CONTENT_REPO_URL` / `CONTENT_REPO_USER` / `CONTENT_REPO_TOKEN` env vars) at `content/en/**` and `content/fr/**` respectively, sharing one Zod schema (required: `title`, `description`, `featureImage`, `tags`, `tools`; optional: `order`, `links`, `featured`). French translations are incomplete; `work/[...slug].vue` falls back to `work_en` when a French doc is missing.

### Internationalization

`@nuxtjs/i18n` uses the `prefix_except_default` strategy: English routes have no prefix (`/work`), French routes get `/fr/` prefix (`/fr/projets`). Route aliases are declared per-page via `definePageMeta({ i18n: { paths: { en: '...', fr: '...' } } })`. Translation strings live in `i18n/locales/en/index.ts` and `i18n/locales/fr/index.ts`.

### Contact Form

The contact form (`app/pages/contact.vue`) posts to the `/.netlify/functions/mail` Netlify Function (`functions/mail.js`), which sends email via Mailgun. The function requires env vars `MG_API_KEY`, `MG_DOMAIN`, and `MG_RECIPIENT`. Errors are reported to Sentry via `SENTRY_DSN`. Running `netlify dev` is required to test this locally.

### Styling

Styles are **plain CSS with custom properties** — no preprocessor, no PostCSS plugins, and no utility-class framework. The organising idea is **CUBE CSS** (Composition, Utility, Block, Exception) over a shared token set, with **cascade layers** enforcing the order.

The layer order is declared once at the top of `app/assets/styles/reset.css`, which must stay first in the `css` array in `nuxt.config.ts`:

```css
@layer reset, tokens, theme, global, composition, utility, block, exception;
```

Every rule in the project sits in one of those layers — global stylesheets wrap their whole contents in a single `@layer`, and so does every component `<style>` block (`@layer block { … }`, plus `@layer exception { … }` where a component has states or variants). Unlayered CSS beats every layer, so nothing may be left outside one. A later layer wins regardless of specificity.

Global stylesheets live in `app/assets/styles/*.css` and are listed explicitly in the `css` array; component styles live in the component's own `<style>` block. The design system is defined in `app/assets/styles/tokens.css` (color ramps, spacing scale, type scale, radius tokens, breakpoint values, motion and elevation scales, a z-index scale, and page tokens) — the only place custom properties are declared. `app/assets/styles/compositions.css` holds the layout primitives (`.wrapper`, `.stack`, `.cluster`, `.with-sidebar`), each tuned by inherited custom properties that the consuming block sets. `app/assets/styles/utilities.css` holds the single-job, token-derived classes (`.visually-hidden`, `.list-bare`, `.font-mono`, `.text-muted`). Note that `utility` sits before `block`, so a block outranks a utility on the same property — a utility carries the default and the component departs from it. The `exception` layer holds state and variant rules, which live in an `@layer exception { … }` block after the component's `@layer block { … }` and are keyed off attributes rather than `--modifier` classes — a native one where it exists (`[aria-expanded='true']`, `:disabled`), otherwise a `data-*` matched on its value (`[data-variant='mini']`), never on its presence.

Both themes are declared once via `light-dark()`, which resolves against `color-scheme`. The switch itself lives in `app/assets/styles/theme.css` and its own `theme` layer: a blocking inline script in `nuxt.config.ts`'s `app.head.script` reads any theme saved to `localStorage` and stamps `data-theme` on `:root` before first paint, so a visitor with a pinned preference never sees a flash of the OS theme — only a visitor with nothing stored falls through to `:root`'s `light dark` following the OS. `ColorSwitcher` defers rendering its icon until mounted, so it can't render a guess that disagrees with what the script already pinned, then stamps `data-theme` itself when the visitor toggles. There is no `prefers-color-scheme` block in the token layer.

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
