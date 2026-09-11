---
title: User button
description: The current account as one control: an avatar, the person's name and their email in a row, the affordance at the foot of a sidebar for switching or opening the account.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# User button

The current account as one control: an avatar, the person's name and their email in a row, the affordance at the foot of a sidebar for switching or opening the account.

An example in **Users**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Button`
- Tags: account, avatar, sidebar, switch account, profile
- Live: https://loamui.com/examples/users/user-button

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A real button, because it acts; its accessible name is its visible text, the name and the email, so nothing is written twice.
- **Modern CSS.** The Button stretches to a one-cell grid rather than being given a width; the email clips with an ellipsis inside a grid cell floored at zero, so a long address never widens the row, and the chevron mirrors under :dir(rtl) because its path is drawn for the inline end.
- **Composition.** Avatar and Button are core's and keep their own dressing; the Button detects the chevron and lays its children out as a row, and the example styles only the text and the chevron it puts inside it.
- **Accessible & gatekept.** The Avatar is hidden so the name is heard once, and the Button brings its own focus ring, pressed state and forced-colours edge, so the account control is reached and seen the way every other button is.

## Example.tsx

```tsx
import { Avatar, Button } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <div className="user-button">
      <Button>
        <Avatar name="Imogen Hartley" src="https://picsum.photos/id/823/96/96" aria-hidden />
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
      </Button>
    </div>
  );
}
```

## example.css

```css
@scope (.user-button) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    inline-size: min(100%, 20rem);
  }
}

@scope (.user-button .loam-Button) to ([class*="loam-"]) {
  span.text {
    display: block grid;
    flex: 1;
    font-weight: 400;
    min-inline-size: 0;
    text-align: start;
    white-space: normal;

    strong {
      color: var(--loam-color-fg-strong);
    }

    > span {
      color: var(--loam-color-fg);
      font-size: var(--loam-text-xs);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  svg {
    color: var(--loam-color-fg);
    flex: none;

    &:dir(rtl) {
      scale: -1 1;
    }
  }
}
```

