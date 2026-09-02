import { Progress } from "@loamui/core";
import type { CSSProperties } from "react";
import type { ComponentContent } from "@/renderer/types";
import { Example } from "@/renderer/Example";

const doc: ComponentContent = {
  slug: "progress",
  lead: "A horizontal bar showing completion of a task.",
  importLine: `import { Progress } from "@loamui/core";`,
  demos: [
    {
      title: "Basic",
      description: "Set value 0–100. Add label to show the percentage inside the bar.",
      code: `<Progress value={72} />
<Progress value={72} label />`,
      render: () => (
        <div style={{ display: "grid", gap: "1rem", inlineSize: "100%" }}>
          <Example label="Value only" style={{ justifyItems: "stretch" }}>
            <Progress value={72} />
          </Example>
          <Example label="With a value label" style={{ justifyItems: "stretch" }}>
            <Progress value={72} label />
          </Example>
        </div>
      ),
    },
    {
      title: "Sizes",
      description: "size sets the track thickness: sm, md or lg.",
      code: `<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" />`,
      render: () => (
        <div style={{ display: "grid", gap: "1rem", inlineSize: "100%" }}>
          <Example label="Small" style={{ justifyItems: "stretch" }}>
            <Progress value={60} size="sm" />
          </Example>
          <Example label="Medium" style={{ justifyItems: "stretch" }}>
            <Progress value={60} size="md" />
          </Example>
          <Example label="Large" style={{ justifyItems: "stretch" }}>
            <Progress value={60} size="lg" />
          </Example>
        </div>
      ),
    },
    {
      title: "Contexts",
      description:
        "There is no color prop. Declare --loam-context on a one-element wrapper region (a style query is answered by ancestors, never by the declaring element itself), or let it inherit from a region that already means something. See the Contextualism guide.",
      code: `<Progress value={50} />
<div style={{ "--loam-context": "warning" }}>
  <Progress value={88} />
</div>
<div style={{ "--loam-context": "danger" }}>
  <Progress value={98} />
</div>
<div style={{ "--loam-context": "success" }}>
  <Progress value={100} />
</div>`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem", inlineSize: "100%" }}>
          <Progress value={50} />
          <div style={{ "--loam-context": "warning" } as CSSProperties}>
            <Progress value={88} />
          </div>
          <div style={{ "--loam-context": "danger" } as CSSProperties}>
            <Progress value={98} />
          </div>
          <div style={{ "--loam-context": "success" } as CSSProperties}>
            <Progress value={100} />
          </div>
        </div>
      ),
    },
    {
      title: "Striped & animated",
      description:
        "Stripes convey ongoing, indeterminate-feeling work; with animated the stripes slide, which is the only difference between the two rows and is not visible in a static screenshot.",
      code: `<Progress value={65} striped />
<Progress value={65} animated />`,
      render: () => (
        <div style={{ display: "grid", gap: "1rem", inlineSize: "100%" }}>
          <Example label="Striped" style={{ justifyItems: "stretch" }}>
            <Progress value={65} striped />
          </Example>
          <Example label="Striped + animated" style={{ justifyItems: "stretch" }}>
            <Progress value={65} animated />
          </Example>
        </div>
      ),
    },
  ],
  whenToUse: [
    "When completion is genuinely measurable (bytes uploaded, records processed, steps finished) and you can supply a truthful 0–100 value.",
    "To show position in a multi-step flow, deriving value from the step count so the bar moves exactly when the user does.",
  ],
  whenNotToUse: [
    "For waits of unknown duration. A bar that crawls to 90% and stalls teaches users to distrust every bar in your product. Use Loader, or Skeleton when the shape of the coming content is known.",
    'To display a static quantity such as storage used: role="progressbar" tells assistive tech a task is under way, which a measurement is not.',
  ],
  howItWorks: [
    {
      title: "Tell the truth",
      body: "The value must map to something real. Never animate a fake percentage to make a wait feel shorter: when the fiction stalls, the user notices, and the component loses its meaning for every future use. If you cannot measure progress, you do not have determinate progress; reach for Loader instead.",
    },
    {
      title: "Name what is progressing",
      body: "The bar exposes its value but not its subject. Pass aria-label (“Uploading photos”) or aria-labelledby pointing at a visible heading (both forward to the root), because “progressbar, 45%” on its own tells a screen-reader user nothing about what is at 45%. Sighted users need the same context: keep visible text near the bar.",
    },
    {
      title: "Stripes are decoration",
      body: "striped and animated add texture, not information, and the stripe animation is removed entirely under prefers-reduced-motion: reduce. Anything the stripes were saying must therefore also be said by the value and the surrounding text.",
    },
  ],
  accessibility: [
    'Renders role="progressbar" with aria-valuenow (rounded), aria-valuemin={0} and aria-valuemax={100}; the value is clamped, so an out-of-range number can never produce an invalid ARIA state.',
    "No accessible name is wired for you: pass aria-label or aria-labelledby naming the task; both are forwarded to the root element.",
    "The stripe animation and the fill transition are collapsed under prefers-reduced-motion: reduce by the library-wide reset, so motion never carries information.",
    "Under forced colors (Windows High Contrast) the fill paints with Highlight via forced-color-adjust: none and the track gains a CanvasText border, so the bar stays visible where background paint is normally stripped.",
    "The inline label only renders once the value reaches 8%, so the text never overflows a nearly-empty bar; if the number must always be readable, render it as text outside the bar as well.",
  ],
  props: [
    {
      name: "value",
      type: "number",
      default: "0",
      description: "Fill amount, 0–100 (clamped).",
    },
    {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      default: `"md"`,
      description: "Track thickness.",
    },
    {
      name: "striped",
      type: "boolean",
      description: "Overlay diagonal stripes on the filled bar.",
    },
    {
      name: "animated",
      type: "boolean",
      description: "Animate the stripes (implies striped).",
    },
    {
      name: "label",
      type: "boolean",
      description: "Render the percentage as text inside the bar.",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All native <div> props are forwarded.",
    },
  ],
  contextual: true,
};

export default doc;
