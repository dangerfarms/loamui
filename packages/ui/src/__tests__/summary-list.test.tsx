import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Price } from "@loamui/core";
import { SummaryList } from "../components/SummaryList/index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("SummaryList", () => {
  it("is a description list whose actions say what they change", async () => {
    const { container } = render(
      <SummaryList.Root label="Your answers">
        <SummaryList.Item>
          <SummaryList.Label>Name</SummaryList.Label>
          <SummaryList.Value>Sarah Bloom</SummaryList.Value>
          <SummaryList.Actions>
            <SummaryList.Action href="/name" label="name">
              Change
            </SummaryList.Action>
          </SummaryList.Actions>
        </SummaryList.Item>
        <SummaryList.Item>
          <SummaryList.Label>Phone number</SummaryList.Label>
          <SummaryList.Value>Not provided</SummaryList.Value>
          <SummaryList.Actions>
            <SummaryList.Action href="/phone" label="phone number">
              Add
            </SummaryList.Action>
          </SummaryList.Actions>
        </SummaryList.Item>
        <SummaryList.Item>
          <SummaryList.Label>Reference</SummaryList.Label>
          <SummaryList.Value>LU-48213</SummaryList.Value>
        </SummaryList.Item>
      </SummaryList.Root>,
    );
    const dl = container.querySelector("dl.loam-SummaryList");
    expect(dl).not.toBeNull();
    expect(dl).toHaveAttribute("aria-label", "Your answers");

    // Each item is a div holding a dt, then its dd(s), so every label and
    // value are associated and read in order.
    const items = dl!.querySelectorAll(":scope > div.item");
    expect(items).toHaveLength(3);
    for (const item of items) {
      const dt = item.querySelector(":scope > dt.label");
      const dd = item.querySelector(":scope > dd.value");
      expect(dt).not.toBeNull();
      expect(dd).not.toBeNull();
      expect(dt!.compareDocumentPosition(dd!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }

    // The action's accessible name is its visible text plus what it
    // changes, the rest written in core's visually hidden class.
    const change = screen.getByRole("link", { name: "Change name" });
    expect(change.getAttribute("href")).toBe("/name");
    expect(change.querySelector(".loam-VisuallyHidden")).toHaveTextContent("name");
    expect(screen.getByRole("link", { name: "Add phone number" })).toBeInTheDocument();

    // An item without actions still renders its label and value.
    const last = items[2]!;
    expect(last.querySelector("dt")).toHaveTextContent("Reference");
    expect(last.querySelector("dd.value")).toHaveTextContent("LU-48213");
    expect(last.querySelector("dd.actions")).toBeNull();

    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("renders the action through render, keeping its name", () => {
    render(
      <SummaryList.Root>
        <SummaryList.Item>
          <SummaryList.Label>Email</SummaryList.Label>
          <SummaryList.Value>sarah@example.com</SummaryList.Value>
          <SummaryList.Actions>
            <SummaryList.Action render={<button type="button" />} label="email address">
              Change
            </SummaryList.Action>
          </SummaryList.Actions>
        </SummaryList.Item>
      </SummaryList.Root>,
    );
    const button = screen.getByRole("button", { name: "Change email address" });
    expect(button).toHaveClass("action");
  });

  it("renders the value through render, keeping its slot", () => {
    const { container } = render(
      <SummaryList.Root>
        <SummaryList.Item>
          <SummaryList.Label>Order number</SummaryList.Label>
          <SummaryList.Value render={<dd data-testid="value" lang="en-GB" />}>
            LU-48213
          </SummaryList.Value>
        </SummaryList.Item>
      </SummaryList.Root>,
    );
    const value = screen.getByTestId("value");
    expect(value.tagName).toBe("DD");
    expect(value).toHaveClass("value");
    expect(value).toHaveAttribute("lang", "en-GB");
    expect(value).toHaveTextContent("LU-48213");
    expect(container.querySelectorAll("dd.value")).toHaveLength(1);
  });

  it("sums an order: Prices as values, a note under one, and a total item set apart", async () => {
    const { container } = render(
      <SummaryList.Root>
        <SummaryList.Item>
          <SummaryList.Label>Subtotal</SummaryList.Label>
          <SummaryList.Value>
            <Price value={42.5} currency="GBP" />
          </SummaryList.Value>
        </SummaryList.Item>
        <SummaryList.Item>
          <SummaryList.Label>Delivery</SummaryList.Label>
          <SummaryList.Value>
            <Price value={3.99} currency="GBP" />
          </SummaryList.Value>
          <SummaryList.Note>Free over £50</SummaryList.Note>
          <SummaryList.Actions>
            <SummaryList.Action href="/delivery" label="delivery">
              Change
            </SummaryList.Action>
          </SummaryList.Actions>
        </SummaryList.Item>
        <SummaryList.Item>
          <SummaryList.Label>Discount</SummaryList.Label>
          <SummaryList.Value>
            <Price value={-5} currency="GBP" />
          </SummaryList.Value>
        </SummaryList.Item>
        <SummaryList.Item className="total">
          <SummaryList.Label>Total</SummaryList.Label>
          <SummaryList.Value>
            <Price value={41.49} currency="GBP" />
          </SummaryList.Value>
        </SummaryList.Item>
      </SummaryList.Root>,
    );
    const dl = container.querySelector("dl.loam-SummaryList")!;

    // Every amount is a core Price: a data element whose text is the amount
    // written for people and whose value is the number for machines.
    const amounts = dl.querySelectorAll(":scope > div.item > dd.value > data.loam-Price");
    expect(amounts).toHaveLength(4);
    expect(amounts[0]).toHaveTextContent("£42.50");
    expect(amounts[0]!.getAttribute("value")).toBe("42.5");
    expect(amounts[3]).toHaveTextContent("£41.49");

    // The discount is negative and written as such, minus and all.
    expect(amounts[2]!.textContent).toMatch(/^[-−]£5$/);
    expect(amounts[2]!.getAttribute("value")).toBe("-5");

    // The note is a dd after the value, so it reads in order after the
    // figure it explains and before the action.
    const note = dl.querySelector("div.item > dd.note");
    expect(note).toHaveTextContent("Free over £50");
    expect(note!.previousElementSibling).toHaveClass("value");
    expect(note!.nextElementSibling).toHaveClass("actions");

    // The total is an item marked by class whose dt says so; nothing is
    // hidden that the page does not show.
    const total = dl.querySelector(":scope > div.item.total");
    expect(total).not.toBeNull();
    expect(total!.querySelector(":scope > dt")).toHaveTextContent("Total");
    expect(total).toBe(dl.lastElementChild);

    expect(screen.getByRole("link", { name: "Change delivery" })).toHaveAttribute(
      "href",
      "/delivery",
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
