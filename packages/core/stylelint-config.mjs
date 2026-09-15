/**
 * LoamUI's stylelint configuration, shared with consumers as
 * `@loamui/core/stylelint-config`. It encodes the CSS authoring standard the
 * library and its recipes follow (the modern-css rule set and Google's Modern
 * Web Guidance): nesting and logical properties enforced, colours as oklch()
 * or tokens, no !important, range media queries, and every custom property
 * checked against the shipped tokens so a mistyped --loam-* fails the lint
 * instead of the page.
 *
 * Extend it from a project's stylelint.config.mjs (this file is named so stylelint does not discover it by itself) and add the project's own
 * token files to referenceFiles:
 *
 *   import loamui from "@loamui/core/stylelint-config";
 *   export default { ...loamui, referenceFiles: [...loamui.referenceFiles, "src/app/globals.css"] };
 */
import { fileURLToPath } from "node:url";

const shippedTokens = fileURLToPath(new URL("./dist/styles.css", import.meta.url));

/** @type {import("stylelint").Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-modern",
    "stylelint-config-alphabetical-order",
  ],
  plugins: ["stylelint-use-nesting", "stylelint-use-logical"],
  reportDescriptionlessDisables: true,
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,
  referenceFiles: [shippedTokens],
  rules: {
    "csstools/use-nesting": "always",
    "csstools/use-logical": "always",
    "no-unknown-custom-properties": true,
    "no-unknown-animations": true,
    "no-unknown-custom-media": true,
    "media-feature-range-notation": "context",
    "unit-disallowed-list": [["vw", "vh"]],
    "declaration-no-important": true,
    // Colour is oklch() or a token; hex, named, rgb() and hsl() are not
    // perceptually uniform and cannot derive light-dark() pairs.
    "color-no-hex": true,
    "color-named": "never",
    "function-disallowed-list": ["rgb", "rgba", "hsl", "hsla"],
    // Type follows the fluid scale; a px font size defeats the reader's zoom.
    "declaration-property-unit-disallowed-list": { "font-size": ["px"] },
  },
};
