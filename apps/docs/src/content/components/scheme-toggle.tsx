import { SchemeToggle } from "@loamui/core";
import type { ComponentContent } from "@/renderer/types";

const doc: ComponentContent = {
  slug: "scheme-toggle",
  lead: "A three-way choice of colour scheme — System, Light or Dark — that sets the root data-theme attribute and remembers the answer.",
  importLine: `import { SchemeToggle } from "@loamui/core";`,
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
        "label is the legend and labels the hidden name of each option, so the whole group can be written in the page's language; onChange reports the scheme chosen, after the attribute and storage are set. This one is live too and writes the same key as the toggles above, so a choice made here holds after a reload; the others catch up when the page does.",
      code: `<SchemeToggle
  showLabel
  label="Farbschema"
  labels={{ system: "System", light: "Hell", dark: "Dunkel" }}
/>`,
      render: () => (
        <SchemeToggle
          showLabel
          label="Farbschema"
          labels={{ system: "System", light: "Hell", dark: "Dunkel" }}
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
  howItWorks: [
    {
      title: "Three states, not two",
      body: "A two-state switch has to guess what 'off' means. If it means 'follow the system', a user who pinned dark last winter cannot tell whether their machine or the site chose today's scheme; if it means 'light', the site stops tracking a preference the user set once at the operating-system level and expected to hold everywhere. System is a real preference, so it gets its own option, and it is the default: nothing stored, nothing overridden.",
    },
    {
      title: "The attribute is the whole mechanism",
      body: 'Choosing Light or Dark sets data-theme="light" or "dark" on the root element; choosing System removes it. The tokens do the rest: the attribute sets color-scheme, and every light-dark() token re-resolves for the subtree, along with native form controls and scrollbars. Nothing else changes, so a consumer can set the same attribute on any region for a local override, and can read it in their own CSS.',
    },
    {
      title: "The pre-paint script is yours",
      body: 'The component persists the choice to localStorage under "loamui-theme" (or your storageKey), but it mounts after the first paint, so on reload the page would flash the system scheme before correcting. Preventing that is the page\'s job: an inline script in <head>, before the stylesheet applies, that reads the same key. The two lines that matter: var t = localStorage.getItem("loamui-theme"); if (t === "light" || t === "dark") document.documentElement.dataset.theme = t; — wrapped in try/catch, because storage can be refused.',
    },
  ],
  accessibility: [
    'It is a native <fieldset> of <input type="radio">s with a <legend>, so screen readers announce the group name on entry, one option is always checked, and the arrow keys move between options the way they do in every radio group.',
    "Each option's icon is decorative (aria-hidden); the accessible name comes from a visually hidden text label, System, Light or Dark, which is also what the labels prop lets you translate. The legend is hidden by the same recipe, so the group stays named even when showLabel is off.",
    "The checked state is carried by more than colour: the chosen option's circle has a 3:1 edge, and under forced colours it takes the system Highlight pair. The focus ring is drawn on the circle, at the elements-layer ring width and offset, so keyboard focus is visible on any background.",
  ],
  props: [
    {
      name: "label",
      type: "ReactNode",
      default: '"Colour scheme"',
      description: "The group's legend, always present in the accessibility tree.",
    },
    {
      name: "showLabel",
      type: "boolean",
      default: "false",
      description: "Paint the legend as text before the options instead of hiding it visually.",
    },
    {
      name: "labels",
      type: "Partial<Record<ColorScheme, ReactNode>>",
      description:
        'Visually hidden text for each option, keyed "system" | "light" | "dark". Override to localise.',
    },
    {
      name: "storageKey",
      type: "string",
      default: '"loamui-theme"',
      description:
        "The localStorage key the choice persists under. Your pre-paint script reads the same key.",
    },
    {
      name: "onChange",
      type: "(scheme: ColorScheme) => void",
      description:
        "Fires with the newly chosen scheme after the attribute and storage are updated.",
    },
    {
      name: "...others",
      type: "FieldsetHTMLAttributes",
      description:
        "All native <fieldset> props (except onChange) are forwarded; ref reaches the fieldset.",
    },
  ],
};

export default doc;
