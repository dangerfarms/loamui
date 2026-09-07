import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { SchemeToggle } from "./index";

const meta = {
  title: "Inputs/SchemeToggle",
  component: SchemeToggle,
  tags: ["autodocs"],
  args: {
    showLabel: false,
    label: "Colour scheme",
  },
  argTypes: {
    showLabel: { control: "boolean" },
    label: { control: "text" },
    onChange: { action: "change" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A three-way choice of colour scheme — System, Light, Dark — as a " +
          "native radio group. Choosing sets `data-theme` on the root element " +
          "(or removes it for System) and persists the choice to " +
          "`localStorage`; the tokens do the rest. Choosing here changes " +
          "this Storybook's own scheme.",
      },
    },
  },
} satisfies Meta<typeof SchemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = document.documentElement;

    await userEvent.click(canvas.getByRole("radio", { name: "Dark" }));
    await expect(root.dataset.theme).toBe("dark");

    await userEvent.click(canvas.getByRole("radio", { name: "System" }));
    await expect(root.dataset.theme).toBeUndefined();
  },
};

/** The legend shown as text before the options, for a settings row. */
export const WithVisibleLegend: Story = {
  args: { showLabel: true },
};
