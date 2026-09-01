import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { Badge } from "../../index";

const meta = {
  title: "Data display/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
    size: "md",
    dot: false,
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Neutral by default — status is declared by context " +
          "(`--loam-context` on an ancestor region — a wrapper for a " +
          "single badge), not by props.",
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Neutral by default — there is no variant or color prop. */
export const Default: Story = {};

/**
 * Declare `--loam-context` on a region — any ancestor; a one-element region
 * is a wrapper — and the tint and text derive from that status's colour.
 */
export const Contexts: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <Badge {...args}>Neutral</Badge>
      <span style={{ "--loam-context": "primary" } as CSSProperties}>
        <Badge {...args}>Primary</Badge>
      </span>
      <span style={{ "--loam-context": "success" } as CSSProperties}>
        <Badge {...args}>Success</Badge>
      </span>
      <span style={{ "--loam-context": "warning" } as CSSProperties}>
        <Badge {...args}>Warning</Badge>
      </span>
      <span style={{ "--loam-context": "info" } as CSSProperties}>
        <Badge {...args}>Info</Badge>
      </span>
      <span style={{ "--loam-context": "danger" } as CSSProperties}>
        <Badge {...args}>Danger</Badge>
      </span>
    </div>
  ),
};

/** The status dot is semantics, not emphasis — it follows the context. */
export const WithDot: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <Badge {...args} dot>
        Offline
      </Badge>
      <span style={{ "--loam-context": "success" } as CSSProperties}>
        <Badge {...args} dot>
          Online
        </Badge>
      </span>
      <span style={{ "--loam-context": "warning" } as CSSProperties}>
        <Badge {...args} dot>
          Degraded
        </Badge>
      </span>
    </div>
  ),
};

/** Icons are composed as svg children and detected with `:has(svg)`. */
export const WithIcon: Story = {
  render: (args) => (
    <span style={{ "--loam-context": "success" } as CSSProperties}>
      <Badge {...args}>
        <svg viewBox="0 -0.5 25 25" fill="none" aria-hidden>
          <path
            d="M5.5 12.5L10.167 17L19.5 8"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Verified
      </Badge>
    </span>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Badge {...args} size="sm">
        Small
      </Badge>
      <Badge {...args} size="md">
        Medium
      </Badge>
      <Badge {...args} size="lg">
        Large
      </Badge>
    </div>
  ),
};
