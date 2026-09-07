import type { HTMLAttributes, ReactNode, Ref } from "react";
import { Card, renderWithProps, cx } from "@loamui/core";
import type { CardProps, RenderProp } from "@loamui/core";
import { Byline } from "../Byline/Byline";

export interface ArticleCardRootProps extends CardProps {
  /** An optional `<img>` first, then Meta, Title, Excerpt and Byline. */
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/**
 * One article: a Card holding a category and date, a linked title, an
 * excerpt and a byline.
 *
 * The unit is the card. It stands on its own beside an article's end, and
 * an index is a grid you write, each card rendered as a `li` through the
 * Card's `render`. The title holds the link, not the card: a card that is
 * one big link reads its whole contents as the link's name and swallows
 * every other control inside it. The surface is core's Card, left exactly
 * as core styles it; the parts sit in their own `article` inside it, and
 * the foot is a Byline, the same row that heads the article itself.
 *
 * ```tsx
 * <ArticleCard.Root>
 *   <ArticleCard.Meta>
 *     <Badge>Engineering</Badge>
 *     <time dateTime="2026-08-12">12 August 2026</time>
 *   </ArticleCard.Meta>
 *   <ArticleCard.Title>
 *     <a href="/blog/static-css">Why the stylesheet is one static file</a>
 *   </ArticleCard.Title>
 *   <ArticleCard.Excerpt>Nothing runs at runtime, and that is the point.</ArticleCard.Excerpt>
 *   <ArticleCard.Byline>
 *     <Avatar name="Imogen Hartley" aria-hidden />
 *     <Byline.Author href="/authors/imogen-hartley">Imogen Hartley</Byline.Author>
 *   </ArticleCard.Byline>
 * </ArticleCard.Root>
 * ```
 */
function ArticleCardRoot({ children, ref, ...rest }: ArticleCardRootProps) {
  // The Card's own render prop passes through: render={<li />} in a list.
  return (
    <Card ref={ref} {...rest}>
      <article className="loam-ArticleCard">{children}</article>
    </Card>
  );
}

export interface ArticleCardParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/** A small muted row: a Badge for the category and a `<time>` for the date. */
function ArticleCardMeta({ className, children, ref, ...rest }: ArticleCardParagraphProps) {
  return (
    <p ref={ref} className={cx("meta", className)} {...rest}>
      {children}
    </p>
  );
}

export interface ArticleCardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Render as a different heading: `render={<h2 />}` where the card is the page's own list. */
  render?: RenderProp<Record<string, unknown>>;
  /** The article's link: an `<a href>`, or a router link. */
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/** The article's title around your link. An `h3` by default; the title is the link, the card is not. */
function ArticleCardTitle({ render, className, children, ref, ...rest }: ArticleCardTitleProps) {
  if (render) {
    return (
      <>{renderWithProps(render, { ref, className: cx("title", className), children, ...rest })}</>
    );
  }
  return (
    <h3 ref={ref} className={cx("title", className)} {...rest}>
      {children}
    </h3>
  );
}

/**
 * The opening lines, muted and clamped to three where the browser can
 * clamp. It takes the slack in the column, so the byline sits at the foot
 * of every card in a row whatever the excerpt's length.
 */
function ArticleCardExcerpt({ className, children, ref, ...rest }: ArticleCardParagraphProps) {
  return (
    <p ref={ref} className={cx("excerpt", className)} {...rest}>
      {children}
    </p>
  );
}

export const ArticleCard = {
  Root: ArticleCardRoot,
  Meta: ArticleCardMeta,
  Title: ArticleCardTitle,
  Excerpt: ArticleCardExcerpt,
  /**
   * Who wrote it, at the foot of the card: a `Byline.Root`, so an Avatar,
   * a `Byline.Author` and, if you want them there, a `Byline.ReadingTime`
   * read the same way here as at the top of the article.
   */
  Byline: Byline.Root,
};
