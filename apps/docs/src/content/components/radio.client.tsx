"use client";

import { Radio, RadioGroup } from "@loamui/core";

export function RadioBasicDemo() {
  return (
    <RadioGroup.Root defaultValue="system">
      <RadioGroup.Legend>Theme</RadioGroup.Legend>
      <Radio value="system" label="System" />
      <Radio value="light" label="Light" />
      <Radio value="dark" label="Dark" />
    </RadioGroup.Root>
  );
}

export function RadioDescriptionsDemo() {
  return (
    <RadioGroup.Root>
      <RadioGroup.Legend>Delivery</RadioGroup.Legend>
      <Radio value="standard" label="Standard" description="Arrives in 3-5 business days." />
      <Radio value="express" label="Express" description="Guaranteed next-day delivery." />
    </RadioGroup.Root>
  );
}

export function RadioHorizontalDemo() {
  return (
    <RadioGroup.Root orientation="horizontal">
      <RadioGroup.Legend>Contact preference</RadioGroup.Legend>
      <Radio value="email" label="Email" />
      <Radio value="phone" label="Phone" />
    </RadioGroup.Root>
  );
}

export function RadioDisabledDemo() {
  return (
    <RadioGroup.Root>
      <RadioGroup.Legend>Plan</RadioGroup.Legend>
      <Radio value="basic" label="Basic" />
      <Radio value="pro" label="Pro" />
      <Radio value="legacy" label="Legacy" disabled />
    </RadioGroup.Root>
  );
}

export function RadioGroupErrorDemo() {
  return (
    <RadioGroup.Root>
      <RadioGroup.Legend>Plan</RadioGroup.Legend>
      <RadioGroup.Description>You can change it later.</RadioGroup.Description>
      <RadioGroup.Error>Select a plan to continue</RadioGroup.Error>
      <Radio value="basic" label="Basic" />
      <Radio value="pro" label="Pro" />
      <Radio value="legacy" label="Legacy" />
    </RadioGroup.Root>
  );
}

export function RadioGroupLabelsDemo() {
  return (
    <RadioGroup.Root labels={{ optional: "(facultatif)", errorPrefix: "Erreur : " }}>
      <RadioGroup.Legend optional>Formule</RadioGroup.Legend>
      <RadioGroup.Error>Choisissez une formule</RadioGroup.Error>
      <Radio value="basic" label="Essentielle" />
      <Radio value="pro" label="Pro" />
    </RadioGroup.Root>
  );
}
