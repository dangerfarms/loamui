import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { axe } from "vitest-axe";
import { CookieBanner } from "../components/CookieBanner/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

function banner(props: React.ComponentProps<typeof CookieBanner.Root> = {}) {
  return (
    <CookieBanner.Root {...props}>
      <CookieBanner.Title>Cookies on this site</CookieBanner.Title>
      <CookieBanner.Body>
        <p>We use some essential cookies to make this site work.</p>
        <p>We'd like to set additional cookies to understand how you use it and improve it.</p>
      </CookieBanner.Body>
      <CookieBanner.Actions>
        <CookieBanner.Accept />
        <CookieBanner.Reject />
        <a href="/cookies">View cookie settings</a>
      </CookieBanner.Actions>
    </CookieBanner.Root>
  );
}

describe("CookieBanner", () => {
  it("renders a region named by its title, a post form of two submit buttons and a link, and an empty status, with no axe violations", async () => {
    const { container } = render(banner());
    const region = screen.getByRole("region", { name: "Cookies on this site" });
    expect(region.tagName).toBe("SECTION");
    expect(region).toHaveClass("loam-CookieBanner");
    expect(region).not.toHaveAttribute("aria-label");
    const heading = screen.getByRole("heading", { level: 2, name: "Cookies on this site" });
    expect(region).toHaveAttribute("aria-labelledby", heading.id);

    const form = container.querySelector("form.actions");
    expect(form).toHaveAttribute("method", "post");
    expect(form).not.toHaveAttribute("action");
    const accept = screen.getByRole("button", { name: "Accept additional cookies" });
    const reject = screen.getByRole("button", { name: "Reject additional cookies" });
    expect(form).toContainElement(accept);
    expect(form).toContainElement(reject);
    expect(accept).toHaveAttribute("type", "submit");
    expect(accept).toHaveAttribute("name", "cookies");
    expect(accept).toHaveAttribute("value", "accept");
    expect(reject).toHaveAttribute("type", "submit");
    expect(reject).toHaveAttribute("name", "cookies");
    expect(reject).toHaveAttribute("value", "reject");
    expect(screen.getByRole("link", { name: "View cookie settings" })).toBeInTheDocument();

    // The live region is there from the start, and empty, so what arrives
    // in it later is announced.
    const status = screen.getByRole("status");
    expect(region).toContainElement(status);
    expect(status).toBeEmptyDOMElement();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("names the region Cookies without a Title, and lets the consumer's own name win", () => {
    const { rerender } = render(
      <CookieBanner.Root>
        <CookieBanner.Actions>
          <CookieBanner.Accept />
        </CookieBanner.Actions>
      </CookieBanner.Root>,
    );
    expect(screen.getByRole("region", { name: "Cookies" })).not.toHaveAttribute("aria-labelledby");

    rerender(banner({ "aria-label": "Consent" }));
    expect(screen.getByRole("region", { name: "Consent" })).toBeInTheDocument();

    rerender(
      <>
        <h1 id="h">Our cookies</h1>
        {banner({ "aria-labelledby": "h" })}
      </>,
    );
    const region = screen.getByRole("region", { name: "Our cookies" });
    expect(region).not.toHaveAttribute("aria-label");
  });

  it("calls onAccept, keeps the page, fills the status and moves focus to Hide, then Hide removes the banner", async () => {
    const onAccept = vi.fn();
    const onReject = vi.fn();
    const { container } = render(banner({ onAccept, onReject }));

    fireEvent.click(screen.getByRole("button", { name: "Accept additional cookies" }));
    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onReject).not.toHaveBeenCalled();

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("You've accepted additional cookies.");
    // The Title has gone with the banner, so the region falls back to Cookies.
    expect(screen.getByRole("region", { name: "Cookies" })).toContainElement(status);
    expect(screen.queryByRole("button", { name: "Accept additional cookies" })).toBeNull();
    expect(screen.queryByRole("link", { name: "View cookie settings" })).toBeNull();
    // The button the reader pressed has gone; focus is on the one that is left.
    const hide = screen.getByRole("button", { name: "Hide this message" });
    expect(hide).toHaveFocus();
    expect(await axe(container, axeOptions)).toHaveNoViolations();

    fireEvent.click(hide);
    expect(screen.queryByRole("region")).toBeNull();
    expect(container).toBeEmptyDOMElement();
  });

  it("on Hide, moves focus to the next thing the reader could have tabbed to", () => {
    render(
      <>
        {banner()}
        <header>
          <a href="/">Home</a>
        </header>
        <main>
          <h1>Page</h1>
        </main>
      </>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Reject additional cookies" }));
    fireEvent.click(screen.getByRole("button", { name: "Hide this message" }));
    expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();
    expect(screen.getByRole("main")).not.toHaveAttribute("tabindex");
  });

  it("on Hide, moves focus to main when nothing focusable follows", () => {
    render(
      <>
        {banner()}
        <main>
          <h1>Page</h1>
        </main>
      </>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Reject additional cookies" }));
    fireEvent.click(screen.getByRole("button", { name: "Hide this message" }));
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("tabindex", "-1");
    expect(main).toHaveFocus();
  });

  it("calls onReject and says so in the confirmation", () => {
    const onReject = vi.fn();
    render(banner({ onReject }));
    fireEvent.click(screen.getByRole("button", { name: "Reject additional cookies" }));
    expect(onReject).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("status")).toHaveTextContent("You've rejected additional cookies.");
  });

  it("with an action and a handler, posts nowhere: the submit is taken in place", () => {
    const onAccept = vi.fn();
    const { container } = render(banner({ action: "/cookies", onAccept }));
    const form = container.querySelector("form")!;
    expect(form).toHaveAttribute("action", "/cookies");

    fireEvent.click(screen.getByRole("button", { name: "Accept additional cookies" }));
    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("status")).toHaveTextContent("accepted");
  });

  it("with an action and no handler, lets the form post as it would without JavaScript", () => {
    const { container } = render(banner({ action: "/cookies" }));
    const form = container.querySelector("form")!;
    // fireEvent.submit returns false when the default was prevented.
    expect(fireEvent.submit(form)).toBe(true);
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });

  it("with neither an action nor a handler, shows the confirmation and stays on the page", () => {
    const { container } = render(banner());
    fireEvent.click(screen.getByRole("button", { name: "Reject additional cookies" }));
    expect(screen.getByRole("status")).toHaveTextContent("You've rejected additional cookies.");
    expect(container.querySelector("form")).toBeNull();
  });

  it("uses a consumer's Confirmation passed through the slot, mounted empty until the choice, and focuses its Hide", () => {
    render(
      <CookieBanner.Root
        confirmation={
          <CookieBanner.Confirmation>
            <p>Thanks. Your choice is saved.</p>
            <CookieBanner.Hide>Close</CookieBanner.Hide>
          </CookieBanner.Confirmation>
        }
      >
        <CookieBanner.Title>Cookies</CookieBanner.Title>
        <CookieBanner.Actions>
          <CookieBanner.Accept />
          <CookieBanner.Reject />
        </CookieBanner.Actions>
      </CookieBanner.Root>,
    );
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
    fireEvent.click(screen.getByRole("button", { name: "Reject additional cookies" }));
    expect(screen.getByRole("status")).toHaveTextContent("Thanks. Your choice is saved.");
    const close = screen.getByRole("button", { name: "Close" });
    expect(close).toHaveFocus();
    fireEvent.click(close);
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("focuses the confirmation itself when it has no button", () => {
    render(
      <CookieBanner.Root
        confirmation={
          <CookieBanner.Confirmation>
            <p>Saved.</p>
          </CookieBanner.Confirmation>
        }
      >
        <CookieBanner.Actions>
          <CookieBanner.Accept />
        </CookieBanner.Actions>
      </CookieBanner.Root>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Accept additional cookies" }));
    expect(screen.getByRole("status")).toHaveFocus();
  });

  it("is controlled by open and reports through onOpenChange", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(banner({ open: true, onOpenChange }));
    fireEvent.click(screen.getByRole("button", { name: "Accept additional cookies" }));
    fireEvent.click(screen.getByRole("button", { name: "Hide this message" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole("status")).toBeInTheDocument();
    rerender(banner({ open: false, onOpenChange }));
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("starts hidden when defaultOpen is false", () => {
    const { container } = render(banner({ defaultOpen: false }));
    expect(container).toBeEmptyDOMElement();
  });
});
