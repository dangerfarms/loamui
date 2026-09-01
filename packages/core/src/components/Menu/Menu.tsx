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
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  Ref,
} from "react";
import { cx } from "../../utils";
import { cssSafeId, supportsAnchoredPopover } from "../../anchor";
import { composeRefs, mergeProps, renderWithProps } from "../../render";
import type { RenderProp } from "../../render";

import { Button } from "../Button/Button";

/**
 * A list of actions opened from a trigger, composed from parts.
 *
 * The Popup renders with the native `popover` attribute (top layer, light
 * dismiss, Escape) and CSS anchor positioning where supported, falling back
 * to a wrapper-anchored panel elsewhere — the same engine as Popover. On top
 * of it sits the APG menu-button pattern: ArrowDown/ArrowUp from the trigger
 * open and focus the first/last item, arrow keys rove focus through the
 * items (looping), Home/End jump, typing jumps to the next matching item,
 * and activating an item closes the menu and returns focus to the trigger.
 *
 * Menus are for *actions* (rename, duplicate, delete…). For choosing a value
 * that persists, use Select; for navigation, prefer visible links.
 *
 * ```tsx
 * <Menu.Root>
 *   <Menu.Trigger>Options</Menu.Trigger>
 *   <Menu.Popup>
 *     <Menu.Item onClick={rename}>Rename</Menu.Item>
 *     <Menu.Item href="/export">Export…</Menu.Item>
 *     <Menu.Separator />
 *     <Menu.Group>
 *       <Menu.GroupLabel>Danger zone</Menu.GroupLabel>
 *       <Menu.Item onClick={remove}>Delete</Menu.Item>
 *     </Menu.Group>
 *   </Menu.Popup>
 * </Menu.Root>
 * ```
 */

interface MenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  popupRef: RefObject<HTMLDivElement | null>;
  popupId: string;
  anchorName: string;
  enhanced: boolean;
  /** Where focus should land when the menu opens. */
  focusOnOpen: { current: "first" | "last" };
  /** Close and return focus to the trigger (item activation, Escape). */
  closeAndRefocus: () => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

function useMenuContext(part: string): MenuContextValue {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw new Error(`${part} must be rendered inside <Menu.Root>.`);
  }
  return ctx;
}

/* Popover's coupling, for the same reason: the top layer without anchor
   positioning would leave the menu centred in the viewport. */
/** The focusable items, in DOM order — disabled items are skipped. */
function menuItems(popup: HTMLElement | null): HTMLElement[] {
  if (!popup) return [];
  return Array.from(
    popup.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])'),
  );
}

export interface MenuRootProps extends HTMLAttributes<HTMLSpanElement> {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called whenever the open state should change. */
  onOpenChange?: (open: boolean) => void;
}

function MenuRoot({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...rest
}: MenuRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => setEnhanced(supportsAnchoredPopover()), []);

  const autoId = useId();
  const popupId = `${cssSafeId(autoId)}-menu`;
  const anchorName = `--loam-anchor-${popupId}`;

  const openRef = useRef(open);
  openRef.current = open;
  const controlledRef = useRef(false);
  controlledRef.current = openProp !== undefined;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const focusOnOpen = useRef<"first" | "last">("first");

  const setOpen = useCallback(
    (next: boolean) => {
      if (next === openRef.current) return;
      if (!controlledRef.current) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  const closeAndRefocus = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }, [setOpen]);

  const value = useMemo<MenuContextValue>(
    () => ({
      open,
      setOpen,
      triggerRef,
      popupRef,
      popupId,
      anchorName,
      enhanced,
      focusOnOpen,
      closeAndRefocus,
    }),
    [open, setOpen, popupId, anchorName, enhanced, closeAndRefocus],
  );

  return (
    <MenuContext value={value}>
      <span className={cx("loam-Menu", className)} {...rest}>
        {children}
      </span>
    </MenuContext>
  );
}

/** Wiring the Trigger attaches to whatever it renders. */
export interface MenuTriggerRenderProps {
  type: "button";
  popoverTarget: string | undefined;
  "aria-haspopup": "menu";
  "aria-expanded": boolean;
  "aria-controls": string | undefined;
  /** Styling hook — present while the menu is open. */
  "data-popup-open": "true" | undefined;
  style: CSSProperties;
  onClick: (e: ReactMouseEvent<Element>) => void;
  onKeyDown: (e: ReactKeyboardEvent<Element>) => void;
  ref: Ref<HTMLButtonElement>;
}

export interface MenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Substitute your own element as the trigger, or pass a function receiving
   * the wiring props. Without it, the Trigger renders a LoamUI Button, which
   * adapts to its context like any Button.
   */
  render?: RenderProp<MenuTriggerRenderProps>;
}

function MenuTrigger({ render, children, ...rest }: MenuTriggerProps) {
  const ctx = useMenuContext("Menu.Trigger");

  const triggerProps: MenuTriggerRenderProps = {
    ref: ctx.triggerRef,
    type: "button",
    popoverTarget: ctx.enhanced ? ctx.popupId : undefined,
    "aria-haspopup": "menu",
    "aria-expanded": ctx.open,
    "aria-controls": ctx.open ? ctx.popupId : undefined,
    "data-popup-open": ctx.open ? "true" : undefined,
    style: { anchorName: ctx.anchorName } as CSSProperties,
    onClick: () => {
      ctx.focusOnOpen.current = "first";
      if (!ctx.enhanced) ctx.setOpen(!ctx.open);
    },
    // APG menu button: ArrowDown opens focusing the first item, ArrowUp the
    // last. (Enter/Space are native button activation → onClick.)
    onKeyDown: (e) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      ctx.focusOnOpen.current = e.key === "ArrowDown" ? "first" : "last";
      ctx.setOpen(true);
    },
  };

  return render ? (
    <>{renderWithProps(render, mergeProps(triggerProps, { children, ...rest }))}</>
  ) : (
    <>{renderWithProps(<Button {...rest}>{children}</Button>, triggerProps)}</>
  );
}

export interface MenuPopupProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  /** Which side of the trigger the menu opens toward. @default "bottom" */
  position?: "bottom" | "top";
}

function MenuPopup({
  position = "bottom",
  className,
  children,
  style,
  onKeyDown,
  ref: refProp,
  ...rest
}: MenuPopupProps) {
  const ctx = useMenuContext("Menu.Popup");
  const { open, setOpen, enhanced } = ctx;
  const ref = ctx.popupRef;
  const composedRef = useMemo(() => composeRefs(refProp, ref), [refProp, ref]);
  const typeahead = useRef({ query: "", at: 0 });

  // Enhanced path: reconcile React state with the native popover state (see
  // Popover for why there is deliberately no dependency array).
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
  }, [enhanced, setOpen, ref]);

  // Focus the first/last item on open; return focus to the trigger on close
  // when it would otherwise be lost. Menus move focus — they never trap it.
  const prevOpenRef = useRef(open);
  useEffect(() => {
    const el = ref.current;
    const was = prevOpenRef.current;
    prevOpenRef.current = open;
    if (!el || was === open) return;
    if (open) {
      const items = menuItems(el);
      const target = ctx.focusOnOpen.current === "last" ? items[items.length - 1] : items[0];
      (target ?? el).focus({ preventScroll: true });
    } else if (el.contains(document.activeElement) || document.activeElement === document.body) {
      ctx.triggerRef.current?.focus({ preventScroll: true });
    }
  }, [open, ctx.focusOnOpen, ctx.triggerRef, ref]);

  useEffect(() => {
    if (enhanced || !open) return;
    const onPointer = (e: MouseEvent) => {
      const root = ref.current?.closest(".loam-Menu");
      if (root && !root.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") ctx.closeAndRefocus();
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [enhanced, open, setOpen, ctx, ref]);

  // The APG keyboard pattern, on real focus (items rove with tabIndex -1).
  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    const items = menuItems(ref.current);
    if (items.length === 0) return;
    const current = items.indexOf(document.activeElement as HTMLElement);

    const focusAt = (i: number) => {
      e.preventDefault();
      items[(i + items.length) % items.length]?.focus();
    };

    switch (e.key) {
      case "ArrowDown":
        focusAt(current + 1);
        break;
      case "ArrowUp":
        focusAt(current - 1);
        break;
      case "Home":
        focusAt(0);
        break;
      case "End":
        focusAt(items.length - 1);
        break;
      case "Tab":
        // Tab leaves the menu: close it and let focus move on naturally.
        setOpen(false);
        break;
      default: {
        // Typeahead: printable characters accumulate for half a second and
        // jump to the next item whose text starts with the query.
        if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
        const now = Date.now();
        const t = typeahead.current;
        t.query = (now - t.at < 500 ? t.query : "") + e.key.toLowerCase();
        t.at = now;
        const from = current >= 0 ? current + (t.query.length === 1 ? 1 : 0) : 0;
        for (let i = 0; i < items.length; i++) {
          const item = items[(from + i) % items.length];
          if (item?.textContent?.trim().toLowerCase().startsWith(t.query)) {
            e.preventDefault();
            item.focus();
            break;
          }
        }
      }
    }
  };

  return (
    // rest cannot override what follows: role, the roving tabIndex and
    // the typeahead handlers are the menu pattern itself.
    <div
      {...rest}
      ref={composedRef}
      id={ctx.popupId}
      role="menu"
      tabIndex={-1}
      popover={enhanced ? "auto" : undefined}
      hidden={enhanced || open ? undefined : true}
      className={cx("loam-Menu-popup", className)}
      data-position={position}
      data-open={open || undefined}
      style={{ ...style, positionAnchor: ctx.anchorName } as CSSProperties}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

/** Wiring an Item attaches to whatever it renders. */
export interface MenuItemRenderProps {
  role: "menuitem";
  tabIndex: -1;
  "aria-disabled": true | undefined;
  onClick: (e: ReactMouseEvent<Element>) => void;
  children?: ReactNode;
  className?: string;
}

export interface MenuItemProps extends Omit<HTMLAttributes<HTMLElement>, "onClick"> {
  /** Renders the item as a link instead of a button. */
  href?: string;
  /** The action. Runs before the menu closes. */
  onClick?: (e: ReactMouseEvent<Element>) => void;
  /** Close the menu when the item is activated. @default true */
  closeOnClick?: boolean;
  /** Disable without removing from the accessibility tree. */
  disabled?: boolean;
  /** Substitute your own element (e.g. a router Link). */
  render?: RenderProp<MenuItemRenderProps>;
  children?: ReactNode;
}

function MenuItem({
  href,
  onClick,
  closeOnClick = true,
  disabled,
  render,
  className,
  children,
  ...rest
}: MenuItemProps) {
  const ctx = useMenuContext("Menu.Item");

  const itemProps: MenuItemRenderProps = {
    role: "menuitem",
    tabIndex: -1,
    "aria-disabled": disabled || undefined,
    onClick: (e) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
      if (closeOnClick) ctx.closeAndRefocus();
    },
  };

  const target =
    render ??
    (href !== undefined ? (
      <a
        href={href}
        className={cx("item", className)}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    ) : (
      <button
        type="button"
        className={cx("item", className)}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    ));
  // The render path must honor the same merge contract as the built-ins:
  // consumer children/className/rest ride along with the wiring.
  return (
    <>
      {render
        ? renderWithProps(render, {
            ...rest,
            ...itemProps,
            children,
            className: cx("item", className),
          })
        : renderWithProps(target, itemProps)}
    </>
  );
}

interface MenuGroupContextValue {
  labelId: string;
  registerLabel: () => () => void;
  hasLabel: boolean;
}

const MenuGroupContext = createContext<MenuGroupContextValue | null>(null);

export interface MenuGroupProps extends HTMLAttributes<HTMLDivElement> {}

function MenuGroup({ className, children, ...rest }: MenuGroupProps) {
  const autoId = useId();
  const labelId = `${autoId}-menugroup`;
  const [labelCount, setLabelCount] = useState(0);
  const registerLabel = useCallback(() => {
    setLabelCount((n) => n + 1);
    return () => setLabelCount((n) => n - 1);
  }, []);
  const value = useMemo(
    () => ({ labelId, registerLabel, hasLabel: labelCount > 0 }),
    [labelId, registerLabel, labelCount],
  );
  return (
    <MenuGroupContext value={value}>
      <div
        role="group"
        aria-labelledby={labelCount > 0 ? labelId : undefined}
        className={className}
        {...rest}
      >
        {children}
      </div>
    </MenuGroupContext>
  );
}

export interface MenuGroupLabelProps extends HTMLAttributes<HTMLDivElement> {}

function MenuGroupLabel({ className, children, ...rest }: MenuGroupLabelProps) {
  const group = useContext(MenuGroupContext);
  if (!group) {
    throw new Error("Menu.GroupLabel must be rendered inside <Menu.Group>.");
  }
  const { registerLabel } = group;
  useEffect(() => registerLabel(), [registerLabel]);
  return (
    <div id={group.labelId} className={cx("group-label", className)} {...rest}>
      {children}
    </div>
  );
}

export interface MenuSeparatorProps extends HTMLAttributes<HTMLHRElement> {}

function MenuSeparator({ className, ...rest }: MenuSeparatorProps) {
  // A real <hr> — the platform's separator role, no ARIA needed.
  return <hr className={className} {...rest} />;
}

export const Menu = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Popup: MenuPopup,
  Item: MenuItem,
  Group: MenuGroup,
  GroupLabel: MenuGroupLabel,
  Separator: MenuSeparator,
};
