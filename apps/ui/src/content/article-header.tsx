"use client";

import { Avatar } from "@loamui/core";
import { ArticleHeader, Byline, TagList } from "@loamui/ui";
import type { Composition } from "./types";

const articleHeader: Composition = {
  slug: "article-header",
  name: "Article header",
  category: "Blog",
  description:
    "The top of an article: its category, its title as the page's h1, a standfirst, the byline, its tags and the lead image, each in its slot.",
  lead: "The judgment is in the order and the levels: the title is the page's one h1, the category above it is a link and not a heading, the standfirst is a paragraph and not an h2, and the byline, the tags and the picture are the compositions built for them, Byline, TagList and a figure, placed in the slots this header gives them, so an article's top reads the same way on every page. The header is named by its title, and it never sizes the page: the title and the standfirst take the fluid scale from the article's column, and the lead image takes the header's width at its own ratio.",
  importLine: `import { ArticleHeader, Byline, TagList } from "@loamui/ui";\nimport { Avatar } from "@loamui/core";`,
  parts: [
    {
      name: "ArticleHeader.Root",
      description:
        "A header at the top of your article element, named by the Title through aria-labelledby from the first render (your own aria-label wins). A column with the parts in the order you place them; declares its own container so the type answers the article's column.",
    },
    {
      name: "ArticleHeader.Eyebrow",
      description:
        "The category, above the title: a link to the section the article is filed under, or a Badge. A p, not a heading, since it is not a title of anything on this page.",
    },
    {
      name: "ArticleHeader.Title",
      description:
        "The article's title: the page's h1, as text, since the header is on the article's own page and the title links nowhere. Pass render={<h2 />} where the article is not the page's own. Its id, yours or the composition's, is what names the header.",
    },
    {
      name: "ArticleHeader.Description",
      description:
        "The standfirst: one or two sentences on what the article says, larger than the body and muted, held to the measure.",
    },
    {
      name: "ArticleHeader.Meta",
      description: "Who wrote it and when: the slot for a Byline.Root.",
    },
    {
      name: "ArticleHeader.Tags",
      description: "The topics it is filed under: the slot for a TagList.Root.",
    },
    {
      name: "ArticleHeader.Media",
      description:
        "The lead image: a figure holding your img at the header's width, and a figcaption when there is a credit or a caption to give. An empty alt when the picture only sets the scene; a description when the article refers to it.",
    },
  ],
  demos: [
    {
      title: "An article's top",
      description:
        "Category, title, standfirst, byline, tags and the lead image with its credit. The category links to the section; the title is the h1; the byline is a Byline with the author linked to their profile and both dates; the tags are a TagList named Tags; the picture is a figure whose caption is the photographer's credit.",
      code: `<article>
  <ArticleHeader.Root>
    <ArticleHeader.Eyebrow>
      <a href="/blog/engineering">Engineering</a>
    </ArticleHeader.Eyebrow>
    <ArticleHeader.Title>Why the stylesheet is one static file</ArticleHeader.Title>
    <ArticleHeader.Description>
      Nothing runs at runtime. Cascade layers order the styles, scope fences them and the
      browser does the rest, so there is no styling engine to ship or to debug.
    </ArticleHeader.Description>
    <ArticleHeader.Meta>
      <Byline.Root>
        <Avatar name="Imogen Hartley" aria-hidden />
        <Byline.Author href="/authors/imogen-hartley">Imogen Hartley</Byline.Author>
        <Byline.Published value="2026-08-12" locale="en-GB" dateStyle="long" />
        <Byline.Updated value="2026-08-20" locale="en-GB" dateStyle="long" />
        <Byline.ReadingTime>6 min read</Byline.ReadingTime>
      </Byline.Root>
    </ArticleHeader.Meta>
    <ArticleHeader.Tags>
      <TagList.Root>
        <TagList.Item href="/tags/css">CSS</TagList.Item>
        <TagList.Item href="/tags/cascade-layers">Cascade layers</TagList.Item>
        <TagList.Item href="/tags/scope">Scope</TagList.Item>
      </TagList.Root>
    </ArticleHeader.Tags>
    <ArticleHeader.Media>
      <img src="https://picsum.photos/seed/loam-static/1200/675" alt="" width="1200" height="675" />
      <figcaption>Photograph: Sunniva Berg</figcaption>
    </ArticleHeader.Media>
  </ArticleHeader.Root>
  {/* the body */}
</article>`,
      render: () => (
        <article>
          <ArticleHeader.Root>
            <ArticleHeader.Eyebrow>
              <a href="/blog/engineering">Engineering</a>
            </ArticleHeader.Eyebrow>
            <ArticleHeader.Title>Why the stylesheet is one static file</ArticleHeader.Title>
            <ArticleHeader.Description>
              Nothing runs at runtime. Cascade layers order the styles, scope fences them and the
              browser does the rest, so there is no styling engine to ship or to debug.
            </ArticleHeader.Description>
            <ArticleHeader.Meta>
              <Byline.Root>
                <Avatar name="Imogen Hartley" aria-hidden />
                <Byline.Author href="/authors/imogen-hartley">Imogen Hartley</Byline.Author>
                <Byline.Published value="2026-08-12" locale="en-GB" dateStyle="long" />
                <Byline.Updated value="2026-08-20" locale="en-GB" dateStyle="long" />
                <Byline.ReadingTime>6 min read</Byline.ReadingTime>
              </Byline.Root>
            </ArticleHeader.Meta>
            <ArticleHeader.Tags>
              <TagList.Root>
                <TagList.Item href="/tags/css">CSS</TagList.Item>
                <TagList.Item href="/tags/cascade-layers">Cascade layers</TagList.Item>
                <TagList.Item href="/tags/scope">Scope</TagList.Item>
              </TagList.Root>
            </ArticleHeader.Tags>
            <ArticleHeader.Media>
              <img
                src="https://picsum.photos/seed/loam-static/1200/675"
                alt=""
                width="1200"
                height="675"
              />
              <figcaption>Photograph: Sunniva Berg</figcaption>
            </ArticleHeader.Media>
          </ArticleHeader.Root>
        </article>
      ),
    },
    {
      title: "Without a picture",
      description:
        "The parts are slots, and an article without a lead image or tags leaves them out: category, title, standfirst and byline, and nothing left behind where the picture would have been.",
      code: `<article>
  <ArticleHeader.Root>
    <ArticleHeader.Eyebrow>
      <a href="/blog/design">Design</a>
    </ArticleHeader.Eyebrow>
    <ArticleHeader.Title>A region decides, the controls follow</ArticleHeader.Title>
    <ArticleHeader.Description>
      Set one property on a region and every control inside answers it.
    </ArticleHeader.Description>
    <ArticleHeader.Meta>
      <Byline.Root>
        <Avatar name="Sunniva Berg" aria-hidden />
        <Byline.Author href="/authors/sunniva-berg">Sunniva Berg</Byline.Author>
        <Byline.Published value="2026-07-29" locale="en-GB" dateStyle="long" />
        <Byline.ReadingTime>9 min read</Byline.ReadingTime>
      </Byline.Root>
    </ArticleHeader.Meta>
  </ArticleHeader.Root>
</article>`,
      render: () => (
        <article>
          <ArticleHeader.Root>
            <ArticleHeader.Eyebrow>
              <a href="/blog/design">Design</a>
            </ArticleHeader.Eyebrow>
            <ArticleHeader.Title>A region decides, the controls follow</ArticleHeader.Title>
            <ArticleHeader.Description>
              Set one property on a region and every control inside answers it.
            </ArticleHeader.Description>
            <ArticleHeader.Meta>
              <Byline.Root>
                <Avatar name="Sunniva Berg" aria-hidden />
                <Byline.Author href="/authors/sunniva-berg">Sunniva Berg</Byline.Author>
                <Byline.Published value="2026-07-29" locale="en-GB" dateStyle="long" />
                <Byline.ReadingTime>9 min read</Byline.ReadingTime>
              </Byline.Root>
            </ArticleHeader.Meta>
          </ArticleHeader.Root>
        </article>
      ),
    },
  ],
  whenToUse: [
    "The top of a blog post, a news story or a documentation article on its own page, where the reader wants the category, the title, who wrote it and when, before the body.",
    "A long-form page that opens on a lead image with a credit, so the picture, the caption and the title are tied together by the markup rather than by layout.",
  ],
  whenNotToUse: [
    "An article in an index, where the title links to the page and the excerpt invites the click: that is ArticleCard, one of several in a grid you write.",
    "The opening of a marketing page, where the title sells and the actions follow: that is Hero, with its eyebrow, lede and row of Buttons.",
  ],
};

export default articleHeader;
