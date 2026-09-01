import type { DetailsHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";

export interface DetailsRootProps extends DetailsHTMLAttributes<HTMLDetailsElement> {
  /** Open by default (maps to the native open attribute). */
  defaultOpen?: boolean;
  /**
   * Share a name across several Details and the browser enforces
   * exclusivity natively: opening one closes the others. No wrapper
   * component is needed.
   */
  name?: string;
  children?: ReactNode;
  ref?: Ref<HTMLDetailsElement>;
}

/**
 * The native disclosure, styled and composed from parts:
 *
 * ```tsx
 * <Details.Root name="extras">
 *   <Details.Summary>Gift options</Details.Summary>
 *   <Details.Content>Add a gift message at checkout.</Details.Content>
 * </Details.Root>
 * ```
 *
 * `<details>/<summary>` with zero-JS toggling, find-in-page reveal, and
 * pre-hydration correctness.
 */
function DetailsRoot({ defaultOpen, name, className, children, ref, ...rest }: DetailsRootProps) {
  return (
    <details
      ref={ref}
      className={cx("loam-Details", className)}
      name={name}
      open={defaultOpen}
      {...rest}
    >
      {children}
    </details>
  );
}

export interface DetailsSummaryProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/** The always-visible line; the chevron is aria-hidden decoration. */
function DetailsSummary({ className, children, ref, ...rest }: DetailsSummaryProps) {
  return (
    <summary ref={ref} className={className} {...rest}>
      <span className="label">{children}</span>
      <svg
        className="chevron"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </summary>
  );
}

export interface DetailsContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** The revealed body: padded, muted prose. */
function DetailsContent({ className, children, ref, ...rest }: DetailsContentProps) {
  return (
    <div ref={ref} className={cx("content", className)} {...rest}>
      {children}
    </div>
  );
}

export const Details = {
  Root: DetailsRoot,
  Summary: DetailsSummary,
  Content: DetailsContent,
};
