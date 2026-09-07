import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Avatar, Button } from "@loamui/core";
import { Comment } from "../components/Comment/index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Comment", () => {
  it("is an article named by its author with a machine-readable time", async () => {
    const { container } = render(
      <Comment.Root>
        <Comment.Header>
          <Avatar name="Priya Natarajan" aria-hidden />
          <Comment.Author render={<a href="/people/priya" />}>Priya Natarajan</Comment.Author>
          <Comment.Time value="2026-09-05T14:30:00Z" relative={{ now: "2026-09-07T09:00:00Z" }} />
        </Comment.Header>
        <Comment.Body>
          <p>The static stylesheet is the whole point.</p>
        </Comment.Body>
        <Comment.Actions>
          <Button>
            Reply<span className="loam-VisuallyHidden"> to Priya Natarajan</span>
          </Button>
        </Comment.Actions>
      </Comment.Root>,
    );
    const article = screen.getByRole("article", { name: "Priya Natarajan" });
    expect(article).toHaveClass("loam-Comment");
    expect(screen.getByRole("link", { name: "Priya Natarajan" })).toHaveClass("author");
    // The Time is core's, left as core renders it, in a span the row addresses.
    const time = article.querySelector("span.time > time")!;
    expect(time).toHaveAttribute("dateTime", "2026-09-05T14:30:00Z");
    expect(time).toHaveTextContent("2 days ago");
    expect(time.className).toBe("loam-Time");
    expect(screen.getByRole("button", { name: "Reply to Priya Natarajan" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("is named by an author whose text lives in the rendered link", () => {
    render(
      <Comment.Root>
        <Comment.Header>
          <Comment.Author render={<a href="/people/priya">Priya Natarajan</a>} />
        </Comment.Header>
      </Comment.Root>,
    );
    const article = screen.getByRole("article", { name: "Priya Natarajan" });
    const link = screen.getByRole("link", { name: "Priya Natarajan" });
    expect(article).toHaveAttribute("aria-labelledby", link.id);
  });

  it("points at the consumer's own id on the author", () => {
    render(
      <Comment.Root>
        <Comment.Header>
          <Comment.Author id="priya">Priya Natarajan</Comment.Author>
        </Comment.Header>
      </Comment.Root>,
    );
    expect(screen.getByRole("article", { name: "Priya Natarajan" })).toHaveAttribute(
      "aria-labelledby",
      "priya",
    );
    expect(screen.getByText("Priya Natarajan")).toHaveAttribute("id", "priya");
  });

  it("carries no aria-labelledby when there is no author to point at", () => {
    const { container } = render(
      <Comment.Root>
        <Comment.Body>
          <p>Anonymous.</p>
        </Comment.Body>
      </Comment.Root>,
    );
    expect(container.querySelector("article")).not.toHaveAttribute("aria-labelledby");
  });

  it("keeps a consumer's own name for the article", () => {
    render(
      <Comment.Root aria-label="Pinned comment">
        <Comment.Header>
          <Comment.Author>Priya Natarajan</Comment.Author>
        </Comment.Header>
      </Comment.Root>,
    );
    const article = screen.getByRole("article", { name: "Pinned comment" });
    expect(article).not.toHaveAttribute("aria-labelledby");
  });

  it("names the list of replies by its labels, or by the consumer's own name", () => {
    const { container } = render(
      <>
        <Comment.Replies labels={{ replies: "Svar" }}>
          <Comment.Reply>
            <Comment.Root>
              <Comment.Body>
                <p>Ja.</p>
              </Comment.Body>
            </Comment.Root>
          </Comment.Reply>
        </Comment.Replies>
        <h3 id="replies-to-priya">Replies to Priya</h3>
        <Comment.Replies aria-labelledby="replies-to-priya" />
      </>,
    );
    expect(screen.getByRole("list", { name: "Svar" })).toBeInTheDocument();
    const byHeading = screen.getByRole("list", { name: "Replies to Priya" });
    expect(byHeading).not.toHaveAttribute("aria-label");
    expect(container.querySelectorAll("ul.replies")).toHaveLength(2);
  });

  it("lists replies as nested articles in a list named Replies", async () => {
    const { container } = render(
      <Comment.Root>
        <Comment.Header>
          <Comment.Author>Priya Natarajan</Comment.Author>
          <Comment.Time value="2026-09-05T14:30:00Z" />
        </Comment.Header>
        <Comment.Body>
          <p>The static stylesheet is the whole point.</p>
        </Comment.Body>
        <Comment.Replies>
          <Comment.Reply>
            <Comment.Root>
              <Comment.Header>
                <Comment.Author>Tom Okafor</Comment.Author>
                <Comment.Time value="2026-09-05T16:05:00Z" />
              </Comment.Header>
              <Comment.Body>
                <p>Agreed.</p>
              </Comment.Body>
            </Comment.Root>
          </Comment.Reply>
          <Comment.Reply>
            <Comment.Root>
              <Comment.Header>
                <Comment.Author>Sam Reid</Comment.Author>
                <Comment.Time value="2026-09-06T08:12:00Z" />
              </Comment.Header>
              <Comment.Body>
                <p>Same here.</p>
              </Comment.Body>
            </Comment.Root>
          </Comment.Reply>
        </Comment.Replies>
      </Comment.Root>,
    );
    const replies = screen.getByRole("list", { name: "Replies" });
    expect(replies).toHaveClass("replies");
    expect(replies).toHaveAttribute("role", "list");
    expect(container.querySelector("ul.replies > li.reply > article.loam-Comment")).not.toBeNull();
    const nested = within(replies).getAllByRole("article");
    expect(nested.map((article) => article.getAttribute("aria-labelledby"))).not.toContain(null);
    expect(within(replies).getByRole("article", { name: "Tom Okafor" })).toBeInTheDocument();
    expect(within(replies).getByRole("article", { name: "Sam Reid" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
