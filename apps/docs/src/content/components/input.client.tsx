"use client";

import { Button, Field, Input } from "@farmui/core";

export function InputBasicDemo() {
  return (
    <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input />
      </Field.Root>
    </div>
  );
}

export function InputContainersDemo() {
  return (
    <div style={{ display: "grid", gap: "1rem", inlineSize: "100%" }}>
      <div
        style={{
          containerType: "inline-size",
          inlineSize: "16rem",
          maxInlineSize: "100%",
          padding: "0.75rem",
          border: "1px dashed var(--fui-color-line)",
          borderRadius: "var(--fui-radius-md)",
        }}
      >
        <Field.Root>
          <Field.Label>In a narrow container</Field.Label>
          <Input />
        </Field.Root>
      </div>
      <div
        style={{
          containerType: "inline-size",
          inlineSize: "30rem",
          maxInlineSize: "100%",
          padding: "0.75rem",
          border: "1px dashed var(--fui-color-line)",
          borderRadius: "var(--fui-radius-md)",
        }}
      >
        <Field.Root>
          <Field.Label>In a wide one</Field.Label>
          <Input />
        </Field.Root>
      </div>
    </div>
  );
}

export function InputDescriptionDemo() {
  return (
    <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Username</Field.Label>
        <Field.Description>This will be your public handle.</Field.Description>
        <Input required />
      </Field.Root>
    </div>
  );
}

export function InputErrorDemo() {
  return (
    <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Error>
          Enter an email address in the correct format, like name@example.com
        </Field.Error>
        <Input defaultValue="not-an-email" />
      </Field.Root>
    </div>
  );
}

export function InputNativeValidationDemo() {
  return (
    <form
      style={{ display: "grid", gap: "0.75rem", maxInlineSize: "20rem", inlineSize: "100%" }}
      onSubmit={(event) => event.preventDefault()}
    >
      <Field.Root>
        <Field.Label>Work email</Field.Label>
        <Input type="email" required />
      </Field.Root>
      <Button type="submit">Check email</Button>
    </form>
  );
}

export function InputNumericDemo() {
  return (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        maxInlineSize: "20rem",
        inlineSize: "100%",
      }}
    >
      <Field.Root>
        <Field.Label>Account number</Field.Label>
        <Input inputMode="numeric" />
      </Field.Root>
      <Field.Root>
        <Field.Label>Weight in kilograms</Field.Label>
        <Input inputMode="decimal" />
      </Field.Root>
    </div>
  );
}

export function InputSectionsDemo() {
  return (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        maxInlineSize: "20rem",
        inlineSize: "100%",
      }}
    >
      <Field.Root>
        <Field.Label>Handle</Field.Label>
        <Input leftSection="@" />
      </Field.Root>
      <Field.Root>
        <Field.Label>Site name</Field.Label>
        <Input rightSection=".dev" />
      </Field.Root>
    </div>
  );
}

export function InputAutofillDemo() {
  return (
    <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input type="email" autoComplete="email" />
      </Field.Root>
    </div>
  );
}
