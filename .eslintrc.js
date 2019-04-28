module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-typescript'],
  plugins: ['@typescript-eslint', 'react', 'jsx-a11y', 'react-hooks', 'jest'],
  env: {
    browser: true,
    'jest/globals': true,
  },
  rules: {
    'import/prefer-default-export': false,
  }
};
