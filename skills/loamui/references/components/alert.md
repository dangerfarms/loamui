---
title: Alert
description: Draw attention to an important message.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Alert

A prominent message box whose status comes from its context.

## Import

```tsx
import { Alert, Button } from "@loamui/core";
```

## Usage

### Contexts

Alert has no colour or variant props. Declare --loam-context on a one-element wrapper region (a style query is answered by ancestors, never by the element that declares the property) and the status colours follow. See the Contextualism guide.

```tsx
<div style={{ "--loam-context": "info" }}>
  <Alert title="Heads up">A new version is available.</Alert>
</div>
<div style={{ "--loam-context": "success" }}>
  <Alert title="Saved">Your changes have been stored.</Alert>
</div>
<div style={{ "--loam-context": "warning" }}>
  <Alert title="Low storage">Only 5% of your quota remains.</Alert>
</div>
<div style={{ "--loam-context": "danger" }}>
  <Alert title="Deploy failed">Check the build logs.</Alert>
</div>
```

### Inherited from a region

--loam-context inherits, so an alert inside a region that already means something needs nothing of its own. Here the region declares danger once: the Alert and the Button beside it both answer it, and neither carries a prop.

```tsx
<div style={{ "--loam-context": "danger" }}>
  <Alert title="This workspace will be deleted">
    Everything in it is removed for every member.
  </Alert>
  <Button>Delete workspace</Button>
</div>
```

### With icon

Pass any node as the leading icon.

```tsx
<div style={{ "--loam-context": "info" }}>
  <Alert icon={<span aria-hidden>ℹ</span>} title="Did you know?">
    An alert takes its status from the --loam-context of the region around it.
  </Alert>
</div>
```

### Title only

Body content is optional.

```tsx
<div style={{ "--loam-context": "success" }}>
  <Alert title="All systems operational." />
</div>
```

## When to use it

- For in-page status the user needs to act on or know about now (a failed deploy, a quota about to run out), placed next to the content it describes.
- When the message must stay on screen: alerts never auto-dismiss, so the information survives until the state it reports changes and you remove it.

## When not to

- For transient confirmations that need no follow-up (“Saved”, “Copied”). Use Toast; an alert that lingers after the moment has passed becomes noise.
- For an error tied to a single form field. Use Field.Error, which wires aria-describedby and aria-invalid to the control the error belongs to.

## How it works

### Render it when it happens

An alert reports the current state of the page the user is on. Information they could act on some other time belongs in ordinary content; a confirmation that expires in seconds belongs in a Toast. Reserving Alert for “this matters here, now” is what keeps it noticeable when it appears.

### Persistent by design

There is no auto-dismiss and no built-in close button: an alert exists exactly as long as the condition it reports. Remove it by no longer rendering it when the state changes: a warning that disappears on its own while the problem remains would be lying.

### Announcement happens at insertion

A live region announces only when content enters it; an alert rendered with the rest of the page is simply read in document order. So render the alert conditionally when the condition becomes true, never hidden-then-shown, and the announcement arrives exactly when the event does. Give it role="alert" when that event must interrupt; the default role="status" waits its turn.

## Accessibility

- Renders role="status" by default: a polite live region, which suits a message that is on the page when it loads or that reports a condition rather than an event.
- Pass role="alert" for a message that appears in response to an action and must interrupt: forwarded props are spread after the default, so your role wins and the announcement becomes assertive, read ahead of whatever else was queued.
- A banner already present at page load announces nothing (a live region only fires on insertion): for a post-redirect confirmation, either move keyboard focus to the alert on load, or treat it as a landmark instead: a wrapper with role=region and aria-labelledby pointing at the title.
- The status colour is never announced: write the title so the meaning survives in words (“Deploy failed”, not “Error” on a red tint); the border and tint are visual-only.
- The icon slot is rendered aria-hidden. Icons are decoration here, so any meaning they carry must also be in the text.
- Title text is not the raw status colour: it is mixed toward black (light scheme) or white (dark) so it keeps AA contrast on the tint even for light channels like warning; only the decorative icon carries the raw channel (the border is a softer tint of it).

## Props

Status is not a prop: it comes from the surrounding `--loam-context` region (see the Contextualism guide).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | — | Bold heading rendered above the body. |
| `icon` | `ReactNode` | — | Icon rendered to the inline-start of the content. |
| `children` | `ReactNode` | — | Alert body content. |
| `role` | `string` | `"status"` | Live-region role. The polite default announces without interrupting; pass "alert" for a message that appears in response to an action and must interrupt. |
| `...others` | `HTMLAttributes<HTMLDivElement>` | — | All native <div> props are forwarded. |

