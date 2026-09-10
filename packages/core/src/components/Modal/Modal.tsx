"use client";

import type { ReactNode } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { mergeProps, renderWithProps } from "../../render";
import type { RenderProp } from "../../render";
import {
  DialogContext,
  dialogCloseProps,
  dialogTriggerProps,
  useDialogContext,
  useDialogDescription,
  useDialogPopup,
  useDialogRoot,
  useDialogTitle,
} from "../../use-dialog";
import type { DialogCloseRenderProps, DialogTriggerRenderProps } from "../../use-dialog";

import { Button } from "../Button/Button";

/**
 * A blocking dialog for must-complete tasks, composed from parts.
 *
 * The Popup renders a native `<dialog>` opened with `showModal()`, so the
 * top layer, `::backdrop`, focus containment, Escape handling and
 * focus-restore-to-opener all come from the browser. Light dismiss uses the
 * `closedby` attribute where supported, with a small coordinate-check
 * fallback elsewhere.
 *
 * ```tsx
 * <Modal.Root>
 *   <Modal.Trigger>Invite teammate</Modal.Trigger>
 *   <Modal.Popup>
 *     <Modal.Title>Invite a teammate</Modal.Title>
 *     <Modal.Description>They'll get an email invitation.</Modal.Description>
 *     <Modal.Close>Cancel</Modal.Close>
 *   </Modal.Popup>
 * </Modal.Root>
 * ```
 */

const COMPONENT = "Modal";

export interface ModalRootProps {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called whenever the open state should change (either path). */
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

function ModalRoot({ open, defaultOpen, onOpenChange, children }: ModalRootProps) {
  const value = useDialogRoot(COMPONENT, { open, defaultOpen, onOpenChange });
  return <DialogContext value={value}>{children}</DialogContext>;
}

export interface ModalTriggerRenderProps extends DialogTriggerRenderProps {}

export interface ModalTriggerProps extends PartProps<"button"> {
  /**
   * Substitute your own element as the trigger (`render={<MyIconButton />}`);
   * triggers act, so keep them buttons, or pass a function receiving the
   * wiring props. Without it, the Trigger renders a LoamUI Button.
   */
  render?: RenderProp<ModalTriggerRenderProps>;
}

function ModalTrigger({ render, children, ...rest }: ModalTriggerProps) {
  const ctx = useDialogContext(COMPONENT, "Trigger");
  const triggerProps = dialogTriggerProps(ctx);
  return render ? (
    <>{renderWithProps(render, mergeProps(triggerProps, { children, ...rest }))}</>
  ) : (
    <>{renderWithProps(<Button {...rest}>{children}</Button>, triggerProps)}</>
  );
}

export interface ModalPopupProps extends Omit<PartProps<"dialog">, "open"> {
  /**
   * Renders an alert dialog (`role="alertdialog"`): a confirmation that
   * interrupts the user and cannot be light-dismissed. Clicking the backdrop
   * does nothing; only Escape or an explicit choice closes it. Pair with a
   * Title and Description, and put `autoFocus` on the least-destructive
   * action so it is the default answer.
   */
  alert?: boolean;
}

function ModalPopup({
  alert = false,
  className,
  children,
  ref,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...rest
}: ModalPopupProps) {
  const ctx = useDialogContext(COMPONENT, "Popup");
  const dialogProps = useDialogPopup(ctx, {
    ref,
    lightDismiss: !alert,
    label: ariaLabel,
    labelledBy: ariaLabelledBy,
    describedBy: ariaDescribedBy,
  });

  return (
    // rest cannot override what follows: the dialog wiring (id, open
    // reconciliation, closedby) must win.
    <dialog
      {...rest}
      {...dialogProps}
      // Missing from React's typings; lowercase passes through as an attribute.
      // "closerequest" = Escape closes, backdrop clicks don't: the native
      // spelling of an alert dialog's dismissal contract.
      {...({ closedby: alert ? "closerequest" : "any" } as object)}
      role={alert ? "alertdialog" : undefined}
      className={cx("loam-Modal-popup", className)}
    >
      {children}
    </dialog>
  );
}

export interface ModalTitleProps extends PartProps<"h2"> {}

function ModalTitle({ className, children, ...rest }: ModalTitleProps) {
  const ctx = useDialogContext(COMPONENT, "Title");
  const id = useDialogTitle(ctx);
  return (
    <h2 className={cx("title", className)} id={id} {...rest}>
      {children}
    </h2>
  );
}

export interface ModalDescriptionProps extends PartProps<"p"> {}

function ModalDescription({ className, children, ...rest }: ModalDescriptionProps) {
  const ctx = useDialogContext(COMPONENT, "Description");
  const id = useDialogDescription(ctx);
  return (
    <p className={cx("description", className)} id={id} {...rest}>
      {children}
    </p>
  );
}

export interface ModalCloseRenderProps extends DialogCloseRenderProps {}

export interface ModalCloseProps extends PartProps<"button"> {
  /** Substitute your own element; defaults to a LoamUI Button. */
  render?: RenderProp<ModalCloseRenderProps>;
}

function ModalClose({ render, children, ...rest }: ModalCloseProps) {
  const ctx = useDialogContext(COMPONENT, "Close");
  const closeProps = dialogCloseProps(ctx);
  return render ? (
    <>{renderWithProps(render, mergeProps(closeProps, { children, ...rest }))}</>
  ) : (
    <>{renderWithProps(<Button {...rest}>{children}</Button>, closeProps)}</>
  );
}

export const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Popup: ModalPopup,
  Title: ModalTitle,
  Description: ModalDescription,
  Close: ModalClose,
};
