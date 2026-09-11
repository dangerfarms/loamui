import type { ReactNode } from "react";
import classes from "./examples-preview.module.css";

/** Only the whole-document theme recipe needs a separate browsing context. */
export function ExamplePreview({ slug, children }: { slug: string; children: ReactNode }) {
  if (slug !== "scheme-toggle") return children;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  // This trusted first-party document needs its own DOM and storage key, not a security sandbox.
  return (
    // oxlint-disable-next-line react/iframe-missing-sandbox
    <iframe
      className={classes.document}
      title="Colour scheme example — independent page"
      src={`${base}/preview/scheme-toggle/`}
      loading="lazy"
    />
  );
}
