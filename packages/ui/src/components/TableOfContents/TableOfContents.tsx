"use client";

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useState } from "react";
import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "@loamui/core";

interface TableOfContentsContextValue {
  /** The Title tells the nav its id; the nav is named by it while it is present. */
  registerTitle: (id: string) => () => void;
}

const TableOfContentsContext = createContext<TableOfContentsContextValue | null>(null);

export interface TableOfContentsRootProps extends HTMLAttributes<HTMLElement> {
  /**
   * Names the landmark for assistive technology; every nav on a page needs
   * a distinct one. A `TableOfContents.Title` inside names the nav by
   * itself, so pass a label only when there is no Title. An
   * `aria-labelledby` you pass wins over both.
   */
  "aria-label"?: string;
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * A table of contents for the page in view: a small label over a list of
 * links to the page's headings, with the current section marked.
 *
 * The links are yours, so a static page and one that tracks the reader's
 * scroll position drive it the same way: write `<a href="#id">` in each
 * item and set `aria-current="location"` on the one whose section is in
 * view. A nested `TableOfContents.List` inside an item indents a level.
 * The nav is named by its Title, so "On this page" is written once.
 * Stickiness is your CSS (`position: sticky` on the root), not a prop.
 *
 * ```tsx
 * <TableOfContents.Root>
 *   <TableOfContents.Title>On this page</TableOfContents.Title>
 *   <TableOfContents.List>
 *     <TableOfContents.Item><a href="#tokens">Tokens</a></TableOfContents.Item>
 *     <TableOfContents.Item>
 *       <a href="#elements" aria-current="location">Element styles</a>
 *       <TableOfContents.List>
 *         <TableOfContents.Item><a href="#headings">Headings</a></TableOfContents.Item>
 *       </TableOfContents.List>
 *     </TableOfContents.Item>
 *   </TableOfContents.List>
 * </TableOfContents.Root>
 * ```
 */
function TableOfContentsRoot({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  children,
  ref,
  ...rest
}: TableOfContentsRootProps) {
  const [titleId, setTitleId] = useState<string | null>(null);
  const registerTitle = useCallback((id: string) => {
    setTitleId(id);
    return () => setTitleId((current) => (current === id ? null : current));
  }, []);
  const value = useMemo<TableOfContentsContextValue>(() => ({ registerTitle }), [registerTitle]);
  // A name the consumer gives wins over the Title's.
  const named = ariaLabelledBy != null || ariaLabel != null;
  return (
    <TableOfContentsContext value={value}>
      <nav
        ref={ref}
        className={cx("loam-TableOfContents", className)}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? (!named && titleId ? titleId : undefined)}
        {...rest}
      >
        {children}
      </nav>
    </TableOfContentsContext>
  );
}

export interface TableOfContentsTitleProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/** A small uppercase label above the list, a paragraph rather than a heading. It names the nav. */
function TableOfContentsTitle({
  className,
  children,
  ref,
  id,
  ...rest
}: TableOfContentsTitleProps) {
  const ctx = useContext(TableOfContentsContext);
  if (!ctx) {
    throw new Error("TableOfContents.Title must be rendered inside <TableOfContents.Root>.");
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

export interface TableOfContentsListProps extends HTMLAttributes<HTMLOListElement> {
  children?: ReactNode;
  ref?: Ref<HTMLOListElement>;
}

/** An ordered list with no markers and a line down its start edge. Nest one inside an Item for a level. */
function TableOfContentsList({ className, children, ref, ...rest }: TableOfContentsListProps) {
  return (
    <ol ref={ref} className={cx("list", className)} {...rest}>
      {children}
    </ol>
  );
}

export interface TableOfContentsItemProps extends HTMLAttributes<HTMLLIElement> {
  /** An `<a href="#id">`, with `aria-current="location"` on the section in view; then an optional nested List. */
  children?: ReactNode;
  ref?: Ref<HTMLLIElement>;
}

/** One entry, wrapping your link. */
function TableOfContentsItem({ className, children, ref, ...rest }: TableOfContentsItemProps) {
  return (
    <li ref={ref} className={className} {...rest}>
      {children}
    </li>
  );
}

export const TableOfContents = {
  Root: TableOfContentsRoot,
  Title: TableOfContentsTitle,
  List: TableOfContentsList,
  Item: TableOfContentsItem,
};
