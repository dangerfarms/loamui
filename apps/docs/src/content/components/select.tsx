import type { ComponentContent } from "@/renderer/types";
import {
  SelectBasicDemo,
  SelectDescriptionDemo,
  SelectErrorDemo,
  SelectGroupsDemo,
  SelectPlaceholderDemo,
} from "./select.client";

const doc: ComponentContent = {
  slug: "select",
  lead: "A styled wrapper around a native select, accessible and zero-JS. Compose it inside a Field for its label, description and error.",
  importLine: `import { Field, Select } from "@loamui/core";`,
  demos: [
    {
      title: "Basic usage",
      description:
        "Inside Field.Root the select reads its id from the field, so Field.Label is wired without any props.",
      code: `<Field.Root>
  <Field.Label>Country</Field.Label>
  <Select>
    <option>Canada</option>
    <option>United Kingdom</option>
    <option>United States</option>
  </Select>
</Field.Root>`,
      render: () => <SelectBasicDemo />,
    },
    {
      title: "With placeholder",
      description: "Pass a placeholder to render an empty prompt option first.",
      code: `<Field.Root>
  <Field.Label>Country</Field.Label>
  <Select placeholder="Pick a country">
    <option value="ca">Canada</option>
    <option value="uk">United Kingdom</option>
    <option value="us">United States</option>
  </Select>
</Field.Root>`,
      render: () => <SelectPlaceholderDemo />,
    },
    {
      title: "Groups and disabled options",
      description:
        "Options pass straight to the native select, so optgroup and disabled work exactly as the platform defines them.",
      code: `<Field.Root>
  <Field.Label>Instrument</Field.Label>
  <Select>
    <optgroup label="Strings">
      <option>Violin</option>
      <option>Cello</option>
    </optgroup>
    <optgroup label="Brass">
      <option>Trumpet</option>
      <option disabled>Tuba (unavailable)</option>
    </optgroup>
  </Select>
</Field.Root>`,
      render: () => <SelectGroupsDemo />,
    },
    {
      title: "With a description",
      description:
        "Field.Description links to the select via aria-describedby, the same wiring every control gets inside a Field.",
      code: `<Field.Root>
  <Field.Label>Country</Field.Label>
  <Field.Description>Where you are resident for tax.</Field.Description>
  <Select>
    <option>United States</option>
    <option>Canada</option>
  </Select>
</Field.Root>`,
      render: () => <SelectDescriptionDemo />,
    },
    {
      title: "Error state",
      description:
        "A Field.Error before the control marks the field invalid and is announced: the message's presence is the state.",
      code: `<Field.Root>
  <Field.Label>Country</Field.Label>
  <Field.Error>Select a country</Field.Error>
  <Select placeholder="Pick a country">
    <option>Canada</option>
    <option>United Kingdom</option>
    <option>United States</option>
  </Select>
</Field.Root>`,
      render: () => <SelectErrorDemo />,
    },
  ],
  whenToUse: [
    "For choosing one option from a longer list (roughly 5+) where showing them all would take too much space.",
    "When the options are familiar and the user doesn't need to compare them side by side.",
  ],
  whenNotToUse: [
    "For a small set of options the user should see at once: use Radio, which shows every choice up front.",
    "For yes/no or on/off: use Checkbox or Switch.",
    "For free-form input: use Input.",
  ],
  howItWorks: [
    {
      title: "Start without a value",
      body: "Pass placeholder to render a disabled, empty first option, so the field starts unanswered and required validation catches an untouched select. Without it the first real option is pre-selected, and users who skip the field silently submit an answer they never chose.",
    },
    {
      title: "Order the options",
      body: "List options alphabetically so users can predict where an answer sits in a long menu, the reason to use a Select at all. Depart only for an order that is genuinely more useful in the domain, like months in calendar order or years newest-first.",
    },
    {
      title: "A select conceals its options",
      body: "Until opened, the menu shows one value and hides every alternative, so users can't survey or compare the choices. The cost shows up in usability testing: people try to type into the closed control, mistake the focused option for a selected one, and struggle to operate the menu zoomed in. That is the cost that makes RadioGroup the better control for small sets. Reserve Select for long lists of familiar answers users recognise rather than weigh up.",
    },
  ],
  errors: [
    {
      situation: "Nothing is selected",
      message: "Select [whatever the label asks for]",
    },
  ],
  accessibility: [
    "Wraps a native <select>, so keyboard interaction, typeahead and the mobile picker come from the platform.",
    'Inside a Field.Root it self-wires: the label, description and error are linked via id / aria-describedby / aria-invalid, with the error announced as role="alert". See the Field page.',
    "A placeholder renders as a disabled first option so it is never a selectable value.",
  ],
  props: [
    {
      name: "placeholder",
      type: "string",
      description: "Non-selectable prompt shown as the first, empty option.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Native <option> / <optgroup> elements, passed straight through.",
    },
    {
      name: "wrapperClassName",
      type: "string",
      description: "Class for the bordered field wrapper; className goes to the control itself.",
    },
    {
      name: "...others",
      type: "SelectHTMLAttributes",
      description: "All native <select> props are forwarded, except size (sizing is contextual).",
    },
  ],
};

export default doc;
