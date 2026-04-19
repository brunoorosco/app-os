import parserTypeScript from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from './.prettierrc.js';

export default [
  {
    ignores: ['node_modules', 'dist', 'build', '.expo', '.expo-shared', '.prettierrc.js',],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: parserTypeScript,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      import: pluginImport,
      'jsx-a11y': pluginJsxA11y,
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': ['error', prettierConfig],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import/order': ['error', { alphabetize: { order: 'asc', caseInsensitive: true } }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
