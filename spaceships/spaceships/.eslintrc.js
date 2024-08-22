module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "google",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "simple-import-sort"],
  ignorePatterns: [
    "**/*.svg",
    "**/*.po",
    "**/*.scss",
    "**/*.css",
    "**/assets/**",
    "**/styles/assets/**",
    "**/*.mdx",
  ],
  rules: {
    "object-curly-spacing": ["error", "always"],
    "require-jsdoc": "off",
    camelcase: "off",
    "react/display-name": "off",
    "react/self-closing-comp": ["error"],
    "react/prop-types": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "react/react-in-jsx-scope": "off",
    "react/jsx-sort-props": [
      "error",
      {
        reservedFirst: true,
        shorthandLast: true,
        callbacksLast: true,
      },
    ],
  },
};
