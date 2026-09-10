import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Sign in",
  description:
    "The form at the door of an account: email and password on a card, a way to stay signed in, and the path to creating an account instead.",
  category: "forms",
  uses: ["Button", "Card", "Checkbox", "Field", "Input", "PasswordInput"],
  notes: {
    native:
      'A native form named by the heading through aria-labelledby, so a screen reader lands on "Sign in, form", posting with method="post" so the password never rides in a URL; the email field takes autoComplete="email" and the password autoComplete="current-password", the two values a password manager fills without guessing.',
    modern:
      "The Card is the container and caps itself at 24rem: the fluid tokens inside answer the card's width, not the viewport's.",
    composition:
      "Card is rendered as the example's own root, so the title, form and footer are reachable while the Fields, the Checkbox and the Button keep their own styles behind the donut; the actions row is a primary region, so the one Button is the form's action without a prop.",
    context:
      "The actions row declares --loam-context: primary because the one Button is the form's action; primary is the brand slot, neutral until a theme fills it, so the declaration says where the action belongs, not that it stands out.",
    accessible:
      "The password box has a Show password toggle so a long password is checked by reading rather than retyped; staying signed in is an unticked Checkbox, a choice the visitor makes; the Button says what happens, never Submit.",
  },
  tags: ["login", "account", "authentication", "password"],
  order: 1,
};
