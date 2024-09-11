module.exports = {
  env: {
    'jest/globals': true,
  },
  root: true,
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:import/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: '.',
    project: ['./tsconfig.json'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
      typescript: {},
    },
  },
  ignorePatterns: ['.eslintrc.js', 'webpack.config.mjs'],
  plugins: [
    '@typescript-eslint',
    'react-native',
    'perfectionist',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: false,
        printWidth: 80,
        endOfLine: 'lf',
        tabWidth: 2,
        indentStyle: 'space',
        bracketSameLine: false,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'sort-imports': ['error', {ignoreCase: true, ignoreDeclarationSort: true}],
    '@typescript-eslint/func-call-spacing': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'perfectionist/sort-objects': ['error', {
      type: 'alphabetical',
    }],
    'perfectionist/sort-jsx-props': [
      'error',
      {
        type: 'alphabetical',
        order: 'asc',
        ignoreCase: true,
        ignorePattern: [],
        groups: [],
        customGroups: {},
      },
    ],
    'import/order': [
      'error', 
      { 
        "newlines-between": "always",
        groups: [
          ['external', 'builtin'],
          'internal',
          ['sibling', 'parent'],
          'index',
          'type',
        ],
        pathGroups: [
          {
            pattern: '@(react|react-native)',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@cool*/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal', 'type'],
        alphabetize: {
          order: 'asc',
          orderImportKind: 'asc',
          caseInsensitive: true,
        },
      }]
  }
};
