# @farmui/core

Modern UI primitives for agent-assisted developers. FarmUI combines contextual
tokens, enhanced native element styles, and composable React components built
with modern CSS.

```bash
npm install @farmui/core
```

```tsx
import "@farmui/core/styles.css";
import { Button, Field, Input } from "@farmui/core";

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
- **Themeable**: override `--fui-*` CSS variables; no provider, no config.
- **Native dark mode**: `light-dark()` follows `color-scheme` (or set
  `data-theme="dark"` / `"light"` on `<html>`).
- **Accessible and semantic**: native elements carry the platform behavior.

Full documentation and live examples:
**[FarmUI documentation](https://dangerfarms.github.io/farmui/)**

## License

[MIT](./LICENSE) © Danger Farms
