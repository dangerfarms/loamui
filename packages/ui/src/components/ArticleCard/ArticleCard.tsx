"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { Card, renderWithProps, cx } from "@loamui/core";
import type { CardProps, PartProps, RenderProp } from "@loamui/core";
import { Byline } from "../Byline/Byline";
import type { BylineRootProps } from "../Byline/Byline";
import { useNamedRoot, useNamePart } from "../../naming";

interface ArticleCardContextValue {
  nameId: string;
  register: (id: string) => () => void;
}

const ArticleCardContext = createContext<ArticleCardContextValue | null>(null);

export interface ArticleCardRootProps extends CardProps {
  /** Media first, then Meta, Title, Description and Byline. */
  children?: ReactNode;
}

/**
 * One article: a Card holding a category and date, a linked title, a
 * description and a byline.
 *
 * The unit is the card. It stands on its own beside an article's end, and
 * an index is a grid you write, each card rendered as a `li` through the
 * Card's `render`. The title holds the link, not the card: a card that is
 * one big link reads its whole contents as the link's name and swallows
 * every other control inside it. The surface is core's Card, left exactly
 * as core styles it; the parts sit in their own `article` inside it, named
 * by the Title, so a screen reader's list of the page's articles reads the
 * titles rather than "article", "article". The foot is a Byline, the same
 * row that heads the article itself, and it sits at the foot of every card
 * in a row whatever the parts above it.
 *
 * `className`, `style` and `ref` land on the Card; `aria-label` and
 * `aria-labelledby` name the article inside it.
 *
 * ```tsx
 * <ArticleCard.Root>
 *   <ArticleCard.Meta>
 *     <Badge>Engineering</Badge>
 *     <Time value="2026-08-12" locale="en-GB" dateStyle="long" />
 *   </ArticleCard.Meta>
 *   <ArticleCard.Title>
 *     <a href="/blog/static-css">Why the stylesheet is one static file</a>
 *   </ArticleCard.Title>
 *   <ArticleCard.Description>Nothing runs at runtime, and that is the point.</ArticleCard.Description>
 *   <ArticleCard.Byline>
 *     <Avatar name="Imogen Hartley" aria-hidden />
 *     <Byline.Author href="/authors/imogen-hartley">Imogen Hartley</Byline.Author>
 *   </ArticleCard.Byline>
 * </ArticleCard.Root>
 * ```
 */
function ArticleCardRoot({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  children,
  ...rest
}: ArticleCardRootProps) {
  const { nameId, register, labelling } = useNamedRoot({
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  });
  const value = useMemo<ArticleCardContextValue>(() => ({ nameId, register }), [nameId, register]);
  // The Card's own render prop passes through: render={<li />} in a list.
  // The article is named by its Title from the first render, so the server
  // HTML carries the name; a consumer's own name wins.
  return (
    <Card {...rest}>
      <article
        className="loam-ArticleCard"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...labelling}
      >
        <ArticleCardContext value={value}>{children}</ArticleCardContext>
      </article>
    </Card>
  );
}

export interface ArticleCardDivProps extends PartProps<"div"> {}

export interface ArticleCardParagraphProps extends PartProps<"p"> {}

/**
 * The article's picture: your `<img>`, first in the card and filling its
 * width. Give it an empty `alt` when it only illustrates the title, which
 * is what a post's picture usually does; describe it when it carries
 * something the title does not.
 */
function ArticleCardMedia({ className, children, ...rest }: ArticleCardDivProps) {
  return (
    <div className={cx("media", className)} {...rest}>
      {children}
    </div>
  );
}

/** A small muted row: a Badge for the category and a core `Time` for the date. */
function ArticleCardMeta({ className, children, ...rest }: ArticleCardParagraphProps) {
  return (
    <p className={cx("meta", className)} {...rest}>
      {children}
    </p>
  );
}

export interface ArticleCardTitleProps extends PartProps<"h3"> {
  /** Render as a different heading: `render={<h2 />}` where the card is the page's own list. */
  render?: RenderProp<Record<string, unknown>>;
  /** The article's link: an `<a href>`, or a router link. */
  children?: ReactNode;
}

/**
 * The article's title around your link. An `h3` by default; the title is
 * the link, the card is not. Its `id` (yours if you pass one, the
 * composition's otherwise) is what the article's `aria-labelledby` points
 * at, which is what names the card.
 */
function ArticleCardTitle({ render, className, children, id, ...rest }: ArticleCardTitleProps) {
  const ctx = useContext(ArticleCardContext);
  const titleId = useNamePart(ctx, id);
  const props = { id: titleId, className: cx("title", className), children, ...rest };
  if (render) return <>{renderWithProps(render, props)}</>;
  return <h3 {...props}>{children}</h3>;
}

/**
 * The opening lines, muted and clamped to three where the browser can
 * clamp; elsewhere it runs its full length.
 */
function ArticleCardDescription({ className, children, ...rest }: ArticleCardParagraphProps) {
  return (
    <p className={cx("description", className)} {...rest}>
      {children}
    </p>
  );
}

export interface ArticleCardBylineProps extends BylineRootProps {
  /** Applied to the part's foot `div`; every other prop, `ref` included, reaches the `Byline.Root` inside it. */
  className?: string;
}

/**
 * Who wrote it, at the foot of the card: a `Byline.Root` in a foot the
 * composition renders, so an Avatar, a `Byline.Author` and, if you want
 * them there, a `Byline.ReadingTime` read the same way here as at the top
 * of the article. The foot takes the column's slack, so the byline sits at
 * the foot of every card in a row whichever parts sit above it.
 */
function ArticleCardByline({ className, ...rest }: ArticleCardBylineProps) {
  return (
    <div className={cx("foot", className)}>
      <Byline.Root {...rest} />
    </div>
  );
}

export const ArticleCard = {
  Root: ArticleCardRoot,
  Media: ArticleCardMedia,
  Meta: ArticleCardMeta,
  Title: ArticleCardTitle,
  Description: ArticleCardDescription,
  Byline: ArticleCardByline,
};
