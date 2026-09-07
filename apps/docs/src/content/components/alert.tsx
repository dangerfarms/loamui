import { Alert, Button } from "@loamui/core";
import type { CSSProperties } from "react";
import type { ComponentContent } from "@/renderer/types";
import { AlertComposedDemo, AlertDismissibleDemo } from "./alert.client";

const doc: ComponentContent = {
  slug: "alert",
  lead: "A prominent message box whose status comes from its context.",
  importLine: `import { Alert, Button } from "@loamui/core";`,
  demos: [
    {
      title: "Contexts",
      description:
        "Alert has no colour or variant props. Declare --loam-context on a one-element wrapper region (a style query is answered by ancestors, never by the element that declares the property) and the status colours follow. See the Contextualism guide.",
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
        "--loam-context inherits, so an alert inside a region that already means something needs nothing of its own. Here the region declares danger once: the Alert and the Button beside it both answer it, and neither carries a prop.",
      code: `<div style={{ "--loam-context": "danger" }}>
  <Alert title="This workspace will be deleted">
    Everything in it is removed for every member.
  </Alert>
  <Button>Delete workspace</Button>
</div>`,
      render: () => (
        <div
          style={
            {
              "--loam-context": "danger",
              display: "grid",
              gap: "0.75rem",
              justifyItems: "start",
              inlineSize: "100%",
            } as CSSProperties
          }
        >
          <Alert title="This workspace will be deleted">
            Everything in it is removed for every member.
          </Alert>
          <Button>Delete workspace</Button>
        </div>
      ),
    },
    {
      title: "With icon",
      description: "Pass any node as the leading icon.",
      code: `<div style={{ "--loam-context": "info" }}>
  <Alert icon={<span aria-hidden>ℹ</span>} title="Did you know?">
    An alert takes its status from the --loam-context of the region around it.
  </Alert>
</div>`,
      render: () => (
        <div style={{ "--loam-context": "info", inlineSize: "100%" } as CSSProperties}>
          <Alert icon={<span aria-hidden>ℹ</span>} title="Did you know?">
            An alert takes its status from the --loam-context of the region around it.
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
    {
      title: "Dismissible",
      description:
        "onClose renders an Alert.Close, a LoamUI Button named Dismiss (or labels.close), at the inline end. The alert does not remove itself: the handler stops rendering it, because only you know whether acknowledging the message ends the condition it reports.",
      code: `const [open, setOpen] = useState(true);

{open && (
  <Alert title="Draft restored" onClose={() => setOpen(false)}>
    We recovered the draft you were editing.
  </Alert>
)}`,
      render: () => <AlertDismissibleDemo />,
    },
    {
      title: "Composed from parts",
      description:
        "The parts in the anatomy the convenience form renders. Alert.Title takes render where the title belongs in the page outline; Alert.Close takes labels for its name.",
      code: `<Alert.Root>
  <Alert.Icon><span aria-hidden>⚠</span></Alert.Icon>
  <Alert.Body>
    <Alert.Title render={<h2 />}>Storage almost full</Alert.Title>
    <Alert.Description>Free up space to keep syncing.</Alert.Description>
  </Alert.Body>
  <Alert.Close onClose={dismiss} labels={{ close: "Hide this warning" }} />
</Alert.Root>`,
      render: () => <AlertComposedDemo />,
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
      body: "There is no auto-dismiss: an alert exists exactly as long as the condition it reports. Remove it by no longer rendering it when the state changes: a warning that disappears on its own while the problem remains would be lying. Alert.Close is for the message the reader may acknowledge (a restored draft, a notice already read); it reports through onClose and leaves the removal to you, so a dismissed alert is a decision, not a timeout.",
    },
    {
      title: "Announcement happens at insertion",
      body: 'A live region announces only when content enters it; an alert rendered with the rest of the page is simply read in document order. So render the alert conditionally when the condition becomes true, never hidden-then-shown, and the announcement arrives exactly when the event does. Give it role="alert" when that event must interrupt; the default role="status" waits its turn.',
    },
  ],
  accessibility: [
    'Renders role="status" by default: a polite live region, which suits a message that is on the page when it loads or that reports a condition rather than an event.',
    'Pass role="alert" for a message that appears in response to an action and must interrupt: forwarded props are spread after the default, so your role wins and the announcement becomes assertive, read ahead of whatever else was queued.',
    "A banner already present at page load announces nothing (a live region only fires on insertion): for a post-redirect confirmation, either move keyboard focus to the alert on load, or treat it as a landmark instead: a wrapper with role=region and aria-labelledby pointing at the title.",
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
      name: "onClose",
      type: "() => void",
      description: "Renders an Alert.Close that calls this when activated.",
    },
    {
      name: "labels",
      type: "{ close?: string }",
      default: `{ close: "Dismiss" }`,
      description: "The close button's name, when onClose renders one.",
    },
    {
      name: "role",
      type: "string",
      default: `"status"`,
      description:
        'Live-region role. The polite default announces without interrupting; pass "alert" for a message that appears in response to an action and must interrupt.',
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All native <div> props are forwarded.",
    },
  ],
  parts: [
    {
      name: "Alert.Root",
      description:
        'The live region: a <div role="status"> carrying the class and the context; all native <div> props are forwarded, so role="alert" overrides the default.',
    },
    {
      name: "Alert.Icon",
      description:
        "The leading icon slot, rendered aria-hidden. Native <span> props are forwarded.",
    },
    {
      name: "Alert.Body",
      description:
        "The column holding the title and description. Native <div> props are forwarded.",
    },
    {
      name: "Alert.Title",
      description: "The bold heading, in the channel's hue mixed for contrast. A <div> by default.",
      props: [
        {
          name: "render",
          type: "RenderProp",
          description:
            "Substitute the element (render={<h2 />}) where the title belongs in the page outline; the class merges onto it.",
        },
      ],
    },
    {
      name: "Alert.Description",
      description:
        "The message: full-strength text, muted beside a title so the heading leads. Native <div> props are forwarded.",
    },
    {
      name: "Alert.Close",
      description:
        "A LoamUI Button at the inline end. Icon-only and named by labels.close unless given children; every Button prop is forwarded.",
      props: [
        {
          name: "onClose",
          type: "() => void",
          description: "Called when the button is activated; stop rendering the alert in it.",
        },
        {
          name: "labels",
          type: "{ close?: string }",
          default: `{ close: "Dismiss" }`,
          description: "The button's accessible name when it has no children.",
        },
      ],
    },
  ],
  contextual: true,
};

export default doc;
