---
title: User menu
description: The signed-in person's menu: an avatar button that opens their name and email, their account pages, and a sign-out that posts a form.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# User menu

The signed-in person's menu: an avatar button that opens their name and email, their account pages, and a sign-out that posts a form.

An example in **Users**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Menu`
- Tags: account, avatar, dropdown, sign out, profile
- Live: https://loamui.com/examples/users/user-menu

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** Sign out is a submit button in a method="post" form, because ending a session changes state on the server and a GET link would be followed by prefetchers and crawlers.
- **Composition.** Menu's trigger is the Button core renders, holding an Avatar and hidden text and never restyled, and the account block is plain text before the items with a Menu.Separator under it, so arrow keys skip it and it names the menu instead.
- **Accessible & gatekept.** The button is named for the person by hidden text, Account menu for Imogen Hartley, with the Avatar hidden so the name is heard once; arrow keys, typeahead, Escape and focus return are Menu's own.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Avatar, Menu } from "@loamui/core";
import "./example.css";

export default function Example() {
  const instanceId = useId();
  return (
    <Menu.Root className="user-menu">
      <Menu.Trigger>
        <Avatar name="Imogen Hartley" src="https://picsum.photos/id/823/96/96" aria-hidden />
        <span className="loam-VisuallyHidden">Account menu for Imogen Hartley</span>
      </Menu.Trigger>
      <Menu.Popup aria-labelledby={`${instanceId}-user-menu-account`}>
        <div className="account" id={`${instanceId}-user-menu-account`}>
          <strong>Imogen Hartley</strong>
          <span className="email">imogen@hedgerow.example</span>
        </div>
        <Menu.Separator />
        <Menu.Item href="/plot">Your plot</Menu.Item>
        <Menu.Item href="/orders">Orders</Menu.Item>
        <Menu.Item href="/membership">Membership</Menu.Item>
        <Menu.Separator />
        <form method="post" action="/sign-out">
          <Menu.Item render={<button type="submit">Sign out</button>} />
        </form>
      </Menu.Popup>
    </Menu.Root>
  );
}
```

## example.css

```css
@scope (.user-menu .loam-Menu-popup) to ([class*="loam-"]) {
  div.account {
    display: block grid;
    font-size: var(--loam-text-sm);
    gap: calc(var(--loam-space-xs) / 2);
    padding-block: var(--loam-space-sm);
    padding-inline: var(--loam-space-sm);

    strong {
      color: var(--loam-color-fg-strong);
    }

    span.email {
      color: var(--loam-color-fg-muted);
      overflow-wrap: anywhere;
    }
  }

  form {
    margin: 0;
  }
}
```

