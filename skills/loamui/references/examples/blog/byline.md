---
title: Byline
description: Who wrote an article and when: an avatar, the author linked to their profile, the published and updated dates and the reading time, on one line.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Byline

Who wrote an article and when: an avatar, the author linked to their profile, the published and updated dates and the reading time, on one line.

An example in **Blog**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Time`
- Tags: author, date, reading time, meta
- Live: https://loamui.com/examples/blog/byline

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The author's name sits in an address element, which HTML reserves for the contact information of an article's author, around a link with rel="author"; the dates are time elements.
- **Modern CSS.** The dots between the parts are generated content drawn before every span that follows the address, so the parts can be reordered or dropped and the dots still fall only between them.
- **Composition.** Avatar and Time are used as they come; the row sets the small muted type and the Times take it, as a Time takes the type of whatever it sits in.
- **Accessible & gatekept.** The avatar is hidden because the name is printed beside it, the dots have an empty alternative so they are never read, and the second date says Updated in text rather than a tooltip, so a listener learns which date is which.

## Example.tsx

```tsx
import { Avatar, Time } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <div className="byline">
      <Avatar name="Nia Prosser" aria-hidden />
      <address>
        <a href="/growers/nia-prosser" rel="author">
          Nia Prosser
        </a>
      </address>
      <span>
        <Time value="2026-08-28" locale="en-GB" dateStyle="long" />
      </span>
      <span>
        Updated <Time value="2026-09-04" locale="en-GB" dateStyle="long" />
      </span>
      <span>6 min read</span>
    </div>
  );
}
```

## example.css

```css
@scope (.byline) to ([class*="loam-"]) {
  :scope {
    --loam-avatar-size: 2rem;

    align-items: center;
    color: var(--loam-color-fg-muted);
    display: block flex;
    flex-wrap: wrap;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-xs) var(--loam-space-sm);
  }

  address {
    color: var(--loam-color-fg-strong);
    font-style: normal;
    font-weight: 600;

    a {
      color: inherit;
    }
  }

  /* The empty alternative keeps the dot out of the accessibility tree. */
  address ~ span::before {
    content: "·" / "";
    margin-inline-end: var(--loam-space-sm);
    user-select: none;
  }
}
```

