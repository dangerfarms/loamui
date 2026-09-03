---
title: Toast
description: Transient notifications.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Toast

Transient notifications announced by native live regions and rendered in the browser's top layer.

## Import

```tsx
import { Button, Toast, Toasts, useToast } from "@loamui/core";
```

## Usage

### Basic usage

Mount Toast.Provider once near the app root with the ready-made <Toasts /> viewport, then fire toasts from anywhere below with the useToast hook. The viewport renders with popover="manual": the browser's top layer, above every dialog, with no z-index management.

```tsx
function SaveButton() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast.add({ title: "Saved", description: "Your changes are live." })
      }
    >
      Save changes
    </Button>
  );
}

// once, near the app root
<Toast.Provider>
  <SaveButton />
  <Toasts />
</Toast.Provider>
```

### With an action

An optional action renders as a button inside the toast, the classic Undo. Activating it runs the handler and dismisses the toast. Keep it to one action; anything more deserves a place in the page.

```tsx
function ArchiveButton() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast.add({
          title: "Message archived",
          action: {
            label: "Undo",
            onClick: () => toast.add({ title: "Message restored" }),
          },
        })
      }
    >
      Archive
    </Button>
  );
}
```

### High priority

A high-priority toast looks the same but is announced assertively (role="alert") and interrupts what a screen reader is saying, rather than waiting politely. See the guidance below on when the interruption is earned.

```tsx
toast.add({
  title: "Connection lost",
  description: "Trying to reconnect…",
  priority: "high",
});
```

### Persistent

timeout: 0 keeps a toast on screen until the user dismisses it, for messages that must not slip by, like a finished export waiting to be downloaded.

```tsx
toast.add({
  title: "Export ready",
  description: "Stays until you dismiss it.",
  timeout: 0,
});
```

## When to use it

- To confirm the outcome of an action the user just took (saved, sent, archived) without interrupting their flow.
- For background events that complete while the user is elsewhere: an export finishing, a sync completing.

## When not to

- For errors the user must fix: show the error where the problem is (Field errors, or an Alert in place); a message that disappears cannot be acted on.
- As the only record of something important: toasts vanish, so anything the user may need later must also exist in the page.
- For messages that require a decision, use Modal, which holds focus until the user answers.

## How it works

### Confirm outcomes; never ask questions

A toast states what just happened: saved, sent, restored. It disappears on its own, so a message that expects a decision has the wrong container: use Modal for questions, an Alert in the page for conditions that persist.

### Reserve high priority for failures

priority: "high" renders role="alert", which interrupts whatever a screen reader is saying. That cost is justified when something the user attempted has failed, and almost never otherwise. Success confirmations use the default polite announcement.

### An action in a toast must exist somewhere else too

Undo in a toast is a courtesy, not the mechanism. Timers pause while the pointer or focus is inside the viewport (WCAG 2.2.1), but the toast still disappears, so any action it offers must remain reachable in the page after it is gone.

### F6 reaches the viewport

The toast region is a labelled landmark, and F6 jumps focus into it from anywhere; that is how a keyboard user reaches an action before the timer ends. Keeping that path clear takes no effort: just don't wrap toasts in extra focusable chrome.

## Accessibility

- Each toast is a native live region: role="status" by default, role="alert" at high priority.
- The notifications region is role="region", labelled "Notifications", and never traps focus.
- Auto-dismiss timers pause while the pointer or keyboard focus is inside the viewport and resume with the remaining time (WCAG 2.2.1 Timing Adjustable).
- The viewport renders with popover="manual": the browser's top layer places it above every dialog and popover with no z-index war, and nothing can light-dismiss it.
- The default dismiss button carries an explicit aria-label ("Dismiss notification").

## Parts

### Toast.Provider

Owns the toast queue; mount once near the app root.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `timeout` | `number` | `5000` | Default auto-dismiss delay in ms. |
| `limit` | `number` | `3` | Most toasts shown at once; the oldest closes first. |

### Toasts

The ready-made viewport: renders every active toast with title, description, action and a dismiss button. Compose the parts below yourself only when this layout doesn't fit.

### Toast.Viewport

The top-layer notifications region for a custom layout; all native <div> props are forwarded.

### Toast.Root

Renders one toast; its live-region role comes from the toast's priority. Native <div> props are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `toast` | `ToastData` | — | The toast being rendered (from useToast().toasts). |

### Toast.Title

The toast's heading; native <div> props are forwarded.

### Toast.Description

The toast's message body; native <div> props are forwarded.

### Toast.Action

A LoamUI Button inside a toast; activating it runs onAction and dismisses that toast. Native <button> props are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `toastId` | `string` | — | Which toast the action belongs to. |
| `onAction` | `() => void` | — | Runs before the toast dismisses. |
| `render` | `element \| (props) => node` | — | Substitute your own element; it receives the action wiring. |

### Toast.Close

A labelled dismiss button ("Dismiss notification") with a default × icon. Native <button> props are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `toastId` | `string` | — | Which toast to dismiss. |

## Hooks

### useToast

Fire and dismiss toasts from anywhere under the Provider. add(options) returns the toast's id, and adding again with the same id updates in place; close(id) dismisses one toast, or all when the id is omitted.

```tsx
const { toasts, add, close } = useToast();
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | — | Short heading. |
| `description` | `ReactNode` | — | The message body. |
| `action` | `{ label, onClick }` | — | Optional action rendered as a button, e.g. Undo. |
| `priority` | `"normal" \| "high"` | `"normal"` | high announces assertively (role="alert"); reserve it for urgent, time-sensitive messages. |
| `timeout` | `number` | — | Overrides the Provider default; 0 keeps the toast until dismissed. |
| `id` | `string` | — | Stable id; adding again with the same id updates the toast in place. |

