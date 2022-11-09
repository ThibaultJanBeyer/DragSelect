module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:security/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      modules: true,
    },
  },
  plugins: ['prettier', 'jest', 'security', '@typescript-eslint/tslint'],
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
    'no-extra-parens': 'off',
    'no-mixed-operators': 'off',
    'no-underscore-dangle': 'off',
    'no-return-assign': 'off',
    'no-unused-vars': 'off',
    'consistent-return': 'off',
    'no-plusplus': 'off',
  },
  env: {
    'jest/globals': true,
    browser: true,
    es6: true,
  },
  globals: {
    fetch: false,
  },
}
