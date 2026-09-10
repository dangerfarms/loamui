"use client";

import { Field, Switch } from "@loamui/core";

export function SwitchFieldDemo() {
  return (
    <Field.Root>
      <Field.Label>
        <Switch.Control defaultChecked /> Email notifications
      </Field.Label>
      <Field.Description>Sent at most once a day.</Field.Description>
    </Field.Root>
  );
}
