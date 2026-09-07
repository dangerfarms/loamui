import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "@loamui/core";

export interface HeaderRootProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * A site header: brand, primary navigation and a row of actions.
 *
 * Compose it from parts. The brand is your own link home inside
 * `Header.Brand`, and the nav is a plain list of links the consumer
 * writes, with the current page marked by `aria-current="page"`, so a
 * router and a static site drive both the same way; in a narrow container
 * the list wraps beneath the brand row with no script and no hamburger.
 * Stickiness is the consumer's CSS (`position: sticky` on the root), not
 * a prop.
 *
 * ```tsx
 * <Header.Root>
 *   <Header.Brand><a href="/">Loam</a></Header.Brand>
 *   <Header.Nav aria-label="Primary">
 *     <li><a href="/docs" aria-current="page">Docs</a></li>
 *     <li><a href="/pricing">Pricing</a></li>
 *   </Header.Nav>
 *   <Header.Actions>
 *     <Button>Sign in</Button>
 *   </Header.Actions>
 * </Header.Root>
 * ```
 */
function HeaderRoot({ className, children, ref, ...rest }: HeaderRootProps) {
  return (
    <header ref={ref} className={cx("loam-Header", className)} {...rest}>
      {children}
    </header>
  );
}

export interface HeaderBrandProps extends HTMLAttributes<HTMLDivElement> {
  /** Your link home: an `<a href="/">`, or a router link, holding the logo or the name. */
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/**
 * The logo or name, around your link home: the same shape as
 * `Footer.Brand`, so a router link goes in as itself. (It was once the
 * anchor; the link is yours now.)
 */
function HeaderBrand({ className, children, ref, ...rest }: HeaderBrandProps) {
  return (
    <div ref={ref} className={cx("brand", className)} {...rest}>
      {children}
    </div>
  );
}

interface HeaderNavBaseProps extends HTMLAttributes<HTMLElement> {
  /** The items: `<li><a href>` pairs. Mark the current page with `aria-current="page"`. */
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * The nav needs a name, because every nav on a page needs a distinct one:
 * either an `aria-label` ("Primary") or an `aria-labelledby` pointing at
 * text already on the page.
 */
export type HeaderNavProps = HeaderNavBaseProps &
  (
    | { "aria-label": string; "aria-labelledby"?: string }
    | { "aria-label"?: string; "aria-labelledby": string }
  );

/** A `nav` landmark wrapping a `ul` of the consumer's `li > a` items. */
function HeaderNav({ className, children, ref, ...rest }: HeaderNavProps) {
  return (
    <nav ref={ref} className={cx("nav", className)} {...rest}>
      <ul>{children}</ul>
    </nav>
  );
}

export interface HeaderPartProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** A flex row at the end of the header: a Button, a theme toggle, an avatar. */
function HeaderActions({ className, children, ref, ...rest }: HeaderPartProps) {
  return (
    <div ref={ref} className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

export const Header = {
  Root: HeaderRoot,
  Brand: HeaderBrand,
  Nav: HeaderNav,
  Actions: HeaderActions,
};
