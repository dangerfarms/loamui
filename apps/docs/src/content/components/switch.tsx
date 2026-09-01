import { Switch } from "@loamui/core";
import type { ComponentContent } from "@/renderer/types";
import { SwitchFieldDemo } from "./switch.client";

const doc: ComponentContent = {
  slug: "switch",
  lead: "An on/off toggle for a single setting that takes effect immediately.",
  importLine: `import { Field, Switch, SwitchControl } from "@loamui/core";`,
  demos: [
    {
      title: "Basic usage",
      code: `<Switch aria-label="Email notifications" />`,
      render: () => <Switch aria-label="Email notifications" />,
    },
    {
      title: "Checked",
      description: "The track fills with the primary colour when on.",
      code: `<Switch defaultChecked aria-label="Autosave" />`,
      render: () => <Switch defaultChecked aria-label="Autosave" />,
    },
    {
      title: "With label",
      code: `<Switch label="Enable notifications" defaultChecked />
<Switch label="Label on the left" labelPosition="start" />`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <Switch label="Enable notifications" defaultChecked />
          <Switch label="Label on the left" labelPosition="start" />
        </div>
      ),
    },
    {
      title: "Disabled",
      code: `<Switch label="Off & disabled" disabled />
<Switch label="On & disabled" defaultChecked disabled />`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <Switch label="Off & disabled" disabled />
          <Switch label="On & disabled" defaultChecked disabled />
        </div>
      ),
    },
    {
      title: "Composed inside a Field",
      description:
        "The bare SwitchControl self-wires from Field context: label association and description linking come from the Field, the same composition contract every form control shares.",
      code: `<Field.Root>
  <Field.Label>
    <SwitchControl defaultChecked /> Email notifications
  </Field.Label>
  <Field.Description>Sent at most once a day.</Field.Description>
</Field.Root>`,
      render: () => <SwitchFieldDemo />,
    },
  ],
  whenToUse: [
    "For an instant on/off setting that takes effect immediately, with no separate save step (notifications, dark mode).",
    "When the two states are clearly opposite and the control acts like a physical switch.",
  ],
  whenNotToUse: [
    'When the change only applies after submitting a form. Use a Checkbox instead: its ticked state reads as "will apply when I submit".',
    "For selecting among more than two states. Use Radio or Select.",
  ],
  howItWorks: [
    {
      title: "A switch acts now, a checkbox acts on submit",
      body: 'role="switch" announces on/off, and users expect flipping it to take effect immediately, like a light switch. Inside a form that applies changes on save, that expectation is a lie: use Checkbox, whose ticked state reads as “will apply when I submit”. The test is the presence of a save button: if there is one, it isn\'t a Switch.',
    },
    {
      title: "Label the affirmative",
      body: "The label names the thing that is on when the switch is on: “Email notifications”, never “Disable emails”. The control already says on or off, so a negated label makes on mean off. Keep the label constant across states; a label that rewrites itself when toggled leaves users unsure whether it describes the current state or the action.",
    },
  ],
  accessibility: [
    'Renders a native checkbox exposed with role="switch", so it is operable by keyboard and announced as on/off.',
    "The label is tied to the control; the whole row is clickable.",
    "In the rare case a switch needs an error message, wrap it in a Field.Root and add a Field.Error after the control: the message marks it invalid and is announced.",
    "State is conveyed by more than colour (the thumb position), so it remains clear in forced-colors and for colour-blind users.",
  ],
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "Label rendered beside the toggle.",
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Helper text rendered below the label row.",
    },
    {
      name: "labelPosition",
      type: `"start" | "end"`,
      default: `"end"`,
      description: "Which side of the toggle the label sits on.",
    },
    {
      name: "wrapperClassName",
      type: "string",
      description: "Class for the label-row wrapper element (the input keeps className).",
    },
    {
      name: "...others",
      type: "InputHTMLAttributes",
      description: 'All native <input type="checkbox"> props (except type and size) are forwarded.',
    },
  ],
  parts: [
    {
      name: "SwitchControl",
      description:
        "The bare toggle without a label, for composing inside a Field where the label lives on Field.Label. It reads its wiring (id, aria-describedby, aria-invalid) from the field context, and takes the same props as Switch minus label, description, labelPosition and wrapperClassName.",
    },
  ],
};

export default doc;
