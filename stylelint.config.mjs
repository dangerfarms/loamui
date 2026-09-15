/**
 * One stylelint config for the whole repo: the shared config that ships to
 * consumers (packages/core/stylelint-config.mjs), plus the repo's own
 * conventions for class and custom-property names. Package differences are
 * handled with overrides only.
 */
import shared from "./packages/core/stylelint-config.mjs";

/** @type {import("stylelint").Config} */
export default {
  ...shared,
  referenceFiles: ["packages/core/src/tokens.css"],
  rules: {
    ...shared.rules,
    // Scope roots are `loam-` + PascalCase (optionally a semantic root
    // suffix); everything else is a short kebab-case part class.
    "selector-class-pattern": [
      "^(loam-[A-Z][a-zA-Z]*(-[a-z][a-zA-Z]*)*|[a-z][a-z0-9]*(-[a-z0-9]+)*)$",
      {
        resolveNestedSelectors: true,
        message: (selector) =>
          `Expected class "${selector}" to be a loam- scope root or a short kebab-case part class`,
      },
    ],
    // Public tokens are kebab-case; component-private properties carry
    // the `--_` prefix.
    "custom-property-pattern": [
      "^_?[a-z][a-z0-9]*(-[a-z0-9]+)*$",
      {
        message: (property) =>
          `Expected custom property "${property}" to be kebab-case (with an optional leading _ for private)`,
      },
    ],
  },
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
