// Brings the matcher type augmentations into the `tsc` program. jest-dom ships
// a vitest-aware augmentation; vitest-axe's is too old for vitest 3, so we
// declare its single matcher ourselves.
import "@testing-library/jest-dom/vitest";

declare module "vitest" {
  interface Assertion<T = unknown> {
    toHaveNoViolations(): T;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}
