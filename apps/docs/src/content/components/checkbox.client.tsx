"use client";

import { Checkbox, CheckboxControl, Field } from "@loamui/core";

export function CheckboxErrorDemo() {
  return (
    <Field.Root>
      <Field.Error>Accept the terms of service to continue</Field.Error>
      <Checkbox label="Accept the terms of service" />
    </Field.Root>
  );
}

export function CheckboxFieldDemo() {
  return (
    <Field.Root>
      <Field.Label>
        <CheckboxControl /> Subscribe to the newsletter
      </Field.Label>
      <Field.Description>A short summary, once a week.</Field.Description>
    </Field.Root>
  );
}
