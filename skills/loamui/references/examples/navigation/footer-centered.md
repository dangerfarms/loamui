---
title: Centred footer
description: A site footer on the centre line: the brand, a row of links beneath it, and the small print last.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Centred footer

A site footer on the centre line: the brand, a row of links beneath it, and the small print last.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: element styles and tokens only
- Tags: site footer, centred, copyright, small print
- Live: https://loamui.com/examples/navigation/footer-centered

## Built to the pillars

- **Native CSS.** A footer landmark holding one nav landmark named Footer, so a landmark list tells it apart from the header's Primary nav; the copyright and registration are a small element, which is what small is for.
- **Modern CSS.** A grid with its items centred and a flex row that wraps from the middle out, so a long list of links folds into even lines on a narrow screen without a breakpoint.
- **Composition.** Element styles alone carry it: a link, a list and a small element need no component, so nothing is imported.
- **Accessible & gatekept.** The markers are stripped inside a nav, where every browser keeps the list's semantics, and the links inherit the muted colour rather than the link blue so the row reads as one line, underlining on hover.

## Example.tsx

```tsx
import "./example.css";

export default function Example() {
  return (
    <footer className="footer-centered">
      <a className="brand" href="/">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
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
            <a href="/seeds">Seeds</a>
          </li>
          <li>
            <a href="/plants">Plants</a>
          </li>
          <li>
            <a href="/guides">Growing guides</a>
          </li>
          <li>
            <a href="/events">Open days</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
      <small>&copy; 2026 Hedgerow Seed Co-operative Ltd. A registered society, number 8831R.</small>
    </footer>
  );
}
```

## example.css

```css
/* One column, everything on the centre line: the brand, then the links
   in a row that wraps around the middle, then the small print. Set in
   the muted colour because a footer is reference, not the page's voice. */
@scope (.footer-centered) to ([class*="loam-"]) {
  :scope {
    border-block-start: 1px solid var(--loam-color-line);
    color: var(--loam-color-fg-muted);
    display: block grid;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-md);
    justify-items: center;
    padding-block: var(--loam-space-xl);
    text-align: center;
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

  /* The markers go; inside a nav every browser keeps the list's
     semantics without them. The row wraps from the middle out. */
  nav {
    ul {
      display: block flex;
      flex-wrap: wrap;
      gap: var(--loam-space-xs) var(--loam-space-md);
      justify-content: center;
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
    max-inline-size: var(--loam-measure);
  }
}
```

