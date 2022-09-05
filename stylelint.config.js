module.exports = {
  extends: ['@acollier/stylelint-config-scss', 'stylelint-config-recommended-vue'],
  rules: {
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
  },
};
