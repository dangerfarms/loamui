import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Hero with background image",
  description:
    "A page-opening section over a full-bleed photograph: a headline, a lede and two actions on a scrim that holds their contrast in both schemes.",
  whenToUse:
    "Use for a prominent page introduction over an atmospheric photograph. Choose a banner for a shorter promotion within an existing page.",
  integration:
    'Use this h1 as the page’s main heading and replace the sample photograph and routes. The image is decorative: keep meaningful information in the text and its alt empty. Native srcSet supplies three renditions; sizes="100vw" is a conservative upper bound for a portable hero, so tailor that hint to your page’s layout and image pipeline. fetchPriority="high" is intended for the page’s critical above-the-fold image, which should not be lazy-loaded. The content reserves the section’s height; an absolutely positioned photograph does not reserve space through its dimensions. Recheck overlay contrast if you change the tokens or scrim. This synchronous component needs no client directive.',
  category: "heroes",
  uses: ["SignpostLink"],
  notes: {
    native:
      "A section named by its h1, with a native header and an eagerly discoverable img. The image sits behind the content, so the header supplies the minimum height and grows when text needs more room. Element styles own heading typography and link states.",
    modern:
      "Styles sit in loamui.components inside a donut scope. The section measures its header’s fluid padding, type and minimum height; there are no viewport layout breakpoints. A token-based scrim protects the text, and a solid background keeps it readable if the image fails.",
    composition:
      "SignpostLink inherits the region’s dark scheme; the secondary film destination is an ordinary link.",
    context:
      "One declaration on the region decides the scheme for everything in it; the SignpostLink takes its dark-scheme paint without a prop.",
    accessible:
      "The photograph is decoration behind the words, so its alt is empty. useId ties repeated regions to their own headings. Native links retain visible text and focus rings; enlarged text can grow the section. Forced colours remove both the picture and scrim, leaving native system colours and a visible border.",
  },
  tags: ["landing", "marketing", "photo", "cover", "dark"],
  order: 21,
};
