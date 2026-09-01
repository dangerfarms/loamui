import type { AnchorHTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";

export interface SkipLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** The id of the main content landmark, e.g. `"#content"`. */
  href: string;
  children?: ReactNode;
  ref?: Ref<HTMLAnchorElement>;
}

/**
 * The first focusable element on the page: a link straight to the main
 * content, visible only while focused.
 *
 * ```tsx
 * <body>
 *   <SkipLink href="#content" />
 *   <header>…</header>
 *   <main id="content" tabIndex={-1}>…</main>
 * </body>
 * ```
 *
 * Keyboard and screen-reader users otherwise re-traverse the whole header
 * on every page. Render it before everything else; the target needs the
 * matching `id` (and `<main>` is the right home for it).
 */
export function SkipLink({ className, children, ref, ...rest }: SkipLinkProps) {
  return (
    <a ref={ref} className={cx("loam-SkipLink", className)} {...rest}>
      {children ?? "Skip to main content"}
    </a>
  );
}
