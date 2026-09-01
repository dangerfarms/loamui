import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { Progress } from "../../index";

const meta = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  args: {
    "aria-label": "Upload progress",
    value: 60,
    size: "md",
    striped: false,
    animated: false,
    label: false,
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Fills with the primary token, re-coloured by any context region " +
          "(`--loam-context` on a region), not by props.",
      },
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/**
 * The bar IS the primary token, so a `--loam-context` region — any
 * ancestor; a one-element region is a wrapper — recolours it through the
 * token remap alone.
 */
export const Contexts: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Progress {...args} aria-label="Primary progress" />
      <div style={{ "--loam-context": "success" } as CSSProperties}>
        <Progress {...args} aria-label="Success progress" />
      </div>
      <div style={{ "--loam-context": "warning" } as CSSProperties}>
        <Progress {...args} aria-label="Warning progress" />
      </div>
      <div style={{ "--loam-context": "info" } as CSSProperties}>
        <Progress {...args} aria-label="Info progress" />
      </div>
      <div style={{ "--loam-context": "danger" } as CSSProperties}>
        <Progress {...args} aria-label="Danger progress" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Progress {...args} aria-label="Small progress" size="sm" />
      <Progress {...args} aria-label="Medium progress" size="md" />
      <Progress {...args} aria-label="Large progress" size="lg" />
    </div>
  ),
};

export const WithLabel: Story = {
  args: { value: 72, label: true },
};

export const Striped: Story = {
  args: { value: 45, striped: true, animated: true },
};
