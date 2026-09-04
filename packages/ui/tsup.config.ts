import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  treeshake: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "react/jsx-runtime", "@loamui/core"],
  // Same contract as @loamui/core: rebuild the static stylesheet and prepend
  // the "use client" directive after every build (see scripts/build-css.mjs).
  onSuccess: "node scripts/build-css.mjs",
});
