"use client";

import { useState } from "react";
import { Field, Input, Range } from "@loamui/core";
import "./example.css";

const MIN = 10;
const MAX = 30;

export default function Example() {
  const [value, setValue] = useState(20);
  // What the box shows can lag the value: a half-typed number is not yet
  // a temperature, and clearing the box is not asking for zero.
  const [text, setText] = useState("20");

  const settle = (next: number) => {
    const clamped = Math.min(MAX, Math.max(MIN, next));
    setValue(clamped);
    setText(String(clamped));
  };

  return (
    <Field.Root className="number-input-with-slider" id="propagator">
      <Field.Label id="propagator-label">Propagator temperature</Field.Label>
      <Field.Description>
        Between {MIN} and {MAX} °C. Most seed germinates fastest around 20.
      </Field.Description>
      <div className="row">
        <Input
          name="temperature"
          inputMode="numeric"
          pattern="[0-9]*"
          size={3}
          value={text}
          endSection={<span aria-hidden="true">°C</span>}
          onChange={(event) => {
            const raw = event.currentTarget.value;
            setText(raw);
            const n = Number(raw);
            if (raw !== "" && Number.isInteger(n) && n >= MIN && n <= MAX) setValue(n);
          }}
          onBlur={() => settle(text === "" ? value : Number(text))}
        />
        <Range
          id="propagator-slider"
          aria-labelledby="propagator-label"
          min={MIN}
          max={MAX}
          step={1}
          value={value}
          onChange={(event) => settle(event.currentTarget.valueAsNumber)}
        />
      </div>
    </Field.Root>
  );
}
