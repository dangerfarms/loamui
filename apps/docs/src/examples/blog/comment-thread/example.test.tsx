import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("comment-thread", () => {
  it("nests two reply articles in a named list inside the parent comment", async () => {
    const { container } = render(<Example />);
    const parent = screen.getByRole("article", { name: "Dafydd Rees" });
    expect(parent).toHaveClass("comment-thread");
    const replies = screen.getByRole("list", { name: "Replies to Dafydd Rees" });
    expect(parent).toContainElement(replies);
    expect(within(replies).getAllByRole("listitem")).toHaveLength(2);
    expect(
      within(replies)
        .getAllByRole("article")
        .map((a) => a.getAttribute("aria-labelledby")),
    ).toEqual(["comment-thread-reply-1-author", "comment-thread-reply-2-author"]);
    expect(screen.getByRole("button", { name: "Reply to Priya Natarajan" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
