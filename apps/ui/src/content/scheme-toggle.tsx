"use client";

import { SchemeToggle } from "@loamui/ui";
import type { Composition } from "./types";

const schemeToggle: Composition = {
  slug: "scheme-toggle",
  name: "Scheme toggle",
  category: "Navigation",
  description:
    "A three-way choice of colour scheme, System, Light or Dark, that sets the root data-theme attribute and remembers the answer.",
  lead: "Three states, not two: a two-state switch has to guess what off means, and System is a real preference, so it gets its own option and it is the default. The toggle is a native fieldset of three radios dressed as a pill: the group is named by its legend, one option is always checked, and the arrow keys move between them. Choosing sets data-theme on the root element, or removes it for System, and every light-dark() token follows; the choice persists to localStorage and is read back before the first paint, so the checked option never jumps after hydration.",
  importLine: `import { SchemeToggle } from "@loamui/ui";`,
  parts: [
    {
      name: "SchemeToggle",
      description:
        'One component, not parts: a fieldset of three radios. labels carries every word it says (the legend and the hidden name of each option), showLabel paints the legend before the options, storageKey is the localStorage key the choice persists under ("loamui-theme"), and onChange reports the scheme chosen after the attribute and storage are set. Every native fieldset prop is forwarded, ref included.',
    },
  ],
  demos: [
    {
      title: "The toggle",
      description:
        "Three radios in a pill: System, Light, Dark. This one is live: choosing here changes this site's own scheme, and the choice survives a reload because the site's pre-paint script reads the same key.",
      code: `<SchemeToggle />`,
      render: () => <SchemeToggle />,
    },
    {
      title: "With a visible legend",
      description:
        "The legend is always in the accessibility tree; showLabel also paints it before the options, for a settings row where the icons alone would leave the group unnamed on screen.",
      code: `<SchemeToggle showLabel />`,
      render: () => <SchemeToggle showLabel />,
    },
    {
      title: "In another language",
      description:
        "labels is the legend and the hidden name of each option, so the whole group can be written in the page's language. This one is live too and writes the same key as the toggles above, so all three stay in step.",
      code: `<SchemeToggle
  showLabel
  labels={{ legend: "Farbschema", system: "System", light: "Hell", dark: "Dunkel" }}
/>`,
      render: () => (
        <SchemeToggle
          showLabel
          labels={{ legend: "Farbschema", system: "System", light: "Hell", dark: "Dunkel" }}
        />
      ),
    },
  ],
  whenToUse: [
    "When the site has a dark scheme and users should be able to pin one, rather than only follow the operating system.",
    "In a settings page or a site header, once per site: the choice is global, so the control should be too.",
  ],
  whenNotToUse: [
    "For a region that should always be light or dark regardless of the user's choice (a preview, a photo lightbox): set data-theme on that region and the tokens re-resolve for it. That is an override, not a toggle.",
    "When the site has no dark scheme. A toggle that changes nothing is a broken promise; add the scheme first.",
  ],
};

export default schemeToggle;
