import pkg from './package';

module.exports = {
  ssr: true,
  target: 'static',
  telemetry: false,
  modern: process.env.NODE_ENV === 'development' ? false : 'client',
  head: {
    titleTemplate: chunk => chunk ? `${chunk} | Alex Collier` : 'Alex Collier',
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
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
    ],
  },
  css: [
    'sanitize.css/evergreen.css',
    'sanitize.css/forms.evergreen.css',
    'sanitize.css/assets.css',
    'sanitize.css/reduce-motion.css',
    '~/assets/styles/styles.scss',
  ],
  loading: false,
  plugins: [
    '~/plugins/vue-lazyload.js',
  ],
  modules: [
    '@nuxt/content',
  ],
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-vsc-dark-plus.css',
      },
      liveEdit: false,
    },
  },
};
