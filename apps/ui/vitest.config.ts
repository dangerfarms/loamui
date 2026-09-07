import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// The site builds against the published dist of @loamui/core and @loamui/ui.
// The tests read the gallery pages' copy and must not need a build first, so
// both packages resolve to their source here.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@loamui\/core$/, replacement: here("../../packages/core/src/index.ts") },
      { find: /^@loamui\/ui$/, replacement: here("../../packages/ui/src/index.ts") },
      { find: /^@\//, replacement: here("./src/") },
    ],
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
    // Importing every gallery page and both packages from source takes a
    // few seconds when turbo runs the suites side by side.
    testTimeout: 30_000,
  },
});
