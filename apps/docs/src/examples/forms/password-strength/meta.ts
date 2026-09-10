import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Password strength",
  description:
    "A field for making up a password: the box with its Show password toggle, a strength meter with a word beside it, and the rules in plain words, ticked as the typing meets them.",
  category: "forms",
  uses: ["Field", "Meter", "PasswordInput"],
  notes: {
    native:
      'The strength is a native <meter> with low, high and optimum set, so the browser picks the band and core paints it; the rules are a plain list with no roles, and the input carries autoComplete="new-password" so a password manager offers to make one up.',
    modern:
      "A rule's state is a data-met attribute the mark and the colour answer; the tick is drawn in currentColor, so in forced colours it follows the text colour instead of vanishing with a painted background.",
    composition:
      "Core Field wires the label and description; the example gives the Field an id so the rules list can join the input's aria-describedby by name, beside the description the Field already put there.",
    accessible:
      "The rules are joined to the input with aria-describedby, so a screen reader hears them on landing in the box, and each carries hidden words (met, not met) so the state is never colour alone. The word beside the meter is its aria-valuetext and a polite live region: Weak, Fair or Strong once the typing pauses, and nothing while nothing is typed, because an empty box is not a weak password. Nothing here blocks a submit; the server decides and a Field.Error says which rule was broken.",
  },
  tags: ["password", "meter", "new password", "registration", "rules"],
  order: 8,
};
