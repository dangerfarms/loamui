# @loamui/ui

Ready-made compositions built from [`@loamui/core`](https://www.npmjs.com/package/@loamui/core)
primitives: hero, header, footer, pricing, testimonials, features, stats. Each
one is a compound component whose parts you arrange in your own markup; none
of them adds a component to core.

```bash
npm install @loamui/core @loamui/ui
```

```tsx
import "@loamui/core/styles.css";
import "@loamui/ui/styles.css";
import { SignpostLink } from "@loamui/core";
import { Hero } from "@loamui/ui";

export function Landing() {
  return (
    <Hero.Root>
      <Hero.Title>Modern UI primitives for agent-assisted developers.</Hero.Title>
      <Hero.Lede>Three primitives your agent builds from.</Hero.Lede>
      <Hero.Actions>
        <SignpostLink href="/docs">Get started</SignpostLink>
      </Hero.Actions>
    </Hero.Root>
  );
}
```

- **Parts, not props.** No size, variant or colour props; a `--loam-context`
  region recolours the parts inside, the container decides the size.
- **Static CSS.** One stylesheet layered above core's (`loamui.ui`), nothing at
  runtime.
- **Copy or install.** Every composition's code is on the site; install the
  package or paste it into your codebase and change what you need.

Gallery and code: **[loamui.com/ui](https://loamui.com/ui/)**. Building your
own from the primitives: the [Composing guide](https://loamui.com/docs/composing/).

## License

[MIT](./LICENSE) © Danger Farms
