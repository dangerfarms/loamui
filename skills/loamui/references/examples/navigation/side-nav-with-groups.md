---
title: Side nav with groups
description: Vertical navigation for an admin area: a dashboard link, then four groups with an icon each that fold their pages away, the group holding the current page open on arrival.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Side nav with groups

Vertical navigation for an admin area: a dashboard link, then four groups with an icon each that fold their pages away, the group holding the current page open on arrival.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Nav`
- Tags: sidebar, collapsible, nested, details, admin, icons
- Live: https://loamui.com/examples/navigation/side-nav-with-groups

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** Each group is a native details element, so it opens and closes before any script runs and its state is the browser's; the groups share no name, so two areas can stay open while an administrator works across them. Give them one name and the browser keeps a single group open instead.
- **Modern CSS.** The nested lists are indented through Nav's public --loam-nav-indent, computed from the icon's width and the gap after it, so the words of a nested link sit under the words of its group title rather than under the icon.
- **Composition.** A Group is an Item holding a GroupTitle, with an svg before its words like any link, and a nested List; the icon is a detected child, sized on the text by Nav's own rule, not a slot.
- **Accessible & gatekept.** The group holding the current page is opened on arrival and its title takes the current weight; the chevron is drawn from two borders in the text colour, so forced colours keep it, and each icon is aria-hidden so a title is named by its words.

## Example.tsx

```tsx
"use client";

import { Nav } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <div className="side-nav-with-groups">
      <Nav.Root>
        <Nav.Title>Hedgerow admin</Nav.Title>
        <Nav.List>
          <Nav.Item>
            <Nav.Link href="/admin">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Group>
              <Nav.GroupTitle>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 21v-8" />
                  <path d="M12 13c0-4 3-7 8-7-1 5-4 7-8 7z" />
                  <path d="M12 13c0-3-2-5-6-5 1 4 3 5 6 5z" />
                </svg>
                Catalogue
              </Nav.GroupTitle>
              <Nav.List>
                <Nav.Item>
                  <Nav.Link href="/admin/catalogue/seeds">Seeds</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/admin/catalogue/plants">Plants</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/admin/catalogue/tools">Tools and sundries</Nav.Link>
                </Nav.Item>
              </Nav.List>
            </Nav.Group>
          </Nav.Item>
          <Nav.Item>
            <Nav.Group defaultOpen>
              <Nav.GroupTitle>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m3 8 9-5 9 5v8l-9 5-9-5z" />
                  <path d="m3 8 9 5 9-5M12 13v8" />
                </svg>
                Orders
              </Nav.GroupTitle>
              <Nav.List>
                <Nav.Item>
                  <Nav.Link href="/admin/orders/new">New orders</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/admin/orders/packing" current>
                    Packing
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/admin/orders/dispatched">Dispatched</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/admin/orders/returns">Returns</Nav.Link>
                </Nav.Item>
              </Nav.List>
            </Nav.Group>
          </Nav.Item>
          <Nav.Item>
            <Nav.Group>
              <Nav.GroupTitle>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="8" r="3.5" />
                  <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
                  <path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4.5-6.2" />
                </svg>
                Members
              </Nav.GroupTitle>
              <Nav.List>
                <Nav.Item>
                  <Nav.Link href="/admin/members">Directory</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/admin/members/applications">Applications</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/admin/members/renewals">Renewals</Nav.Link>
                </Nav.Item>
              </Nav.List>
            </Nav.Group>
          </Nav.Item>
          <Nav.Item>
            <Nav.Group>
              <Nav.GroupTitle>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 7h10M18 7h2M4 12h2M10 12h10M4 17h10M18 17h2" />
                  <circle cx="16" cy="7" r="2" />
                  <circle cx="8" cy="12" r="2" />
                  <circle cx="16" cy="17" r="2" />
                </svg>
                Settings
              </Nav.GroupTitle>
              <Nav.List>
                <Nav.Item>
                  <Nav.Link href="/admin/settings/team">Team</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/admin/settings/notifications">Notifications</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/admin/settings/delivery">Delivery</Nav.Link>
                </Nav.Item>
              </Nav.List>
            </Nav.Group>
          </Nav.Item>
        </Nav.List>
      </Nav.Root>
    </div>
  );
}
```

## example.css

```css
@scope (.side-nav-with-groups) to ([class*="loam-"]) {
  :scope {
    /* The icon is 1.25em of the link's md type: the indent puts nested words
       under the group's words, not under its icon. */
    --loam-nav-indent: calc(1.25 * var(--loam-text-md) + var(--loam-space-sm));

    inline-size: min(100%, 18rem);
  }
}
```

