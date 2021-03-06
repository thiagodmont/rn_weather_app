module.exports = {
  root: true,
  extends: [
    '@react-native-community/eslint-config',
    'standard-with-typescript',
    'eslint-config-prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-native'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'project': './tsconfig.json'
  },
  'env': {
    'react-native/react-native': true
  },
  'rules': {
    'prettier/prettier': 'off',
    'react-native/no-unused-styles': 'warn',
    'react-native/no-inline-styles': 'error',
    'react-native/no-raw-text': ['warn', {
      skip: ['Subtitle', 'Title', 'Body', 'Caption']
    }],
    'react-native/no-single-element-style-arrays': 'warn',
    'object-curly-spacing': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'react/jsx-curly-spacing': 'off',
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': 'error',
  }
}
