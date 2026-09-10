"use client";

import { Field, FileInput } from "@loamui/core";

export function FileInputOneDemo() {
  return (
    <div style={{ maxInlineSize: "24rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Passport scan</Field.Label>
        <Field.Description>PDF or PNG, up to 5 MB</Field.Description>
        <FileInput.Root>
          <FileInput.Control accept=".pdf,.png" />
          <FileInput.Prompt>Choose a file or drop it here</FileInput.Prompt>
          <FileInput.Files />
        </FileInput.Root>
      </Field.Root>
    </div>
  );
}

export function FileInputManyDemo() {
  return (
    <div style={{ maxInlineSize: "24rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Supporting documents</Field.Label>
        <Field.Description>PDF or PNG, up to 5 MB each</Field.Description>
        <FileInput.Root>
          <FileInput.Control accept=".pdf,.png" multiple />
          <FileInput.Prompt>Choose files or drop them here</FileInput.Prompt>
          <FileInput.Files />
        </FileInput.Root>
      </Field.Root>
    </div>
  );
}

export function FileInputDraggingDemo() {
  return (
    <div style={{ maxInlineSize: "24rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Passport scan</Field.Label>
        <Field.Description>PDF or PNG, up to 5 MB</Field.Description>
        <FileInput.Root data-dragging>
          <FileInput.Control accept=".pdf,.png" />
          <FileInput.Prompt>Choose a file or drop it here</FileInput.Prompt>
          <FileInput.Files />
        </FileInput.Root>
      </Field.Root>
    </div>
  );
}

export function FileInputErrorDemo() {
  return (
    <div style={{ maxInlineSize: "24rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Passport scan</Field.Label>
        <Field.Description>PDF or PNG, up to 5 MB</Field.Description>
        <Field.Error>Choose a file smaller than 5 MB</Field.Error>
        <FileInput.Root>
          <FileInput.Control accept=".pdf,.png" />
          <FileInput.Prompt>Choose a file or drop it here</FileInput.Prompt>
          <FileInput.Files />
        </FileInput.Root>
      </Field.Root>
    </div>
  );
}
