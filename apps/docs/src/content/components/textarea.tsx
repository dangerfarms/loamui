import type { ComponentContent } from "@/renderer/types";
import { TextareaBasicDemo, TextareaDescriptionDemo, TextareaErrorDemo } from "./textarea.client";

const doc: ComponentContent = {
  slug: "textarea",
  lead: "The multi-line text box. Compose it inside a Field for its label, description and error.",
  importLine: `import { Field, Textarea } from "@loamui/core";`,
  demos: [
    {
      title: "Basic usage",
      description:
        "Inside Field.Root the textarea reads its id from the field, so Field.Label is wired without any props.",
      code: `<Field.Root>
  <Field.Label>Notes</Field.Label>
  <Textarea />
</Field.Root>`,
      render: () => <TextareaBasicDemo />,
    },
    {
      title: "With description",
      code: `<Field.Root>
  <Field.Label>Bio</Field.Label>
  <Field.Description>
    A short description for your public profile.
  </Field.Description>
  <Textarea required />
</Field.Root>`,
      render: () => <TextareaDescriptionDemo />,
    },
    {
      title: "Error state",
      description:
        "A Field.Error before the control marks the field invalid and is announced: the message's presence is the state.",
      code: `<Field.Root>
  <Field.Label>Message</Field.Label>
  <Field.Error>Message must be 20 characters or more</Field.Error>
  <Textarea defaultValue="Too short" />
</Field.Root>`,
      render: () => <TextareaErrorDemo />,
    },
  ],
  whenToUse: [
    "For multi-line, free-form text: messages, comments, addresses, notes.",
    "When the expected input is longer than a single line or the user may want to add line breaks.",
  ],
  whenNotToUse: [
    "For single-line values (names, emails): use Input.",
    "For a fixed set of options: use Select, Radio or Checkbox.",
  ],
  howItWorks: [
    {
      title: "Auto-grow is built in",
      body: "Where the platform supports field-sizing: content, the field grows with the answer up to ten lines and then scrolls (no JS, no measuring). A minimum height keeps the empty field recognisably multi-line, and the rows prop remains the semantic fallback height where auto-grow is unsupported. Set it to match the expected answer: three rows asks for a note, ten invites an essay.",
    },
    {
      title: "Keep resize on",
      body: "The field is user-resizable in the block direction (resize: block), so anyone can make room for a long answer without horizontal drag ever breaking the layout. Don't remove it with CSS: taking resize away removes user control and gains nothing. Disabled fields drop the handle automatically.",
    },
    {
      title: "Limits live in the description",
      body: "State a length limit up front in the Field.Description (“Your answer must be 200 characters or fewer”) rather than springing it as an error after the user has written too much. LoamUI does not ship a live character counter, so keep the validation message in exactly the words the description used: the rule then reads the same before and after the mistake.",
    },
    {
      title: "Never disable copy and paste",
      body: "People draft long answers elsewhere and paste them in; blocking paste, or clearing the field on validation, punishes exactly the users taking the most care. The field keeps whatever arrives, and errors describe the rule the text broke.",
    },
  ],
  errors: [
    {
      situation: "The text contains a disallowed character",
      message: "[Label] must not include [characters]",
    },
    {
      situation: "The field is empty",
      message: "Enter [whatever the label asks for]",
    },
    {
      situation: "The answer is too long",
      message: "[Label] must be [N] characters or fewer",
    },
    {
      situation: "The answer is too short",
      message: "[Label] must be [N] characters or more",
    },
  ],
  accessibility: [
    "Inside a Field.Root it self-wires, so the label, description and error share one accessible wiring (label tied by id, aria-describedby, aria-invalid). See the Field page.",
    'Field.Error uses role="alert" so the message is announced when it appears.',
    "Resizes vertically only, so horizontal resize can't break the layout; give enough default rows to hint at the expected length.",
  ],
  props: [
    {
      name: "rows",
      type: "number",
      default: "3",
      description: "Number of visible text rows.",
    },
    {
      name: "wrapperClassName",
      type: "string",
      description: "Class for the bordered field wrapper; className goes to the control itself.",
    },
    {
      name: "...others",
      type: "TextareaHTMLAttributes",
      description: "All native <textarea> props are forwarded, except size (sizing is contextual).",
    },
  ],
};

export default doc;
