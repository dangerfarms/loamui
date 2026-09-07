import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Avatar, Badge } from "@loamui/core";
import { ArticleCard } from "../components/ArticleCard/index";
import { Byline } from "../components/Byline/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("ArticleCard", () => {
  it("is a Card holding an article whose title is the link and whose foot is a Byline, with no axe violations", async () => {
    const { container } = render(
      <ArticleCard.Root>
        <ArticleCard.Meta>
          <Badge>Engineering</Badge>
          <time dateTime="2026-08-12">12 August 2026</time>
        </ArticleCard.Meta>
        <ArticleCard.Title>
          <a href="/blog/static-css">Why the stylesheet is one static file</a>
        </ArticleCard.Title>
        <ArticleCard.Excerpt>Nothing runs at runtime.</ArticleCard.Excerpt>
        <ArticleCard.Byline>
          <Avatar name="Imogen Hartley" aria-hidden />
          <Byline.Author href="/authors/imogen-hartley">Imogen Hartley</Byline.Author>
        </ArticleCard.Byline>
      </ArticleCard.Root>,
    );
    const card = container.firstElementChild!;
    expect(card).toHaveClass("loam-Card");
    expect(card).not.toHaveClass("loam-ArticleCard");
    expect(card.firstElementChild!.tagName).toBe("ARTICLE");
    expect(card.firstElementChild).toHaveClass("loam-ArticleCard");
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Why the stylesheet is one static file" }),
    ).toHaveAttribute("href", "/blog/static-css");
    expect(screen.getByText("12 August 2026").tagName).toBe("TIME");
    const byline = card.querySelector("article.loam-ArticleCard > .loam-Byline")!;
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
});
