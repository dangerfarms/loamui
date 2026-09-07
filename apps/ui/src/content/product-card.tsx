"use client";

import { Badge, Button, Price, Rating } from "@loamui/core";
import { ProductCard } from "@loamui/ui";
import type { Composition } from "./types";

const productCard: Composition = {
  slug: "product-card",
  name: "Product card",
  category: "Data display",
  description:
    "One product in a listing: an image, a linked title, a rating, a price and one action, in an article inside a core Card.",
  lead: "Eight parts in an article inside a core Card, the article named by the title so a list of the page's articles is a list of products. The name holds the link and the card does not, so the button beneath keeps its own name; the rating is core's Rating in display mode, whose accessible name is the score; a reduction is a Was before the price, the old figure struck through with Was and Now read out around the pair, never a colour alone, and the same part works in a CartLine; the image describes the product, because a picture of a product says what the name does not; and every word the card says on its own, the review word, Was, Now, comes from labels.",
  importLine: `import { ProductCard } from "@loamui/ui";\nimport { Badge, Button, Price, Rating } from "@loamui/core";`,
  parts: [
    {
      name: "ProductCard.Root",
      description:
        "The unit: a core Card, left as core styles it, holding an article with the parts in a column. The article's aria-labelledby points at the Title from the first render, so the server HTML carries the name (your own aria-label or aria-labelledby wins). className, style and ref land on the Card. labels holds the card's words: reviews, a function of the count, was and now.",
    },
    {
      name: "ProductCard.Media",
      description:
        "The product's picture: your img, cropped square to fill the card's width. Write an alt that says what the picture shows (colour, shape, finish). An article's picture is decoration and the name says it all; a product's picture is information, so it is described.",
    },
    {
      name: "ProductCard.Meta",
      description:
        "A small row for a Badge: a stock or offer note. Colour it by wrapping the Badge in a --loam-context region of your own.",
    },
    {
      name: "ProductCard.Title",
      description:
        "The product's name around your link. An h3 by default; pass render={<h2 />} where the card is the page's own list. The name is the link; the card is not. Its id, yours or the composition's, is what names the article.",
    },
    {
      name: "ProductCard.Rating",
      description:
        "Your display-mode core Rating, whose accessible name carries the score (4.5 out of 5), with the review count as text beside it: (128) on screen, (128 reviews) to assistive tech. The word is labels.reviews(count), so it pluralises and translates.",
    },
    {
      name: "ProductCard.Value",
      description:
        "The price, large and bold: a core Price as its children, after a ProductCard.Was when there is one.",
    },
    {
      name: "ProductCard.Was",
      description:
        "The price before a reduction: a core Price struck through, placed before the current one in Value. It writes labels.was before itself and labels.now after, both hidden, so the change is announced (Was £45 Now £36) and never carried by the strike alone. The judgment is the part's, so the same markup works in a CartLine.Value, where it reads its words from its own labels.",
    },
    {
      name: "ProductCard.Actions",
      description:
        "The one action, at the foot of the card and stretched to its width. Name the product inside the Button in a span with core's loam-VisuallyHidden class, so a listing of Add to basket buttons tells them apart.",
    },
  ],
  demos: [
    {
      title: "One product",
      description:
        "A card needs no grid: a single product beside a basket, or one recommendation at the foot of a page. The name is the link; the button says which product it adds.",
      code: `<ProductCard.Root>
  <ProductCard.Media>
    <img src="https://picsum.photos/seed/linen/600/600" alt="Linen shirt in sand, collar open" />
  </ProductCard.Media>
  <ProductCard.Title>
    <a href="/shop/linen-shirt">Linen shirt</a>
  </ProductCard.Title>
  <ProductCard.Rating count={128}>
    <Rating readOnly label="Average rating" value={4.5} />
  </ProductCard.Rating>
  <ProductCard.Value>
    <Price value={45} currency="GBP" />
  </ProductCard.Value>
  <ProductCard.Actions>
    <Button>
      Add to basket<span className="loam-VisuallyHidden"> Linen shirt</span>
    </Button>
  </ProductCard.Actions>
</ProductCard.Root>`,
      render: () => (
        <ProductCard.Root>
          <ProductCard.Media>
            <img
              src="https://picsum.photos/seed/linen/600/600"
              alt="Linen shirt in sand, collar open"
            />
          </ProductCard.Media>
          <ProductCard.Title>
            <a href="/shop/linen-shirt">Linen shirt</a>
          </ProductCard.Title>
          <ProductCard.Rating count={128}>
            <Rating readOnly label="Average rating" value={4.5} />
          </ProductCard.Rating>
          <ProductCard.Value>
            <Price value={45} currency="GBP" />
          </ProductCard.Value>
          <ProductCard.Actions>
            <Button>
              Add to basket<span className="loam-VisuallyHidden"> Linen shirt</span>
            </Button>
          </ProductCard.Actions>
        </ProductCard.Root>
      ),
    },
    {
      title: "On sale",
      description:
        "The old price goes in a ProductCard.Was before the current one: struck through, with Was and Now read out around the pair so the reduction is announced, not left to the strike. The offer is a Badge in a success region you place in Meta.",
      code: `<ProductCard.Root>
  <ProductCard.Media>
    <img src="https://picsum.photos/seed/boots/600/600" alt="Leather boots in dark brown, laced" />
  </ProductCard.Media>
  <ProductCard.Meta>
    <span style={{ "--loam-context": "success" }}>
      <Badge>20% off</Badge>
    </span>
  </ProductCard.Meta>
  <ProductCard.Title>
    <a href="/shop/leather-boots">Leather boots</a>
  </ProductCard.Title>
  <ProductCard.Rating count={64}>
    <Rating readOnly label="Average rating" value={4} />
  </ProductCard.Rating>
  <ProductCard.Value>
    <ProductCard.Was>
      <Price value={150} currency="GBP" />
    </ProductCard.Was>
    <Price value={120} currency="GBP" />
  </ProductCard.Value>
  <ProductCard.Actions>
    <Button>
      Add to basket<span className="loam-VisuallyHidden"> Leather boots</span>
    </Button>
  </ProductCard.Actions>
</ProductCard.Root>`,
      render: () => (
        <ProductCard.Root>
          <ProductCard.Media>
            <img
              src="https://picsum.photos/seed/boots/600/600"
              alt="Leather boots in dark brown, laced"
            />
          </ProductCard.Media>
          <ProductCard.Meta>
            <span style={{ "--loam-context": "success" } as React.CSSProperties}>
              <Badge>20% off</Badge>
            </span>
          </ProductCard.Meta>
          <ProductCard.Title>
            <a href="/shop/leather-boots">Leather boots</a>
          </ProductCard.Title>
          <ProductCard.Rating count={64}>
            <Rating readOnly label="Average rating" value={4} />
          </ProductCard.Rating>
          <ProductCard.Value>
            <ProductCard.Was>
              <Price value={150} currency="GBP" />
            </ProductCard.Was>
            <Price value={120} currency="GBP" />
          </ProductCard.Value>
          <ProductCard.Actions>
            <Button>
              Add to basket<span className="loam-VisuallyHidden"> Leather boots</span>
            </Button>
          </ProductCard.Actions>
        </ProductCard.Root>
      ),
    },
    {
      title: "A listing",
      description:
        "Three cards in a list. The grid is yours: a ul with repeat(auto-fit, minmax(min(14rem, 100%), 1fr)), each li a grid so its Card stretches to the row and every button lands at the same foot. Each name is a link and each button names its product.",
      code: `<section aria-labelledby="shop">
  <h2 id="shop">New in</h2>
  <ul style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(min(14rem, 100%), 1fr))", listStyle: "none", margin: 0, padding: 0 }}>
    <li style={{ display: "grid" }}>
      <ProductCard.Root>
        <ProductCard.Media>
          <img src="https://picsum.photos/seed/linen/600/600" alt="Linen shirt in sand, collar open" />
        </ProductCard.Media>
        <ProductCard.Title>
          <a href="/shop/linen-shirt">Linen shirt</a>
        </ProductCard.Title>
        <ProductCard.Rating count={128}>
          <Rating readOnly label="Average rating" value={4.5} />
        </ProductCard.Rating>
        <ProductCard.Value>
          <Price value={45} currency="GBP" />
        </ProductCard.Value>
        <ProductCard.Actions>
          <Button>
            Add to basket<span className="loam-VisuallyHidden"> Linen shirt</span>
          </Button>
        </ProductCard.Actions>
      </ProductCard.Root>
    </li>
    <li style={{ display: "grid" }}>
      <ProductCard.Root>
        <ProductCard.Media>
          <img src="https://picsum.photos/seed/boots/600/600" alt="Leather boots in dark brown, laced" />
        </ProductCard.Media>
        <ProductCard.Meta>
          <span style={{ "--loam-context": "success" }}>
            <Badge>20% off</Badge>
          </span>
        </ProductCard.Meta>
        <ProductCard.Title>
          <a href="/shop/leather-boots">Leather boots</a>
        </ProductCard.Title>
        <ProductCard.Rating count={64}>
          <Rating readOnly label="Average rating" value={4} />
        </ProductCard.Rating>
        <ProductCard.Value>
          <ProductCard.Was>
            <Price value={150} currency="GBP" />
          </ProductCard.Was>
          <Price value={120} currency="GBP" />
        </ProductCard.Value>
        <ProductCard.Actions>
          <Button>
            Add to basket<span className="loam-VisuallyHidden"> Leather boots</span>
          </Button>
        </ProductCard.Actions>
      </ProductCard.Root>
    </li>
    <li style={{ display: "grid" }}>
      <ProductCard.Root>
        <ProductCard.Media>
          <img src="https://picsum.photos/seed/scarf/600/600" alt="Wool scarf in forest green, folded" />
        </ProductCard.Media>
        <ProductCard.Meta>
          <span style={{ "--loam-context": "warning" }}>
            <Badge>Only 3 left</Badge>
          </span>
        </ProductCard.Meta>
        <ProductCard.Title>
          <a href="/shop/wool-scarf">Wool scarf</a>
        </ProductCard.Title>
        <ProductCard.Rating count={9}>
          <Rating readOnly label="Average rating" value={5} />
        </ProductCard.Rating>
        <ProductCard.Value>
          <Price value={32.5} currency="GBP" />
        </ProductCard.Value>
        <ProductCard.Actions>
          <Button>
            Add to basket<span className="loam-VisuallyHidden"> Wool scarf</span>
          </Button>
        </ProductCard.Actions>
      </ProductCard.Root>
    </li>
  </ul>
</section>`,
      render: () => (
        <section aria-labelledby="shop">
          <h2 id="shop">New in</h2>
          <ul
            style={{
              display: "grid",
              gap: "1.5rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(14rem, 100%), 1fr))",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <li style={{ display: "grid" }}>
              <ProductCard.Root>
                <ProductCard.Media>
                  <img
                    src="https://picsum.photos/seed/linen/600/600"
                    alt="Linen shirt in sand, collar open"
                  />
                </ProductCard.Media>
                <ProductCard.Title>
                  <a href="/shop/linen-shirt">Linen shirt</a>
                </ProductCard.Title>
                <ProductCard.Rating count={128}>
                  <Rating readOnly label="Average rating" value={4.5} />
                </ProductCard.Rating>
                <ProductCard.Value>
                  <Price value={45} currency="GBP" />
                </ProductCard.Value>
                <ProductCard.Actions>
                  <Button>
                    Add to basket<span className="loam-VisuallyHidden"> Linen shirt</span>
                  </Button>
                </ProductCard.Actions>
              </ProductCard.Root>
            </li>
            <li style={{ display: "grid" }}>
              <ProductCard.Root>
                <ProductCard.Media>
                  <img
                    src="https://picsum.photos/seed/boots/600/600"
                    alt="Leather boots in dark brown, laced"
                  />
                </ProductCard.Media>
                <ProductCard.Meta>
                  <span style={{ "--loam-context": "success" } as React.CSSProperties}>
                    <Badge>20% off</Badge>
                  </span>
                </ProductCard.Meta>
                <ProductCard.Title>
                  <a href="/shop/leather-boots">Leather boots</a>
                </ProductCard.Title>
                <ProductCard.Rating count={64}>
                  <Rating readOnly label="Average rating" value={4} />
                </ProductCard.Rating>
                <ProductCard.Value>
                  <ProductCard.Was>
                    <Price value={150} currency="GBP" />
                  </ProductCard.Was>
                  <Price value={120} currency="GBP" />
                </ProductCard.Value>
                <ProductCard.Actions>
                  <Button>
                    Add to basket<span className="loam-VisuallyHidden"> Leather boots</span>
                  </Button>
                </ProductCard.Actions>
              </ProductCard.Root>
            </li>
            <li style={{ display: "grid" }}>
              <ProductCard.Root>
                <ProductCard.Media>
                  <img
                    src="https://picsum.photos/seed/scarf/600/600"
                    alt="Wool scarf in forest green, folded"
                  />
                </ProductCard.Media>
                <ProductCard.Meta>
                  <span style={{ "--loam-context": "warning" } as React.CSSProperties}>
                    <Badge>Only 3 left</Badge>
                  </span>
                </ProductCard.Meta>
                <ProductCard.Title>
                  <a href="/shop/wool-scarf">Wool scarf</a>
                </ProductCard.Title>
                <ProductCard.Rating count={9}>
                  <Rating readOnly label="Average rating" value={5} />
                </ProductCard.Rating>
                <ProductCard.Value>
                  <Price value={32.5} currency="GBP" />
                </ProductCard.Value>
                <ProductCard.Actions>
                  <Button>
                    Add to basket<span className="loam-VisuallyHidden"> Wool scarf</span>
                  </Button>
                </ProductCard.Actions>
              </ProductCard.Root>
            </li>
          </ul>
        </section>
      ),
    },
  ],
  whenToUse: [
    "A category page or search results where shoppers compare several products by picture, price and rating before opening one.",
    "A short row of recommendations beside a basket or at the foot of a product page, where three cards invite one more addition without a second page.",
  ],
  whenNotToUse: [
    "The product's own page: one product among no others has nothing to be compared with, and a page carries a gallery, a description and options that a card is built to leave out.",
    "An article, a post or a case study: the picture there is decoration and the reader wants a category, a date and an excerpt, which is ArticleCard.",
  ],
};

export default productCard;
