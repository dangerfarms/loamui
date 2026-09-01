import type { AnchorHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils";
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
 * `current`, or any element via `render` — e.g. a router link:
 * `render={<Link href="/settings" />}`. The consumer marks the current page
 * explicitly, so truncated paths ("Home / … / Billing") stay correct.
 * Separators are CSS (`--_separator`), not DOM.
 */

export interface BreadcrumbsRootProps extends HTMLAttributes<HTMLElement> {
  /** Separator glyph drawn between items (via CSS). @default "/" */
  separator?: string;
}

function BreadcrumbsRoot({ separator, className, style, children, ...rest }: BreadcrumbsRootProps) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className={cx("loam-Breadcrumbs", className)}
      style={
        separator !== undefined
          ? ({
              ...style,
              "--_separator": `"${separator.replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`,
            } as CSSProperties)
          : style
      }
      {...rest}
    >
      <ol>{children}</ol>
    </nav>
  );
}

/** Wiring the Item attaches to whatever it renders. */
export interface BreadcrumbsItemRenderProps {
  "aria-current": "page" | undefined;
  children?: ReactNode;
  className?: string;
}

export interface BreadcrumbsItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Marks this item as the current page (`aria-current="page"`). */
  current?: boolean;
  /**
   * Substitute the built-in element — e.g. a router link:
   * `render={<Link href="/settings" />}`. Defaults to an `<a>` when `href`
   * is given, plain text otherwise.
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
    renderWithProps(render, { ...rest, ...wiring, className })
  ) : href !== undefined ? (
    <a href={href} className={className} {...rest} {...wiring}>
      {children}
    </a>
  ) : (
    <span className={className} {...(rest as HTMLAttributes<HTMLElement>)} {...wiring}>
      {children}
    </span>
  );

  return (
    <li className="loam-Breadcrumbs-item" data-current={current || undefined}>
      {content}
    </li>
  );
}

export const Breadcrumbs = {
  Root: BreadcrumbsRoot,
  Item: BreadcrumbsItem,
};
