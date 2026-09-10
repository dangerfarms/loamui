import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SkipLink } from "@loamui/core";
import { Header } from "@/site/Header";

export const metadata: Metadata = {
  title: {
    default: "LoamUI compositions",
    template: "%s · LoamUI compositions",
  },
  description:
    "Ready-made sections built from @loamui/core primitives: hero, header, footer, pricing, testimonials and more. Install @loamui/ui or copy the code.",
};

export const viewport: Viewport = { colorScheme: "light dark" };

const themeInit = `
(function () {
  try {
    var t = localStorage.getItem("loamui-theme");
    if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
  } catch (e) {}
})();
`;

function cssHref(base: string, file: string): string {
  try {
    const css = readFileSync(join(process.cwd(), "public", file));
    const v = createHash("sha256").update(css).digest("hex").slice(0, 8);
    return `${base}/${file}?v=${v}`;
  } catch {
    return `${base}/${file}`;
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const base = process.env.BASE_PATH || "";
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href={cssHref(base, "loamui-core.css")} />
        <link rel="stylesheet" href={cssHref(base, "loamui-ui.css")} />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <SkipLink href="#content">Skip to content</SkipLink>
        <Header />
        <main id="content" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
