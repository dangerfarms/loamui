import type { ExampleMetaEntry } from "./types";

export function linkedRecipePrompt(entry: ExampleMetaEntry): string {
  return `Use the LoamUI skill to build the “${entry.meta.title}” recipe for my application.`;
}
