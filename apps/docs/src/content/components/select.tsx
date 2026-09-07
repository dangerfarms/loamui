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
  lead: "A native select with a fluid chevron, accessible and zero-JS. Compose it inside a Field for its label, description and error.",
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
      title: "Starting unanswered",
      description:
        "An unanswered start is an option like any other: a first child with an empty value, disabled so it can never be chosen. The select starts on it, so a required field the user skipped is caught, and the prompt reads muted until answered.",
      code: `<Field.Root>
  <Field.Label>Country</Field.Label>
  <Select>
    <option value="" disabled>Pick a country</option>
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
  <Select>
    <option value="" disabled>Pick a country</option>
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
      body: "Make the first child a disabled option with an empty value, so the field starts unanswered and required validation catches an untouched select. With no such option the first real one is pre-selected, and users who skip the field silently submit an answer they never chose. The prompt is an option, not a prop: the platform already has the element for it.",
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
    "A prompt is a disabled first option with an empty value, so it is never a selectable value; the select starts on it when nothing else is chosen.",
    "Under forced colours the danger border colour is dropped, so an invalid select carries its state as an outline in a system colour, with the focus ring offset further out.",
  ],
  props: [
    {
      name: "children",
      type: "ReactNode",
      description:
        'Native <option> / <optgroup> elements, passed straight through. A leading <option value="" disabled> is the unanswered start.',
    },
    {
      name: "wrapperProps",
      type: 'PartProps<"div">',
      description:
        "Props for the box around the select, which positions the chevron. className, style, ref and every other prop land on the <select> itself; this is the one way to reach the box.",
    },
    {
      name: "...others",
      type: "SelectHTMLAttributes",
      description:
        "All native <select> props, and ref, are forwarded to the <select>, except size (a listbox is not this component).",
    },
  ],
};

export default doc;
