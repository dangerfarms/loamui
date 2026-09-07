import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Gallery } from "../index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

function Photo({ n, caption }: { n: number; caption?: string }) {
  return (
    <Gallery.Item>
      <Gallery.Link href={`/photos/${n}.jpg`}>
        <img src={`/photos/${n}-thumb.jpg`} alt={`Harbour view ${n}`} />
      </Gallery.Link>
      {caption && <Gallery.Caption>{caption}</Gallery.Caption>}
    </Gallery.Item>
  );
}

describe("Gallery", () => {
  it("is a list of figures whose links go to the full-size image", async () => {
    const { container } = render(
      <Gallery.Root>
        <Photo n={1} caption="The harbour" />
        <Photo n={2} />
        <Photo n={3} />
      </Gallery.Root>,
    );
    const list = screen.getByRole("list");
    expect(list).toHaveClass("loam-Gallery");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(container.querySelectorAll("li > figure.loam-Gallery-item")).toHaveLength(3);
    for (const n of [1, 2, 3]) {
      expect(screen.getByRole("link", { name: `Harbour view ${n}` })).toHaveAttribute(
        "href",
        `/photos/${n}.jpg`,
      );
    }
    const caption = container.querySelector("figure.loam-Gallery-item > figcaption.caption");
    expect(caption).toHaveTextContent("The harbour");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
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

  it("opens the full-size image in a dialog on click, and closes it again", async () => {
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

  it("leaves a modified click to the link itself", async () => {
    const user = userEvent.setup();
    render(<Photo n={6} />);
    await user.keyboard("{Meta>}");
    await user.click(screen.getByRole("link", { name: "Harbour view 6" }));
    await user.keyboard("{/Meta}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
