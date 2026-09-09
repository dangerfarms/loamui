import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

/** jsdom's own `files` setter takes only a FileList nothing can construct. */
function choose(input: HTMLInputElement, files: File[]) {
  Object.defineProperty(input, "files", { configurable: true, writable: true, value: files });
  fireEvent.change(input);
}

describe("dropzone", () => {
  it("is a labelled native file input that lists a good choice and refuses a bad one by name", async () => {
    const { container } = render(<Example />);
    const input = screen.getByLabelText(/Plot photos/) as HTMLInputElement;
    expect(input.type).toBe("file");
    expect(input).toHaveAttribute("accept", "image/jpeg,image/png");
    expect(input).toHaveAttribute("multiple");
    expect(input).toHaveAccessibleDescription("JPEG or PNG, up to 10 MB each, five at most.");
    expect(screen.getByLabelText(/Drop photos here/)).toBe(input);
    expect(await axe(container, axeOptions)).toHaveNoViolations();

    const big = new File(["x"], "bed-b14.jpg", { type: "image/jpeg" });
    Object.defineProperty(big, "size", { value: 14_200_000 });
    choose(input, [big]);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "bed-b14.jpg is 14.2 MB. Each photo must be under 10 MB: choose a smaller copy",
    );
    expect(input).toHaveAttribute("aria-invalid", "true");

    choose(input, [new File(["meadow"], "meadow.png", { type: "image/png" })]);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(screen.getByRole("list")).toHaveTextContent("meadow.png 6 bytes");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
