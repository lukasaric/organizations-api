'use strict';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    '@extensionengine/eslint-config/base'
  ],
  plugins: ['jest', '@typescript-eslint'],
  env: {
    'jest/globals': true
  },
  rules: {
    strict: 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
};
