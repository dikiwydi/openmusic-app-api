module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'no-underscore-dangle': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/no-require': 'off',
    'import/extensions': 'off',
    'no-console': 'off',
  },
};
