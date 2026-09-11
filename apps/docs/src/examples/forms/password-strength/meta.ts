import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Password length feedback",
  description:
    "A password field with a native length meter and explicit requirement feedback. It shows what has been checked without claiming to measure password strength.",
  category: "forms",
  uses: ["Field", "Meter", "PasswordInput"],
  integration:
    "This is length feedback, not a password-strength estimator. The twelve-character minimum is an example requirement. Apply your application’s actual password policy and server-side validation; do not accept a password solely because this meter is full.",
  notes: {
    native:
      "A native meter counts progress toward the stated length requirement; autoComplete=new-password enables password-manager suggestions.",
    modern:
      "The requirement uses a data-met attribute, text and a currentColor icon, so its state does not depend on colour alone.",
    composition:
      "Field connects the input and its description; an instance-specific ID includes the requirement list in that description.",
    accessible:
      "The meter has a text equivalent, and the requirement states met or not met in words. Live feedback reports character count and the length requirement only, never Weak or Strong.",
  },
  tags: ["password", "meter", "new password", "registration", "rules", "length"],
  order: 8,
};
