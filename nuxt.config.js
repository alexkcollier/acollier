import pkg from './package';
import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
  ssr: true,
  target: 'static',
  telemetry: false,
  modern: process.env.NODE_ENV === 'development' ? false : 'client',
  meta: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;700&display=swap',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
    ],
  },
  css: [
    'sanitize.css',
    'sanitize.css/forms.css',
    'sanitize.css/assets.css',
    'sanitize.css/reduce-motion.css',
    '~/assets/styles/styles.scss',
  ],
  loading: false,
  modules: [
    '@nuxt/content',
  ],
  content: {
    highlight: {
      theme: 'github-dark-dimmed',
    },
  },
});
