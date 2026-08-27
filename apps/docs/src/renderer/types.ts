import type { ReactNode } from "react";

/** A single live example on a component page. */
export interface Demo {
  title: string;
  description?: string;
  /** Source shown in the Code tab (exact string, already formatted). */
  code: string;
  /** Rendered output for the Preview tab. */
  render: () => ReactNode;
}

/** One row in a props table. */
export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

/**
 * A composable part or companion component, documented with its own
 * props table so the reference mirrors the anatomy.
 */
export interface PartDoc {
  /** As written in code: "Modal.Trigger", "RadioGroup", "CheckboxControl". */
  name: string;
  /** What the part is and renders. */
  description: string;
  props?: PropRow[];
}

/** A public CSS custom property — the styling channel, not a prop. */
export interface CssPropRow {
  name: string;
  /** Accepted value space, e.g. "CSS length" or "CSS color". */
  syntax: string;
  default?: string;
  description: string;
}

/** A hook shipped alongside the component. */
export interface HookDoc {
  name: string;
  /** The signature, shown as code. */
  signature: string;
  description: string;
  /** A table of options for the hook's main call, when it takes any. */
  options?: { title: string; rows: PropRow[] };
}

/** A titled passage of usage judgment, optionally with its own example. */
export interface HowItWorksEntry {
  title: string;
  /** Prose stating the prescription and its reason. */
  body: string;
  /** Optional live example illustrating the prescription. */
  code?: string;
  render?: () => ReactNode;
}

/** An error-message template for one situation. */
export interface ErrorTemplate {
  situation: string;
  message: string;
}

/**
 * A component's page content, as authored in src/content/components/.
 * Identity (name, category, description) lives once in site/nav.ts — the
 * component manifest — and the registry joins the two by slug.
 */
export interface ComponentContent {
  slug: string;
  /**
   * Page lead rendered under the title. Falls back to the manifest's
   * one-line description, which stays short for the sidebar and search.
   */
  lead?: string;
  /** Import statement shown at the top of the page. */
  importLine: string;
  demos: Demo[];
  /** The component's own props (plus the forwarded-natives row). */
  props?: PropRow[];
  /** Composable parts / companion components, each with its own table. */
  parts?: PartDoc[];
  /** Public CSS custom properties — the styling channel. */
  cssProps?: CssPropRow[];
  /** Hooks shipped with the component. */
  hooks?: HookDoc[];
  /**
   * The component answers the surrounding `--fui-context` region. Renders
   * the standard status note once, instead of a per-page pseudo-prop row.
   */
  contextual?: boolean;
  /** When this component is the right choice. */
  whenToUse?: string[];
  /** When to reach for something else instead. */
  whenNotToUse?: string[];
  /** Accessibility notes and the reasoning behind them. */
  accessibility?: string[];
  /** Per-situation usage judgment — the "How it works" section. */
  howItWorks?: HowItWorksEntry[];
  /** Error-message templates for form components. */
  errors?: ErrorTemplate[];
  /** Which package the component ships in (used by the CSS tab). @default "core" */
  pkg?: "core";
}

/** Content joined with its manifest identity — what the page renders. */
export interface ComponentDoc extends ComponentContent {
  name: string;
  category: Category;
  /** One-line summary shown under the title and in search. */
  description: string;
}

export type Category = "Inputs" | "Data display" | "Feedback" | "Disclosures" | "Navigation";
