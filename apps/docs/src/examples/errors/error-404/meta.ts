import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Page not found",
  description:
    "A 404 page in words alone: the code, what happened, one line on what to do, and two ways out, centred.",
  category: "errors",
  uses: ["SignpostLink"],
  notes: {
    native:
      "A section named by its own h1, because the error is the page; the code is a paragraph, not a heading, so the outline reads Page not found and not 404.",
    modern:
      "The page is a container so its type answers its own width, the title balances its lines and the description wraps prettily; nothing here is sized to a viewport.",
    composition:
      "Element styles carry the code, the title and the line; SignpostLink is the one component, dropped in as it comes beside a plain link, and the example only stacks and centres them.",
    accessible:
      "Nothing to decode: no picture, no icon, so the page reads the same to a screen reader as to anyone; the main way out is a SignpostLink because it goes somewhere, the second a plain link, and the copy says what to do without blaming the reader.",
  },
  tags: ["404", "not found", "missing", "error page", "text only"],
  order: 1,
};
