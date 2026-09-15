"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { Avatar, Badge, Button, Checkbox, Field, Input } from "@loamui/core";
import "./home.css";

/** Interactive "settings" card that shows real LoamUI components in the hero. */
export function HeroShowcase() {
  const [notify, setNotify] = useState(true);
  const [name, setName] = useState("jamie@acme.com");
  const [saved, setSaved] = useState({ name: "jamie@acme.com", notify: true });
  const [message, setMessage] = useState("");

  return (
    <form
      className="showcaseCard"
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
      <div className="showcaseHead">
        <Avatar name="Jamie Rivera" />
        <div>
          <div className="showcaseName">Jamie Rivera</div>
          <div className="showcaseHandle">Product designer</div>
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
      </div>

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

      <div className="showcaseRow">
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
      <div className="showcaseRow">
        <span className="showcaseLabel">Notifications</span>
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

      <div className="showcaseActions">
        <Button type="submit">Save changes</Button>
        <Button type="reset">Cancel</Button>
      </div>
      <p className="showcaseNote">Try the controls. Changes stay on this page.</p>
      <p className="showcaseStatus" role="status">
        {message}
      </p>
    </form>
  );
}
