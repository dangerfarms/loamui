import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Faq } from "../components/Faq/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Faq", () => {
  it("renders a labelled section of native disclosures sharing a name, with no axe violations", async () => {
    const { container } = render(
      <Faq.Root aria-labelledby="t">
        <h2 id="t">Questions</h2>
        <Faq.List>
          <Faq.Item name="faq" summary="Does it work without JavaScript?">
            Yes. The stylesheet is static CSS and the disclosures are native.
          </Faq.Item>
          <Faq.Item name="faq" summary="Which browsers are supported?">
            Every browser with Baseline Newly Available CSS.
          </Faq.Item>
        </Faq.List>
      </Faq.Root>,
    );
    expect(screen.getByRole("region", { name: "Questions" })).toHaveClass("loam-Faq");
    const items = container.querySelectorAll("details");
    expect(items).toHaveLength(2);
    for (const item of items) {
      expect(item).toHaveClass("loam-Details");
      expect(item).toHaveAttribute("name", "faq");
      expect(item.querySelector("summary")).not.toBeNull();
    }
    expect(screen.getByText("Does it work without JavaScript?")).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("forwards native details props such as defaultOpen", () => {
    const { container } = render(
      <Faq.Root>
        <Faq.List>
          <Faq.Item summary="Open by default" defaultOpen>
            Shown on first render.
          </Faq.Item>
        </Faq.List>
      </Faq.Root>,
    );
    expect(container.querySelector("details")).toHaveAttribute("open");
  });
});
