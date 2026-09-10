import type { ReactNode } from "react";

export type Category = "Page sections" | "Forms" | "Navigation" | "Data display" | "Blog";

export type Demo = {
  title: string;
  description?: string;
  /** Exactly what the preview renders, copy included. */
  code: string;
  render: () => ReactNode;
};

export type Part = { name: string; description: string };

export type Composition = {
  slug: string;
  name: string;
  category: Category;
  description: string;
  /** One sentence on why the composition is shaped this way. */
  lead: string;
  importLine: string;
  /** The parts the compound component exposes, in the order you arrange them. */
  parts: Part[];
  demos: Demo[];
  whenToUse?: string[];
  whenNotToUse?: string[];
};
