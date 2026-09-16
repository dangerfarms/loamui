import loamui from "./skills/loamui/assets/stylelint-base.mjs";

/** @type {import("stylelint").Config} */
export default {
  ...loamui,
  referenceFiles: ["packages/core/src/tokens.css"],
  overrides: [
    {
      // The docs site: CSS Modules use camelCase local names, and its own
      // custom properties live in globals.css.
      files: ["apps/*/**/*.css"],
      rules: {
        "selector-class-pattern": "^[a-z][a-zA-Z0-9-]*$",
      },
      referenceFiles: ["packages/core/src/tokens.css", "apps/docs/src/app/globals.css"],
    },
  ],
};
