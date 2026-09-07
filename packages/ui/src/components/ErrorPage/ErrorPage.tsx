"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { renderWithProps, cx } from "@loamui/core";
import type { PartProps, RenderProp } from "@loamui/core";
import { useNamedRoot, useNamePart } from "../../naming";

interface ErrorPageContextValue {
  /** The id the Title takes unless the consumer gives it one; the section points at it. */
  nameId: string;
  /** The Title registers on mount so the section's reference stays honest. */
  register: (id: string) => () => void;
}

const ErrorPageContext = createContext<ErrorPageContextValue | null>(null);

export interface ErrorPageRootProps extends PartProps<"section"> {
  /**
   * Render as a different element: `render={<main />}` when the error is
   * the whole page and nothing else supplies the main landmark. The part's
   * classes and attributes merge onto the element it renders, the same
   * contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/**
 * An error page: the status code, a title that says what happened, a line
 * on what to do next, and a row of ways out.
 *
 * The root is a section, so it sits inside whatever `main` the page
 * already has; pass `render={<main />}` when it is the page. It is named
 * by its Title, so a screen reader's list of landmarks reads "Page not
 * found", and it is named in the server's HTML: the Root mints the id and
 * points `aria-labelledby` at it in the first render, the Title renders
 * it. An `aria-label` or `aria-labelledby` of your own wins. The copy is
 * the consumer's: say what happened and what the reader can do, in plain
 * words; never blame the reader and never joke about the code.
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
  const { nameId, register, labelling } = useNamedRoot(rest);
  const value = useMemo<ErrorPageContextValue>(() => ({ nameId, register }), [nameId, register]);
  const props = {
    ref,
    className: cx("loam-ErrorPage", className),
    ...labelling,
    children,
    ...rest,
  };
  return (
    <ErrorPageContext value={value}>
      {render ? renderWithProps(render, props) : <section {...props} />}
    </ErrorPageContext>
  );
}

export interface ErrorPageCodeProps extends PartProps<"p"> {
  children?: ReactNode;
}

/** The status code, a paragraph set large in dim tabular figures. */
function ErrorPageCode({ className, children, ref, ...rest }: ErrorPageCodeProps) {
  return (
    <p ref={ref} className={cx("code", className)} {...rest}>
      {children}
    </p>
  );
}

export interface ErrorPageTitleProps extends PartProps<"h1"> {
  /**
   * Render as a different heading: `render={<h2 />}` inside a page. The
   * part's classes and attributes merge onto the element it renders, the
   * same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/**
 * What happened, in a few words. An `h1` by default; pass `render={<h2 />}`
 * inside a page. Its id (yours if you pass one, the composition's
 * otherwise) is what the section's `aria-labelledby` points at.
 */
function ErrorPageTitle({ render, className, children, ref, id, ...rest }: ErrorPageTitleProps) {
  const ctx = useContext(ErrorPageContext);
  if (!ctx) {
    throw new Error("ErrorPage.Title must be rendered inside <ErrorPage.Root>.");
  }
  const titleId = useNamePart(ctx, id);
  const props = { ref, id: titleId, className: cx("title", className), ...rest };
  if (render) return <>{renderWithProps(render, { ...props, children })}</>;
  return <h1 {...props}>{children}</h1>;
}

export interface ErrorPageDescriptionProps extends PartProps<"p"> {
  children?: ReactNode;
}

/** One or two muted sentences on what the reader can do next, capped at a readable measure. */
function ErrorPageDescription({ className, children, ref, ...rest }: ErrorPageDescriptionProps) {
  return (
    <p ref={ref} className={cx("description", className)} {...rest}>
      {children}
    </p>
  );
}

export interface ErrorPageActionsProps extends PartProps<"div"> {
  children?: ReactNode;
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
