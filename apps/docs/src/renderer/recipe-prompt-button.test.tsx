import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RecipePromptButton } from "./recipe-prompt-button";

const prompt = "Use the LoamUI skill to build the “Hero with image” recipe for my application.";
const href = "/recipe-prompts/heroes/hero-with-image.txt";

function setup() {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    headers: new Headers({ "content-type": "text/plain; charset=utf-8" }),
    text: async () => prompt,
  });
  vi.stubGlobal("fetch", fetchMock);
  class Item {
    constructor(public data: Record<string, Promise<Blob>>) {}
  }
  vi.stubGlobal("ClipboardItem", Item);
  const write = vi.fn().mockImplementation(async (items: Item[]) => {
    await items[0]!.data["text/plain"];
  });
  const writeText = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal("navigator", { ...navigator, clipboard: { write, writeText } });
  render(<RecipePromptButton title="Hero with image" href={href} prompt={prompt} />);
  return { fetchMock, write, writeText };
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("recipe prompt copying", () => {
  it("defers fetching until click and starts the clipboard write before the response resolves", async () => {
    const { fetchMock, write, writeText } = setup();
    expect(fetchMock).not.toHaveBeenCalled();
    const button = screen.getByRole("button", { name: "Copy prompt for Hero with image" });
    button.focus();
    fireEvent.click(button);
    expect(button).toHaveFocus();
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(write).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      href,
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Prompt copied"));
    expect(button).toHaveFocus();
    fireEvent.click(button);
    await waitFor(() => expect(writeText).toHaveBeenCalledWith(prompt));
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("keeps the visible prompt and full reference available when the clipboard refuses", async () => {
    const { write } = setup();
    write.mockRejectedValueOnce(new Error("Permission denied"));
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Could not copy"));
    expect(
      screen.getByRole("link", { name: "Full reference for Hero with image" }),
    ).toHaveAttribute("href", href.replace(/\.txt$/, ".full.txt"));
    expect(screen.getByRole("button")).toHaveTextContent("Copy prompt");
    expect(screen.getByText(prompt)).toBeVisible();
  });

  it("does not copy a missing prompt or an HTML error page as source", async () => {
    const { fetchMock } = setup();
    fetchMock.mockResolvedValueOnce({
      ok: true,
      headers: new Headers({ "content-type": "text/html" }),
    });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Could not copy"));
  });

  it("allows a second explicit gesture when asynchronous clipboard items are unsupported", async () => {
    const { writeText } = setup();
    vi.stubGlobal("ClipboardItem", undefined);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Press Copy prompt again"),
    );
    expect(writeText).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith(prompt));
  });
});
