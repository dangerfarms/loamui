import { renderToString } from "react-dom/server";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, within, act } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("contact-us-with-details", () => {
  it("accepts an application endpoint and keeps native validation in charge", () => {
    render(<Example action="/support/enquiries" />);
    const form = screen.getByRole("button", { name: "Send message" }).closest("form")!;
    expect(form).toHaveAttribute("action", "/support/enquiries");
    const email = screen.getByLabelText<HTMLInputElement>("Email address (required)");
    const message = screen.getByLabelText<HTMLTextAreaElement>("Message (required)");
    act(() => expect(form.checkValidity()).toBe(false));
    email.value = "grower@example.com";
    act(() => expect(form.checkValidity()).toBe(false));
    message.value = "Could I book a workshop?";
    act(() => expect(form.checkValidity()).toBe(true));
  });

  it("server-renders native POST controls and labels before hydration", () => {
    const html = new DOMParser().parseFromString(renderToString(<Example />), "text/html");
    const form = html.querySelector("form")!;
    expect(form.getAttribute("method")).toBe("post");
    expect(form.noValidate).toBe(false);
    expect(form.getAttribute("action")).toBe("/contact");
    for (const name of ["email", "message"]) {
      const control = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(
        `[name="${name}"]`,
      )!;
      expect(control.required).toBe(true);
      expect(
        Array.from(form.querySelectorAll("label")).some((label) => label.htmlFor === control.id),
      ).toBe(true);
    }
    expect(form.querySelector('[name="email"]')?.getAttribute("autocomplete")).toBe("email");
  });

  it("pairs contact details with a native enquiry form", async () => {
    const { container } = render(<Example />);
    expect(screen.getByRole("heading", { name: "Contact us", level: 2 })).toBeInTheDocument();
    expect(screen.getAllByRole("term")).toHaveLength(4);
    expect(screen.getByRole("link", { name: "hello@hedgerow.coop" })).toHaveAttribute(
      "href",
      "mailto:hello@hedgerow.coop",
    );
    const form = screen.getByRole("button", { name: "Send message" }).closest("form")!;
    expect(form).toHaveAttribute("action", "/contact");
    expect(form).toHaveAttribute("method", "post");
    expect(screen.getByLabelText("Email address (required)")).toBeRequired();
    expect(screen.getByLabelText("Message (required)")).toBeRequired();
    expect(screen.getByRole("button", { name: "Send message" })).toHaveAttribute("type", "submit");
    expect(screen.getByRole("link", { name: "01588 640210" })).toHaveAttribute(
      "href",
      "tel:+441588640210",
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
  it("keeps repeated forms and descriptions independently labelled", () => {
    render(
      <>
        <Example />
        <Example />
      </>,
    );
    const forms = screen
      .getAllByRole("button", { name: "Send message" })
      .map((button) => button.closest("form")!);
    const ids = forms.map((form) => {
      const email = within(form).getByLabelText("Email address (required)");
      expect(email).toHaveAccessibleDescription("We’ll reply to this address.");
      return email.id;
    });
    expect(new Set(ids).size).toBe(2);
  });
});
