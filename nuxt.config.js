import pkg from './package';

module.exports = {
  ssr: true,
  target: 'static',
  telemetry: false,
  modern: 'client',
  head: {
    titleTemplate: chunk => chunk ? `${chunk} | Alex Collier` : 'Alex Collier',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Jost:wght@300;700&display=swap',
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
  build: {
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        });
      }
    },
  },
};
