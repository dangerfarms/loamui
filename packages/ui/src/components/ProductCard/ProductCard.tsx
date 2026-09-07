"use client";

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useState } from "react";
import type { HTMLAttributes, ReactNode, Ref } from "react";
import { Card, renderWithProps, cx } from "@loamui/core";
import type { CardProps, RenderProp } from "@loamui/core";

interface ProductCardContextValue {
  /** The Title tells the card its id; the card is named by it while it is present. */
  registerTitle: (id: string) => () => void;
}

const ProductCardContext = createContext<ProductCardContextValue | null>(null);

export interface ProductCardRootProps extends CardProps {
  /** Media first, then Meta, Title, Rating, Value and Actions. */
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
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
function ProductCardRoot({ children, ref, ...rest }: ProductCardRootProps) {
  const [titleId, setTitleId] = useState<string | null>(null);
  const registerTitle = useCallback((id: string) => {
    setTitleId(id);
    return () => setTitleId((current) => (current === id ? null : current));
  }, []);
  const value = useMemo<ProductCardContextValue>(() => ({ registerTitle }), [registerTitle]);
  // The Card's own render prop passes through: render={<li />} in a list.
  // The article points at a Title only while one is rendered: a reference
  // to nothing would name it nothing.
  return (
    <Card ref={ref} {...rest}>
      <article className="loam-ProductCard" aria-labelledby={titleId ?? undefined}>
        <ProductCardContext value={value}>{children}</ProductCardContext>
      </article>
    </Card>
  );
}

export interface ProductCardDivProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export interface ProductCardParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/**
 * The product's picture: your `<img>`, square and filling the card's width.
 * Give it an `alt` that says what the picture shows (colour, shape,
 * finish); unlike an article's illustration, a product image carries
 * information the name alone does not.
 */
function ProductCardMedia({ className, children, ref, ...rest }: ProductCardDivProps) {
  return (
    <div ref={ref} className={cx("media", className)} {...rest}>
      {children}
    </div>
  );
}

/** A small row for a Badge: a stock or offer note, coloured by a `--loam-context` region you place. */
function ProductCardMeta({ className, children, ref, ...rest }: ProductCardParagraphProps) {
  return (
    <p ref={ref} className={cx("meta", className)} {...rest}>
      {children}
    </p>
  );
}

export interface ProductCardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Render as a different heading: `render={<h2 />}` where the card is the page's own list. */
  render?: RenderProp<Record<string, unknown>>;
  /** The product's link: an `<a href>`, or a router link. */
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/**
 * The product's name around your link. An `h3` by default; the name is the
 * link, the card is not. Its `id` (yours if you pass one, the composition's
 * otherwise) is what the article's `aria-labelledby` points at, which is
 * what names the card.
 */
function ProductCardTitle({
  render,
  className,
  children,
  ref,
  id,
  ...rest
}: ProductCardTitleProps) {
  const ctx = useContext(ProductCardContext);
  if (!ctx) {
    throw new Error("ProductCard.Title must be rendered inside <ProductCard.Root>.");
  }
  const autoId = useId();
  const titleId = id ?? autoId;
  const { registerTitle } = ctx;
  useEffect(() => registerTitle(titleId), [registerTitle, titleId]);
  const props = { ref, id: titleId, className: cx("title", className), children, ...rest };
  if (render) return <>{renderWithProps(render, props)}</>;
  return <h3 {...props}>{children}</h3>;
}

export interface ProductCardRatingProps extends ProductCardDivProps {
  /** How many reviews the rating averages, shown in brackets beside the stars. */
  count?: ReactNode;
  /** A display-mode core Rating: `<Rating readOnly label="Average rating" value={4.5} />`. */
  children?: ReactNode;
}

/**
 * The average rating: your read-only core Rating, whose accessible name
 * carries the score, with the review count as text beside it. The count
 * reads "(128 reviews)" to assistive tech and "(128)" on screen.
 */
function ProductCardRating({ count, className, children, ref, ...rest }: ProductCardRatingProps) {
  return (
    <div ref={ref} className={cx("rating", className)} {...rest}>
      {children}
      {count != null && count !== false && (
        <span className="count">
          ({count}
          <span className="loam-VisuallyHidden"> reviews</span>)
        </span>
      )}
    </div>
  );
}

export interface ProductCardValueProps extends ProductCardParagraphProps {
  /**
   * The price before a reduction, as a core Price. Shown struck through
   * before the current price, with "Was" and "Now" read out around the
   * two so the change is announced, never carried by the strike alone.
   */
  was?: ReactNode;
  /** The current price: a core Price. */
  children?: ReactNode;
}

/** The price, large and bold, a core `Price` as its children; with `was`, the old price struck through before it. */
function ProductCardValue({ was, className, children, ref, ...rest }: ProductCardValueProps) {
  return (
    <p ref={ref} className={cx("value", className)} {...rest}>
      {was != null && was !== false && (
        <>
          <span className="loam-VisuallyHidden">Was </span>
          <s>{was}</s> <span className="loam-VisuallyHidden">Now </span>
        </>
      )}
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
function ProductCardActions({ className, children, ref, ...rest }: ProductCardDivProps) {
  return (
    <div ref={ref} className={cx("actions", className)} {...rest}>
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
  Actions: ProductCardActions,
};
