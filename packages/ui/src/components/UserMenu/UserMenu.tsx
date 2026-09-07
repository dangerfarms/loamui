"use client";

import type { ReactNode, Ref } from "react";
import { createContext, useContext, useMemo } from "react";
import { Avatar, Menu, cx } from "@loamui/core";
import type {
  MenuItemProps,
  MenuPopupProps,
  MenuRootProps,
  MenuTriggerProps,
  PartProps,
} from "@loamui/core";
import { useNamePart, useNamedRoot } from "../../naming";

/**
 * The signed-in person's menu: an avatar button that opens a menu with the
 * person's name and email at the top and their account actions below,
 * ending with sign out.
 *
 * It is a core `Menu` with a specific trigger and a header, nothing more:
 * arrow keys, typeahead, Escape and focus return are Menu's, untouched. The
 * trigger is named for the person ("Account menu for Imogen Hartley") by
 * visually hidden text, so a screen reader hears whose menu it is rather
 * than "button"; the avatar inside is decorative. The header names the
 * menu, so opening it announces the account it belongs to. `SignOut` is a
 * submit button in a `method="post"` form when given an `action`, because
 * leaving a session changes state on the server and belongs in a POST, not
 * a GET link a crawler or a prefetch could follow.
 *
 * The menu needs JavaScript to open, as every menu does; keep the account
 * page reachable from the navigation so nothing is lost without it.
 *
 * ```tsx
 * <UserMenu.Root>
 *   <UserMenu.Trigger name="Imogen Hartley" src="/imogen.jpg" />
 *   <UserMenu.Popup>
 *     <UserMenu.Header>
 *       <UserMenu.Name>Imogen Hartley</UserMenu.Name>
 *       <UserMenu.Email>imogen@example.com</UserMenu.Email>
 *     </UserMenu.Header>
 *     <UserMenu.Item href="/account">Profile</UserMenu.Item>
 *     <UserMenu.Item href="/settings">Settings</UserMenu.Item>
 *     <UserMenu.Separator />
 *     <UserMenu.SignOut action="/sign-out" />
 *   </UserMenu.Popup>
 * </UserMenu.Root>
 * ```
 */

export interface UserMenuRootProps extends MenuRootProps {
  /** Applied to the composition's own `span`; every other prop reaches the core `Menu.Root`. */
  className?: string;
  ref?: Ref<HTMLSpanElement>;
}

/**
 * The composition's own `span`, for consumers and tests, around the core
 * `Menu.Root`, which is left exactly as core renders it: a composition's
 * class never rides on a core part's root.
 */
function UserMenuRoot({ className, children, ref, ...rest }: UserMenuRootProps) {
  return (
    <span ref={ref} className={cx("loam-UserMenu", className)}>
      <Menu.Root {...rest}>{children}</Menu.Root>
    </span>
  );
}

/** The words the trigger says on its own, each with an English default. */
export interface UserMenuLabels {
  /**
   * The trigger's hidden accessible name, from the person's name.
   * @default (name) => `Account menu for ${name}`
   */
  trigger?: (name: string) => ReactNode;
}

const DEFAULT_LABELS: Required<UserMenuLabels> = {
  trigger: (name) => `Account menu for ${name}`,
};

export interface UserMenuTriggerProps extends Omit<MenuTriggerProps, "render"> {
  /** The person's name: the avatar's initials and the button's accessible name. */
  name: string;
  /** The person's picture. Falls back to initials when absent or broken. */
  src?: string;
  /** The trigger's own words. */
  labels?: UserMenuLabels;
  /** The hidden accessible name, in place of `labels.trigger(name)`. */
  children?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

/**
 * The avatar button. A bare `button` through Menu's `render`, not the
 * default `Button`: a padded, tinted pill around a round avatar is not the
 * shape of an account control, and the trigger has no text to give a
 * Button its size. The name is real text, visually hidden, because it is
 * the accessible name, it translates, and it shows in reader mode; the
 * `Avatar` is hidden from assistive technology so the name is heard once.
 */
function UserMenuTrigger({
  name,
  src,
  labels,
  className,
  children,
  ref,
  ...rest
}: UserMenuTriggerProps) {
  const trigger = labels?.trigger ?? DEFAULT_LABELS.trigger;
  // The label rides on the element itself, so the button is never without
  // one. The consumer's ref merges with Menu's own, so focus still returns
  // to the trigger on close.
  return (
    <Menu.Trigger
      render={
        <button type="button" className={cx("loam-UserMenu-trigger", className)} ref={ref}>
          <Avatar name={name} src={src} aria-hidden />
          <span className="loam-VisuallyHidden">{children ?? trigger(name)}</span>
        </button>
      }
      {...rest}
    />
  );
}

interface UserMenuPopupContextValue {
  nameId: string;
  register: (id: string) => () => void;
}

const UserMenuPopupContext = createContext<UserMenuPopupContextValue | null>(null);

export interface UserMenuPopupProps extends MenuPopupProps {}

/**
 * The core `Menu.Popup`, left as core renders it and named by the Header
 * from the first render; the reference is dropped after mount when no
 * Header is rendered, so a popup without one carries no dangling
 * reference. Your own `aria-label` or `aria-labelledby` wins.
 */
function UserMenuPopup({ children, ...rest }: UserMenuPopupProps) {
  const { nameId, register, labelling } = useNamedRoot(rest);
  const value = useMemo<UserMenuPopupContextValue>(
    () => ({ nameId, register }),
    [nameId, register],
  );
  return (
    <UserMenuPopupContext value={value}>
      <Menu.Popup {...labelling} {...rest}>
        {children}
      </Menu.Popup>
    </UserMenuPopupContext>
  );
}

export interface UserMenuHeaderProps extends PartProps<"div"> {
  /** A `UserMenu.Name`, then a `UserMenu.Email`. */
  children?: ReactNode;
}

/**
 * Who is signed in: the Name and, beneath it, the Email. Plain text before
 * the items, not an item itself, so arrow keys skip it; it is heard as the
 * menu's name instead. Its own scope root, since the popup around it is
 * core's and carries no class of the composition's.
 */
function UserMenuHeader({ id, className, children, ref, ...rest }: UserMenuHeaderProps) {
  const ctx = useContext(UserMenuPopupContext);
  if (!ctx) {
    throw new Error("UserMenu.Header must be rendered inside <UserMenu.Popup>.");
  }
  const headerId = useNamePart(ctx, id);
  return (
    <div ref={ref} id={headerId} className={cx("loam-UserMenu-header", className)} {...rest}>
      {children}
    </div>
  );
}

export interface UserMenuNameProps extends PartProps<"strong"> {
  children?: ReactNode;
}

/** The person's name, in the Header: a `strong`. */
function UserMenuName({ className, children, ref, ...rest }: UserMenuNameProps) {
  return (
    <strong ref={ref} className={cx("name", className)} {...rest}>
      {children}
    </strong>
  );
}

export interface UserMenuEmailProps extends PartProps<"p"> {
  children?: ReactNode;
}

/** The account's email address, under the Name: the line that tells two accounts apart. */
function UserMenuEmail({ className, children, ref, ...rest }: UserMenuEmailProps) {
  return (
    <p ref={ref} className={cx("email", className)} {...rest}>
      {children}
    </p>
  );
}

export interface UserMenuSignOutProps extends Omit<MenuItemProps, "href" | "render"> {
  /**
   * Where signing out is posted. With it, the item is a submit button in a
   * `method="post"` form, so signing out is a request the server sees as
   * one; without it, the item is a button and `onClick` does the work.
   */
  action?: string;
  /** The label. @default "Sign out" */
  children?: ReactNode;
}

/**
 * The last item. Signing out ends a session, so with an `action` it is a
 * POST: a link would be a GET, and a GET that changes state gets followed
 * by prefetchers and crawlers. Hidden inputs a server wants (a CSRF token)
 * are the consumer's: render a plain `Item` as a submit button with a
 * `form` attribute pointing at a form of your own.
 */
function UserMenuSignOut({ action, children = "Sign out", ...rest }: UserMenuSignOutProps) {
  if (action === undefined) {
    return <Menu.Item {...rest}>{children}</Menu.Item>;
  }
  // The form is plumbing around the item; a form has no box of its own to
  // style, so it carries no class.
  return (
    <form method="post" action={action}>
      <Menu.Item render={<button type="submit">{children}</button>} {...rest} />
    </form>
  );
}

export const UserMenu = {
  Root: UserMenuRoot,
  Trigger: UserMenuTrigger,
  Popup: UserMenuPopup,
  Header: UserMenuHeader,
  Name: UserMenuName,
  Email: UserMenuEmail,
  Item: Menu.Item,
  Separator: Menu.Separator,
  SignOut: UserMenuSignOut,
};
