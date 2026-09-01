import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, Input } from "../../index";

const meta = {
  title: "Inputs/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "you@example.com",
    disabled: false,
  },
  render: (args) => (
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <Input {...args} />
    </Field.Root>
  ),
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/**
 * There is no size prop: padding and font are fluid container-relative
 * tokens, so the control adapts to the space it lives in — and always
 * height-aligns with Button, which shares the same derived anatomy.
 */
export const FluidSizing: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <div
        style={{
          containerType: "inline-size",
          inlineSize: "16rem",
          padding: "1rem",
          border: "1px dashed var(--loam-color-line)",
        }}
      >
        <Field.Root>
          <Field.Label>In a narrow container</Field.Label>
          <Input />
        </Field.Root>
      </div>
      <div
        style={{
          containerType: "inline-size",
          inlineSize: "32rem",
          padding: "1rem",
          border: "1px dashed var(--loam-color-line)",
        }}
      >
        <Field.Root>
          <Field.Label>In a wide one</Field.Label>
          <Input />
        </Field.Root>
      </div>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Field.Root>
      <Field.Label>Username</Field.Label>
      <Field.Description>This is how your name appears to others.</Field.Description>
      <Input />
    </Field.Root>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <Field.Error>Enter an email address in the correct format, like name@example.com</Field.Error>
      <Input defaultValue="not-an-email" />
    </Field.Root>
  ),
};

export const Required: Story = {
  render: () => (
    <Field.Root>
      <Field.Label>Full name</Field.Label>
      <Input required />
    </Field.Root>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};
