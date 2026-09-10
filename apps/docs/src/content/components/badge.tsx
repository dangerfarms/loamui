import { Badge } from "@loamui/core";
import type { CSSProperties } from "react";
import type { ComponentContent } from "@/renderer/types";
import { BadgeDotDemo } from "./badge.client";

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
      description:
        "size is one of three tokens, emitted as data-size: the type step, with the pill's geometry in em on it. It is the one size prop the library keeps for display components, because a pill is an intrinsic glyph that no container can size.",
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
        "Compose a Badge.Dot before the label to show a status dot. It takes the context's colour, so the badge reads at a glance even before the text. Draft has no context, so its dot stays neutral: the dot still shows without one.",
      code: `<span style={{ "--loam-context": "success" }}>
  <Badge><Badge.Dot /> Live</Badge>
</span>
<span style={{ "--loam-context": "warning" }}>
  <Badge><Badge.Dot /> Pending</Badge>
</span>
<span style={{ "--loam-context": "danger" }}>
  <Badge><Badge.Dot /> Offline</Badge>
</span>
<Badge><Badge.Dot /> Draft</Badge>`,
      render: () => <BadgeDotDemo />,
    },
    {
      title: "As a link",
      description:
        "A badge is not a control, but a tag can be a link to everything tagged the same way. render substitutes the element and the pill stays; the link role, focus and keyboard behaviour come from the <a>.",
      code: `<span style={{ "--loam-context": "info" }}>
  <Badge render={<a href="#tag-design" />}>design</Badge>
</span>`,
      render: () => (
        <span style={{ "--loam-context": "info" } as CSSProperties}>
          <Badge render={<a href="#tag-design" />}>design</Badge>
        </span>
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
    "With Badge.Dot for presence and liveness (“Live”, “Offline”): the dot carries the raw status colour so the state reads even before the word.",
  ],
  whenNotToUse: [
    "As a click target for an action. Badge renders a plain <span> with no role, focus or keyboard handling. A tag that navigates is render={<a href />}; a status that triggers something is a Button beside it.",
    "For sentences or long labels. The pill is white-space: nowrap, so long text will not wrap; it is built for one or two words.",
  ],
  howItWorks: [
    {
      title: "One or two words",
      body: "A badge is metadata absorbed at a glance while scanning past it. The moment the label needs a verb it has become content, and content belongs in text the eye is meant to stop on. The nowrap styling enforces this: prose in a badge will not fit.",
    },
    {
      title: "Never interactive",
      body: "The rendered element is a span with no interactive semantics, and that is deliberate: a status is a fact, not an affordance. An onClick on it creates a control that keyboards and screen readers cannot find. The one interactive badge is a link, because a tag can lead to everything it tags: render={<a href />} keeps the pill on a real <a>. An action belongs on a Button beside it.",
    },
  ],
  accessibility: [
    "Renders a plain <span> with no role and no focus behaviour: screen readers announce it as ordinary inline text, exactly what a label should be.",
    "The status dot is aria-hidden decoration, so the visible word must carry the state on its own (“Live”, not a bare green dot). Under forced colours it keeps a border in the text colour, so it survives where background paint is stripped.",
    "The context colours the pill but is never announced. Assistive tech hears only the text, so never let colour be the only difference between two badges.",
    "The label is not the raw status colour: it is mixed toward black (light scheme) or white (dark) so it keeps contrast on the pill's own tint in both schemes.",
  ],
  props: [
    {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      default: `"md"`,
      description: "Control size: the type step, with the pill's geometry in em on it.",
    },
    {
      name: "render",
      type: "element | (props) => node",
      description:
        "Substitute the element (render={<a href=… />} for a tag that is a link); the Badge's class and attributes merge onto it.",
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
  parts: [
    {
      name: "Badge.Dot",
      description:
        "A status dot composed before the label: an aria-hidden <span> carrying the raw context colour. Native <span> props are forwarded.",
    },
  ],
  contextual: true,
};

export default doc;
