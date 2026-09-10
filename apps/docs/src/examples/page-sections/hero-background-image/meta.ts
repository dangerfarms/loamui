import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Hero with background image",
  description:
    "A page-opening section over a full-bleed photograph: a headline, a lede and two actions on a scrim that holds their contrast in both schemes.",
  category: "page-sections",
  uses: ["Button", "SignpostLink"],
  notes: {
    native:
      "A section named by its h1, with the photograph as an img rather than a background-image so it is fetched, sized and lazy-loadable like any picture; the scrim is a pseudo-element behind the words.",
    modern:
      "The section declares color-scheme: dark, so every light-dark() token inside re-resolves to the dark palette in both schemes: the scrim is the background token faded and the words the foreground token, the pair the audit checks.",
    composition:
      "SignpostLink and Button as core ships them, inheriting the dark scheme from the region rather than being told about it.",
    context:
      "One declaration on the region decides the scheme for everything in it; the Button takes its dark-scheme paint without a prop.",
    accessible:
      "The photograph is decoration behind the words, so its alt is empty; in forced colours the picture is dropped and the words stand on Canvas inside a border, since no scrim survives there.",
  },
  tags: ["landing", "marketing", "photo", "cover", "dark"],
  order: 21,
};
