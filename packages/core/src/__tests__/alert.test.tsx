import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Alert } from "../components/Alert/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Alert", () => {
  it("renders the anatomy from the convenience props", () => {
    render(
      <Alert title="Saved" icon={<span>✓</span>}>
        Your changes are stored.
      </Alert>,
    );
    const alert = screen.getByRole("status");
    expect(alert).toHaveClass("loam-Alert");
    expect(alert.querySelector("span.icon")).toHaveAttribute("aria-hidden", "true");
    expect(alert.querySelector(".title")).toHaveTextContent("Saved");
    expect(alert.querySelector("div.description")).toHaveTextContent("Your changes are stored.");
  });

  it("Alert.Title renders a substituted element with the part class", () => {
    render(
      <Alert.Root>
        <Alert.Body>
          <Alert.Title render={<h2 />}>Storage almost full</Alert.Title>
          <Alert.Description>Free up space.</Alert.Description>
        </Alert.Body>
      </Alert.Root>,
    );
    const title = screen.getByRole("heading", { level: 2, name: "Storage almost full" });
    expect(title).toHaveClass("title");
  });

  it("Alert.Close is a Button named Dismiss that reports through onClose", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Alert title="Draft restored" onClose={onClose} />);
    const button = screen.getByRole("button", { name: "Dismiss" });
    expect(button).toHaveClass("loam-Button");
    await user.click(button);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("Alert.Close takes its name from labels or its children", () => {
    render(
      <>
        <Alert.Root>
          <Alert.Close onClose={() => {}} labels={{ close: "Hide" }} />
        </Alert.Root>
        <Alert.Root>
          <Alert.Close onClose={() => {}}>Got it</Alert.Close>
        </Alert.Root>
      </>,
    );
    expect(screen.getByRole("button", { name: "Hide" })).toBeInTheDocument();
    const text = screen.getByRole("button", { name: "Got it" });
    expect(text).not.toHaveAttribute("aria-label");
  });

  it("a consumer's onClick that prevents default stops onClose", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Alert.Root>
        <Alert.Close onClose={onClose} onClick={(e) => e.preventDefault()} />
      </Alert.Root>,
    );
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("forwards role so an interrupting message can be an alert", () => {
    render(
      <Alert role="alert" title="Payment declined">
        Try another card.
      </Alert>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Payment declined");
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("has no axe violations with a close button", async () => {
    const { container } = render(
      <Alert title="Heads up" onClose={() => {}}>
        A new version is available.
      </Alert>,
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
