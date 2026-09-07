"use client";

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { cx } from "@loamui/core";
import type { PartProps } from "@loamui/core";

interface SideNavContextValue {
  /** A Title tells the nav its id; the nav is named by its Titles while any is present. */
  registerTitle: (id: string) => () => void;
}

const SideNavContext = createContext<SideNavContextValue | null>(null);

export interface SideNavRootProps extends PartProps<"nav"> {
  /**
   * Names the landmark for assistive technology. A page may have several
   * navs (a header, a table of contents), so each needs a distinct name.
   * A `SideNav.Title` inside names the nav by itself; without one, "Main"
   * is the default, because a side nav is usually the primary one. An
   * `aria-labelledby` you pass wins over both.
   */
  "aria-label"?: string;
  /** Lists, optionally headed by a Title, and Groups. */
  children?: ReactNode;
}

/**
 * Vertical navigation for an application or a documentation site: a nav
 * landmark holding lists of links, with the current page marked and
 * related pages folded into collapsible groups.
 *
 * The links are yours, so a router and a static site drive it the same
 * way: write an `a` (or your router's link) inside each `SideNav.Item`,
 * set `aria-current="page"` on the page in view and the stylesheet marks
 * it with a line and weight, never colour alone. A Group is a native
 * disclosure, so it opens and closes without JavaScript and remembers
 * nothing; the group holding the current page should be `open`, which is
 * your attribute, not a prop the composition infers. An icon is an `svg`
 * you place before the link's text, `aria-hidden` and sized on it. An
 * icon-only rail is not a prop: it is your CSS on your own container,
 * keeping the text in the markup (visually hidden) so every link keeps
 * its name. Width and stickiness are the parent's layout.
 *
 * ```tsx
 * <SideNav.Root>
 *   <SideNav.List>
 *     <SideNav.Item><a href="/">Dashboard</a></SideNav.Item>
 *     <SideNav.Item><a href="/projects" aria-current="page">Projects</a></SideNav.Item>
 *     <SideNav.Item>
 *       <SideNav.Group open>
 *         <SideNav.GroupTitle>Reports</SideNav.GroupTitle>
 *         <SideNav.List>
 *           <SideNav.Item><a href="/reports/weekly">Weekly</a></SideNav.Item>
 *         </SideNav.List>
 *       </SideNav.Group>
 *     </SideNav.Item>
 *   </SideNav.List>
 * </SideNav.Root>
 * ```
 */
function SideNavRoot({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  children,
  ref,
  ...rest
}: SideNavRootProps) {
  const [titleIds, setTitleIds] = useState<string[]>([]);
  const registerTitle = useCallback((id: string) => {
    setTitleIds((ids) => [...ids, id]);
    return () => setTitleIds((ids) => ids.filter((each) => each !== id));
  }, []);
  const value = useMemo<SideNavContextValue>(() => ({ registerTitle }), [registerTitle]);
  // A name the consumer gives wins; then the Titles inside; then "Main".
  const named = ariaLabelledBy != null || ariaLabel != null;
  const titled = !named && titleIds.length > 0;
  return (
    <SideNavContext value={value}>
      <nav
        ref={ref}
        className={cx("loam-SideNav", className)}
        aria-label={named || titled ? ariaLabel : "Main"}
        aria-labelledby={titled ? titleIds.join(" ") : ariaLabelledBy}
        {...rest}
      >
        {children}
      </nav>
    </SideNavContext>
  );
}

export interface SideNavTitleProps extends PartProps<"p"> {
  children?: ReactNode;
}

/**
 * A small uppercase label above a list; a paragraph, not a heading, so it
 * never enters the page's outline. It names the nav: with one Title the
 * landmark is announced by it; with several, every Title is part of the
 * name, so give a nav with several sections an `aria-label` of its own.
 */
function SideNavTitle({ className, children, ref, id, ...rest }: SideNavTitleProps) {
  const ctx = useContext(SideNavContext);
  if (!ctx) {
    throw new Error("SideNav.Title must be rendered inside <SideNav.Root>.");
  }
  const autoId = useId();
  const titleId = id ?? autoId;
  const { registerTitle } = ctx;
  useEffect(() => registerTitle(titleId), [registerTitle, titleId]);
  return (
    <p ref={ref} id={titleId} className={cx("title", className)} {...rest}>
      {children}
    </p>
  );
}

export interface SideNavListProps extends PartProps<"ul"> {
  /** Items. */
  children?: ReactNode;
}

/** An unordered list with no markers. Nest one inside an Item to indent a level, or inside a Group to fold it. */
function SideNavList({ className, children, ref, ...rest }: SideNavListProps) {
  return (
    <ul ref={ref} className={className} {...rest}>
      {children}
    </ul>
  );
}

export interface SideNavItemProps extends PartProps<"li"> {
  /** Your link (`a`, or a router's), or a Group; then an optional nested List. */
  children?: ReactNode;
}

/**
 * One entry, around your link. The link is yours because nothing here
 * would add to it: write `<a href>` with `aria-current="page"` on the
 * page in view, and an `svg` (aria-hidden) before the text for an icon.
 */
function SideNavItem({ className, children, ref, ...rest }: SideNavItemProps) {
  return (
    <li ref={ref} className={className} {...rest}>
      {children}
    </li>
  );
}

export interface SideNavGroupProps extends PartProps<"details"> {
  /** A `SideNav.GroupTitle`, then a nested List. */
  children?: ReactNode;
}

/**
 * A collapsible group of links: a native `details`, so it works before
 * JavaScript and keeps no state of its own. Pass `open` on the group that
 * holds the current page; share a `name` across groups and the browser
 * keeps one open at a time. Its own element, not core's Details: that is
 * a boxed surface with a padded body, and a group in a nav is a line
 * among lines.
 */
function SideNavGroup({ className, children, ref, ...rest }: SideNavGroupProps) {
  return (
    <details ref={ref} className={cx("group", className)} {...rest}>
      {children}
    </details>
  );
}

export interface SideNavGroupTitleProps extends PartProps<"summary"> {
  /** The group's name. */
  children?: ReactNode;
}

/** The group's always-visible line, a `summary`, set like the links around it with a chevron at its end. */
function SideNavGroupTitle({ className, children, ref, ...rest }: SideNavGroupTitleProps) {
  return (
    <summary ref={ref} className={cx("group-title", className)} {...rest}>
      {children}
    </summary>
  );
}

export const SideNav = {
  Root: SideNavRoot,
  Title: SideNavTitle,
  List: SideNavList,
  Item: SideNavItem,
  Group: SideNavGroup,
  GroupTitle: SideNavGroupTitle,
};
