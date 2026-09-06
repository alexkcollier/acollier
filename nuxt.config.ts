// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./node_modules/@nuxtjs/i18n/dist/types.d.mts" />
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineNuxtConfig } from 'nuxt/config';
import pkg from './package.json';

/**
 * The `@layer` statement from `app/assets/styles/layers.css`, comments
 * stripped. It is inlined into the head below because layer order is fixed
 * by the first statement the browser parses, and the bundler — not the
 * `css` array — decides which stylesheet that is. See that file for why.
 */
const layerOrder = readFileSync(
  fileURLToPath(new URL('./app/assets/styles/layers.css', import.meta.url)),
  'utf8',
)
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .trim();

export default defineNuxtConfig({
  ssr: true,
  telemetry: false,
  devtools: {
    enabled: true,
  },
  app: {
    layoutTransition: { name: 'fade', mode: 'out-in' },
    pageTransition: { name: 'fade', mode: 'out-in' },
    head: {
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, interactive-widget=resizes-content',
        },
        { name: 'description', content: pkg.description },
        { name: 'color-scheme', content: 'light dark' },
      ],
      // Must be the first thing in the head; see `layerOrder` above.
      style: [{ innerHTML: layerOrder, tagPriority: -100 }],
      script: [
        {
          innerHTML:
            "try { var t = localStorage.getItem('theme'); if (t === 'light' || t === 'dark') { document.documentElement.dataset.theme = t; } } catch (e) { /* ignore */ }",
        },
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
        },
      ],
    },
  },
  // Order here is documentation only — the cascade order comes from
  // `layers.css`, inlined in `app.head.style` above.
  css: [
    '~/assets/styles/reset.css',
    '~/assets/styles/tokens.css',
    '~/assets/styles/theme.css',
    '~/assets/styles/base.css',
    '~/assets/styles/compositions.css',
    '~/assets/styles/utilities.css',
    '~/assets/styles/typography.css',
    '~/assets/styles/elements.css',
    '~/assets/styles/forms.css',
    '~/assets/styles/page-transition.css',
  ],
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    'nuxt-svgo',
    '@nuxt/image',
    '@nuxt/icon',
    'nuxt-gtag',
    '@netlify/nuxt',
  ],
  typescript: {
    typeCheck: true,
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'dompurify',
        'marked',
      ],
    },
  },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 1,
        },
      },
    },
  },
  i18n: {
    customRoutes: 'meta',
    locales: [
      {
        code: 'en',
        name: 'English',
        language: 'en-CA',
        file: 'en/index.ts',
      },
      {
        code: 'fr',
        name: 'Français',
        language: 'fr-CA',
        file: 'fr/index.ts',
      },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
  },
  icon: {
    // The theme glyphs are the only icons that can't be server-rendered —
    // ColorSwitcher picks one after mount. Ship them in the client bundle so
    // they don't wait on a fetch to the icon API.
    clientBundle: {
      icons: ['lucide:moon', 'lucide:sun'],
    },
  },
  gtag: {
    id: 'G-G07YCE0VSK',
    enabled: process.env.NODE_ENV === 'production',
  },
  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: 'append',
      },
    },
  },
});
