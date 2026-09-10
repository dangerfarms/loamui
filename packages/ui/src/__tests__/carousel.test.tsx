import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
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
  it("renders a section, a list of items and the controls with no axe violations", async () => {
    const { container } = render(<Guides />);
    const region = screen.getByRole("region", { name: "Guides" });
    expect(region).toHaveClass("loam-Carousel");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Guides");
    expect(screen.getByRole("list")).toHaveClass("track");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
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

  it("takes translated labels for the controls", () => {
    render(
      <Carousel.Root>
        <Carousel.Track>
          <Carousel.Item>One</Carousel.Item>
        </Carousel.Track>
        <Carousel.Controls previousLabel="Précédent" nextLabel="Suivant" />
      </Carousel.Root>,
    );
    expect(screen.getByRole("button", { name: "Précédent" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Suivant" })).toBeInTheDocument();
  });
});
