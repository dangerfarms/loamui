"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { Avatar, Badge, Button, Field, Input, Switch } from "@loamui/core";
import classes from "./home.module.css";

export function InstallSnippet() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("pnpm add @loamui/core");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <div className={classes.install}>
      <span className={classes.installPrompt}>$</span>
      <span>pnpm add @loamui/core</span>
      <button className={classes.installCopy} onClick={copy} type="button">
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

/** Interactive "settings" card that shows real LoamUI components in the hero. */
export function HeroShowcase() {
  const [notify, setNotify] = useState(true);
  const [name, setName] = useState("jamie@acme.com");

  return (
    <div className={classes.showcaseCard}>
      <div className={classes.showcaseHead}>
        <Avatar name="Jamie Rivera" />
        <div>
          <div className={classes.showcaseName}>Jamie Rivera</div>
          <div className={classes.showcaseHandle}>Product designer</div>
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
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Field.Root>

      <div className={classes.showcaseRow}>
        <Switch
          label="Email notifications"
          labelPosition="start"
          wrapperClassName={classes.showcaseSwitch}
          checked={notify}
          onChange={(e) => setNotify(e.currentTarget.checked)}
        />
      </div>
      <div className={classes.showcaseRow}>
        <span className={classes.showcaseLabel}>Notifications</span>
        <span
          style={
            {
              "--loam-context": notify ? "primary" : undefined,
            } as CSSProperties
          }
        >
          <Badge dot>{notify ? "Notifications on" : "Muted"}</Badge>
        </span>
      </div>

      <div style={{ display: "flex", gap: "0.6rem", marginBlockStart: "0.25rem" }}>
        <Button>Save changes</Button>
        <Button>Cancel</Button>
      </div>
    </div>
  );
}
