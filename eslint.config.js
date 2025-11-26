import js from "@eslint/js";
import n from "eslint-plugin-n";
import globals from "globals";

const messages = {
  gh237: "See https://github.com/mochajs/mocha/issues/237",
  gh3604: "See https://github.com/mochajs/mocha/issues/3604",
};

export default [
  n.configs["flat/recommended-script"],
  {
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      sourceType: "script",
    },
    rules: {
      "n/prefer-node-protocol": "error",
      "n/file-extension-in-import": ["error", "always"],
      "n/file-extension-in-import": ["error", "always"],
      "no-unused-vars": "error",
      strict: ["error", "global"],

      "no-var": "off",
      "n/no-process-exit": "off",
      "n/no-unpublished-require": "off",
      "n/no-unsupported-features/node-builtins": "off",
    },
  },
  {
    files: ["docs/js/**/*.js"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: [
      ".eleventy.js",
      ".wallaby.js",
      "karma.conf.js",
      "bin/*",
      "docs/_data/**/*.cjs",
      "lib/cli/**/*.cjs",
      "lib/nodejs/**/*.cjs",
      "scripts/**/*.{cjs,mjs}",
      "test/**/*.{cjs,mjs}",
      "test/node-unit/**/*.cjs",
    ],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2020,
    },
  },
  {
    files: [
      "lib/nodejs/esm-utils.cjs",
      "rollup.config.js",
      "eslint.config.js",
      "scripts/*.mjs",
      "scripts/pick-from-package-json.cjs",
      "test/compiler-cjs/test.cjs",
    ],
    languageOptions: {
      sourceType: "module",
    },
  },
  {
    files: ["test/compiler-esm/*.{js,mjs}"],
    languageOptions: {
      sourceType: "module",
      // For top-level await support.
      ecmaVersion: 2022,
    },
  },
  {
    files: ["test/**/*.{cjs,mjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.mocha,
        ...globals.node,
        expect: "readonly",
      },
    },
  },
  {
    files: ["test/**/*.mjs"],
    languageOptions: {
      sourceType: "module",
    },
  },
  {
    files: ["bin/*", "lib/**/*.cjs"],
    rules: {
      "no-restricted-globals": [
        "error",
        {
          message: messages.gh237,
          name: "setTimeout",
        },
        {
          message: messages.gh237,
          name: "clearTimeout",
        },
        {
          message: messages.gh237,
          name: "setInterval",
        },
        {
          message: messages.gh237,
          name: "clearInterval",
        },
        {
          message: messages.gh237,
          name: "setImmediate",
        },
        {
          message: messages.gh237,
          name: "clearImmediate",
        },
        {
          message: messages.gh237,
          name: "Date",
        },
      ],
      "no-restricted-modules": ["error", "timers"],
      "no-restricted-syntax": [
        "error",
        // disallow `global.setTimeout()`, `global.setInterval()`, etc.
        {
          message: messages.gh237,
          selector:
            "CallExpression[callee.object.name=global][callee.property.name=/(set|clear)(Timeout|Immediate|Interval)/]",
        },
        // disallow `new global.Date()`
        {
          message: messages.gh237,
          selector:
            "NewExpression[callee.object.name=global][callee.property.name=Date]",
        },
        // disallow property access of `global.<timer>.*`
        {
          message: messages.gh237,
          selector:
            "*[object.object.name=global][object.property.name=/(Date|(set|clear)(Timeout|Immediate|Interval))/]:expression",
        },
      ],
    },
  },
  {
    files: ["lib/reporters/*.cjs"],
    rules: {
      "no-restricted-syntax": [
        "error",
        // disallow Reporters using `console.log()`
        {
          message: messages.gh3604,
          selector:
            "CallExpression[callee.object.name=console][callee.property.name=log]",
        },
      ],
    },
  },
  {
    ignores: [
      "**/*.{fixture,min}.{js,mjs}",
      "coverage/**",
      "docs/{_dist,_site,api,example}/**",
      "docs-next/dist/**",
      "out/**",
      "test/integration/fixtures/**",
      ".karma/**",
      "mocha.js",
    ],
  },
];
