import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Users table with roles",
  description:
    "The team as a Table inside a form: a Select per row for the person's role, when they were last active written as a distance, a status pill, and one button to save the roles.",
  category: "users",
  uses: ["Avatar", "Badge", "Button", "Select", "Table", "Time"],
  notes: {
    native:
      'Each role is a native select named by a label that is read but not seen, and the table sits in a method="post" form with one submit button, so a change is a form submission the browser can make with no script.',
    modern:
      "The form is the root and the Table a scope of its own past the donut; the role column is floored at a width that fits its longest option, so nothing shifts as a choice changes.",
    composition:
      "Table, Select, Time and Badge are dropped into the cells as they are; Time is handed a fixed now so the server and the browser write the same words, and a member with no visit yet is plain text rather than an empty cell.",
    context:
      "Each status wraps its Badge in a region of its own kind, success, info or danger, so the pill takes its colour from where it sits, not from a prop; the save row is a primary region for the same reason, and primary is the brand slot, neutral until a theme fills it, so the row says where the form's action belongs rather than making it stand out.",
    accessible:
      "Every Select is named Role for Imogen Hartley, so a screen reader moving down the column knows whose role it is changing; each status says its state in words beside a dot that is decoration, and last active is a time element whose machine-readable value is the full moment.",
  },
  tags: ["table", "team", "roles", "permissions", "select", "status", "last active"],
  order: 6,
};
