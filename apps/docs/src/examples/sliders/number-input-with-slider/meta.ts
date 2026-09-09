import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Number input with slider",
  description:
    "A propagator temperature set two ways: a three-character number box and a slider beside it, bound to the same value, each named by the one label.",
  category: "sliders",
  uses: ["Field", "Input", "Range"],
  notes: {
    native:
      'The box is a text input with inputMode="numeric" and the native size attribute, so a phone offers the number pad and the box is as wide as its answer; the slider is an <input type="range"> with the bounds as min and max, the platform\'s own semantics.',
    modern:
      "The row is a two-track grid, auto then the rest: the box's width comes from its size attribute, which core's Input honours by shrink-wrapping the box, so no width is declared anywhere.",
    composition:
      "Two core controls in one Field: the Input takes the Field's id, so the label points at it, and the Range is given its own id and aria-labelledby the label, so the label is the name of both without being the for of both. The binding is the example's, in the same file: the slider settles the value on every move, and the box only once what is typed is a whole number in range, or when it is left.",
    accessible:
      "Both controls answer to Propagator temperature and both are described by the Field's text with the bounds in it. A half-typed number never yanks the slider, and an empty box is not zero: leaving the box clamps what was typed into range and writes it back, so what is shown is always what will be submitted.",
  },
  tags: ["slider", "range", "number", "input", "bound", "temperature"],
  order: 3,
};
