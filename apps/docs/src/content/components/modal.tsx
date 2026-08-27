import type { ComponentContent } from "@/renderer/types";
import { ModalAlertDemo, ModalDemo, ModalHeaderCloseDemo, ModalSizesDemo } from "./modal.client";

const doc: ComponentContent = {
  slug: "modal",
  lead: "A blocking dialog for must-complete tasks, built on the native <dialog> element and the browser's top layer.",
  importLine: `import { Modal } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      description:
        "Compose the dialog from parts. The Popup is a native <dialog> opened with showModal(): top layer, backdrop, focus containment, Escape and focus restore all come from the browser.",
      code: `<Modal.Root>
  <Modal.Trigger>Invite a teammate</Modal.Trigger>
  <Modal.Popup>
    <Modal.Title>Invite a teammate</Modal.Title>
    <Modal.Description>
      They'll receive an email invitation to join your workspace.
    </Modal.Description>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--fui-space-sm)", alignItems: "center" }}>
      <span style={{ "--fui-context": "primary" }}>
        <Modal.Close>Send invite</Modal.Close>
      </span>
      <Modal.Close>Cancel</Modal.Close>
    </div>
  </Modal.Popup>
</Modal.Root>`,
      render: () => <ModalDemo />,
    },
    {
      title: "Alert dialog (confirmation)",
      description:
        'alert renders role="alertdialog": the backdrop doesn\'t light-dismiss (closedby="closerequest"; Escape still works), and autoFocus belongs on the least-destructive action so it is the default answer. Use for destructive or irreversible confirmations only.',
      code: `<Modal.Root>
  <span style={{ "--fui-context": "danger" }}>
    <Modal.Trigger>Delete file</Modal.Trigger>
  </span>
  <Modal.Popup alert size="sm">
    <Modal.Title>Delete this file?</Modal.Title>
    <Modal.Description>
      "report-final-v2.pdf" will be permanently deleted. This cannot be undone.
    </Modal.Description>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--fui-space-sm)", alignItems: "center" }}>
      <Modal.Close autoFocus>Cancel</Modal.Close>
      <span style={{ "--fui-context": "danger" }}>
        <Modal.Close>Delete</Modal.Close>
      </span>
    </div>
  </Modal.Popup>
</Modal.Root>`,
      render: () => <ModalAlertDemo />,
    },
    {
      title: "Sizes",
      description: "Panel widths via the Popup's size prop.",
      code: `<Modal.Popup size="sm">…</Modal.Popup>
<Modal.Popup size="md">…</Modal.Popup>
<Modal.Popup size="lg">…</Modal.Popup>`,
      render: () => <ModalSizesDemo />,
    },
    {
      title: "Header with a close button",
      description:
        "A header row with an × is a composition pattern, not configuration: compose Modal.Title and Modal.Close however your design needs.",
      code: `<Modal.Root>
  <Modal.Trigger>Open settings</Modal.Trigger>
  <Modal.Popup>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Modal.Title style={{ margin: 0 }}>Settings</Modal.Title>
      <Modal.Close aria-label="Close">×</Modal.Close>
    </div>
    <Modal.Description>Manage your workspace settings.</Modal.Description>
  </Modal.Popup>
</Modal.Root>`,
      render: () => <ModalHeaderCloseDemo />,
    },
  ],
  whenToUse: [
    "For blocking, must-complete tasks (confirmations of destructive actions, short focused forms) where the user should not interact with the page behind.",
    "When losing the in-progress state would be costly, and the dialog protects it.",
  ],
  whenNotToUse: [
    "For supplementary content or quick actions that don't need to block, use Popover.",
    "For anything long-form or multi-step, navigate to a page instead and keep the interaction in the page flow.",
    "For non-essential announcements, use Alert in the page.",
  ],
  howItWorks: [
    {
      title: "Destructive confirmations use the alert variant",
      body: 'The alert prop on Modal.Popup renders role="alertdialog" and sets closedby="closerequest": the backdrop stops light-dismissing, so a stray click cannot answer a destructive question; only an explicit choice or Escape closes it. Reserve it for decisions with consequences; an ordinary modal should stay casually dismissible.',
    },
    {
      title: "Focus is the browser's to manage",
      body: "showModal() moves focus into the dialog, contains it, and returns it to the trigger on close. Add autoFocus only when the dialog's task starts at a specific control, such as a name field in a rename dialog. Anything else fights behaviour screen-reader users rely on.",
    },
    {
      title: "A modal is one task",
      body: "If the content scrolls, needs sections, or asks more than one question, it has outgrown the dialog: make it a page. The dialog's value is that everything needed for the decision is visible at once.",
    },
    {
      title: "Always render a Title",
      body: 'Modal.Title labels the dialog via aria-labelledby; it is what screen readers announce on open. A dialog without one is announced as, at best, "dialog": the user hears that something opened but not what it wants.',
    },
  ],
  accessibility: [
    "Built on the native <dialog> opened with showModal(): the browser provides the top layer, ::backdrop, real focus containment, Escape handling, and restores focus to the trigger on close. None of it re-implemented in JavaScript.",
    "Modal.Title and Modal.Description automatically label and describe the dialog via aria-labelledby / aria-describedby.",
    "Light dismiss (clicking the backdrop) uses the closedby attribute where supported, with a small feature-detected coordinate-check fallback elsewhere: no polyfills, per the browser support policy.",
    "Body scroll is locked while open.",
  ],
  parts: [
    {
      name: "Modal.Root",
      description:
        "Groups the parts and owns the open state (controlled or uncontrolled). Renders no element of its own.",
      props: [
        { name: "open", type: "boolean", description: "Controlled open state." },
        {
          name: "defaultOpen",
          type: "boolean",
          default: "false",
          description: "Initial open state when uncontrolled.",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          description: "Called whenever the open state should change.",
        },
      ],
    },
    {
      name: "Modal.Trigger",
      description:
        "A FarmUI Button that opens the dialog; all native <button> props are forwarded.",
      props: [
        {
          name: "render",
          type: "element | (props) => node",
          description:
            "Substitute your own element as the trigger; it receives the invoker wiring.",
        },
      ],
    },
    {
      name: "Modal.Popup",
      description:
        "The native <dialog>, opened with showModal(); all native <dialog> props are forwarded.",
      props: [
        {
          name: "size",
          type: `"sm" | "md" | "lg"`,
          default: `"md"`,
          description: "Panel width (24/32/44rem).",
        },
        {
          name: "alert",
          type: "boolean",
          default: "false",
          description:
            'Renders role="alertdialog" with no light dismiss (Escape still closes), for destructive confirmations.',
        },
      ],
    },
    {
      name: "Modal.Title",
      description:
        "The dialog's heading (an <h2>), wired to the dialog via aria-labelledby; native heading props are forwarded.",
    },
    {
      name: "Modal.Description",
      description:
        "Supporting text, wired to the dialog via aria-describedby; native <p> props are forwarded.",
    },
    {
      name: "Modal.Close",
      description:
        "A FarmUI Button that closes the dialog; compose as many as you need (confirm, cancel, ×). Native <button> props are forwarded.",
      props: [
        {
          name: "render",
          type: "element | (props) => node",
          description: "Substitute your own element; it receives the close wiring.",
        },
      ],
    },
  ],
};

export default doc;
