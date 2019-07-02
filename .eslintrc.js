module.exports =  {
  parser: '@typescript-eslint/parser',
  plugins: ["@typescript-eslint", "prettier", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  env: {
    es6: true,
    node: true
  },
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-explicit-any": "off"
  },
  parserOptions:  {
    ecmaVersion:  2018,
    sourceType:  'module'
  },
  overrides: [
    {
      files: [
        "lambda/test/**/*.ts",
        "shared/test/**/*.ts",
        "web-app/test/**/*.ts",
      ],
      "env": {
        "jest/globals": true
      },
      "rules": {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-var-requires": "off",
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-alias-methods": "error",
        "jest/no-identical-title": "error",
        "jest/no-jest-import": "error",
        "jest/no-test-prefixes": "error",
        "jest/no-test-callback": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/prefer-spy-on": "error",
        "jest/valid-expect": "error"
      }
    }
  ]
};