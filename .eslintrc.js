module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: [
    "gridsome"
  ],
  extends: [
    "@vue/standard",
    "plugin:vue/recommended"
  ],
  rules: {
    "gridsome/format-query-block": "error",
    "max-len": "off",
    "no-console": process.env.NODE_ENV === "production" ? "off" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-param-reassign": "off",
    "camelcase": "off",
    "semi": [
      2,
      "never"
    ],
    "space-before-function-paren": [
      "error",
      "never"
    ],
    "vue/html-closing-bracket-newline": "off",
    "vue/max-attributes-per-line": [
      1,
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    "vue/singleline-html-element-content-newline": "off",
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        registeredComponentsOnly: true,
        ignores: []
      }
    ],
    "vue/no-v-html": "off"
  }
};
