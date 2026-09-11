---
title: Button with menu
description: A Create new button that opens a menu of the things a member can add, each with an icon and each a link to the page that makes it.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Button with menu

A Create new button that opens a menu of the things a member can add, each with an icon and each a link to the page that makes it.

An example in **Buttons**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Menu`
- Tags: menu, dropdown, create, button, actions, icons
- Live: https://loamui.com/examples/buttons/button-with-menu

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The items are links, because each creates something on its own page; the popup is a native popover in the top layer with light dismiss and Escape, anchored to the button where the browser has anchor positioning.
- **Modern CSS.** One declaration: the Menu is a primary region, so the button's colour is answered by context and no variant is passed; the icons are svg children that the Button and the items detect and size on their own text.
- **Composition.** Menu.Root, Trigger, Popup and Item as core ships them, the icons ordinary children detected by the stylesheet; the trigger is the default core Button with a plus before its words and a chevron after.
- **Contextualism.** The Menu declares --loam-context: primary because its trigger is the area's action; primary is the brand slot, neutral until a theme fills it, so the declaration says where the action belongs rather than making it stand out.
- **Accessible & gatekept.** The button is named Create new with aria-haspopup, so a screen reader hears that a menu follows; ArrowDown opens it on the first item, the arrows move through, typing a letter jumps to an item, and choosing one closes the menu and follows the link. The icons are aria-hidden: the words name every item.

## Example.tsx

```tsx
"use client";

import { Menu } from "@loamui/core";
import "./example.css";

const KINDS = [
  {
    href: "/new/sowing",
    name: "Sowing record",
    path: "M12 20V10M12 10c0-3 2.5-5 6-5-.3 3.2-2.7 5-6 5ZM12 13c0-3-2.5-5-6-5 .3 3.2 2.7 5 6 5Z",
  },
  {
    href: "/new/note",
    name: "Plot note",
    path: "M4 20h4l10-10-4-4L4 16v4ZM12.5 7.5l4 4",
  },
  {
    href: "/new/listing",
    name: "Seed listing",
    path: "M4 4h7l9 9-7 7-9-9V4ZM8 8h.01",
  },
  {
    href: "/new/swap",
    name: "Swap request",
    path: "M4 8h13l-3-3M20 16H7l3 3",
  },
];

export default function Example() {
  return (
    <Menu.Root className="button-with-menu">
      <Menu.Trigger>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Create new
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
      </Menu.Trigger>
      <Menu.Popup>
        {KINDS.map((kind) => (
          <Menu.Item key={kind.href} href={kind.href}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={kind.path} />
            </svg>
            {kind.name}
          </Menu.Item>
        ))}
      </Menu.Popup>
    </Menu.Root>
  );
}
```

## example.css

```css
@scope (.button-with-menu) to ([class*="loam-"]) {
  :scope {
    --loam-context: primary;
  }
}
```

