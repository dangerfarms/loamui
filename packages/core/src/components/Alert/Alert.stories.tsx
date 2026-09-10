import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import type { CSSProperties } from "react";
import { Alert } from "../../index";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: {
    title: "Heads up",
    children: "Your changes have been saved to the draft.",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Neutral by default; the surrounding region sets the status " +
          "(`--loam-context` on an ancestor region — a wrapper for a " +
          "single alert), not by props.",
      },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Neutral by default — there is no variant or color prop. */
export const Default: Story = {};

/**
 * Declare `--loam-context` on a region — any ancestor; a one-element region
 * is a wrapper — and the whole look (tint, border, accent, title) derives
 * from that status's colour.
 */
export const Contexts: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Alert title="Neutral">A plain, unopinionated notice.</Alert>
      <div style={{ "--loam-context": "info" } as CSSProperties}>
        <Alert title="Info">A neutral, informational message.</Alert>
      </div>
      <div style={{ "--loam-context": "success" } as CSSProperties}>
        <Alert title="Success">Your payment went through.</Alert>
      </div>
      <div style={{ "--loam-context": "warning" } as CSSProperties}>
        <Alert title="Warning">Your trial ends in three days.</Alert>
      </div>
      <div style={{ "--loam-context": "danger" } as CSSProperties}>
        <Alert title="Error">We couldn&apos;t reach the server.</Alert>
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    title: "Deployed",
    children: "Your site is live at loamui.dev.",
    icon: <span aria-hidden>✅</span>,
  },
  render: (args) => (
    <div style={{ "--loam-context": "success" } as CSSProperties}>
      <Alert {...args} />
    </div>
  ),
};

export const DescriptionOnly: Story = {
  args: {
    title: undefined,
    children: "A concise, single-line notice with no heading.",
  },
};

/**
 * `onClose` renders an `Alert.Close`: a LoamUI Button at the inline end,
 * named "Dismiss" (or `labels.close`). The alert does not remove itself; the
 * handler stops rendering it.
 */
export const Dismissible: Story = {
  args: {
    title: "Draft restored",
    children: "We recovered the draft you were editing.",
    onClose: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  },
};

/**
 * The parts, in the anatomy the convenience form renders. `Alert.Title`
 * takes `render` where the title belongs in the page outline.
 */
export const Composed: Story = {
  render: () => (
    <div style={{ "--loam-context": "warning" } as CSSProperties}>
      <Alert.Root>
        <Alert.Icon>
          <span aria-hidden>⚠</span>
        </Alert.Icon>
        <Alert.Body>
          <Alert.Title render={<h2 />}>Storage almost full</Alert.Title>
          <Alert.Description>Free up space to keep syncing.</Alert.Description>
        </Alert.Body>
        <Alert.Close onClose={() => {}} labels={{ close: "Hide this warning" }} />
      </Alert.Root>
    </div>
  ),
};

/**
 * `role="alert"` interrupts: for a message that appears in response to an
 * action. Forwarded props spread after the default `role="status"`, so the
 * consumer's role wins.
 */
export const Interrupting: Story = {
  args: {
    role: "alert",
    title: "Payment declined",
    children: "Your card was refused. Try another card or contact your bank.",
  },
  render: (args) => (
    <div style={{ "--loam-context": "danger" } as CSSProperties}>
      <Alert {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("alert")).toHaveTextContent("Payment declined");
  },
};
