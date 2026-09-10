"use client";

import { createContext, useEffect, useMemo } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { useRequiredContext } from "../../context";
import { usePresence } from "../../use-presence";
import { composeRefs, idList, mergeProps, renderWithProps } from "../../render";
import type { RenderProp } from "../../render";
import { popupProps, popupTriggerProps, usePopup, usePopupRoot } from "../../use-popup";
import type { PopupState, PopupTriggerRenderProps } from "../../use-popup";

import { Button } from "../Button/Button";

/**
 * A click-triggered floating panel, composed from parts.
 *
 * The Popup renders with the native `popover` attribute, so the browser
 * provides the top layer (no z-index, no clipping by ancestor overflow),
 * light dismiss and Escape. Positioning uses CSS anchor positioning where
 * supported. In browsers without both features the same parts fall back to
 * a wrapper-anchored panel with JS dismiss handling; the enhanced and
 * fallback paths share one React state.
 *
 * ```tsx
 * <Popover.Root>
 *   <Popover.Trigger>Open settings</Popover.Trigger>
 *   <Popover.Popup>
 *     <Popover.Title>Settings</Popover.Title>
 *     <Popover.Description>Quick preferences.</Popover.Description>
 *     <Popover.Close>Done</Popover.Close>
 *   </Popover.Popup>
 * </Popover.Root>
 * ```
 */

interface PopoverContextValue extends PopupState {
  titleId: string;
  descriptionId: string;
  hasTitle: boolean;
  hasDescription: boolean;
  registerTitle: () => () => void;
  registerDescription: () => () => void;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(part: string): PopoverContextValue {
  return useRequiredContext(PopoverContext, part, "Popover.Root");
}

export interface PopoverRootProps extends PartProps<"span"> {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called whenever the open state should change (either path). */
  onOpenChange?: (open: boolean) => void;
}

function PopoverRoot({
  open,
  defaultOpen,
  onOpenChange,
  className,
  children,
  ...rest
}: PopoverRootProps) {
  const popup = usePopupRoot("popup", { open, defaultOpen, onOpenChange });
  const [hasTitle, registerTitle] = usePresence();
  const [hasDescription, registerDescription] = usePresence();

  const value = useMemo<PopoverContextValue>(
    () => ({
      ...popup,
      titleId: `${popup.popupId}-title`,
      descriptionId: `${popup.popupId}-description`,
      hasTitle,
      hasDescription,
      registerTitle,
      registerDescription,
    }),
    [popup, hasTitle, hasDescription, registerTitle, registerDescription],
  );

  return (
    <PopoverContext value={value}>
      <span className={cx("loam-Popover", className)} {...rest}>
        {children}
      </span>
    </PopoverContext>
  );
}

/** Wiring the Trigger attaches to whatever it renders. */
export interface PopoverTriggerRenderProps extends PopupTriggerRenderProps {
  "aria-haspopup": "dialog";
}

export interface PopoverTriggerProps extends PartProps<"button"> {
  /**
   * Substitute your own element as the trigger
   * (`render={<a href="…" />}`) or pass a function receiving the wiring
   * props. Without it, the Trigger renders a LoamUI Button.
   */
  render?: RenderProp<PopoverTriggerRenderProps>;
}

function PopoverTrigger({ render, children, ...rest }: PopoverTriggerProps) {
  const ctx = usePopoverContext("Popover.Trigger");
  const triggerProps: PopoverTriggerRenderProps = {
    ...popupTriggerProps(ctx),
    "aria-haspopup": "dialog",
  };

  return render ? (
    <>{renderWithProps(render, mergeProps(triggerProps, { children, ...rest }))}</>
  ) : (
    <>{renderWithProps(<Button {...rest}>{children}</Button>, triggerProps)}</>
  );
}

export interface PopoverPopupProps extends PartProps<"div"> {
  /** Which side of the trigger the panel opens toward. @default "bottom" */
  side?: "bottom" | "top";
}

function PopoverPopup({
  side = "bottom",
  className,
  children,
  style,
  "aria-labelledby": labelledBy,
  "aria-describedby": describedBy,
  ref: refProp,
  ...rest
}: PopoverPopupProps) {
  const ctx = usePopoverContext("Popover.Popup");
  const composedRef = useMemo(() => composeRefs(refProp, ctx.popupRef), [refProp, ctx.popupRef]);
  usePopup(ctx);

  return (
    // rest cannot override what follows: the popover/anchor wiring is
    // what makes the panel a popover at all. The id lists follow the merge
    // contract: the Title and Description first, then the consumer's.
    <div
      {...rest}
      {...popupProps(ctx, side, style)}
      ref={composedRef}
      role="dialog"
      tabIndex={-1}
      aria-labelledby={idList(ctx.hasTitle ? ctx.titleId : undefined, labelledBy)}
      aria-describedby={idList(ctx.hasDescription ? ctx.descriptionId : undefined, describedBy)}
      className={cx("loam-Popover-popup", className)}
    >
      {children}
    </div>
  );
}

/** Wiring the Title attaches to whatever it renders. */
export interface PopoverTitleRenderProps {
  id: string;
  className: string;
}

export interface PopoverTitleProps extends PartProps<"h2"> {
  /**
   * Substitute the heading element so its level follows the page
   * (`render={<h3 />}`). Defaults to an `<h2>`.
   */
  render?: RenderProp<PopoverTitleRenderProps>;
}

function PopoverTitle({ render, className, children, ...rest }: PopoverTitleProps) {
  const ctx = usePopoverContext("Popover.Title");
  const { registerTitle } = ctx;
  useEffect(() => registerTitle(), [registerTitle]);
  const wiring: PopoverTitleRenderProps = { id: ctx.titleId, className: cx("title", className) };
  if (render) {
    return <>{renderWithProps(render, { ...rest, ...wiring, children })}</>;
  }
  return (
    <h2 {...rest} {...wiring}>
      {children}
    </h2>
  );
}

export interface PopoverDescriptionProps extends PartProps<"p"> {}

function PopoverDescription({ className, children, ...rest }: PopoverDescriptionProps) {
  const ctx = usePopoverContext("Popover.Description");
  const { registerDescription } = ctx;
  useEffect(() => registerDescription(), [registerDescription]);
  return (
    <p className={cx("description", className)} id={ctx.descriptionId} {...rest}>
      {children}
    </p>
  );
}

/** Wiring the Close part attaches to whatever it renders. */
export interface PopoverCloseRenderProps {
  type: "button";
  onClick: (e: ReactMouseEvent<Element>) => void;
}

export interface PopoverCloseProps extends PartProps<"button"> {
  /** Substitute your own element; defaults to a LoamUI Button. */
  render?: RenderProp<PopoverCloseRenderProps>;
}

function PopoverClose({ render, children, ...rest }: PopoverCloseProps) {
  const ctx = usePopoverContext("Popover.Close");
  const closeProps: PopoverCloseRenderProps = {
    type: "button",
    onClick: () => ctx.setOpen(false),
  };
  return render ? (
    <>{renderWithProps(render, mergeProps(closeProps, { children, ...rest }))}</>
  ) : (
    <>{renderWithProps(<Button {...rest}>{children}</Button>, closeProps)}</>
  );
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Popup: PopoverPopup,
  Title: PopoverTitle,
  Description: PopoverDescription,
  Close: PopoverClose,
};
