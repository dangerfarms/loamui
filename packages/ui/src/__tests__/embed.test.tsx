import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Embed } from "../index";

afterEach(cleanup);
// jsdom has no real frames, so axe must not try to reach into the iframe.
const axeOptions = { iframes: false, rules: { "color-contrast": { enabled: false } } };

describe("Embed", () => {
  it("is a figure holding a titled, lazy iframe and its caption", async () => {
    const { container } = render(
      <Embed.Root>
        <Embed.Frame
          src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
          title="Building a form with LoamUI (4 min)"
        />
        <Embed.Caption>A walkthrough of the Field parts.</Embed.Caption>
      </Embed.Root>,
    );
    const figure = screen.getByRole("figure");
    expect(figure).toHaveClass("loam-Embed");
    const frame = figure.querySelector("iframe.frame");
    expect(frame).toHaveAttribute("title", "Building a form with LoamUI (4 min)");
    expect(frame).toHaveAttribute("loading", "lazy");
    expect(frame).toHaveAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    expect(frame).toHaveAttribute("allowfullscreen");
    expect(figure.querySelector("figcaption.caption")).toHaveTextContent(
      "A walkthrough of the Field parts.",
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("stands without a caption and forwards iframe attributes", async () => {
    const { container } = render(
      <Embed.Root>
        <Embed.Frame src="https://example.com/map" title="Map of the office" loading="eager" />
      </Embed.Root>,
    );
    const frame = container.querySelector("iframe.frame");
    expect(frame).toHaveAttribute("loading", "eager");
    expect(container.querySelector("figcaption")).toBeNull();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("requires a title at the type level", () => {
    // @ts-expect-error a Frame without a title does not compile
    const untitled = <Embed.Frame src="https://example.com/map" />;
    expect(untitled.props.title).toBeUndefined();
  });
});
