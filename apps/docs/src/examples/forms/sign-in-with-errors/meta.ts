import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Sign in with errors",
  description:
    "The sign-in form after a failed submit: an error summary first, linked to each field, and the same words again under the field itself.",
  category: "forms",
  uses: ["Button", "Card", "Checkbox", "ErrorSummary", "Field", "Input", "PasswordInput"],
  notes: {
    native:
      "Each Field carries an explicit id so the summary's links are fragment links to real controls: activating one moves focus into the field, and the browser scrolls to it without a line of scripting.",
    modern:
      "The Field's invalid state is detected, not declared: a rendered Field.Error is what marks the field, and the box's danger border follows the control's own aria-invalid.",
    composition:
      "ErrorSummary is the form's first child and Field.Error sits in each field; the same message in both places, so the two read identically out of context.",
    accessible:
      'Errors are placed twice on purpose: the summary is where a screen reader starts after the submit, and the message under the field is what a sighted reader sees when they get there. Each says what to do in the words of the question, never "invalid" or "required", and nothing typed is cleared. The password is asked for again rather than guessed at, and the summary lists the email problem first because that is the order the form is read in.',
  },
  tags: ["validation", "error summary", "login", "account"],
  order: 4,
};
