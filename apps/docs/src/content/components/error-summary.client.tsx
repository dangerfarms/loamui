"use client";

import { useState } from "react";
import { Button, ErrorSummary, Field, Input } from "@loamui/core";

export function ErrorSummaryDemo() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <form
      style={{ display: "grid", gap: "1rem", inlineSize: "100%" }}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      {submitted && (
        <ErrorSummary.Root>
          <ErrorSummary.Title />
          <ErrorSummary.List>
            <ErrorSummary.Item href="#demo-email">Enter your email address</ErrorSummary.Item>
          </ErrorSummary.List>
        </ErrorSummary.Root>
      )}
      <Field.Root id="demo-email">
        <Field.Label>Email address</Field.Label>
        <Field.Error>{submitted ? "Enter your email address" : undefined}</Field.Error>
        <Input />
      </Field.Root>
      <div>
        <Button type="submit">Save and continue</Button>
      </div>
    </form>
  );
}
