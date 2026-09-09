---
title: Side nav with search
description: Vertical navigation with a search box at the top, counts on the links that have something waiting, and the signed-in person at the foot linking to their account.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Side nav with search

Vertical navigation with a search box at the top, counts on the links that have something waiting, and the signed-in person at the foot linking to their account.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Badge`, `Nav`, `Search`
- Tags: sidebar, search, badge, count, account, avatar
- Live: https://loamui.com/examples/navigation/side-nav-with-search

## Built to the pillars

- **Native CSS.** Search renders the search landmark around a real form with one text box, so Enter submits it by the browser's own rule and no button is needed; the account row is a link because it goes somewhere.
- **Modern CSS.** Three grid rows, the middle one 1fr, pin the account to the foot without positioning; inside a link the words grow to fill the line, which is what pushes the count to the end.
- **Composition.** A Badge is an ordinary child of Nav.Link beside the icon and the words; Nav's scope stops at it, so the count keeps Badge's own pill and the example touches neither.
- **Accessible & gatekept.** Each count carries hidden words, so the link is named Orders 12 to pack rather than Orders 12; the search box is named by a label that is read but not seen, and the Avatar is hidden because the name is printed beside it.

## Example.tsx

```tsx
"use client";

import { Avatar, Badge, Nav, Search } from "@loamui/core";
import "./example.css";

const icon = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export default function Example() {
  return (
    <div className="side-nav-with-search">
      <Search.Root action="/nursery/search">
        <Search.Label>Search the nursery</Search.Label>
        <Search.Input placeholder="Orders, growers, varieties" />
      </Search.Root>
      <Nav.Root>
        <Nav.Title>Nursery</Nav.Title>
        <Nav.List>
          <Nav.Item>
            <Nav.Link href="/nursery">
              <svg {...icon}>
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              <span className="label">Overview</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/nursery/orders" current>
              <svg {...icon}>
                <path d="m3 8 9-5 9 5v8l-9 5-9-5z" />
                <path d="m3 8 9 5 9-5M12 13v8" />
              </svg>
              <span className="label">Orders</span>
              <Badge>
                12<span className="loam-VisuallyHidden"> to pack</span>
              </Badge>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/nursery/messages">
              <svg {...icon}>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              <span className="label">Messages</span>
              <Badge>
                3<span className="loam-VisuallyHidden"> unread</span>
              </Badge>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/nursery/stock">
              <svg {...icon}>
                <path d="M12 21v-8" />
                <path d="M12 13c0-4 3-7 8-7-1 5-4 7-8 7z" />
                <path d="M12 13c0-3-2-5-6-5 1 4 3 5 6 5z" />
              </svg>
              <span className="label">Stock</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/nursery/growers">
              <svg {...icon}>
                <circle cx="9" cy="8" r="3.5" />
                <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
                <path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4.5-6.2" />
              </svg>
              <span className="label">Growers</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/nursery/open-days">
              <svg {...icon}>
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
              <span className="label">Open days</span>
            </Nav.Link>
          </Nav.Item>
        </Nav.List>
      </Nav.Root>
      <a className="account" href="/account">
        <Avatar
          name="Imogen Hartley"
          src="https://picsum.photos/seed/hedgerow-imogen/96/96"
          aria-hidden
        />
        <span className="text">
          <strong>Imogen Hartley</strong>
          <span>imogen@hedgerow.example</span>
        </span>
      </a>
    </div>
  );
}
```

## example.css

```css
/* The column: the search in the first row, the Nav stretched through the
   second, and the account link in the third, so it sits at the foot
   however tall the column is. In an app shell the column is as tall as
   the viewport; here it is given a height so the pinning shows. The
   donut leaves the Search, the Nav, the Badges and the Avatar on their
   own styles. */
@scope (.side-nav-with-search) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    gap: var(--loam-space-md);
    grid-template-rows: auto 1fr auto;
    inline-size: min(100%, 18rem);
    min-block-size: 32rem;
  }

  /* The signed-in person, as a link to their account: a row of avatar,
     name and email over a line, with the email clipping rather than
     wrapping the row. */
  a.account {
    align-items: center;
    border-block-start: 1px solid var(--loam-color-line);
    border-radius: var(--loam-radius-md);
    color: var(--loam-color-fg);
    display: block flex;
    gap: var(--loam-space-sm);
    padding-block: var(--loam-space-sm);
    padding-inline: var(--loam-space-sm);
    text-decoration: none;

    @media (hover: hover) {
      &:hover {
        background: var(--loam-color-bg-subtle);
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      transition: background var(--loam-duration-sm) var(--loam-ease);
    }
  }

  span.text {
    display: block grid;
    flex: 1;
    min-inline-size: 0;

    strong {
      color: var(--loam-color-fg-strong);
    }

    > span {
      color: var(--loam-color-fg-muted);
      font-size: var(--loam-text-xs);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

/* Core's Nav, placed from its own scope: the words of each link grow to
   fill the line, which pushes the count Badge after them to the end. */
@scope (.side-nav-with-search .loam-Nav) to ([class*="loam-"]) {
  .link {
    span.label {
      flex: 1;
    }
  }
}
```

