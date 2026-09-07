"use client";

import { Fieldset, Radio, Select, SwitchControl } from "@loamui/core";
import { SettingRow } from "@loamui/ui";
import type { Composition } from "./types";

const settingRow: Composition = {
  slug: "setting-row",
  name: "Setting row",
  category: "Forms",
  description: "A label, a line explaining it, and the control that sets it, in one row.",
  lead: "One preference per row, wired by core Field: the label is the control's real label, so clicking the words flips the switch, and the description is joined to the control with aria-describedby, so a screen reader hears the explanation before deciding. The Field's parts keep their own look; the row only places them, the words at the inline start and the control at the inline end, so a column of rows lines up. A group of rows is a core Fieldset with a legend.",
  importLine: `import { SettingRow } from "@loamui/ui";`,
  parts: [
    {
      name: "SettingRow.Root",
      description:
        "The row: a two-column grid inside a core Field.Root, which wires the parts. id, when given, is the control's id and the base of the Label's (<id>-label), the Description's (<id>-description) and the Error's (<id>-error); give one when a fieldset in the control slot must point at the words.",
    },
    {
      name: "SettingRow.Text",
      description:
        "The words, in a column at the inline start: the Label over the Description. The control centres on the pair.",
    },
    {
      name: "SettingRow.Label",
      description:
        "Core Field.Label, untouched: the control's real label, so its words are a click target and the control's accessible name. When the control is a fieldset, which a label cannot name, pass render={<span />}: the same words on a span with the Label's id and no for, for the fieldset's aria-labelledby.",
    },
    {
      name: "SettingRow.Description",
      description:
        "Core Field.Description, untouched: the line under the label, joined to the control with aria-describedby. Leave it out and the label centres on the control alone.",
    },
    {
      name: "SettingRow.Control",
      description:
        "The slot at the inline end for the control: a bare SwitchControl, a Select, a CheckboxControl, which read their id and description from the row's Field on their own; or a Fieldset of radios, which you point at the Label and Description by id. Put nothing else here.",
    },
    {
      name: "SettingRow.Error",
      description:
        "Core Field.Error in a slot under the words, for when the setting could not be saved. It marks the control invalid, joins the message to it and announces it; without content it renders nothing.",
    },
  ],
  demos: [
    {
      title: "Notifications",
      description:
        "Three rows under a Fieldset legend, so the group has a name and each switch has its own. Click a label: the switch it names toggles, and only that switch, because the row itself is not a click target, only the label is.",
      code: `<Fieldset.Root>
  <Fieldset.Legend>Notifications</Fieldset.Legend>
  <SettingRow.Root>
    <SettingRow.Text>
      <SettingRow.Label>Email digest</SettingRow.Label>
      <SettingRow.Description>A summary of activity every Monday morning.</SettingRow.Description>
    </SettingRow.Text>
    <SettingRow.Control>
      <SwitchControl name="digest" defaultChecked />
    </SettingRow.Control>
  </SettingRow.Root>
  <SettingRow.Root>
    <SettingRow.Text>
      <SettingRow.Label>Mentions</SettingRow.Label>
      <SettingRow.Description>When someone names you in a comment.</SettingRow.Description>
    </SettingRow.Text>
    <SettingRow.Control>
      <SwitchControl name="mentions" defaultChecked />
    </SettingRow.Control>
  </SettingRow.Root>
  <SettingRow.Root>
    <SettingRow.Text>
      <SettingRow.Label>Product news</SettingRow.Label>
      <SettingRow.Description>New features and changes, at most once a month.</SettingRow.Description>
    </SettingRow.Text>
    <SettingRow.Control>
      <SwitchControl name="news" />
    </SettingRow.Control>
  </SettingRow.Root>
</Fieldset.Root>`,
      render: () => (
        <Fieldset.Root>
          <Fieldset.Legend>Notifications</Fieldset.Legend>
          <SettingRow.Root>
            <SettingRow.Text>
              <SettingRow.Label>Email digest</SettingRow.Label>
              <SettingRow.Description>
                A summary of activity every Monday morning.
              </SettingRow.Description>
            </SettingRow.Text>
            <SettingRow.Control>
              <SwitchControl name="digest" defaultChecked />
            </SettingRow.Control>
          </SettingRow.Root>
          <SettingRow.Root>
            <SettingRow.Text>
              <SettingRow.Label>Mentions</SettingRow.Label>
              <SettingRow.Description>When someone names you in a comment.</SettingRow.Description>
            </SettingRow.Text>
            <SettingRow.Control>
              <SwitchControl name="mentions" defaultChecked />
            </SettingRow.Control>
          </SettingRow.Root>
          <SettingRow.Root>
            <SettingRow.Text>
              <SettingRow.Label>Product news</SettingRow.Label>
              <SettingRow.Description>
                New features and changes, at most once a month.
              </SettingRow.Description>
            </SettingRow.Text>
            <SettingRow.Control>
              <SwitchControl name="news" />
            </SettingRow.Control>
          </SettingRow.Root>
        </Fieldset.Root>
      ),
    },
    {
      title: "One setting",
      description:
        "A row on its own, no group around it. The unit stands alone: a single preference in a card or at the foot of a page needs no legend.",
      code: `<SettingRow.Root>
  <SettingRow.Text>
    <SettingRow.Label>Two-step sign-in</SettingRow.Label>
    <SettingRow.Description>Ask for a code from your phone as well as your password.</SettingRow.Description>
  </SettingRow.Text>
  <SettingRow.Control>
    <SwitchControl name="two-step" />
  </SettingRow.Control>
</SettingRow.Root>`,
      render: () => (
        <SettingRow.Root>
          <SettingRow.Text>
            <SettingRow.Label>Two-step sign-in</SettingRow.Label>
            <SettingRow.Description>
              Ask for a code from your phone as well as your password.
            </SettingRow.Description>
          </SettingRow.Text>
          <SettingRow.Control>
            <SwitchControl name="two-step" />
          </SettingRow.Control>
        </SettingRow.Root>
      ),
    },
    {
      title: "A different control",
      description:
        "The slot takes any bare core control. A Select here is labelled and described exactly as the switches are, because the wiring is Field's, not the switch's.",
      code: `<SettingRow.Root>
  <SettingRow.Text>
    <SettingRow.Label>Theme</SettingRow.Label>
    <SettingRow.Description>Follow the system, or pick one.</SettingRow.Description>
  </SettingRow.Text>
  <SettingRow.Control>
    <Select name="theme" defaultValue="system">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </Select>
  </SettingRow.Control>
</SettingRow.Root>`,
      render: () => (
        <SettingRow.Root>
          <SettingRow.Text>
            <SettingRow.Label>Theme</SettingRow.Label>
            <SettingRow.Description>Follow the system, or pick one.</SettingRow.Description>
          </SettingRow.Text>
          <SettingRow.Control>
            <Select name="theme" defaultValue="system">
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Select>
          </SettingRow.Control>
        </SettingRow.Root>
      ),
    },
    {
      title: "A group of radios",
      description:
        "A control that is itself a fieldset. A label cannot name a group, so the Label is rendered as a span with render={<span />}: it keeps the Label's id and drops the for, and the Fieldset names itself by it with aria-labelledby and takes the Description with aria-describedby. The Root's id fixes those ids. The radios are core Radio with their own labels; the legend is the row's words, not a second one inside the group.",
      code: `<SettingRow.Root id="density">
  <SettingRow.Text>
    <SettingRow.Label render={<span />}>Density</SettingRow.Label>
    <SettingRow.Description>How much fits on a screen.</SettingRow.Description>
  </SettingRow.Text>
  <SettingRow.Control>
    <Fieldset.Root
      role="radiogroup"
      aria-labelledby="density-label"
      aria-describedby="density-description"
    >
      <Radio name="density" value="comfortable" label="Comfortable" defaultChecked />
      <Radio name="density" value="compact" label="Compact" />
    </Fieldset.Root>
  </SettingRow.Control>
</SettingRow.Root>`,
      render: () => (
        <SettingRow.Root id="density">
          <SettingRow.Text>
            <SettingRow.Label render={<span />}>Density</SettingRow.Label>
            <SettingRow.Description>How much fits on a screen.</SettingRow.Description>
          </SettingRow.Text>
          <SettingRow.Control>
            <Fieldset.Root
              role="radiogroup"
              aria-labelledby="density-label"
              aria-describedby="density-description"
            >
              <Radio name="density" value="comfortable" label="Comfortable" defaultChecked />
              <Radio name="density" value="compact" label="Compact" />
            </Fieldset.Root>
          </SettingRow.Control>
        </SettingRow.Root>
      ),
    },
    {
      title: "When a setting could not be saved",
      description:
        'A setting that acts on its own can still fail: the switch was flipped and the server said no. The Error is core Field.Error in a slot under the words, so it says what happened and what to do in the words of the setting ("Add a phone number before turning this on"), marks the control invalid and is announced. The control keeps the state the visitor chose; nothing is silently flipped back.',
      code: `<SettingRow.Root>
  <SettingRow.Text>
    <SettingRow.Label>Two-step sign-in</SettingRow.Label>
    <SettingRow.Description>Ask for a code from your phone as well as your password.</SettingRow.Description>
  </SettingRow.Text>
  <SettingRow.Control>
    <SwitchControl name="two-step" defaultChecked />
  </SettingRow.Control>
  <SettingRow.Error>Add a phone number before turning this on</SettingRow.Error>
</SettingRow.Root>`,
      render: () => (
        <SettingRow.Root>
          <SettingRow.Text>
            <SettingRow.Label>Two-step sign-in</SettingRow.Label>
            <SettingRow.Description>
              Ask for a code from your phone as well as your password.
            </SettingRow.Description>
          </SettingRow.Text>
          <SettingRow.Control>
            <SwitchControl name="two-step" defaultChecked />
          </SettingRow.Control>
          <SettingRow.Error>Add a phone number before turning this on</SettingRow.Error>
        </SettingRow.Root>
      ),
    },
  ],
  whenToUse: [
    "A preferences page: each row is one setting that takes effect on its own, usually a switch, and the words beside it are the reason to flip it.",
    "Anywhere a control needs a sentence of explanation and not just a name: a bare Switch carries a label, but the description and the end-aligned control are what make a column of them scan.",
  ],
  whenNotToUse: [
    "A form the person fills in and submits: that is a stack of Fields with a submit action, the shape of ContactForm, not a column of rows that each act on their own.",
    "A single checkbox with a short label and nothing to explain, like agreeing to terms: a core Checkbox with its inline label is enough, and a row would only add a rule and a gap.",
  ],
};

export default settingRow;
