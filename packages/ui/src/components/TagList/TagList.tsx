import type { ReactNode, Ref } from "react";
import { Badge, cx } from "@loamui/core";
import type { BadgeProps, PartProps, RenderProp } from "@loamui/core";

/** The words the list says on its own, each with an English default. */
export interface TagListLabels {
  /** The list's accessible name. @default "Tags" */
  list?: string;
}

export interface TagListRootProps extends PartProps<"ul"> {
  /**
   * The list's own words: `list` names it, so the set is announced as
   * "Tags, list, 5 items" rather than an anonymous list. An `aria-label`
   * or `aria-labelledby` you pass wins.
   */
  labels?: TagListLabels;
  /** `TagList.Item`s. */
  children?: ReactNode;
}

/**
 * The topics attached to something: an article's tags, a product's
 * categories, each a link to everything that shares it.
 *
 * The judgment is in what a tag is. It looks like a Badge because it is
 * one: core's `Badge`, rendered as a link through its `render` when the
 * tag has an `href` (or a `render` of your own, for a router's link) and
 * as the plain `span` Badge when it has neither, so a tag list reads as
 * Badges that happen to be links and takes a `--loam-context` region's
 * tint the same way. The link's accessible name is the tag text itself,
 * no icon, no hidden label. The set is a `ul` named "Tags" (with
 * `role="list"`, since removing the markers drops list semantics in some
 * browsers), so a screen reader announces the count before the first
 * tag. On a tag's own page, mark that tag `aria-current="page"`: the
 * composition rings it, never colour alone. Long lists wrap; nothing is
 * truncated to "+3 more", because a hidden tag is a tag the reader cannot
 * follow. A tag is a target, so the Badge is the large size, which clears
 * the 24 CSS px floor (WCAG 2.5.8) that a status Badge need not.
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
  labels,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  children,
  ...rest
}: TagListRootProps) {
  const name = ariaLabelledBy ? ariaLabel : (ariaLabel ?? labels?.list ?? "Tags");
  return (
    // role="list" is not redundant here: the stylesheet removes the
    // markers, and a list styled with list-style: none loses its list
    // semantics in some browsers. The list is not inside a nav (it is
    // metadata, not navigation), so nothing else restores the role, and
    // without it the aria-label and the count would go unannounced.
    <ul
      className={cx("loam-TagList", className)}
      role="list"
      aria-label={name}
      aria-labelledby={ariaLabelledBy}
      {...rest}
    >
      {children}
    </ul>
  );
}

export interface TagListItemProps extends Omit<PartProps<"a">, "ref"> {
  /**
   * Where the tag leads: the page listing everything with this tag. With
   * it the tag is a link; without it, plain text in the same pill.
   */
  href?: string;
  /**
   * Render the link as a different element: `render={<Link to="/tags/css" />}`
   * for a router link. The Badge's class and the part's attributes merge onto it.
   */
  render?: RenderProp<Record<string, unknown>>;
  /** The tag text: the link's accessible name. */
  children?: ReactNode;
  /** Reaches the Badge, the link or the span, not the `li` around it. */
  ref?: Ref<HTMLElement>;
}

/**
 * One tag: an `li` holding a core Badge rendered as a link (with `href` or
 * `render`) or as its plain `span` (without). The props are the link's:
 * `rel`, `target`, `aria-current` and the rest land on the Badge, the
 * pill itself, not on the `li`, which carries nothing but its place in
 * the list.
 */
function TagListItem({ href, render, children, ...rest }: TagListItemProps) {
  const link = render ?? (href != null ? <a href={href}>{children}</a> : undefined);
  return (
    <li className="item">
      <Badge size="lg" render={link} {...(rest as BadgeProps)}>
        {children}
      </Badge>
    </li>
  );
}

export const TagList = {
  Root: TagListRoot,
  Item: TagListItem,
};
