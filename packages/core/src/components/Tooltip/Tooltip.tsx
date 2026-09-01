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
  FocusEvent,
  HTMLAttributes,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  Ref,
} from "react";
import { cx } from "../../utils";
import { cssSafeId, supportsAnchoredPopover } from "../../anchor";
import { mergeProps, renderWithProps, composeRefs } from "../../render";
import type { RenderProp } from "../../render";

import { Button } from "../Button/Button";

/**
 * A small floating label revealed on hover and keyboard focus.
 *
 * Tooltips are visual-only: never put essential information in one, since
 * hover is unavailable to touch users. The bubble opens after a short delay
 * (immediately on keyboard focus), stays open while hovered (WCAG 1.4.13
 * hoverable), and Escape dismisses it without moving focus (WCAG 1.4.13
 * dismissible). Hover and focus are tracked independently, so a pointer
 * passing over a focused trigger never steals the bubble away.
 * Rendering uses the native popover attribute + CSS anchor positioning where
 * supported, with a wrapper-anchored fallback elsewhere.
 *
 * ```tsx
 * <Tooltip.Root>
 *   <Tooltip.Trigger render={<IconButton aria-label="Delete" />} />
 *   <Tooltip.Popup>
 *     Delete <Tooltip.Arrow />
 *   </Tooltip.Popup>
 * </Tooltip.Root>
 * ```
 */

/** How long after one tooltip closes an adjacent one opens with no delay. */
const SKIP_DELAY_WINDOW = 400;
/**
 * Grace period for moving the pointer from trigger to bubble. Generous on
 * purpose: magnifier panning and tremor traversal are slow — a short window
 * is a practical WCAG 1.4.13 "hoverable" failure.
 */
const CLOSE_DELAY = 300;

interface TooltipProviderValue {
  delay: number;
  /** Shared timestamp of recent tooltip activity, for instant adjacent opens. */
  lastVisibleAt: RefObject<number>;
}

const TooltipProviderContext = createContext<TooltipProviderValue | null>(null);

export interface TooltipProviderProps {
  /** Hover delay in ms for all tooltips underneath. @default 600 */
  delay?: number;
  children: ReactNode;
}

function TooltipProvider({ delay = 600, children }: TooltipProviderProps) {
  const lastVisibleAt = useRef(0);
  const value = useMemo(() => ({ delay, lastVisibleAt }), [delay]);
  return <TooltipProviderContext value={value}>{children}</TooltipProviderContext>;
}

interface TooltipContextValue {
  open: boolean;
  bubbleId: string;
  anchorName: string;
  enhanced: boolean;
  /** "hint" where the browser knows it; "manual" otherwise. */
  popoverKind: "hint" | "manual";
  hideNow: () => void;
  triggerEnter: (e: ReactPointerEvent<Element>) => void;
  triggerLeave: () => void;
  triggerFocus: (e: FocusEvent<Element>) => void;
  triggerBlur: () => void;
  bubbleEnter: () => void;
  bubbleLeave: () => void;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext(part: string): TooltipContextValue {
  const ctx = useContext(TooltipContext);
  if (!ctx) {
    throw new Error(`${part} must be rendered inside <Tooltip.Root>.`);
  }
  return ctx;
}

/* Same coupling as Popover: top layer without anchor positioning would leave
   the bubble centred in the viewport, so both are required to enhance. */
/* popover="hint" is narrower than the popover API itself; an unknown value
   silently becomes "manual", so detect via IDL reflection and be explicit. */
function detectPopoverKind(): "hint" | "manual" {
  try {
    const probe = document.createElement("span");
    probe.popover = "hint";
    return probe.popover === "hint" ? "hint" : "manual";
  } catch {
    return "manual";
  }
}

/* Only visible focus (keyboard) opens the bubble; programmatic or tap focus
   would otherwise defeat the touch suppression. Browsers/jsdom without
   :focus-visible fall back to treating any focus as visible. */
function isFocusVisible(el: Element): boolean {
  try {
    return el.matches(":focus-visible");
  } catch {
    return true;
  }
}

export interface TooltipRootProps extends HTMLAttributes<HTMLSpanElement> {
  /** Hover delay in ms; overrides the Provider. @default 600 */
  delay?: number;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called whenever the open state should change. */
  onOpenChange?: (open: boolean) => void;
}

function TooltipRoot({
  delay: delayProp,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...rest
}: TooltipRootProps) {
  const provider = useContext(TooltipProviderContext);
  const delay = delayProp ?? provider?.delay ?? 600;
  const lastVisibleAt = provider?.lastVisibleAt;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;
  const [enhanced, setEnhanced] = useState(false);
  const [popoverKind, setPopoverKind] = useState<"hint" | "manual">("manual");
  useEffect(() => {
    setEnhanced(supportsAnchoredPopover());
    setPopoverKind(detectPopoverKind());
  }, []);

  const autoId = useId();
  const bubbleId = `${cssSafeId(autoId)}-tooltip`;
  const anchorName = `--loam-anchor-${bubbleId}`;

  const openRef = useRef(open);
  openRef.current = open;
  const controlledRef = useRef(false);
  controlledRef.current = openProp !== undefined;
  const setOpen = useCallback(
    (next: boolean) => {
      if (next === openRef.current) return;
      if (lastVisibleAt) lastVisibleAt.current = Date.now();
      if (!controlledRef.current) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [lastVisibleAt, onOpenChange],
  );

  // Why the bubble is open. Hover and focus are independent: the bubble only
  // hides once *both* are gone, so a pointer passing over a focused trigger
  // can't steal it (WCAG 1.4.13 persistent).
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);

  const showTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const clearTimers = useCallback(() => {
    clearTimeout(showTimer.current);
    clearTimeout(hideTimer.current);
  }, []);
  useEffect(() => clearTimers, [clearTimers]);

  const showNow = useCallback(() => {
    clearTimers();
    setOpen(true);
  }, [clearTimers, setOpen]);

  const scheduleShow = useCallback(() => {
    clearTimeout(hideTimer.current);
    const skipDelay = lastVisibleAt && Date.now() - lastVisibleAt.current < SKIP_DELAY_WINDOW;
    if (skipDelay || delay <= 0) {
      setOpen(true);
      return;
    }
    clearTimeout(showTimer.current);
    showTimer.current = setTimeout(() => setOpen(true), delay);
  }, [delay, lastVisibleAt, setOpen]);

  const hideNow = useCallback(() => {
    clearTimers();
    setOpen(false);
  }, [clearTimers, setOpen]);

  const scheduleHide = useCallback(() => {
    // Stamp activity so an adjacent tooltip hovered during the grace period
    // still opens instantly (the pointer left while we were visible).
    if (lastVisibleAt && openRef.current) lastVisibleAt.current = Date.now();
    clearTimeout(showTimer.current);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  }, [lastVisibleAt, setOpen]);

  const triggerEnter = useCallback(
    (e: ReactPointerEvent<Element>) => {
      // Hover is unavailable on touch; tapping shouldn't flash the tooltip.
      if (e.pointerType === "touch") return;
      hoveredRef.current = true;
      scheduleShow();
    },
    [scheduleShow],
  );
  const triggerLeave = useCallback(() => {
    hoveredRef.current = false;
    if (!focusedRef.current) scheduleHide();
  }, [scheduleHide]);
  const triggerFocus = useCallback(
    (e: FocusEvent<Element>) => {
      if (!isFocusVisible(e.target)) return;
      focusedRef.current = true;
      showNow();
    },
    [showNow],
  );
  const triggerBlur = useCallback(() => {
    focusedRef.current = false;
    if (!hoveredRef.current) hideNow();
  }, [hideNow]);
  const bubbleEnter = useCallback(() => {
    hoveredRef.current = true;
    clearTimeout(hideTimer.current);
  }, []);
  const bubbleLeave = useCallback(() => {
    hoveredRef.current = false;
    if (!focusedRef.current) scheduleHide();
  }, [scheduleHide]);

  // Escape dismisses without moving pointer or focus (WCAG 1.4.13).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hideNow();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, hideNow]);

  const value = useMemo<TooltipContextValue>(
    () => ({
      open,
      bubbleId,
      anchorName,
      enhanced,
      popoverKind,
      hideNow,
      triggerEnter,
      triggerLeave,
      triggerFocus,
      triggerBlur,
      bubbleEnter,
      bubbleLeave,
    }),
    [
      open,
      bubbleId,
      anchorName,
      enhanced,
      popoverKind,
      hideNow,
      triggerEnter,
      triggerLeave,
      triggerFocus,
      triggerBlur,
      bubbleEnter,
      bubbleLeave,
    ],
  );

  return (
    <TooltipContext value={value}>
      <span className={cx("loam-Tooltip", className)} {...rest}>
        {children}
      </span>
    </TooltipContext>
  );
}

/** Props the Trigger wires onto whatever it renders. */
export interface TooltipTriggerRenderProps {
  "aria-describedby": string;
  /** Styling hook — present while the bubble is open. */
  "data-popup-open": "true" | undefined;
  onPointerEnter: (e: ReactPointerEvent<Element>) => void;
  onPointerLeave: (e: ReactPointerEvent<Element>) => void;
  onFocus: (e: FocusEvent<Element>) => void;
  onBlur: (e: FocusEvent<Element>) => void;
  style: CSSProperties;
}

export interface TooltipTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Substitute your own interactive element as the trigger
   * (`render={<IconButton />}`) or pass a function receiving the wiring
   * props. Without it, the Trigger renders a LoamUI Button.
   */
  render?: RenderProp<TooltipTriggerRenderProps>;
}

function TooltipTrigger({ render, children, ...rest }: TooltipTriggerProps) {
  const ctx = useTooltipContext("Tooltip.Trigger");

  const triggerProps: TooltipTriggerRenderProps = {
    "aria-describedby": ctx.bubbleId,
    "data-popup-open": ctx.open ? "true" : undefined,
    onPointerEnter: (e) => ctx.triggerEnter(e),
    onPointerLeave: () => ctx.triggerLeave(),
    onFocus: (e) => ctx.triggerFocus(e),
    onBlur: () => ctx.triggerBlur(),
    style: { anchorName: ctx.anchorName } as CSSProperties,
  };

  return render ? (
    <>{renderWithProps(render, mergeProps(triggerProps, { children, ...rest }))}</>
  ) : (
    <>{renderWithProps(<Button {...rest}>{children}</Button>, triggerProps)}</>
  );
}

export interface TooltipPopupProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
  /** Which side of the trigger the bubble appears on. @default "top" */
  position?: "top" | "bottom" | "left" | "right";
}

function TooltipPopup({
  position = "top",
  className,
  children,
  style,
  onPointerEnter,
  onPointerLeave,
  ref: refProp,
  ...rest
}: TooltipPopupProps) {
  const ctx = useTooltipContext("Tooltip.Popup");
  const { open, enhanced, hideNow } = ctx;
  const ref = useRef<HTMLSpanElement>(null);
  const composedRef = useMemo(() => composeRefs(refProp, ref), [refProp]);

  // No dependency array — see Popover.Popup: a controlled parent may reject a
  // toggle-reported change, and only an every-render reconcile converges.
  useEffect(() => {
    const el = ref.current;
    if (!el || !enhanced) return;
    const nativeOpen = el.matches(":popover-open");
    if (open && !nativeOpen) el.showPopover();
    else if (!open && nativeOpen) el.hidePopover();
  });

  // A hint popover can be closed natively (another hint opening, light
  // dismiss); mirror that back into state.
  useEffect(() => {
    const el = ref.current;
    if (!el || !enhanced) return;
    const onToggle = (e: Event) => {
      if ((e as ToggleEvent).newState === "closed") hideNow();
    };
    el.addEventListener("toggle", onToggle);
    return () => el.removeEventListener("toggle", onToggle);
  }, [enhanced, hideNow]);

  return (
    // rest cannot override what follows: the hover/focus tracking and
    // aria-describedby are the 1.4.13 contract; pointer handlers chain
    // consumer handlers rather than replacing them.
    <span
      {...rest}
      ref={composedRef}
      id={ctx.bubbleId}
      role="tooltip"
      popover={enhanced ? ctx.popoverKind : undefined}
      hidden={enhanced || open ? undefined : true}
      className={cx("loam-Tooltip-popup", className)}
      data-position={position}
      data-open={open || undefined}
      style={{ ...style, positionAnchor: ctx.anchorName } as CSSProperties}
      // The bubble must stay open while hovered (WCAG 1.4.13 hoverable).
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        ctx.bubbleEnter();
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        ctx.bubbleLeave();
      }}
    >
      {children}
    </span>
  );
}

export interface TooltipArrowProps extends HTMLAttributes<HTMLSpanElement> {}

function TooltipArrow({ className, ...rest }: TooltipArrowProps) {
  useTooltipContext("Tooltip.Arrow");
  return <span aria-hidden="true" className={cx("arrow", className)} {...rest} />;
}

export const Tooltip = {
  Provider: TooltipProvider,
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Popup: TooltipPopup,
  Arrow: TooltipArrow,
};
