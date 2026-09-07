import type { AnchorHTMLAttributes, HTMLAttributes, LiHTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "@loamui/core";

export interface SocialLinksRootProps extends HTMLAttributes<HTMLElement> {
  /**
   * Names the landmark for assistive technology; every nav on a page needs
   * a distinct one. Yields to an `aria-labelledby` you pass instead.
   * @default "Social"
   */
  "aria-label"?: string;
  /** `SocialLinks.Item`s. */
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * A row of icon-only links to profiles.
 *
 * The judgment is in the link. An icon-only link needs a real accessible
 * name, so `SocialLinks.Link` takes a required `label` and renders it as
 * visually hidden text inside the anchor: it is the name, it translates,
 * and it shows in reader mode, none of which an `aria-label` does. The
 * icon you pass is hidden from assistive technology for you. Every target
 * is floored at 24 CSS px with space between targets, and the icon follows
 * the surrounding font size, so there is no size prop. Links carry
 * `rel="me"` by default: the IndieWeb identity rel, saying this profile is
 * the site's own. No icon library is bundled; pass the `svg` as a child.
 *
 * The Root is a `nav` landmark (named "Social" unless you say otherwise)
 * around a `ul`, so a Footer, a Header or an author bio can each hold one.
 *
 * ```tsx
 * <SocialLinks.Root>
 *   <SocialLinks.Item>
 *     <SocialLinks.Link href="https://github.com/loamui" label="GitHub">
 *       <GitHubIcon />
 *     </SocialLinks.Link>
 *   </SocialLinks.Item>
 *   <SocialLinks.Item>
 *     <SocialLinks.Link href="https://bsky.app/profile/loamui.com" label="Bluesky">
 *       <BlueskyIcon />
 *     </SocialLinks.Link>
 *   </SocialLinks.Item>
 * </SocialLinks.Root>
 * ```
 */
function SocialLinksRoot({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  children,
  ref,
  ...rest
}: SocialLinksRootProps) {
  return (
    <nav
      ref={ref}
      className={cx("loam-SocialLinks", className)}
      aria-label={ariaLabelledBy ? ariaLabel : (ariaLabel ?? "Social")}
      aria-labelledby={ariaLabelledBy}
      {...rest}
    >
      {/* The stylesheet removes the markers. Safari drops list semantics
          with them, except inside a nav, so no role="list" is needed here
          (the same shape as Header.Nav). */}
      <ul>{children}</ul>
    </nav>
  );
}

export interface SocialLinksItemProps extends LiHTMLAttributes<HTMLLIElement> {
  /** One `SocialLinks.Link`. */
  children?: ReactNode;
  ref?: Ref<HTMLLIElement>;
}

/** One entry in the list, an `li`. */
function SocialLinksItem({ className, children, ref, ...rest }: SocialLinksItemProps) {
  return (
    <li ref={ref} className={cx("item", className)} {...rest}>
      {children}
    </li>
  );
}

export interface SocialLinksLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * The profile's name, the link's accessible name: "GitHub", "Mastodon".
   * Rendered as visually hidden text, not as `aria-label`.
   */
  label: string;
  /**
   * The link relation. "me" claims the profile as the site's own; pass
   * something else for a profile that is not (a team member's, say).
   * @default "me"
   */
  rel?: string;
  /** The icon: an `svg`. It is hidden from assistive technology; the label names the link. */
  children?: ReactNode;
  ref?: Ref<HTMLAnchorElement>;
}

/**
 * The link: an `a` holding a hidden icon and the name as text hidden by
 * core's `.loam-VisuallyHidden`. The part adds the judgment (the name as
 * real text, the icon hidden, the rel), which is why it is a part and not
 * your own `a`.
 */
function SocialLinksLink({
  label,
  rel = "me",
  className,
  children,
  ref,
  ...rest
}: SocialLinksLinkProps) {
  return (
    <a ref={ref} className={cx("link", className)} rel={rel} {...rest}>
      <span className="icon" aria-hidden>
        {children}
      </span>
      <span className="loam-VisuallyHidden">{label}</span>
    </a>
  );
}

export const SocialLinks = {
  Root: SocialLinksRoot,
  Item: SocialLinksItem,
  Link: SocialLinksLink,
};
