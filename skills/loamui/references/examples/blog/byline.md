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

## Built to the pillars

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
/* One row that wraps: the avatar, the author, the dates and the reading
   time. The donut keeps the Avatar and the Times on their own styles; the
   spans around the Times are what this scope addresses. */
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

  /* The author is the strongest piece. The address element is italic by
     default in every browser; that reads as emphasis here, so it is set
     upright. The link keeps its underline: the profile is the one thing
     to click. */
  address {
    color: var(--loam-color-fg-strong);
    font-style: normal;
    font-weight: 600;

    a {
      color: inherit;
    }
  }

  /* A middle dot before every part that follows the author, and never
     before the author, drawn as generated content with an empty
     alternative so it stays out of the accessibility tree. Generated
     content, not a span, because only the CSS knows which part is first. */
  address ~ span::before {
    content: "·" / "";
    margin-inline-end: var(--loam-space-sm);
    user-select: none;
  }
}
```

