import { describe, it, expect, afterEach, vi } from "vitest";
import { act, render, screen, cleanup, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { MobileNav } from "../components/MobileNav/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

function renderMobileNav(props: { defaultOpen?: boolean; title?: boolean } = {}) {
  return render(
    <MobileNav.Root defaultOpen={props.defaultOpen}>
      <MobileNav.Trigger />
      <MobileNav.Popup>
        {props.title !== false && <MobileNav.Title>Menu</MobileNav.Title>}
        <MobileNav.List>
          <MobileNav.Item>
            <a href="/docs" aria-current="page">
              Docs
            </a>
          </MobileNav.Item>
          <MobileNav.Item>
            <a href="/components">Components</a>
          </MobileNav.Item>
          <MobileNav.Item>
            <a href="/pricing">Pricing</a>
          </MobileNav.Item>
        </MobileNav.List>
        <MobileNav.Close />
      </MobileNav.Popup>
    </MobileNav.Root>,
  );
}

/*
 * The panel is a native dialog opened with showModal(), so Escape, light
 * dismiss and focus return to the trigger are the browser's own and run in
 * a real browser, not in jsdom; what is asserted here is the wiring the
 * composition adds around core's Drawer.
 */
describe("MobileNav", () => {
  it("is a Menu button that says its state, over a closed dialog, with no axe violations", async () => {
    const { container } = renderMobileNav();
    const trigger = screen.getByRole("button", { name: "Menu" });
    expect(trigger).toHaveClass("loam-Button");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    const dialog = container.querySelector("dialog")!;
    expect(dialog.open).toBe(false);
    expect(dialog).toHaveClass("loam-Drawer-popup");
    expect(dialog).toHaveAttribute("data-side", "start");
    expect(trigger).toHaveAttribute("aria-controls", dialog.id);
    // The composition's class is on its own span; the core parts inside
    // carry only their own.
    const root = container.querySelector(".loam-MobileNav")!;
    expect(root.tagName).toBe("SPAN");
    expect(root).toContainElement(trigger);
    expect(root).toContainElement(dialog);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("opens to a panel named by its Title holding the list, and closes from Close", async () => {
    const user = userEvent.setup();
    const { container } = renderMobileNav();
    const trigger = screen.getByRole("button", { name: "Menu" });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Menu" }) as HTMLDialogElement;
    expect(dialog.open).toBe(true);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    // Named by the Title alone, the way any Drawer is: no fallback label
    // left beside it.
    expect(dialog).not.toHaveAttribute("aria-label");
    expect(dialog.querySelector("h2.title")).toHaveTextContent("Menu");

    const list = screen.getByRole("list");
    expect(list).toHaveClass("loam-MobileNav-list");
    expect(list.tagName).toBe("UL");
    expect(dialog).toContainElement(list);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Pricing" })).not.toHaveAttribute("aria-current");
    expect(await axe(container, axeOptions)).toHaveNoViolations();

    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(dialog.open).toBe(false));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("follows a native close, as Escape and light dismiss are, back into its state", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <MobileNav.Root onOpenChange={onOpenChange}>
        <MobileNav.Trigger />
        <MobileNav.Popup>
          <MobileNav.Title>Menu</MobileNav.Title>
          <MobileNav.List>
            <MobileNav.Item>
              <a href="/">Home</a>
            </MobileNav.Item>
          </MobileNav.List>
        </MobileNav.Popup>
      </MobileNav.Root>,
    );
    const trigger = screen.getByRole("button", { name: "Menu" });
    await user.click(trigger);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    const dialog = document.querySelector("dialog")!;
    expect(dialog.open).toBe(true);

    act(() => dialog.close());
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("is named Navigation without a Title, and by the words the labels give it", async () => {
    const { container, unmount } = renderMobileNav({ defaultOpen: true, title: false });
    const dialog = screen.getByRole("dialog", { name: "Navigation" });
    expect(dialog).toHaveAttribute("aria-label", "Navigation");
    expect(dialog).not.toHaveAttribute("aria-labelledby");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
    unmount();

    render(
      <MobileNav.Root defaultOpen>
        <MobileNav.Trigger labels={{ open: "Menu principal" }} />
        <MobileNav.Popup labels={{ navigation: "Navigation principale" }}>
          <MobileNav.List>
            <MobileNav.Item>
              <a href="/">Accueil</a>
            </MobileNav.Item>
          </MobileNav.List>
          <MobileNav.Close labels={{ close: "Fermer" }} />
        </MobileNav.Popup>
      </MobileNav.Root>,
    );
    expect(screen.getByRole("button", { name: "Menu principal" })).toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: "Navigation principale" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fermer" })).toBeInTheDocument();
  });

  it("carries a name in the server render, and takes a controlled open state", () => {
    const html = renderToString(
      <MobileNav.Root>
        <MobileNav.Trigger />
        <MobileNav.Popup>
          <MobileNav.List>
            <MobileNav.Item>
              <a href="/">Home</a>
            </MobileNav.Item>
          </MobileNav.List>
        </MobileNav.Popup>
      </MobileNav.Root>,
    );
    expect(html).toContain('aria-label="Navigation"');
    expect(html).toContain('aria-expanded="false"');

    const onOpenChange = vi.fn();
    const { rerender } = render(
      <MobileNav.Root open={false} onOpenChange={onOpenChange}>
        <MobileNav.Trigger />
        <MobileNav.Popup>
          <MobileNav.Title>Menu</MobileNav.Title>
        </MobileNav.Popup>
      </MobileNav.Root>,
    );
    expect(document.querySelector("dialog")!.open).toBe(false);
    rerender(
      <MobileNav.Root open onOpenChange={onOpenChange}>
        <MobileNav.Trigger />
        <MobileNav.Popup>
          <MobileNav.Title>Menu</MobileNav.Title>
        </MobileNav.Popup>
      </MobileNav.Root>,
    );
    expect(document.querySelector("dialog")!.open).toBe(true);
    expect(screen.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "true");
  });
});
