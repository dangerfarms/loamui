"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent, Ref, RefObject } from "react";
import { cssSafeId, supportsAnchoredPopover } from "./anchor";

/**
 * The open/close engine behind the anchored popups (Popover, Menu) and the
 * open-state plumbing every overlay shares. A popup renders with the native
 * `popover` attribute and CSS anchor positioning where both are supported;
 * elsewhere the same parts fall back to a wrapper-anchored panel with the
 * dismiss handling done in JS. One React state drives both paths.
 */

export interface OpenStateOptions {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called whenever the open state should change (either path). */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Controlled-or-uncontrolled open state. In controlled mode the parent owns
 * the value and `setOpen` only proposes; the DOM reconciles back to whatever
 * the parent decides.
 */
export function useOpenState({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: OpenStateOptions): [open: boolean, setOpen: (open: boolean) => void] {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;
  const openRef = useRef(open);
  openRef.current = open;
  const controlledRef = useRef(false);
  controlledRef.current = openProp !== undefined;
  const setOpen = useCallback(
    (next: boolean) => {
      if (next === openRef.current) return;
      if (!controlledRef.current) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );
  return [open, setOpen];
}

export interface PopupState {
  open: boolean;
  setOpen: (open: boolean) => void;
  /** The Trigger's element, for focus restoration on close. */
  triggerRef: RefObject<HTMLButtonElement | null>;
  /** The Popup's element. */
  popupRef: RefObject<HTMLDivElement | null>;
  popupId: string;
  /** Per-instance anchor-name shared by Trigger and Popup via custom property. */
  anchorName: string;
  /** True once the native popover API + CSS anchor positioning are confirmed. */
  enhanced: boolean;
}

/**
 * Root-level state for a popup: open state, the support probe, and the ids
 * the parts share. `suffix` distinguishes the id ("popup", "menu").
 */
export function usePopupRoot(suffix: string, options: OpenStateOptions): PopupState {
  const [open, setOpen] = useOpenState(options);
  // Adopt popover + anchor positioning together: a top-layer popup ignores
  // its wrapper's positioning context, so promoting it without anchor
  // positioning would leave it centred in the viewport.
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => setEnhanced(supportsAnchoredPopover()), []);

  const autoId = useId();
  const popupId = `${cssSafeId(autoId)}-${suffix}`;
  const anchorName = `--loam-anchor-${popupId}`;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  return useMemo<PopupState>(
    () => ({ open, setOpen, triggerRef, popupRef, popupId, anchorName, enhanced }),
    [open, setOpen, popupId, anchorName, enhanced],
  );
}

/** The wiring a popup's Trigger attaches to whatever it renders. */
export interface PopupTriggerRenderProps {
  type: "button";
  popoverTarget: string | undefined;
  "aria-expanded": boolean;
  "aria-controls": string | undefined;
  /** Styling hook: present while the popup is open. */
  "data-popup-open": "true" | undefined;
  style: CSSProperties;
  onClick: (e: ReactMouseEvent<Element>) => void;
  ref: Ref<HTMLButtonElement>;
}

/** Trigger wiring shared by the anchored popups; each adds its `aria-haspopup`. */
export function popupTriggerProps(state: PopupState): PopupTriggerRenderProps {
  return {
    ref: state.triggerRef,
    type: "button",
    // popovertarget makes the browser treat this button as the popup's
    // invoker, so clicking it while open closes rather than light-dismisses
    // and immediately reopens.
    popoverTarget: state.enhanced ? state.popupId : undefined,
    "aria-expanded": state.open,
    "aria-controls": state.open ? state.popupId : undefined,
    "data-popup-open": state.open ? "true" : undefined,
    style: { anchorName: state.anchorName } as CSSProperties,
    onClick: () => {
      // Native invocation handles the toggle when enhanced; the toggle
      // event syncs it back into state.
      if (!state.enhanced) state.setOpen(!state.open);
    },
  };
}

/**
 * Reconcile React state with the native popover state. Deliberately no
 * dependency array: a controlled parent may reject a toggle-reported change,
 * and only an every-render reconcile converges the DOM back.
 */
export function usePopoverReconcile(
  ref: RefObject<HTMLElement | null>,
  open: boolean,
  enhanced: boolean,
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enhanced) return;
    const nativeOpen = el.matches(":popover-open");
    if (open && !nativeOpen) el.showPopover();
    else if (!open && nativeOpen) el.hidePopover();
  });
}

export interface PopupOptions {
  /** The Root's class, so the fallback's outside-click test knows the bounds. */
  rootClass: string;
  /** Where focus lands when the popup opens. @default the popup itself */
  focusOnOpen?: (popup: HTMLElement) => void;
  /** What Escape does in the fallback path. @default close */
  onEscape?: () => void;
}

/**
 * The Popup's behaviour: native reconcile + toggle sync when enhanced,
 * document-level dismiss handling in the fallback, and focus management on
 * both paths (into the popup on open; back to the trigger on close when it
 * would otherwise be lost). Skipped when the popup mounts already open, so a
 * defaultOpen popup doesn't steal page focus.
 */
export function usePopup(state: PopupState, { rootClass, focusOnOpen, onEscape }: PopupOptions) {
  const { open, setOpen, enhanced, popupRef: ref, triggerRef } = state;

  usePopoverReconcile(ref, open, enhanced);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enhanced) return;
    const onToggle = (e: Event) => {
      setOpen((e as ToggleEvent).newState === "open");
    };
    el.addEventListener("toggle", onToggle);
    return () => el.removeEventListener("toggle", onToggle);
  }, [enhanced, setOpen, ref]);

  const focusOnOpenRef = useRef(focusOnOpen);
  focusOnOpenRef.current = focusOnOpen;
  const prevOpenRef = useRef(open);
  useEffect(() => {
    const el = ref.current;
    const was = prevOpenRef.current;
    prevOpenRef.current = open;
    if (!el || was === open) return;
    if (open) {
      if (focusOnOpenRef.current) focusOnOpenRef.current(el);
      else el.focus({ preventScroll: true });
    } else if (el.contains(document.activeElement) || document.activeElement === document.body) {
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [open, ref, triggerRef]);

  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;
  useEffect(() => {
    if (enhanced || !open) return;
    const onPointer = (e: MouseEvent) => {
      const root = ref.current?.closest(`.${rootClass}`);
      if (root && !root.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (onEscapeRef.current) onEscapeRef.current();
      else setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [enhanced, open, setOpen, ref, rootClass]);
}

/** The attributes that make the Popup a popup; rest must never override them. */
export function popupProps(state: PopupState, side: string, style: CSSProperties | undefined) {
  return {
    id: state.popupId,
    tabIndex: -1,
    popover: state.enhanced ? ("auto" as const) : undefined,
    hidden: state.enhanced || state.open ? undefined : true,
    "data-side": side,
    "data-open": state.open || undefined,
    style: { ...style, positionAnchor: state.anchorName } as CSSProperties,
  };
}
