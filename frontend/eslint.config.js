import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import babelParser from '@babel/eslint-parser';

export default [
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: eslintPluginReact,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    ignores: ['node_modules/', 'build/', 'dist/'],
  },
];
