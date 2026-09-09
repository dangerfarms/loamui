---
title: Article cards grid
description: Three article cards in a list: one column when narrow, two when wide, with the first card taking the whole row as the lead.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Article cards grid

Three article cards in a list: one column when narrow, two when wide, with the first card taking the whole row as the lead.

An example in **Blog**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Badge`, `Card`, `Time`
- Tags: index, listing, featured, blog grid
- Live: https://loamui.com/examples/blog/article-cards-grid

## Built to the pillars

- **Native CSS.** A ul of articles, each a Card rendered as an article named by its heading; the list says role="list" because stripping its markers drops the role in some browsers.
- **Modern CSS.** The list is the grid and every item is a container, so the lead card lays its picture beside the text as soon as it is wide enough, decided by the item's width rather than a breakpoint.
- **Composition.** The grid is the example's own three lines of CSS: no layout component, and the card inside is exactly the single Article Card example.
- **Accessible & gatekept.** A screen reader's list of articles reads the three titles, each link's name is its title alone, and the pictures illustrate titles already read, so their alt is empty.

## Example.tsx

```tsx
import { Avatar, Badge, Card, Time } from "@loamui/core";
import "./example.css";

const ARTICLES = [
  {
    slug: "planting-a-native-hedge",
    title: "Planting a mixed native hedge",
    category: "Planting",
    date: "2026-09-06",
    description:
      "Hawthorn, blackthorn, hazel and dog rose as bare-root whips from November: how many to the metre, why a double staggered row, and the cutting back that makes it thick in the first two winters.",
    author: { name: "Dafydd Rees", slug: "dafydd-rees" },
    image: "hedgerow-native-hedge",
  },
  {
    slug: "tomato-seed-from-one-fruit",
    title: "Saving tomato seed from a single fruit",
    category: "Seed saving",
    date: "2026-08-14",
    description:
      "Ferment the pulp for three days, rinse, dry on a plate and you have enough seed for a decade.",
    author: { name: "Tom Okafor", slug: "tom-okafor" },
    image: "hedgerow-tomato",
  },
  {
    slug: "september-plant-sale",
    title: "Open day: the September plant sale",
    category: "Co-op news",
    date: "2026-08-30",
    description:
      "Member-grown perennials, bare-root fruit and the last of the summer seed, on the nursery bench from nine.",
    author: { name: "Rhiannon Vaughan", slug: "rhiannon-vaughan" },
    image: "hedgerow-plant-sale",
  },
];

export default function Example() {
  return (
    <ul className="article-cards-grid" role="list">
      {ARTICLES.map((article) => (
        <li key={article.slug}>
          <Card
            render={
              <article className="article" aria-labelledby={`article-${article.slug}-title`} />
            }
          >
            <img
              className="media"
              src={`https://picsum.photos/seed/${article.image}/800/450`}
              alt=""
              width="800"
              height="450"
            />
            <p className="meta">
              <Badge>{article.category}</Badge>
              <Time value={article.date} locale="en-GB" dateStyle="long" />
            </p>
            <h3 id={`article-${article.slug}-title`}>
              <a href={`/guides/${article.slug}`}>{article.title}</a>
            </h3>
            <p className="description">{article.description}</p>
            <div className="foot">
              <Avatar name={article.author.name} aria-hidden />
              <address>
                <a href={`/growers/${article.author.slug}`} rel="author">
                  {article.author.name}
                </a>
              </address>
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
/* The list is the grid and each item is a container: a card cannot
   answer its own container query, so it asks the item around it. The
   markers go; the markup keeps the list's role with role="list", since
   list-style: none drops it in some browsers. */
@scope (.article-cards-grid) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-md);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    container-type: inline-size;
    margin: 0;
  }

  /* Wide: two columns, and the first card takes both, so it is the one
     that reads as the lead. */
  @container (inline-size >= 40rem) {
    :scope {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    li:first-child {
      grid-column: 1 / -1;
    }
  }
}

/* Each card is a Card rendered as the article, so the Card element is
   this scope's root: the column inside is reachable, the Badge, Time and
   Avatar are fenced by the donut, and the Card's own surface, line,
   radius and padding are left alone. */
@scope (.article-cards-grid article.article) to ([class*="loam-"]) {
  :scope {
    /* A percentage, so it resolves against the item the grid stretched:
       every card in a row is the row's height. */
    block-size: 100%;
    display: block flex;
    flex-direction: column;
    gap: var(--loam-space-sm);
  }

  img.media {
    aspect-ratio: 16 / 9;
    block-size: auto;
    border-radius: var(--loam-radius-md);
    inline-size: 100%;
    object-fit: cover;
  }

  p.meta {
    align-items: center;
    color: var(--loam-color-fg-muted);
    display: block flex;
    flex-wrap: wrap;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-sm);
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

  p.description {
    color: var(--loam-color-fg-muted);
    margin: 0;

    @supports (line-clamp: 3) {
      line-clamp: 3;
    }
  }

  div.foot {
    --loam-avatar-size: 2rem;

    align-items: center;
    display: block flex;
    gap: var(--loam-space-sm);
    margin-block-start: auto;
    padding-block-start: var(--loam-space-sm);
  }

  address {
    font-size: var(--loam-text-sm);
    font-style: normal;
    font-weight: 600;

    a {
      color: var(--loam-color-fg-strong);
    }
  }

  /* A card wide enough (the lead, once it spans the row) lays its picture
     beside the text: the image takes a column down every row, the rest
     flow into the second, and the foot keeps the last row. The query is
     answered by the item, not the card. */
  @container (inline-size >= 36rem) {
    :scope {
      column-gap: var(--loam-space-lg);
      display: block grid;
      grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
      grid-template-rows: auto auto 1fr auto;
    }

    img.media {
      aspect-ratio: auto;
      block-size: 100%;
      grid-row: 1 / -1;
      min-block-size: 0;
    }
  }
}
```

