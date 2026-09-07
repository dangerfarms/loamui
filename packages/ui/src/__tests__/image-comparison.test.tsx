import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { axe } from "vitest-axe";
import { ImageComparison } from "../index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

function Comparison() {
  return (
    <ImageComparison.Root>
      <ImageComparison.Before>
        <img src="/before.jpg" alt="The kitchen before the renovation" />
      </ImageComparison.Before>
      <ImageComparison.After>
        <img src="/after.jpg" alt="The kitchen after the renovation" />
      </ImageComparison.After>
      <ImageComparison.Handle label="Reveal the after image" />
      <ImageComparison.Caption>The kitchen, before and after.</ImageComparison.Caption>
    </ImageComparison.Root>
  );
}

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

  it("writes the slider's value onto the root as --_position", () => {
    render(<Comparison />);
    const figure = screen.getByRole("figure");
    expect(figure.style.getPropertyValue("--_position")).toBe("");
    fireEvent.input(screen.getByRole("slider"), { target: { value: "30" } });
    expect(figure.style.getPropertyValue("--_position")).toBe("30%");
  });
});
