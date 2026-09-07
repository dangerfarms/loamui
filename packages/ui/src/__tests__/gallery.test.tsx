import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Gallery } from "../index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

function Photo({ n, caption, label }: { n: number; caption?: string; label?: string }) {
  return (
    <Gallery.Item>
      <Gallery.Link href={`/photos/${n}.jpg`} label={label}>
        <img src={`/photos/${n}-thumb.jpg`} alt={`Harbour view ${n}`} />
      </Gallery.Link>
      {caption && <Gallery.Caption>{caption}</Gallery.Caption>}
    </Gallery.Item>
  );
}

describe("Gallery", () => {
  it("is a list whose items are the list items, each holding a figure that links to the full-size image", async () => {
    const { container } = render(
      <Gallery.Root>
        <Photo n={1} caption="The harbour" />
        <Photo n={2} />
        <Photo n={3} />
      </Gallery.Root>,
    );
    const list = screen.getByRole("list");
    expect(list).toHaveClass("loam-Gallery");
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    for (const item of items) expect(item).toHaveClass("loam-Gallery-item");
    expect(container.querySelectorAll("li.loam-Gallery-item > figure")).toHaveLength(3);
    expect(container.querySelector("figure.loam-Gallery-item")).toBeNull();
    for (const n of [1, 2, 3]) {
      expect(screen.getByRole("link", { name: `Harbour view ${n}` })).toHaveAttribute(
        "href",
        `/photos/${n}.jpg`,
      );
    }
    const caption = container.querySelector("li.loam-Gallery-item > figure > figcaption.caption");
    expect(caption).toHaveTextContent("The harbour");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("puts a class, a style and a ref on the list item it renders in a Root", () => {
    const ref = { current: null as HTMLElement | null };
    render(
      <Gallery.Root>
        <Gallery.Item ref={ref} className="wide" style={{ gridColumn: "span 2" }}>
          <Gallery.Link href="/photos/9.jpg">
            <img src="/photos/9-thumb.jpg" alt="Harbour view 9" />
          </Gallery.Link>
        </Gallery.Item>
      </Gallery.Root>,
    );
    const item = screen.getByRole("listitem");
    expect(item).toHaveClass("loam-Gallery-item", "wide");
    expect(item).toHaveStyle({ gridColumn: "span 2" });
    expect(ref.current).toBe(item);
  });

  it("stands alone as a figure without a Root", async () => {
    const { container } = render(<Photo n={4} caption="Alone" />);
    expect(container.querySelector("figure.loam-Gallery-item")).not.toBeNull();
    expect(container.querySelector("li")).toBeNull();
    expect(container.querySelector(".loam-Gallery")).toBeNull();
    expect(screen.getByRole("link", { name: "Harbour view 4" })).toHaveAttribute(
      "href",
      "/photos/4.jpg",
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("renders as another element when asked", () => {
    const { container } = render(
      <Gallery.Item render={<div />} data-testid="item">
        <Gallery.Link href="/photos/8.jpg">
          <img src="/photos/8-thumb.jpg" alt="Harbour view 8" />
        </Gallery.Link>
      </Gallery.Item>,
    );
    const item = screen.getByTestId("item");
    expect(item.tagName).toBe("DIV");
    expect(item).toHaveClass("loam-Gallery-item");
    expect(container.querySelector("figure")).toBeNull();
    expect(item).toContainElement(screen.getByRole("link", { name: "Harbour view 8" }));
  });

  it("opens the full-size image in a dialog named by the alt on click, and closes it again", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Gallery.Root>
        <Photo n={5} />
      </Gallery.Root>,
    );
    // Nothing full-size is fetched for a lightbox nobody has opened.
    expect(container.querySelector("img.full")).toBeNull();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Harbour view 5" }));
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAccessibleName("Harbour view 5");
    const full = dialog.querySelector("img.full");
    expect(full).toHaveAttribute("src", "/photos/5.jpg");
    expect(full).toHaveAttribute("alt", "Harbour view 5");
    expect(dialog.querySelector("figcaption")).toBeNull();
    expect(screen.getByRole("link", { name: "Harbour view 5" })).toHaveAttribute(
      "data-popup-open",
      "true",
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();

    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(screen.getByRole("link", { name: "Harbour view 5" })).not.toHaveAttribute(
      "data-popup-open",
    );
  });

  it("names the dialog after the caption when there is one, without repeating it inside", async () => {
    const user = userEvent.setup();
    const { container } = render(<Photo n={7} caption="The harbour wall" />);
    await user.click(screen.getByRole("link", { name: "Harbour view 7" }));
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAccessibleName("The harbour wall");
    expect(dialog.querySelector("figcaption")).toBeNull();
    expect(container.querySelectorAll("figcaption")).toHaveLength(1);
  });

  it("is never unnamed: a label wins, and a bare image still gets a name", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Photo n={10} caption="Ignored" label="Harbour, full size" />
        <Gallery.Item>
          <Gallery.Link href="/photos/11.jpg" data-testid="bare">
            <img src="/photos/11-thumb.jpg" alt="" />
          </Gallery.Link>
        </Gallery.Item>
      </>,
    );
    await user.click(screen.getByRole("link", { name: "Harbour view 10" }));
    expect(await screen.findByRole("dialog")).toHaveAccessibleName("Harbour, full size");
    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

    await user.click(screen.getByTestId("bare"));
    expect(await screen.findByRole("dialog")).toHaveAccessibleName("Image");
  });

  it("leaves a modified click to the link itself", async () => {
    const user = userEvent.setup();
    render(<Photo n={6} />);
    await user.keyboard("{Meta>}");
    await user.click(screen.getByRole("link", { name: "Harbour view 6" }));
    await user.keyboard("{/Meta}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
