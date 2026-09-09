import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "User button",
  description:
    "The current account as one control: an avatar, the person's name and their email in a row, the affordance at the foot of a sidebar for switching or opening the account.",
  category: "users",
  uses: ["Avatar"],
  notes: {
    native:
      "A real button, because it acts; its accessible name is its visible text, the name and the email, so nothing is written twice.",
    modern:
      "The email clips with an ellipsis inside a grid cell floored at zero, so a long address never widens the row, and the chevron mirrors under :dir(rtl) because its path is drawn for the inline end.",
    composition:
      "Avatar is the one component; the rest is a button, a strong and a span, with the elements layer's button dressing set aside for the shape an account row has.",
    accessible:
      "The Avatar is hidden so the name is heard once, the border is kept transparent so forced colours draw an edge, and the hover surface carries no state that would need a treatment there.",
  },
  tags: ["account", "avatar", "sidebar", "switch account", "profile"],
  order: 2,
};
