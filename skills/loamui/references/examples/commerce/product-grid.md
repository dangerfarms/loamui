---
title: Product grid
description: Four product cards in a list that fits as many across as it has room for, every button landing at the same foot.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Product grid

Four product cards in a list that fits as many across as it has room for, every button landing at the same foot.

An example in **Commerce**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`, `Button`, `Card`, `Price`, `Rating`
- Tags: shop, listing, catalogue, category page
- Live: https://loamui.com/examples/commerce/product-grid

## Built to the pillars

- **Native CSS.** A ul of products, each a Card rendered as an article named by its heading; the list says role="list" because stripping its markers drops the role in some browsers.
- **Modern CSS.** One auto-fit grid rule decides the columns from the list's own width, and each card's percentage height resolves against the item the grid stretched, so the actions line up across a row.
- **Composition.** The grid is the example's own CSS and the card inside is the Product Card example unchanged; the offer and the old price appear only on the product that has them.
- **Contextualism.** Every card's action row is a primary region and its offer a success one, so four Buttons and a Badge are coloured by two declarations rather than five props.
- **Accessible & gatekept.** Four identical-looking buttons have four different names, each ending in its product, and each review count reads "reviews" to a screen reader while showing only the figure.

## Example.tsx

```tsx
import { Badge, Button, Card, Price, Rating } from "@loamui/core";
import "./example.css";

const PRODUCTS = [
  {
    slug: "sweet-pea-cupani",
    name: "Sweet pea ‘Cupani’ seeds",
    alt: "Sweet pea flowers in deep maroon and violet on a hazel wigwam",
    image: "hedgerow-sweet-pea",
    rating: 4.5,
    reviews: 128,
    price: 2.8,
    was: 3.5,
    offer: "Save 20%",
  },
  {
    slug: "copper-trowel",
    name: "Copper hand trowel",
    alt: "A copper trowel with an ash handle lying on a potting bench",
    image: "hedgerow-trowel",
    rating: 5,
    reviews: 41,
    price: 24,
  },
  {
    slug: "rhubarb-timperley-early",
    name: "Rhubarb ‘Timperley Early’ crown",
    alt: "A bare-root rhubarb crown with a pink bud, on damp newspaper",
    image: "hedgerow-rhubarb",
    rating: 4,
    reviews: 17,
    price: 8.5,
  },
  {
    slug: "hazel-bean-poles",
    name: "Hazel bean poles, bundle of ten",
    alt: "A bundle of coppiced hazel poles tied with twine, leaning on a wall",
    image: "hedgerow-hazel-poles",
    rating: 4.5,
    reviews: 63,
    price: 14,
  },
];

export default function Example() {
  return (
    <ul className="product-grid" role="list">
      {PRODUCTS.map((product) => (
        <li key={product.slug}>
          <Card
            render={
              <article className="product" aria-labelledby={`product-${product.slug}-title`} />
            }
          >
            <img
              className="media"
              src={`https://picsum.photos/seed/${product.image}/600/600`}
              alt={product.alt}
              width="600"
              height="600"
            />
            {product.offer && (
              <p className="meta">
                <Badge>{product.offer}</Badge>
              </p>
            )}
            <h3 id={`product-${product.slug}-title`}>
              <a href={`/shop/${product.slug}`}>{product.name}</a>
            </h3>
            <div className="rating">
              <Rating readOnly label="Average rating" value={product.rating} />
              <span>
                ({product.reviews}
                <span className="loam-VisuallyHidden"> reviews</span>)
              </span>
            </div>
            <p className="price">
              {product.was && (
                <>
                  <span className="loam-VisuallyHidden">Was </span>
                  <s>
                    <Price value={product.was} currency="GBP" locale="en-GB" />
                  </s>{" "}
                  <span className="loam-VisuallyHidden">Now </span>
                </>
              )}
              <Price value={product.price} currency="GBP" locale="en-GB" />
            </p>
            <div className="actions">
              <Button>
                Add<span className="loam-VisuallyHidden"> {product.name}</span> to basket
              </Button>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
```

## example.css

```css
/* The list is the grid: as many cards across as it has room for, each at
   least 12rem, and the grid stretches every item to its row. The markers
   go; the markup keeps the list's role with role="list", since
   list-style: none drops it in some browsers. */
@scope (.product-grid) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-md);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0;
  }
}

/* Each card is a Card rendered as the article, so the Card element is
   this scope's root: the column inside is reachable, the Badge, Rating,
   Prices and Button are fenced by the donut, and the Card's own surface,
   line, radius and padding are left alone. */
@scope (.product-grid article.product) to ([class*="loam-"]) {
  :scope {
    /* A percentage, so it resolves against the item the grid stretched:
       every button lands at the same foot. */
    block-size: 100%;
    display: block flex;
    flex-direction: column;
    gap: var(--loam-space-sm);
  }

  img.media {
    aspect-ratio: 1;
    block-size: auto;
    border-radius: var(--loam-radius-md);
    inline-size: 100%;
    object-fit: cover;
  }

  p.meta {
    --loam-context: success;

    margin: 0;
  }

  h3 {
    font-size: var(--loam-text-lg);
    margin: 0;

    a {
      color: inherit;
      text-decoration: none;

      &:focus-visible {
        text-decoration: underline;
      }

      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
          text-decoration-color: var(--loam-color-primary);
        }
      }
    }
  }

  div.rating {
    align-items: center;
    color: var(--loam-color-fg-muted);
    display: block flex;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-xs);
  }

  p.price {
    font-size: var(--loam-text-lg);
    font-weight: 700;
    margin: 0;

    s {
      color: var(--loam-color-fg-muted);
      font-weight: 400;
      margin-inline-end: var(--loam-space-xs);
    }
  }

  div.actions {
    --loam-context: primary;

    display: block grid;
    margin-block-start: auto;
  }
}
```

