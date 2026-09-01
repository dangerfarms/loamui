"use client";

import { Fieldset, Checkbox, Radio, RadioGroup } from "@loamui/core";

export function FieldsetCheckboxDemo() {
  return (
    <Fieldset.Root style={{ maxInlineSize: "22rem" }}>
      <Fieldset.Legend>Email notifications</Fieldset.Legend>
      <Checkbox label="Product updates" defaultChecked />
      <Checkbox label="Security alerts" defaultChecked />
      <Checkbox label="Marketing" />
    </Fieldset.Root>
  );
}

export function FieldsetOptionalDemo() {
  return (
    <Fieldset.Root style={{ maxInlineSize: "22rem" }}>
      <Fieldset.Legend optional>Interests</Fieldset.Legend>
      <Checkbox label="Design" />
      <Checkbox label="Engineering" />
    </Fieldset.Root>
  );
}

export function FieldsetRadioDemo() {
  return (
    <RadioGroup label="Plan" name="plan" defaultValue="pro">
      <Radio value="free" label="Free" />
      <Radio value="pro" label="Pro" />
      <Radio value="team" label="Team" />
    </RadioGroup>
  );
}
