import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("sign-in-with-errors", () => {
  it("lists each error first as a link to its field, and says it again under the field", async () => {
    const { container } = render(<Example />);
    const summary = screen.getByRole("group", { name: "There is a problem" });
    expect(summary).toHaveAttribute("tabindex", "-1");
    const link = screen.getByRole("link", { name: "Enter your password" });
    const password = screen.getByLabelText("Password");
    expect(link).toHaveAttribute("href", `#${password.id}`);
    expect(password).toHaveAttribute("aria-invalid", "true");
    const error = document.getElementById(`${password.id}-error`);
    expect(error).toHaveTextContent("Enter your password");
    expect(password.getAttribute("aria-describedby")).toContain(error!.id);
    expect(screen.getByLabelText("Email address")).toHaveValue("imogen.hartley@hedgerow");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
