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
 * An edge-anchored panel that slides in over the page, composed from parts.
 *
 * The Popup renders a native `<dialog>` opened with `showModal()`, so the top
 * layer, `::backdrop`, focus containment, Escape handling and
 * focus-restore-to-opener all come from the browser: a Drawer is a Modal
 * pinned to an edge with a slide transition. Light dismiss uses the `closedby`
 * attribute where supported, with a coordinate-check fallback elsewhere.
 *
 * Reach for a Drawer for navigation and secondary content that shouldn't take
 * over the whole screen (a mobile menu, filters, a details side-sheet). For a
 * focused, must-answer task, use Modal instead.
 *
 * ```tsx
 * <Drawer.Root>
 *   <Drawer.Trigger>Menu</Drawer.Trigger>
 *   <Drawer.Popup side="start">
 *     <Drawer.Title>Navigation</Drawer.Title>
 *     <nav>…</nav>
 *     <Drawer.Close aria-label="Close" />
 *   </Drawer.Popup>
 * </Drawer.Root>
 * ```
 */

const COMPONENT = "Drawer";

export interface DrawerRootProps {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called whenever the open state should change (either path). */
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

function DrawerRoot({ open, defaultOpen, onOpenChange, children }: DrawerRootProps) {
  const value = useDialogRoot(COMPONENT, { open, defaultOpen, onOpenChange });
  return <DialogContext value={value}>{children}</DialogContext>;
}

export interface DrawerTriggerRenderProps extends DialogTriggerRenderProps {}

export interface DrawerTriggerProps extends PartProps<"button"> {
  /**
   * Substitute your own element as the trigger (`render={<MyIconButton />}`);
   * triggers act, so keep them buttons, or pass a function receiving the
   * wiring props. Without it, the Trigger renders a LoamUI Button.
   */
  render?: RenderProp<DrawerTriggerRenderProps>;
}

function DrawerTrigger({ render, children, ...rest }: DrawerTriggerProps) {
  const ctx = useDialogContext(COMPONENT, "Trigger");
  const triggerProps = dialogTriggerProps(ctx);
  return render ? (
    <>{renderWithProps(render, mergeProps(triggerProps, { children, ...rest }))}</>
  ) : (
    <>{renderWithProps(<Button {...rest}>{children}</Button>, triggerProps)}</>
  );
}

/** Which edge the panel is anchored to. Logical, so it follows writing mode. */
export type DrawerSide = "start" | "end" | "top" | "bottom";

export interface DrawerPopupProps extends Omit<PartProps<"dialog">, "open"> {
  /** Edge the panel slides in from. @default "start" */
  side?: DrawerSide;
}

function DrawerPopup({
  side = "start",
  className,
  children,
  ref,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...rest
}: DrawerPopupProps) {
  const ctx = useDialogContext(COMPONENT, "Popup");
  const dialogProps = useDialogPopup(ctx, {
    ref,
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
      {...({ closedby: "any" } as object)}
      className={cx("loam-Drawer-popup", className)}
      data-side={side}
    >
      {children}
    </dialog>
  );
}

export interface DrawerTitleProps extends PartProps<"h2"> {}

function DrawerTitle({ className, children, ...rest }: DrawerTitleProps) {
  const ctx = useDialogContext(COMPONENT, "Title");
  const id = useDialogTitle(ctx);
  return (
    <h2 className={cx("title", className)} id={id} {...rest}>
      {children}
    </h2>
  );
}

export interface DrawerDescriptionProps extends PartProps<"p"> {}

function DrawerDescription({ className, children, ...rest }: DrawerDescriptionProps) {
  const ctx = useDialogContext(COMPONENT, "Description");
  const id = useDialogDescription(ctx);
  return (
    <p className={cx("description", className)} id={id} {...rest}>
      {children}
    </p>
  );
}

export interface DrawerCloseRenderProps extends DialogCloseRenderProps {}

export interface DrawerCloseProps extends PartProps<"button"> {
  /** Substitute your own element; defaults to a LoamUI Button. */
  render?: RenderProp<DrawerCloseRenderProps>;
}

function DrawerClose({ render, children, ...rest }: DrawerCloseProps) {
  const ctx = useDialogContext(COMPONENT, "Close");
  const closeProps = dialogCloseProps(ctx);
  return render ? (
    <>{renderWithProps(render, mergeProps(closeProps, { children, ...rest }))}</>
  ) : (
    <>{renderWithProps(<Button {...rest}>{children}</Button>, closeProps)}</>
  );
}

export const Drawer = {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Popup: DrawerPopup,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Close: DrawerClose,
};
