import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RecipePromptButton } from "./recipe-prompt-button";

const prompt = "Use the LoamUI skill to build the “Hero with image” recipe for my application.";

function setup() {
  const writeText = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });
  render(
    <section>
      <p>{prompt}</p>
      <RecipePromptButton title="Hero with image" prompt={prompt} />
    </section>,
  );
  return { writeText };
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("recipe prompt copying", () => {
  it("copies the displayed prompt on click and keeps keyboard focus", async () => {
    const { writeText } = setup();
    expect(writeText).not.toHaveBeenCalled();
    const button = screen.getByRole("button", { name: "Copy prompt for Hero with image" });
    button.focus();
    fireEvent.click(button);
    expect(writeText).toHaveBeenCalledWith(prompt);
    expect(button).toHaveAttribute("aria-disabled", "true");
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Prompt copied"));
    expect(button).toHaveFocus();
  });

  it("leaves the prompt available to select and allows retry after a clipboard refusal", async () => {
    const { writeText } = setup();
    writeText.mockRejectedValueOnce(new Error("Permission denied"));
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Could not copy"));
    expect(screen.getByText(prompt)).toBeVisible();
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Prompt copied"));
  });

  it("provides manual copying when the clipboard API is unavailable", async () => {
    setup();
    vi.stubGlobal("navigator", { ...navigator, clipboard: undefined });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Select and copy"));
    expect(screen.getByText(prompt)).toBeVisible();
  });
});
