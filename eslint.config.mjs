// import perfectionistAlphabetical from 'eslint-plugin-perfectionist/configs/recommended-alphabetical';
// import perfectionistNatural from 'eslint-plugin-perfectionist/configs/recommended-natural';
import perfectionistLineLength from 'eslint-plugin-perfectionist/configs/recommended-line-length';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import perfectionist from 'eslint-plugin-perfectionist';
import tseslint from 'typescript-eslint';
import pluginJs from '@eslint/js';
import globals from 'globals';

export default [
  { files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'] },
  {
    ignores: [
      '**/node_modules/**',
      'dist/**',
      'built/**',
      'scripts/**/*.js',
      'scripts/**/*.d.*',
      'internal/**',
      'coverage/**',
    ],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  perfectionistLineLength,
  eslintPluginPrettierRecommended,
  {
    rules: {
      '@typescript-eslint/adjacent-overload-signatures': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      'prettier/prettier': 'error',
    },
    plugins: {
      perfectionist,
    },
  },
];
