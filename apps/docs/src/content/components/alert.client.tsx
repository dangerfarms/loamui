"use client";

import { useState } from "react";
import { Alert, Button } from "@loamui/core";
import type { CSSProperties } from "react";

export function AlertDismissibleDemo() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ display: "grid", gap: "0.75rem", inlineSize: "100%", justifyItems: "start" }}>
      {open ? (
        <Alert title="Draft restored" onClose={() => setOpen(false)}>
          We recovered the draft you were editing.
        </Alert>
      ) : (
        <Button onClick={() => setOpen(true)}>Show the alert again</Button>
      )}
    </div>
  );
}

export function AlertComposedDemo() {
  const [open, setOpen] = useState(true);
  return (
    <div
      style={
        {
          "--loam-context": "warning",
          display: "grid",
          gap: "0.75rem",
          inlineSize: "100%",
          justifyItems: "start",
        } as CSSProperties
      }
    >
      {open ? (
        <Alert.Root>
          <Alert.Icon>
            <span aria-hidden>⚠</span>
          </Alert.Icon>
          <Alert.Body>
            <Alert.Title render={<h2 />}>Storage almost full</Alert.Title>
            <Alert.Description>Free up space to keep syncing.</Alert.Description>
          </Alert.Body>
          <Alert.Close onClose={() => setOpen(false)} labels={{ close: "Hide this warning" }} />
        </Alert.Root>
      ) : (
        <Button onClick={() => setOpen(true)}>Show the warning again</Button>
      )}
    </div>
  );
}
