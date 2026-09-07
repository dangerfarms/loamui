"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode, Ref } from "react";
import { Drawer, cx } from "@loamui/core";
import type {
  DrawerCloseProps,
  DrawerPopupProps,
  DrawerRootProps,
  DrawerTitleProps,
  DrawerTriggerProps,
  PartProps,
} from "@loamui/core";

interface MobileNavContextValue {
  open: boolean;
  /** The dialog's id, read from the element once it is mounted, for the Trigger's `aria-controls`. */
  popupId: string | null;
  setPopupId: (id: string | null) => void;
}

const MobileNavContext = createContext<MobileNavContextValue | null>(null);

function useMobileNav(part: string): MobileNavContextValue {
  const ctx = useContext(MobileNavContext);
  if (!ctx) {
    throw new Error(`MobileNav.${part} must be rendered inside <MobileNav.Root>.`);
  }
  return ctx;
}

export interface MobileNavRootProps extends DrawerRootProps, Omit<PartProps<"span">, "children"> {
  /** The Trigger and the Popup. */
  children?: ReactNode;
}

/**
 * Navigation for a narrow viewport: a "Menu" button that opens a panel
 * from the start edge holding the site's links, with the current page
 * marked.
 *
 * It is a core `Drawer` with a specific trigger, a named panel and a list
 * of links, nothing more: the panel is a native `dialog`, so the top
 * layer, focus containment, Escape and focus return to the button on
 * close are the browser's. The button says "Menu" in words, not three
 * lines alone, and reports the panel's state with `aria-expanded`; the
 * panel is named by its Title, or "Navigation" when there is none, so a
 * screen reader hears what opened. The links are yours, `a` (or your
 * router's link) inside each Item, with `aria-current="page"` on the page
 * in view, the same list `SideNav` uses.
 *
 * Where it appears is the consumer's layout, not a prop: put it in
 * `Header.Actions` and hide it, or the inline nav, with a container query
 * on the header. The panel needs JavaScript to open, as every dialog
 * does; keep the same links reachable in the page (a footer, a site map)
 * so nothing is lost without it.
 *
 * ```tsx
 * <MobileNav.Root>
 *   <MobileNav.Trigger />
 *   <MobileNav.Popup>
 *     <MobileNav.Title>Menu</MobileNav.Title>
 *     <MobileNav.List>
 *       <MobileNav.Item><a href="/docs" aria-current="page">Docs</a></MobileNav.Item>
 *       <MobileNav.Item><a href="/pricing">Pricing</a></MobileNav.Item>
 *     </MobileNav.List>
 *     <MobileNav.Close />
 *   </MobileNav.Popup>
 * </MobileNav.Root>
 * ```
 */
function MobileNavRoot({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ref,
  ...rest
}: MobileNavRootProps) {
  // The open state is held here as well as in the Drawer, because the
  // Trigger reports it with aria-expanded and the Drawer keeps its own to
  // itself. Controlled when `open` is given; the Drawer's own native
  // opens and closes flow back through onOpenChange either way.
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = openProp ?? uncontrolled;
  const handleOpenChange = useCallback(
    (next: boolean) => {
      setUncontrolled(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );
  const [popupId, setPopupId] = useState<string | null>(null);
  const value = useMemo<MobileNavContextValue>(
    () => ({ open, popupId, setPopupId }),
    [open, popupId],
  );
  // The composition's own span, for consumers and tests, around the core
  // Drawer.Root, which renders no element of its own.
  return (
    <MobileNavContext value={value}>
      <span ref={ref} className={cx("loam-MobileNav", className)} {...rest}>
        <Drawer.Root open={open} onOpenChange={handleOpenChange}>
          {children}
        </Drawer.Root>
      </span>
    </MobileNavContext>
  );
}

/** The words the trigger says on its own, each with an English default. */
export interface MobileNavTriggerLabels {
  /** The button's visible words, when no children are given. @default "Menu" */
  open?: ReactNode;
}

const DEFAULT_TRIGGER_LABELS: Required<MobileNavTriggerLabels> = {
  open: "Menu",
};

export interface MobileNavTriggerProps extends DrawerTriggerProps {
  /** The trigger's own words. */
  labels?: MobileNavTriggerLabels;
}

/**
 * The button that opens the panel: core `Drawer.Trigger`, a `Button` that
 * says "Menu" in words. It carries `aria-expanded` for the panel's state
 * and `aria-controls` for the panel, once the panel is mounted and its id
 * is known. Your own children replace the words; `render` substitutes the
 * element, as on any core trigger.
 */
function MobileNavTrigger({ labels, children, ...rest }: MobileNavTriggerProps) {
  const { open, popupId } = useMobileNav("Trigger");
  return (
    <Drawer.Trigger aria-expanded={open} aria-controls={popupId ?? undefined} {...rest}>
      {children ?? labels?.open ?? DEFAULT_TRIGGER_LABELS.open}
    </Drawer.Trigger>
  );
}

interface MobileNavPopupContextValue {
  registerTitle: () => () => void;
}

const MobileNavPopupContext = createContext<MobileNavPopupContextValue | null>(null);

/** The words the panel says on its own, each with an English default. */
export interface MobileNavPopupLabels {
  /**
   * The panel's accessible name while no `MobileNav.Title` is rendered.
   * @default "Navigation"
   */
  navigation?: string;
}

const DEFAULT_POPUP_LABELS: Required<MobileNavPopupLabels> = {
  navigation: "Navigation",
};

export interface MobileNavPopupProps extends DrawerPopupProps {
  /** The panel's own words. */
  labels?: MobileNavPopupLabels;
}

/**
 * The panel: core `Drawer.Popup`, anchored to the start edge, left as core
 * renders it. It is named by the Title while one is rendered, the way any
 * Drawer is; without one it carries `labels.navigation` as its
 * `aria-label`, so it is never an anonymous dialog. Your own `aria-label`
 * or `aria-labelledby` wins over both. Every prop, `ref` included, lands
 * on the `dialog`.
 */
function MobileNavPopup({
  labels,
  side = "start",
  ref,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  ...rest
}: MobileNavPopupProps) {
  const { setPopupId } = useMobileNav("Popup");
  const [titled, setTitled] = useState(false);
  const registerTitle = useCallback(() => {
    setTitled(true);
    return () => setTitled(false);
  }, []);
  const value = useMemo<MobileNavPopupContextValue>(() => ({ registerTitle }), [registerTitle]);
  // The Drawer mints the dialog's id; the Trigger's aria-controls reads it
  // from the element.
  const readId = useCallback(
    (node: HTMLDialogElement | null) => setPopupId(node?.id ?? null),
    [setPopupId],
  );
  const dialogRef = useMemo(() => composeRefs(ref, readId), [ref, readId]);
  const named = ariaLabel != null || ariaLabelledby != null;
  return (
    <MobileNavPopupContext value={value}>
      <Drawer.Popup
        side={side}
        ref={dialogRef}
        aria-label={
          named || titled ? ariaLabel : (labels?.navigation ?? DEFAULT_POPUP_LABELS.navigation)
        }
        aria-labelledby={ariaLabelledby}
        {...rest}
      >
        {children}
      </Drawer.Popup>
    </MobileNavPopupContext>
  );
}

/** Both refs receive the dialog: the consumer's and the one that reads its id. */
function composeRefs<T>(a: Ref<T> | undefined, b: Ref<T>): Ref<T> {
  if (!a) return b;
  return (node: T | null) => {
    for (const ref of [a, b]) {
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }
  };
}

export interface MobileNavTitleProps extends DrawerTitleProps {}

/**
 * The panel's heading, core `Drawer.Title`: an `h2` that names the
 * dialog. Put the site's name here, or "Menu".
 */
function MobileNavTitle(props: MobileNavTitleProps) {
  const ctx = useContext(MobileNavPopupContext);
  if (!ctx) {
    throw new Error("MobileNav.Title must be rendered inside <MobileNav.Popup>.");
  }
  const { registerTitle } = ctx;
  // Registered on mount: the Popup's fallback name stands until a Title
  // has rendered, so the dialog is never without one.
  useEffect(() => registerTitle(), [registerTitle]);
  return <Drawer.Title {...props} />;
}

export interface MobileNavListProps extends PartProps<"ul"> {
  /** Items. */
  children?: ReactNode;
}

/** An unordered list with no markers, one link per item, sized for a thumb. */
function MobileNavList({ className, children, ref, ...rest }: MobileNavListProps) {
  return (
    <ul ref={ref} className={cx("loam-MobileNav-list", className)} {...rest}>
      {children}
    </ul>
  );
}

export interface MobileNavItemProps extends PartProps<"li"> {
  /** Your link (`a`, or a router's), with `aria-current="page"` on the page in view. */
  children?: ReactNode;
}

/** One entry, around your link. */
function MobileNavItem({ className, children, ref, ...rest }: MobileNavItemProps) {
  return (
    <li ref={ref} className={className} {...rest}>
      {children}
    </li>
  );
}

/** The words the close button says on its own, each with an English default. */
export interface MobileNavCloseLabels {
  /** The button's visible words, when no children are given. @default "Close" */
  close?: ReactNode;
}

const DEFAULT_CLOSE_LABELS: Required<MobileNavCloseLabels> = {
  close: "Close",
};

export interface MobileNavCloseProps extends DrawerCloseProps {
  /** The button's own words. */
  labels?: MobileNavCloseLabels;
}

/**
 * The button that closes the panel: core `Drawer.Close`, a `Button` that
 * says "Close". Escape and a click outside close the panel as well; this
 * is the visible way, for a thumb.
 */
function MobileNavClose({ labels, children, ...rest }: MobileNavCloseProps) {
  return (
    <Drawer.Close {...rest}>{children ?? labels?.close ?? DEFAULT_CLOSE_LABELS.close}</Drawer.Close>
  );
}

export const MobileNav = {
  Root: MobileNavRoot,
  Trigger: MobileNavTrigger,
  Popup: MobileNavPopup,
  Title: MobileNavTitle,
  List: MobileNavList,
  Item: MobileNavItem,
  Close: MobileNavClose,
};
