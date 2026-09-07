import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Avatar, Badge, Time } from "@loamui/core";
import { ArticleCard } from "../components/ArticleCard/index";
import { Byline } from "../components/Byline/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("ArticleCard", () => {
  it("is a Card holding an article named by its title, whose title is the link and whose foot is a Byline, with no axe violations", async () => {
    const { container } = render(
      <ArticleCard.Root>
        <ArticleCard.Media>
          <img src="/static-css.jpg" alt="" />
        </ArticleCard.Media>
        <ArticleCard.Meta>
          <Badge>Engineering</Badge>
          <Time value="2026-08-12" locale="en-GB" dateStyle="long" />
        </ArticleCard.Meta>
        <ArticleCard.Title>
          <a href="/blog/static-css">Why the stylesheet is one static file</a>
        </ArticleCard.Title>
        <ArticleCard.Description>Nothing runs at runtime.</ArticleCard.Description>
        <ArticleCard.Byline>
          <Avatar name="Imogen Hartley" aria-hidden />
          <Byline.Author href="/authors/imogen-hartley">Imogen Hartley</Byline.Author>
        </ArticleCard.Byline>
      </ArticleCard.Root>,
    );
    const card = container.firstElementChild!;
    expect(card).toHaveClass("loam-Card");
    expect(card).not.toHaveClass("loam-ArticleCard");
    const article = card.firstElementChild!;
    expect(article.tagName).toBe("ARTICLE");
    expect(article).toHaveClass("loam-ArticleCard");

    // The article is named by its Title, so a list of the page's articles
    // reads as a list of titles.
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveAttribute("id");
    expect(article).toHaveAttribute("aria-labelledby", heading.id);
    expect(screen.getByRole("article", { name: "Why the stylesheet is one static file" })).toBe(
      article,
    );
    expect(
      screen.getByRole("link", { name: "Why the stylesheet is one static file" }),
    ).toHaveAttribute("href", "/blog/static-css");

    // The picture is first, in the composition's own slot.
    expect(article.firstElementChild).toHaveClass("media");
    expect(article.querySelector("div.media > img")).not.toBeNull();
    // The date is core's Time.
    const time = article.querySelector("p.meta > time")!;
    expect(time).toHaveAttribute("dateTime", "2026-08-12");
    expect(time).toHaveTextContent("12 August 2026");
    expect(article.querySelector("p.description")).toHaveTextContent("Nothing runs at runtime.");

    // The foot is the composition's own element around the Byline.
    const foot = article.lastElementChild!;
    expect(foot).toHaveClass("foot");
    const byline = foot.querySelector(":scope > .loam-Byline")!;
    expect(byline).not.toBeNull();
    expect(byline.querySelector("address.author a")).toHaveAttribute("rel", "author");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("renders as a list item through the Card's render, with the title at the level the consumer chooses", async () => {
    const { container } = render(
      <ul>
        <ArticleCard.Root render={<li />}>
          <ArticleCard.Title render={<h2 />}>
            <a href="/blog/one">One</a>
          </ArticleCard.Title>
        </ArticleCard.Root>
      </ul>,
    );
    const item = screen.getByRole("listitem");
    expect(item).toHaveClass("loam-Card");
    expect(item.querySelector(":scope > article.loam-ArticleCard")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("One");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("puts className and ref on the Card, names the article by the consumer's words, and names nothing without a Title", () => {
    let node: HTMLDivElement | null = null;
    const { container } = render(
      <>
        <ArticleCard.Root
          className="featured"
          ref={(el) => {
            node = el;
          }}
          aria-label="Featured article"
        >
          <ArticleCard.Title id="one">
            <a href="/blog/one">One</a>
          </ArticleCard.Title>
        </ArticleCard.Root>
        <ArticleCard.Root>
          <ArticleCard.Description>No title.</ArticleCard.Description>
        </ArticleCard.Root>
      </>,
    );
    const [named, unnamed] = container.querySelectorAll("article.loam-ArticleCard");
    expect(node).toBe(container.firstElementChild);
    expect(container.firstElementChild).toHaveClass("loam-Card", "featured");
    expect(named).toHaveAttribute("aria-label", "Featured article");
    expect(named).not.toHaveAttribute("aria-labelledby");
    expect(screen.getByRole("heading", { level: 3 })).toHaveAttribute("id", "one");
    expect(unnamed).not.toHaveAttribute("aria-labelledby");
  });

  it("puts the Byline part's className on the foot and the rest on the Byline", () => {
    const { container } = render(
      <ArticleCard.Root>
        <ArticleCard.Byline className="credits" data-testid="byline">
          <Byline.Author>Sunniva Berg</Byline.Author>
        </ArticleCard.Byline>
      </ArticleCard.Root>,
    );
    const foot = container.querySelector("div.foot")!;
    expect(foot).toHaveClass("credits");
    expect(screen.getByTestId("byline")).toHaveClass("loam-Byline");
    expect(screen.getByTestId("byline").parentElement).toBe(foot);
  });
});
