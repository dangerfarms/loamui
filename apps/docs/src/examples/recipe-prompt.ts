import type { ExampleMetaEntry } from "./types";

export function linkedRecipePrompt(entry: ExampleMetaEntry, origin: string): string {
  const path = `${entry.category}/${entry.slug}`;
  return [
    `Build the LoamUI “${entry.meta.title}” recipe for my application.`,
    entry.meta.whenToUse ?? entry.meta.description,
    `Read these references before writing code:\n- Recipe, complete React/CSS and component links: ${origin}/recipes/${path}.md\n- Environment setup and two-pillar requirements: ${origin}/docs/agent-workflow.md\n- Composition patterns: ${origin}/recipes/guide.md`,
    "Use the real @loamui/core package and its three primitives: tokens, element styles and components. Preserve the recipe's purpose, semantics and interactions while adapting its content. Follow both pillars: Modern (native semantics, modern CSS and contextualism) and Accessible. Compose from documented parts rather than reaching inside them. Read the contracts of any core components you use.",
    "Inspect the environment first. Propose any required shared setup changes for approval unless already authorized. In a chat without package or rendering support, provide portable source and identify what cannot be verified; never fake the library or claim an untested preview is conformant.",
    `If you cannot read the references, ask me to attach the complete prompt from ${origin}/recipe-prompts/${path}.full.txt (or use the installed skill's bundled references). Do not guess missing APIs or proceed from appearance alone.`,
    "Deliver the component, stylesheet and required integration. Verify responsive layout, keyboard interaction, contrast and user preferences; report checks performed and any remaining gaps honestly.",
    "",
  ].join("\n\n");
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
