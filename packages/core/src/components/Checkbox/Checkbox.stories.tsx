import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, CheckboxControl, Field } from "../../index";

const meta = {
  title: "Inputs/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'A native `<input type="checkbox">` painted with the platform\'s own ' +
          "`accent-color`. The `label`/`description` props render an accessible " +
          "inline row; without them you get the bare control, which self-wires " +
          "when placed inside a `Field`.",
      },
    },
  },
  args: {
    label: "I accept the terms and conditions",
    indeterminate: false,
    disabled: false,
    defaultChecked: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Checked: Story = {
  args: { label: "Subscribe to the newsletter", defaultChecked: true },
};

export const Required: Story = {
  args: { label: "Accept the terms", required: true },
};

export const Indeterminate: Story = {
  args: { label: "Select all", indeterminate: true },
};

export const WithDescription: Story = {
  args: {
    label: "Enable notifications",
    description: "We'll email you when something important happens.",
  },
};

export const WithError: Story = {
  render: (args) => (
    <Field.Root>
      <Field.Error>You must accept the terms to continue.</Field.Error>
      <Checkbox {...args} label="I accept the terms and conditions" />
    </Field.Root>
  ),
};

export const Disabled: Story = {
  args: { label: "Unavailable option", disabled: true },
};

/**
 * A label-less `CheckboxControl` self-wires from the surrounding Field: it reads
 * its id from `Field.Root` (so `Field.Label` points at it) plus any
 * `aria-describedby`/`aria-invalid`, with no label or error props of its own.
 */
export const SelfWiringInField: Story = {
  render: () => (
    <Field.Root>
      <Field.Label>I accept the terms and conditions</Field.Label>
      <CheckboxControl />
    </Field.Root>
  ),
};
