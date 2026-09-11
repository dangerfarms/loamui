---
title: Footer with columns
description: A site footer: the brand and a line about it, three columns of links, and a row of small print.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Footer with columns

A site footer: the brand and a line about it, three columns of links, and a row of small print.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: element styles and tokens only
- Tags: site map, legal, small print
- Live: https://loamui.com/examples/navigation/footer-with-columns

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A footer landmark holding four nav landmarks, three named by their headings and the fourth Legal, so a screen reader's landmark list reads Shop, Grow, Co-op, Legal.
- **Modern CSS.** The columns are an auto-fit grid and the brand joins the row only where the footer's own width allows; no breakpoint names a device.
- **Composition.** Element styles alone: links, headings and a small element carry the footer, so no component is imported.
- **Accessible & gatekept.** The markers are stripped inside a nav, where every browser keeps the list's semantics, and the legal links sit in the same row as the copyright they belong to, wrapping beneath it as one list rather than one link at a time.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import "./example.css";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Seeds", href: "/seeds" },
      { label: "Plants", href: "/plants" },
      { label: "Tools", href: "/tools" },
      { label: "Gift vouchers", href: "/vouchers" },
    ],
  },
  {
    title: "Grow",
    links: [
      { label: "Growing guides", href: "/guides" },
      { label: "Sowing calendar", href: "/calendar" },
      { label: "Seed saving", href: "/guides/seed-saving" },
      { label: "Open days", href: "/events" },
    ],
  },
  {
    title: "Co-op",
    links: [
      { label: "Membership", href: "/membership" },
      { label: "Our growers", href: "/growers" },
      { label: "Trade orders", href: "/trade" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Example() {
  const instanceId = useId();
  return (
    <footer className="footer-with-columns">
      <div className="brand">
        <a href="/">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 19c0-7 4-13 14-14-1 10-7 14-14 14z" />
            <path d="M5 19c3-5 6-8 9-10" />
          </svg>
          Hedgerow
        </a>
        <p>
          A garden nursery and seed co-op in the Welsh Marches. Open-pollinated seed, grown on
          member plots and packed by hand.
        </p>
      </div>
      <div className="columns">
        {COLUMNS.map((column) => {
          const id = `${instanceId}-footer-${column.title.toLowerCase()}`;
          return (
            <nav key={column.title} aria-labelledby={id}>
              <h3 id={id}>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          );
        })}
      </div>
      <div className="bottom">
        <small>&copy; 2026 Hedgerow Seed Co-operative Ltd. Registered society 8841.</small>
        <nav aria-label="Legal">
          <ul>
            <li>
              <a href="/privacy">Privacy</a>
            </li>
            <li>
              <a href="/terms">Terms</a>
            </li>
            <li>
              <a href="/accessibility">Accessibility</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
```

## example.css

```css
@scope (.footer-with-columns) to ([class*="loam-"]) {
  :scope {
    border-block-start: 1px solid var(--loam-color-line);
    color: var(--loam-color-fg-muted);
    container-type: inline-size;
    display: block grid;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-xl) var(--loam-space-lg);
    padding-block: var(--loam-space-xl);
  }

  nav a {
    color: inherit;
    text-decoration: none;

    @media (hover: hover) {
      &:hover {
        color: var(--loam-color-fg-strong);
        text-decoration: underline;
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      transition: color var(--loam-duration-sm) var(--loam-ease);
    }
  }

  div.brand {
    align-content: start;
    display: block grid;
    gap: var(--loam-space-sm);

    > a {
      align-items: center;
      color: var(--loam-color-fg-strong);
      display: inline flex;
      font-family: var(--loam-font-display);
      font-size: var(--loam-text-lg);
      font-weight: 700;
      gap: var(--loam-space-xs);
      inline-size: fit-content;
      letter-spacing: -0.02em;
      text-decoration: none;
    }

    svg {
      block-size: 1.25em;
      inline-size: 1.25em;
    }

    p {
      margin: 0;
      max-inline-size: 36ch;
    }
  }

  div.columns {
    display: block grid;
    gap: var(--loam-space-lg);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 9rem), 1fr));
  }

  nav {
    h3 {
      color: var(--loam-color-fg-strong);
      font-family: var(--loam-font);
      font-size: var(--loam-text-sm);
      font-weight: 600;
      letter-spacing: 0;
      margin-block: 0 var(--loam-space-sm);
    }

    ul {
      display: block grid;
      gap: var(--loam-space-xs);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      margin: 0;
    }
  }

  div.bottom {
    align-items: center;
    border-block-start: 1px solid var(--loam-color-line);
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm) var(--loam-space-lg);
    grid-column: 1 / -1;
    justify-content: space-between;
    padding-block-start: var(--loam-space-lg);

    small {
      font-size: inherit;
    }

    ul {
      display: block flex;
      flex-wrap: wrap;
      gap: var(--loam-space-xs) var(--loam-space-md);
    }
  }

  @container (inline-size > 48rem) {
    :scope {
      grid-template-columns: minmax(14rem, 1fr) 2fr;
    }
  }
}
```

