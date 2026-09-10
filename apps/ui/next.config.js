/** @type {import('next').NextConfig} */
const path = require("path");

// Static-export mode is opt-in via env, like apps/docs. This site deploys
// under the docs site's origin at /ui until it gets its own domain:
//   PAGES=true BASE_PATH=/ui pnpm --filter @loamui/ui-site build
const isPages = process.env.PAGES === "true";
const basePath = process.env.BASE_PATH || "";

const nextConfig = {
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

module.exports = nextConfig;
