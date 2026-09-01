"use client";

import { useState } from "react";
import { Field, Range } from "@loamui/core";

export function RangeFieldDemo() {
  return (
    <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Volume</Field.Label>
        <Field.Description>Applies to alerts only.</Field.Description>
        <Range defaultValue={70} />
      </Field.Root>
    </div>
  );
}

export function RangeStepsDemo() {
  return (
    <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Fertiliser (kg)</Field.Label>
        <Range min={0} max={100} step={10} defaultValue={30} />
      </Field.Root>
    </div>
  );
}

export function RangeDisabledDemo() {
  return (
    <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Locked</Field.Label>
        <Range defaultValue={50} disabled />
      </Field.Root>
    </div>
  );
}

export function RangeValueDemo() {
  const [volume, setVolume] = useState(70);
  return (
    <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Volume: {volume}</Field.Label>
        <Range value={volume} onChange={(e) => setVolume(e.target.valueAsNumber)} />
      </Field.Root>
    </div>
  );
}
