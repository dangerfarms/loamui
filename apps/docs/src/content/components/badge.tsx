import { Badge } from "@loamui/core";
import type { CSSProperties } from "react";
import type { ComponentContent } from "@/renderer/types";

const doc: ComponentContent = {
  slug: "badge",
  lead: "A compact pill for statuses, counts, and labels.",
  importLine: `import { Badge } from "@loamui/core";`,
  demos: [
    {
      title: "Contexts",
      description:
        "Badges are neutral by default. There are no variant or colour props: declare --loam-context on a one-element wrapper region (see the Contextualism guide) and the status colours follow, or let it inherit from a larger region. Badge keeps a size prop because it sizes an intrinsic glyph, the one exception the library makes for display components (Badge, Loader, Progress).",
      code: `<Badge>Neutral</Badge>
<span style={{ "--loam-context": "primary" }}><Badge>Primary</Badge></span>
<span style={{ "--loam-context": "success" }}><Badge>Success</Badge></span>
<span style={{ "--loam-context": "warning" }}><Badge>Warning</Badge></span>
<span style={{ "--loam-context": "danger" }}><Badge>Danger</Badge></span>
<span style={{ "--loam-context": "info" }}><Badge>Info</Badge></span>`,
      render: () => (
        <>
          <Badge>Neutral</Badge>
          <span style={{ "--loam-context": "primary" } as CSSProperties}>
            <Badge>Primary</Badge>
          </span>
          <span style={{ "--loam-context": "success" } as CSSProperties}>
            <Badge>Success</Badge>
          </span>
          <span style={{ "--loam-context": "warning" } as CSSProperties}>
            <Badge>Warning</Badge>
          </span>
          <span style={{ "--loam-context": "danger" } as CSSProperties}>
            <Badge>Danger</Badge>
          </span>
          <span style={{ "--loam-context": "info" } as CSSProperties}>
            <Badge>Info</Badge>
          </span>
        </>
      ),
    },
    {
      title: "Sizes",
      code: `<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`,
      render: () => (
        <>
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </>
      ),
    },
    {
      title: "Status dot",
      description:
        "Add dot to show a status dot before the label. It takes the context's colour, so the badge reads at a glance even before the text. Draft has no context, so its dot stays neutral: the dot still shows without one.",
      code: `<span style={{ "--loam-context": "success" }}><Badge dot>Live</Badge></span>
<span style={{ "--loam-context": "warning" }}><Badge dot>Pending</Badge></span>
<span style={{ "--loam-context": "danger" }}><Badge dot>Offline</Badge></span>
<Badge dot>Draft</Badge>`,
      render: () => (
        <>
          <span style={{ "--loam-context": "success" } as CSSProperties}>
            <Badge dot>Live</Badge>
          </span>
          <span style={{ "--loam-context": "warning" } as CSSProperties}>
            <Badge dot>Pending</Badge>
          </span>
          <span style={{ "--loam-context": "danger" } as CSSProperties}>
            <Badge dot>Offline</Badge>
          </span>
          <Badge dot>Draft</Badge>
        </>
      ),
    },
    {
      title: "Icons (composed as children)",
      description:
        "No leftSection / rightSection props: an svg child is detected via :has(svg) and gets a gap and 1em sizing, exactly like Button.",
      code: `<span style={{ "--loam-context": "success" }}>
  <Badge>
    <svg viewBox="0 -0.5 25 25" fill="none" aria-hidden>
      <path d="M5.5 12.5L10.167 17L19.5 8" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    Verified
  </Badge>
</span>`,
      render: () => (
        <span style={{ "--loam-context": "success" } as CSSProperties}>
          <Badge>
            <svg viewBox="0 -0.5 25 25" fill="none" aria-hidden>
              <path
                d="M5.5 12.5L10.167 17L19.5 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Verified
          </Badge>
        </span>
      ),
    },
  ],
  whenToUse: [
    "To label a record with its status or category at a glance: one or two words sitting next to the thing they describe, readable without reading the row.",
    "For small counts and metadata (unread messages, item totals) where a full sentence would drown the signal.",
    "With dot for presence and liveness (“Live”, “Offline”): the dot carries the raw status colour so the state reads even before the word.",
  ],
  whenNotToUse: [
    "As a click target. Badge renders a plain <span> with no role, focus or keyboard handling. If the status should filter or navigate, use a Button or a link and style from there.",
    "For sentences or long labels. The pill is white-space: nowrap, so long text will not wrap; it is built for one or two words.",
  ],
  howItWorks: [
    {
      title: "One or two words",
      body: "A badge is metadata absorbed at a glance while scanning past it. The moment the label needs a verb it has become content, and content belongs in text the eye is meant to stop on. The nowrap styling enforces this: prose in a badge will not fit.",
    },
    {
      title: "Never interactive",
      body: "The rendered element is a span with no interactive semantics, and that is deliberate: a status is a fact, not an affordance. Making a badge clickable creates a control that keyboards and screen readers cannot find. Put the action on a real Button or link beside it.",
    },
  ],
  accessibility: [
    "Renders a plain <span> with no role and no focus behaviour: screen readers announce it as ordinary inline text, exactly what a label should be.",
    "The status dot is aria-hidden decoration, so the visible word must carry the state on its own (“Live”, not a bare green dot).",
    "The context colours the pill but is never announced. Assistive tech hears only the text, so never let colour be the only difference between two badges.",
    "The label is not the raw status colour: it is mixed toward black (light scheme) or white (dark) so it keeps contrast on the pill's own tint in both schemes.",
  ],
  props: [
    {
      name: "dot",
      type: "boolean",
      description: "Show a status dot before the label, coloured by the context.",
    },
    {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      default: `"md"`,
      description: "Control size (height, padding, font size).",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "The badge content: label, and any composed icons.",
    },
    {
      name: "...others",
      type: "SpanHTMLAttributes",
      description: "All native <span> props are forwarded.",
    },
  ],
  contextual: true,
};

export default doc;
