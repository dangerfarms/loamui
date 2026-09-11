---
title: User info with icons
description: One person at a glance: their picture beside their role and name, and beneath them an email and a phone number, each a real link with an icon before it.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# User info with icons

One person at a glance: their picture beside their role and name, and beneath them an email and a phone number, each a real link with an icon before it.

An example in **Users**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`
- Tags: profile, contact, email, phone, avatar
- Live: https://loamui.com/examples/users/user-info-with-icons

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The email is a mailto: link and the phone a tel: link, so a tap opens the mail app or the dialler; the two are a description list whose terms, Email and Phone, are read but not seen.
- **Modern CSS.** The role is written after the name, so a heading comes first, and moved above it by order in the grid; a long address wraps anywhere inside a cell floored at zero rather than widening the column.
- **Composition.** Avatar is the one component, sized through its public --loam-avatar-size set on the row; the rest is a heading, a paragraph and a description list.
- **Accessible & gatekept.** The Avatar is hidden because the name is printed beside it, each icon is aria-hidden and the term before it says what the row is, so a screen reader hears Email, then the address, and the links keep the page's link colour so they are known as links.

## Example.tsx

```tsx
import { Avatar } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <div className="user-info-with-icons">
      <Avatar name="Bryn Powell" src="https://picsum.photos/id/1005/200/200" aria-hidden />
      <div className="text">
        <h2>Bryn Powell</h2>
        <p className="role">Head grower</p>
        <dl>
          <div>
            <dt className="loam-VisuallyHidden">Email</dt>
            <dd>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              <a href="mailto:bryn@hedgerow.example">bryn@hedgerow.example</a>
            </dd>
          </div>
          <div>
            <dt className="loam-VisuallyHidden">Phone</dt>
            <dd>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
              </svg>
              <a href="tel:+441584870123">01584 870123</a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
```

## example.css

```css
@scope (.user-info-with-icons) to ([class*="loam-"]) {
  :scope {
    --loam-avatar-size: 5.5rem;

    align-items: start;
    display: block flex;
    gap: var(--loam-space-md);
  }

  div.text {
    display: block grid;
    gap: var(--loam-space-xs);
    min-inline-size: 0;
  }

  h2 {
    font-size: var(--loam-text-xl);
    margin: 0;
  }

  p.role {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-xs);
    font-weight: 600;
    letter-spacing: 0.08em;
    margin: 0;
    order: -1;
    text-transform: uppercase;
  }

  dl {
    display: block grid;
    gap: var(--loam-space-xs);
    margin-block: var(--loam-space-sm) 0;
    margin-inline: 0;

    dd {
      align-items: center;
      display: block flex;
      font-size: var(--loam-text-sm);
      gap: var(--loam-space-xs);
      margin: 0;
      min-inline-size: 0;
    }

    svg {
      block-size: 1.125em;
      color: var(--loam-color-fg-muted);
      flex: none;
      inline-size: 1.125em;
    }

    a {
      overflow-wrap: anywhere;
    }
  }
}
```

