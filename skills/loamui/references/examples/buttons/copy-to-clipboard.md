---
title: Copy to clipboard
description: A referral link shown in a read-only box with a button beside it that copies the link and says so, and selects the text on focus for anyone who would rather copy it by hand.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Copy to clipboard

A referral link shown in a read-only box with a button beside it that copies the link and says so, and selects the text on focus for anyone who would rather copy it by hand.

An example in **Buttons**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `CopyButton`, `Field`, `Input`
- Tags: copy, clipboard, share, link, referral, read-only
- Live: https://loamui.com/examples/buttons/copy-to-clipboard

## Built to the pillars

- **Native CSS.** The link is in a real read-only input, so it can be focused, selected and copied with the keyboard whether or not the Clipboard API is available; focusing it selects the whole address, one keystroke from a manual copy.
- **Modern CSS.** The row is a two-track grid; the CopyButton's wrapper has no box, so the Button takes the second track as a bare Button would, sharing the derived control height with the box beside it.
- **Composition.** Field.Root, Label and Description name and explain the box; CopyButton is core's Button with the copy and its confirmation built in, given the link and the word to say afterwards.
- **Accessible & gatekept.** The button is named for its action, Copy link, and reads Copied for a moment after a successful copy, announced through a status region as well as shown, so the confirmation reaches a screen reader without moving focus. A refused copy is announced too, with what to do instead; the label never claims a copy it did not make.

## Example.tsx

```tsx
"use client";

import { CopyButton, Field, Input } from "@loamui/core";
import "./example.css";

const LINK = "https://hedgerow.example/join/ivy-b14";

export default function Example() {
  return (
    <Field.Root className="copy-to-clipboard">
      <Field.Label>Your referral link</Field.Label>
      <Field.Description>
        A friend who joins with it gets a free packet of seed, and so do you.
      </Field.Description>
      <div className="row">
        <Input
          readOnly
          value={LINK}
          spellCheck={false}
          onFocus={(event) => event.currentTarget.select()}
        />
        <CopyButton value={LINK} labels={{ copied: "Copied" }}>
          Copy link
        </CopyButton>
      </div>
    </Field.Root>
  );
}
```

## example.css

```css
/* The root is the core Field, which stacks the label, the description
   and the row. The row is the example's: the box takes the width and the
   CopyButton keeps its own, level with it; both are core parts past the
   donut, and the CopyButton's box is display: contents, so its Button is
   the grid's second cell exactly as a bare Button would be. */
@scope (.copy-to-clipboard) to ([class*="loam-"]) {
  div.row {
    align-items: end;
    display: block grid;
    gap: var(--loam-space-sm);
    grid-template-columns: minmax(0, 1fr) auto;
  }
}
```

