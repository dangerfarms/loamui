"use client";

import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import type { RenderProp } from "../../render";

import { Button } from "../Button/Button";
import type { ButtonProps } from "../Button/Button";

/**
 * Link-first page navigation, composed from parts.
 *
 * Every destination is a real link (a LoamUI Button rendered as an `<a>`),
 * so a page is linkable, survives reloads and works before JavaScript runs;
 * client routers substitute their own link through `render` or intercept
 * `onNavigate`. The current page carries `aria-current="page"` and the
 * stylesheet keys off that same attribute.
 *
 * ```tsx
 * <Pagination.Root>
 *   <Pagination.List>
 *     <Pagination.Pages page={page} count={20} getHref={(n) => `?page=${n}`} />
 *   </Pagination.List>
 * </Pagination.Root>
 * ```
 *
 * `Pagination.Pages` renders Previous, the numbered window with its
 * ellipses, and Next. Edge links (first, last) are your own Items around it.
 */

export interface PaginationRootProps extends PartProps<"nav"> {
  /** The words the landmark speaks: `navigation` is its accessible name. */
  labels?: { navigation?: string };
}

function PaginationRoot({ labels, className, children, ...rest }: PaginationRootProps) {
  const navigationLabel = labels?.navigation ?? "Pagination";
  return (
    <nav aria-label={navigationLabel} {...rest} className={cx("loam-Pagination", className)}>
      {children}
    </nav>
  );
}

export interface PaginationListProps extends PartProps<"ul"> {}

function PaginationList({ className, children, ...rest }: PaginationListProps) {
  return (
    <ul {...rest} className={className}>
      {children}
    </ul>
  );
}

export interface PaginationItemProps extends PartProps<"li"> {}

function PaginationItem({ className, children, ...rest }: PaginationItemProps) {
  return (
    <li {...rest} className={className}>
      {children}
    </li>
  );
}

/** Wiring the Link attaches to whatever it renders. */
export interface PaginationLinkRenderProps {
  /** The current page, detected by the stylesheet as well. */
  "aria-current": "page" | undefined;
  /** An unavailable direction: a placeholder outside the tab and reading order. */
  "aria-hidden": true | undefined;
  "data-disabled": true | undefined;
  tabIndex: -1 | undefined;
}

export interface PaginationLinkProps extends PartProps<"a"> {
  /** Marks the current page (`aria-current="page"`). */
  current?: boolean;
  /**
   * An unavailable destination (Previous on the first page). The built-in
   * link drops its `href` and leaves the tab and accessibility order, so
   * the layout stays stable without an inert stop.
   */
  disabled?: boolean;
  /**
   * Substitute your own link (`render={<Link href="…" />}`); it receives the
   * Button's class and the pagination wiring. Defaults to an `<a>`.
   */
  render?: RenderProp<PaginationLinkRenderProps & Record<string, unknown>>;
}

/** A page destination: a LoamUI Button rendered as a link. */
function PaginationLink({
  current,
  disabled,
  render,
  href,
  children,
  ...rest
}: PaginationLinkProps) {
  const wiring: PaginationLinkRenderProps = {
    "aria-current": current ? "page" : undefined,
    "aria-hidden": disabled || undefined,
    "data-disabled": disabled || undefined,
    tabIndex: disabled ? -1 : undefined,
  };
  // The anchor's attributes ride through Button's render path untouched;
  // the cast only reconciles the two elements' prop types.
  return (
    <Button
      {...(rest as ButtonProps)}
      {...wiring}
      render={
        (render as ButtonProps["render"]) ?? <a href={disabled ? undefined : href}>{children}</a>
      }
    >
      {children}
    </Button>
  );
}

export interface PaginationEllipsisProps extends PartProps<"li"> {}

/** A gap in the page list; visual shorthand, hidden from assistive technology. */
function PaginationEllipsis({ className, children, ...rest }: PaginationEllipsisProps) {
  const glyph = children ?? "…";
  return (
    <li aria-hidden="true" {...rest} className={cx("ellipsis", className)}>
      {glyph}
    </li>
  );
}

const DOTS = "dots" as const;
type PageItem = number | typeof DOTS;

function range(start: number, end: number): number[] {
  const out: number[] = [];
  for (let i = start; i <= end; i += 1) out.push(i);
  return out;
}

/** Build the list of page numbers with ellipsis gaps. */
function getPaginationItems(count: number, active: number, siblings: number): PageItem[] {
  // Pages we always show plus the sibling window; if that's most of them,
  // just render every page.
  const totalToShow = siblings * 2 + 5; // first, last, active, 2 dots
  if (totalToShow >= count) return range(1, count);

  const leftSibling = Math.max(active - siblings, 1);
  const rightSibling = Math.min(active + siblings, count);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < count - 1;

  if (!showLeftDots && showRightDots) {
    const leftCount = siblings * 2 + 3;
    return [...range(1, leftCount), DOTS, count];
  }

  if (showLeftDots && !showRightDots) {
    const rightCount = siblings * 2 + 3;
    return [1, DOTS, ...range(count - rightCount + 1, count)];
  }

  return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, count];
}

function ChevronIcon({ dir }: { dir: "previous" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points={dir === "previous" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );
}

export interface PaginationPagesProps {
  /** The active page (1-based). */
  page: number;
  /** Total number of pages. */
  count: number;
  /** Sibling pages shown on each side of the active page. @default 1 */
  siblings?: number;
  /** Build the destination URL for a page. */
  getHref: (page: number) => string;
  /** Optionally intercept navigation for a client router. */
  onNavigate?: (page: number, event: ReactMouseEvent<HTMLAnchorElement>) => void;
  /**
   * The words the links speak, for another language or a different noun:
   * `previous` and `next` name the arrows, `page(n)` names each page link.
   */
  labels?: {
    previous?: string;
    next?: string;
    page?: (page: number) => string;
  };
}

/**
 * The sequential core of a pager: Previous, the numbered window around the
 * active page with ellipsis gaps, and Next, built from the parts. Renders
 * Items, so it belongs inside `Pagination.List`; edge links are your own
 * Items around it.
 */
function PaginationPages({
  page,
  count,
  siblings = 1,
  getHref,
  onNavigate,
  labels,
}: PaginationPagesProps) {
  const previousLabel = labels?.previous ?? "Previous page";
  const nextLabel = labels?.next ?? "Next page";
  const pageLabel = labels?.page ?? ((n: number) => `Page ${n}`);
  const active = Math.min(Math.max(page, 1), Math.max(count, 1));
  const items = getPaginationItems(count, active, siblings);

  const link = (target: number, label: string, children: ReactNode, rel?: "prev" | "next") => {
    const clamped = Math.min(Math.max(target, 1), count);
    return (
      <PaginationLink
        href={getHref(clamped)}
        rel={rel}
        aria-label={label}
        current={clamped === active && rel === undefined}
        disabled={rel !== undefined && clamped === active}
        onClick={(event) => onNavigate?.(clamped, event)}
      >
        {children}
      </PaginationLink>
    );
  };

  let dots = 0;
  return (
    <>
      <PaginationItem>
        {link(active - 1, previousLabel, <ChevronIcon dir="previous" />, "prev")}
      </PaginationItem>
      {items.map((item) =>
        item === DOTS ? (
          <PaginationEllipsis key={`dots-${++dots}`} />
        ) : (
          <PaginationItem key={item}>{link(item, pageLabel(item), item)}</PaginationItem>
        ),
      )}
      <PaginationItem>
        {link(active + 1, nextLabel, <ChevronIcon dir="next" />, "next")}
      </PaginationItem>
    </>
  );
}

export const Pagination = {
  Root: PaginationRoot,
  List: PaginationList,
  Item: PaginationItem,
  Link: PaginationLink,
  Ellipsis: PaginationEllipsis,
  Pages: PaginationPages,
};
