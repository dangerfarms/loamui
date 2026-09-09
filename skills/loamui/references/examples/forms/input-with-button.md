---
title: Input with button
description: A newsletter sign-up as one control row: the email box with its submit button level beside it, stacking under it where the row is too narrow.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Input with button

A newsletter sign-up as one control row: the email box with its submit button level beside it, stacking under it where the row is too narrow.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`, `Field`, `Input`
- Tags: newsletter, subscribe, input, button, row, email
- Live: https://loamui.com/examples/forms/input-with-button

## Built to the pillars

- **Native CSS.** A native form: Enter in the box or the button posts the address to the action, and required plus type="email" let the browser refuse an empty or malformed one before anything is sent.
- **Modern CSS.** The row is a two-track grid scoped at itself, because it sits inside the Field the donut fences off, and a container query answered by the form collapses it to one track under 24rem, so the same markup is a row in a footer and a stack in a sidebar without a breakpoint.
- **Composition.** Core keeps the button beside the box rather than inside it, the way its own Search and PasswordInput do: both take the derived control height, so they align by construction and the box keeps its padding. The primary look is a context on the action cell, not a prop on the Button.
- **Accessible & gatekept.** The Field names and describes the box; the button is named for its action, Subscribe, and is a submit, so the form works from the keyboard with Enter alone. Stacked, the button takes the box's width, a bigger target where the space is tight.

## Example.tsx

```tsx
"use client";

import { Button, Field, Input } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <form className="input-with-button" action="/newsletter" method="post">
      <Field.Root>
        <Field.Label>Email address</Field.Label>
        <Field.Description>
          Sowing notes once a month. Unsubscribe from any issue.
        </Field.Description>
        <div className="row">
          <Input type="email" name="email" autoComplete="email" inputMode="email" required />
          <div className="action">
            <Button type="submit">Subscribe</Button>
          </div>
        </div>
      </Field.Root>
    </form>
  );
}
```

## example.css

```css
/* The form is the root and the container the row answers. The row sits
   inside the core Field, which is a limit of the donut, so it is reached
   from a scope rooted at the row itself: a grid whose first track takes
   the width and whose second shrink-wraps the Button, so the box and the
   button share the derived control height and sit level, both core parts
   past the donut. The action cell is a primary region, so the Button is
   the row's action without a variant prop. */
@scope (.input-with-button) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
  }
}

@scope (.input-with-button div.row) to ([class*="loam-"]) {
  :scope {
    align-items: end;
    display: block grid;
    gap: var(--loam-space-sm);
    grid-template-columns: minmax(0, 1fr) auto;
  }

  div.action {
    --loam-context: primary;

    display: block grid;
  }

  /* Too narrow for a row: the button goes under the box at its width.
     The query is answered by the form, the nearest container. */
  @container (inline-size < 24rem) {
    :scope {
      grid-template-columns: minmax(0, 1fr);
    }
  }
}
```

