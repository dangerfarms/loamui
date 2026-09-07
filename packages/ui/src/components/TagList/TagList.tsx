import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";
import { renderWithProps, cx } from "@loamui/core";
import type { RenderProp } from "@loamui/core";

export interface TagListRootProps extends HTMLAttributes<HTMLUListElement> {
  /**
   * Names the list for assistive technology, so the set is announced as
   * "Tags, list, 5 items" rather than an anonymous list. Yields to an
   * `aria-labelledby` you pass instead.
   * @default "Tags"
   */
  "aria-label"?: string;
  /** `TagList.Item`s. */
  children?: ReactNode;
  ref?: Ref<HTMLUListElement>;
}

/**
 * The topics attached to something: an article's tags, a product's
 * categories, each a link to everything that shares it.
 *
 * The judgment is in what a tag is. It looks like a Badge, but a Badge is
 * a `span` and never interactive; a tag that leads somewhere is a link,
 * so `TagList.Item` renders an `a` when it has an `href` (or a `render`,
 * for a router's link) and a plain `span` when it has neither, both drawn
 * as the same pill. The link's accessible name is the tag text itself, no
 * icon, no hidden label. The set is a `ul` named "Tags" (with
 * `role="list"`, since removing the markers drops list semantics in some
 * browsers), so a screen reader announces the count before the first
 * tag. On a tag's own page, mark that tag `aria-current="page"`: it is
 * set in a heavier weight and underlined, never colour alone. Long lists
 * wrap; nothing is truncated to "+3 more", because a hidden tag is a tag
 * the reader cannot follow. Every target is floored at 24 CSS px (WCAG
 * 2.5.8). A `--loam-context` region tints the pills the way it tints a
 * Badge.
 *
 * ```tsx
 * <TagList.Root>
 *   <TagList.Item href="/tags/css">CSS</TagList.Item>
 *   <TagList.Item href="/tags/accessibility" aria-current="page">
 *     Accessibility
 *   </TagList.Item>
 *   <TagList.Item>Draft</TagList.Item>
 * </TagList.Root>
 * ```
 */
function TagListRoot({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  children,
  ref,
  ...rest
}: TagListRootProps) {
  return (
    // role="list" is not redundant here: the stylesheet removes the
    // markers, and a list styled with list-style: none loses its list
    // semantics in some browsers. The list is not inside a nav (it is
    // metadata, not navigation), so nothing else restores the role, and
    // without it the aria-label and the count would go unannounced.
    <ul
      ref={ref}
      className={cx("loam-TagList", className)}
      role="list"
      aria-label={ariaLabelledBy ? ariaLabel : (ariaLabel ?? "Tags")}
      aria-labelledby={ariaLabelledBy}
      {...rest}
    >
      {children}
    </ul>
  );
}

export interface TagListItemProps extends AnchorHTMLAttributes<HTMLElement> {
  /**
   * Where the tag leads: the page listing everything with this tag. With
   * it the tag is a link; without it, plain text in the same pill.
   */
  href?: string;
  /**
   * Render the link as a different element: `render={<Link to="/tags/css" />}`
   * for a router link. The part's class and attributes merge onto it.
   */
  render?: RenderProp<Record<string, unknown>>;
  /** The tag text: the link's accessible name. */
  children?: ReactNode;
  /** Reaches the link or the span, the pill itself, not the `li` around it. */
  ref?: Ref<HTMLElement>;
}

/**
 * One tag: an `li` holding a link (with `href` or `render`) or a `span`
 * (without). The props are the link's: `rel`, `target`, `aria-current` and
 * the rest land on the `a`, not on the `li`, which carries nothing but its
 * place in the list.
 */
function TagListItem({ href, render, className, children, ref, ...rest }: TagListItemProps) {
  const props = { ref, className: cx("tag", className), ...rest };
  let tag: ReactNode;
  if (render) {
    tag = renderWithProps(render, { ...props, href, children });
  } else if (href) {
    tag = (
      <a {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} href={href}>
        {children}
      </a>
    );
  } else {
    tag = <span {...(props as HTMLAttributes<HTMLSpanElement>)}>{children}</span>;
  }
  return <li className="item">{tag}</li>;
}

export const TagList = {
  Root: TagListRoot,
  Item: TagListItem,
};
