"use client";

import { createContext, use, useLayoutEffect, useMemo, useRef } from "react";
import type {
  CSSProperties,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  Ref,
  ToggleEvent,
} from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { useRequiredContext } from "../../context";
import { useNamePart, useNamedRoot } from "../../naming";
import { composeRefs, mergeProps, renderWithProps } from "../../render";
import type { RenderProp } from "../../render";
import { usePopup, usePopupRoot } from "../../use-popup";
import type { OpenStateOptions, PopupState } from "../../use-popup";

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
 * Root (`inline-start` by default). A header's dropdown of links is a
 * Dropdown in an Item: a DropdownTrigger set like the links beside it, then
 * a DropdownPanel (a native popover, anchored to the trigger) holding a List.
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
  return useRequiredContext(NavContext, part, "Nav.Root");
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

const NavItemContext = createContext(false);

/** One entry. */
function NavItem({ className, children, ref, ...rest }: NavItemProps) {
  useNav("Nav.Item");
  return (
    <NavItemContext value>
      <li ref={ref} className={className} {...rest}>
        {children}
      </li>
    </NavItemContext>
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

const NavDropdownContext = createContext<PopupState | null>(null);

function useDropdown(part: string): PopupState {
  return useRequiredContext(NavDropdownContext, part, "Nav.Dropdown");
}

export interface NavDropdownProps extends OpenStateOptions {
  /** A DropdownTrigger, then a DropdownPanel, side by side. */
  children?: ReactNode;
}

/**
 * A dropdown of links opened from a line of the nav: a disclosure, not a
 * menu. The Trigger is a button reporting `aria-expanded`; the Panel is a
 * native popover holding ordinary links, so the browser gives it the top
 * layer, light dismiss and Escape, and Tab walks the links as it walks
 * any others. Opens on click only, never on hover. Renders no element of
 * its own: the Item is the wrapper, and the two parts sit in it in order.
 * `open`, `defaultOpen` and `onOpenChange` follow the library's
 * controlled-or-not contract.
 */
function NavDropdown({ open, defaultOpen, onOpenChange, children }: NavDropdownProps) {
  useNav("Nav.Dropdown");
  if (!use(NavItemContext)) {
    throw new Error("Nav.Dropdown must be rendered inside <Nav.Item>.");
  }
  const popup = usePopupRoot("dropdown", { open, defaultOpen, onOpenChange });
  return <NavDropdownContext value={popup}>{children}</NavDropdownContext>;
}

/** Wiring the DropdownTrigger attaches to whatever it renders. */
export interface NavDropdownTriggerRenderProps {
  type: "button";
  className: string;
  "aria-expanded": boolean;
  "aria-controls": string;
  /** The older declarative route: the button invokes the panel's popover. */
  popoverTarget: string;
  /** The current declarative route (`command="toggle-popover"`). */
  commandfor: string;
  command: "toggle-popover";
  /** Styling hook: present while the panel is open. */
  "data-popup-open": "true" | undefined;
  style: CSSProperties;
  onClick: (event: ReactMouseEvent<Element>) => void;
  ref: Ref<HTMLButtonElement>;
  children?: ReactNode;
}

export interface NavDropdownTriggerProps extends PartProps<"button"> {
  /**
   * Substitute the built-in `<button>`; the element receives the wiring
   * (the part's classes, `aria-expanded`, the popover invocation) and the
   * Trigger's other props.
   */
  render?: RenderProp<NavDropdownTriggerRenderProps>;
  /** The visible label, with an optional `svg` icon before it. */
  children?: ReactNode;
}

/**
 * The line that opens the panel: a `button` carrying the link class, so
 * the stylesheet sets it like the links beside it, with a chevron drawn at
 * its end that turns while the panel is open. It invokes the panel
 * declaratively (`commandfor` where the browser has commands, else
 * `popovertarget`), and toggles it itself where it has neither; either
 * way `aria-expanded` follows the panel's own toggle event.
 */
function NavDropdownTrigger({ render, children, ...rest }: NavDropdownTriggerProps) {
  const ctx = useDropdown("Nav.DropdownTrigger");
  const wiring: NavDropdownTriggerRenderProps = {
    ref: ctx.triggerRef,
    type: "button",
    className: "link dropdown-trigger",
    "aria-expanded": ctx.open,
    "aria-controls": ctx.popupId,
    popoverTarget: ctx.popupId,
    commandfor: ctx.popupId,
    command: "toggle-popover",
    "data-popup-open": ctx.open ? "true" : undefined,
    style: { anchorName: ctx.anchorName } as CSSProperties,
    onClick: () => {
      // Native invocation toggles the panel when enhanced; the toggle
      // event syncs it back into state.
      if (!ctx.enhanced) ctx.setOpen(!ctx.open);
    },
    children,
  };
  if (render) return <>{renderWithProps(render, mergeProps(wiring, rest))}</>;
  return <button {...mergeProps(wiring, rest)} />;
}

export interface NavDropdownPanelProps extends PartProps<"div"> {
  /** A List of Items and Links; a wide panel is your own grid around them. */
  children?: ReactNode;
}

/**
 * The panel: a `div` with `popover="auto"`, anchored under the trigger's
 * start edge and flipped by the browser when it would leave the viewport.
 * Its width is the public `--loam-nav-dropdown-size` (16rem), capped to the
 * viewport. In a browser without anchor positioning the same element is an
 * absolutely positioned panel under the Item, dismissed by the component.
 * The popup engine is Popover's; nothing moves on open, because a
 * disclosure leaves focus on its button and Tab reaches the first link
 * from there.
 */
function NavDropdownPanel({
  className,
  style,
  children,
  ref: refProp,
  ...rest
}: NavDropdownPanelProps) {
  const ctx = useDropdown("Nav.DropdownPanel");
  const composedRef = useMemo(() => composeRefs(refProp, ctx.popupRef), [refProp, ctx.popupRef]);
  usePopup(ctx, { focusOnOpen: false });
  return (
    // rest cannot override what follows: the id, popover and anchor wiring
    // are what make the panel a popover at all.
    <div
      {...rest}
      id={ctx.popupId}
      popover={ctx.enhanced ? "auto" : undefined}
      hidden={ctx.enhanced || ctx.open ? undefined : true}
      data-open={ctx.open || undefined}
      style={{ ...style, positionAnchor: ctx.anchorName } as CSSProperties}
      ref={composedRef}
      className={cx("loam-Nav-dropdown", className)}
    >
      {children}
    </div>
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
  Dropdown: NavDropdown,
  DropdownTrigger: NavDropdownTrigger,
  DropdownPanel: NavDropdownPanel,
};
