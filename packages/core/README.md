# @loamui/core

Modern UI primitives for agent-assisted developers. LoamUI combines contextual
tokens, enhanced native element styles, and composable React components built
with modern CSS.

## Set up your application

Use a React framework application. Follow the
[installation guide](https://loamui.com/docs/installation) for Next.js App Router
or TanStack Start, including stylesheet delivery and layer order.
The guide also describes package availability. There is no LoamUI provider.

Once the foundation is loaded, compose native elements and components:

```tsx
"use client";

import { Checkbox, Field, Input } from "@loamui/core";

export function Preferences() {
  return (
    <section>
      <h2>Your preferences</h2>
      <Field.Root>
        <Field.Label>Your name</Field.Label>
        <Input name="name" autoComplete="name" />
      </Field.Root>
      <Checkbox label="Send me product updates" />
    </section>
  );
}
```

- **Contextual**: regions express intent and the components inside adapt.
- **Static styles**: plain CSS organized with cascade layers and `@scope`.
- **Themeable**: override `--loam-*` CSS variables; no theme provider.
- **Native dark mode**: `light-dark()` follows `color-scheme` (or set
  `data-theme="dark"` / `"light"` on `<html>`).
- **Accessible and semantic**: native elements carry the platform behavior.

Full documentation and live examples:
**[LoamUI documentation](https://loamui.com/)**

Working with an agent? Point it at [llms.txt](https://loamui.com/llms.txt)
(every docs page has a markdown twin) and at `AGENTS.md` in this package, a
one-page summary of the conventions.

## License

[MIT](./LICENSE) © Danger Farms
