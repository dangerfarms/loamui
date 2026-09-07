import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";
import { Time, renderWithProps, cx } from "@loamui/core";
import type { RenderProp, TimeProps } from "@loamui/core";

export interface BylineRootProps extends HTMLAttributes<HTMLDivElement> {
  /** An optional `Avatar` first, then Author, Published, Updated and ReadingTime. */
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/**
 * Who wrote an article and when: an avatar, the author's name linked to
 * their profile, the date it was published, and how long it takes to read.
 *
 * The unit is the byline. It sits at the top of one article, under the
 * title, and at the foot of an ArticleCard. The root is one row that
 * wraps; the Author inside it is an `address` element, which HTML
 * reserves for the contact information of its nearest article's author,
 * around the name or the link to the profile: the spec's own example of
 * the element. (The root is not the address because the dates and the
 * reading time are not contact information, and not a `p`, because a `p`
 * cannot hold an `address`.) Place the Author first: the row draws a dot
 * before every date and reading time that follows another part, and never
 * before the Author, so the author's name is never preceded by a dot. The
 * dates are core `Time`s, so each carries a machine-readable `dateTime`
 * while the text is written in the page's locale. The avatar is core's
 * `Avatar`, placed by you (first, usually) with the author's `name` for
 * the initials and `aria-hidden`, because the name is printed beside it
 * and assistive technology should hear it once; the dots are drawn from
 * the composition's own parts, so where the Avatar sits does not move
 * them.
 *
 * ```tsx
 * <Byline.Root>
 *   <Avatar name="Imogen Hartley" aria-hidden />
 *   <Byline.Author href="/authors/imogen-hartley">Imogen Hartley</Byline.Author>
 *   <Byline.Published value="2026-08-12" locale="en-GB" dateStyle="long" />
 *   <Byline.ReadingTime>6 min read</Byline.ReadingTime>
 * </Byline.Root>
 * ```
 */
function BylineRoot({ className, children, ref, ...rest }: BylineRootProps) {
  return (
    <div ref={ref} className={cx("loam-Byline", className)} {...rest}>
      {children}
    </div>
  );
}

export interface BylineAuthorProps extends AnchorHTMLAttributes<HTMLElement> {
  /** The author's profile. With it the name is a link with `rel="author"`; without it, plain text. */
  href?: string;
  /**
   * Render the link as a different element: `render={<Link to="/authors/imogen" />}`
   * for a router link. The part's `rel` and attributes merge onto it.
   */
  render?: RenderProp<Record<string, unknown>>;
  /** The author's name. */
  children?: ReactNode;
  /** Reaches the link or the span, not the address around it. */
  ref?: Ref<HTMLElement>;
}

/**
 * The author's name, in an `address`: HTML's element for the contact
 * information of the nearest article's author, which is what a link to the
 * author's profile is. Inside it, a link with `rel="author"` when there is
 * an `href` (or a `render`), so the relationship is stated in the markup,
 * not just in the word beside it; a `span` when there is no profile to
 * link to. Place it first among the parts.
 */
function BylineAuthor({ href, render, rel, className, children, ref, ...rest }: BylineAuthorProps) {
  let name: ReactNode;
  if (render) {
    name = renderWithProps(render, { ...rest, ref, href, rel: cx("author", rel), children });
  } else if (href) {
    name = (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={href}
        rel={cx("author", rel)}
      >
        {children}
      </a>
    );
  } else {
    name = (
      <span ref={ref as Ref<HTMLSpanElement>} {...(rest as HTMLAttributes<HTMLSpanElement>)}>
        {children}
      </span>
    );
  }
  return <address className={cx("author", className)}>{name}</address>;
}

export interface BylineDateProps extends TimeProps {
  /** Applied to the part's `span`; every other prop, `ref` included, reaches the `time` inside it. */
  className?: string;
}

/**
 * When the article was published: a core `Time` in the row. The date needs
 * no label; a date in a byline is read as the publication date.
 */
function BylinePublished({ className, ...rest }: BylineDateProps) {
  return (
    <span className={cx("published", className)}>
      <Time {...rest} />
    </span>
  );
}

export interface BylineUpdatedProps extends Omit<BylineDateProps, "children"> {
  /** The visible word before the date, in the page's language. @default "Updated" */
  children?: ReactNode;
}

/**
 * When the article was last updated: the visible word "Updated" then a core
 * `Time`. The word is text in the row, never a tooltip or a title attribute,
 * because a reader who cannot hover or who is listening must still learn
 * which of the two dates is which. Pass children to write the word in
 * another language.
 */
function BylineUpdated({ className, children, ...rest }: BylineUpdatedProps) {
  return (
    <span className={cx("updated", className)}>
      {children ?? "Updated"} <Time {...rest} />
    </span>
  );
}

export interface BylineReadingTimeProps extends HTMLAttributes<HTMLSpanElement> {
  /** The estimate, written out: "6 min read". */
  children?: ReactNode;
  ref?: Ref<HTMLSpanElement>;
}

/**
 * How long the article takes to read, as text you write ("6 min read"). The
 * estimate is yours: it depends on the words you count and the pace you
 * assume, and it is computed once where the article is, not in the browser.
 */
function BylineReadingTime({ className, children, ref, ...rest }: BylineReadingTimeProps) {
  return (
    <span ref={ref} className={cx("reading-time", className)} {...rest}>
      {children}
    </span>
  );
}

export const Byline = {
  Root: BylineRoot,
  Author: BylineAuthor,
  Published: BylinePublished,
  Updated: BylineUpdated,
  ReadingTime: BylineReadingTime,
};
