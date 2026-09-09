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

## Built to the pillars

- **Native CSS.** Sign out is a submit button in a method="post" form, because ending a session changes state on the server and a GET link would be followed by prefetchers and crawlers.
- **Composition.** Menu's trigger is substituted through render with a bare button around an Avatar, and the account block is plain text before the items with a Menu.Separator under it, so arrow keys skip it and it names the menu instead.
- **Accessible & gatekept.** The button is named for the person by hidden text, Account menu for Imogen Hartley, with the Avatar hidden so the name is heard once; arrow keys, typeahead, Escape and focus return are Menu's own.

## Example.tsx

```tsx
"use client";

import { Avatar, Menu } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Menu.Root className="user-menu">
      <Menu.Trigger
        render={
          <button type="button" className="trigger">
            <Avatar
              name="Imogen Hartley"
              src="https://picsum.photos/seed/hedgerow-imogen/96/96"
              aria-hidden
            />
            <span className="loam-VisuallyHidden">Account menu for Imogen Hartley</span>
          </button>
        }
      />
      <Menu.Popup aria-labelledby="user-menu-account">
        <div className="account" id="user-menu-account">
          <strong>Imogen Hartley</strong>
          <span>imogen@hedgerow.example</span>
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
/* The class rides on core's Menu.Root, so the trigger inside is in reach;
   the Menu's own rules are untouched. The trigger is a bare button, not a
   Button: the elements layer dresses every button as one, and a padded,
   tinted pill around a round avatar is not the shape of an account
   control, so the box collapses to the avatar and the global focus ring,
   which follows the radius, marks focus. The border is transparent
   rather than gone so forced colours keep an edge. */
@scope (.user-menu) to ([class*="loam-"]) {
  button.trigger {
    background: none;
    border: 1px solid transparent;
    border-radius: var(--loam-radius-full);
    box-shadow: none;
    display: inline flex;
    padding: 0;
  }
}

/* The popup is core's too, and carries its own class, so the account
   block at its top has a scope of its own. It takes an item's inline
   padding, so its words line up with the items' words, and the line
   under it is a Menu.Separator in the markup, not a border of its own. */
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

    span {
      color: var(--loam-color-fg-muted);
      overflow-wrap: anywhere;
    }
  }

  /* The form is plumbing around the last item and has no box of its own. */
  form {
    margin: 0;
  }
}
```

