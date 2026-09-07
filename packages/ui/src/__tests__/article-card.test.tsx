import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Avatar, Badge } from "@loamui/core";
import { ArticleCard } from "../components/ArticleCard/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("ArticleCard", () => {
  it("is a Card holding an article whose title is the link, with no axe violations", async () => {
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
        <ArticleCard.Author>
          <Avatar name="Imogen Hartley" aria-hidden />
          Imogen Hartley
        </ArticleCard.Author>
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
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("sits in a list the consumer wrote, with the title at the level they choose", async () => {
    const { container } = render(
      <ul>
        <li>
          <ArticleCard.Root>
            <ArticleCard.Title render={<h2 />}>
              <a href="/blog/one">One</a>
            </ArticleCard.Title>
          </ArticleCard.Root>
        </li>
      </ul>,
    );
    expect(
      screen.getByRole("listitem").querySelector(".loam-Card article.loam-ArticleCard"),
    ).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("One");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
