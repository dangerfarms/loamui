---
title: Menu
description: A list of actions opened from a trigger.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Menu

A list of actions opened from a trigger: the APG menu-button pattern on top of the browser's top layer and anchor positioning.

## Import

```tsx
import { Menu } from "@loamui/core";
```

## Usage

### Basic usage

Compose the menu from parts and wire each item's onClick to its action. The popup uses the same engine as Popover (native popover attribute and anchor positioning where supported, a wrapper-anchored fallback elsewhere) with the APG menu-button keyboard pattern on top: arrow keys rove focus, typing jumps to a matching item, and activating one closes the menu and returns focus to the trigger.

```tsx
<Menu.Root>
  <Menu.Trigger>Options</Menu.Trigger>
  <Menu.Popup>
    <Menu.Item onClick={() => {}}>Rename</Menu.Item>
    <Menu.Item onClick={() => {}}>Duplicate</Menu.Item>
    <Menu.Item onClick={() => {}}>Move to folder…</Menu.Item>
  </Menu.Popup>
</Menu.Root>
```

### Groups and separators

Group related items under a label with Menu.Group and Menu.GroupLabel; Menu.Separator is a real <hr> between them.

```tsx
<Menu.Root>
  <Menu.Trigger>Workspace</Menu.Trigger>
  <Menu.Popup>
    <Menu.Group>
      <Menu.GroupLabel>Manage</Menu.GroupLabel>
      <Menu.Item onClick={() => {}}>Rename</Menu.Item>
      <Menu.Item onClick={() => {}}>Duplicate</Menu.Item>
    </Menu.Group>
    <Menu.Separator />
    <Menu.Item onClick={() => {}}>Archive</Menu.Item>
  </Menu.Popup>
</Menu.Root>
```

### Destructive group

Contextual meaning is a custom property: declare --loam-context: danger on a Menu.Group and the items inside adopt the danger accent, no props involved. Put Delete and its kin in their own labelled group so the separation and the colour both signal the stakes before the click.

```tsx
<Menu.Root>
  <Menu.Trigger>Workspace</Menu.Trigger>
  <Menu.Popup>
    <Menu.Item onClick={() => {}}>Rename</Menu.Item>
    <Menu.Separator />
    <Menu.Group style={{ "--loam-context": "danger" }}>
      <Menu.GroupLabel>Danger zone</Menu.GroupLabel>
      <Menu.Item onClick={() => {}}>Delete workspace</Menu.Item>
    </Menu.Group>
  </Menu.Popup>
</Menu.Root>
```

### Links as items

An Item with href renders as a real <a>, so right-click and open-in-new-tab work. Use sparingly: menus are for actions, and destinations usually deserve visible links.

```tsx
<Menu.Root>
  <Menu.Trigger>Project</Menu.Trigger>
  <Menu.Popup>
    <Menu.Item onClick={() => {}}>Rename</Menu.Item>
    <Menu.Separator />
    <Menu.Item href="#settings">Settings</Menu.Item>
    <Menu.Item href="#export">Export…</Menu.Item>
  </Menu.Popup>
</Menu.Root>
```

### Disabled items

Disabled items use aria-disabled, so they stay visible to assistive technology but are skipped by roving focus and cannot be activated.

```tsx
<Menu.Root>
  <Menu.Trigger>Document</Menu.Trigger>
  <Menu.Popup>
    <Menu.Item>Edit</Menu.Item>
    <Menu.Item disabled>Publish (needs review)</Menu.Item>
    <Menu.Item>Share</Menu.Item>
  </Menu.Popup>
</Menu.Root>
```

## When to use it

- For a short list of actions on an object (rename, duplicate, export, delete) collapsed behind a single trigger.
- When the actions are secondary enough that laying them all out as visible buttons would clutter the surface.

## When not to

- For choosing a value that persists, use Select, which has real selection semantics the menu role does not promise.
- For navigation, prefer visible links; a menu hides destinations users need behind an extra interaction.
- For one or two actions: plain Buttons are simpler and one click fewer.

## How it works

### Commands, with one exception for links

Menu items carry role="menuitem", announced as commands, not destinations. When one entry genuinely navigates (Export as CSV, View profile), give the Item an href: it renders a real <a> inside the menu, so right-click and open-in-new-tab keep working. A menu that is mostly links, though, is navigation: use visible links instead.

### Disabled items stay in the menu

A disabled item renders aria-disabled and is skipped by roving focus but stays visible and announced: the user learns the command exists and is currently unavailable. Removing it instead teaches them the feature is gone.

### Destructive commands live in a labelled danger group

Put Delete and its kin in a Menu.Group with a GroupLabel, inside a --loam-context: danger wrapper. The separation and the colour both signal the stakes before the click, and the group label is announced with each item.

### Icon-only triggers need a name

The ⋯ trigger reads as "menu" to a sighted user and as nothing to anyone else. Give it an aria-label naming the object it operates on ("Actions for INV-1024", not "menu"), because in a list of rows, ten triggers labelled "menu" are indistinguishable.

## Accessibility

- Implements the APG menu-button pattern: ArrowDown/ArrowUp on the trigger open the menu and focus the first/last item; inside, arrow keys rove focus through the items (looping), Home/End jump to the ends, and typing jumps to the next item matching the query.
- Escape closes and returns focus to the trigger, as does activating an item; Tab closes the menu and lets focus continue naturally: the menu moves focus, it never traps it.
- The trigger is a real <button> with aria-haspopup="menu" and aria-expanded; the popup is role="menu" with role="menuitem" children, and Menu.Separator is a real <hr>: the platform's separator role, no ARIA needed.
- Disabled items use aria-disabled rather than disabled, so they remain visible to assistive technology while roving focus skips them.
- Where the popover attribute and anchor positioning are both supported, the browser provides top-layer rendering, light dismiss and Escape; other browsers get a wrapper-anchored fallback with the same behavior re-implemented, the deliberate no-polyfill trade-off (see the browser support policy in CONTRIBUTING).

## Parts

### Menu.Root

Groups the parts and owns open state (controlled or uncontrolled). Renders an inline wrapper used by the fallback positioning.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | — | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial open state when uncontrolled. |
| `onOpenChange` | `(open: boolean) => void` | — | Called whenever the open state should change. |

### Menu.Trigger

A LoamUI Button wired as the menu button (aria-haspopup, aria-expanded, anchor name, arrow-key opening); it adapts to context like any Button. All native <button> props are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `render` | `element \| (props) => node` | — | Substitute your own element; it receives the wiring props. |

### Menu.Popup

The floating list (role="menu", popover attribute); it flips at viewport edges in supporting browsers. Native <div> props are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `"bottom" \| "top"` | `"bottom"` | Which side of the trigger the menu opens toward. |

### Menu.Item

One action (role="menuitem"). Renders a <button>, or a real <a> when href is set. Activation runs onClick, then closes the menu unless closeOnClick={false}.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `href` | `string` | — | Renders the item as a real link. |
| `onClick` | `(e) => void` | — | Runs on activation. |
| `closeOnClick` | `boolean` | `true` | Close the menu after activation. |
| `disabled` | `boolean` | — | aria-disabled; skipped by keyboard navigation. |
| `render` | `element \| (props) => node` | — | Substitute your own element (e.g. a router Link). |

### Menu.Group

Groups related items (role="group"); a GroupLabel inside labels the group via aria-labelledby. Native <div> props are forwarded.

### Menu.GroupLabel

The group's label; native <div> props are forwarded.

### Menu.Separator

A real <hr> between items, the platform's separator role; native <hr> props are forwarded.

