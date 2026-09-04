import type { HTMLAttributes, ReactNode, Ref } from "react";
import { Card } from "@loamui/core";
import { cx } from "../../utils";

export interface ArticleCardsRootProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * A list of articles: a grid of Cards, each a category and date, a linked
 * title, an excerpt and an author.
 *
 * The title holds the link, not the card: a card that is one big link
 * reads its whole contents as the link's name and swallows every other
 * control inside it. There is no image part; place your own `<img>` first
 * in `ArticleCards.Card` if the article has one.
 *
 * ```tsx
 * <ArticleCards.Root>
 *   <ArticleCards.Grid>
 *     <ArticleCards.Card>
 *       <ArticleCards.Meta>
 *         <Badge>Engineering</Badge>
 *         <time dateTime="2026-08-12">12 August 2026</time>
 *       </ArticleCards.Meta>
 *       <ArticleCards.Title>
 *         <a href="/blog/static-css">Why the stylesheet is one static file</a>
 *       </ArticleCards.Title>
 *       <ArticleCards.Excerpt>Nothing runs at runtime, and that is the point.</ArticleCards.Excerpt>
 *       <ArticleCards.Author>
 *         <Avatar name="Imogen Hartley" aria-hidden />
 *         Imogen Hartley
 *       </ArticleCards.Author>
 *     </ArticleCards.Card>
 *   </ArticleCards.Grid>
 * </ArticleCards.Root>
 * ```
 */
function ArticleCardsRoot({ className, children, ref, ...rest }: ArticleCardsRootProps) {
  return (
    <section ref={ref} className={cx("loam-ArticleCards", className)} {...rest}>
      {children}
    </section>
  );
}

export interface ArticleCardsGridProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode;
  ref?: Ref<HTMLUListElement>;
}

/** The list of articles: an auto-fit grid of columns at least 18rem wide. */
function ArticleCardsGrid({ className, children, ref, ...rest }: ArticleCardsGridProps) {
  return (
    <ul ref={ref} className={cx("grid", className)} {...rest}>
      {children}
    </ul>
  );
}

export interface ArticleCardsCardProps extends HTMLAttributes<HTMLLIElement> {
  /** An optional `<img>` first, then Meta, Title, Excerpt and Author. */
  children?: ReactNode;
  ref?: Ref<HTMLLIElement>;
}

/**
 * One article: a list item wrapping a Card. The list item is the region,
 * so `--loam-context` declared here reaches the Badge inside the Card.
 */
function ArticleCardsCard({ className, children, ref, ...rest }: ArticleCardsCardProps) {
  return (
    <li ref={ref} className={className} {...rest}>
      <Card className="loam-ArticleCards-card">{children}</Card>
    </li>
  );
}

export interface ArticleCardsParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/** A small muted row: a Badge for the category and a `<time>` for the date. */
function ArticleCardsMeta({ className, children, ref, ...rest }: ArticleCardsParagraphProps) {
  return (
    <p ref={ref} className={cx("meta", className)} {...rest}>
      {children}
    </p>
  );
}

export interface ArticleCardsTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** The article's link: an `<a href>`, or a router link. */
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/** The article's title, an h3 around your link. The title is the link; the card is not. */
function ArticleCardsTitle({ className, children, ref, ...rest }: ArticleCardsTitleProps) {
  return (
    <h3 ref={ref} className={cx("title", className)} {...rest}>
      {children}
    </h3>
  );
}

/** The opening lines, muted and clamped to three where the browser can clamp. */
function ArticleCardsExcerpt({ className, children, ref, ...rest }: ArticleCardsParagraphProps) {
  return (
    <p ref={ref} className={cx("excerpt", className)} {...rest}>
      {children}
    </p>
  );
}

/** Who wrote it: a flex row for an Avatar and the name beside it, at the foot of the card. */
function ArticleCardsAuthor({ className, children, ref, ...rest }: ArticleCardsParagraphProps) {
  return (
    <p ref={ref} className={cx("author", className)} {...rest}>
      {children}
    </p>
  );
}

export const ArticleCards = {
  Root: ArticleCardsRoot,
  Grid: ArticleCardsGrid,
  Card: ArticleCardsCard,
  Meta: ArticleCardsMeta,
  Title: ArticleCardsTitle,
  Excerpt: ArticleCardsExcerpt,
  Author: ArticleCardsAuthor,
};
