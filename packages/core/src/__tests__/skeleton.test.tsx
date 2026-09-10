import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Skeleton } from "../components/Skeleton/index";
import { Avatar } from "../components/Avatar/index";

afterEach(cleanup);

describe("Skeleton", () => {
  it("is a hidden placeholder that keeps its children in the DOM", () => {
    const { container } = render(
      <Skeleton>
        <Avatar name="Ada Lovelace" />
      </Skeleton>,
    );
    const root = container.querySelector(".loam-Skeleton")!;
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root.querySelector(".loam-Avatar")).not.toBeNull();
    expect(root).not.toHaveAttribute("style");
  });

  it("reveals the children when visible is false", () => {
    render(
      <Skeleton visible={false}>
        <Avatar name="Ada Lovelace" />
      </Skeleton>,
    );
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toBeInTheDocument();
    expect(document.querySelector(".loam-Skeleton")).toBeNull();
  });

  it("forwards attributes and ref to the root", () => {
    const ref = { current: null as HTMLDivElement | null };
    const { container } = render(<Skeleton ref={ref} className="mine" data-testid="sk" />);
    const root = container.querySelector(".loam-Skeleton");
    expect(root).toHaveClass("mine");
    expect(ref.current).toBe(root);
  });
});
