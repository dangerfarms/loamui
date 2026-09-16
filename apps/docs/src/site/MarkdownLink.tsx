"use client";

import { usePathname } from "next/navigation";
import "./MarkdownLink.css";

/**
 * Links each docs page to its machine-readable twin — the sibling URL with
 * `.md` appended (/docs/tokens → /docs/tokens.md). The href is absolute and
 * base-path-prefixed: a raw anchor to a static file gets no automatic
 * basePath, and an absolute path avoids the dev-vs-export trailing-slash
 * trap a relative href would hit.
 */
export function MarkdownLink() {
  const pathname = usePathname();
  if (!pathname?.startsWith("/docs")) return null;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const href = `${base}${pathname.replace(/\/$/, "")}.md`;
  return (
    <a className="site-MarkdownLink" href={href} title="Read this page as Markdown">
      View as Markdown
    </a>
  );
}
