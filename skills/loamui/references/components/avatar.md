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
import { Avatar } from "@loamui/core";
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

### Size

There is no size prop. The public --loam-avatar-size property sets the diameter per instance or on a region, and the initials follow it.

```tsx
<Avatar name="Jane Doe" style={{ "--loam-avatar-size": "1.5rem" }} />
<Avatar name="Jane Doe" />
<Avatar name="Jane Doe" style={{ "--loam-avatar-size": "4rem" }} />
```

### Group

Avatar.Group is a list: each avatar is an item, overlapped and ringed in the surface colour, and more adds the overflow count as a final avatar named by labels.more.

```tsx
<Avatar.Group more={5} labels={{ more: (n) => `${n} more people` }}>
  <Avatar name="Jane Doe" />
  <Avatar name="Sam Reed" />
  <Avatar name="Amara Okafor" />
</Avatar.Group>
```

## When to use it

- To identify a person next to something they did: a comment, an assignee, a row in a member list.
- With Avatar.Group, to show a set of participants compactly where listing every name would not fit.

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
- When the name is visibly printed next to the avatar, pass aria-hidden so assistive tech does not read the same name twice; the image's alt is then empty as well, so the name is not read where aria-hidden is not honoured.
- The fallback glyph is aria-hidden and focusable="false": it is decoration; identity always comes from the name/alt wiring above.

## Props

Status is not a prop: it comes from the surrounding `--loam-context` region (see the Contextualism guide).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | — | Image source. When set, renders an <img>. |
| `alt` | `string` | — | Alt text for the image (falls back to name). Empty when the Avatar is aria-hidden, so a decorative image is not described. |
| `name` | `string` | — | Person's name; used for initials (the first grapheme of the first and last words) and as image alt. |
| `children` | `ReactNode` | — | Custom content; overrides the derived image/initials/glyph. |
| `...others` | `SpanHTMLAttributes` | — | All native <span> props are forwarded. |

## Parts

### Avatar.Group

A <ul role="list"> of avatars, each child an item, overlapped with a surface-coloured ring; all native <ul> props are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `more` | `number` | — | How many more people than avatars shown; rendered as a final +n avatar. |
| `labels` | `{ more?: (n: number) => string }` | `(n) => `${n} more`` | The overflow avatar's accessible name. |

## Custom properties

| Property | Syntax | Default | Description |
| --- | --- | --- | --- |
| `--loam-avatar-size` | `CSS length` | `2.5rem` | The diameter; set per instance or on a region. |
| `--loam-avatar-overlap` | `CSS length` | `0.5rem` | How far each item in an Avatar.Group overlaps the one before. |

