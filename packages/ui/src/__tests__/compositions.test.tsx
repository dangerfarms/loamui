import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Avatar, Card } from "@loamui/core";
import { Stats, Testimonial, Carousel, Feature } from "../index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Stats", () => {
  it("is a description list per tile, label before value in the DOM", async () => {
    const { container } = render(
      <Stats.Root>
        <Stats.Item>
          <Stats.Label>Components</Stats.Label>
          <Stats.Value>34</Stats.Value>
        </Stats.Item>
      </Stats.Root>,
    );
    const dl = container.querySelector("dl.loam-Stats-item");
    expect(dl).not.toBeNull();
    expect(dl!.parentElement).toHaveClass("loam-Stats");
    const [dt, dd] = [dl!.querySelector("dt"), dl!.querySelector("dd")];
    expect(dt).toHaveTextContent("Components");
    expect(dd).toHaveTextContent("34");
    expect(dt!.compareDocumentPosition(dd!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("stands alone without a Root", async () => {
    const { container } = render(
      <Stats.Item>
        <Stats.Label>Uptime</Stats.Label>
        <Stats.Value>99.9%</Stats.Value>
      </Stats.Item>,
    );
    const dl = container.querySelector("dl.loam-Stats-item");
    expect(dl).not.toBeNull();
    expect(container.querySelector(".loam-Stats")).toBeNull();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});

describe("Testimonial", () => {
  it("is a figure whose quote is a blockquote and whose author is the caption", async () => {
    const { container } = render(
      <Testimonial.Root>
        <Testimonial.Quote cite="https://example.com/review">It just worked.</Testimonial.Quote>
        <Testimonial.Author>
          <Avatar name="Priya Natarajan" aria-hidden />
          <p>Priya Natarajan</p>
        </Testimonial.Author>
      </Testimonial.Root>,
    );
    const figure = container.querySelector("figure.loam-Testimonial")!;
    expect(figure.querySelector("blockquote.quote")).toHaveAttribute(
      "cite",
      "https://example.com/review",
    );
    expect(figure.querySelector("figcaption.author")).toHaveTextContent("Priya Natarajan");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("rides in a Carousel inside a Card without owning either", async () => {
    const { container } = render(
      <Carousel.Root aria-label="Quotes">
        <Carousel.Track>
          <Carousel.Item>
            <Card>
              <Testimonial.Root>
                <Testimonial.Quote>It just worked.</Testimonial.Quote>
              </Testimonial.Root>
            </Card>
          </Carousel.Item>
        </Carousel.Track>
        <Carousel.Controls />
      </Carousel.Root>,
    );
    expect(
      container.querySelector(".loam-Carousel ul.track li .loam-Card figure.loam-Testimonial"),
    ).not.toBeNull();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});

describe("Feature", () => {
  it("is a tile with a titled, hidden-icon anatomy that stands alone", async () => {
    const { container } = render(
      <Feature.Root>
        <Feature.Icon>
          <svg viewBox="0 0 16 16" />
        </Feature.Icon>
        <Feature.Title>Three primitives</Feature.Title>
        <Feature.Description>Tokens, element styles and components.</Feature.Description>
      </Feature.Root>,
    );
    expect(container.firstElementChild).toHaveClass("loam-Feature");
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Three primitives");
    expect(container.querySelector(".loam-Feature .icon")).toHaveAttribute("aria-hidden", "true");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("renders as a list item inside a list the consumer wrote", async () => {
    const { container } = render(
      <ul>
        <Feature.Root render={<li />}>
          <Feature.Title render={<h4 />}>In a list</Feature.Title>
          <Feature.Description>Rendered as a li, titled as an h4.</Feature.Description>
        </Feature.Root>
      </ul>,
    );
    expect(screen.getByRole("listitem")).toHaveClass("loam-Feature");
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("In a list");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
