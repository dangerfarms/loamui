"use client";

import { createContext, useContext, useEffect, useId, useRef, useMemo } from "react";
import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  Ref,
} from "react";
import { cx } from "../../utils";
import { composeRefs, renderWithProps } from "../../render";
import type { RenderProp } from "../../render";

/**
 * The form-level error pattern: a box at the top of the form
 * listing every error as a link to its field, shown after a failed submit.
 *
 * When it appears it takes keyboard focus, so assistive technology
 * announces the problem and the user starts at the list rather than
 * hunting. Each item links to a field by id; activating one moves focus
 * into that field. Use the same wording as the field's own error message
 * so the two read identically out of context.
 *
 * ```tsx
 * {errors.length > 0 && (
 *   <ErrorSummary.Root>
 *     <ErrorSummary.Title />
 *     <ErrorSummary.List>
 *       <ErrorSummary.Item href="#email">
 *         Enter your email address
 *       </ErrorSummary.Item>
 *     </ErrorSummary.List>
 *   </ErrorSummary.Root>
 * )}
 * ```
 */

interface ErrorSummaryContextValue {
  titleId: string;
}

const ErrorSummaryContext = createContext<ErrorSummaryContextValue | null>(null);

function useErrorSummaryContext(part: string): ErrorSummaryContextValue {
  const ctx = useContext(ErrorSummaryContext);
  if (!ctx) {
    throw new Error(`${part} must be rendered inside <ErrorSummary.Root>.`);
  }
  return ctx;
}

export interface ErrorSummaryRootProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  /**
   * Move keyboard focus to the summary when it appears. @default true
   */
  autoFocus?: boolean;
}

function ErrorSummaryRoot({
  autoFocus = true,
  className,
  children,
  ref: refProp,
  ...rest
}: ErrorSummaryRootProps) {
  const titleId = `${useId()}-errorsummary`;
  const ctxValue = useMemo(() => ({ titleId }), [titleId]);
  const ref = useRef<HTMLDivElement>(null);
  const composedRef = useMemo(() => composeRefs(refProp, ref), [refProp]);

  // Focus announces the region (labelled by the Title) the moment it
  // appears — the user starts at the list of problems, not the top of the
  // page.
  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  return (
    <ErrorSummaryContext value={ctxValue}>
      <div
        {...rest}
        ref={composedRef}
        role="group"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cx("loam-ErrorSummary", className)}
      >
        {/* role="alert" announces on render even without autoFocus; the
            outer group stays the focus target. */}
        <div role="alert">{children}</div>
      </div>
    </ErrorSummaryContext>
  );
}

export interface ErrorSummaryTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

function ErrorSummaryTitle({ className, children, ...rest }: ErrorSummaryTitleProps) {
  const ctx = useErrorSummaryContext("ErrorSummary.Title");
  return (
    <h2 id={ctx.titleId} className={className} {...rest}>
      {children ?? "There is a problem"}
    </h2>
  );
}

export interface ErrorSummaryListProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode;
}

function ErrorSummaryList({ className, children, ...rest }: ErrorSummaryListProps) {
  return (
    <ul className={className} {...rest}>
      {children}
    </ul>
  );
}

/** Wiring the Item attaches to whatever it renders. */
export interface ErrorSummaryItemRenderProps {
  href: string;
  onClick: (e: ReactMouseEvent<HTMLAnchorElement>) => void;
  children?: ReactNode;
  className?: string;
}

export interface ErrorSummaryItemProps extends Omit<
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
  "onClick"
> {
  /**
   * Substitute the built-in <a> — e.g. a router link; the wiring
   * (href, focus handling, children) merges onto it.
   */
  render?: RenderProp<ErrorSummaryItemRenderProps>;
  /** The target field's fragment (e.g. "#email"). */
  href: string;
  onClick?: (e: ReactMouseEvent<HTMLAnchorElement>) => void;
  children?: ReactNode;
}

function ErrorSummaryItem({
  href,
  onClick,
  render,
  className,
  children,
  ...rest
}: ErrorSummaryItemProps) {
  // Fragment navigation scrolls to the field but does not focus it; move
  // focus so the user can start typing the correction immediately.
  const focusTarget = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    const id = href.startsWith("#") ? href.slice(1) : href;
    const target = document.getElementById(id);
    if (target instanceof HTMLElement) {
      requestAnimationFrame(() => target.focus());
    }
  };

  const wiring = { href, onClick: focusTarget, children, className };
  return (
    <li>
      {render ? (
        renderWithProps(render, { ...rest, ...wiring })
      ) : (
        <a {...rest} href={href} onClick={focusTarget} className={className}>
          {children}
        </a>
      )}
    </li>
  );
}

export const ErrorSummary = {
  Root: ErrorSummaryRoot,
  Title: ErrorSummaryTitle,
  List: ErrorSummaryList,
  Item: ErrorSummaryItem,
};
