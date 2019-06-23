module.exports = {
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'max-len': [
      'error',
      {
        code: 250
      }
    ],
    '@typescript-eslint/indent': ['error', 2]
  }
};
