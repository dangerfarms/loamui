"use client";

import { Modal } from "@loamui/core";
import type { CSSProperties } from "react";

export function ModalDemo() {
  return (
    <Modal.Root>
      <Modal.Trigger>Invite a teammate</Modal.Trigger>
      <Modal.Popup>
        <Modal.Title>Invite a teammate</Modal.Title>
        <Modal.Description>
          They&apos;ll receive an email invitation to join your workspace.
        </Modal.Description>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--loam-space-sm)",
            alignItems: "center",
          }}
        >
          <span style={{ "--loam-context": "primary" } as CSSProperties}>
            <Modal.Close>Send invite</Modal.Close>
          </span>
          <Modal.Close>Cancel</Modal.Close>
        </div>
      </Modal.Popup>
    </Modal.Root>
  );
}

export function ModalAlertDemo() {
  return (
    <Modal.Root>
      <span style={{ "--loam-context": "danger" } as CSSProperties}>
        <Modal.Trigger>Delete file</Modal.Trigger>
      </span>
      <Modal.Popup alert size="sm">
        <Modal.Title>Delete this file?</Modal.Title>
        <Modal.Description>
          &ldquo;report-final-v2.pdf&rdquo; will be permanently deleted. This cannot be undone.
        </Modal.Description>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--loam-space-sm)",
            alignItems: "center",
          }}
        >
          <Modal.Close autoFocus>Cancel</Modal.Close>
          <span style={{ "--loam-context": "danger" } as CSSProperties}>
            <Modal.Close>Delete</Modal.Close>
          </span>
        </div>
      </Modal.Popup>
    </Modal.Root>
  );
}

export function ModalSizesDemo() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--loam-space-sm)",
        alignItems: "center",
      }}
    >
      {(["sm", "md", "lg"] as const).map((size) => (
        <Modal.Root key={size}>
          <Modal.Trigger>Open {size}</Modal.Trigger>
          <Modal.Popup size={size}>
            <Modal.Title>A {size} modal</Modal.Title>
            <Modal.Description>The panel width comes from the size prop.</Modal.Description>
            <Modal.Close>Close</Modal.Close>
          </Modal.Popup>
        </Modal.Root>
      ))}
    </div>
  );
}

export function ModalHeaderCloseDemo() {
  return (
    <Modal.Root>
      <Modal.Trigger>Open settings</Modal.Trigger>
      <Modal.Popup>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBlockEnd: "var(--loam-space-sm)",
          }}
        >
          <Modal.Title style={{ margin: 0 }}>Settings</Modal.Title>
          <Modal.Close aria-label="Close">×</Modal.Close>
        </div>
        <Modal.Description>Manage your workspace settings.</Modal.Description>
      </Modal.Popup>
    </Modal.Root>
  );
}
