---
title: User button
description: The current account as one control: an avatar, the person's name and their email in a row, the affordance at the foot of a sidebar for switching or opening the account.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# User button

The current account as one control: an avatar, the person's name and their email in a row, the affordance at the foot of a sidebar for switching or opening the account.

An example in **Users**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`
- Tags: account, avatar, sidebar, switch account, profile
- Live: https://loamui.com/examples/users/user-button

## Built to the pillars

- **Native CSS.** A real button, because it acts; its accessible name is its visible text, the name and the email, so nothing is written twice.
- **Modern CSS.** The email clips with an ellipsis inside a grid cell floored at zero, so a long address never widens the row, and the chevron mirrors under :dir(rtl) because its path is drawn for the inline end.
- **Composition.** Avatar is the one component; the rest is a button, a strong and a span, with the elements layer's button dressing set aside for the shape an account row has.
- **Accessible & gatekept.** The Avatar is hidden so the name is heard once, the border is kept transparent so forced colours draw an edge, and the hover surface carries no state that would need a treatment there.

## Example.tsx

```tsx
import { Avatar } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <button type="button" className="user-button">
      <Avatar
        name="Imogen Hartley"
        src="https://picsum.photos/seed/hedgerow-imogen/96/96"
        aria-hidden
      />
      <span className="text">
        <strong>Imogen Hartley</strong>
        <span>imogen@hedgerow.example</span>
      </span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m9 6 6 6-6 6" />
      </svg>
    </button>
  );
}
```

## example.css

```css
/* The current account as one control: a bare button, not a Button. The
   elements layer dresses every button as a Button, a centred pill in
   heavy type; an account row is a start-aligned line of ordinary text,
   so the pill's paint goes and the row's own shape takes its place. The
   border stays, transparent, so forced colours keep an edge; the hover
   surface carries no state, so it needs no treatment there. */
@scope (.user-button) to ([class*="loam-"]) {
  :scope {
    align-items: center;
    background: none;
    border: 1px solid transparent;
    border-radius: var(--loam-radius-md);
    box-shadow: none;
    color: var(--loam-color-fg);
    display: block flex;
    font-weight: 400;
    gap: var(--loam-space-sm);
    inline-size: min(100%, 20rem);
    padding: var(--loam-space-sm);
    text-align: start;
    white-space: normal;

    @media (hover: hover) {
      &:hover {
        background: var(--loam-color-bg-subtle);
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      transition: background var(--loam-duration-sm) var(--loam-ease);
    }
  }

  /* The name over the email; the email is the line that tells two
     accounts apart, and it clips with an ellipsis rather than wrapping
     the row. */
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

  /* The chevron says the row opens something; it turns with the writing
     direction because the path is drawn for the inline end. */
  svg {
    block-size: 1em;
    color: var(--loam-color-fg-muted);
    flex: none;
    inline-size: 1em;

    &:dir(rtl) {
      scale: -1 1;
    }
  }
}
```

