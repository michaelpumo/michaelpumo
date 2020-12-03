module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-scss',
  ],
  rules: {
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'at-rule-no-unknown': null,
    'at-rule-empty-line-before': null,
    // 'at-rule-empty-line-before': [
    //   'always',
    //   {
    //     ignore: ['first-nested', 'inside-block'],
    //     ignoreAtRules: [
    //       'else',
    //       'extend',
    //       'function',
    //       'if',
    //       'import',
    //       'include',
    //       'keyframes',
    //       'media',
    //       'mixin',
    //       'return',
    //       'supports',
    //     ],
    //   },
    // ],
    'block-opening-brace-space-before': 'always',
    'block-closing-brace-newline-after': [
      'always',
      {
        ignoreAtRules: ['if', 'else', 'include'],
      },
    ],
    'at-rule-name-space-after': 'always',
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['first-nested', 'inside-block'],
      },
    ],
    // 'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
    // 'scss/at-else-closing-brace-space-after': 'always-intermediate',
    // 'scss/at-else-empty-line-before': 'never',
    // 'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
    // 'scss/at-if-closing-brace-space-after': 'always-intermediate',
  },
}
