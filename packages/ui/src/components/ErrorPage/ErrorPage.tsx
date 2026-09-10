import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";

export interface ErrorPageRootProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * An error page: the status code, a title that says what happened, a line
 * on what to do next, and a row of ways out.
 *
 * The root is a section, so it sits inside whatever `main` the page
 * already has. The copy is the consumer's: say what happened and what
 * the reader can do, in plain words; never blame the reader and never
 * joke about the code.
 *
 * ```tsx
 * <ErrorPage.Root>
 *   <ErrorPage.Code>404</ErrorPage.Code>
 *   <ErrorPage.Title>Page not found</ErrorPage.Title>
 *   <ErrorPage.Body>
 *     The page may have moved, or the address may have a typo. Check the address, or go back to the home page.
 *   </ErrorPage.Body>
 *   <ErrorPage.Actions>
 *     <SignpostLink href="/">Back to home</SignpostLink>
 *     <a href="/support">Contact support</a>
 *   </ErrorPage.Actions>
 * </ErrorPage.Root>
 * ```
 */
function ErrorPageRoot({ className, children, ref, ...rest }: ErrorPageRootProps) {
  return (
    <section ref={ref} className={cx("loam-ErrorPage", className)} {...rest}>
      {children}
    </section>
  );
}

export interface ErrorPageParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/** The status code, a paragraph set large in dim tabular figures. */
function ErrorPageCode({ className, children, ref, ...rest }: ErrorPageParagraphProps) {
  return (
    <p ref={ref} className={cx("code", className)} {...rest}>
      {children}
    </p>
  );
}

export interface ErrorPageTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level; `h1` when the error is the page, `h2` inside a page. @default "h1" */
  render?: "h1" | "h2";
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/** What happened, in a few words. An `h1` by default; pass `render="h2"` inside a page. */
function ErrorPageTitle({
  render: Tag = "h1",
  className,
  children,
  ref,
  ...rest
}: ErrorPageTitleProps) {
  return (
    <Tag ref={ref} className={cx("title", className)} {...rest}>
      {children}
    </Tag>
  );
}

/** One or two muted sentences on what the reader can do next, capped at a readable measure. */
function ErrorPageBody({ className, children, ref, ...rest }: ErrorPageParagraphProps) {
  return (
    <p ref={ref} className={cx("body", className)} {...rest}>
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
  Body: ErrorPageBody,
  Actions: ErrorPageActions,
};
