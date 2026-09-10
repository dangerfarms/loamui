# Writing against @loamui/core

A one-page summary for an agent (or a person) building an interface with
LoamUI. The full documentation is at <https://loamui.com/>, every page has a
markdown twin at the same URL with `.md` appended, and
<https://loamui.com/llms.txt> indexes them.

## Setup

```tsx
import "@loamui/core/styles.css"; // once, at the app root
import { Button, Field, Input } from "@loamui/core";
```

No provider, no config. React 19, ESM only. In React Server Components every
compound part (`Field.Root`, `Modal.Trigger`) is a client reference, so JSX
that uses parts lives in a `"use client"` file; callable forms (`<Button>`,
`<Alert title>`) work from server modules.

## Three primitives

- **Tokens**: `--loam-color-*`, `--loam-text-*`, `--loam-space-*`,
  `--loam-radius-*`, `--loam-shadow-*`, `--loam-duration-*`. Override at any
  scope to theme; never write raw colours or pixel sizes in your own CSS.
- **Element styles**: native HTML is already styled page-wide (headings,
  links, code, forms, tables). Write semantic markup first; reach for a
  component only when the element needs structure it does not have.
- **Components**: 33 low-level parts. Their look comes from context, not
  props.

## The rules that matter

1. **No `size`, `variant`, `color` or `fullWidth` props.** They do not exist.
   Status comes from a region: `<div style={{ "--loam-context": "danger" }}>`.
   A style query is answered by ancestors, so wrap even a single control.
   Contexts: `primary | success | warning | info | danger`.
2. **Size comes from the container.** Declare `container-type: inline-size`
   on a region and the fluid tokens respond. In a container of 16rem or less
   a Button spans the full width.
3. **Width comes from layout.** A grid or stacked flex region stretches its
   buttons; a flex row shrink-wraps them. There is no layout prop.
4. **Compose, don't configure.** `Field.Root > Field.Label, Field.Description,
Field.Error, Input` in that order; the controls self-wire. Overlays are
   `Modal.Root > Modal.Trigger + Modal.Popup`. Swap the rendered element with
   `render={<a href="…" />}`.
5. **Icons are children.** `<Button><Icon /> Save</Button>`; the component
   detects the `svg`.
6. **Errors are detected.** Render `<Field.Error>` and the field is invalid;
   there is no `invalid` prop. Write the message in the words of the question
   ("Enter your first name"), never "required" or "invalid".
7. **Your own components** are a semantic element with a scoped rule:

   ```css
   @scope (.pricing-card) {
     :scope {
       background: var(--loam-color-surface);
       border: 1px solid var(--loam-color-line);
       border-radius: var(--loam-radius-lg);
       padding: var(--loam-space-lg);
     }
   }
   ```

   Compose LoamUI parts inside it. Do not restyle a LoamUI component's
   internals; if a component needs structural overrides to fit, build the
   thing downstream instead.

## House style for the CSS you write

The repo's own stylelint config will accept your stylesheet if you: nest
child rules with `&` instead of repeating the parent selector; use the
two-value display syntax (`display: block grid`, `display: block flex`);
use logical properties (`inline-size`, `margin-block`,
`overscroll-behavior-inline`), never physical ones; keep declarations in
alphabetical order; and put a blank line before every comment.

## Styling vocabulary you can rely on

| Attribute         | Where           | Meaning                       |
| ----------------- | --------------- | ----------------------------- |
| `data-popup-open` | trigger         | its popup is open             |
| `data-open`       | popup or panel  | open                          |
| `data-disabled`   | wrapper/control | disabled styling hook         |
| `data-current`    | nav item        | current page or location      |
| `aria-invalid`    | control         | derived from a rendered error |

Public custom properties are `--loam-*`; anything `--_*` is private.

See <https://loamui.com/docs/composing/> for a worked example.
