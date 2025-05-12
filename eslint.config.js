import { fixupConfigRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          tsx: true,
          ts: true
        }
      },
      globals: globals.browser,
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    rules: {
      "react/react-in-jsx-scope": "off",// Disable the rule
      "require-jsdoc": "off",
      "no-unused-vars": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": ["off"],
      "@typescript-eslint/no-explicit-any": ["off"], // TODO: Remove this when linting errors are fixed
      "@typescript-eslint/ban-types": "off", // TODO: Remove this when linting errors are fixed
      "react/function-component-definition": [
        2,
        {
          "namedComponents": "arrow-function",
          "unnamedComponents": "arrow-function"
        }
      ],
      "no-whitespace-before-property": "error",
      "array-bracket-spacing": ["error", "never"],
      "object-curly-spacing": ["off", "never"],
      "space-before-function-paren": ["off", "never"],
      "linebreak-style": ["error", "unix"],
      "indent": ["off"], // General code indentation using 2 spaces
      "react/jsx-indent": ["off"], // JSX elements indentation using 2 spaces
      "react/jsx-indent-props": ["off"], // JSX props indentation using 2 spaces
      "no-trailing-spaces": "error",
      "@typescript-eslint/indent": ["off"],
      "@typescript-eslint/quotes": ["error", "double"],
      "semi": ["error", "always"],
      "@typescript-eslint/semi": ["error", "always"],
      "react/jsx-curly-spacing": ["error", { "when": "never", "children": true }],
      "react/jsx-max-props-per-line": ["error", { "maximum": 1, "when": "always" }],
      "react/jsx-tag-spacing": ["error", { "closingSlash": "never", "beforeSelfClosing": "always", "afterOpening": "never", "beforeClosing": "never" }],
    },
  },
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      ".next/",
      "coverage/",
      "*.min.js",
      "*.bundle.js",
      "*.cjs",
      "README.md"
    ]
  }
];
