"use client";

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useState } from "react";
import type { HTMLAttributes, ReactNode, Ref } from "react";
import { renderWithProps, cx } from "@loamui/core";
import type { RenderProp } from "@loamui/core";

interface ErrorPageContextValue {
  /** The Title tells the section its id; the section is named by it while it is present. */
  registerTitle: (id: string) => () => void;
}

const ErrorPageContext = createContext<ErrorPageContextValue | null>(null);

export interface ErrorPageRootProps extends HTMLAttributes<HTMLElement> {
  /**
   * Render as a different element: `render={<main />}` when the error is
   * the whole page and nothing else supplies the main landmark. The part's
   * classes and attributes merge onto the element it renders, the same
   * contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * An error page: the status code, a title that says what happened, a line
 * on what to do next, and a row of ways out.
 *
 * The root is a section, so it sits inside whatever `main` the page
 * already has; pass `render={<main />}` when it is the page. It is named
 * by its Title, so a screen reader's list of landmarks reads "Page not
 * found"; an `aria-label` or `aria-labelledby` of your own wins. The copy
 * is the consumer's: say what happened and what the reader can do, in
 * plain words; never blame the reader and never joke about the code.
 *
 * ```tsx
 * <ErrorPage.Root>
 *   <ErrorPage.Code>404</ErrorPage.Code>
 *   <ErrorPage.Title>Page not found</ErrorPage.Title>
 *   <ErrorPage.Description>
 *     The page may have moved, or the address may have a typo. Check the address, or go back to the home page.
 *   </ErrorPage.Description>
 *   <ErrorPage.Actions>
 *     <SignpostLink href="/">Back to home</SignpostLink>
 *     <a href="/support">Contact support</a>
 *   </ErrorPage.Actions>
 * </ErrorPage.Root>
 * ```
 */
function ErrorPageRoot({ render, className, children, ref, ...rest }: ErrorPageRootProps) {
  const [titleId, setTitleId] = useState<string | null>(null);
  const registerTitle = useCallback((id: string) => {
    setTitleId(id);
    return () => setTitleId((current) => (current === id ? null : current));
  }, []);
  const value = useMemo<ErrorPageContextValue>(() => ({ registerTitle }), [registerTitle]);
  // A name the consumer gives wins over the title's.
  const named = rest["aria-label"] != null || rest["aria-labelledby"] != null;
  const props = {
    ref,
    className: cx("loam-ErrorPage", className),
    "aria-labelledby": !named && titleId ? titleId : undefined,
    children,
    ...rest,
  };
  return (
    <ErrorPageContext value={value}>
      {render ? renderWithProps(render, props) : <section {...props} />}
    </ErrorPageContext>
  );
}

export interface ErrorPageCodeProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/** The status code, a paragraph set large in dim tabular figures. */
function ErrorPageCode({ className, children, ref, ...rest }: ErrorPageCodeProps) {
  return (
    <p ref={ref} className={cx("code", className)} {...rest}>
      {children}
    </p>
  );
}

export interface ErrorPageTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Render as a different heading: `render={<h2 />}` inside a page. The
   * part's classes and attributes merge onto the element it renders, the
   * same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/**
 * What happened, in a few words. An `h1` by default; pass `render={<h2 />}`
 * inside a page. It names the Root while it is present.
 */
function ErrorPageTitle({ render, className, children, ref, id, ...rest }: ErrorPageTitleProps) {
  const ctx = useContext(ErrorPageContext);
  if (!ctx) {
    throw new Error("ErrorPage.Title must be rendered inside <ErrorPage.Root>.");
  }
  const autoId = useId();
  const titleId = id ?? autoId;
  const { registerTitle } = ctx;
  useEffect(() => registerTitle(titleId), [registerTitle, titleId]);
  const props = { ref, id: titleId, className: cx("title", className), ...rest };
  if (render) return <>{renderWithProps(render, { ...props, children })}</>;
  return <h1 {...props}>{children}</h1>;
}

export interface ErrorPageDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/** One or two muted sentences on what the reader can do next, capped at a readable measure. */
function ErrorPageDescription({ className, children, ref, ...rest }: ErrorPageDescriptionProps) {
  return (
    <p ref={ref} className={cx("description", className)} {...rest}>
      {children}
    </p>
  );
}

export interface ErrorPageActionsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** A centred flex row of ways out: a SignpostLink for the main path, plain links beside it. */
function ErrorPageActions({ className, children, ref, ...rest }: ErrorPageActionsProps) {
  return (
    <div ref={ref} className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

export const ErrorPage = {
  Root: ErrorPageRoot,
  Code: ErrorPageCode,
  Title: ErrorPageTitle,
  Description: ErrorPageDescription,
  Actions: ErrorPageActions,
};
