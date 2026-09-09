import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("table-reviews", () => {
  it("is a captioned table whose split cells say both shares in words and whose ratings are named pictures", async () => {
    const { container } = render(<Example />);
    expect(container.querySelector("caption")).toHaveTextContent(/would grow it again/);
    expect(screen.getAllByRole("rowheader")).toHaveLength(6);
    const splits = container.querySelectorAll("td.split");
    expect(splits[0]).toHaveTextContent("91% would9% would not");
    expect(splits[0]?.querySelector("div.bar")).toHaveAttribute("aria-hidden", "true");
    expect(splits[0]?.querySelector("div.bar > span")).toHaveStyle({ inlineSize: "91%" });
    expect(screen.getAllByRole("img", { name: "4.7 out of 5" })).toHaveLength(1);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
