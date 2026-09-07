"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { Card, renderWithProps, cx } from "@loamui/core";
import type { CardProps, PartProps, RenderProp } from "@loamui/core";
import { useNamedRoot, useNamePart } from "../../naming";

/** The words a product card says on its own, each with an English default. */
export interface ProductCardLabels {
  /** The hidden word after the review count: "(128 reviews)". @default (n) => n === 1 ? "review" : "reviews" */
  reviews?: (count: number) => ReactNode;
  /** The hidden word before an old price. @default "Was" */
  was?: ReactNode;
  /** The hidden word before the current price when an old one precedes it. @default "Now" */
  now?: ReactNode;
}

const DEFAULT_LABELS: Required<ProductCardLabels> = {
  reviews: (count) => (count === 1 ? "review" : "reviews"),
  was: "Was",
  now: "Now",
};

interface ProductCardContextValue {
  nameId: string;
  register: (id: string) => () => void;
  labels: Required<ProductCardLabels>;
}

const ProductCardContext = createContext<ProductCardContextValue | null>(null);

export interface ProductCardRootProps extends CardProps {
  /** The card's own words; Rating, Was and Value read them from here. */
  labels?: ProductCardLabels;
  /** Media first, then Meta, Title, Rating, Value and Actions. */
  children?: ReactNode;
}

/**
 * One product in a listing: an image, a linked name, a rating, a price and
 * one action.
 *
 * The unit is the card. It stands on its own beside a basket, and a listing
 * is a grid you write with each card in a `li`. The name holds the link,
 * not the card: a card that is one big link reads its whole contents as
 * the link's name and swallows the button inside it. The surface is core's
 * Card, left exactly as core styles it; the parts sit in their own
 * `article` inside it, named by the Title, so a screen reader's list of
 * the page's articles reads "Linen shirt", "Leather boots" rather than
 * "article", "article".
 *
 * `className`, `style` and `ref` land on the Card; `aria-label` and
 * `aria-labelledby` name the article inside it.
 *
 * ```tsx
 * <ProductCard.Root>
 *   <ProductCard.Media>
 *     <img src="/linen-shirt.jpg" alt="Linen shirt in sand, collar open" />
 *   </ProductCard.Media>
 *   <ProductCard.Title>
 *     <a href="/shop/linen-shirt">Linen shirt</a>
 *   </ProductCard.Title>
 *   <ProductCard.Rating count={128}>
 *     <Rating readOnly label="Average rating" value={4.5} />
 *   </ProductCard.Rating>
 *   <ProductCard.Value>
 *     <Price value={45} currency="GBP" />
 *   </ProductCard.Value>
 *   <ProductCard.Actions>
 *     <Button>
 *       Add to basket<span className="loam-VisuallyHidden"> Linen shirt</span>
 *     </Button>
 *   </ProductCard.Actions>
 * </ProductCard.Root>
 * ```
 */
function ProductCardRoot({
  labels,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  children,
  ...rest
}: ProductCardRootProps) {
  const { nameId, register, labelling } = useNamedRoot({
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  });
  const value = useMemo<ProductCardContextValue>(
    () => ({ nameId, register, labels: { ...DEFAULT_LABELS, ...labels } }),
    [nameId, register, labels],
  );
  // The Card's own render prop passes through: render={<li />} in a list.
  // The article is named by its Title from the first render, so the server
  // HTML carries the name; a consumer's own name wins.
  return (
    <Card {...rest}>
      <article
        className="loam-ProductCard"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...labelling}
      >
        <ProductCardContext value={value}>{children}</ProductCardContext>
      </article>
    </Card>
  );
}

export interface ProductCardDivProps extends PartProps<"div"> {}

export interface ProductCardParagraphProps extends PartProps<"p"> {}

/**
 * The product's picture: your `<img>`, square and filling the card's width.
 * Give it an `alt` that says what the picture shows (colour, shape,
 * finish); unlike an article's illustration, a product image carries
 * information the name alone does not.
 */
function ProductCardMedia({ className, children, ...rest }: ProductCardDivProps) {
  return (
    <div className={cx("media", className)} {...rest}>
      {children}
    </div>
  );
}

/** A small row for a Badge: a stock or offer note, coloured by a `--loam-context` region you place. */
function ProductCardMeta({ className, children, ...rest }: ProductCardParagraphProps) {
  return (
    <p className={cx("meta", className)} {...rest}>
      {children}
    </p>
  );
}

export interface ProductCardTitleProps extends PartProps<"h3"> {
  /** Render as a different heading: `render={<h2 />}` where the card is the page's own list. */
  render?: RenderProp<Record<string, unknown>>;
  /** The product's link: an `<a href>`, or a router link. */
  children?: ReactNode;
}

/**
 * The product's name around your link. An `h3` by default; the name is the
 * link, the card is not. Its `id` (yours if you pass one, the composition's
 * otherwise) is what the article's `aria-labelledby` points at, which is
 * what names the card.
 */
function ProductCardTitle({ render, className, children, id, ...rest }: ProductCardTitleProps) {
  const ctx = useContext(ProductCardContext);
  const titleId = useNamePart(ctx, id);
  const props = { id: titleId, className: cx("title", className), children, ...rest };
  if (render) return <>{renderWithProps(render, props)}</>;
  return <h3 {...props}>{children}</h3>;
}

export interface ProductCardRatingProps extends ProductCardDivProps {
  /** How many reviews the rating averages, shown in brackets beside the stars. */
  count?: number;
  /** A display-mode core Rating: `<Rating readOnly label="Average rating" value={4.5} />`. */
  children?: ReactNode;
}

/**
 * The average rating: your read-only core Rating, whose accessible name
 * carries the score, with the review count as text beside it. The count
 * reads "(128 reviews)" to assistive tech and "(128)" on screen; the word
 * is `labels.reviews(count)`, so it pluralises and translates.
 */
function ProductCardRating({ count, className, children, ...rest }: ProductCardRatingProps) {
  const ctx = useContext(ProductCardContext);
  const labels = ctx?.labels ?? DEFAULT_LABELS;
  return (
    <div className={cx("rating", className)} {...rest}>
      {children}
      {count != null && (
        <span className="count">
          ({count}
          <span className="loam-VisuallyHidden"> {labels.reviews(count)}</span>)
        </span>
      )}
    </div>
  );
}

export interface ProductCardWasProps extends PartProps<"s"> {
  /**
   * The words around the pair. Inside a `ProductCard.Root` they default to
   * the Root's `labels`; outside one (in a `CartLine.Value`, say) to the
   * English.
   */
  labels?: Pick<ProductCardLabels, "was" | "now">;
  /** The price before the reduction: a core Price. */
  children?: ReactNode;
}

/**
 * The price before a reduction: a core Price struck through, placed
 * before the current one. It writes `labels.was` before itself and
 * `labels.now` after, both hidden, so the change is announced ("Was £45
 * Now £36") and never carried by the strike alone. The judgment is the
 * part's, so the same markup works in a `CartLine.Value`, where it reads
 * the same words from its own `labels`.
 */
function ProductCardWas({ labels, className, children, ...rest }: ProductCardWasProps) {
  const ctx = useContext(ProductCardContext);
  const was = labels?.was ?? ctx?.labels.was ?? DEFAULT_LABELS.was;
  const now = labels?.now ?? ctx?.labels.now ?? DEFAULT_LABELS.now;
  return (
    <>
      <span className="loam-VisuallyHidden">{was} </span>
      <s className={cx("was", className)} {...rest}>
        {children}
      </s>{" "}
      <span className="loam-VisuallyHidden">{now} </span>
    </>
  );
}

export interface ProductCardValueProps extends ProductCardParagraphProps {
  /** The current price, a core Price; a `ProductCard.Was` before it for a reduction. */
  children?: ReactNode;
}

/** The price, large and bold: a core `Price` as its children, after a `ProductCard.Was` when there is one. */
function ProductCardValue({ className, children, ...rest }: ProductCardValueProps) {
  return (
    <p className={cx("value", className)} {...rest}>
      {children}
    </p>
  );
}

/**
 * The one action, at the foot of the card and stretched to its width. Name
 * the product inside the Button in the `loam-VisuallyHidden` class ("Add
 * to basket Linen shirt"), so a listing of identical buttons tells them
 * apart.
 */
function ProductCardActions({ className, children, ...rest }: ProductCardDivProps) {
  return (
    <div className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

export const ProductCard = {
  Root: ProductCardRoot,
  Media: ProductCardMedia,
  Meta: ProductCardMeta,
  Title: ProductCardTitle,
  Rating: ProductCardRating,
  Value: ProductCardValue,
  Was: ProductCardWas,
  Actions: ProductCardActions,
};
