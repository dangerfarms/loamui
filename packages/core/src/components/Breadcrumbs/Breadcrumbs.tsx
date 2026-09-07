import type { ReactNode } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { renderWithProps } from "../../render";
import type { RenderProp } from "../../render";

/**
 * Shows the path to the current page.
 *
 * ```tsx
 * <Breadcrumbs.Root>
 *   <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
 *   <Breadcrumbs.Item href="/settings">Settings</Breadcrumbs.Item>
 *   <Breadcrumbs.Item current>Billing</Breadcrumbs.Item>
 * </Breadcrumbs.Root>
 * ```
 *
 * Items are links via `href` (the built-in element), plain text when
 * `current`, or any element via `render`, e.g. a router link:
 * `render={<Link href="/settings" />}`. The consumer marks the current page
 * explicitly, so truncated paths ("Home / … / Billing") stay correct.
 * Separators are CSS, drawn from the public `--loam-breadcrumbs-separator`
 * property (a CSS string, `"/"` by default), not DOM.
 */

export interface BreadcrumbsRootProps extends PartProps<"nav"> {
  /** The words the landmark speaks: `navigation` is its accessible name. */
  labels?: { navigation?: string };
}

function BreadcrumbsRoot({ labels, className, children, ...rest }: BreadcrumbsRootProps) {
  const navigationLabel = labels?.navigation ?? "Breadcrumbs";
  return (
    <nav aria-label={navigationLabel} {...rest} className={cx("loam-Breadcrumbs", className)}>
      <ol>{children}</ol>
    </nav>
  );
}

/** Wiring the Item attaches to the link it renders. */
export interface BreadcrumbsItemRenderProps {
  "aria-current": "page" | undefined;
  children?: ReactNode;
}

export interface BreadcrumbsItemProps extends PartProps<"li"> {
  /** Renders the crumb as a link. */
  href?: string;
  /** Marks this item as the current page (`aria-current="page"`). */
  current?: boolean;
  /**
   * Substitute the built-in link, e.g. a router link:
   * `render={<Link href="/settings" />}`. Defaults to an `<a>` when `href`
   * is given, plain text otherwise. Attributes for the link itself go on
   * the element you render; `className`, `ref` and the rest land on the
   * `<li>`, which carries the part's class.
   */
  render?: RenderProp<BreadcrumbsItemRenderProps>;
}

function BreadcrumbsItem({
  current,
  render,
  href,
  className,
  children,
  ...rest
}: BreadcrumbsItemProps) {
  const wiring: BreadcrumbsItemRenderProps = {
    "aria-current": current ? "page" : undefined,
    children,
  };

  const content = render ? (
    renderWithProps(render, wiring)
  ) : href !== undefined ? (
    <a href={href} {...wiring}>
      {children}
    </a>
  ) : (
    <span {...wiring}>{children}</span>
  );

  return (
    <li
      {...rest}
      className={cx("loam-Breadcrumbs-item", className)}
      data-current={current || undefined}
    >
      {content}
    </li>
  );
}

export const Breadcrumbs = {
  Root: BreadcrumbsRoot,
  Item: BreadcrumbsItem,
};
