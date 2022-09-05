module.exports = {
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['plugin:nuxt/recommended', '@acollier/eslint-config-vue'],
  overrides: [{
    files: ['**/*.vue'],
    globals: {
      definePageMeta: 'readonly',
      useRoute: 'readonly',
      useHead: 'readonly',
      useAsyncData: 'readonly',
      queryContent: 'readonly',
    },
  }],
};
