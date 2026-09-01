"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  RefObject,
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  MouseEvent as ReactMouseEvent,
  Ref,
} from "react";
import { cx } from "../../utils";
import { cssSafeId, supportsAnchoredPopover } from "../../anchor";
import { usePresence } from "../../use-presence";
import { mergeProps, renderWithProps, composeRefs } from "../../render";
import type { RenderProp } from "../../render";

import { Button } from "../Button/Button";

/**
 * A click-triggered floating panel, composed from parts.
 *
 * The Popup renders with the native `popover` attribute, so the browser
 * provides the top layer (no z-index, no clipping by ancestor overflow),
 * light dismiss and Escape. Positioning uses CSS anchor positioning where
 * supported. In browsers without both features the same parts fall back to
 * a wrapper-anchored panel with JS dismiss handling — the enhanced and
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

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  /** The Trigger's element, for focus restoration on close. */
  triggerRef: RefObject<HTMLButtonElement | null>;
  popupId: string;
  titleId: string;
  descriptionId: string;
  hasTitle: boolean;
  hasDescription: boolean;
  registerTitle: () => () => void;
  registerDescription: () => () => void;
  /** Unique anchor-name shared by Trigger and Popup via a custom property. */
  anchorName: string;
  /** True once the native popover API + CSS anchor positioning are confirmed. */
  enhanced: boolean;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(part: string): PopoverContextValue {
  const ctx = useContext(PopoverContext);
  if (!ctx) {
    throw new Error(`${part} must be rendered inside <Popover.Root>.`);
  }
  return ctx;
}

/*
 * Adopt popover + anchor positioning together: a top-layer popup ignores its
 * wrapper's positioning context, so promoting it without anchor positioning
 * would leave it centred in the viewport.
 */
export interface PopoverRootProps extends HTMLAttributes<HTMLSpanElement> {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called whenever the open state should change (either path). */
  onOpenChange?: (open: boolean) => void;
}

function PopoverRoot({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...rest
}: PopoverRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;
  const [hasTitle, registerTitle] = usePresence();
  const [hasDescription, registerDescription] = usePresence();
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => setEnhanced(supportsAnchoredPopover()), []);

  const autoId = useId();
  const popupId = `${cssSafeId(autoId)}-popup`;
  const anchorName = `--loam-anchor-${popupId}`;

  const openRef = useRef(open);
  openRef.current = open;
  const controlledRef = useRef(false);
  controlledRef.current = openProp !== undefined;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const setOpen = useCallback(
    (next: boolean) => {
      if (next === openRef.current) return;
      // In controlled mode the parent owns the state; we only propose.
      if (!controlledRef.current) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  const value = useMemo<PopoverContextValue>(
    () => ({
      open,
      setOpen,
      triggerRef,
      popupId,
      titleId: `${popupId}-title`,
      descriptionId: `${popupId}-description`,
      hasTitle,
      hasDescription,
      registerTitle,
      registerDescription,
      anchorName,
      enhanced,
    }),
    [
      open,
      setOpen,
      popupId,
      hasTitle,
      hasDescription,
      registerTitle,
      registerDescription,
      anchorName,
      enhanced,
    ],
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
export interface PopoverTriggerRenderProps {
  type: "button";
  popoverTarget: string | undefined;
  "aria-haspopup": "dialog";
  "aria-expanded": boolean;
  "aria-controls": string | undefined;
  /** Styling hook — present while the popup is open. */
  "data-popup-open": "true" | undefined;
  style: CSSProperties;
  onClick: (e: ReactMouseEvent<Element>) => void;
  ref: Ref<HTMLButtonElement>;
}

export interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
    ref: ctx.triggerRef,
    type: "button",
    // popovertarget makes the browser treat this button as the popup's
    // invoker, so clicking it while open closes rather than light-dismisses
    // and immediately reopens.
    popoverTarget: ctx.enhanced ? ctx.popupId : undefined,
    "aria-haspopup": "dialog",
    "aria-expanded": ctx.open,
    "aria-controls": ctx.open ? ctx.popupId : undefined,
    "data-popup-open": ctx.open ? "true" : undefined,
    style: { anchorName: ctx.anchorName } as CSSProperties,
    onClick: () => {
      // Native invocation handles the toggle when enhanced; the toggle
      // event syncs it back into state.
      if (!ctx.enhanced) ctx.setOpen(!ctx.open);
    },
  };

  return render ? (
    <>{renderWithProps(render, mergeProps(triggerProps, { children, ...rest }))}</>
  ) : (
    <>{renderWithProps(<Button {...rest}>{children}</Button>, triggerProps)}</>
  );
}

export interface PopoverPopupProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  /** Which side of the trigger the panel opens toward. @default "bottom" */
  position?: "bottom" | "top";
}

function PopoverPopup({
  position = "bottom",
  className,
  children,
  style,
  ref: refProp,
  ...rest
}: PopoverPopupProps) {
  const ctx = usePopoverContext("Popover.Popup");
  const { open, setOpen, enhanced } = ctx;
  const ref = useRef<HTMLDivElement>(null);
  const composedRef = useMemo(() => composeRefs(refProp, ref), [refProp]);

  // Reconcile React state with the native popover state. Deliberately no
  // dependency array: a controlled parent may reject a toggle-reported change,
  // and only an every-render reconcile converges the DOM back.
  useEffect(() => {
    const el = ref.current;
    if (!el || !enhanced) return;
    const nativeOpen = el.matches(":popover-open");
    if (open && !nativeOpen) el.showPopover();
    else if (!open && nativeOpen) el.hidePopover();
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || !enhanced) return;
    const onToggle = (e: Event) => {
      setOpen((e as ToggleEvent).newState === "open");
    };
    el.addEventListener("toggle", onToggle);
    return () => el.removeEventListener("toggle", onToggle);
  }, [enhanced, setOpen]);

  // Move focus into the panel on open; return it to the trigger on close when
  // it would otherwise be lost. Skipped when the popup mounts already open,
  // so a defaultOpen popover doesn't steal page focus.
  const prevOpenRef = useRef(open);
  useEffect(() => {
    const el = ref.current;
    const was = prevOpenRef.current;
    prevOpenRef.current = open;
    if (!el || was === open) return;
    if (open) {
      el.focus({ preventScroll: true });
    } else if (el.contains(document.activeElement) || document.activeElement === document.body) {
      ctx.triggerRef.current?.focus({ preventScroll: true });
    }
  }, [open, ctx.triggerRef]);

  useEffect(() => {
    if (enhanced || !open) return;
    const onPointer = (e: MouseEvent) => {
      const root = ref.current?.closest(".loam-Popover");
      if (root && !root.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [enhanced, open, setOpen]);

  return (
    // rest cannot override what follows: the popover/anchor wiring is
    // what makes the panel a popover at all.
    <div
      {...rest}
      ref={composedRef}
      id={ctx.popupId}
      role="dialog"
      tabIndex={-1}
      popover={enhanced ? "auto" : undefined}
      hidden={enhanced || open ? undefined : true}
      aria-labelledby={ctx.hasTitle ? ctx.titleId : undefined}
      aria-describedby={ctx.hasDescription ? ctx.descriptionId : undefined}
      className={cx("loam-Popover-popup", className)}
      data-position={position}
      data-open={open || undefined}
      style={{ ...style, positionAnchor: ctx.anchorName } as CSSProperties}
    >
      {children}
    </div>
  );
}

export interface PopoverTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

function PopoverTitle({ className, children, ...rest }: PopoverTitleProps) {
  const ctx = usePopoverContext("Popover.Title");
  const { registerTitle } = ctx;
  useEffect(() => registerTitle(), [registerTitle]);
  return (
    <h2 className={cx("title", className)} id={ctx.titleId} {...rest}>
      {children}
    </h2>
  );
}

export interface PopoverDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

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

export interface PopoverCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
