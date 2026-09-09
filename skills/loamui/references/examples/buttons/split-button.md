---
title: Split button
description: Add to basket with a chevron beside it that opens the other ways to add: one group with a shared edge, every choice a real submit of the same form.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Split button

Add to basket with a chevron beside it that opens the other ways to add: one group with a shared edge, every choice a real submit of the same form.

An example in **Buttons**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`, `Menu`
- Tags: split button, menu, basket, actions, group, dropdown
- Live: https://loamui.com/examples/buttons/split-button

## Built to the pillars

- **Native CSS.** One form: the main button submits it, and each menu item is a submit button with its own name and value, so the server learns which way was chosen and nothing needs JavaScript to post. The menu is a native popover with light dismiss and Escape.
- **Modern CSS.** The shared edge is --loam-button-radius, the public hook Button reads, set on the group for the trigger and on the main cell for its button; :dir(rtl) swaps the two values because border-radius is physical, and a one-pixel negative margin lays the two borders on one line.
- **Composition.** Button and Menu.Root, Trigger, Popup and Item as core ships them; the items substitute submit buttons through render, and the primary look comes from the form being a primary region, not from a prop on either button.
- **Accessible & gatekept.** The main button is named for its action and the trigger for its purpose, More ways to add, by hidden words beside the chevron, with aria-haspopup so the menu is expected; the arrows open and move through the items, and choosing one submits. The two are separate tab stops, so a keyboard user can take the main action without opening the menu.

## Example.tsx

```tsx
"use client";

import { Button, Menu } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <form className="split-button" action="/basket" method="post">
      <input type="hidden" name="product" value="beetroot-boltardy" />
      <span className="main">
        <Button type="submit">Add to basket</Button>
      </span>
      <Menu.Root>
        <Menu.Trigger>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
          <span className="loam-VisuallyHidden">More ways to add</span>
        </Menu.Trigger>
        <Menu.Popup>
          <Menu.Item render={<button type="submit" name="then" value="basket" />}>
            Add and go to basket
          </Menu.Item>
          <Menu.Item render={<button type="submit" name="then" value="later" />}>
            Save for later
          </Menu.Item>
          <Menu.Item render={<button type="submit" name="then" value="wish-list" />}>
            Add to a wish list
          </Menu.Item>
        </Menu.Popup>
      </Menu.Root>
    </form>
  );
}
```

## example.css

```css
/* The form is the root and the group: a primary region, so both Buttons
   answer the same colour, and a two-cell grid so they sit level. The
   shared edge is the one public hook Button keeps, --loam-button-radius,
   inherited by each half: the main button squares its end corners and
   the menu's trigger squares its start ones. border-radius is physical,
   so the halves swap under :dir(rtl). The main cell pulls back one pixel
   so the two borders share a line. The Buttons, the Menu and its popup
   are core parts past the donut. */
@scope (.split-button) to ([class*="loam-"]) {
  :scope {
    --loam-context: primary;
    --loam-button-radius: 0 var(--loam-radius-md) var(--loam-radius-md) 0;

    display: inline grid;
    grid-auto-flow: column;
    margin: 0;

    &:dir(rtl) {
      --loam-button-radius: var(--loam-radius-md) 0 0 var(--loam-radius-md);
    }
  }

  span.main {
    --loam-button-radius: var(--loam-radius-md) 0 0 var(--loam-radius-md);

    display: block grid;
    margin-inline-end: -1px;

    :scope:dir(rtl) & {
      --loam-button-radius: 0 var(--loam-radius-md) var(--loam-radius-md) 0;
    }
  }
}
```

