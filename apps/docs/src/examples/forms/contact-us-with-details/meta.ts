import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Contact us with details",
  description:
    "A short enquiry form alongside the nursery's email, phone number, address and opening hours.",
  whenToUse:
    "Use when people should be able to choose between sending a message and contacting you directly. State when replies are handled so they can decide whether another contact method is more suitable.",
  integration:
    "Replace the sample contact details and pass an action URL for your POST endpoint; the sample defaults to /contact. Validate both fields on the server, deliver the message and return a confirmation. If submission fails, preserve the entered values and return a focused ErrorSummary with matching Field.Error messages, as shown in Sign in with errors. The browser's required and email checks are a convenience, not a replacement for server validation.",
  category: "forms",
  uses: ["Button", "Field", "Input", "Textarea"],
  notes: {
    native:
      "An address and description list pair each contact method with its value. Email and phone links use mailto: and tel:. The native POST form uses native required fields, email validation and autocomplete.",
    modern:
      "Layered donut scopes keep recipe styles local. An intrinsic auto-fit grid stacks the details and form when two columns cannot fit; padding and type tokens resolve inside the section's container. The padding interpolation includes rem as well as cqi so it responds to enlarged root text; long labels and addresses can wrap. Headings inherit the element typography.",
    composition:
      "The section supplies one shared surface around the details and native form. Field wires labels and descriptions; Input, Textarea and Button keep their own styles. Avoiding nested padded surfaces leaves room for the form at narrow widths and enlarged text sizes.",
    context:
      "The actions region declares --loam-context: primary for its Button. Shared surface, text and border tokens follow the colour scheme; layout and sizing are supplied by the parent rather than configuration props.",
    accessible:
      "Required fields are identified in their visible labels, and the email description is wired by Field. Decorative icons repeat visible terms and are hidden from assistive technology. Email and telephone values retain left-to-right ordering in RTL pages. Text and DOM order stay intact when the grid stacks, and real borders preserve surface boundaries in forced colours.",
  },
  tags: ["contact", "enquiry", "address", "form", "support"],
  order: 2,
};
