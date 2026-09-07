import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { axe } from "vitest-axe";
import { ImageComparison } from "../index";
import type { ImageComparisonHandleProps } from "../index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

function Comparison(handle: ImageComparisonHandleProps = {}) {
  return (
    <ImageComparison.Root>
      <ImageComparison.Before>
        <img src="/before.jpg" alt="The kitchen before the renovation" />
      </ImageComparison.Before>
      <ImageComparison.After>
        <img src="/after.jpg" alt="The kitchen after the renovation" />
      </ImageComparison.After>
      <ImageComparison.Handle {...handle} />
      <ImageComparison.Caption>The kitchen, before and after.</ImageComparison.Caption>
    </ImageComparison.Root>
  );
}

const position = () =>
  screen.getByRole("figure").style.getPropertyValue("--loam-comparison-position");

describe("ImageComparison", () => {
  it("is a figure of two named images with a named slider", async () => {
    const { container } = render(<Comparison />);
    const figure = screen.getByRole("figure");
    expect(figure).toHaveClass("loam-ImageComparison");
    expect(
      screen.getByRole("img", { name: "The kitchen before the renovation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "The kitchen after the renovation" }),
    ).toBeInTheDocument();
    const slider = screen.getByRole("slider", { name: "Reveal the after image" });
    expect(slider).toHaveValue("50");
    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "100");
    expect(figure).toContainElement(slider);
    expect(figure.querySelector("figcaption")).toHaveTextContent("The kitchen, before and after.");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("takes another label, and yields to an aria-labelledby", () => {
    const { rerender } = render(<Comparison label="Afficher l'après" />);
    expect(screen.getByRole("slider", { name: "Afficher l'après" })).toBeInTheDocument();
    rerender(
      <>
        <span id="reveal">Reveal</span>
        <Comparison aria-labelledby="reveal" />
      </>,
    );
    const slider = screen.getByRole("slider", { name: "Reveal" });
    expect(slider).not.toHaveAttribute("aria-label");
  });

  it("writes the slider's value onto the root as --loam-comparison-position", () => {
    render(<Comparison />);
    expect(position()).toBe("50%");
    fireEvent.input(screen.getByRole("slider"), { target: { value: "30" } });
    expect(screen.getByRole("slider")).toHaveValue("30");
    expect(position()).toBe("30%");
  });

  it("starts where defaultValue says", () => {
    render(<Comparison defaultValue={25} />);
    expect(screen.getByRole("slider")).toHaveValue("25");
    expect(position()).toBe("25%");
  });

  it("follows a controlled value and reports moves through onValueChange", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(<Comparison value={20} onValueChange={onValueChange} />);
    expect(screen.getByRole("slider")).toHaveValue("20");
    expect(position()).toBe("20%");

    fireEvent.input(screen.getByRole("slider"), { target: { value: "65" } });
    expect(onValueChange).toHaveBeenLastCalledWith(65);
    // The consumer has not accepted the move yet: the value and the
    // position stay where the prop says.
    expect(screen.getByRole("slider")).toHaveValue("20");
    expect(position()).toBe("20%");

    rerender(<Comparison value={65} onValueChange={onValueChange} />);
    expect(screen.getByRole("slider")).toHaveValue("65");
    expect(position()).toBe("65%");
  });

  it("leaves the position to the stylesheet's fallback when there is no Handle", () => {
    render(
      <ImageComparison.Root>
        <ImageComparison.Before>
          <img src="/before.jpg" alt="Before" />
        </ImageComparison.Before>
        <ImageComparison.After>
          <img src="/after.jpg" alt="After" />
        </ImageComparison.After>
      </ImageComparison.Root>,
    );
    expect(position()).toBe("");
  });
});
