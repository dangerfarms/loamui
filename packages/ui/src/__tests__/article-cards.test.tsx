import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Avatar, Badge } from "@loamui/core";
import { ArticleCards } from "../components/ArticleCards/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("ArticleCards", () => {
  it("renders a section with a list of cards, linked titles and no axe violations", async () => {
    const { container } = render(
      <ArticleCards.Root aria-labelledby="t">
        <h2 id="t">From the blog</h2>
        <ArticleCards.Grid>
          <ArticleCards.Card>
            <ArticleCards.Meta>
              <Badge>Engineering</Badge>
              <time dateTime="2026-08-12">12 August 2026</time>
            </ArticleCards.Meta>
            <ArticleCards.Title>
              <a href="/blog/static-css">Why the stylesheet is one static file</a>
            </ArticleCards.Title>
            <ArticleCards.Excerpt>
              Nothing runs at runtime. Cascade layers order the styles, scope fences them and the
              browser does the rest.
            </ArticleCards.Excerpt>
            <ArticleCards.Author>
              <Avatar name="Imogen Hartley" aria-hidden />
              Imogen Hartley
            </ArticleCards.Author>
          </ArticleCards.Card>
          <ArticleCards.Card>
            <ArticleCards.Meta>
              <Badge>Design</Badge>
              <time dateTime="2026-07-29">29 July 2026</time>
            </ArticleCards.Meta>
            <ArticleCards.Title>
              <a href="/blog/contextualism">A region decides, the controls follow</a>
            </ArticleCards.Title>
            <ArticleCards.Excerpt>
              Set one property on a region and every control inside answers it.
            </ArticleCards.Excerpt>
            <ArticleCards.Author>
              <Avatar name="Sunniva Berg" aria-hidden />
              Sunniva Berg
            </ArticleCards.Author>
          </ArticleCards.Card>
        </ArticleCards.Grid>
      </ArticleCards.Root>,
    );
    const region = screen.getByRole("region", { name: "From the blog" });
    expect(region).toHaveClass("loam-ArticleCards");
    expect(screen.getByRole("list")).toHaveClass("grid");
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]?.firstElementChild).toHaveClass("loam-Card", "loam-ArticleCards-card");
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
    expect(
      screen.getByRole("link", { name: "Why the stylesheet is one static file" }),
    ).toHaveAttribute("href", "/blog/static-css");
    expect(screen.getByText("12 August 2026").tagName).toBe("TIME");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
