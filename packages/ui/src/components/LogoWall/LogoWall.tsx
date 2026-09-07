import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "@loamui/core";

export interface LogoWallRootProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode;
  ref?: Ref<HTMLUListElement>;
}

/**
 * A row of client or partner logos that read as one set.
 *
 * The unit is the logo. `LogoWall.Item` is a list item that hosts your
 * `img` (or a link around one), and it sizes the image to one shared
 * height, `--loam-logo-size` (2.5rem by default), so a square mark and a
 * wide wordmark sit together; the width follows from the image's own aspect
 * ratio. An item stands on its own inside any list you lay out yourself.
 * `LogoWall.Root` is optional: a `ul` with `role="list"` (list-style none
 * drops the list semantics in some browsers) that wraps the logos into a
 * centred row, so assistive technology announces how many there are.
 *
 * Give every image a real `alt`, the organisation's name, never "logo";
 * when a logo links out, the link carries that name. No greyscale filter:
 * brands own their colour. Add one in your own CSS if the page wants it.
 *
 * ```tsx
 * <LogoWall.Root aria-label="Trusted by">
 *   <LogoWall.Item>
 *     <img src="/logos/acme.svg" alt="Acme" />
 *   </LogoWall.Item>
 *   <LogoWall.Item>
 *     <a href="https://northwind.example">
 *       <img src="/logos/northwind.svg" alt="Northwind" />
 *     </a>
 *   </LogoWall.Item>
 * </LogoWall.Root>
 * ```
 */
function LogoWallRoot({ className, children, ref, ...rest }: LogoWallRootProps) {
  return (
    // role="list" is not redundant here: a list styled with list-style:
    // none loses its list semantics in some browsers, and the explicit
    // role is what keeps the count announced for assistive tech.
    <ul ref={ref} className={cx("loam-LogoWall", className)} role="list" {...rest}>
      {children}
    </ul>
  );
}

export interface LogoWallItemProps extends HTMLAttributes<HTMLLIElement> {
  /** An `img` with the organisation's name as its `alt`, or a link around one. */
  children?: ReactNode;
  ref?: Ref<HTMLLIElement>;
}

/** One logo: a list item that sizes the image inside it. Works in a list of your own or inside a Root. */
function LogoWallItem({ className, children, ref, ...rest }: LogoWallItemProps) {
  return (
    <li ref={ref} className={cx("loam-LogoWall-item", className)} {...rest}>
      {children}
    </li>
  );
}

export const LogoWall = {
  Root: LogoWallRoot,
  Item: LogoWallItem,
};
