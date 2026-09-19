"use client";

import { Fieldset, Checkbox, Radio, RadioGroup, Field } from "@loamui/core";

export function FieldsetCheckboxDemo() {
  return (
    <Fieldset.Root style={{ maxInlineSize: "22rem" }}>
      <Fieldset.Legend>Email notifications</Fieldset.Legend>
      <Field.Item>
        <Field.Label>
          <Checkbox defaultChecked /> Product updates
        </Field.Label>
      </Field.Item>
      <Field.Item>
        <Field.Label>
          <Checkbox defaultChecked /> Security alerts
        </Field.Label>
      </Field.Item>
      <Field.Item>
        <Field.Label>
          <Checkbox /> Marketing
        </Field.Label>
      </Field.Item>
    </Fieldset.Root>
  );
}

export function FieldsetOptionalDemo() {
  return (
    <Fieldset.Root style={{ maxInlineSize: "22rem" }}>
      <Fieldset.Legend optional>Interests</Fieldset.Legend>
      <Field.Item>
        <Field.Label>
          <Checkbox /> Design
        </Field.Label>
      </Field.Item>
      <Field.Item>
        <Field.Label>
          <Checkbox /> Engineering
        </Field.Label>
      </Field.Item>
    </Fieldset.Root>
  );
}

export function FieldsetRadioDemo() {
  return (
    <RadioGroup.Root name="plan" defaultValue="pro">
      <RadioGroup.Legend>Plan</RadioGroup.Legend>
      <Field.Item>
        <Field.Label>
          <Radio value="free" /> Free
        </Field.Label>
      </Field.Item>
      <Field.Item>
        <Field.Label>
          <Radio value="pro" /> Pro
        </Field.Label>
      </Field.Item>
      <Field.Item>
        <Field.Label>
          <Radio value="team" /> Team
        </Field.Label>
      </Field.Item>
    </RadioGroup.Root>
  );
}
