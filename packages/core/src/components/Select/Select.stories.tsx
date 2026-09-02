import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, Select } from "../../index";

const frameworkOptions = (
  <>
    <option value="react">React</option>
    <option value="vue">Vue</option>
    <option value="svelte">Svelte</option>
    <option value="solid">Solid</option>
  </>
);

const meta = {
  title: "Inputs/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A native `<select>` in the shared control box, with a fluid " +
          "chevron; options are children (`<option>` / `<optgroup>`), exactly " +
          "as the platform defines them. Label it by composing Field — the " +
          "control reads its wiring from the surrounding `Field.Root`.",
      },
    },
  },
  args: {
    placeholder: "Pick one",
    children: frameworkOptions,
    disabled: false,
  },
  render: (args) => (
    <Field.Root>
      <Field.Label>Framework</Field.Label>
      <Select {...args} />
    </Field.Root>
  ),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Grouped: Story = {
  render: () => (
    <Field.Root>
      <Field.Label>Instrument</Field.Label>
      <Select>
        <optgroup label="Strings">
          <option>Violin</option>
          <option>Cello</option>
        </optgroup>
        <optgroup label="Brass">
          <option>Trumpet</option>
          <option disabled>Tuba (unavailable)</option>
        </optgroup>
      </Select>
    </Field.Root>
  ),
};

export const WithDescription: Story = {
  render: (args) => (
    <Field.Root>
      <Field.Label>Framework</Field.Label>
      <Field.Description>You can change this later in settings.</Field.Description>
      <Select {...args} />
    </Field.Root>
  ),
};

export const WithError: Story = {
  render: (args) => (
    <Field.Root>
      <Field.Label>Framework</Field.Label>
      <Field.Error>Select a framework</Field.Error>
      <Select {...args} />
    </Field.Root>
  ),
};

export const Required: Story = {
  render: (args) => (
    <Field.Root>
      <Field.Label>Framework</Field.Label>
      <Select {...args} required />
    </Field.Root>
  ),
};

export const Disabled: Story = {
  args: { defaultValue: "react", disabled: true },
};
