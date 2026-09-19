"use client";

import { Radio, RadioGroup, Field } from "@loamui/core";

export function RadioBasicDemo() {
  return (
    <RadioGroup.Root defaultValue="system">
      <RadioGroup.Legend>Theme</RadioGroup.Legend>
      <Field.Item>
        <Field.Label>
          <Radio value="system" /> System
        </Field.Label>
      </Field.Item>
      <Field.Item>
        <Field.Label>
          <Radio value="light" /> Light
        </Field.Label>
      </Field.Item>
      <Field.Item>
        <Field.Label>
          <Radio value="dark" /> Dark
        </Field.Label>
      </Field.Item>
    </RadioGroup.Root>
  );
}

export function RadioDescriptionsDemo() {
  return (
    <RadioGroup.Root>
      <RadioGroup.Legend>Delivery</RadioGroup.Legend>
      <Field.Item>
        <Field.Label>
          <Radio value="standard" /> Standard
        </Field.Label>
        <Field.Description>Arrives in 3-5 business days.</Field.Description>
      </Field.Item>
      <Field.Item>
        <Field.Label>
          <Radio value="express" /> Express
        </Field.Label>
        <Field.Description>Guaranteed next-day delivery.</Field.Description>
      </Field.Item>
    </RadioGroup.Root>
  );
}

export function RadioHorizontalDemo() {
  return (
    <RadioGroup.Root orientation="horizontal">
      <RadioGroup.Legend>Contact preference</RadioGroup.Legend>
      <Field.Item>
        <Field.Label>
          <Radio value="email" /> Email
        </Field.Label>
      </Field.Item>
      <Field.Item>
        <Field.Label>
          <Radio value="phone" /> Phone
        </Field.Label>
      </Field.Item>
    </RadioGroup.Root>
  );
}

export function RadioDisabledDemo() {
  return (
    <RadioGroup.Root>
      <RadioGroup.Legend>Plan</RadioGroup.Legend>
      <Field.Item>
        <Field.Label>
          <Radio value="basic" /> Basic
        </Field.Label>
      </Field.Item>
      <Field.Item>
        <Field.Label>
          <Radio value="pro" /> Pro
        </Field.Label>
      </Field.Item>
      <Field.Item>
        <Field.Label>
          <Radio value="legacy" disabled /> Legacy
        </Field.Label>
      </Field.Item>
    </RadioGroup.Root>
  );
}

export function RadioGroupErrorDemo() {
  return (
    <RadioGroup.Root invalid>
      <RadioGroup.Legend>Plan</RadioGroup.Legend>
      <RadioGroup.Description>You can change it later.</RadioGroup.Description>
      <RadioGroup.Error>Select a plan to continue</RadioGroup.Error>
      <Field.Item>
        <Field.Label>
          <Radio value="basic" /> Basic
        </Field.Label>
      </Field.Item>
      <Field.Item>
        <Field.Label>
          <Radio value="pro" /> Pro
        </Field.Label>
      </Field.Item>
      <Field.Item>
        <Field.Label>
          <Radio value="legacy" /> Legacy
        </Field.Label>
      </Field.Item>
    </RadioGroup.Root>
  );
}

export function RadioGroupLabelsDemo() {
  return (
    <RadioGroup.Root invalid labels={{ optional: "(facultatif)", errorPrefix: "Erreur : " }}>
      <RadioGroup.Legend optional>Formule</RadioGroup.Legend>
      <RadioGroup.Error>Choisissez une formule</RadioGroup.Error>
      <Field.Item>
        <Field.Label>
          <Radio value="basic" /> Essentielle
        </Field.Label>
      </Field.Item>
      <Field.Item>
        <Field.Label>
          <Radio value="pro" /> Pro
        </Field.Label>
      </Field.Item>
    </RadioGroup.Root>
  );
}
