/** @type {import('next').NextConfig} */
const path = require("path");
const createMDX = require("@next/mdx");

// Guides are authored as page.mdx — markdown is their source, so the
// machine-readable twins serialize from the same file the page renders.
const withMDX = createMDX({
  options: {
    // Turbopack needs serializable options: plugins by name, not require().
    remarkPlugins: ["remark-gfm"],
  },
});

// GitHub Pages / static-export mode is opt-in via env, so `pnpm dev` and the
// normal `pnpm build` are unaffected:
//   PAGES=true BASE_PATH=/farmui pnpm --filter @farmui/docs build
// For a custom domain (e.g. farmui.dev) leave BASE_PATH empty and add a CNAME.
const isPages = process.env.PAGES === "true";
const basePath = process.env.BASE_PATH || "";

const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  reactStrictMode: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  turbopack: {
    root: path.join(__dirname, "..", ".."),
  },
  ...(isPages
    ? {
        output: "export",
        basePath: basePath || undefined,
        assetPrefix: basePath || undefined,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

module.exports = withMDX(nextConfig);
