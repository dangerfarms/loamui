"use client";

import { Avatar, Badge } from "@loamui/core";
import { ArticleCards } from "@loamui/ui";
import type { Composition } from "./types";

const articleCards: Composition = {
  slug: "article-cards",
  name: "Article cards",
  category: "Blog",
  description:
    "A grid of article Cards, each a category and date, a linked title, an excerpt and an author.",
  lead: "Seven parts on a native section and list, each article a core Card. The title holds the link and the card does not: a card that is one big link reads its whole contents as the link's name and swallows every other control inside it, so the heading is the one thing a reader clicks, and the meta and author stay ordinary text.",
  importLine: `import { ArticleCards } from "@loamui/ui";`,
  parts: [
    {
      name: "ArticleCards.Root",
      description:
        "The section. Declares its own container so the fluid tokens answer the section's width.",
    },
    {
      name: "ArticleCards.Grid",
      description:
        "The list of articles: an auto-fit grid of columns at least 18rem wide, one column when there is no room for more.",
    },
    {
      name: "ArticleCards.Card",
      description:
        "One article: a list item wrapping a Card. There is no image part; place your own img first inside it if the article has one, and it takes the card's width.",
    },
    {
      name: "ArticleCards.Meta",
      description: "A small muted row: a Badge for the category and a time for the date.",
    },
    {
      name: "ArticleCards.Title",
      description:
        "The article's title, an h3 around your link. The title is the link; the card is not.",
    },
    {
      name: "ArticleCards.Excerpt",
      description:
        "The opening lines, muted. Clamped to three lines where the browser supports line-clamp; elsewhere it runs its full length.",
    },
    {
      name: "ArticleCards.Author",
      description:
        "Who wrote it: a flex row for an Avatar and the name beside it, held at the foot of the card.",
    },
  ],
  demos: [
    {
      title: "Three articles",
      description:
        "Each title is the link. The Badge is a plain category label here; a --loam-context region on a Card would colour it.",
      code: `<ArticleCards.Root>
  <h2>From the blog</h2>
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
        browser does the rest, so there is no styling engine to ship or to debug.
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
        Set one property on a region and every control inside answers it. How the status and
        size API disappeared into the cascade.
      </ArticleCards.Excerpt>
      <ArticleCards.Author>
        <Avatar name="Sunniva Berg" aria-hidden />
        Sunniva Berg
      </ArticleCards.Author>
    </ArticleCards.Card>
    <ArticleCards.Card>
      <ArticleCards.Meta>
        <Badge>Accessibility</Badge>
        <time dateTime="2026-07-15">15 July 2026</time>
      </ArticleCards.Meta>
      <ArticleCards.Title>
        <a href="/blog/gatekept">What a tool can verify, a tool verifies</a>
      </ArticleCards.Title>
      <ArticleCards.Excerpt>
        Every token pair is contrast-audited and every component has an axe test. The gates
        that keep the palette and the components honest, and what they cannot catch.
      </ArticleCards.Excerpt>
      <ArticleCards.Author>
        <Avatar name="Tomasz Wieczorek" aria-hidden />
        Tomasz Wieczorek
      </ArticleCards.Author>
    </ArticleCards.Card>
  </ArticleCards.Grid>
</ArticleCards.Root>`,
      render: () => (
        <ArticleCards.Root>
          <h2>From the blog</h2>
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
                browser does the rest, so there is no styling engine to ship or to debug.
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
                Set one property on a region and every control inside answers it. How the status and
                size API disappeared into the cascade.
              </ArticleCards.Excerpt>
              <ArticleCards.Author>
                <Avatar name="Sunniva Berg" aria-hidden />
                Sunniva Berg
              </ArticleCards.Author>
            </ArticleCards.Card>
            <ArticleCards.Card>
              <ArticleCards.Meta>
                <Badge>Accessibility</Badge>
                <time dateTime="2026-07-15">15 July 2026</time>
              </ArticleCards.Meta>
              <ArticleCards.Title>
                <a href="/blog/gatekept">What a tool can verify, a tool verifies</a>
              </ArticleCards.Title>
              <ArticleCards.Excerpt>
                Every token pair is contrast-audited and every component has an axe test. The gates
                that keep the palette and the components honest, and what they cannot catch.
              </ArticleCards.Excerpt>
              <ArticleCards.Author>
                <Avatar name="Tomasz Wieczorek" aria-hidden />
                Tomasz Wieczorek
              </ArticleCards.Author>
            </ArticleCards.Card>
          </ArticleCards.Grid>
        </ArticleCards.Root>
      ),
    },
  ],
  whenToUse: [
    "A blog index or a news section where visitors choose between several articles by title, category and date before committing to one.",
    "A short list of related reading at the foot of an article, where three cards side by side invite the next click without a second page.",
  ],
  whenNotToUse: [
    "An archive of many posts that readers browse in order or by date: a plain list with dates, or a Table, scans faster than a wall of equal cards.",
    "A single featured article: one card among no others has nothing to be compared with, so give it a Hero with the article's title and lede instead.",
  ],
};

export default articleCards;
