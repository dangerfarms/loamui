import { Alert } from "@loamui/core";
import type { CSSProperties } from "react";
import type { ComponentContent } from "@/renderer/types";

const doc: ComponentContent = {
  slug: "alert",
  lead: "A prominent message box whose status comes from its context.",
  importLine: `import { Alert } from "@loamui/core";`,
  demos: [
    {
      title: "Contexts",
      description:
        "Alert has no color or variant props. Declare --loam-context on a one-element wrapper region (a style query is answered by ancestors, never by the element that declares the property) and the status colours follow. See the Contextualism guide.",
      code: `<div style={{ "--loam-context": "info" }}>
  <Alert title="Heads up">A new version is available.</Alert>
</div>
<div style={{ "--loam-context": "success" }}>
  <Alert title="Saved">Your changes have been stored.</Alert>
</div>
<div style={{ "--loam-context": "warning" }}>
  <Alert title="Low storage">Only 5% of your quota remains.</Alert>
</div>
<div style={{ "--loam-context": "danger" }}>
  <Alert title="Deploy failed">Check the build logs.</Alert>
</div>`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem", inlineSize: "100%" }}>
          <div style={{ "--loam-context": "info" } as CSSProperties}>
            <Alert title="Heads up">A new version is available.</Alert>
          </div>
          <div style={{ "--loam-context": "success" } as CSSProperties}>
            <Alert title="Saved">Your changes have been stored.</Alert>
          </div>
          <div style={{ "--loam-context": "warning" } as CSSProperties}>
            <Alert title="Low storage">Only 5% of your quota remains.</Alert>
          </div>
          <div style={{ "--loam-context": "danger" } as CSSProperties}>
            <Alert title="Deploy failed">Check the build logs.</Alert>
          </div>
        </div>
      ),
    },
    {
      title: "Inherited from a region",
      description:
        "--loam-context inherits, so an alert inside a region that already declares its meaning needs nothing of its own: the nearest ancestor that sets the property wins.",
      code: `<div style={{ "--loam-context": "warning" }}>
  <Alert title="Scheduled maintenance tonight." />
</div>`,
      render: () => (
        <div
          style={
            {
              "--loam-context": "warning",
              inlineSize: "100%",
            } as CSSProperties
          }
        >
          <Alert title="Scheduled maintenance tonight." />
        </div>
      ),
    },
    {
      title: "With icon",
      description: "Pass any node as the leading icon.",
      code: `<div style={{ "--loam-context": "info" }}>
  <Alert icon={<span aria-hidden>ℹ</span>} title="Did you know?">
    You can theme every alert with a single CSS variable.
  </Alert>
</div>`,
      render: () => (
        <div style={{ "--loam-context": "info", inlineSize: "100%" } as CSSProperties}>
          <Alert icon={<span aria-hidden>ℹ</span>} title="Did you know?">
            You can theme every alert with a single CSS variable.
          </Alert>
        </div>
      ),
    },
    {
      title: "Title only",
      description: "Body content is optional.",
      code: `<div style={{ "--loam-context": "success" }}>
  <Alert title="All systems operational." />
</div>`,
      render: () => (
        <div style={{ "--loam-context": "success", inlineSize: "100%" } as CSSProperties}>
          <Alert title="All systems operational." />
        </div>
      ),
    },
  ],
  whenToUse: [
    "For in-page status the user needs to act on or know about now (a failed deploy, a quota about to run out), placed next to the content it describes.",
    "When the message must stay on screen: alerts never auto-dismiss, so the information survives until the state it reports changes and you remove it.",
  ],
  whenNotToUse: [
    "For transient confirmations that need no follow-up (“Saved”, “Copied”). Use Toast; an alert that lingers after the moment has passed becomes noise.",
    "For an error tied to a single form field. Use Field.Error, which wires aria-describedby and aria-invalid to the control the error belongs to.",
  ],
  howItWorks: [
    {
      title: "Render it when it happens",
      body: "An alert reports the current state of the page the user is on. Information they could act on some other time belongs in ordinary content; a confirmation that expires in seconds belongs in a Toast. Reserving Alert for “this matters here, now” is what keeps it noticeable when it appears.",
    },
    {
      title: "Persistent by design",
      body: "There is no auto-dismiss and no built-in close button: an alert exists exactly as long as the condition it reports. Remove it by no longer rendering it when the state changes: a warning that disappears on its own while the problem remains would be lying.",
    },
    {
      title: "Announcement happens at insertion",
      body: 'role="alert" only interrupts when the element enters the DOM; an alert rendered with the rest of the page is simply read in document order. So render the alert conditionally when the condition becomes true, never hidden-then-shown, and the announcement arrives exactly when the event does.',
    },
  ],
  accessibility: [
    "A banner already present at page load announces nothing (role=alert only fires on insertion): for a post-redirect confirmation, either move keyboard focus to the alert on load, or treat it as a landmark instead: a wrapper with role=region and aria-labelledby pointing at the title.",
    'Renders role="alert" (an assertive live region), so an alert inserted in response to an event is announced immediately by screen readers, ahead of whatever else was queued.',
    'For dynamic messages that are not urgent, pass role="status": forwarded props are spread after the default, so your role wins and the announcement becomes polite instead of interrupting.',
    "The status colour is never announced: write the title so the meaning survives in words (“Deploy failed”, not “Error” on a red tint); the border and tint are visual-only.",
    "The icon slot is rendered aria-hidden. Icons are decoration here, so any meaning they carry must also be in the text.",
    "Title text is not the raw status colour: it is mixed toward black (light scheme) or white (dark) so it keeps AA contrast on the tint even for light channels like warning; only the decorative icon carries the raw channel (the border is a softer tint of it).",
  ],
  props: [
    {
      name: "title",
      type: "ReactNode",
      description: "Bold heading rendered above the body.",
    },
    {
      name: "icon",
      type: "ReactNode",
      description: "Icon rendered to the inline-start of the content.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Alert body content.",
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
