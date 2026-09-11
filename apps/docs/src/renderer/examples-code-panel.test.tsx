import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { ExampleCodePanel } from "./examples-code-panel";

const { loadCode } = vi.hoisted(() => ({ loadCode: vi.fn() }));
vi.mock("./examples-code", () => {
  loadCode();
  return { ExampleCode: () => <input aria-label="Code state" defaultValue="initial" /> };
});

afterEach(cleanup);

const props = {
  source: { tsx: "export default function Example() {}", css: "" },
  href: "/examples/forms/sign-in",
};

describe("ExampleCodePanel", () => {
  it("serves a source link without JavaScript or highlighted code", () => {
    const html = renderToString(<ExampleCodePanel {...props} />);
    expect(html).toContain("/examples/forms/sign-in#code");
    expect(html).not.toContain("<pre");
    expect(loadCode).not.toHaveBeenCalled();
  });

  it("loads code only on opening and retains its state across close and reopen", async () => {
    const { container } = render(<ExampleCodePanel {...props} />);
    expect(loadCode).not.toHaveBeenCalled();
    const details = container.querySelector("details")!;
    details.open = true;
    fireEvent(details, new Event("toggle"));
    const control = await screen.findByRole("textbox", { name: "Code state" });
    expect(loadCode).toHaveBeenCalledTimes(1);
    fireEvent.change(control, { target: { value: "retained" } });

    details.open = false;
    fireEvent(details, new Event("toggle"));
    expect(control).toBeInTheDocument();
    details.open = true;
    fireEvent(details, new Event("toggle"));
    expect(screen.getByRole("textbox", { name: "Code state" })).toHaveValue("retained");
    expect(loadCode).toHaveBeenCalledTimes(1);
  });
});
