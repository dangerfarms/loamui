import type { Meta, StoryObj } from "@storybook/react-vite";
import { SignpostLink } from "../../index";

const meta = {
  title: "Navigation/SignpostLink",
  component: SignpostLink,
  tags: ["autodocs"],
  args: {
    href: "#apply",
    children: "Start your application",
  },
} satisfies Meta<typeof SignpostLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** A context region recolours the arrow's circle like any solid fill. */
export const InContextRegion: Story = {
  render: (args) => (
    <div style={{ "--loam-context": "danger" } as React.CSSProperties}>
      <SignpostLink {...args} href="#appeal">
        Appeal this decision
      </SignpostLink>
    </div>
  ),
};
