/** @type {import('stylelint').Config} */
export default {
  plugins: ['stylelint-order'],
  // The `.css` glob would otherwise pick up generated build output
  ignoreFiles: [
    '**/node_modules/**',
    '.output/**',
    '.nuxt/**',
    '.netlify/**',
    'dist/**',
  ],
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],

  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'blockless-after-same-name-blockless'],
        ignore: ['after-comment'],
      },
    ],
    // plugin rules
    'order/order': [
      'custom-properties',
      'declarations',
      'rules',
      {
        type: 'at-rule',
        name: 'media',
      },
      {
        type: 'at-rule',
        name: 'container',
      },
    ],
    'order/properties-alphabetical-order': true,
    'selector-class-pattern': [
      '^[a-z][a-z0-9-]*(__[a-z][a-z0-9-]*)?(--[a-z][a-z0-9-]*)?$',
      { message: 'Expected class selector to be BEM or kebab-case' },
    ],
    'selector-id-pattern': null,
  },
};
