// @ts-check
import eslintConfigPrettierFlat from 'eslint-config-prettier/flat';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  ...eslintConfigPrettierFlat,
});
