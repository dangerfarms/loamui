import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, Switch, SwitchControl } from "../../index";

const meta = {
  title: "Inputs/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'An on/off toggle built on a native checkbox with `role="switch"`. ' +
          "Renders an accessible inline row when given `label`/`description`, or " +
          "the bare track alone, which self-wires inside a `Field`. Errors " +
          "compose via `Field.Error`.",
      },
    },
  },
  args: {
    label: "Enable irrigation",
    labelPosition: "end",
    defaultChecked: false,
    disabled: false,
  },
  argTypes: {
    labelPosition: { control: "inline-radio", options: ["start", "end"] },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const LabelPosition: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Switch {...args} labelPosition="end" label="Label after control" />
      <Switch {...args} labelPosition="start" label="Label before control" />
    </div>
  ),
};

export const WithDescription: Story = {
  args: {
    label: "Auto-renew",
    description: "Charges the card on file at the end of each cycle.",
  },
};

export const WithError: Story = {
  render: (args) => (
    <Field.Root>
      <Switch {...args} label="Two-factor authentication" />
      <Field.Error>Two-factor authentication must be on for admin accounts</Field.Error>
    </Field.Root>
  ),
};

export const Required: Story = {
  args: { label: "Accept audit logging", required: true },
};

/**
 * The bare `SwitchControl` self-wires from the surrounding Field, reading its id
 * and aria wiring from context; the inline-label form is the other shape, shown
 * elsewhere.
 */
export const SelfWiringInField: Story = {
  render: () => (
    <Field.Root>
      <Field.Label>
        <SwitchControl /> Enable irrigation
      </Field.Label>
    </Field.Root>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Switch {...args} label="Off" defaultChecked={false} />
      <Switch {...args} label="On" defaultChecked />
      <Switch {...args} label="Disabled off" disabled defaultChecked={false} />
      <Switch {...args} label="Disabled on" disabled defaultChecked />
    </div>
  ),
};
