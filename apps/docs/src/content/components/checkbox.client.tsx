"use client";

import { Checkbox, Field } from "@loamui/core";

export function CheckboxErrorDemo() {
  return (
    <Field.Root invalid>
      <Field.Error>Accept the terms of service to continue</Field.Error>
      <>
        <Field.Label>
          <Checkbox /> Accept the terms of service
        </Field.Label>
      </>
    </Field.Root>
  );
}

export function CheckboxFieldDemo() {
  return (
    <Field.Root>
      <Field.Label>
        <Checkbox /> Subscribe to the newsletter
      </Field.Label>
      <Field.Description>A short summary, once a week.</Field.Description>
    </Field.Root>
  );
}
