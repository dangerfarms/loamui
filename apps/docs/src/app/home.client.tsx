"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { Avatar, Badge, Button, Card, Checkbox, Field, Input, Select } from "@loamui/core";
import "./home-demo.css";

/** Interactive "settings" card that shows real LoamUI components in the hero. */
export function HeroShowcase() {
  const [notify, setNotify] = useState(true);
  const [name, setName] = useState("jamie@acme.com");
  const [saved, setSaved] = useState({ name: "jamie@acme.com", notify: true });
  const [message, setMessage] = useState("");

  return (
    <Card>
      <form
        className="site-SettingsDemo"
        aria-label="Demo account settings"
        onSubmit={(event) => {
          event.preventDefault();
          setSaved({ name, notify });
          setMessage("Changes saved for this demo.");
        }}
        onReset={(event) => {
          event.preventDefault();
          setName(saved.name);
          setNotify(saved.notify);
          setMessage("Unsaved changes discarded.");
        }}
      >
        <header>
          <Avatar name="Jamie Rivera" />
          <div>
            <strong>Jamie Rivera</strong>
            <small>Product designer</small>
          </div>
          <div
            style={
              {
                marginInlineStart: "auto",
                "--loam-context": "primary",
              } as CSSProperties
            }
          >
            <Badge>Pro</Badge>
          </div>
        </header>

        <Field.Root>
          <Field.Label>Work email</Field.Label>
          <Input
            name="email"
            type="email"
            required
            value={name}
            onChange={(event) => {
              setName(event.currentTarget.value);
              setMessage("");
            }}
          />
        </Field.Root>

        <div className="row">
          <Checkbox
            label="Email notifications"
            name="notifications"
            checked={notify}
            onChange={(event) => {
              setNotify(event.currentTarget.checked);
              setMessage("");
            }}
          />
        </div>
        <div className="row">
          <span className="label">Notifications</span>
          <span
            style={
              {
                "--loam-context": saved.notify ? "primary" : undefined,
              } as CSSProperties
            }
          >
            <Badge>
              <Badge.Dot />
              {saved.notify ? "Notifications on" : "Muted"}
            </Badge>
          </span>
        </div>

        <footer>
          <Button type="submit">Save changes</Button>
          <Button type="reset">Cancel</Button>
        </footer>
        <p className="note">Try the controls. Changes stay on this page.</p>
        <p role="status">{message}</p>
      </form>
    </Card>
  );
}

export function ContextShowcase() {
  const [context, setContext] = useState("primary");
  return (
    <div className="site-ContextDemo">
      <Field.Root>
        <Field.Label>Region context</Field.Label>
        <Select value={context} onChange={(event) => setContext(event.currentTarget.value)}>
          <option value="primary">Neutral</option>
          <option value="success">Success</option>
          <option value="danger">Danger</option>
        </Select>
      </Field.Root>
      <div style={{ "--loam-context": context } as CSSProperties}>
        <Card>
          <div className="site-ContextSample">
            <Badge>Context preview</Badge>
            <p>Native elements and composed controls share the same tokens.</p>
            <Checkbox label="Example selection" defaultChecked />
            <a href="/docs/contextualism">Read about this context</a>
          </div>
        </Card>
      </div>
      <code aria-live="polite">{`--loam-context: ${context};`}</code>
    </div>
  );
}
