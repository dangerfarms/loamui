import { renderToString } from "react-dom/server";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, within, act, fireEvent, waitFor } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("contact-us-with-details", () => {
  it("preserves a rejected message without mislabelling valid fields as invalid", async () => {
    const initialResponse = {
      status: "error" as const,
      values: { email: "grower@example.com", message: "Could I book a workshop?" },
      errors: { form: "We could not send your message. Please try again." },
    };
    const html = new DOMParser().parseFromString(
      renderToString(<Example initialResponse={initialResponse} />),
      "text/html",
    );
    expect(html.querySelector('[name="email"]')?.getAttribute("value")).toBe(
      initialResponse.values.email,
    );
    expect(html.querySelector("textarea")?.textContent).toBe(initialResponse.values.message);
    expect(html.body.textContent).toContain(initialResponse.errors.form);

    const { container } = render(<Example initialResponse={initialResponse} />);
    expect(screen.getByRole("group", { name: "There is a problem" })).toHaveFocus();
    expect(screen.getByLabelText("Message (required)")).toHaveValue(initialResponse.values.message);
    expect(screen.getByLabelText("Email address (required)")).not.toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
    expect(fireEvent.submit(screen.getByRole("form", { name: "Send a message" }))).toBe(true);
    expect(screen.queryByRole("group", { name: "There is a problem" })).not.toBeInTheDocument();
  });

  it("connects server field errors and focuses the field from the summary", async () => {
    render(
      <Example
        initialResponse={{
          status: "error",
          values: { email: "grower@example.com", message: " " },
          errors: { message: "Enter your message" },
        }}
      />,
    );
    const message = screen.getByLabelText("Message (required)");
    expect(message).toHaveAttribute("aria-invalid", "true");
    expect(message).toHaveAccessibleDescription("Error: Enter your message");
    fireEvent.click(
      within(screen.getByRole("group", { name: "There is a problem" })).getByRole("link", {
        name: "Enter your message",
      }),
    );
    await waitFor(() => expect(message).toHaveFocus());
  });

  it("focuses confirmation only on mount and removes the form after confirmed delivery", async () => {
    const { container, rerender } = render(<Example initialResponse={{ status: "sent" }} />);
    const heading = screen.getByRole("heading", { name: "Message sent" });
    expect(heading).toHaveFocus();
    expect(screen.queryByRole("button", { name: "Send message" })).not.toBeInTheDocument();
    expect(screen.getByText(/next email day/)).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Return to the nursery homepage" });
    link.focus();
    rerender(<Example initialResponse={{ status: "sent" }} />);
    expect(link).toHaveFocus();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
    const html = renderToString(<Example initialResponse={{ status: "sent" }} />);
    expect(html).toContain("Message sent");
    expect(html).not.toContain("<form");
  });

  it("shows native validation errors after a submit and permits a corrected POST", () => {
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    const summary = screen.getByRole("group", { name: "There is a problem" });
    expect(summary).toHaveFocus();
    expect(within(summary).getAllByRole("link")).toHaveLength(2);
    fireEvent.input(screen.getByLabelText("Email address (required)"), {
      target: { value: "grower@example.com" },
    });
    fireEvent.input(screen.getByLabelText("Message (required)"), {
      target: { value: "Can I visit?" },
    });
    expect(fireEvent.submit(screen.getByRole("form", { name: "Send a message" }))).toBe(true);
    expect(screen.queryByRole("group", { name: "There is a problem" })).not.toBeInTheDocument();
  });

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
