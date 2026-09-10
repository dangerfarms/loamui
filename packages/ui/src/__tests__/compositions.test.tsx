import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Avatar, Badge, Button } from "@loamui/core";
import { Header, Footer, Stats, Pricing, Testimonials, Features } from "../index";

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
  it("is a description list with label before value in the DOM", async () => {
    const { container } = render(
      <Stats.Root>
        <Stats.Item>
          <Stats.Label>Components</Stats.Label>
          <Stats.Value>33</Stats.Value>
        </Stats.Item>
      </Stats.Root>,
    );
    const dl = container.querySelector("dl.loam-Stats");
    expect(dl).not.toBeNull();
    const [dt, dd] = [dl!.querySelector("dt"), dl!.querySelector("dd")];
    expect(dt).toHaveTextContent("Components");
    expect(dd).toHaveTextContent("33");
    expect(dt!.compareDocumentPosition(dd!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});

describe("Pricing", () => {
  it("renders plans as a list of cards with a heading, price and action", async () => {
    const { container } = render(
      <Pricing.Root aria-labelledby="plans">
        <h2 id="plans">Plans</h2>
        <Pricing.Plans>
          <Pricing.Plan>
            <Pricing.Name>
              Team <Badge>Recommended</Badge>
            </Pricing.Name>
            <Pricing.Price>
              £24 <small>per seat per month</small>
            </Pricing.Price>
            <Pricing.Description>For small teams.</Pricing.Description>
            <Pricing.Features>
              <li>Unlimited projects</li>
            </Pricing.Features>
            <Pricing.Action>
              <Button>Choose Team</Button>
            </Pricing.Action>
          </Pricing.Plan>
        </Pricing.Plans>
      </Pricing.Root>,
    );
    expect(screen.getByRole("region", { name: "Plans" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Team");
    expect(screen.getByRole("button", { name: "Choose Team" })).toBeInTheDocument();
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

describe("Features", () => {
  it("renders a list of titled tiles with hidden icons", async () => {
    const { container } = render(
      <Features.Root aria-labelledby="why">
        <h2 id="why">Why LoamUI</h2>
        <Features.Grid>
          <Features.Item>
            <Features.Icon>
              <svg viewBox="0 0 16 16" />
            </Features.Icon>
            <Features.Title>Three primitives</Features.Title>
            <Features.Body>Tokens, element styles and components.</Features.Body>
          </Features.Item>
        </Features.Grid>
      </Features.Root>,
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Three primitives");
    expect(container.querySelector(".loam-Features .icon")).toHaveAttribute("aria-hidden", "true");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
