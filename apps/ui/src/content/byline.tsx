"use client";

import { Avatar } from "@loamui/core";
import { Byline } from "@loamui/ui";
import type { Composition } from "./types";

const byline: Composition = {
  slug: "byline",
  name: "Byline",
  category: "Blog",
  description:
    "Who wrote an article and when, at the top of it: an avatar, the author linked to their profile, the dates and the reading time on one line.",
  lead: 'Five parts on one row that wraps. The author is an address element, the one HTML reserves for the contact information of an article\'s author, around a link with rel="author", so the byline is associated with its article by the markup alone; each date is a core Time with a machine-readable dateTime, an updated date is labelled with the visible word Updated rather than a tooltip, and the reading time is text you write, because the estimate is yours.',
  importLine: `import { Byline } from "@loamui/ui";`,
  parts: [
    {
      name: "Byline.Root",
      description:
        "The unit: a div holding the pieces on one line that wraps, with a dot drawn before every piece but the first and never before the Author. Not the address itself, because the dates and the reading time are not contact information. Place a core Avatar first inside it, with the author's name for the initials and aria-hidden, since the name is printed beside it; then the Author.",
    },
    {
      name: "Byline.Author",
      description:
        "The author's name in an address element, set upright rather than the browser's italic. Inside it, a link with rel=\"author\" when it has an href, or a render for a router link; a span when there is no profile to link to. The link keeps the page's underline, so the profile reads as the one thing here to click.",
    },
    {
      name: "Byline.Published",
      description:
        "When the article was published: a core Time, so it takes value, locale and dateStyle and carries a machine-readable dateTime. It needs no label; a date in a byline is read as the publication date.",
    },
    {
      name: "Byline.Updated",
      description:
        "When the article was last revised: the visible word Updated then a core Time. The word is in the row, never a tooltip, so a reader who cannot hover or who is listening still learns which date is which; pass children to write it in another language.",
    },
    {
      name: "Byline.ReadingTime",
      description:
        'How long the article takes to read, as text you write: "6 min read". The count and the pace are yours, computed once where the article is.',
    },
  ],
  demos: [
    {
      title: "Published",
      description:
        "An avatar, the author linked to their profile, the publication date and a reading time. The dots between the pieces are drawn by the CSS and kept out of the accessibility tree, so a screen reader hears the name, the date and the estimate with nothing in between.",
      code: `<Byline.Root>
  <Avatar name="Imogen Hartley" aria-hidden />
  <Byline.Author href="/authors/imogen-hartley">Imogen Hartley</Byline.Author>
  <Byline.Published value="2026-08-12" locale="en-GB" dateStyle="long" />
  <Byline.ReadingTime>6 min read</Byline.ReadingTime>
</Byline.Root>`,
      render: () => (
        <Byline.Root>
          <Avatar name="Imogen Hartley" aria-hidden />
          <Byline.Author href="/authors/imogen-hartley">Imogen Hartley</Byline.Author>
          <Byline.Published value="2026-08-12" locale="en-GB" dateStyle="long" />
          <Byline.ReadingTime>6 min read</Byline.ReadingTime>
        </Byline.Root>
      ),
    },
    {
      title: "Updated",
      description:
        "A revised article carries both dates. The second is labelled with the visible word Updated, so the two are told apart by everyone, not only by a reader who hovers for a tooltip.",
      code: `<Byline.Root>
  <Avatar name="Sunniva Berg" aria-hidden />
  <Byline.Author href="/authors/sunniva-berg">Sunniva Berg</Byline.Author>
  <Byline.Published value="2026-07-29" locale="en-GB" dateStyle="long" />
  <Byline.Updated value="2026-08-14" locale="en-GB" dateStyle="long" />
  <Byline.ReadingTime>9 min read</Byline.ReadingTime>
</Byline.Root>`,
      render: () => (
        <Byline.Root>
          <Avatar name="Sunniva Berg" aria-hidden />
          <Byline.Author href="/authors/sunniva-berg">Sunniva Berg</Byline.Author>
          <Byline.Published value="2026-07-29" locale="en-GB" dateStyle="long" />
          <Byline.Updated value="2026-08-14" locale="en-GB" dateStyle="long" />
          <Byline.ReadingTime>9 min read</Byline.ReadingTime>
        </Byline.Root>
      ),
    },
    {
      title: "Without an avatar",
      description:
        "The avatar is optional and the author need not be a link: with no profile page, the name is plain text in the strong foreground, still in its address element, and the row starts with it.",
      code: `<Byline.Root>
  <Byline.Author>Tomasz Wieczorek</Byline.Author>
  <Byline.Published value="2026-07-15" locale="en-GB" dateStyle="long" />
  <Byline.ReadingTime>4 min read</Byline.ReadingTime>
</Byline.Root>`,
      render: () => (
        <Byline.Root>
          <Byline.Author>Tomasz Wieczorek</Byline.Author>
          <Byline.Published value="2026-07-15" locale="en-GB" dateStyle="long" />
          <Byline.ReadingTime>4 min read</Byline.ReadingTime>
        </Byline.Root>
      ),
    },
  ],
  whenToUse: [
    "The top of an article, under its title, where a reader wants to know who wrote it and how current it is before they commit to reading.",
    "A revised article that must show when it changed as well as when it appeared, so the reader can judge whether the advice is still the latest.",
  ],
  whenNotToUse: [
    "A team or an about page that presents people in their own right: that is a grid of Person, each with a role beneath the name, not a byline with a date.",
    "The header of a comment or a reply, where the name and time belong to the message rather than to an article: that is Comment, whose author is a plain span or link, not an address, because a commenter is not the article's author.",
  ],
};

export default byline;
