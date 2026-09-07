"use client";

import { Avatar, Badge } from "@loamui/core";
import { ArticleCard } from "@loamui/ui";
import type { Composition } from "./types";

const articleCard: Composition = {
  slug: "article-card",
  name: "Article card",
  category: "Blog",
  description:
    "A grid of article Cards, each a category and date, a linked title, an excerpt and an author.",
  lead: "Seven parts on a native section and list, each article a core Card. The title holds the link and the card does not: a card that is one big link reads its whole contents as the link's name and swallows every other control inside it, so the heading is the one thing a reader clicks, and the meta and author stay ordinary text.",
  importLine: `import { ArticleCard } from "@loamui/ui";`,
  parts: [
    {
      name: "ArticleCard.Root",
      description:
        "The unit: a core Card, left as core styles it, holding an article with the parts in a column. Place your own img first inside it if the article has one.",
    },
    {
      name: "ArticleCard.Meta",
      description: "A small muted row: a Badge for the category and a time for the date.",
    },
    {
      name: "ArticleCard.Title",
      description:
        "The article's title around your link. An h3 by default; pass render={<h2 />} where the card is the page's own list. The title is the link; the card is not.",
    },
    {
      name: "ArticleCard.Excerpt",
      description:
        "The opening lines, muted. Clamped to three lines where the browser supports line-clamp; elsewhere it runs its full length.",
    },
    {
      name: "ArticleCard.Author",
      description:
        "Who wrote it: a flex row for an Avatar and the name beside it, held at the foot of the card.",
    },
  ],
  demos: [
    {
      title: "One article",
      description:
        "A card needs no grid: related reading at the foot of a post, a featured post in a sidebar.",
      code: `<ArticleCard.Root>
  <ArticleCard.Meta>
    <Badge>Accessibility</Badge>
    <time dateTime="2026-07-15">15 July 2026</time>
  </ArticleCard.Meta>
  <ArticleCard.Title>
    <a href="/blog/gatekept">What a tool can verify, a tool verifies</a>
  </ArticleCard.Title>
  <ArticleCard.Excerpt>
    Every token pair is contrast-audited and every component has an axe test.
  </ArticleCard.Excerpt>
  <ArticleCard.Author>
    <Avatar name="Tomasz Wieczorek" aria-hidden />
    Tomasz Wieczorek
  </ArticleCard.Author>
</ArticleCard.Root>`,
      render: () => (
        <ArticleCard.Root>
          <ArticleCard.Meta>
            <Badge>Accessibility</Badge>
            <time dateTime="2026-07-15">15 July 2026</time>
          </ArticleCard.Meta>
          <ArticleCard.Title>
            <a href="/blog/gatekept">What a tool can verify, a tool verifies</a>
          </ArticleCard.Title>
          <ArticleCard.Excerpt>
            Every token pair is contrast-audited and every component has an axe test.
          </ArticleCard.Excerpt>
          <ArticleCard.Author>
            <Avatar name="Tomasz Wieczorek" aria-hidden />
            Tomasz Wieczorek
          </ArticleCard.Author>
        </ArticleCard.Root>
      ),
    },
    {
      title: "Three articles",
      description:
        "Three cards in a list. The grid is yours: a ul with repeat(auto-fit, minmax(min(18rem, 100%), 1fr)), each li a grid so its Card stretches to the row. Each title is the link; the Badge is a plain category label here.",
      code: `<section aria-labelledby="blog">
  <h2 id="blog">From the blog</h2>
  <ul style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(min(18rem, 100%), 1fr))", listStyle: "none", margin: 0, padding: 0 }}>
    <li style={{ display: "grid" }}>
      <ArticleCard.Root>
      <ArticleCard.Meta>
        <Badge>Engineering</Badge>
        <time dateTime="2026-08-12">12 August 2026</time>
      </ArticleCard.Meta>
      <ArticleCard.Title>
        <a href="/blog/static-css">Why the stylesheet is one static file</a>
      </ArticleCard.Title>
      <ArticleCard.Excerpt>
        Nothing runs at runtime. Cascade layers order the styles, scope fences them and the
        browser does the rest, so there is no styling engine to ship or to debug.
      </ArticleCard.Excerpt>
      <ArticleCard.Author>
        <Avatar name="Imogen Hartley" aria-hidden />
        Imogen Hartley
      </ArticleCard.Author>
      </ArticleCard.Root>
    </li>
    <li style={{ display: "grid" }}>
      <ArticleCard.Root>
      <ArticleCard.Meta>
        <Badge>Design</Badge>
        <time dateTime="2026-07-29">29 July 2026</time>
      </ArticleCard.Meta>
      <ArticleCard.Title>
        <a href="/blog/contextualism">A region decides, the controls follow</a>
      </ArticleCard.Title>
      <ArticleCard.Excerpt>
        Set one property on a region and every control inside answers it. How the status and
        size API disappeared into the cascade.
      </ArticleCard.Excerpt>
      <ArticleCard.Author>
        <Avatar name="Sunniva Berg" aria-hidden />
        Sunniva Berg
      </ArticleCard.Author>
      </ArticleCard.Root>
    </li>
    <li style={{ display: "grid" }}>
      <ArticleCard.Root>
      <ArticleCard.Meta>
        <Badge>Accessibility</Badge>
        <time dateTime="2026-07-15">15 July 2026</time>
      </ArticleCard.Meta>
      <ArticleCard.Title>
        <a href="/blog/gatekept">What a tool can verify, a tool verifies</a>
      </ArticleCard.Title>
      <ArticleCard.Excerpt>
        Every token pair is contrast-audited and every component has an axe test. The gates
        that keep the palette and the components honest, and what they cannot catch.
      </ArticleCard.Excerpt>
      <ArticleCard.Author>
        <Avatar name="Tomasz Wieczorek" aria-hidden />
        Tomasz Wieczorek
      </ArticleCard.Author>
      </ArticleCard.Root>
    </li>
  </ul>
</section>`,
      render: () => (
        <section aria-labelledby="blog">
          <h2 id="blog">From the blog</h2>
          <ul
            style={{
              display: "grid",
              gap: "1.5rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(18rem, 100%), 1fr))",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <li style={{ display: "grid" }}>
              <ArticleCard.Root>
                <ArticleCard.Meta>
                  <Badge>Engineering</Badge>
                  <time dateTime="2026-08-12">12 August 2026</time>
                </ArticleCard.Meta>
                <ArticleCard.Title>
                  <a href="/blog/static-css">Why the stylesheet is one static file</a>
                </ArticleCard.Title>
                <ArticleCard.Excerpt>
                  Nothing runs at runtime. Cascade layers order the styles, scope fences them and
                  the browser does the rest, so there is no styling engine to ship or to debug.
                </ArticleCard.Excerpt>
                <ArticleCard.Author>
                  <Avatar name="Imogen Hartley" aria-hidden />
                  Imogen Hartley
                </ArticleCard.Author>
              </ArticleCard.Root>
            </li>
            <li style={{ display: "grid" }}>
              <ArticleCard.Root>
                <ArticleCard.Meta>
                  <Badge>Design</Badge>
                  <time dateTime="2026-07-29">29 July 2026</time>
                </ArticleCard.Meta>
                <ArticleCard.Title>
                  <a href="/blog/contextualism">A region decides, the controls follow</a>
                </ArticleCard.Title>
                <ArticleCard.Excerpt>
                  Set one property on a region and every control inside answers it. How the status
                  and size API disappeared into the cascade.
                </ArticleCard.Excerpt>
                <ArticleCard.Author>
                  <Avatar name="Sunniva Berg" aria-hidden />
                  Sunniva Berg
                </ArticleCard.Author>
              </ArticleCard.Root>
            </li>
            <li style={{ display: "grid" }}>
              <ArticleCard.Root>
                <ArticleCard.Meta>
                  <Badge>Accessibility</Badge>
                  <time dateTime="2026-07-15">15 July 2026</time>
                </ArticleCard.Meta>
                <ArticleCard.Title>
                  <a href="/blog/gatekept">What a tool can verify, a tool verifies</a>
                </ArticleCard.Title>
                <ArticleCard.Excerpt>
                  Every token pair is contrast-audited and every component has an axe test. The
                  gates that keep the palette and the components honest, and what they cannot catch.
                </ArticleCard.Excerpt>
                <ArticleCard.Author>
                  <Avatar name="Tomasz Wieczorek" aria-hidden />
                  Tomasz Wieczorek
                </ArticleCard.Author>
              </ArticleCard.Root>
            </li>
          </ul>
        </section>
      ),
    },
  ],
  whenToUse: [
    "A blog index or a news section where visitors choose between several articles by title, category and date before committing to one.",
    "A short list of related reading at the foot of an article, where three cards side by side invite the next click without a second page.",
  ],
  whenNotToUse: [
    "An archive of many posts that readers browse in order or by date: a plain list with dates, or a Table, scans faster than a wall of equal cards; if it must be cards, add core Pagination beneath the grid.",
    "A single featured article: one card among no others has nothing to be compared with, so give it a Hero with the article's title and lede instead.",
  ],
};

export default articleCard;
