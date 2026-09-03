---
title: Contextualism
description: Why LoamUI components have no variant or size props: context decides appearance, identity is the last resort.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

```

A named, recurring region declares its context where the region is defined: in its own
stylesheet. This is the idiomatic form: the region already has a class and a CSS file, and
the declaration is a semantic fact about it, so it lives with the rest of its styling:

```css
/* danger-zone.css: the region declares what it means */
.danger-zone {
  --loam-context: danger;
}
```

```tsx
```

For a one-off region (or a single element) the style attribute declares the same property
inline. This is not "inline styles" in the pejorative sense: nothing is being
styled, a semantic custom property is being set at a subtree root, and every visual
consequence still lives in the stylesheets:

```tsx
```

<div className={prose.block}>
  <div
    style={{
      "--loam-context": "danger",
      display: "grid",
      gap: "0.75rem",
      padding: "1.25rem",
      border: "1px solid var(--loam-color-line)",
      borderRadius: "var(--loam-radius-lg)",
      maxInlineSize: "26rem",
    }}
  >
    <strong>Delete workspace</strong>
    <Checkbox label="I understand this is permanent" />
    <div style={{ display: "flex", gap: "0.75rem" }}>
      <Button>Delete</Button>
      <Button>Cancel</Button>
    </div>
  </div>
</div>

Notice the checkbox: `--loam-context` is not a button feature. The region remaps
the semantic colour tokens for _every_ LoamUI component inside: checked states, focus
rings, carets. No component contains context code; the cascade does the
work. And since the declaration must sit on an ancestor (see above), a single dangerous
button is just a one-element region, a wrapper around the button:

```tsx
```

This is the entire status API. No LoamUI component has a variant or colour prop; the status
components (Alert, Badge, Loader, Progress) declare their meaning exactly the same way. A
success alert is an Alert in a `success` region (usually a one-element wrapper
region, or inherited from an ancestor that already means something):

```tsx
```

## One colour channel, derived looks

Button has no `filled`/`outline`/`subtle` variants. It has
one colour channel, and every look is derived from it. Background and border come via
`color-mix()` toward the page background, hover and active via relative-colour
lightness shifts:

```css
.loam-Button {
  --_color: var(--loam-button-color, var(--loam-color-fg));

  border: 1px solid color-mix(in oklab, var(--_color), var(--loam-color-bg) 80%);
  background: light-dark(
    color-mix(in oklab, var(--_color), var(--loam-color-bg) 90%),
    color-mix(in oklab, var(--_color), var(--loam-color-bg) 75%)
  );

  /* text is the channel deepened for contrast: the raw channel
     can't hold 4.5:1 on its own tint */
  color: light-dark(
    color-mix(in oklab, var(--_color) 70%, oklch(0% 0 0deg)),
    color-mix(in oklab, var(--_color) 55%, oklch(100% 0 0deg))
  );
}
```

The default channel is the neutral text colour: a quiet button that needs no
"subtle" variant. A context swaps the channel and all the derived looks follow.
Where a variant model needs 4 variants × 3 sizes × 2 colours of hand-picked values, this
needs one input.

The single instance-level escape hatch is the registered `--loam-button-color`
property, for the case that is genuinely about identity, like a brand-coloured wrapper
component:

```tsx
// Specialization is a wrapper, not a prop
export function BrandButton(props: ButtonProps) {
  return (
      {...props}
      style={{ "--loam-button-color": "light-dark(darkblue, lightblue)" }}
    />
  );
}
```

<div className={prose.block}>
  <Button
    style={{
      "--loam-button-color": "light-dark(darkblue, lightblue)",
    }}
  >
    Custom channel
  </Button>
</div>

## The size of the space

There is no size prop. Padding and font are fluid container-relative tokens, and in a
container of 16rem or less a button takes the full width. The layout decides, per instance
of the layout, not per instance of the button:

<div className={prose.block}>
  <div style={{ display: "grid", gap: "0.75rem" }}>
    <div
      style={{
        containerType: "inline-size",
        inlineSize: "14rem",
        padding: "0.75rem",
        border: "1px dashed var(--loam-color-line)",
        borderRadius: "var(--loam-radius-md)",
      }}
    >
      <Button>Narrow: full width</Button>
    </div>
    <div
      style={{
        containerType: "inline-size",
        inlineSize: "24rem",
        maxInlineSize: "100%",
        padding: "0.75rem",
        border: "1px dashed var(--loam-color-line)",
        borderRadius: "var(--loam-radius-md)",
      }}
    >
      <Button>Wide: natural width</Button>
    </div>
  </div>
</div>

When the design wants stacked full-width actions in a wide container, that intent is still
declared on the region, not the buttons. It is declared as actual layout: a grid (or
stacked flex) region stretches its buttons natively, so there is no attribute or prop to
remember. The arrangement is the declaration.

## Detection, not declaration

When the DOM already expresses a state, LoamUI styles it with `:has()` instead of
asking you to repeat it as a prop. An icon inside a button is detected (no
`leftSection` prop):

<div className={prose.block}>
  <Button>
    <CheckIcon />
    Approve
  </Button>
</div>

```css
.loam-Button:has(svg) {
  display: inline flex;
  gap: var(--loam-space-sm);

  svg {
    inline-size: 1em;
  }
}
```

Form errors work the same way. A field is invalid exactly when it contains a rendered error
message; there is no `invalid` prop anywhere in the library:

```css
/* the label tints when an error is present */
@scope (.loam-Field:has(> p.error)) to ([class*="loam-"]) {
  label {
    color: var(--loam-color-danger);
  }
}

/* the box keys off the control's own accessibility state */
.loam-Input-field:has(input[aria-invalid="true"]) {
  border-color: var(--loam-color-danger);
}
```

<div className={prose.block}>
  <DetectedErrorDemo />
</div>

Accessibility state still flows through React (`aria-invalid` is wired onto the
control because screen readers can't run `:has()`), but it is _derived from the same
source_: the presence of the error message. One source of truth, no prop to forget.

The platform itself is a detection source too. Native constraint validation
(`required`, `type="email"`) opens the field's invalid state only after an attempted
submission, then clears it once subsequent input is valid. No error prop or parallel
validation model is required. And an _icon-only_ button is detected from its accessible name: the
`aria-label` that accessibility requires anyway is what gives it square padding,
via `[aria-label]:has(svg)`. The correct markup and the correct look are the same
thing.

## When identity is legitimate

Contextualism is the default, not a ban. Some differences really are identity: a
brand-coloured call to action that must look the same in every context. For those,
specialize with a wrapper component (or the `--loam-button-color` channel), and
give the thing a name. What you should not reach for is a variant prop that encodes, on each
instance, a decision the surrounding design already made.

## Browser support

Everything contextualism uses is Baseline. Container style queries (the mechanism behind
`--loam-context`) became Baseline Newly Available in May 2026, when the last
engine shipped them. Container size queries, `:has()` and
`color-mix()` are Baseline Widely Available; relative colour syntax has been
Newly Available since 2024. In a browser that predates a feature, contexts degrade to the
neutral defaults (everything stays functional and accessible), and per our
[browser policy](https://github.com/dangerfarms/loamui/blob/main/CONTRIBUTING.md)
there are no polyfills.
