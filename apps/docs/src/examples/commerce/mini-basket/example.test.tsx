import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor, within } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

// jsdom 25 does not implement <dialog> showModal/close; the Drawer opens
// through them, so the test shims the two methods to toggle `open`.
if (typeof HTMLDialogElement.prototype.showModal !== "function") {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close() {
    if (!this.hasAttribute("open")) return;
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
}

describe("mini-basket", () => {
  it("opens from a counted trigger to a dialog named by its title, holding two lines named by their products", async () => {
    const { container } = render(<Example />);
    const trigger = screen.getByRole("button", { name: "Basket 2 items" });
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    fireEvent.click(trigger);

    const dialog = (await screen.findByRole("dialog", {
      name: "Your basket",
    })) as HTMLDialogElement;
    await waitFor(() => expect(dialog.open).toBe(true));
    expect(trigger).toHaveAttribute("data-popup-open", "true");

    const lines = within(dialog).getAllByRole("article");
    expect(lines.map((a) => a.getAttribute("aria-labelledby"))).toEqual([
      "mini-basket-climbing-bean-blue-lake-title",
      "mini-basket-raspberry-autumn-bliss-title",
    ]);
    expect(
      within(dialog).getByRole("spinbutton", {
        name: "Quantity of Raspberry ‘Autumn Bliss’ canes",
      }),
    ).toHaveValue(1);
    expect(
      within(dialog).getByRole("button", { name: "Remove Raspberry ‘Autumn Bliss’ canes" }),
    ).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: "Go to checkout" })).toHaveAttribute(
      "href",
      "/checkout",
    );
    expect(within(dialog).getByText("Total").nextElementSibling).toHaveTextContent("£33.55");
    expect(await axe(container, axeOptions)).toHaveNoViolations();

    fireEvent.click(within(dialog).getByRole("button", { name: "Close basket" }));
    await waitFor(() => expect(dialog.open).toBe(false));
    expect(trigger).not.toHaveAttribute("data-popup-open");
  });
});
