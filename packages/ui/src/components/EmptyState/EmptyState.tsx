"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { renderWithProps, cx } from "@loamui/core";
import type { PartProps, RenderProp } from "@loamui/core";
import { useNamedRoot, useNamePart } from "../../naming";

interface EmptyStateContextValue {
  /** The id the Title takes unless the consumer gives it one; the root points at it. */
  nameId: string;
  /** The Title registers on mount so the root's reference stays honest. */
  register: (id: string) => () => void;
}

const EmptyStateContext = createContext<EmptyStateContextValue | null>(null);

export interface EmptyStateRootProps extends PartProps<"div"> {
  /**
   * Render as a different element: `render={<section />}` when the empty
   * state is the page, or a whole region of it, and should be a landmark
   * a screen reader can list. The part's classes and attributes merge onto
   * the element it renders, the same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/**
 * An empty state: what this place is for, why there is nothing in it, and
 * one clear next action, centred in whatever holds it.
 *
 * The root is a `div`, because most empty states sit inside something
 * that is already a landmark or a Card, and a section for each would be
 * one landmark too many. When the empty state is the page, or a whole
 * region of it, pass `render={<section />}` and it becomes a region named
 * by its Title, in the server's HTML from the first render. It is not a
 * live region either: a list that loaded empty is the page as it is, and
 * nothing happened that needs announcing. When the empty state replaces
 * results after a search or a filter, the reader did do something and is
 * waiting to hear the outcome, so pass `role="status"` and it is announced
 * politely, named by its Title. The copy is the consumer's, and it differs
 * by cause: nothing yet says what the place is for and how to start ("No
 * projects yet. Create your first project to start."); nothing matched
 * says what was looked for and how to look again ("No results for 'loam'.
 * Check the spelling or try a broader search."). The primary next step is
 * one Button or SignpostLink, with at most one plain link beside it.
 *
 * ```tsx
 * <EmptyState.Root>
 *   <EmptyState.Media>
 *     <FolderIcon />
 *   </EmptyState.Media>
 *   <EmptyState.Title>No projects yet</EmptyState.Title>
 *   <EmptyState.Description>
 *     Create your first project to start.
 *   </EmptyState.Description>
 *   <EmptyState.Actions>
 *     <Button>Create a project</Button>
 *   </EmptyState.Actions>
 * </EmptyState.Root>
 * ```
 */
function EmptyStateRoot({ render, className, children, ref, ...rest }: EmptyStateRootProps) {
  const { nameId, register, labelling } = useNamedRoot(rest);
  const value = useMemo<EmptyStateContextValue>(() => ({ nameId, register }), [nameId, register]);
  // A name is for something that can be listed or announced: a landmark
  // rendered through `render`, or a status. A plain div is generic, and
  // ARIA prohibits naming a generic, so the reference is left off there.
  const nameable = render != null || rest.role != null;
  const props = {
    ref,
    className: cx("loam-EmptyState", className),
    ...(nameable ? labelling : {}),
    children,
    ...rest,
  };
  return (
    <EmptyStateContext value={value}>
      {render ? renderWithProps(render, props) : <div {...props} />}
    </EmptyStateContext>
  );
}

export interface EmptyStateMediaProps extends PartProps<"div"> {
  children?: ReactNode;
}

/**
 * Optional: an icon or a small illustration above the title. Hidden from
 * assistive technology, because the title already says what the picture
 * shows; an `svg` is set at 3rem in the dim foreground, an `img` is
 * capped at 16rem.
 */
function EmptyStateMedia({ className, children, ref, ...rest }: EmptyStateMediaProps) {
  return (
    <div ref={ref} aria-hidden="true" className={cx("media", className)} {...rest}>
      {children}
    </div>
  );
}

export interface EmptyStateTitleProps extends PartProps<"h2"> {
  /**
   * Render as a different heading: `render={<h3 />}` under a page's own
   * headings. The part's classes and attributes merge onto the element it
   * renders, the same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/**
 * What is empty, in a few words. An `h2` by default; pass `render={<h3 />}`
 * under a page's own headings. Its id (yours if you pass one, the
 * composition's otherwise) is what a section or status Root's
 * `aria-labelledby` points at.
 */
function EmptyStateTitle({ render, className, children, ref, id, ...rest }: EmptyStateTitleProps) {
  const ctx = useContext(EmptyStateContext);
  if (!ctx) {
    throw new Error("EmptyState.Title must be rendered inside <EmptyState.Root>.");
  }
  const titleId = useNamePart(ctx, id);
  const props = { ref, id: titleId, className: cx("title", className), ...rest };
  if (render) return <>{renderWithProps(render, { ...props, children })}</>;
  return <h2 {...props}>{children}</h2>;
}

export interface EmptyStateDescriptionProps extends PartProps<"p"> {
  children?: ReactNode;
}

/** One or two muted sentences on why it is empty and what to do, capped at a readable measure. */
function EmptyStateDescription({ className, children, ref, ...rest }: EmptyStateDescriptionProps) {
  return (
    <p ref={ref} className={cx("description", className)} {...rest}>
      {children}
    </p>
  );
}

export interface EmptyStateActionsProps extends PartProps<"div"> {
  children?: ReactNode;
}

/** A centred, wrapping row: one Button or SignpostLink for the next step, at most one plain link beside it. */
function EmptyStateActions({ className, children, ref, ...rest }: EmptyStateActionsProps) {
  return (
    <div ref={ref} className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

export const EmptyState = {
  Root: EmptyStateRoot,
  Media: EmptyStateMedia,
  Title: EmptyStateTitle,
  Description: EmptyStateDescription,
  Actions: EmptyStateActions,
};
