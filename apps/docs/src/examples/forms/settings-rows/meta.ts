import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Settings rows",
  description:
    "A group of preferences, each a label, a line explaining it and the control that sets it on one row, with one that could not be saved.",
  category: "forms",
  uses: ["Checkbox", "Field", "Fieldset", "Select", "Switch"],
  notes: {
    native:
      "A native fieldset names the group, and each row's label is the control's real <label>, so clicking the words flips the switch; the wiring is core Field's, not the switch's, which is why a Select and a Checkbox sit in the same slot labelled and described the same way.",
    modern:
      "The row's grid is rooted inside the Field that wires it, and the error auto-places under the words; below 24rem the control drops beneath the words, decided by the stack's own width.",
    composition:
      "Each row is a core Field holding the example's own two columns; Field.Label, Field.Description and Field.Error keep the look core gives them and the bare controls read their ids from the Field.",
    context:
      "The separator is a border, not a background, so it survives forced colours without a treatment of its own.",
    accessible:
      "A setting that acts on its own can still fail: the last row's Field.Error says what happened and what to do in the words of the setting, marks the switch invalid, joins the message to it and announces it, and the switch keeps the state the visitor chose rather than flipping back.",
  },
  tags: ["preferences", "settings", "toggles", "notifications", "account"],
  order: 7,
};
