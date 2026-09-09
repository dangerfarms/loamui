import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Contact us with details",
  description:
    "Two columns: the ways to reach the nursery with a glyph each, and a short form with an email and a message beside them.",
  category: "page-sections",
  uses: ["Button", "Card", "Field", "Input", "Textarea"],
  notes: {
    native:
      "The details are an address holding a description list, so email, phone and place are terms with values rather than a list of icons; the form is a native form named by its own h3, with the email and message required.",
    modern:
      "The section paints the subtle surface and is the container; at 44rem of its own width the inner element splits 2:3, and the Card is scoped from its own root so the section's rule never reaches inside it.",
    composition:
      "Card is rendered as the form through its render prop, so the surface and the form are one element; the Fields, Input, Textarea and Button inside are core parts past the donut, and the example adds only the heading and the actions row.",
    accessible:
      "The glyphs sit inside the terms and are aria-hidden, so a screen reader hears Email, then the address; the tint behind the section gets a border in forced colours.",
  },
  tags: ["contact", "enquiry", "address", "form", "support"],
  order: 26,
};
