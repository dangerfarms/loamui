"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { cx } from "@loamui/core";
import type { PartProps } from "@loamui/core";
import { useNamePart, useNamedRoot } from "../../naming";

interface TableOfContentsContextValue {
  nameId: string;
  register: (id: string) => () => void;
}

const TableOfContentsContext = createContext<TableOfContentsContextValue | null>(null);

/** The words the landmark speaks on its own, each with an English default. */
export interface TableOfContentsLabels {
  /**
   * The nav's accessible name while no `TableOfContents.Title` is
   * rendered. A Title names the nav by itself, and an `aria-label` or
   * `aria-labelledby` you pass wins over both. @default "On this page"
   */
  navigation?: string;
}

const DEFAULT_LABELS: Required<TableOfContentsLabels> = {
  navigation: "On this page",
};

export interface TableOfContentsRootProps extends PartProps<"nav"> {
  /** The landmark's own words. */
  labels?: TableOfContentsLabels;
  children?: ReactNode;
}

/**
 * A table of contents for the page in view: a small label over a list of
 * links to the page's headings, with the current section marked.
 *
 * The links are yours, so a static page and one that tracks the reader's
 * scroll position drive it the same way: write `<a href="#id">` in each
 * item and set `aria-current="location"` on the one whose section is in
 * view. A nested `TableOfContents.List` inside an item indents a level.
 * The nav is named by its Title, from the first render, so "On this page"
 * is written once; without a Title it is named by `labels.navigation`,
 * "On this page" by default. Stickiness is your CSS (`position: sticky`
 * on the root), not a prop.
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
  labels,
  className,
  children,
  ref,
  ...rest
}: TableOfContentsRootProps) {
  const { nameId, register, labelling } = useNamedRoot(
    rest,
    labels?.navigation ?? DEFAULT_LABELS.navigation,
  );
  const value = useMemo<TableOfContentsContextValue>(
    () => ({ nameId, register }),
    [nameId, register],
  );
  return (
    <TableOfContentsContext value={value}>
      <nav ref={ref} className={cx("loam-TableOfContents", className)} {...labelling} {...rest}>
        {children}
      </nav>
    </TableOfContentsContext>
  );
}

export interface TableOfContentsTitleProps extends PartProps<"p"> {
  children?: ReactNode;
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
  const titleId = useNamePart(ctx, id);
  return (
    <p ref={ref} id={titleId} className={cx("title", className)} {...rest}>
      {children}
    </p>
  );
}

export interface TableOfContentsListProps extends PartProps<"ol"> {
  children?: ReactNode;
}

/** An ordered list with no markers and a line down its start edge. Nest one inside an Item for a level. */
function TableOfContentsList({ className, children, ref, ...rest }: TableOfContentsListProps) {
  return (
    <ol ref={ref} className={cx("list", className)} {...rest}>
      {children}
    </ol>
  );
}

export interface TableOfContentsItemProps extends PartProps<"li"> {
  /** An `<a href="#id">`, with `aria-current="location"` on the section in view; then an optional nested List. */
  children?: ReactNode;
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
