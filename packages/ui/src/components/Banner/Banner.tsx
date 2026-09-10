import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";

export interface BannerRootProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/**
 * A one-line announcement bar for the top of a page: a message and, beside
 * it, a Button or a link.
 *
 * The bar is a `div` with `role="status"`: a live region, so a message that
 * appears after load is announced. It is neutral by default. Wrap it in a
 * `--loam-context` region and the parts inside recolour while the bar's
 * own surface takes that status's soft tint. There is no dismiss button:
 * dismissal needs state the bar does not hold, so a consumer that wants
 * one keeps an `open` flag and renders nothing once it is false.
 *
 * ```tsx
 * <div style={{ "--loam-context": "warning" }}>
 *   <Banner.Root>
 *     <Banner.Message>Maintenance on Saturday from 08:00 to 10:00 UTC.</Banner.Message>
 *     <Banner.Actions>
 *       <a href="/status">See the status page</a>
 *     </Banner.Actions>
 *   </Banner.Root>
 * </div>
 * ```
 */
function BannerRoot({ className, children, ref, ...rest }: BannerRootProps) {
  return (
    <div ref={ref} role="status" className={cx("loam-Banner", className)} {...rest}>
      {children}
    </div>
  );
}

export interface BannerMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/** The announcement, a paragraph that takes the row's slack. */
function BannerMessage({ className, children, ref, ...rest }: BannerMessageProps) {
  return (
    <p ref={ref} className={cx("message", className)} {...rest}>
      {children}
    </p>
  );
}

export interface BannerActionsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** A flex row at the end of the bar for a Button or a link. */
function BannerActions({ className, children, ref, ...rest }: BannerActionsProps) {
  return (
    <div ref={ref} className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

export const Banner = {
  Root: BannerRoot,
  Message: BannerMessage,
  Actions: BannerActions,
};
