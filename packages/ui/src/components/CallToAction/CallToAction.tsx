import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";

export interface CallToActionRootProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * A closing section: a title, one sentence and a row of actions, centred
 * on a subtle surface.
 *
 * The surface is the subtle background token with a large radius, so the
 * block reads as the page's last word without a border or a colour of its
 * own. A `--loam-context` region recolours the SignpostLink or Button
 * inside.
 *
 * ```tsx
 * <CallToAction.Root>
 *   <CallToAction.Title>Start building</CallToAction.Title>
 *   <CallToAction.Body>
 *     Install the package, import one stylesheet and start with any component.
 *   </CallToAction.Body>
 *   <CallToAction.Actions>
 *     <SignpostLink href="/docs">Read the docs</SignpostLink>
 *     <a href="/docs/components">Browse components</a>
 *   </CallToAction.Actions>
 * </CallToAction.Root>
 * ```
 */
function CallToActionRoot({ className, children, ref, ...rest }: CallToActionRootProps) {
  return (
    <section ref={ref} className={cx("loam-CallToAction", className)} {...rest}>
      {children}
    </section>
  );
}

export interface CallToActionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level; `h2` as a page section, `h3` under a page's own headings. @default "h2" */
  render?: "h2" | "h3";
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/** The headline. Renders an `h2` by default; pass `render="h3"` under a page's own headings. */
function CallToActionTitle({
  render: Tag = "h2",
  className,
  children,
  ref,
  ...rest
}: CallToActionTitleProps) {
  return (
    <Tag ref={ref} className={cx("title", className)} {...rest}>
      {children}
    </Tag>
  );
}

export interface CallToActionBodyProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/** One sentence that says what happens next, muted and capped at a readable measure. */
function CallToActionBody({ className, children, ref, ...rest }: CallToActionBodyProps) {
  return (
    <p ref={ref} className={cx("body", className)} {...rest}>
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

export const CallToAction = {
  Root: CallToActionRoot,
  Title: CallToActionTitle,
  Body: CallToActionBody,
  Actions: CallToActionActions,
};
