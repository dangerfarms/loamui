import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { EXAMPLES } from "@/examples";

afterEach(() => {
  cleanup();
  delete document.documentElement.dataset.theme;
  localStorage.clear();
});

describe("copyable examples", () => {
  it.each(EXAMPLES)("$category/$slug has independent identities when repeated", ({ Example }) => {
    const { container } = render(
      <>
        <div data-instance>
          <Example />
        </div>
        <div data-instance>
          <Example />
        </div>
      </>,
    );
    const ids = Array.from(container.querySelectorAll("[id]"), (element) => element.id);
    expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual([]);
    for (const instance of container.querySelectorAll("[data-instance]")) {
      const localIds = new Set(
        Array.from(instance.querySelectorAll("[id]"), (element) => element.id),
      );
      for (const link of instance.querySelectorAll('a[href^="#"]')) {
        const id = link.getAttribute("href")!.slice(1);
        if (id) expect(localIds.has(id), `#${id} must resolve inside its instance`).toBe(true);
      }
      for (const element of instance.querySelectorAll(
        "[for], [aria-labelledby], [aria-describedby], [aria-controls]",
      )) {
        for (const attribute of ["for", "aria-labelledby", "aria-describedby", "aria-controls"]) {
          for (const id of element.getAttribute(attribute)?.split(/\s+/) ?? []) {
            expect(localIds.has(id), `${attribute}=${id} must resolve inside its instance`).toBe(
              true,
            );
          }
        }
      }
    }
  });
});
