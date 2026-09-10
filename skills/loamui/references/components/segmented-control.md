---
title: SegmentedControl
description: Choose one option from a row of segments.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# SegmentedControl

A set of mutually exclusive options drawn as one row of segments: a native radio group in a pill, so it submits like a form control and switches views like a toolbar, with the arrow keys moving the choice either way.

## Import

```tsx
import { SegmentedControl } from "@loamui/core";
```

## Usage

### As a view switcher

Hold the value and let the view follow it. The Legend is painted inside the pill before the segments, so the row reads as a labelled control; an svg before a segment's text is its icon, sized on the text.

```tsx
const [view, setView] = useState("list");

<SegmentedControl.Root value={view} onValueChange={setView}>
  <SegmentedControl.Legend>View</SegmentedControl.Legend>
  <SegmentedControl.Item value="list">
    <ListIcon />
    List
  </SegmentedControl.Item>
  <SegmentedControl.Item value="grid">
    <GridIcon />
    Grid
  </SegmentedControl.Item>
</SegmentedControl.Root>
<p>{view === "list" ? "Showing the list." : "Showing the grid."}</p>
```

### In a form

The segments are native radios sharing one name, so the choice submits with the form and needs no JavaScript to do it. Uncontrolled here: defaultValue seeds the first render and the radios remember the rest.

```tsx
<form onSubmit={submit}>
  <SegmentedControl.Root name="range" defaultValue="week">
    <SegmentedControl.Legend>Range</SegmentedControl.Legend>
    <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
    <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
    <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
  </SegmentedControl.Root>
  <button type="submit">Apply</button>
</form>
```

### As a scheme picker

Icon-only segments sit in circles, each with hidden text as its name, and the Legend is hidden the same way: the group is still named, not painted. This one is live: choosing changes this site's colour scheme and remembers it, the way the site's own toggle does.

```tsx
const [scheme, setScheme] = useState("system");

<SegmentedControl.Root value={scheme} onValueChange={choose}>
  <SegmentedControl.Legend className="loam-VisuallyHidden">Colour scheme</SegmentedControl.Legend>
  <SegmentedControl.Item value="system">
    <SystemIcon />
    <span className="loam-VisuallyHidden">System</span>
  </SegmentedControl.Item>
  <SegmentedControl.Item value="light">
    <LightIcon />
    <span className="loam-VisuallyHidden">Light</span>
  </SegmentedControl.Item>
  <SegmentedControl.Item value="dark">
    <DarkIcon />
    <span className="loam-VisuallyHidden">Dark</span>
  </SegmentedControl.Item>
</SegmentedControl.Root>
```

### Disabled

A disabled segment keeps its place in the row so the set reads the same, and drops out of the choice: the arrow keys skip it and a click does nothing. Disable the Root to disable the whole group, as on any fieldset: the chosen segment stays drawn, so the reader still sees what the setting is, and every radio is skipped by Tab.

```tsx
<SegmentedControl.Root defaultValue="monthly">
  <SegmentedControl.Legend>Billing</SegmentedControl.Legend>
  <SegmentedControl.Item value="monthly">Monthly</SegmentedControl.Item>
  <SegmentedControl.Item value="yearly">Yearly</SegmentedControl.Item>
  <SegmentedControl.Item value="lifetime" disabled>
    Lifetime
  </SegmentedControl.Item>
</SegmentedControl.Root>

<SegmentedControl.Root defaultValue="week" disabled>
  <SegmentedControl.Legend>Range</SegmentedControl.Legend>
  <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
  <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
  <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
</SegmentedControl.Root>
```

## When to use it

- For a choice between two to five short options that should all be visible at once: a view (list or grid), a range (day, week, month), a billing period, a colour scheme.
- Where the choice takes effect at once and the reader needs to see which option is on: a toolbar or a settings row rather than a form waiting to be submitted, though it submits too.

## When not to

- For more than five options, or options with long labels: the row stops fitting and the segments stop reading as one control. Use RadioGroup, or Select when the list is long.
- For an on/off setting: that is a Switch. A segmented control asks which one, not whether.
- To switch between panels of content on the page: that is Tabs, which carries the tab and panel semantics a screen reader expects for that pattern.

## How it works

### Native radios, drawn as segments

Each segment is a label around a real radio, hidden visually but not from anything else. The browser supplies what a set of radios has always had: one choice at a time, the arrow keys moving it, focus on the checked option, and a value that submits under the group's name. The stylesheet reads the radio's own :checked to draw the chosen segment, so there is no state to keep in step with the DOM.

### The legend is the name

The Legend names the group, and a screen reader announces it with each option, so write it as the question the segments answer: “View”, “Range”, “Colour scheme”. It is painted inside the pill before the segments. When the segments say it themselves (three scheme icons under a heading that already reads “Appearance”), hide it with className="loam-VisuallyHidden": the name stays, the paint goes.

### Icon-only segments keep their words

An icon is an svg child, aria-hidden and sized on the text. A segment that shows only an icon still needs a name, so put the words beside it in a loam-VisuallyHidden span; the stylesheet detects that shape and draws the segment as a circle. A segment with no words is unnamed, and a set of unnamed radios is a set of unanswerable questions.

### A form control and a view switcher are the same control

Give the Root a name and the choice submits with the form, before or without JavaScript. Give it value and onValueChange and the choice drives the view. Both at once is fine: a search page's sort order can submit and update the results as it changes. The control does not know which it is for, and it does not need to.

### It stands in a row of controls

The pill is built to the same anatomy as Button and the form controls (1px borders, the same padding and line height), so it height-aligns with them by construction in a toolbar or a form row, at every container width. There is no size prop; the fluid tokens size it from the container like everything else.

## Accessibility

- The Root is a native <fieldset> carrying role="radiogroup", named by its Legend; each segment is a native <input type="radio"> inside a <label>, so the segment is its target and its name.
- Keyboard: Tab reaches the checked segment, ArrowLeft/ArrowRight and ArrowUp/ArrowDown move the choice and check it, Space checks a focused one. Disabled segments are skipped. All of it is the browser's own radio behaviour.
- The focus ring is drawn on the segment, not the hidden radio, in the ring colour and width every control uses.
- The chosen segment is carried by a line-strong edge and a surface, not colour alone; under forced colours it is painted in Highlight and HighlightText, the focus ring in the system focus colour and a disabled segment in GrayText.
- A Legend given className="loam-VisuallyHidden" still names the group; only its paint is removed.

## Parts

### SegmentedControl.Root

The <fieldset> with role="radiogroup"; native <fieldset> props (disabled, form) and ref are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | — | The name every radio shares and the choice submits under. Auto-generated when omitted. |
| `value` | `string` | — | The chosen value, controlled. Pair with onValueChange. |
| `defaultValue` | `string` | — | The initial choice when uncontrolled. |
| `onValueChange` | `(value: string) => void` | — | Fires with the newly chosen value when a segment is picked. |

### SegmentedControl.Legend

The group's name, a <legend> painted inside the pill before the segments; native <legend> props and ref are forwarded. Hide it with className="loam-VisuallyHidden".

### SegmentedControl.Item

One segment: a <label> around a native radio. Children are the visible label (text, an svg icon, or an icon beside hidden text); className, ref and native <label> props land on the label.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | The value this segment submits and reports. |
| `disabled` | `boolean` | — | Takes the segment out of the choice; it keeps its place in the row. |
| `inputProps` | `InputHTMLAttributes` | — | Props for the radio inside (aria-describedby, data-*). Its type, name, value, checked state and change handler are the component's. |

## Custom properties

| Property | Syntax | Default | Description |
| --- | --- | --- | --- |
| `--loam-segmented-control-segment-size` | `CSS length` | `the segment's own height` | The minimum inline size of a segment, so an icon-only segment is a circle and every segment in a set of short words can be given one width. Set it on the Root or any ancestor. |

