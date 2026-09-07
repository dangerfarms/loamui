import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { UserMenu } from "../components/UserMenu/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

function renderUserMenu(props: { action?: string; onSignOut?: () => void } = {}) {
  return render(
    <UserMenu.Root>
      <UserMenu.Trigger name="Imogen Hartley" />
      <UserMenu.Popup>
        <UserMenu.Header name="Imogen Hartley" email="imogen@example.com" />
        <UserMenu.Item href="/account">Profile</UserMenu.Item>
        <UserMenu.Item href="/settings">Settings</UserMenu.Item>
        <UserMenu.Separator />
        <UserMenu.SignOut action={props.action} onClick={props.onSignOut} />
      </UserMenu.Popup>
    </UserMenu.Root>,
  );
}

describe("UserMenu", () => {
  it("is a button named for the person, the avatar decorative, with no axe violations closed", async () => {
    const { container } = renderUserMenu();
    const trigger = screen.getByRole("button", { name: "Account menu for Imogen Hartley" });
    expect(trigger).toHaveClass("loam-UserMenu-trigger");
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    // The composition's class is on its own span; the core Menu inside it
    // carries only its own.
    const root = container.querySelector(".loam-UserMenu")!;
    expect(root.tagName).toBe("SPAN");
    expect(root).not.toHaveClass("loam-Menu");
    expect(root.firstElementChild).toHaveClass("loam-Menu");
    expect(trigger.querySelector(".loam-Avatar")).toHaveAttribute("aria-hidden", "true");
    expect(trigger.querySelector("span.loam-VisuallyHidden")).toHaveTextContent(
      "Account menu for Imogen Hartley",
    );
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("opens to a menu named by the header, with the items after it, and no axe violations open", async () => {
    const user = userEvent.setup();
    const { container } = renderUserMenu();
    await user.click(screen.getByRole("button", { name: "Account menu for Imogen Hartley" }));

    const menu = screen.getByRole("menu");
    expect(menu).toHaveClass("loam-Menu-popup");
    expect(menu.className).toBe("loam-Menu-popup");
    expect(menu).toHaveAccessibleName("Imogen Hartley imogen@example.com");
    const header = menu.querySelector("div.loam-UserMenu-header")!;
    expect(header.querySelector("strong")).toHaveTextContent("Imogen Hartley");
    expect(header.querySelector("p")).toHaveTextContent("imogen@example.com");
    expect(header).not.toHaveAttribute("role");

    const items = screen.getAllByRole("menuitem");
    expect(items.map((item) => item.textContent)).toEqual(["Profile", "Settings", "Sign out"]);
    expect(
      header.compareDocumentPosition(items[0]!) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "Profile" })).toHaveFocus());
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("opens from the keyboard and closes on Escape, returning focus to the trigger", async () => {
    const user = userEvent.setup();
    renderUserMenu();
    const trigger = screen.getByRole("button", { name: "Account menu for Imogen Hartley" });
    trigger.focus();
    await user.keyboard("{ArrowDown}");
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "Profile" })).toHaveFocus());
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("posts sign out through a form when given an action", async () => {
    const user = userEvent.setup();
    const { container } = renderUserMenu({ action: "/sign-out" });
    await user.click(screen.getByRole("button", { name: "Account menu for Imogen Hartley" }));

    const signOut = screen.getByRole("menuitem", { name: "Sign out" });
    expect(signOut).toHaveAttribute("type", "submit");
    expect(signOut).toHaveClass("item");
    const form = signOut.closest("form")!;
    expect(form).toHaveAttribute("method", "post");
    expect(form).toHaveAttribute("action", "/sign-out");
    expect(screen.getByRole("menu")).toContainElement(form);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("submits the form when the sign-out item is activated", async () => {
    const user = userEvent.setup();
    const onSignOut = vi.fn();
    renderUserMenu({ action: "/sign-out", onSignOut });
    await user.click(screen.getByRole("button", { name: "Account menu for Imogen Hartley" }));

    const signOut = screen.getByRole("menuitem", { name: "Sign out" });
    const form = signOut.closest("form")!;
    const onSubmit = vi.fn((event: Event) => event.preventDefault());
    form.addEventListener("submit", onSubmit);
    await user.click(signOut);
    expect(onSignOut).toHaveBeenCalledOnce();
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it("is a plain item that runs onClick and closes the menu without an action", async () => {
    const user = userEvent.setup();
    const onSignOut = vi.fn();
    renderUserMenu({ onSignOut });
    await user.click(screen.getByRole("button", { name: "Account menu for Imogen Hartley" }));

    const signOut = screen.getByRole("menuitem", { name: "Sign out" });
    expect(signOut).toHaveAttribute("type", "button");
    expect(signOut.closest("form")).toBeNull();
    await user.click(signOut);
    expect(onSignOut).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("leaves the menu unnamed when no header is rendered, and hands the consumer's ref the button", () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(
      <UserMenu.Root defaultOpen>
        <UserMenu.Trigger name="Imogen Hartley" src="/imogen.jpg" ref={ref} />
        <UserMenu.Popup>
          <UserMenu.Item href="/account">Profile</UserMenu.Item>
        </UserMenu.Popup>
      </UserMenu.Root>,
    );
    expect(screen.getByRole("menu")).not.toHaveAttribute("aria-labelledby");
    const trigger = screen.getByRole("button", { name: "Account menu for Imogen Hartley" });
    expect(trigger).toBeVisible();
    expect(ref.current).toBe(trigger);
    expect(trigger.querySelector("img")).toHaveAttribute("src", "/imogen.jpg");
  });
});
