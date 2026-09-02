import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio, RadioGroup } from "../../index";

const cropOptions = (
  <>
    <Radio value="wheat" label="Wheat" />
    <Radio value="barley" label="Barley" />
    <Radio value="oats" label="Oats" />
  </>
);

const meta = {
  title: "Inputs/Radio",
  component: RadioGroup,
  tags: ["autodocs"],
  args: {
    label: "Crop",
    description: "Choose the primary crop for this field.",
    children: cropOptions,
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
          "share one `name`, so native inputs enforce exclusivity. Options " +
          "are `<Radio>` children participating via context at any depth; " +
          "the group holds no state — go uncontrolled (`defaultValue`) or " +
          "controlled (`value` + `onChange`).",
      },
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
};

export const WithError: Story = {
  args: {
    error: "Select a crop",
    defaultValue: undefined,
  },
};

export const OptionDescriptions: Story = {
  render: (args) => (
    <RadioGroup {...args} label="Field status" defaultValue="active">
      <Radio value="active" label="Active" />
      <Radio value="fallow" label="Fallow" description="Resting this season" />
      <Radio value="retired" label="Retired" disabled />
    </RadioGroup>
  ),
};
