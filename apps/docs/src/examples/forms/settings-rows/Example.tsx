"use client";

import { Checkbox, Field, Fieldset, Select, Switch } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Fieldset.Root className="settings-rows">
      <Fieldset.Legend>Notifications</Fieldset.Legend>
      <div className="rows">
        <Field.Root>
          <div className="row">
            <div className="text">
              <Field.Label>Order updates</Field.Label>
              <Field.Description>
                An email when an order is packed and again when it is posted.
              </Field.Description>
            </div>
            <div className="control">
              <Switch.Control name="orderUpdates" defaultChecked />
            </div>
          </div>
        </Field.Root>
        <Field.Root>
          <div className="row">
            <div className="text">
              <Field.Label>Sowing reminders</Field.Label>
              <Field.Description>
                What to sow this month, for the seed you have bought.
              </Field.Description>
            </div>
            <div className="control">
              <Select name="reminders" defaultValue="monthly">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="never">Never</option>
              </Select>
            </div>
          </div>
        </Field.Root>
        <Field.Root>
          <div className="row">
            <div className="text">
              <Field.Label>Seasonal newsletter</Field.Label>
              <Field.Description>News from the co-op, four times a year.</Field.Description>
            </div>
            <div className="control">
              <Checkbox.Control name="newsletter" />
            </div>
          </div>
        </Field.Root>
        <Field.Root>
          <div className="row">
            <div className="text">
              <Field.Label>Text message alerts</Field.Label>
              <Field.Description>A text when a courier is on the way.</Field.Description>
            </div>
            <div className="control">
              <Switch.Control name="textAlerts" defaultChecked />
            </div>
            <Field.Error>Add a mobile number to your account before turning this on</Field.Error>
          </div>
        </Field.Root>
      </div>
    </Fieldset.Root>
  );
}
