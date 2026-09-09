---
title: Dropzone
description: A box for plot photos that takes a drop or a click, says which types and sizes it accepts in words, lists what was chosen, and refuses a choice it cannot post, naming the file.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Dropzone

A box for plot photos that takes a drop or a click, says which types and sizes it accepts in words, lists what was chosen, and refuses a choice it cannot post, naming the file.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Field`, `FileInput`
- Tags: file, upload, dropzone, drag and drop, photos, size limit
- Live: https://loamui.com/examples/forms/dropzone

## Built to the pillars

- **Native CSS.** The control is a native <input type="file"> with accept and multiple: a dropped file lands in the same input, so the form posts it like a picked one, and the accept list filters the picker. A refused choice is cleared from the input, so the form cannot post what the message said no to.
- **Modern CSS.** The drag state is core's data-dragging on the box, painted in the -strong border that holds 3:1 in every context; the example styles only the icon and the two lines it puts inside the prompt.
- **Composition.** Field.Root with FileInput.Root, Control, Prompt and Files as core ships them; the prompt's children are the example's, and the size and count limits are one function from the chosen files to words, rendered as the Field's error.
- **Accessible & gatekept.** The limits are in the description, joined to the input by aria-describedby, before any choice is made; a refused choice is an alert that names the file and its size and says what to do. The list of chosen files is a polite live region core keeps in the page from the start, so the choice is announced as well as shown, and the input stays focusable inside the box the prompt draws.

## Example.tsx

```tsx
"use client";

import { useState } from "react";
import { Field, FileInput } from "@loamui/core";
import "./example.css";

const LIMIT = 10_000_000;
const MOST = 5;

const megabytes = new Intl.NumberFormat("en-GB", {
  style: "unit",
  unit: "megabyte",
  maximumFractionDigits: 1,
});

/** What is wrong with a choice, in words, or nothing. */
function problem(files: File[]): string | null {
  if (files.length > MOST) return `Choose ${MOST} photos at most: ${files.length} were chosen`;
  const big = files.find((file) => file.size > LIMIT);
  if (big) {
    return `${big.name} is ${megabytes.format(big.size / 1_000_000)}. Each photo must be under 10 MB: choose a smaller copy`;
  }
  return null;
}

export default function Example() {
  const [error, setError] = useState<string | null>(null);

  return (
    <Field.Root className="dropzone">
      <Field.Label>Plot photos</Field.Label>
      <Field.Description>JPEG or PNG, up to 10 MB each, five at most.</Field.Description>
      <Field.Error>{error}</Field.Error>
      <FileInput.Root>
        <FileInput.Control
          name="photos"
          accept="image/jpeg,image/png"
          multiple
          onChange={(event) => {
            const input = event.currentTarget;
            const found = problem(Array.from(input.files ?? []));
            setError(found);
            // A refused choice is cleared, so the form cannot post it.
            if (found) input.value = "";
          }}
        />
        <FileInput.Prompt>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 16.5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5" />
            <path d="M12 4v11M7.5 8.5 12 4l4.5 4.5" />
          </svg>
          <strong>Drop photos here</strong>
          <span>or choose files</span>
        </FileInput.Prompt>
        <FileInput.Files locale="en-GB" />
      </FileInput.Root>
    </Field.Root>
  );
}
```

## example.css

```css
/* The root is the core Field, which stacks the label, the description,
   the error and the box. The box, its dashed border, the drag state and
   the file list are core's FileInput past the donut; the example's own
   elements are the icon and the two lines of the invitation inside the
   prompt, scoped at the FileInput so they can be reached, and they are
   all it styles. */
@scope (.dropzone .loam-FileInput) to ([class*="loam-"]) {
  label {
    svg {
      block-size: auto;
      display: block flow;
      inline-size: 2rem;
      margin-block-end: var(--loam-space-sm);
      margin-inline: auto;
    }

    strong {
      color: var(--loam-color-fg);
      display: block flow;
    }
  }
}
```

