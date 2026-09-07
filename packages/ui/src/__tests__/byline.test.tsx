import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Avatar } from "@loamui/core";
import { Byline } from "../components/Byline/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Byline", () => {
  it("is a row whose author is an address around a rel=author link and whose date is a time, with no axe violations", async () => {
    const { container } = render(
      <Byline.Root>
        <Avatar name="Imogen Hartley" aria-hidden />
        <Byline.Author href="/authors/imogen-hartley">Imogen Hartley</Byline.Author>
        <Byline.Published value="2026-08-12" locale="en-GB" dateStyle="long" />
        <Byline.ReadingTime>6 min read</Byline.ReadingTime>
      </Byline.Root>,
    );
    const root = container.firstElementChild!;
    expect(root.tagName).toBe("DIV");
    expect(root).toHaveClass("loam-Byline");
    const author = screen.getByRole("link", { name: "Imogen Hartley" });
    expect(author).toHaveAttribute("href", "/authors/imogen-hartley");
    expect(author).toHaveAttribute("rel", "author");
    const address = author.parentElement!;
    expect(address.tagName).toBe("ADDRESS");
    expect(address).toHaveClass("author");
    expect(address.parentElement).toBe(root);
    const published = screen.getByText("12 August 2026");
    expect(published.tagName).toBe("TIME");
    expect(published).toHaveAttribute("dateTime", "2026-08-12");
    expect(published.parentElement).toHaveClass("published");
    expect(screen.getByText("6 min read")).toHaveClass("reading-time");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("writes the visible word Updated before the second time, or the word you give it", async () => {
    const { container } = render(
      <Byline.Root>
        <Byline.Author href="/authors/sunniva-berg">Sunniva Berg</Byline.Author>
        <Byline.Published value="2026-07-29" locale="en-GB" dateStyle="long" />
        <Byline.Updated value="2026-08-14" locale="en-GB" dateStyle="long" />
      </Byline.Root>,
    );
    const times = container.querySelectorAll("time");
    expect(times).toHaveLength(2);
    expect(times[0]).toHaveAttribute("dateTime", "2026-07-29");
    expect(times[1]).toHaveAttribute("dateTime", "2026-08-14");
    const updated = times[1]!.parentElement!;
    expect(updated).toHaveClass("updated");
    expect(updated).toHaveTextContent(/^Updated 14 August 2026$/);
    expect(updated.firstChild!.nodeType).toBe(Node.TEXT_NODE);
    expect(updated).not.toHaveAttribute("title");
    expect(await axe(container, axeOptions)).toHaveNoViolations();

    cleanup();
    render(
      <Byline.Root>
        <Byline.Updated value="2026-08-14" locale="nb" dateStyle="long">
          Oppdatert
        </Byline.Updated>
      </Byline.Root>,
    );
    expect(screen.getByText(/^Oppdatert/)).toHaveTextContent(/^Oppdatert 14\. august 2026$/);
  });

  it("writes the author as plain text when there is no profile to link to", async () => {
    const { container } = render(
      <Byline.Root>
        <Byline.Author>Tomasz Wieczorek</Byline.Author>
        <Byline.Published value="2026-07-15" locale="en-GB" dateStyle="long" />
      </Byline.Root>,
    );
    expect(screen.queryByRole("link")).toBeNull();
    const author = screen.getByText("Tomasz Wieczorek");
    expect(author.tagName).toBe("SPAN");
    expect(author.parentElement!.tagName).toBe("ADDRESS");
    expect(author.parentElement).toHaveClass("author");
    expect(author).not.toHaveAttribute("rel");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("keeps rel=author on a rendered link and merges the consumer's rel", () => {
    render(
      <Byline.Root>
        <Byline.Author render={<a href="/authors/one" data-router />} rel="nofollow">
          One
        </Byline.Author>
      </Byline.Root>,
    );
    const author = screen.getByRole("link", { name: "One" });
    expect(author).toHaveAttribute("data-router");
    expect(author).toHaveAttribute("href", "/authors/one");
    expect(author).toHaveAttribute("rel", "author nofollow");
    expect(author.parentElement!.tagName).toBe("ADDRESS");
  });
});
