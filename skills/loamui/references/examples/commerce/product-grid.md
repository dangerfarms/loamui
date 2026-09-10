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
- **Contextualism.** Every card's action row is a primary region and its offer a success one, so four Buttons and a Badge are coloured by two declarations rather than five props; primary is the brand slot, neutral until a theme fills it, and a theme that does recolours all four at once.
- **Accessible & gatekept.** Four identical-looking buttons have four different names, each ending in its product, and each review count reads "reviews" to a screen reader while showing only the figure.

## Example.tsx

```tsx
import { Badge, Button, Card, Price, Rating } from "@loamui/core";
import "./example.css";

const PRODUCTS = [
  {
    slug: "climbing-bean-blue-lake",
    name: "Climbing bean ‘Blue Lake’ seeds",
    alt: "Freshly picked green pods heaped in a crate on the bench",
    image: 627,
    rating: 4.5,
    reviews: 128,
    price: 2.8,
    was: 3.5,
    offer: "Save 20%",
  },
  {
    slug: "raspberry-autumn-bliss",
    name: "Raspberry ‘Autumn Bliss’ canes, bundle of five",
    alt: "A cup of freshly picked raspberries on the bench",
    image: 429,
    rating: 5,
    reviews: 41,
    price: 24,
  },
  {
    slug: "strawberry-cambridge-favourite",
    name: "Strawberry ‘Cambridge Favourite’ runners, pack of twelve",
    alt: "Ripe strawberries on the plant, ready to pick",
    image: 1080,
    rating: 4,
    reviews: 17,
    price: 8.5,
  },
  {
    slug: "bamboo-canes",
    name: "Bamboo canes, bundle of ten",
    alt: "Bamboo canes capped with jam jars along a raised bed",
    image: 90,
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
              src={`https://picsum.photos/id/${product.image}/600/600`}
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

@scope (.product-grid article.product) to ([class*="loam-"]) {
  :scope {
    /* A percentage: it resolves against the item the grid stretched. */
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

  /* Underlined at rest, lightly: a link is known by more than its place. */
  h3 {
    font-size: var(--loam-text-lg);
    margin: 0;

    a {
      color: inherit;
      text-decoration-color: var(--loam-color-line-strong);

      &:focus-visible {
        text-decoration-color: currentcolor;
      }

      @media (hover: hover) {
        &:hover {
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

