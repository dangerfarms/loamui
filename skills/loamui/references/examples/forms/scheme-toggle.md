---
title: Scheme toggle
description: A three-way choice of colour scheme, System, Light or Dark, that sets data-theme on the root element and remembers the choice.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Scheme toggle

A three-way choice of colour scheme, System, Light or Dark, that sets data-theme on the root element and remembers the choice.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `SegmentedControl`
- Tags: theme, dark mode, colour scheme, light-dark, preference
- Live: https://loamui.com/examples/forms/scheme-toggle

## Built to the pillars

- **Native CSS.** A native radio group in core's pill: the arrow keys move the choice, the legend names it, and choosing sets or removes data-theme on the root, which is the whole mechanism: color-scheme re-resolves and every light-dark() token follows.
- **Modern CSS.** No stylesheet of its own: the chosen segment, the focus ring and the forced-colours treatment are core's, and the theme change is one attribute the tokens already answer.
- **Composition.** SegmentedControl.Root, Legend and Item as core ships them, with an icon and hidden words in each segment; the storage logic is the example's, in the same file, and drops into any page that reads the same key.
- **Accessible & gatekept.** The legend names the group and each segment carries its name in hidden text, so the icons are never the only label. The choice is read from storage before the first paint, so two toggles on one page, or two tabs, stay in step; the page's own pre-paint script prevents a flash of the wrong scheme.

## Example.tsx

```tsx
"use client";

import { useEffect, useSyncExternalStore } from "react";
import { SegmentedControl } from "@loamui/core";
import "./example.css";

type Scheme = "system" | "light" | "dark";

/** The key the page's pre-paint script reads, so a reload keeps the choice. */
const STORAGE_KEY = "loamui-theme";

function readStored(): Scheme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* storage unavailable (private mode, sandboxed frame): system it is */
  }
  return "system";
}

// Storage is the store. The storage event carries another tab's change;
// this tab's own changes are announced by hand, since the event does not
// fire in the document that made them.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function apply(scheme: Scheme) {
  const root = document.documentElement;
  try {
    if (scheme === "system") {
      delete root.dataset.theme;
      localStorage.removeItem(STORAGE_KEY);
    } else {
      root.dataset.theme = scheme;
      localStorage.setItem(STORAGE_KEY, scheme);
    }
  } catch {
    /* the attribute is set even when storage refuses; the choice just won't survive a reload */
  }
  for (const listener of listeners) listener();
}

export default function Example() {
  // The server cannot know the stored choice: System keeps the markup
  // deterministic, and the client snapshot replaces it before paint.
  const scheme = useSyncExternalStore(subscribe, readStored, () => "system" as Scheme);

  // A page without a pre-paint script still ends up wearing the stored choice.
  useEffect(() => {
    const stored = readStored();
    if (stored !== "system") document.documentElement.dataset.theme = stored;
  }, []);

  return (
    <SegmentedControl.Root
      className="scheme-toggle"
      value={scheme}
      onValueChange={(next) => apply(next as Scheme)}
    >
      <SegmentedControl.Legend className="loam-VisuallyHidden">
        Colour scheme
      </SegmentedControl.Legend>
      <SegmentedControl.Item value="system">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" strokeLinecap="round" />
        </svg>
        <span className="loam-VisuallyHidden">System</span>
      </SegmentedControl.Item>
      <SegmentedControl.Item value="light">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
            strokeLinecap="round"
          />
        </svg>
        <span className="loam-VisuallyHidden">Light</span>
      </SegmentedControl.Item>
      <SegmentedControl.Item value="dark">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinejoin="round" />
        </svg>
        <span className="loam-VisuallyHidden">Dark</span>
      </SegmentedControl.Item>
    </SegmentedControl.Root>
  );
}
```

## example.css

```css
/* Nothing to add. The pill, its icon segments, the chosen state and the
   forced-colours treatment are core's SegmentedControl as it ships; the
   choice does its work on the root element's data-theme, not on the
   control, and every light-dark() token on the page follows. */
```

