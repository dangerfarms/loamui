import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Avatar, Card } from "@loamui/core";
import { Carousel } from "../components/Carousel/index";
import { Testimonial } from "../components/Testimonial/index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Testimonial", () => {
  it("is a figure whose quote is a blockquote and whose author is the caption, with a name and a role", async () => {
    const { container } = render(
      <Testimonial.Root>
        <Testimonial.Quote cite="https://example.com/review">It just worked.</Testimonial.Quote>
        <Testimonial.Author>
          <Avatar name="Priya Natarajan" aria-hidden />
          <Testimonial.Name>Priya Natarajan</Testimonial.Name>
          <Testimonial.Role>Head of product, logistics</Testimonial.Role>
        </Testimonial.Author>
      </Testimonial.Root>,
    );
    const figure = container.querySelector("figure.loam-Testimonial")!;
    expect(figure.querySelector("blockquote.quote")).toHaveAttribute(
      "cite",
      "https://example.com/review",
    );
    const author = figure.querySelector("figcaption.author")!;
    expect(author).toHaveTextContent("Priya Natarajan");
    expect(author).toHaveTextContent("Head of product, logistics");
    // The children are rendered as written: the stylesheet places them,
    // and nothing is re-parented, so the DOM is what the consumer wrote.
    const children = Array.from(author.children);
    expect(children).toHaveLength(3);
    expect(children[0]).toHaveClass("loam-Avatar");
    expect(children[1]).toHaveClass("name");
    expect(children[2]).toHaveClass("role");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("keeps the name and role as direct children whatever order they were written in, and needs no avatar", () => {
    const { container } = render(
      <Testimonial.Root>
        <Testimonial.Quote>It just worked.</Testimonial.Quote>
        <Testimonial.Author>
          <Testimonial.Role>Founder</Testimonial.Role>
          <Testimonial.Name>
            <a href="/people/sam">Sam Reid</a>
          </Testimonial.Name>
        </Testimonial.Author>
      </Testimonial.Root>,
    );
    const author = container.querySelector("figcaption.author")!;
    expect(author.children).toHaveLength(2);
    expect(author.children[0]).toHaveClass("role");
    expect(author.children[1]).toHaveClass("name");
    expect(screen.getByRole("link", { name: "Sam Reid" })).toHaveAttribute("href", "/people/sam");
  });

  it("rides in a Carousel inside a Card without owning either", async () => {
    const { container } = render(
      <Carousel.Root aria-label="Quotes">
        <Carousel.Track>
          <Carousel.Item>
            <Card>
              <Testimonial.Root>
                <Testimonial.Quote>It just worked.</Testimonial.Quote>
              </Testimonial.Root>
            </Card>
          </Carousel.Item>
        </Carousel.Track>
        <Carousel.Controls />
      </Carousel.Root>,
    );
    expect(
      container.querySelector(".loam-Carousel ul.track li .loam-Card figure.loam-Testimonial"),
    ).not.toBeNull();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
