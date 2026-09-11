import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Banner with background image",
  description:
    "The same fruit-plant offer as Banner with image, with its deadline, heading, description and link over a full-width raspberry photograph.",
  whenToUse:
    "Use for one short promotion within a page, with a decorative image filling the section. Choose a hero when the content introduces the whole page.",
  integration:
    'Replace the sample offer, closing date, photograph and destination with your own; use the heading level appropriate to the surrounding page. Keep Badge labels short and put longer details in the adjacent wrapping text. Both banners demonstrate a promotion below the initial viewport: loading="lazy" and sizes="auto, 100vw" let the browser choose a rendition from the rendered image width, with a conservative viewport fallback. For a banner visible on first load, remove lazy loading and auto from sizes; set a layout-appropriate size hint and use high fetch priority only if this is the page’s critical image. Supply appropriately cropped renditions through your own image pipeline. useId only connects each section to its heading; this synchronous component needs no client directive.',
  category: "banners",
  uses: ["Badge", "SignpostLink"],
  notes: {
    native:
      "A section named by its h2 promotes one destination; the decorative photograph is an img with empty alt and explicit dimensions, lazy-loaded for a promotion further down the page.",
    modern:
      "Styles belong to loamui.components inside a donut scope. The container measures the header’s fluid token spacing and type. The content keeps the same spacing and content width as Banner with image from 44rem, with the text in the leading column of a 3:2 grid; below that it fills one column, and the photograph covers the entire section.",
    composition:
      "The section owns the photograph and scrim instead of overriding a Card surface; Badge and SignpostLink are composed unchanged, beyond the scope boundary.",
    context:
      "One dark colour scheme re-resolves the text and control tokens; the deadline is a warning region, just as in Banner with image, so the Badge inherits its meaning without a prop.",
    accessible:
      "useId names repeated regions independently. A solid background and 88% dark token scrim protect the words even if the photograph fails; recheck contrast when changing either. Content determines the height and grows with enlarged text. Focus rings are not clipped. Forced colours remove the decorative image and scrim, leaving system colours and a visible border.",
  },
  tags: ["promotion", "background", "image", "full-width", "call to action"],
  order: 2,
};
