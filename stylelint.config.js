module.exports = {
  plugins: ['stylelint-order'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss',
  ],
  overrides: [
    {
      files: [
        '**/*.scss',
      ],
      customSyntax: 'postcss-scss',
    },
    {
      files: [
        '**/*.vue',
      ],
      customSyntax: 'postcss-html',
    },
  ],

  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        except: [
          'first-nested',
          'blockless-after-same-name-blockless',
        ],
        ignore: ['after-comment'],
        ignoreAtRules: ['else'],
      },
    ],
    // plugin rules
    'order/order': [
      'custom-properties',
      'dollar-variables',
      {
        type: 'at-rule',
        name: 'function',
      },
      {
        type: 'at-rule',
        name: 'mixin',
      },
      {
        type: 'at-rule',
        name: 'extend',
      },
      {
        type: 'at-rule',
        name: 'include',
      },
      'declarations',
      'rules',
      {
        type: 'at-rule',
        name: 'media',
      },
      // exception for breakpoint mixins
      {
        type: 'at-rule',
        name: 'include',
        parameter: '(breakpoints?|bp)\\..*',
      },
    ],
    'order/properties-alphabetical-order': true,
    'scss/at-else-empty-line-before': 'never',
    'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
  },
};
