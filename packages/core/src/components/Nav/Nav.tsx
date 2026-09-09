"use client";

import { createContext, useContext, useLayoutEffect, useMemo, useRef } from "react";
import type { ReactNode, ToggleEvent } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { useNamePart, useNamedRoot } from "../../naming";
import { renderWithProps } from "../../render";
import type { RenderProp } from "../../render";

/**
 * Vertical navigation, composed from parts: a `nav` landmark holding lists
 * of links, with the current page marked and related pages folded into
 * groups.
 *
 * ```tsx
 * <Nav.Root>
 *   <Nav.Title>Project</Nav.Title>
 *   <Nav.List>
 *     <Nav.Item><Nav.Link href="/">Dashboard</Nav.Link></Nav.Item>
 *     <Nav.Item><Nav.Link href="/projects" current>Projects</Nav.Link></Nav.Item>
 *     <Nav.Item>
 *       <Nav.Group defaultOpen>
 *         <Nav.GroupTitle>Reports</Nav.GroupTitle>
 *         <Nav.List>
 *           <Nav.Item><Nav.Link href="/reports/weekly">Weekly</Nav.Link></Nav.Item>
 *         </Nav.List>
 *       </Nav.Group>
 *     </Nav.Item>
 *   </Nav.List>
 * </Nav.Root>
 * ```
 *
 * The landmark is named by its Title from the first render; without one it
 * carries `labels.navigation`. A Link is an `<a href>` by default, or a
 * router's link through `render`; `current` sets `aria-current` and the
 * stylesheet marks it with a line and weight, never colour alone. A Group
 * is a native `details`, so it folds without JavaScript. A List nested in
 * an Item indents a level.
 *
 * One Root carries one name, so a sidebar with several titled sections is
 * one Root per section, stacked; the stylesheet spaces them. A horizontal
 * nav is the consumer's flex row on the List, with the current marker moved
 * under the link by the public `--loam-nav-current-edge: block-end` on the
 * Root (`inline-start` by default).
 */

/** The words a Nav says on its own, each with an English default. */
export interface NavLabels {
  /**
   * The landmark's accessible name while no `Nav.Title` is rendered. A
   * Title names the nav by itself, and an `aria-label` or
   * `aria-labelledby` you pass wins over both. @default "Navigation"
   */
  navigation?: string;
}

const DEFAULT_LABELS: Required<NavLabels> = {
  navigation: "Navigation",
};

interface NavContextValue {
  /** The id the Title renders, minted by the Root. */
  nameId: string;
  register: (id: string) => () => void;
}

const NavContext = createContext<NavContextValue | null>(null);

function useNav(part: string): NavContextValue {
  const ctx = useContext(NavContext);
  if (!ctx) {
    throw new Error(`${part} must be rendered inside <Nav.Root>.`);
  }
  return ctx;
}

export interface NavRootProps extends PartProps<"nav"> {
  /** The landmark's own words. */
  labels?: NavLabels;
  /** A Title, then Lists. */
  children?: ReactNode;
}

/**
 * The `nav` landmark. Named by its Title from the first render, so the
 * server HTML already carries the name; if no Title registers, the
 * reference is dropped after mount and `labels.navigation` names it
 * instead. A consumer's `aria-label` or `aria-labelledby` wins over both.
 */
function NavRoot({ labels, className, children, ref, ...rest }: NavRootProps) {
  const { nameId, register, labelling } = useNamedRoot(
    rest,
    labels?.navigation ?? DEFAULT_LABELS.navigation,
  );
  const value = useMemo<NavContextValue>(() => ({ nameId, register }), [nameId, register]);
  return (
    <NavContext value={value}>
      <nav ref={ref} className={cx("loam-Nav", className)} {...rest} {...labelling}>
        {children}
      </nav>
    </NavContext>
  );
}

export interface NavTitleProps extends PartProps<"p"> {
  /**
   * Render the title as a heading where the nav belongs in the page's
   * outline: `render={<h2 />}`. A paragraph by default, so a nav's label
   * never enters the outline uninvited.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/** A small label above the lists. It carries the id that names the nav. */
function NavTitle({ render, className, children, ref, id, ...rest }: NavTitleProps) {
  const resolvedId = useNamePart(useNav("Nav.Title"), id);
  const props = { ref, id: resolvedId, className: cx("title", className), ...rest };
  if (render) return <>{renderWithProps(render, { ...props, children })}</>;
  return <p {...props}>{children}</p>;
}

export interface NavListProps extends PartProps<"ul"> {
  /** Items. */
  children?: ReactNode;
}

/**
 * An unordered list with no markers, one line per Item. Nest one inside an
 * Item to indent a level, or inside a Group to fold it. Inside a `nav` an
 * unmarked list keeps its list semantics in every browser, so it needs no
 * role.
 */
function NavList({ className, children, ref, ...rest }: NavListProps) {
  useNav("Nav.List");
  return (
    <ul ref={ref} className={className} {...rest}>
      {children}
    </ul>
  );
}

export interface NavItemProps extends PartProps<"li"> {
  /** A Link or a Group; then an optional nested List. */
  children?: ReactNode;
}

/** One entry. */
function NavItem({ className, children, ref, ...rest }: NavItemProps) {
  useNav("Nav.Item");
  return (
    <li ref={ref} className={className} {...rest}>
      {children}
    </li>
  );
}

/** What `aria-current` can say: `true` is `"page"`. */
export type NavCurrent = boolean | "page" | "step" | "location" | "date" | "time";

/** Wiring the Link attaches to the element it renders. */
export interface NavLinkRenderProps {
  className: string;
  href: string | undefined;
  "aria-current": Exclude<NavCurrent, boolean> | undefined;
  children?: ReactNode;
}

export interface NavLinkProps extends PartProps<"a"> {
  /**
   * Marks the destination the reader is at: `true` for the current page
   * (`aria-current="page"`), `"location"` for the section in view of a
   * table of contents, or another `aria-current` token.
   */
  current?: NavCurrent;
  /**
   * Substitute the built-in `<a>` with a router's link:
   * `render={<Link href="/projects" />}`. The element receives the wiring
   * (`aria-current`, the part's class) and the Link's other props; its own
   * props win over `href`.
   */
  render?: RenderProp<NavLinkRenderProps & Record<string, unknown>>;
  /** The link's text, with an optional `svg` icon before it. */
  children?: ReactNode;
}

/**
 * A destination: an `<a href>`, or any element through `render`. `current`
 * sets `aria-current` and the stylesheet marks the line from that same
 * attribute. An `svg` child is an icon, sized on the text; keep it
 * `aria-hidden` so the link is named by its words.
 */
function NavLink({ current, render, href, className, children, ...rest }: NavLinkProps) {
  useNav("Nav.Link");
  const wiring: NavLinkRenderProps = {
    className: cx("link", className),
    href,
    "aria-current": current === true ? "page" : current || undefined,
    children,
  };
  if (render) return <>{renderWithProps(render, { ...rest, ...wiring })}</>;
  return (
    <a {...rest} {...wiring}>
      {children}
    </a>
  );
}

export interface NavGroupProps extends Omit<PartProps<"details">, "open"> {
  /** Controlled open state. Pair with `onOpenChange`. */
  open?: boolean;
  /** Open at first render, for uncontrolled usage. */
  defaultOpen?: boolean;
  /** Fires with the new state when the reader opens or closes the group. */
  onOpenChange?: (open: boolean) => void;
  /** A GroupTitle, then a nested List. */
  children?: ReactNode;
}

/**
 * A fold of related links: a native `details`, so it opens and closes
 * without JavaScript. Share a `name` across groups and the browser keeps
 * one open at a time. A group holding the current page is styled as such
 * by the stylesheet, from the Link's own `aria-current`.
 */
function NavGroup({
  open,
  defaultOpen,
  onOpenChange,
  onToggle,
  className,
  children,
  ref,
  ...rest
}: NavGroupProps) {
  useNav("Nav.Group");
  const controlled = open !== undefined;
  // What the attribute should read now. A toggle that lands on it is our
  // own synchronisation (React setting the prop, or the revert below), not
  // a reader's action, and is not reported.
  const expected = useRef(controlled ? open : (defaultOpen ?? false));
  useLayoutEffect(() => {
    if (controlled) expected.current = open;
  }, [controlled, open]);
  const handleToggle = (event: ToggleEvent<HTMLDetailsElement>) => {
    onToggle?.(event);
    const next = event.currentTarget.open;
    if (next === expected.current) return;
    if (controlled) event.currentTarget.open = expected.current;
    else expected.current = next;
    onOpenChange?.(next);
  };
  return (
    <details
      ref={ref}
      className={cx("group", className)}
      open={controlled ? open : defaultOpen}
      onToggle={handleToggle}
      {...rest}
    >
      {children}
    </details>
  );
}

export interface NavGroupTitleProps extends PartProps<"summary"> {
  /** The group's name, with an optional `svg` icon before it. */
  children?: ReactNode;
}

/** The group's always-visible line, a `summary` set like the links around it, with a chevron at its end. */
function NavGroupTitle({ className, children, ref, ...rest }: NavGroupTitleProps) {
  useNav("Nav.GroupTitle");
  return (
    <summary ref={ref} className={cx("group-title", className)} {...rest}>
      {children}
    </summary>
  );
}

export const Nav = {
  Root: NavRoot,
  Title: NavTitle,
  List: NavList,
  Item: NavItem,
  Link: NavLink,
  Group: NavGroup,
  GroupTitle: NavGroupTitle,
};
