---
title: Settings rows
description: A group of preferences, each a label, a line explaining it and the control that sets it on one row, with one that could not be saved.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Settings rows

A group of preferences, each a label, a line explaining it and the control that sets it on one row, with one that could not be saved.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Checkbox`, `Field`, `Fieldset`, `Select`, `Switch`
- Tags: preferences, settings, toggles, notifications, account
- Live: https://loamui.com/examples/forms/settings-rows

## Built to the pillars

- **Native CSS.** A native fieldset names the group, and each row's label is the control's real <label>, so clicking the words flips the switch; the wiring is core Field's, not the switch's, which is why a Select and a Checkbox sit in the same slot labelled and described the same way.
- **Modern CSS.** The row's grid is rooted inside the Field that wires it, and the error auto-places under the words; below 24rem the control drops beneath the words, decided by the stack's own width.
- **Composition.** Each row is a core Field holding the example's own two columns; Field.Label, Field.Description and Field.Error keep the look core gives them and the bare controls read their ids from the Field.
- **Contextualism.** The separator is a border, not a background, so it survives forced colours without a treatment of its own.
- **Accessible & gatekept.** A setting that acts on its own can still fail: the last row's Field.Error says what happened and what to do in the words of the setting, marks the switch invalid, joins the message to it and announces it, and the switch keeps the state the visitor chose rather than flipping back.

## Example.tsx

```tsx
"use client";

import { Checkbox, Field, Fieldset, Select, Switch } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Fieldset.Root className="settings-rows">
      <Fieldset.Legend>Notifications</Fieldset.Legend>
      <div className="rows">
        <Field.Root>
          <div className="row">
            <div className="text">
              <Field.Label>Order updates</Field.Label>
              <Field.Description>
                An email when an order is packed and again when it is posted.
              </Field.Description>
            </div>
            <div className="control">
              <Switch.Control name="orderUpdates" defaultChecked />
            </div>
          </div>
        </Field.Root>
        <Field.Root>
          <div className="row">
            <div className="text">
              <Field.Label>Sowing reminders</Field.Label>
              <Field.Description>
                What to sow this month, for the seed you have bought.
              </Field.Description>
            </div>
            <div className="control">
              <Select name="reminders" defaultValue="monthly">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="never">Never</option>
              </Select>
            </div>
          </div>
        </Field.Root>
        <Field.Root>
          <div className="row">
            <div className="text">
              <Field.Label>Seasonal newsletter</Field.Label>
              <Field.Description>News from the co-op, four times a year.</Field.Description>
            </div>
            <div className="control">
              <Checkbox.Control name="newsletter" />
            </div>
          </div>
        </Field.Root>
        <Field.Root>
          <div className="row">
            <div className="text">
              <Field.Label>Text message alerts</Field.Label>
              <Field.Description>A text when a courier is on the way.</Field.Description>
            </div>
            <div className="control">
              <Switch.Control name="textAlerts" defaultChecked />
            </div>
            <Field.Error>Add a mobile number to your account before turning this on</Field.Error>
          </div>
        </Field.Root>
      </div>
    </Fieldset.Root>
  );
}
```

## example.css

```css
@scope (.settings-rows) to ([class*="loam-"]) {
  div.rows {
    container-type: inline-size;
    display: block grid;
  }
}

@scope (.settings-rows div.row) to ([class*="loam-"]) {
  :scope {
    align-items: center;
    border-block-end: 1px solid var(--loam-color-line);
    display: block grid;
    gap: var(--loam-space-xs) var(--loam-space-lg);
    grid-template-columns: minmax(0, 1fr) auto;
    padding-block: var(--loam-space-md);
  }

  div.text {
    display: block grid;
    gap: var(--loam-space-xs);
    grid-column: 1;
  }

  div.control {
    align-items: center;
    display: block flex;
    grid-column: 2;
    justify-content: end;
  }

  @container (inline-size < 24rem) {
    :scope {
      grid-template-columns: minmax(0, 1fr);
    }

    div.control {
      grid-column: 1;
      justify-content: start;
    }
  }
}
```

