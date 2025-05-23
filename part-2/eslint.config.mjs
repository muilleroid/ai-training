import { fixupPluginRules } from '@eslint/compat';
import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPluginConfigRecommended from 'eslint-plugin-prettier/recommended';
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys';
import typescriptSortKeysPlugin from 'eslint-plugin-typescript-sort-keys';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  {
    ignores: ['@type-extensions', 'data', 'node_modules', '*.cjs', '*.js', '*.mjs'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  eslint.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,
  prettierConfig,
  prettierPluginConfigRecommended,
  {
    rules: {
      'max-classes-per-file': ['error', 1],
      'max-len': ['error', 120],
      'no-console': ['error', { allow: ['error'] }],
      'no-empty-pattern': 'warn',
      'no-return-await': 'error',
      'no-shadow': 'off',
      'no-trailing-spaces': 'error',
      'object-shorthand': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: '*', prev: ['const', 'let'] },
        { blankLine: 'always', next: 'class', prev: '*' },
        { blankLine: 'always', next: 'export', prev: '*' },
        { blankLine: 'any', next: 'export', prev: 'export' },
        { blankLine: 'always', next: 'for', prev: '*' },
        { blankLine: 'always', next: 'function', prev: '*' },
        { blankLine: 'always', next: 'if', prev: '*' },
        { blankLine: 'always', next: 'return', prev: '*' },
        { blankLine: 'always', next: 'switch', prev: '*' },
        { blankLine: 'always', next: 'try', prev: '*' },
        { blankLine: 'always', next: 'while', prev: '*' },
        { blankLine: 'any', next: ['const', 'let'], prev: ['const', 'let'] },
      ],
      'sort-keys': ['warn', 'asc', { allowLineSeparatedGroups: true, caseSensitive: false }],
    },
  },
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': false,
        },
      ],
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/class-literal-property-style': ['error', 'fields'],
      '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/member-ordering': [
        'warn',
        {
          default: {
            memberTypes: [
              'public-static-field',
              'private-static-field',
              'public-instance-field',
              'private-instance-field',
              'public-constructor',
              'private-constructor',
              'public-instance-method',
              'private-instance-method',
              'protected-instance-method',
            ],
            order: 'alphabetically',
          },
        },
      ],
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },
  {
    plugins: { import: fixupPluginRules(importPlugin) },
    rules: {
      'import/export': 'error',
      'import/first': 'error',
      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
      'import/no-extraneous-dependencies': 'off',
      'import/no-mutable-exports': 'warn',
      'import/no-unresolved': 'error',
      'import/no-unused-modules': 'warn',
      'import/no-useless-path-segments': 'warn',
      'import/order': [
        'warn',
        {
          'newlines-between': 'always-and-inside-groups',
          groups: [['builtin', 'external'], 'internal', 'parent', 'sibling', 'index', 'object'],
          pathGroups: [
            {
              group: 'builtin',
              pattern: 'bun:**',
              position: 'before',
            },
          ],
        },
      ],
      'import/prefer-default-export': 'off',
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          bun: true,
        },
      },
    },
  },
  {
    plugins: { 'typescript-sort-keys': fixupPluginRules(typescriptSortKeysPlugin) },
    rules: {
      'typescript-sort-keys/interface': 'warn',
      'typescript-sort-keys/string-enum': 'warn',
    },
  },
  {
    plugins: { 'sort-destructure-keys': fixupPluginRules(sortDestructureKeysPlugin) },
    rules: {
      'sort-destructure-keys/sort-destructure-keys': ['warn', { caseSensitive: false }],
    },
  },
);
