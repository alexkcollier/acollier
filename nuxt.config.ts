// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./node_modules/@nuxtjs/i18n/dist/types.d.mts" />
import { defineNuxtConfig } from 'nuxt/config';
import pkg from './package.json';

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
  css: [
    'sanitize.css',
    'sanitize.css/forms.css',
    'sanitize.css/assets.css',
    'sanitize.css/reduce-motion.css',
    '~/assets/styles/styles.scss',
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
      include: ['@vue/devtools-core', '@vue/devtools-kit'],
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
