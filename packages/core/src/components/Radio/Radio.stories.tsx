import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio, RadioGroup, Field } from "../../index.js";

const cropOptions = (
  <>
    <Field.Item>
      <Field.Label>
        <Radio value="wheat" /> Wheat
      </Field.Label>
    </Field.Item>
    <Field.Item>
      <Field.Label>
        <Radio value="barley" /> Barley
      </Field.Label>
    </Field.Item>
    <Field.Item>
      <Field.Label>
        <Radio value="oats" /> Oats
      </Field.Label>
    </Field.Item>
  </>
);

const meta = {
  title: "Inputs/Radio",
  component: RadioGroup.Root,
  tags: ["autodocs"],
  args: {
    defaultValue: "wheat",
    orientation: "vertical",
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["vertical", "horizontal"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Labels and lays out a set of mutually exclusive options that " +
          "share one `name`, so native inputs enforce exclusivity. The Root " +
          "is a Fieldset; Legend, Description and Error are parts, and the " +
          "options are `<Radio>` children participating via context at any " +
          "depth. The group holds no state — go uncontrolled (`defaultValue`) " +
          "or controlled (`value` + `onChange`).",
      },
    },
  },
  render: (args) => (
    <RadioGroup.Root {...args}>
      <RadioGroup.Legend>Crop</RadioGroup.Legend>
      <RadioGroup.Description>Choose the primary crop for this field.</RadioGroup.Description>
      {cropOptions}
    </RadioGroup.Root>
  ),
} satisfies Meta<typeof RadioGroup.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
};

/** An Error with content puts the group in the invalid state; every radio answers it. */
export const WithError: Story = {
  args: { defaultValue: undefined },
  render: (args) => (
    <RadioGroup.Root invalid {...args}>
      <RadioGroup.Legend>Crop</RadioGroup.Legend>
      <RadioGroup.Error>Select a crop</RadioGroup.Error>
      {cropOptions}
    </RadioGroup.Root>
  ),
};

export const OptionDescriptions: Story = {
  render: (args) => (
    <RadioGroup.Root {...args} defaultValue="active">
      <RadioGroup.Legend>Field status</RadioGroup.Legend>
      <Field.Item>
        <Field.Label>
          <Radio value="active" /> Active
        </Field.Label>
      </Field.Item>
      <Field.Item>
        <Field.Label>
          <Radio value="fallow" /> Fallow
        </Field.Label>
        <Field.Description>Resting this season</Field.Description>
      </Field.Item>
      <Field.Item>
        <Field.Label>
          <Radio value="retired" disabled /> Retired
        </Field.Label>
      </Field.Item>
    </RadioGroup.Root>
  ),
};

/** The group's own words come from `labels`; the legend's optional marker among them. */
export const InAnotherLanguage: Story = {
  render: (args) => (
    <RadioGroup.Root
      invalid
      {...args}
      labels={{ optional: "(facultatif)", errorPrefix: "Erreur : " }}
    >
      <RadioGroup.Legend optional>Culture</RadioGroup.Legend>
      <RadioGroup.Error>Choisissez une culture</RadioGroup.Error>
      <Field.Item>
        <Field.Label>
          <Radio value="wheat" /> Blé
        </Field.Label>
      </Field.Item>
      <Field.Item>
        <Field.Label>
          <Radio value="barley" /> Orge
        </Field.Label>
      </Field.Item>
    </RadioGroup.Root>
  ),
};
