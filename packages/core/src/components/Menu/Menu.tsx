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
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { composeRefs, mergeProps, renderWithProps } from "../../render";
import type { RenderProp } from "../../render";
import { popupProps, popupTriggerProps, usePopup, usePopupRoot } from "../../use-popup";
import type { PopupState, PopupTriggerRenderProps } from "../../use-popup";

import { Button } from "../Button/Button";

/**
 * A list of actions opened from a trigger, composed from parts.
 *
 * The Popup renders with the native `popover` attribute (top layer, light
 * dismiss, Escape) and CSS anchor positioning where supported, falling back
 * to a wrapper-anchored panel elsewhere: the same engine as Popover. On top
 * of it sits the APG menu-button pattern: ArrowDown/ArrowUp from the trigger
 * open and focus the first/last item, arrow keys rove focus through the
 * items (looping), Home/End jump, typing jumps to the next matching item,
 * and activating an item closes the menu and returns focus to the trigger.
 *
 * Menus are for *actions* (rename, duplicate, delete…). For choosing a value
 * that persists, use Select; for navigation, prefer visible links. A setting
 * that lives in the menu is a `CheckboxItem` (on/off) or a `RadioGroup` of
 * `RadioItem`s (one of a set).
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

interface MenuContextValue extends PopupState {
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

/** The focusable items of every kind, in DOM order; disabled items are skipped. */
function menuItems(popup: HTMLElement | null): HTMLElement[] {
  if (!popup) return [];
  return Array.from(
    popup.querySelectorAll<HTMLElement>('[role^="menuitem"]:not([aria-disabled="true"])'),
  );
}

export interface MenuRootProps extends PartProps<"span"> {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called whenever the open state should change. */
  onOpenChange?: (open: boolean) => void;
}

function MenuRoot({
  open,
  defaultOpen,
  onOpenChange,
  className,
  children,
  ...rest
}: MenuRootProps) {
  const popup = usePopupRoot("menu", { open, defaultOpen, onOpenChange });
  const focusOnOpen = useRef<"first" | "last">("first");
  const { setOpen, triggerRef } = popup;

  const closeAndRefocus = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }, [setOpen, triggerRef]);

  const value = useMemo<MenuContextValue>(
    () => ({ ...popup, focusOnOpen, closeAndRefocus }),
    [popup, closeAndRefocus],
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
export interface MenuTriggerRenderProps extends PopupTriggerRenderProps {
  "aria-haspopup": "menu";
  onKeyDown: (e: ReactKeyboardEvent<Element>) => void;
}

export interface MenuTriggerProps extends PartProps<"button"> {
  /**
   * Substitute your own element as the trigger, or pass a function receiving
   * the wiring props. Without it, the Trigger renders a LoamUI Button, which
   * adapts to its context like any Button.
   */
  render?: RenderProp<MenuTriggerRenderProps>;
}

function MenuTrigger({ render, children, ...rest }: MenuTriggerProps) {
  const ctx = useMenuContext("Menu.Trigger");
  const base = popupTriggerProps(ctx);

  const triggerProps: MenuTriggerRenderProps = {
    ...base,
    "aria-haspopup": "menu",
    onClick: (e) => {
      ctx.focusOnOpen.current = "first";
      base.onClick(e);
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

export interface MenuPopupProps extends PartProps<"div"> {
  /** Which side of the trigger the menu opens toward. @default "bottom" */
  side?: "bottom" | "top";
}

function MenuPopup({
  side = "bottom",
  className,
  children,
  style,
  onKeyDown,
  ref: refProp,
  ...rest
}: MenuPopupProps) {
  const ctx = useMenuContext("Menu.Popup");
  const ref = ctx.popupRef;
  const composedRef = useMemo(() => composeRefs(refProp, ref), [refProp, ref]);
  const typeahead = useRef({ query: "", at: 0 });

  // Focus the first/last item on open; return focus to the trigger on close
  // when it would otherwise be lost. Menus move focus; they never trap it.
  usePopup(ctx, {
    rootClass: "loam-Menu",
    focusOnOpen: (el) => {
      const items = menuItems(el);
      const target = ctx.focusOnOpen.current === "last" ? items[items.length - 1] : items[0];
      (target ?? el).focus({ preventScroll: true });
    },
    onEscape: ctx.closeAndRefocus,
  });

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
        ctx.setOpen(false);
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
      {...popupProps(ctx, side, style)}
      ref={composedRef}
      role="menu"
      tabIndex={-1}
      className={cx("loam-Menu-popup", className)}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

/** Wiring an Item attaches to whatever it renders. */
export interface MenuItemRenderProps {
  role: "menuitem" | "menuitemcheckbox" | "menuitemradio";
  tabIndex: -1;
  "aria-disabled": true | undefined;
  "aria-checked": boolean | undefined;
  onClick: (e: ReactMouseEvent<Element>) => void;
  children?: ReactNode;
  className?: string;
}

interface ItemBaseProps extends Omit<PartProps<"button">, "onClick" | "role"> {
  /** The action. Runs before the menu closes. */
  onClick?: (e: ReactMouseEvent<Element>) => void;
  /** Close the menu when the item is activated. */
  closeOnClick?: boolean;
  /** Disable without removing from the accessibility tree. */
  disabled?: boolean;
  /** Substitute your own element (e.g. a router Link). */
  render?: RenderProp<MenuItemRenderProps>;
  children?: ReactNode;
}

export interface MenuItemProps extends ItemBaseProps {
  /** Renders the item as a link instead of a button. */
  href?: string;
  /** Close the menu when the item is activated. @default true */
  closeOnClick?: boolean;
}

/**
 * The item anatomy every kind shares: a `<button>` (or `<a>` via `href`)
 * carrying the role, the roving tabIndex, and the activate-then-close flow.
 */
function ItemBase({
  kind: role,
  checked,
  href,
  onClick,
  closeOnClick,
  disabled,
  render,
  className,
  children,
  ...rest
}: ItemBaseProps & {
  kind: MenuItemRenderProps["role"];
  checked?: boolean;
  href?: string;
}) {
  const ctx = useMenuContext(
    `Menu.${role === "menuitem" ? "Item" : role === "menuitemcheckbox" ? "CheckboxItem" : "RadioItem"}`,
  );

  const itemProps: MenuItemRenderProps = {
    role,
    tabIndex: -1,
    "aria-disabled": disabled || undefined,
    "aria-checked": checked,
    onClick: (e) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
      if (closeOnClick) ctx.closeAndRefocus();
    },
  };

  // The render path must honor the same merge contract as the built-ins:
  // consumer children/className/rest ride along with the wiring.
  if (render) {
    return (
      <>
        {renderWithProps(render, {
          ...rest,
          ...itemProps,
          children,
          className: cx("item", className),
        })}
      </>
    );
  }
  const target =
    href !== undefined ? (
      <a href={href} className={cx("item", className)} {...(rest as PartProps<"a">)}>
        {children}
      </a>
    ) : (
      <button type="button" className={cx("item", className)} {...rest}>
        {children}
      </button>
    );
  return <>{renderWithProps(target, itemProps)}</>;
}

function MenuItem({ closeOnClick = true, ...props }: MenuItemProps) {
  return <ItemBase kind="menuitem" closeOnClick={closeOnClick} {...props} />;
}

export interface MenuCheckboxItemProps extends ItemBaseProps {
  /** Controlled checked state. */
  checked?: boolean;
  /** Initial checked state when uncontrolled. */
  defaultChecked?: boolean;
  /** Fires with the next checked state on activation. */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Close the menu when the item is activated. Off by default: a setting is
   * usually one of several the user adjusts in one visit. @default false
   */
  closeOnClick?: boolean;
}

/**
 * An on/off setting inside the menu (`role="menuitemcheckbox"`). The check
 * glyph is drawn by the stylesheet from `aria-checked`.
 */
function MenuCheckboxItem({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  onClick,
  closeOnClick = false,
  ...props
}: MenuCheckboxItemProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const checked = checkedProp ?? uncontrolled;
  return (
    <ItemBase
      kind="menuitemcheckbox"
      checked={checked}
      closeOnClick={closeOnClick}
      onClick={(e) => {
        onClick?.(e);
        if (checkedProp === undefined) setUncontrolled(!checked);
        onCheckedChange?.(!checked);
      }}
      {...props}
    />
  );
}

interface MenuRadioGroupContextValue {
  value: string | undefined;
  select: (value: string) => void;
}

const MenuRadioGroupContext = createContext<MenuRadioGroupContextValue | null>(null);

interface MenuGroupContextValue {
  labelId: string;
  registerLabel: () => () => void;
}

const MenuGroupContext = createContext<MenuGroupContextValue | null>(null);

/** A group's label registration: `aria-labelledby` only once a GroupLabel exists. */
function useGroupLabel() {
  const autoId = useId();
  const labelId = `${autoId}-menugroup`;
  const [labelCount, setLabelCount] = useState(0);
  const registerLabel = useCallback(() => {
    setLabelCount((n) => n + 1);
    return () => setLabelCount((n) => n - 1);
  }, []);
  const value = useMemo(() => ({ labelId, registerLabel }), [labelId, registerLabel]);
  return { value, labelledBy: labelCount > 0 ? labelId : undefined };
}

export interface MenuGroupProps extends PartProps<"div"> {}

function MenuGroup({ className, children, ...rest }: MenuGroupProps) {
  const { value, labelledBy } = useGroupLabel();
  return (
    <MenuGroupContext value={value}>
      <div role="group" aria-labelledby={labelledBy} className={className} {...rest}>
        {children}
      </div>
    </MenuGroupContext>
  );
}

export interface MenuRadioGroupProps extends PartProps<"div"> {
  /** Controlled selected value. */
  value?: string;
  /** Initial selected value when uncontrolled. */
  defaultValue?: string;
  /** Fires with the value of the item activated. */
  onValueChange?: (value: string) => void;
}

/**
 * One-of-a-set settings inside the menu (`role="group"` of
 * `role="menuitemradio"` items). A `Menu.GroupLabel` inside labels it.
 */
function MenuRadioGroup({
  value: valueProp,
  defaultValue,
  onValueChange,
  className,
  children,
  ...rest
}: MenuRadioGroupProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = valueProp ?? uncontrolled;
  const controlled = valueProp !== undefined;
  const select = useCallback(
    (next: string) => {
      if (!controlled) setUncontrolled(next);
      onValueChange?.(next);
    },
    [controlled, onValueChange],
  );
  const radio = useMemo(() => ({ value, select }), [value, select]);
  const { value: group, labelledBy } = useGroupLabel();
  return (
    <MenuGroupContext value={group}>
      <MenuRadioGroupContext value={radio}>
        <div role="group" aria-labelledby={labelledBy} className={className} {...rest}>
          {children}
        </div>
      </MenuRadioGroupContext>
    </MenuGroupContext>
  );
}

export interface MenuRadioItemProps extends ItemBaseProps {
  /** The value this item selects. */
  value: string;
  /**
   * Close the menu when the item is activated. Off by default, as for
   * CheckboxItem. @default false
   */
  closeOnClick?: boolean;
}

/** One choice of a `Menu.RadioGroup` (`role="menuitemradio"`). */
function MenuRadioItem({ value, onClick, closeOnClick = false, ...props }: MenuRadioItemProps) {
  const group = useContext(MenuRadioGroupContext);
  if (!group) {
    throw new Error("Menu.RadioItem must be rendered inside <Menu.RadioGroup>.");
  }
  return (
    <ItemBase
      kind="menuitemradio"
      checked={group.value === value}
      closeOnClick={closeOnClick}
      onClick={(e) => {
        onClick?.(e);
        group.select(value);
      }}
      {...props}
    />
  );
}

export interface MenuGroupLabelProps extends PartProps<"div"> {}

function MenuGroupLabel({ className, children, ...rest }: MenuGroupLabelProps) {
  const group = useContext(MenuGroupContext);
  if (!group) {
    throw new Error("Menu.GroupLabel must be rendered inside <Menu.Group> or <Menu.RadioGroup>.");
  }
  const { registerLabel } = group;
  useEffect(() => registerLabel(), [registerLabel]);
  return (
    <div id={group.labelId} className={cx("group-label", className)} {...rest}>
      {children}
    </div>
  );
}

export interface MenuSeparatorProps extends PartProps<"hr"> {}

function MenuSeparator({ className, ...rest }: MenuSeparatorProps) {
  // A real <hr>: the platform's separator role, no ARIA needed.
  return <hr className={className} {...rest} />;
}

export const Menu = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Popup: MenuPopup,
  Item: MenuItem,
  CheckboxItem: MenuCheckboxItem,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  Group: MenuGroup,
  GroupLabel: MenuGroupLabel,
  Separator: MenuSeparator,
};
