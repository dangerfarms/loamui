"use client";

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useState } from "react";
import type { HTMLAttributes, ReactNode, Ref } from "react";
import { renderWithProps, cx } from "@loamui/core";
import type { RenderProp } from "@loamui/core";

interface EmptyStateContextValue {
  /** The Title tells the root its id; the root is named by it while it is present. */
  registerTitle: (id: string) => () => void;
}

const EmptyStateContext = createContext<EmptyStateContextValue | null>(null);

export interface EmptyStateRootProps extends HTMLAttributes<HTMLElement> {
  /**
   * Render as a different element: `render={<div />}` where a section
   * would be one landmark too many, such as inside a Card. The part's
   * classes and attributes merge onto the element it renders, the same
   * contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * An empty state: what this place is for, why there is nothing in it, and
 * one clear next action, centred in whatever holds it.
 *
 * The root is an ordinary section named by its Title, not a live region:
 * a list that loaded empty is the page as it is, and nothing happened that
 * needs announcing. When the empty state replaces results after a search
 * or a filter, the reader did do something and is waiting to hear the
 * outcome, so pass `role="status"` and it is announced politely. The copy
 * is the consumer's, and it differs by cause: nothing yet says what the
 * place is for and how to start ("No projects yet. Create your first
 * project to start."); nothing matched says what was looked for and how to
 * look again ("No results for 'loam'. Check the spelling or try a broader
 * search."). The primary next step is one Button or SignpostLink, with at
 * most one plain link beside it.
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
  const [titleId, setTitleId] = useState<string | null>(null);
  const registerTitle = useCallback((id: string) => {
    setTitleId(id);
    return () => setTitleId((current) => (current === id ? null : current));
  }, []);
  const value = useMemo<EmptyStateContextValue>(() => ({ registerTitle }), [registerTitle]);
  // A name the consumer gives wins over the title's.
  const named = rest["aria-label"] != null || rest["aria-labelledby"] != null;
  const props = {
    ref,
    className: cx("loam-EmptyState", className),
    "aria-labelledby": !named && titleId ? titleId : undefined,
    children,
    ...rest,
  };
  return (
    <EmptyStateContext value={value}>
      {render ? renderWithProps(render, props) : <section {...props} />}
    </EmptyStateContext>
  );
}

export interface EmptyStateMediaProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
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

export interface EmptyStateTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Render as a different heading: `render={<h3 />}` under a page's own
   * headings. The part's classes and attributes merge onto the element it
   * renders, the same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/**
 * What is empty, in a few words. An `h2` by default; pass `render={<h3 />}`
 * under a page's own headings. It names the Root while it is present.
 */
function EmptyStateTitle({ render, className, children, ref, id, ...rest }: EmptyStateTitleProps) {
  const ctx = useContext(EmptyStateContext);
  if (!ctx) {
    throw new Error("EmptyState.Title must be rendered inside <EmptyState.Root>.");
  }
  const autoId = useId();
  const titleId = id ?? autoId;
  const { registerTitle } = ctx;
  useEffect(() => registerTitle(titleId), [registerTitle, titleId]);
  const props = { ref, id: titleId, className: cx("title", className), ...rest };
  if (render) return <>{renderWithProps(render, { ...props, children })}</>;
  return <h2 {...props}>{children}</h2>;
}

export interface EmptyStateDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/** One or two muted sentences on why it is empty and what to do, capped at a readable measure. */
function EmptyStateDescription({ className, children, ref, ...rest }: EmptyStateDescriptionProps) {
  return (
    <p ref={ref} className={cx("description", className)} {...rest}>
      {children}
    </p>
  );
}

export interface EmptyStateActionsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
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
