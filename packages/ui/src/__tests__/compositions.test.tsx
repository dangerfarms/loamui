import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Avatar, Button } from "@loamui/core";
import { Header, Footer, Stats, Testimonials, Feature } from "../index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Header", () => {
  it("is a banner with a labelled nav and the current page marked", async () => {
    const { container } = render(
      <Header.Root>
        <Header.Brand href="/">Loam</Header.Brand>
        <Header.Nav aria-label="Primary">
          <li>
            <a href="/docs" aria-current="page">
              Docs
            </a>
          </li>
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        </Header.Nav>
        <Header.Actions>
          <Button>Sign in</Button>
        </Header.Actions>
      </Header.Root>,
    );
    expect(screen.getByRole("banner")).toHaveClass("loam-Header");
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("aria-current", "page");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});

describe("Footer", () => {
  it("is a contentinfo landmark with titled columns", async () => {
    const { container } = render(
      <Footer.Root>
        <Footer.Brand>Loam</Footer.Brand>
        <Footer.Columns>
          <Footer.Column>
            <Footer.ColumnTitle>Product</Footer.ColumnTitle>
            <ul>
              <li>
                <a href="/docs">Docs</a>
              </li>
            </ul>
          </Footer.Column>
        </Footer.Columns>
        <Footer.Bottom>
          <small>© 2026 Loam</small>
        </Footer.Bottom>
      </Footer.Root>,
    );
    expect(screen.getByRole("contentinfo")).toHaveClass("loam-Footer");
    expect(screen.getByRole("heading", { name: "Product" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});

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

describe("Testimonials", () => {
  it("pages the track with the controls", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Testimonials.Root aria-labelledby="quotes">
        <h2 id="quotes">What teams say</h2>
        <Testimonials.Track>
          <Testimonials.Item>
            <Testimonials.Quote>It just worked.</Testimonials.Quote>
            <Testimonials.Author>
              <Avatar name="Priya Natarajan" aria-hidden />
              <p>Priya Natarajan</p>
            </Testimonials.Author>
          </Testimonials.Item>
        </Testimonials.Track>
        <Testimonials.Controls />
      </Testimonials.Root>,
    );
    const track = container.querySelector("ul.track") as HTMLUListElement;
    const scrollBy = vi.fn();
    Object.defineProperty(track, "scrollBy", { configurable: true, value: scrollBy });
    Object.defineProperty(track, "clientWidth", { configurable: true, value: 400 });
    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(scrollBy).toHaveBeenCalledTimes(1);
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
