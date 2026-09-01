import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { Loader } from "../../index";

const meta = {
  title: "Feedback/Loader",
  component: Loader,
  tags: ["autodocs"],
  args: {
    size: "md",
    label: "Loading",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Coloured by the brand token — a `--loam-context` region " +
          "recolours it with no prop; a plain `color:` overrides.",
      },
    },
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <Loader {...args} label="Loading" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <Loader {...args} size="sm" label="Small loader" />
      <Loader {...args} size="md" label="Medium loader" />
      <Loader {...args} size="lg" label="Large loader" />
    </div>
  ),
};

/**
 * A `--loam-context` region recolours the loader through the brand token;
 * a plain `color:` declaration overrides.
 */
export const Contexts: Story = {
  render: (args) => {
    const primary = { color: "var(--loam-color-primary)" } as CSSProperties;
    return (
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Loader {...args} style={primary} label="Primary loader" />
        <span style={{ "--loam-context": "success" } as CSSProperties}>
          <Loader {...args} style={primary} label="Success loader" />
        </span>
        <span style={{ "--loam-context": "warning" } as CSSProperties}>
          <Loader {...args} style={primary} label="Warning loader" />
        </span>
        <span style={{ "--loam-context": "info" } as CSSProperties}>
          <Loader {...args} style={primary} label="Info loader" />
        </span>
        <span style={{ "--loam-context": "danger" } as CSSProperties}>
          <Loader {...args} style={primary} label="Danger loader" />
        </span>
      </div>
    );
  },
};
