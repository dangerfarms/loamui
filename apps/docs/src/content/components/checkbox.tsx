import { Checkbox } from "@loamui/core";
import type { ComponentContent } from "@/renderer/types";
import { CheckboxErrorDemo, CheckboxFieldDemo } from "./checkbox.client";

const doc: ComponentContent = {
  slug: "checkbox",
  lead: "A native checkbox with an adjacent label and description.",
  importLine: `import { Checkbox, Field } from "@loamui/core";`,
  demos: [
    {
      title: "Basic usage",
      description:
        "One self-contained opt-in. The label is a complete statement of what ticking the box does, and the box starts unticked so every tick is a deliberate act.",
      code: `<Checkbox label="Subscribe to the newsletter" />`,
      render: () => <Checkbox label="Subscribe to the newsletter" />,
    },
    {
      title: "Checked",
      description:
        "defaultChecked starts the box ticked for a form the browser owns; checked with onChange holds it yourself. A ticked start is for a setting that is already on, never for consent.",
      code: `<Checkbox label="Auto-renew" defaultChecked />`,
      render: () => <Checkbox label="Auto-renew" defaultChecked />,
    },
    {
      title: "With description",
      description:
        "description is helper text under the label, joined to the box through aria-describedby, so the consequence of ticking is read with the choice.",
      code: `<Checkbox
  label="Share anonymised usage data"
  description="Helps us improve the product. You can opt out anytime."
/>`,
      render: () => (
        <div style={{ maxInlineSize: "24rem" }}>
          <Checkbox
            label="Share anonymised usage data"
            description="Helps us improve the product. You can opt out anytime."
          />
        </div>
      ),
    },
    {
      title: "Disabled",
      description:
        "disabled reaches the native input: the row is dimmed and skipped by Tab. A ticked, disabled box shows a setting that is on and not the user's to change here. Disabled is detected on the input (:has(input:disabled)), never declared on the row.",
      code: `<Checkbox label="Email receipts" disabled />
<Checkbox label="Two-factor authentication" defaultChecked disabled />`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <Checkbox label="Email receipts" disabled />
          <Checkbox label="Two-factor authentication" defaultChecked disabled />
        </div>
      ),
    },
    {
      title: "Error state",
      description:
        "A Field.Error before the checkbox marks it invalid and is announced: no error prop, the message's presence is the state.",
      code: `<Field.Root>
  <Field.Error>Accept the terms of service to continue</Field.Error>
  <Checkbox label="Accept the terms of service" />
</Field.Root>`,
      render: () => <CheckboxErrorDemo />,
    },
    {
      title: "Composed inside a Field",
      description:
        "The bare Checkbox.Control carries no label prop: it reads its id, aria-describedby and aria-invalid from the surrounding Field, so the label lives on Field.Label and nothing wires them by hand. This is the composable form; <Checkbox label=… /> is the shorthand for it.",
      code: `<Field.Root>
  <Field.Label>
    <Checkbox.Control /> Subscribe to the newsletter
  </Field.Label>
  <Field.Description>A short summary, once a week.</Field.Description>
</Field.Root>`,
      render: () => <CheckboxFieldDemo />,
    },
  ],
  whenToUse: [
    "For a single on/off choice (accept terms, stay signed in).",
    "For selecting any number of options from a list: group related checkboxes in a Fieldset.",
    "Inside a Field for full control, compose the bare box so labels never nest: <Field.Label><Checkbox.Control /> …</Field.Label>.",
  ],
  whenNotToUse: [
    "For one choice among several mutually exclusive options: use Radio.",
    "For an instant on/off toggle that takes effect immediately: use Switch.",
  ],
  howItWorks: [
    {
      title: "A native checkbox, styled by accent-color",
      body: 'This is a plain <input type="checkbox">. No custom SVG box. The elements layer paints it with the platform\'s own accent-color (the neutral primary), so the checked and indeterminate marks, keyboard behaviour and forced-colours support all come from the browser. The component adds label/description wiring, the invalid affordance and a label target at least 2.75rem tall. Clicking that label toggles the native control. A context region recolours it because accent-color follows the primary token.',
    },
    {
      title: "One box or a group",
      body: "A single checkbox is for one self-contained agreement or opt-in whose label is a complete statement (“Agree to the terms of service”). Several related options belong in a Fieldset whose legend asks the question. Because checkboxes and radios look alike, say in the legend or description that users can select all that apply.",
    },
    {
      title: "Write the label positively",
      body: "The label states what happens when the box is ticked, in positive, unambiguous words: “Send me email updates”, never “Don't send me emails”. A negated label makes ticking mean refusing and unticking a double negative, and users acting quickly resolve it wrong.",
    },
    {
      title: "Leave boxes unticked",
      body: "A pre-ticked box gets submitted by everyone who never read it, so the data records a choice nobody made, and for consent it records nothing at all. Start unticked, so every tick is a deliberate act.",
    },
  ],
  errors: [
    {
      situation: "A required agreement is unticked",
      message: "Select [whatever the checkbox label states] to continue",
    },
    {
      situation: "Nothing in a required group is selected",
      message: "Select [whatever the legend asks for]",
    },
    {
      situation: "Too many options are selected",
      message: "Select no more than [N] [things]",
    },
  ],
  accessibility: [
    'Renders a real <input type="checkbox"> wrapped by its label, so clicking the text toggles it and the state is announced natively.',
    "Supports an indeterminate (mixed) visual for a 'select all' parent, set on the DOM node. It is a display state, not a third value.",
    "When placed inside a Field it reads its id, aria-describedby and aria-invalid from context, in the labelled form too: a Field.Label in the same Field points at the box, and the Field's description and error join the row's own description. Standalone it wires its own label and description.",
    "Disabled is detected on the native input (:has(input:disabled) on the row), never declared on a wrapper.",
    "Errors come from Field composition: wrap the checkbox in a Field.Root and add a Field.Error before the control, which marks it invalid and announces the message.",
    "Group multiple checkboxes under a Fieldset so the legend names the set in the accessibility tree.",
  ],
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "Label rendered next to the checkbox.",
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Helper text rendered below the label.",
    },
    {
      name: "indeterminate",
      type: "boolean",
      description: "Render the partially-checked (dash) visual state.",
    },
    {
      name: "wrapperProps",
      type: 'PartProps<"div">',
      description:
        "Props for the labelled row's root, which exists only with a label or description. className, style, ref and every other prop land on the <input> itself.",
    },
    {
      name: "...others",
      type: "InputHTMLAttributes",
      description:
        "All native <input> props (except type and size), and ref, are forwarded to the <input>.",
    },
  ],
  parts: [
    {
      name: "Checkbox.Control",
      description:
        "The bare box without a label, for composing inside a Field where the label lives on Field.Label. It reads its wiring (id, aria-describedby, aria-invalid) from the field context, and takes the same props as Checkbox minus label, description and wrapperProps.",
    },
  ],
};

export default doc;
