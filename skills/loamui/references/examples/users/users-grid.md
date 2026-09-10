---
title: Users grid
description: The growers as a grid of cards: each with a picture, a name and role, an email, an hourly rate, and a signpost to book a session with them.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Users grid

The growers as a grid of cards: each with a picture, a name and role, an email, an hourly rate, and a signpost to book a session with them.

An example in **Users**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Card`, `Price`, `SignpostLink`
- Tags: team, cards, grid, growers, rate, directory
- Live: https://loamui.com/examples/users/users-grid

## Built to the pillars

- **Native CSS.** A list of articles, each named by its heading, so a screen reader announces four items and can jump between them; the email is a mailto: link and the rate a data element whose machine-readable value is the number.
- **Modern CSS.** The list is a grid of as many 16rem columns as fit, so the cards reflow with no breakpoint, and each card is a two-column grid inside with the facts and the action spanning both.
- **Composition.** Card is rendered as the article through render, so the surface and the semantics are one element; Avatar, Price and SignpostLink come as they are, and the qualifier, an hour, is the Price's own child.
- **Accessible & gatekept.** The Avatar is hidden because the name is printed beside it, the list keeps its semantics with role="list" once the markers go, and booking is a link because it goes to a page, with the arrow that says so drawn by SignpostLink.

## Example.tsx

```tsx
import { Avatar, Card, Price, SignpostLink } from "@loamui/core";
import "./example.css";

const GROWERS = [
  {
    id: "imogen",
    photo: 823,
    name: "Imogen Hartley",
    role: "Steward, Lower Field",
    email: "imogen@hedgerow.example",
    rate: 22,
  },
  {
    id: "bryn",
    photo: 1005,
    name: "Bryn Powell",
    role: "Head grower",
    email: "bryn@hedgerow.example",
    rate: 28,
  },
  {
    id: "sadia",
    photo: 832,
    name: "Sadia Rahman",
    role: "Seed librarian",
    email: "sadia@hedgerow.example",
    rate: 20,
  },
  {
    id: "tomos",
    photo: 669,
    name: "Tomos Ellis",
    role: "Open days coordinator",
    email: "tomos@hedgerow.example",
    rate: 18.5,
  },
];

export default function Example() {
  return (
    <ul className="users-grid" role="list">
      {GROWERS.map((grower) => (
        <li key={grower.id}>
          <Card render={<article aria-labelledby={`users-grid-${grower.id}`} />}>
            <Avatar
              name={grower.name}
              src={`https://picsum.photos/id/${grower.photo}/120/120`}
              aria-hidden
            />
            <div className="text">
              <h2 id={`users-grid-${grower.id}`}>{grower.name}</h2>
              <p className="role">{grower.role}</p>
            </div>
            <dl>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${grower.email}`}>{grower.email}</a>
                </dd>
              </div>
              <div>
                <dt>Rate</dt>
                <dd>
                  <Price value={grower.rate} currency="GBP">
                    an hour
                  </Price>
                </dd>
              </div>
            </dl>
            <SignpostLink href={`/growers/${grower.id}`}>Book a session</SignpostLink>
          </Card>
        </li>
      ))}
    </ul>
  );
}
```

## example.css

```css
@scope (.users-grid) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    gap: var(--loam-space-md);
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: block grid;
    margin: 0;
  }
}

@scope (.users-grid .loam-Card) to ([class*="loam-"]) {
  :scope {
    align-items: center;
    display: block grid;
    gap: var(--loam-space-sm) var(--loam-space-md);
    grid-template-columns: auto minmax(0, 1fr);
  }

  div.text {
    display: block grid;
    gap: calc(var(--loam-space-xs) / 2);
    min-inline-size: 0;
  }

  h2 {
    font-size: var(--loam-text-md);
    margin: 0;
  }

  p.role {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    margin: 0;
  }

  dl {
    display: block grid;
    gap: var(--loam-space-sm);
    grid-column: 1 / -1;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-block: var(--loam-space-xs) 0;
    margin-inline: 0;

    div {
      display: block grid;
      gap: calc(var(--loam-space-xs) / 2);
      min-inline-size: 0;
    }

    dt {
      color: var(--loam-color-fg-muted);
      font-size: var(--loam-text-xs);
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    dd {
      font-size: var(--loam-text-sm);
      margin: 0;
      overflow-wrap: anywhere;
    }
  }
}

/* The link is a loam- root, past the donut: it is placed from its own scope. */
@scope (.users-grid .loam-SignpostLink) to ([class*="loam-"]) {
  :scope {
    grid-column: 1 / -1;
    justify-self: start;
  }
}
```

