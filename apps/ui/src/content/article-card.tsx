"use client";

import { Avatar, Badge } from "@loamui/core";
import { ArticleCard, Byline } from "@loamui/ui";
import type { Composition } from "./types";

const articleCard: Composition = {
  slug: "article-card",
  name: "Article card",
  category: "Blog",
  description:
    "One article in a Card: a category and date, a linked title, an excerpt and an author, alone or in a grid you write.",
  lead: "Five parts inside a core Card, left exactly as core styles it. The title holds the link and the card does not: a card that is one big link reads its whole contents as the link's name and swallows every other control inside it, so the heading is the one thing a reader clicks, and the meta and the byline stay ordinary text. The foot is a Byline, the same row that heads the article itself, so the author reads the same way in both places.",
  importLine: `import { ArticleCard, Byline } from "@loamui/ui";`,
  parts: [
    {
      name: "ArticleCard.Root",
      description:
        "The unit: a core Card holding an article with the parts in a column. Pass render={<li />} in a list; it is the Card's own render, so the li is the Card. Place your own img first inside it if the article has one.",
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
        "The opening lines, muted. Clamped to three lines where the browser supports line-clamp; elsewhere it runs its full length. It takes the column's slack, so the byline sits at the foot of every card in a row.",
    },
    {
      name: "ArticleCard.Byline",
      description:
        'Who wrote it, at the foot: a Byline.Root, so an Avatar, a Byline.Author with rel="author" and, if you want it there, a Byline.ReadingTime read the same as at the top of the article.',
    },
  ],
  demos: [
    {
      title: "One article",
      description:
        "A card needs no grid: related reading at the foot of a post, a featured post in a sidebar. The foot is a Byline: the author's name in an address element, linked to their profile.",
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
  <ArticleCard.Byline>
    <Avatar name="Tomasz Wieczorek" aria-hidden />
    <Byline.Author href="/authors/tomasz-wieczorek">Tomasz Wieczorek</Byline.Author>
  </ArticleCard.Byline>
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
          <ArticleCard.Byline>
            <Avatar name="Tomasz Wieczorek" aria-hidden />
            <Byline.Author href="/authors/tomasz-wieczorek">Tomasz Wieczorek</Byline.Author>
          </ArticleCard.Byline>
        </ArticleCard.Root>
      ),
    },
    {
      title: "Three articles",
      description:
        "Three cards in a list. The grid is yours: a ul with repeat(auto-fit, minmax(min(18rem, 100%), 1fr)), each card rendered as a li through the Card's render, so the li is the Card and the grid stretches it to the row; the byline sits at the foot of each whatever the excerpt's length. Each title is the link; the Badge is a plain category label here.",
      code: `<section aria-labelledby="blog">
  <h2 id="blog">From the blog</h2>
  <ul style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(min(18rem, 100%), 1fr))", listStyle: "none", margin: 0, padding: 0 }}>
    <ArticleCard.Root render={<li />}>
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
      <ArticleCard.Byline>
        <Avatar name="Imogen Hartley" aria-hidden />
        <Byline.Author href="/authors/imogen-hartley">Imogen Hartley</Byline.Author>
      </ArticleCard.Byline>
    </ArticleCard.Root>
    <ArticleCard.Root render={<li />}>
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
      <ArticleCard.Byline>
        <Avatar name="Sunniva Berg" aria-hidden />
        <Byline.Author href="/authors/sunniva-berg">Sunniva Berg</Byline.Author>
      </ArticleCard.Byline>
    </ArticleCard.Root>
    <ArticleCard.Root render={<li />}>
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
      <ArticleCard.Byline>
        <Avatar name="Tomasz Wieczorek" aria-hidden />
        <Byline.Author href="/authors/tomasz-wieczorek">Tomasz Wieczorek</Byline.Author>
      </ArticleCard.Byline>
    </ArticleCard.Root>
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
            <ArticleCard.Root render={<li />}>
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
              <ArticleCard.Byline>
                <Avatar name="Imogen Hartley" aria-hidden />
                <Byline.Author href="/authors/imogen-hartley">Imogen Hartley</Byline.Author>
              </ArticleCard.Byline>
            </ArticleCard.Root>
            <ArticleCard.Root render={<li />}>
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
              <ArticleCard.Byline>
                <Avatar name="Sunniva Berg" aria-hidden />
                <Byline.Author href="/authors/sunniva-berg">Sunniva Berg</Byline.Author>
              </ArticleCard.Byline>
            </ArticleCard.Root>
            <ArticleCard.Root render={<li />}>
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
              <ArticleCard.Byline>
                <Avatar name="Tomasz Wieczorek" aria-hidden />
                <Byline.Author href="/authors/tomasz-wieczorek">Tomasz Wieczorek</Byline.Author>
              </ArticleCard.Byline>
            </ArticleCard.Root>
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
