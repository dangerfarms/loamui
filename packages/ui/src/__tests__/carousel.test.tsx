import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Card } from "@loamui/core";
import { Carousel } from "../components/Carousel/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

function Guides() {
  return (
    <Carousel.Root aria-labelledby="guides">
      <h2 id="guides">Guides</h2>
      <Carousel.Track>
        <Carousel.Item>
          <Card>
            <h3>Tokens</h3>
            <p>Four hues, eight neutrals and two fluid scales.</p>
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card>
            <h3>Element styles</h3>
            <p>Native HTML, styled page-wide before any component appears.</p>
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card>
            <h3>Components</h3>
            <p>A small set of parts whose look comes from context.</p>
          </Card>
        </Carousel.Item>
      </Carousel.Track>
      <Carousel.Controls />
    </Carousel.Root>
  );
}

describe("Carousel", () => {
  it("renders a section, a named list of items and the controls with no axe violations", async () => {
    const { container } = render(<Guides />);
    const region = screen.getByRole("region", { name: "Guides" });
    expect(region).toHaveClass("loam-Carousel");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Guides");
    const track = screen.getByRole("list", { name: "Carousel" });
    expect(track.tagName).toBe("UL");
    expect(track).toHaveClass("track");
    // Explicit, because the stylesheet strips the markers and some browsers
    // drop the list semantics with them.
    expect(track).toHaveAttribute("role", "list");
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    for (const item of items) expect(item.tagName).toBe("LI");
    expect(screen.getByRole("button", { name: "Previous" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("pages the track by one of its widths in either direction", () => {
    render(<Guides />);
    const track = screen.getByRole("list") as HTMLUListElement;
    Object.defineProperty(track, "clientWidth", { value: 400, configurable: true });
    const scrollBy = vi.fn();
    track.scrollBy = scrollBy;

    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(scrollBy).toHaveBeenLastCalledWith({ left: 400 });

    fireEvent.click(screen.getByRole("button", { name: "Previous" }));
    expect(scrollBy).toHaveBeenLastCalledWith({ left: -400 });
  });

  // jsdom has no scrolling, so this asserts what the browser's own arrow-key
  // scrolling needs: the track is in the tab order and named, and the keys
  // reach it unhandled, so the scroller moves and the snap points settle it
  // on an item.
  it("is a keyboard scroller: Tab reaches the named track and ArrowRight is left to the browser", async () => {
    const user = userEvent.setup();
    render(<Guides />);
    const track = screen.getByRole("list", { name: "Carousel" });
    expect(track).toHaveAttribute("tabindex", "0");
    await user.tab();
    expect(track).toHaveFocus();
    // Not prevented: the default action, the browser's scroll, goes ahead.
    expect(fireEvent.keyDown(track, { key: "ArrowRight" })).toBe(true);
    await user.tab();
    expect(screen.getByRole("button", { name: "Previous" })).toHaveFocus();
  });

  it("lets a name of the consumer's own win over the track's, and takes a translated one", () => {
    const { rerender } = render(
      <Carousel.Root>
        <h2 id="quotes">Quotes</h2>
        <Carousel.Track aria-labelledby="quotes">
          <Carousel.Item>One</Carousel.Item>
        </Carousel.Track>
      </Carousel.Root>,
    );
    expect(screen.getByRole("list", { name: "Quotes" })).not.toHaveAttribute("aria-label");

    rerender(
      <Carousel.Root>
        <Carousel.Track labels={{ track: "Carrousel" }}>
          <Carousel.Item>One</Carousel.Item>
        </Carousel.Track>
      </Carousel.Root>,
    );
    expect(screen.getByRole("list", { name: "Carrousel" })).toBeInTheDocument();
  });

  it("takes translated labels for the controls, which page the track wherever they sit", () => {
    render(
      <Carousel.Root>
        <Carousel.Controls previousLabel="Précédent" nextLabel="Suivant" />
        <Carousel.Track>
          <Carousel.Item>One</Carousel.Item>
        </Carousel.Track>
      </Carousel.Root>,
    );
    const track = screen.getByRole("list") as HTMLUListElement;
    Object.defineProperty(track, "clientWidth", { value: 300, configurable: true });
    const scrollBy = vi.fn();
    track.scrollBy = scrollBy;
    fireEvent.click(screen.getByRole("button", { name: "Suivant" }));
    expect(scrollBy).toHaveBeenLastCalledWith({ left: 300 });
    expect(screen.getByRole("button", { name: "Précédent" })).toBeInTheDocument();
  });

  it("forwards the consumer's ref to the track alongside its own", () => {
    const ref = { current: null as HTMLUListElement | null };
    render(
      <Carousel.Root>
        <Carousel.Track ref={ref}>
          <Carousel.Item>One</Carousel.Item>
        </Carousel.Track>
      </Carousel.Root>,
    );
    expect(ref.current).toHaveClass("track");
  });
});
