import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Gallery card",
  description:
    "A stay in a Card: a Carousel of three photos with its controls beneath, the name and a Rating with the review count, a description and the Price per night.",
  whenToUse:
    "Use for one listing whose photographs need browsing alongside its rating and price. Choose Article carousel to browse several separate items.",
  category: "cards",
  uses: ["Card", "Carousel", "Price", "Rating"],
  notes: {
    native:
      "The photos scroll on an ordinary scroll-snap track, so a swipe or the arrow keys page them with no JavaScript; the rating is one picture named 4.8 out of 5 and the price is a data element whose value is the number.",
    modern:
      "The Carousel's item width is its public property, set to 100% on the Card so it inherits down and each photo fills the track; the price takes the display face from the paragraph around it.",
    composition:
      "A Carousel sits inside a Card the way any content would, its own region inside the article; Rating and Price are dropped in as they come, and the example reaches into none of them.",
    accessible:
      "The carousel is named Photos of the Orchard Cabin and every photo has an alt that says what is in it, because here the pictures are the content; the controls and the dots are named through labels, and the review count finishes in a hidden word.",
  },
  tags: ["carousel", "booking", "stay", "gallery", "photos", "rating"],
  order: 3,
};
