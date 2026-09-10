"use client";

import { Field, Input } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Field.Root className="floating-label" id="full-name">
      <label htmlFor="full-name">Full name</label>
      {/* One space: :placeholder-shown is true exactly while the box is
          empty, and a space shows nothing. The label is never the hint. */}
      <Input name="name" autoComplete="name" placeholder=" " />
    </Field.Root>
  );
}
