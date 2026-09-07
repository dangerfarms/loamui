import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Avatar } from "@loamui/core";
import { ArticleHeader } from "../components/ArticleHeader/index";
import { Byline } from "../components/Byline/index";
import { TagList } from "../components/TagList/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("ArticleHeader", () => {
  it("is a header named by its h1, with the category, standfirst, byline, tags and lead image in their slots, with no axe violations", async () => {
    const { container } = render(
      <article>
        <ArticleHeader.Root>
          <ArticleHeader.Eyebrow>
            <a href="/blog/engineering">Engineering</a>
          </ArticleHeader.Eyebrow>
          <ArticleHeader.Title>Why the stylesheet is one static file</ArticleHeader.Title>
          <ArticleHeader.Description>
            Nothing runs at runtime, and that is the point.
          </ArticleHeader.Description>
          <ArticleHeader.Meta>
            <Byline.Root>
              <Avatar name="Imogen Hartley" aria-hidden />
              <Byline.Author href="/authors/imogen-hartley">Imogen Hartley</Byline.Author>
              <Byline.Published value="2026-08-12" locale="en-GB" dateStyle="long" />
            </Byline.Root>
          </ArticleHeader.Meta>
          <ArticleHeader.Tags>
            <TagList.Root>
              <TagList.Item href="/tags/css">CSS</TagList.Item>
            </TagList.Root>
          </ArticleHeader.Tags>
          <ArticleHeader.Media>
            <img src="/lead.jpg" alt="" />
            <figcaption>Photograph: Sunniva Berg</figcaption>
          </ArticleHeader.Media>
        </ArticleHeader.Root>
        <p>The body.</p>
      </article>,
    );
    const header = container.querySelector("header.loam-ArticleHeader")!;
    expect(header).not.toBeNull();
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Why the stylesheet is one static file");
    expect(heading).toHaveClass("title");
    expect(header).toHaveAttribute("aria-labelledby", heading.id);

    // The category is a paragraph above the title, never a heading.
    const eyebrow = header.querySelector("p.eyebrow")!;
    expect(eyebrow.querySelector("a")).toHaveAttribute("href", "/blog/engineering");
    expect(screen.getAllByRole("heading")).toHaveLength(1);
    expect(header.querySelector("p.description")).toHaveTextContent(
      "Nothing runs at runtime, and that is the point.",
    );
    expect(header.querySelector("div.meta > .loam-Byline")).not.toBeNull();
    expect(header.querySelector("div.tags > ul.loam-TagList")).not.toBeNull();
    const figure = header.querySelector("figure.media")!;
    expect(figure.querySelector("img")).toHaveAttribute("alt", "");
    expect(figure.querySelector("figcaption")).toHaveTextContent("Photograph: Sunniva Berg");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("renders the title at another level through render, keeps a consumer's name, and names nothing without a Title", () => {
    const { container } = render(
      <>
        <ArticleHeader.Root aria-label="Featured">
          <ArticleHeader.Title render={<h2 />} id="one">
            One
          </ArticleHeader.Title>
        </ArticleHeader.Root>
        <ArticleHeader.Root>
          <ArticleHeader.Description>No title.</ArticleHeader.Description>
        </ArticleHeader.Root>
      </>,
    );
    const [named, unnamed] = container.querySelectorAll("header.loam-ArticleHeader");
    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute("id", "one");
    expect(named).toHaveAttribute("aria-label", "Featured");
    expect(named).not.toHaveAttribute("aria-labelledby");
    expect(unnamed).not.toHaveAttribute("aria-labelledby");
  });
});
