import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { ExamplePreview } from "./examples-preview";

afterEach(cleanup);

describe("ExamplePreview", () => {
  it("keeps whole-document effects out of the host page", () => {
    const renderRecipe = vi.fn(() => <p>Whole-document recipe</p>);
    const Recipe = renderRecipe;
    render(
      <ExamplePreview slug="scheme-toggle">
        <Recipe />
      </ExamplePreview>,
    );
    expect(renderRecipe).not.toHaveBeenCalled();
    expect(screen.getByTitle("Colour scheme example — independent page")).toHaveAttribute(
      "src",
      "/preview/scheme-toggle/",
    );
  });

  it("renders ordinary recipes directly", () => {
    render(
      <ExamplePreview slug="cart-line">
        <p>Live recipe</p>
      </ExamplePreview>,
    );
    expect(screen.getByText("Live recipe")).toBeVisible();
    expect(document.querySelector("iframe")).toBeNull();
  });
});
