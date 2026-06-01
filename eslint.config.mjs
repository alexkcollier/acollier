// @ts-check
import eslintConfigPrettierFlat from 'eslint-config-prettier/flat';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt([
  eslintConfigPrettierFlat,
  {
    rules: {
      'prefer-template': 'error',
      'vue/html-self-closing': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'import/first': 'off',
    },
  },
]);
