module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'standard',
    'prettier',
    'prettier/standard',
    'plugin:prettier/recommended',
    'plugin:security/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      modules: true,
    },
  },
  plugins: ['prettier', 'standard', 'jest', 'security'],
  overrides: [
    {
      files: ['**/*.spec.js'],
      rules: {
        'import/first': 'off',
        'security/detect-non-literal-regexp': 'off',
      },
    },
  ],
  rules: {
    'prettier/prettier': 'error',
  },
  env: {
    'jest/globals': true,
    browser: true,
    "es6": true
  },
  globals: {
    fetch: false,
  },
}
