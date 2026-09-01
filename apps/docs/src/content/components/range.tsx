import { Range } from "@loamui/core";
import type { ComponentContent } from "@/renderer/types";
import { RangeDisabledDemo, RangeFieldDemo, RangeStepsDemo, RangeValueDemo } from "./range.client";

const doc: ComponentContent = {
  slug: "range",
  lead: "Pick a numeric value from a continuous range. Compose it inside a Field for its label, description and error.",
  importLine: `import { Field, Range } from "@loamui/core";`,
  demos: [
    {
      title: "Basic usage",
      description:
        "Rendered bare, the control needs an aria-label; a Field.Label (below) is the usual way to name it.",
      code: `<Range defaultValue={40} aria-label="Value" />`,
      render: () => (
        <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
          <Range defaultValue={40} aria-label="Value" />
        </div>
      ),
    },
    {
      title: "Labelled inside a Field",
      description:
        "Wrap the control in Field.Root: it reads its id, description and error wiring from the field, the composition pattern shared by all form controls.",
      code: `<Field.Root>
  <Field.Label>Volume</Field.Label>
  <Field.Description>Applies to alerts only.</Field.Description>
  <Range defaultValue={70} />
</Field.Root>`,
      render: () => <RangeFieldDemo />,
    },
    {
      title: "Steps",
      description: "Snap to increments with the step prop.",
      code: `<Field.Root>
  <Field.Label>Fertiliser (kg)</Field.Label>
  <Range min={0} max={100} step={10} defaultValue={30} />
</Field.Root>`,
      render: () => <RangeStepsDemo />,
    },
    {
      title: "Disabled",
      code: `<Field.Root>
  <Field.Label>Locked</Field.Label>
  <Range defaultValue={50} disabled />
</Field.Root>`,
      render: () => <RangeDisabledDemo />,
    },
  ],
  whenToUse: [
    "For imprecise, pick-a-feel values where the position matters more than the exact number: volume, brightness, intensity.",
    "When the effect of the value is visible as it changes, so users steer by the result rather than the figure.",
  ],
  whenNotToUse: [
    'For exact numbers the user already knows (a quantity, an amount, a year). Use Input with inputMode="numeric" or "decimal"; landing on one precise value on a track is slow and error-prone, especially on touch.',
    "For choosing among a few discrete options. Use RadioGroup, where every option is visible and labelled.",
  ],
  howItWorks: [
    {
      title: "Show the current value",
      body: "A track communicates roughly where you are, never what you chose, so render the number where the user can see it. Field.Label accepts any content and the control is stateless, so drive it with value and onChange and put the live value in the label.",
      code: `const [volume, setVolume] = useState(70);

<Field.Root>
  <Field.Label>Volume: {volume}</Field.Label>
  <Range
    value={volume}
    onChange={(e) => setVolume(e.target.valueAsNumber)}
  />
</Field.Root>`,
      render: () => <RangeValueDemo />,
    },
    {
      title: "Steps match the precision users care about",
      body: "step sets the smallest move a user can make, so match it to differences that actually matter: nobody sets fertiliser to 43 kg. A coarser step makes every reachable value a bigger target: easier with arrow keys, a mouse, or a thumb. If users need finer precision than a comfortable step allows, the value is exact and belongs in an Input.",
    },
  ],
  accessibility: [
    'Renders a native <input type="range">: arrow keys adjust the value and Home/End jump to the ends, with the current value announced. There is no custom key handling to maintain.',
    "Always give it an accessible name: a Field.Label in the surrounding Field.Root, or an aria-label when rendering it bare.",
    "Assistive tech hears the value change as it moves; sighted users have no equivalent unless you render the value visibly (see above).",
  ],
  props: [
    {
      name: "min",
      type: "number",
      default: "0",
      description: "Minimum value.",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Maximum value.",
    },
    {
      name: "step",
      type: "number",
      default: "1",
      description: "Increment between valid values.",
    },
    {
      name: "defaultValue",
      type: "number",
      description: "Initial value for uncontrolled usage.",
    },
    {
      name: "...others",
      type: "InputHTMLAttributes",
      description: 'All native <input type="range"> props are forwarded.',
    },
  ],
};

export default doc;
