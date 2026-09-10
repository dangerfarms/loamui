import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Article header",
  description:
    "The top of an article: its category, the title as the page's h1, a standfirst, the byline, its tags and the lead image with a credit.",
  category: "blog",
  uses: ["Avatar", "Badge", "Time"],
  notes: {
    native:
      "The title is the page's one h1, the category above it is a link rather than a heading, the standfirst is a paragraph rather than an h2, and the picture is a figure whose credit is its figcaption.",
    modern:
      "The article declares itself a container so the fluid type scale answers its column; the byline's dots are generated content with an empty alternative, so only the CSS knows the order of the parts.",
    composition:
      "The byline and the tag list are the Byline and Tag List examples pasted in; the Badges are rendered as links through render, so a tag is a Badge that happens to go somewhere.",
    accessible:
      'The article is named by its title, the author\'s name is in an address with rel="author", both dates are Times with a machine-readable dateTime and the second says Updated in words, and the tag list is named Tags so its count is announced.',
  },
  tags: ["post", "title", "standfirst", "lead image", "masthead"],
  order: 3,
};
