import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("contact-us-with-details", () => {
  it("is a region named by its h2 with four terms of contact and a named form beside them", async () => {
    const { container } = render(<Example />);
    expect(screen.getByRole("region", { name: "Contact us" })).toHaveClass(
      "contact-us-with-details",
    );
    expect(screen.getAllByRole("term")).toHaveLength(4);
    expect(screen.getByRole("link", { name: "hello@hedgerow.coop" })).toHaveAttribute(
      "href",
      "mailto:hello@hedgerow.coop",
    );
    const form = screen.getByRole("form", { name: "Send a message" });
    expect(form).toHaveClass("loam-Card");
    expect(screen.getByLabelText("Email address")).toBeRequired();
    expect(screen.getByLabelText("Message")).toBeRequired();
    expect(screen.getByRole("button", { name: "Send message" })).toHaveAttribute("type", "submit");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
