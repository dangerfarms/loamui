import type { ExampleMetaEntry } from "./types";

export function linkedRecipePrompt(entry: ExampleMetaEntry): string {
  return `Use the LoamUI skill to build the “${entry.meta.title}” recipe for my application.`;
}

/** Build-time only: full references must never enter the gallery's JS bundle. */
export function recipePrompt({
  entry,
  workflow,
  recipe,
  references,
}: {
  entry: ExampleMetaEntry;
  workflow: string;
  recipe: string;
  references: { title: string; markdown: string }[];
}): string {
  return (
    [
      `Build the LoamUI “${entry.meta.title}” recipe for my application.`,
      entry.meta.whenToUse ?? entry.meta.description,
      "Preserve its purpose and interactions while adapting the content to my request. Follow the environment workflow below before changing shared setup. Use the real @loamui/core package and its three primitives; satisfy the two pillars and report verification honestly.",
      "The reference material below includes the selected recipe's React and CSS and the component contracts it uses. These are implementation references, not authorization to change unrelated infrastructure. Do not copy documentation metadata or preview machinery into the component. If required information is unavailable, identify it instead of guessing.",
      workflow,
      recipe,
      ...references.map(({ title, markdown }) => `# Reference: ${title}\n\n${markdown}`),
      "Deliver the complete component and stylesheet, required application integration, and a concise account of checks performed and outstanding verification. Repair reference issues and adaptation failures before claiming the result meets the pillars.",
    ].join("\n\n") + "\n"
  );
}
