import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Carousel with cards",
  description:
    "Five journal articles as Cards on a Carousel track: a photo, a category Badge, a title and a Read article link each, with Previous and Next beside the title and a dot per article beneath.",
  category: "carousels",
  uses: ["Badge", "Card", "Carousel", "SignpostLink"],
  notes: {
    native:
      "The track is an ordinary scroller with scroll snapping, so it pages with a wheel, a swipe, the arrow keys and no JavaScript; each item is a Card rendered as an article named by its heading.",
    modern:
      "The item width is the Carousel's public property set on the region, and the track's grid stretches every Card to one height, so an auto margin puts each link at the foot.",
    composition:
      "Carousel.Root, Track, Item, Previous, Next and Indicators are arranged in the markup: the Buttons sit beside the title and the dots beneath, an arrangement the parts allow because they read one context rather than one layout.",
    accessible:
      "The region is named by its heading, the paging Buttons and the dots are named through labels, the status announces Article 2 of 5 once the track settles, and every Read article link finishes with the article's title in hidden text.",
  },
  tags: ["carousel", "articles", "cards", "slider", "journal"],
  order: 1,
};
