/**
 * One stylelint config for the whole repo (the shared modern-CSS config
 * shape: standard + modern + alphabetical order, strict disable
 * reporting, core reference-file custom-property checking, nesting
 * enforced). Package differences are handled with overrides only.
 */

/** @type {import("stylelint").Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-modern",
    "stylelint-config-alphabetical-order",
  ],
  plugins: ["stylelint-use-nesting"],
  reportDescriptionlessDisables: true,
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,
  referenceFiles: ["packages/core/src/tokens.css"],
  rules: {
    "csstools/use-nesting": "always",
    "no-unknown-custom-properties": true,
    "no-unknown-animations": true,
    "no-unknown-custom-media": true,
    "media-feature-range-notation": "context",
    "unit-disallowed-list": [["vw", "vh"]],
    "declaration-no-important": true,
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
      // The sites (docs, ui): CSS Modules use camelCase local names, and their
      // own custom properties live in globals.css.
      files: ["apps/*/**/*.css"],
      rules: {
        "selector-class-pattern": "^[a-z][a-zA-Z0-9-]*$",
      },
      referenceFiles: [
        "packages/core/src/tokens.css",
        "apps/docs/src/app/globals.css",
        "apps/ui/src/app/globals.css",
      ],
    },
  ],
};
