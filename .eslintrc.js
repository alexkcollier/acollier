module.exports = {
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['plugin:nuxt/recommended', '@acollier/eslint-config-vue'],
  overrides: [{
    files: ['**/*.vue'],
    globals: {
      // vue
      computed: 'readonly',
      // nuxt
      definePageMeta: 'readonly',
      useRoute: 'readonly',
      useHead: 'readonly',
      useAsyncData: 'readonly',
      queryContent: 'readonly',
      // @nuxtjs/i18n
      useI18n: 'readonly',
      useLocalePath: 'readonly',
      useSwitchLocalePath: 'readonly',
      defineI18nRoute: 'readonly',
    },
  }],
};
