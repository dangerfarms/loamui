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
- **Components**: 42 low-level parts. Their look comes from context, not
  props.

  | Category     | Components                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
  | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Inputs       | `Field` (composable form-field primitive), `Fieldset` (group controls under a semantic label), `ErrorSummary` (list form errors as links to their fields), `Button` (trigger an action or event), `Input` (a labelled text field), `Textarea` (multi-line text input), `Select` (choose one option from a list), `DateInput` (labelled fields for a memorable date), `Checkbox` (toggle a single option on or off), `Radio` (choose one option from a set), `Switch` (an on/off toggle switch), `Range` (pick a numeric value from a range), `Search` (the page's search, as a landmark), `QuantityInput` (a count adjusted one at a time), `Rating` (stars as real inputs, or as a picture of a score), `FileInput` (choose a file, or drop it), `CopyButton` (copy a value and say so), `SchemeToggle` (choose system, light or dark) |
  | Data display | `Badge` (compact status or label pill), `Price` (a monetary amount, written for people), `Time` (a date or time, written for people), `Card` (a flexible surface container), `Avatar` (represent a user with an image or initials), `Table` (display rows and columns of data), `Separator` (a rule between groups of content)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
  | Feedback     | `Alert` (draw attention to an important message), `Progress` (show completion of a task), `Meter` (a measurement within a known range), `Skeleton` (placeholder while content loads), `Loader` (indicate an ongoing process), `Toast` (transient notifications)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
  | Disclosures  | `Details` (native disclosure for secondary content), `Tooltip` (reveal info on hover or focus), `Modal` (a focused dialog over the page), `Drawer` (an edge-anchored panel that slides in), `Popover` (floating content anchored to a trigger), `Menu` (a list of actions opened from a trigger)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
  | Navigation   | `Tabs` (switch between related views), `SignpostLink` (signpost the way into a task), `SkipLink` (jump straight to the main content), `Breadcrumbs` (show the current page's location), `Pagination` (navigate between pages of content)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

## The rules that matter

1. **No `size`, `variant`, `color` or `fullWidth` props.** They do not exist.
   Status comes from a region: `<div style={{ "--loam-context": "danger" }}>`.
   A style query is answered by ancestors, so wrap even a single control.
   Contexts: `primary | success | warning | info | danger`. The exceptions:
   Badge, Loader, Progress and Meter keep `size` for an intrinsic glyph or
   track, and numeric bounds (Meter's `min`/`max`/`low`/`high`/`optimum`,
   QuantityInput's `min`/`max`/`step`) are the platform's own semantics, not
   sizing.
2. **Size comes from the container.** Declare `container-type: inline-size`
   on a region and the fluid tokens respond. In a container of 16rem or less
   a Button spans the full width.
3. **Width comes from layout.** A grid or stacked flex region stretches its
   buttons; a flex row shrink-wraps them. There is no layout prop.
4. **Compose, don't configure.** `Field.Root > Field.Label, Field.Description,
Field.Error, Input` in that order; the controls (`Input`, `Select`,
   `Textarea`, `Range`, `QuantityInput`, `FileInput.Control`, `Search.Input`)
   self-wire. Overlays are
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

| Attribute         | Where                  | Meaning                                     |
| ----------------- | ---------------------- | ------------------------------------------- |
| `data-popup-open` | trigger                | its popup is open                           |
| `data-open`       | popup or panel         | open                                        |
| `data-disabled`   | wrapper/control        | disabled styling hook                       |
| `data-current`    | nav item               | current page or location                    |
| `data-dragging`   | `FileInput.Root`       | a drag carrying files is over the box       |
| `data-show-label` | Rating, SchemeToggle   | the group's name is painted as well as read |
| `data-read-only`  | Rating                 | display mode: a picture, not inputs         |
| `data-size`       | Badge, Progress, Meter | the `size` prop, for the stylesheet         |
| `aria-invalid`    | control                | derived from a rendered error               |

Public custom properties are `--loam-*`; anything `--_*` is private.

See <https://loamui.com/docs/composing/> for a worked example.
