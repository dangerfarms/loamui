"use client";

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useState } from "react";
import type { HTMLAttributes, ReactNode, Ref } from "react";
import { renderWithProps, cx } from "@loamui/core";
import type { RenderProp } from "@loamui/core";

interface CallToActionContextValue {
  /** The Title tells the section its id; the section is named by it while it is present. */
  registerTitle: (id: string) => () => void;
}

const CallToActionContext = createContext<CallToActionContextValue | null>(null);

export interface CallToActionRootProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * A closing section: a title, one sentence and a row of actions on a
 * subtle surface, centred, or beside a piece of media when there is one.
 *
 * The surface is the subtle background token with a large radius, so the
 * block reads as the page's last word without a border or a colour of its
 * own. The section is named by its Title, so it is a region in a screen
 * reader's list of landmarks; an `aria-label` or `aria-labelledby` of
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
function CallToActionRoot({ className, children, ref, ...rest }: CallToActionRootProps) {
  const [titleId, setTitleId] = useState<string | null>(null);
  const registerTitle = useCallback((id: string) => {
    setTitleId(id);
    return () => setTitleId((current) => (current === id ? null : current));
  }, []);
  const value = useMemo<CallToActionContextValue>(() => ({ registerTitle }), [registerTitle]);
  // A name the consumer gives wins over the title's.
  const named = rest["aria-label"] != null || rest["aria-labelledby"] != null;
  return (
    <CallToActionContext value={value}>
      <section
        ref={ref}
        className={cx("loam-CallToAction", className)}
        aria-labelledby={!named && titleId ? titleId : undefined}
        {...rest}
      >
        <div className="inner">{children}</div>
      </section>
    </CallToActionContext>
  );
}

export interface CallToActionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Render as a different heading: `render={<h3 />}` under a page's own headings. The
   * part's classes and attributes merge onto the element it renders, the
   * same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/**
 * The headline. Renders an `h2` by default; pass `render={<h3 />}` under a
 * page's own headings. It names the Root while it is present.
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
  const autoId = useId();
  const titleId = id ?? autoId;
  const { registerTitle } = ctx;
  useEffect(() => registerTitle(titleId), [registerTitle, titleId]);
  const props = { ref, id: titleId, className: cx("title", className), ...rest };
  if (render) return <>{renderWithProps(render, { ...props, children })}</>;
  return <h2 {...props}>{children}</h2>;
}

export interface CallToActionLedeProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/** One sentence that says what happens next, muted and capped at a readable measure. */
function CallToActionLede({ className, children, ref, ...rest }: CallToActionLedeProps) {
  return (
    <p ref={ref} className={cx("lede", className)} {...rest}>
      {children}
    </p>
  );
}

export interface CallToActionActionsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** A centred, wrapping row of actions: a SignpostLink for the primary path, a plain link beside it. */
function CallToActionActions({ className, children, ref, ...rest }: CallToActionActionsProps) {
  return (
    <div ref={ref} className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

export interface CallToActionMediaProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
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
