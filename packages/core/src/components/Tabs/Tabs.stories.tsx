import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Tabs, TabsList, TabsTab, TabsPanel } from "../../index";

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Switch between related panels of content, composed with " +
          "`Tabs.List`, `Tabs.Tab` and `Tabs.Panel`. Supports uncontrolled " +
          "(`defaultValue`) and controlled (`value`/`onChange`) usage.",
      },
    },
  },
  args: {
    defaultValue: "overview",
  },
  argTypes: {
    defaultValue: {
      control: "inline-radio",
      options: ["overview", "activity", "settings"],
    },
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="activity">Activity</TabsTab>
        <TabsTab value="settings">Settings</TabsTab>
      </TabsList>
      <TabsPanel value="overview">
        <p>Overview panel — a snapshot of everything at a glance.</p>
      </TabsPanel>
      <TabsPanel value="activity">
        <p>Activity panel — the latest events on your account.</p>
      </TabsPanel>
      <TabsPanel value="settings">
        <p>Settings panel — tweak your preferences here.</p>
      </TabsPanel>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** An svg child is detected and spaced, exactly as in Button. */
export const WithIcons: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTab value="overview">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M8 2v12M3 7l5-5 5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Overview
        </TabsTab>
        <TabsTab value="activity">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M2 13l4-5 3 3 5-8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Activity
        </TabsTab>
        <TabsTab value="settings">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M8 5a3 3 0 100 6 3 3 0 000-6zM8 1v2m0 10v2m7-7h-2M3 8H1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Settings
        </TabsTab>
      </TabsList>
      <TabsPanel value="overview">
        <p>Overview panel — a snapshot of everything at a glance.</p>
      </TabsPanel>
      <TabsPanel value="activity">
        <p>Activity panel — the latest events on your account.</p>
      </TabsPanel>
      <TabsPanel value="settings">
        <p>Settings panel — tweak your preferences here.</p>
      </TabsPanel>
    </Tabs>
  ),
};

/** A disabled tab cannot be activated and is skipped by keyboard navigation. */
export const DisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="activity">Activity</TabsTab>
        <TabsTab value="settings" disabled>
          Settings
        </TabsTab>
      </TabsList>
      <TabsPanel value="overview">
        <p>Overview panel — a snapshot of everything at a glance.</p>
      </TabsPanel>
      <TabsPanel value="activity">
        <p>Activity panel — the latest events on your account.</p>
      </TabsPanel>
      <TabsPanel value="settings">
        <p>Settings panel — you shouldn&apos;t be able to reach this.</p>
      </TabsPanel>
    </Tabs>
  ),
};

/**
 * Interaction test: clicking a tab reveals its panel. Inactive panels stay
 * mounted (they carry the `hidden` attribute) so the assertions target *visibility*,
 * not presence.
 */
export const ClickSelectsPanel: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const overviewTab = canvas.getByRole("tab", { name: "Overview" });
    await expect(overviewTab).toHaveAttribute("aria-selected", "true");
    await expect(canvas.getByText(/a snapshot of everything at a glance/i)).toBeVisible();

    const activityTab = canvas.getByRole("tab", { name: "Activity" });
    await userEvent.click(activityTab);

    await expect(activityTab).toHaveAttribute("aria-selected", "true");
    await expect(overviewTab).toHaveAttribute("aria-selected", "false");

    await expect(canvas.getByText(/the latest events on your account/i)).toBeVisible();
    await expect(canvas.getByText(/a snapshot of everything at a glance/i)).not.toBeVisible();
  },
};
