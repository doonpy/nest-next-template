module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6
  },
  plugins: ['simple-import-sort', '@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
  env: {
    node: true,
    jest: true
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'off',
    'simple-import-sort/imports': 'error',
    'no-console': 'error',
    '@typescript-eslint/no-explicit-any': 'off'
  }
};
