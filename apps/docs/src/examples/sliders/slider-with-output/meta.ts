import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Slider with output",
  description:
    "A row-spacing slider with its value written in a readout that rides above the thumb: a native output bound to the range, in centimetres.",
  category: "sliders",
  uses: ["Field", "Range"],
  notes: {
    native:
      'The readout is a native <output for> pointing at the range, so the browser knows the two belong together and reports the value as a status; the slider itself is an <input type="range"> with the platform\'s keyboard.',
    modern:
      "The Root sets one custom property, the thumb's position as a fraction, and the Output's margin is a calc of it against the thumb's own size in em: no measuring, no script placing a bubble, and it holds at every container width.",
    composition:
      "Field.Root, Label and Description around Range.Root, Range and Range.Output as core ships them; the unit is the Output's labels.value, so the words are the consumer's and the binding is core's.",
    accessible:
      "The value is always in view, not only on hover, and the words say the unit; a screen reader hears the slider's value and the output's status. Both come from the one input, so the readout can never disagree with the thumb.",
  },
  tags: ["slider", "range", "output", "value", "readout", "spacing"],
  order: 2,
};
