import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../../index";

const meta = {
  title: "Data display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: {
    name: "Ada Lovelace",
  },
  parameters: {
    docs: {
      description: {
        component:
          "An image, initials, or fallback glyph representing a user. The " +
          "initials background answers the surrounding `--loam-context` " +
          "region, not a color prop.",
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

// An inline SVG portrait — self-contained, so the story needs no network
// and passes a strict content-security policy.
const portrait =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">` +
      `<rect width="96" height="96" fill="#ede9fe"/>` +
      `<circle cx="48" cy="38" r="18" fill="#6d28d9"/>` +
      `<path d="M16 84c0-17 14-28 32-28s32 11 32 28z" fill="#6d28d9"/>` +
      `</svg>`,
  );

export const Image: Story = {
  args: {
    src: portrait,
    alt: "Grace Hopper",
    name: "Grace Hopper",
  },
};

/**
 * The initials background answers the surrounding `--loam-context` region;
 * there is no color prop.
 */
export const Contexts: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Avatar {...args} name="Ada Lovelace" />
      <span style={{ "--loam-context": "info" } as CSSProperties}>
        <Avatar {...args} name="Grace Hopper" />
      </span>
      <span style={{ "--loam-context": "danger" } as CSSProperties}>
        <Avatar {...args} name="Alan Turing" />
      </span>
    </div>
  ),
};

export const Fallback: Story = {
  args: { name: undefined, alt: "Unknown user" },
};

/** Set the public `--loam-avatar-size` per instance or on a region. */
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Avatar {...args} style={{ "--loam-avatar-size": "1.5rem" } as CSSProperties} />
      <Avatar {...args} />
      <Avatar {...args} style={{ "--loam-avatar-size": "4rem" } as CSSProperties} />
    </div>
  ),
};

/**
 * `Avatar.Group` is a list: each child is an item, overlapped and ringed in
 * the surface colour. `more` adds the overflow count, named by `labels.more`.
 */
export const Group: Story = {
  render: (args) => (
    <Avatar.Group more={3} labels={{ more: (n) => `${n} more people` }}>
      <Avatar {...args} name="Ada Lovelace" />
      <Avatar {...args} name="Grace Hopper" />
      <Avatar {...args} name="Alan Turing" />
      <Avatar {...args} name="Katherine Johnson" />
    </Avatar.Group>
  ),
};
