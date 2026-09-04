---
title: Avatar
description: Represent a user with an image or initials.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Avatar

An image, initials, or fallback glyph representing a user.

## Import

```tsx
import { Avatar, AvatarGroup } from "@loamui/core";
```

## Usage

### Image

Pass a src to render a cover-fit image.

```tsx
<Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=faces" name="Ada Lovelace" />
```

### Initials

With no image, initials are derived from name. There is no colour prop: declare --loam-context on a one-element wrapper region (see the Contextualism guide) and the status colours follow, exactly like Badge; or let it inherit from a larger region.

```tsx
<Avatar name="Jane Doe" />
<span style={{ "--loam-context": "info" }}><Avatar name="Amara Okafor" /></span>
<span style={{ "--loam-context": "success" }}><Avatar name="Sam Reed" /></span>
```

### Fallback glyph

A bare Avatar with no name from any source renders a decorative person glyph. It carries no identity: the glyph is marked aria-hidden, so give an avatar a name whenever it stands in for a specific person.

```tsx
<Avatar />
```

### Group

AvatarGroup overlaps children with a surface-coloured ring.

```tsx
<AvatarGroup>
  <Avatar name="Jane Doe" />
  <Avatar name="Sam Reed" />
  <Avatar name="Amara Okafor" />
  <Avatar name="+5" aria-label="5 more people" />
</AvatarGroup>
```

## When to use it

- To identify a person next to something they did: a comment, an assignee, a row in a member list.
- With AvatarGroup, to show a set of participants compactly where listing every name would not fit.

## When not to

- For arbitrary images. The image is cover-cropped into a fixed square or circle, which is right for faces and wrong for logos, screenshots or product photos; use a plain <img>.
- As a click target. Avatar renders a <span>; if it should open a profile, wrap it in a real link or button rather than adding onClick to it.

## How it works

### The name is the API

Pass the person's full name and everything derives from it: the initials (first and last word, uppercased), the image alt when you give a src, and the aria-label when you do not. One prop keeps what sighted users see and what screen readers hear describing the same person.

### Identifying or decorative: decide which

An avatar identifies when it is the only place the person appears; it decorates when their name is printed right beside it. A decorative avatar should be aria-hidden so the name is not announced twice; an identifying one must have a name (or alt), never neither.

## Accessibility

- With src, a real <img> is rendered and its alt falls back to name: pass the name and the image announces the person.
- Without an image, the root becomes role="img" with aria-label from name (or alt): screen readers hear the full name (“Jane Doe”), never the raw initials (“JD”).
- A bare <Avatar /> with no name from any source is treated as decorative automatically (aria-hidden, no role). An identifying avatar must be given a name, an alt, or an aria-label.
- When the name is visibly printed next to the avatar, pass aria-hidden so assistive tech does not read the same name twice.
- The fallback glyph is aria-hidden and focusable="false": it is decoration; identity always comes from the name/alt wiring above.

## Props

Status is not a prop: it comes from the surrounding `--loam-context` region (see the Contextualism guide).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | — | Image source. When set, renders an <img>. |
| `alt` | `string` | — | Alt text for the image (falls back to name). |
| `name` | `string` | — | Person's name; used for initials and as image alt. |
| `children` | `ReactNode` | — | Custom content; overrides the derived image/initials/glyph. |
| `...others` | `SpanHTMLAttributes` | — | All native <span> props are forwarded. |

## Parts

### AvatarGroup

Overlaps a row of avatars with a surface-coloured ring; all native <div> props are forwarded.

