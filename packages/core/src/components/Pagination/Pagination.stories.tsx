import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Pagination } from "../../index";
import type { PaginationProps } from "../../index";

/**
 * Stories intercept the real links to keep navigation inside Storybook.
 */
function PaginationDemo({
  total = 10,
  initialPage = 1,
  ...props
}: Partial<PaginationProps> & { initialPage?: number }) {
  const [page, setPage] = useState(initialPage);
  return (
    <Pagination
      {...props}
      total={total}
      value={page}
      getHref={(next) => `?page=${next}`}
      onNavigate={(next, event) => {
        event.preventDefault();
        setPage(next);
      }}
    />
  );
}

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: {
    total: 10,
    value: 1,
    siblings: 1,
    withEdges: false,
    getHref: (page) => `?page=${page}`,
  },
  argTypes: {
    total: { control: { type: "number", min: 1 } },
    siblings: { control: { type: "number", min: 0, max: 3 } },
    withEdges: { control: "boolean" },
    // Controlled by the wrapper's local state, not the Controls panel.
    value: { control: false },
    getHref: { control: false },
    onNavigate: { control: false },
  },
  render: ({ total, siblings, withEdges }) => (
    <PaginationDemo total={total} siblings={siblings} withEdges={withEdges} />
  ),
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** First/last edge buttons enabled via `withEdges`. */
export const WithEdges: Story = {
  args: { withEdges: true },
};

/** A large page count collapses the middle into ellipsis gaps. */
export const ManyPages: Story = {
  render: () => <PaginationDemo total={25} initialPage={12} withEdges />,
};

/** More sibling pages shown either side of the active page. */
export const MoreSiblings: Story = {
  render: () => <PaginationDemo total={25} initialPage={12} siblings={2} />,
};

/**
 * Interaction test: clicking Next and a numbered page moves the active page.
 * The active control carries `aria-current="page"`.
 */
export const NavigatesPages: Story = {
  render: () => <PaginationDemo total={10} initialPage={1} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const page1 = canvas.getByRole("link", { name: "Page 1" });
    await expect(page1).toHaveAttribute("aria-current", "page");

    await userEvent.click(canvas.getByRole("link", { name: "Next page" }));
    const page2 = canvas.getByRole("link", { name: "Page 2" });
    await expect(page2).toHaveAttribute("aria-current", "page");
    await expect(page1).not.toHaveAttribute("aria-current");

    await userEvent.click(canvas.getByRole("link", { name: "Page 4" }));
    const page4 = canvas.getByRole("link", { name: "Page 4" });
    await expect(page4).toHaveAttribute("aria-current", "page");
    await expect(page2).not.toHaveAttribute("aria-current");
  },
};
