"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { renderWithProps, cx } from "@loamui/core";
import type { PartProps, RenderProp } from "@loamui/core";
import { useNamedRoot, useNamePart } from "../../naming";

interface CallToActionContextValue {
  /** The id the Title takes unless the consumer gives it one; the section points at it. */
  nameId: string;
  /** The Title registers on mount so the section's reference stays honest. */
  register: (id: string) => () => void;
}

const CallToActionContext = createContext<CallToActionContextValue | null>(null);

export interface CallToActionRootProps extends PartProps<"section"> {
  /**
   * Render as a different element: `render={<aside />}` beside an article,
   * `render={<div />}` where a section would be one landmark too many. The
   * part's classes and attributes merge onto the element it renders, the
   * same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/**
 * A closing section: a title, one sentence and a row of actions on a
 * subtle surface, centred, or beside a piece of media when there is one.
 *
 * The surface is the subtle background token with a large radius, so the
 * block reads as the page's last word without a border or a colour of its
 * own. The section is named by its Title, so it is a region in a screen
 * reader's list of landmarks, and it is named in the server's HTML: the
 * Root mints the id and points `aria-labelledby` at it in the first
 * render, the Title renders it. An `aria-label` or `aria-labelledby` of
 * your own wins. A `--loam-context` region recolours the SignpostLink or
 * Button inside. `CallToAction.Media` is optional: an image, an app-store
 * badge row, a ContactForm; with it the text aligns start and the block
 * becomes two columns where the container has room. No layout prop: the
 * container decides. The section is the container and an inner element
 * it renders is the grid, because an element cannot answer its own
 * container query.
 *
 * ```tsx
 * <CallToAction.Root>
 *   <CallToAction.Title>Start building</CallToAction.Title>
 *   <CallToAction.Lede>
 *     Install the package, import one stylesheet and start with any component.
 *   </CallToAction.Lede>
 *   <CallToAction.Actions>
 *     <SignpostLink href="/docs">Read the docs</SignpostLink>
 *     <a href="/docs/components">Browse components</a>
 *   </CallToAction.Actions>
 * </CallToAction.Root>
 * ```
 */
function CallToActionRoot({ render, className, children, ref, ...rest }: CallToActionRootProps) {
  const { nameId, register, labelling } = useNamedRoot(rest);
  const value = useMemo<CallToActionContextValue>(() => ({ nameId, register }), [nameId, register]);
  const props = {
    ref,
    className: cx("loam-CallToAction", className),
    ...labelling,
    ...rest,
    children: <div className="inner">{children}</div>,
  };
  return (
    <CallToActionContext value={value}>
      {render ? renderWithProps(render, props) : <section {...props} />}
    </CallToActionContext>
  );
}

export interface CallToActionTitleProps extends PartProps<"h2"> {
  /**
   * Render as a different heading: `render={<h3 />}` under a page's own headings. The
   * part's classes and attributes merge onto the element it renders, the
   * same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/**
 * The headline. Renders an `h2` by default; pass `render={<h3 />}` under a
 * page's own headings. Its id (yours if you pass one, the composition's
 * otherwise) is what the section's `aria-labelledby` points at.
 */
function CallToActionTitle({
  render,
  className,
  children,
  ref,
  id,
  ...rest
}: CallToActionTitleProps) {
  const ctx = useContext(CallToActionContext);
  if (!ctx) {
    throw new Error("CallToAction.Title must be rendered inside <CallToAction.Root>.");
  }
  const titleId = useNamePart(ctx, id);
  const props = { ref, id: titleId, className: cx("title", className), ...rest };
  if (render) return <>{renderWithProps(render, { ...props, children })}</>;
  return <h2 {...props}>{children}</h2>;
}

export interface CallToActionLedeProps extends PartProps<"p"> {
  children?: ReactNode;
}

/** One sentence that says what happens next, muted and capped at a readable measure. */
function CallToActionLede({ className, children, ref, ...rest }: CallToActionLedeProps) {
  return (
    <p ref={ref} className={cx("lede", className)} {...rest}>
      {children}
    </p>
  );
}

export interface CallToActionActionsProps extends PartProps<"div"> {
  children?: ReactNode;
}

/** A centred, wrapping row of actions: a SignpostLink for the primary path, a plain link beside it. */
function CallToActionActions({ className, children, ref, ...rest }: CallToActionActionsProps) {
  return (
    <div ref={ref} className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

export interface CallToActionMediaProps extends PartProps<"div"> {
  children?: ReactNode;
}

/**
 * Optional: what sits beside the words. An image, a row of store badges,
 * a ContactForm. With it the block is two columns where there is room.
 */
function CallToActionMedia({ className, children, ref, ...rest }: CallToActionMediaProps) {
  return (
    <div ref={ref} className={cx("media", className)} {...rest}>
      {children}
    </div>
  );
}

export const CallToAction = {
  Root: CallToActionRoot,
  Title: CallToActionTitle,
  Lede: CallToActionLede,
  Actions: CallToActionActions,
  Media: CallToActionMedia,
};
