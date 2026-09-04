---
title: Composing components
description: How to build your own components (a hero, a pricing card, a carousel) from the three primitives, without adding anything to the library.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Composing components

LoamUI ships 33 low-level components and no more. A hero, a pricing table, a carousel or a testimonial wall is yours to build, from the three primitives, in your own codebase. This page is the recipe, for you and for your agent.

## The recipe

1. **Write the markup as native HTML.** A `section` with an `h2` and a `p` is already styled by the [element styles](/docs/element-styles): type scale, leading, margins, links. Reach for a LoamUI component only where the element needs structure it does not have (a button, a field, a badge, a disclosure).
2. **Give the root a class and a scoped rule.** `@scope (.hero)` keeps the rule inside the component, so parts can be plain type selectors (`h2`, `p.lede`) with no naming scheme. Use only `--loam-*` tokens for colour, space, type and radius; never a raw value.
3. **Compose LoamUI parts inside it.** `Button`, `Badge`, `SignpostLink`, `Card`. Do not restyle their internals. If a part needs structural overrides to fit, the thing you are building belongs downstream, not in the library.
4. **Declare context and size on the region.** `--loam-context: primary` on the root recolours everything inside; `container-type: inline-size` lets the fluid tokens respond to the component's own width instead of the viewport.

## A hero

The whole component is one scoped rule and two LoamUI parts:

```tsx
export function Hero() {
  return (
    <section className="hero">
      <div style={{ "--loam-context": "primary" }}>
        <Badge>New</Badge>
      </div>
      <h2>Modern UI primitives for agent-assisted developers.</h2>
      <p className="lede">Three primitives your agent builds from.</p>
      <div className="actions">
        <SignpostLink href="/docs">Get started</SignpostLink>
        <a href="https://github.com/dangerfarms/loamui">Star on GitHub</a>
      </div>
    </section>
  );
}
```

```css
@scope (.hero) {
  :scope {
    background: var(--loam-color-bg-subtle);
    border: 1px solid var(--loam-color-line);
    border-radius: var(--loam-radius-xl);
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-lg);
    padding: var(--loam-space-xl);
  }

  h2 {
    font-size: var(--loam-text-3xl);
    margin: 0;
    max-inline-size: 18ch;
  }

  p.lede {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-lg);
    margin: 0;
    max-inline-size: var(--loam-measure);
  }

  div.actions {
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-lg);
  }
}
```

Nothing in the library changed. The heading and the lede come from the element styles and the type scale; the badge and the signpost link come from the components; the box is yours.

## A pricing card

`Card` is the surface. A scoped rule adds the anatomy a plan needs, and `--loam-context: primary` on the card marks the recommended plan: the badge and the button recolour, and nothing else has to know.

```tsx
<Card className="plan" style={{ "--loam-context": "primary" }}>
  <h3>
    Team <Badge>Most popular</Badge>
  </h3>
  <p className="price">
    £24 <small>per seat, per month</small>
  </p>
  <ul>
    <li>Unlimited projects</li>
    <li>Shared component library</li>
    <li>Priority support</li>
  </ul>
  <Button>Choose Team</Button>
</Card>
```

```css
@scope (.plan) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-md);
    inline-size: min(100%, 22rem);
  }

  p.price {
    font-size: var(--loam-text-2xl);
    font-variant-numeric: lining-nums tabular-nums;
    font-weight: 700;
    margin: 0;
  }
}
```

Three plans in a row is a grid on the parent (`grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr))`), not a prop on the card; see the [Layout guide](/docs/layout).

## Where a carousel goes

A carousel is scroll-snap on a list plus two buttons. It needs no library component: the list is `ul` with `scroll-snap-type: inline mandatory`, each `li` is `scroll-snap-align: start`, and the controls are two `Button`s that call `scrollBy`. The `modern-web-guidance` skill has the platform pattern (search "carousel"). Build it in your codebase; if three projects end up sharing the same one, that is the moment to propose it for the library.

## Asking an agent to do this

Point the agent at [/llms.txt](/llms.txt) (every page of this site has a markdown twin at the same URL with `.md` appended) and at `AGENTS.md`, which ships inside the `@loamui/core` package. Then ask in these terms:

> Build a pricing section with three plans using @loamui/core. Use native elements and the element styles for the type, a scoped rule with --loam-* tokens for the card anatomy, Card, Badge and Button for the parts, and mark the recommended plan with --loam-context: primary on its root. Do not add size, variant or colour props, and do not restyle LoamUI internals.

What to check in the result, in order: no raw colours or pixel sizes (tokens only), no `variant`/`size` props invented on LoamUI parts, status declared on a region rather than passed to a control, and the markup still reads as HTML.
