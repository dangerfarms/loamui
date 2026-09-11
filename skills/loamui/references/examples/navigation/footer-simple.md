---
title: Simple footer
description: A one-row site footer: the brand, a short row of links and the copyright line.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Simple footer

A one-row site footer: the brand, a short row of links and the copyright line.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: element styles and tokens only
- Tags: site footer, copyright, small print
- Live: https://loamui.com/examples/navigation/footer-simple

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A footer landmark, so a screen reader can jump to the end of the page; the nav inside is named Footer to tell it from the header's Primary nav, and the copyright is a small element.
- **Modern CSS.** A single wrapping flex row, answered by the footer's own width: the links sit between the brand and the small print, and wrap beneath them where the row is too short.
- **Composition.** Nothing is imported: a brand link, four links in a list and the small print on one flex row is the whole footer, dressed by the element styles.
- **Accessible & gatekept.** Four targets on one line are told apart by the gap between them and underline on hover; the markers are stripped inside a nav, where every browser keeps the list's semantics.

## Example.tsx

```tsx
import "./example.css";

export default function Example() {
  return (
    <footer className="footer-simple">
      <a className="brand" href="/">
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
      <nav aria-label="Footer">
        <ul>
          <li>
            <a href="/about">About the co-op</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/privacy">Privacy</a>
          </li>
          <li>
            <a href="/accessibility">Accessibility</a>
          </li>
        </ul>
      </nav>
      <small>&copy; 2026 Hedgerow Seed Co-operative Ltd.</small>
    </footer>
  );
}
```

## example.css

```css
@scope (.footer-simple) to ([class*="loam-"]) {
  :scope {
    align-items: center;
    border-block-start: 1px solid var(--loam-color-line);
    color: var(--loam-color-fg-muted);
    container-type: inline-size;
    display: block flex;
    flex-wrap: wrap;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-sm) var(--loam-space-lg);
    padding-block: var(--loam-space-lg);
  }

  a.brand {
    align-items: center;
    color: var(--loam-color-fg-strong);
    display: inline flex;
    font-family: var(--loam-font-display);
    font-size: var(--loam-text-lg);
    font-weight: 700;
    gap: var(--loam-space-xs);
    letter-spacing: -0.02em;
    text-decoration: none;

    svg {
      block-size: 1.25em;
      inline-size: 1.25em;
    }
  }

  nav {
    margin-inline: auto;

    ul {
      display: block flex;
      flex-wrap: wrap;
      gap: var(--loam-space-xs) var(--loam-space-md);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      margin: 0;
    }

    a {
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
  }

  small {
    font-size: inherit;
  }
}
```

