import type { ReactNode } from "react";
import { cx } from "@loamui/core";
import type { PartProps } from "@loamui/core";

export interface BannerRootProps extends PartProps<"div"> {
  children?: ReactNode;
}

/**
 * A one-line announcement bar for the top of a page: a message and, beside
 * it, a Button or a link.
 *
 * The bar is a `div` with no role of its own. A bar that is in the page
 * from the start is content, and content is not announced; a bar your
 * script injects after load is news, so give that one `role="status"` and
 * it is announced politely. It is neutral by default. Set `--loam-context`
 * on the Root, or on any region around it, and the parts inside recolour
 * while the bar's own surface takes that status's soft tint: one rule
 * paints the remapped primary-soft token, whichever status the region
 * declares. The surface is painted on an inner element the Root renders,
 * because an element cannot answer its own container query; the Root is
 * the container that answers it. Colour is never the only carrier of the
 * status: put a `Banner.Icon` beside the message, and open the message
 * with the status in words for assistive technology, hidden with core's
 * `loam-VisuallyHidden` class. There is no dismiss button: dismissal needs
 * state the bar does not hold, so a consumer that wants one keeps an
 * `open` flag and renders nothing once it is false.
 *
 * ```tsx
 * <Banner.Root style={{ "--loam-context": "warning" }}>
 *   <Banner.Icon><WarningIcon /></Banner.Icon>
 *   <Banner.Message>
 *     <span className="loam-VisuallyHidden">Warning: </span>
 *     Maintenance on Saturday from 08:00 to 10:00 UTC.
 *   </Banner.Message>
 *   <Banner.Actions>
 *     <a href="/status">See the status page</a>
 *   </Banner.Actions>
 * </Banner.Root>
 * ```
 */
function BannerRoot({ className, children, ref, ...rest }: BannerRootProps) {
  return (
    <div ref={ref} className={cx("loam-Banner", className)} {...rest}>
      <div className="inner">{children}</div>
    </div>
  );
}

export interface BannerIconProps extends PartProps<"span"> {
  /** An svg. */
  children?: ReactNode;
}

/**
 * Optional: a glyph at the start of the bar, in the status's strong
 * colour. Decorative and hidden from assistive technology; the words that
 * name the status belong in the Message.
 */
function BannerIcon({ className, children, ref, ...rest }: BannerIconProps) {
  return (
    <span ref={ref} aria-hidden="true" className={cx("icon", className)} {...rest}>
      {children}
    </span>
  );
}

export interface BannerMessageProps extends PartProps<"p"> {
  children?: ReactNode;
}

/**
 * The announcement, a paragraph that takes the row's slack. Open it with
 * the status in words for assistive technology when the bar has one:
 * `<span className="loam-VisuallyHidden">Warning: </span>`.
 */
function BannerMessage({ className, children, ref, ...rest }: BannerMessageProps) {
  return (
    <p ref={ref} className={cx("message", className)} {...rest}>
      {children}
    </p>
  );
}

export interface BannerActionsProps extends PartProps<"div"> {
  children?: ReactNode;
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
  Icon: BannerIcon,
  Message: BannerMessage,
  Actions: BannerActions,
};
