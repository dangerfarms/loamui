---
title: Button with progress
description: An Upload photos button that disables itself while the upload runs and shows a real progress bar along its foot, then says in words that the photos are up.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Button with progress

An Upload photos button that disables itself while the upload runs and shows a real progress bar along its foot, then says in words that the photos are up.

An example in **Buttons**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`, `Progress`
- Tags: upload, progress, button, disabled, loading, async
- Live: https://loamui.com/examples/buttons/button-with-progress

## Built to the pillars

- **Native CSS.** The bar is a native <progress> with a value, not a div with a width: the browser paints the fill and exposes the percentage. It is a sibling of the button laid over its edge, because a <button> may hold only phrasing content, and the button is disabled with the attribute, so a second click cannot start a second upload.
- **Modern CSS.** The stack is a one-cell inline grid: the Button fills it by auto-placement and the bar is placed into the same cell by grid-area and aligned to the end, so nothing is measured or absolutely positioned; a primary region colours both.
- **Composition.** Button and Progress as core ships them, with the example's own timer standing in for the request's progress events; the words in the button change with the state, and the confirmation is a status paragraph under it.
- **Contextualism.** The stack declares --loam-context: primary because the Button and its bar are the one action; primary is the brand slot, neutral until a theme fills it, and a theme that does recolours both as one.
- **Accessible & gatekept.** The button's words say what is happening (Uploading 5 photos…) and the bar is named Upload progress with its value read as 40% uploaded; when the upload finishes, a polite status region says 5 photos uploaded, so a screen reader hears the end even though the disabled button could not keep focus. The bar keeps its border and Highlight fill in forced colours.

## Example.tsx

```tsx
"use client";

import { useEffect, useState } from "react";
import { Button, Progress } from "@loamui/core";
import "./example.css";

const PHOTOS = 5;

export default function Example() {
  // null while idle; the percentage while an upload is under way.
  const [percent, setPercent] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const uploading = percent !== null;

  // Stands in for the request's progress events: a real upload reports
  // through XMLHttpRequest's upload.onprogress or a streamed fetch.
  useEffect(() => {
    if (!uploading) return;
    const timer = setInterval(() => {
      setPercent((current) => (current === null ? null : Math.min(100, current + 4)));
    }, 100);
    return () => clearInterval(timer);
  }, [uploading]);

  // The full bar is left in view for a moment before the button comes back.
  useEffect(() => {
    if (percent !== 100) return;
    const timer = setTimeout(() => {
      setPercent(null);
      setDone(true);
    }, 400);
    return () => clearTimeout(timer);
  }, [percent]);

  return (
    <div className="button-with-progress">
      <span className="stack">
        <Button
          disabled={uploading}
          onClick={() => {
            setDone(false);
            setPercent(0);
          }}
        >
          {uploading ? `Uploading ${PHOTOS} photos…` : `Upload ${PHOTOS} photos`}
        </Button>
        {uploading && (
          <span className="bar">
            <Progress
              size="sm"
              value={percent}
              aria-label="Upload progress"
              labels={{ value: (n) => `${n}% uploaded` }}
            />
          </span>
        )}
      </span>
      <p role="status">{done ? `${PHOTOS} photos uploaded.` : ""}</p>
    </div>
  );
}
```

## example.css

```css
@scope (.button-with-progress) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    gap: var(--loam-space-sm);
    justify-items: start;
  }

  span.stack {
    --loam-context: primary;

    display: inline grid;
  }

  /* A sibling, not a child: a <button> holds only phrasing content, and a
     progress bar is not. */
  span.bar {
    align-self: end;
    grid-area: 1 / 1;
    padding-block-end: var(--loam-space-xs);
    padding-inline: var(--loam-space-sm);
    pointer-events: none;
  }

  p {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    margin: 0;
    min-block-size: 1lh;
  }
}
```

