import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../../index";

const meta = {
  title: "Data display/Card",
  component: Card,
  tags: ["autodocs"],
  render: (args) => (
    <Card {...args} style={{ maxWidth: "20rem" }}>
      <h3 style={{ margin: "0 0 0.5rem" }}>North Field</h3>
      <p style={{ margin: 0, color: "var(--fui-color-fg-muted)" }}>
        42 hectares of winter wheat, sown last October and on track for an early-August harvest.
      </p>
    </Card>
  ),
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
