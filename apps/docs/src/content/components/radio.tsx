import { Radio, RadioGroup } from "@loamui/core";
import type { ComponentContent } from "@/renderer/types";

const doc: ComponentContent = {
  slug: "radio",
  lead: "A single choice from a small set of visible, mutually exclusive options.",
  importLine: `import { Radio, RadioGroup, RadioControl } from "@loamui/core";`,
  demos: [
    {
      title: "Basic group",
      description: "A RadioGroup shares one name so only one option can be selected.",
      code: `<RadioGroup label="Theme" defaultValue="system">
  <Radio value="system" label="System" />
  <Radio value="light" label="Light" />
  <Radio value="dark" label="Dark" />
</RadioGroup>`,
      render: () => (
        <RadioGroup label="Theme" defaultValue="system">
          <Radio value="system" label="System" />
          <Radio value="light" label="Light" />
          <Radio value="dark" label="Dark" />
        </RadioGroup>
      ),
    },
    {
      title: "With descriptions",
      description: "Each option can carry helper text under its label.",
      code: `<RadioGroup label="Delivery">
  <Radio
    value="standard"
    label="Standard"
    description="Arrives in 3-5 business days."
  />
  <Radio
    value="express"
    label="Express"
    description="Guaranteed next-day delivery."
  />
</RadioGroup>`,
      render: () => (
        <RadioGroup label="Delivery">
          <Radio value="standard" label="Standard" description="Arrives in 3-5 business days." />
          <Radio value="express" label="Express" description="Guaranteed next-day delivery." />
        </RadioGroup>
      ),
    },
    {
      title: "Horizontal",
      description:
        "Lay the options out in a row only when there are two, short options. More than that, or longer labels, read better stacked.",
      code: `<RadioGroup label="Contact preference" orientation="horizontal">
  <Radio value="email" label="Email" />
  <Radio value="phone" label="Phone" />
</RadioGroup>`,
      render: () => (
        <RadioGroup label="Contact preference" orientation="horizontal">
          <Radio value="email" label="Email" />
          <Radio value="phone" label="Phone" />
        </RadioGroup>
      ),
    },
    {
      title: "Disabled option & error",
      code: `<RadioGroup
  label="Plan"
  error="Select a plan"
>
  <Radio value="basic" label="Basic" />
  <Radio value="pro" label="Pro" />
  <Radio value="legacy" label="Legacy" disabled />
</RadioGroup>`,
      render: () => (
        <RadioGroup label="Plan" error="Select a plan">
          <Radio value="basic" label="Basic" />
          <Radio value="pro" label="Pro" />
          <Radio value="legacy" label="Legacy" disabled />
        </RadioGroup>
      ),
    },
  ],
  whenToUse: [
    "For choosing exactly one option from a small, visible set (roughly 2–5).",
    "Always inside a RadioGroup, which shares a name and labels the set with a <fieldset>/<legend>.",
  ],
  whenNotToUse: [
    "For many options: a Select is more compact.",
    "For selecting several options: use Checkbox.",
    "For a single on/off: use Checkbox or Switch.",
  ],
  howItWorks: [
    {
      title: "A native radio, styled by accent-color",
      body: 'This is a plain <input type="radio">: no custom dot. The elements layer paints it with the platform\'s own accent-color (the neutral primary); selection, keyboard arrow-cycling and forced-colours support come from the browser. The component adds the label anatomy, group wiring and context adaptation.',
    },
    {
      title: "Never pre-select",
      body: "A group with a defaultValue lets users miss the question entirely and submit an answer they never gave, and once any radio is selected, the group can never be returned to unanswered. So when every option might be wrong, offer an explicit 'None of the above' option rather than leaving the user stuck. Omit defaultValue so the first selection is always a deliberate choice; reserve a default for the rare setting with one safe, overwhelmingly common value.",
    },
    {
      title: "Order the options",
      body: "List options alphabetically by default, so the order carries no editorial weight. Ordering by expected popularity needs extreme caution: it nudges users toward the top answers and, repeated across every form, can entrench the very distribution it assumed. Orders with intrinsic domain meaning (size, severity, date) are fine.",
    },
    {
      title: "Controls sit left of labels",
      body: "Radio renders the control before its label, keeping every control on the reading edge where screen-magnifier users panning a zoomed viewport will find it next to the text they are reading. Don't restyle labels to the other side: a right-hand control drifts out of the magnified view entirely.",
    },
  ],
  errors: [
    {
      situation: "A yes/no question is unanswered",
      message: "Select yes if [the thing is true]",
    },
    {
      situation: "A choice is unanswered",
      message: "Select [whatever the legend asks for]",
    },
  ],
  accessibility: [
    "RadioGroup renders a native <fieldset> with a <legend>, the accessible way to name a group: screen readers announce the legend when a radio is focused.",
    "Radios share one name so the browser enforces single-selection and arrow-key navigation natively.",
    'A group error sets aria-describedby and aria-invalid on the fieldset, which carries role="radiogroup", the one place ARIA allows aria-invalid for radios. Required native groups use the same state after a submit attempt and clear it after a selection. The individual radios never claim it; their danger borders are pure CSS answering the group state.',
  ],
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "Label rendered next to the control.",
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Helper text rendered under the label.",
    },
    {
      name: "wrapperClassName",
      type: "string",
      description: "Class for the label-row wrapper element (the input keeps className).",
    },
    {
      name: "...others",
      type: "InputHTMLAttributes",
      description: 'All native <input type="radio"> props (except type and size) are forwarded.',
    },
  ],
  parts: [
    {
      name: "RadioGroup",
      description:
        'The group fieldset: legend, helper text, shared name and single-selection state for the <Radio> options inside it. Renders role="radiogroup" and carries the group error.',
      props: [
        {
          name: "label",
          type: "ReactNode",
          description: "Group legend (wired via aria-labelledby).",
        },
        {
          name: "description",
          type: "ReactNode",
          description: "Helper text rendered under the group legend.",
        },
        {
          name: "error",
          type: "ReactNode",
          description: "Error message; marks the group invalid.",
        },
        {
          name: "name",
          type: "string",
          description: "Shared name for all radios (auto-generated if omitted).",
        },
        {
          name: "value",
          type: "string",
          description: "Controlled selected value (pair with onChange).",
        },
        {
          name: "defaultValue",
          type: "string",
          description: "Initial selected value for uncontrolled usage.",
        },
        {
          name: "onChange",
          type: "(value: string) => void",
          description: "Fires with the newly selected value.",
        },
        {
          name: "orientation",
          type: `"vertical" | "horizontal"`,
          default: `"vertical"`,
          description: "Layout direction of the options.",
        },
        {
          name: "optional",
          type: "boolean",
          default: "false",
          description: 'Appends "(optional)" to the group legend; optional is marked in words.',
        },
      ],
    },
    {
      name: "RadioControl",
      description:
        "The bare input without a label row, for composing inside a Field where the label lives on Field.Label. Takes the same props as Radio minus label, description and wrapperClassName.",
    },
  ],
};

export default doc;
