# @loamui/core

Modern UI primitives for agent-assisted developers. LoamUI combines contextual
tokens, enhanced native element styles, and composable React components built
with modern CSS.

```bash
npm install @loamui/core
```

```tsx
import "@loamui/core/styles.css";
import { Button, Field, Input } from "@loamui/core";

export function SignIn() {
  return (
    <form>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input type="email" autoComplete="email" required />
      </Field.Root>
      <Button type="submit">Sign in</Button>
    </form>
  );
}
```

- **Contextual**: regions express intent and the components inside adapt.
- **Static styles**: plain CSS organized with cascade layers and `@scope`.
- **Themeable**: override `--loam-*` CSS variables; no provider, no config.
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
