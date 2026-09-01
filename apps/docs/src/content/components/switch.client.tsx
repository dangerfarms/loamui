"use client";

import { Field, SwitchControl } from "@loamui/core";

export function SwitchFieldDemo() {
  return (
    <Field.Root>
      <Field.Label>
        <SwitchControl defaultChecked /> Email notifications
      </Field.Label>
      <Field.Description>Sent at most once a day.</Field.Description>
    </Field.Root>
  );
}
