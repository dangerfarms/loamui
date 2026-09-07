"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, ReactNode, RefObject } from "react";
import { Button, cx, renderWithProps } from "@loamui/core";
import type { ButtonProps, PartProps, RenderProp } from "@loamui/core";
import { useNamedRoot, useNamePart } from "../../naming";

export type CookieBannerChoice = "accept" | "reject";

interface CookieBannerState {
  /** The form's `action` when the Root was given one; the buttons post to it without JavaScript. */
  action?: string;
  /** True when the Root has a handler to call, so a submit is handled in place. */
  handled: boolean;
  choice: CookieBannerChoice | null;
  /** The button pressed, recorded on click so the submit knows the choice in every browser. */
  pending: RefObject<CookieBannerChoice | null>;
  /** The section, so Hide can find where focus goes once it is gone. */
  root: RefObject<HTMLElement | null>;
  choose: (choice: CookieBannerChoice) => void;
  hide: () => void;
  /** The id the Title takes unless the consumer gives it one; the section points at it. */
  nameId: string;
  /** The Title registers on mount so the section's reference stays honest. */
  register: (id: string) => () => void;
}

const CookieBannerContext = createContext<CookieBannerState | null>(null);

function useCookieBanner(part: string) {
  const ctx = useContext(CookieBannerContext);
  if (!ctx) throw new Error(`CookieBanner.${part} must be rendered inside <CookieBanner.Root>.`);
  return ctx;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, iframe, [contenteditable="true"], [tabindex]:not([tabindex="-1"])';

/**
 * Where focus goes when the banner leaves the page: the next thing the
 * reader could have tabbed to, so they carry on from where they were; the
 * `main` landmark when nothing follows; the body otherwise.
 */
function focusAfter(root: HTMLElement) {
  const doc = root.ownerDocument;
  for (const el of doc.querySelectorAll<HTMLElement>(FOCUSABLE)) {
    if (root.contains(el)) continue;
    if (root.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) {
      el.focus();
      return;
    }
  }
  const main = doc.querySelector<HTMLElement>("main");
  if (main) {
    if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
    main.focus();
  }
}

export interface CookieBannerRootProps extends PartProps<"section"> {
  /**
   * Where the buttons post the choice without JavaScript: the Actions form
   * posts `cookies=accept` or `cookies=reject` here. With JavaScript and a
   * handler the post is replaced by the handler; with JavaScript and no
   * handler the post goes ahead, so a server that records the choice needs
   * nothing else.
   */
  action?: string;
  /** Called when the reader accepts additional cookies. Persist the choice here. */
  onAccept?: () => void;
  /** Called when the reader rejects additional cookies. Persist the choice here. */
  onReject?: () => void;
  /** Controlled: whether the banner (or its confirmation) is shown. Pair with `onOpenChange`. */
  open?: boolean;
  /** Uncontrolled: start shown. @default true */
  defaultOpen?: boolean;
  /** Called with `false` when the reader hides the confirmation. */
  onOpenChange?: (open: boolean) => void;
  /**
   * What replaces the banner after the choice: a `CookieBanner.Confirmation`
   * of your own, with your words and a `CookieBanner.Hide` inside. The
   * default says which choice was made and offers to hide the message.
   */
  confirmation?: ReactNode;
  /**
   * The region's name when there is no Title to name it, and no
   * `aria-labelledby` of your own. @default "Cookies"
   */
  "aria-label"?: string;
  /** The Title, Body and Actions. */
  children?: ReactNode;
}

/**
 * A cookie consent banner: a title, a paragraph or two, and the choices as
 * real buttons. After a choice it becomes a confirmation the reader can
 * hide.
 *
 * It is a `section` named by its Title ("Cookies" when there is none), a
 * region and not a dialog: no focus trap, no backdrop, and the page behind
 * it stays usable, because a choice about cookies should not hold the page
 * hostage. The name is in the server's HTML: the Root mints the id and
 * points `aria-labelledby` at it in the first render, the Title renders
 * it. Render it first inside `body`, so it is the first thing keyboard and
 * screen-reader users meet and they can move past it; it sits in the flow
 * of the page, never over the content. Nothing is pre-ticked and nothing
 * counts as consent except a press of Accept: the buttons are the only way
 * to choose, and scrolling, closing or waiting decide nothing.
 *
 * The choice is yours to keep. `onAccept` and `onReject` fire once; store
 * the answer (a cookie, a request to your server) and do not render the
 * banner again while it stands. The composition holds only what the reader
 * sees: before the choice, the banner; after it, a confirmation ("You've
 * accepted additional cookies. You can change your cookie settings at any
 * time.") with a "Hide this message" button; after that, nothing. The
 * confirmation is a `role="status"` live region mounted empty from the
 * start and filled on the choice, which is what makes it announce; pass
 * one of your own through `confirmation` to change the words. Focus
 * follows the reader: the button they pressed leaves with the banner, so
 * focus moves to the Hide button, and when that leaves too it moves to
 * the next thing they could have tabbed to, or to `main`. `open`,
 * `defaultOpen` and `onOpenChange` control the last step from outside
 * when you need to.
 *
 * The Actions are a `form method="post"` and the two buttons submit it,
 * carrying `name="cookies"` with the values `accept` and `reject`. Give
 * `action` and a reader without JavaScript posts the choice to your
 * server; with JavaScript a handler takes the submit in place and the
 * confirmation swaps in without leaving the page, and with no handler the
 * post goes ahead as it would without script.
 *
 * ```tsx
 * <CookieBanner.Root action="/cookies" onAccept={accept} onReject={reject}>
 *   <CookieBanner.Title>Cookies on this site</CookieBanner.Title>
 *   <CookieBanner.Body>
 *     <p>We use some essential cookies to make this site work.</p>
 *     <p>We'd like to set additional cookies to understand how you use it and improve it.</p>
 *   </CookieBanner.Body>
 *   <CookieBanner.Actions>
 *     <CookieBanner.Accept />
 *     <CookieBanner.Reject />
 *     <a href="/cookies">View cookie settings</a>
 *   </CookieBanner.Actions>
 * </CookieBanner.Root>
 * ```
 */
function CookieBannerRoot({
  action,
  onAccept,
  onReject,
  open,
  defaultOpen = true,
  onOpenChange,
  confirmation,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  children,
  ref,
  ...rest
}: CookieBannerRootProps) {
  const [choice, setChoice] = useState<CookieBannerChoice | null>(null);
  const [ownOpen, setOwnOpen] = useState(defaultOpen);
  const isOpen = open ?? ownOpen;
  const pending = useRef<CookieBannerChoice | null>(null);
  const root = useRef<HTMLElement | null>(null);
  // A name of the consumer's wins; the Title names the region while it is
  // present; "Cookies" is the fallback once the Title has gone with the banner.
  const { nameId, register, labelling } = useNamedRoot(
    { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy },
    "Cookies", // i18n-default: the consumer's aria-label replaces it
  );
  const handled = onAccept != null || onReject != null;

  const state = useMemo<CookieBannerState>(
    () => ({
      action,
      handled,
      choice,
      pending,
      root,
      choose(next) {
        setChoice(next);
        if (next === "accept") onAccept?.();
        else onReject?.();
      },
      hide() {
        // The section is still in the page here; focus moves before it goes.
        if (root.current) focusAfter(root.current);
        setOwnOpen(false);
        onOpenChange?.(false);
      },
      nameId,
      register,
    }),
    [action, handled, choice, onAccept, onReject, onOpenChange, nameId, register],
  );

  if (!isOpen) return null;

  return (
    <section
      ref={(node) => {
        root.current = node;
        if (typeof ref === "function") return ref(node);
        if (ref) ref.current = node;
      }}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      {...labelling}
      className={cx("loam-CookieBanner", className)}
      {...rest}
    >
      <CookieBannerContext value={state}>
        {choice === null && <div className="inner">{children}</div>}
        {confirmation ?? <CookieBannerConfirmation />}
      </CookieBannerContext>
    </section>
  );
}

export interface CookieBannerTitleProps extends PartProps<"h2"> {
  /**
   * Render as a different heading: `render={<h3 />}` when the page's
   * outline needs it. The part's classes and attributes merge onto the
   * element it renders, the same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/**
 * The banner's heading. An `h2` by default; pass `render={<h3 />}` to
 * change the level. Its id (yours if you pass one, the composition's
 * otherwise) is what the section's `aria-labelledby` points at.
 */
function CookieBannerTitle({
  render,
  className,
  children,
  ref,
  id,
  ...rest
}: CookieBannerTitleProps) {
  const ctx = useCookieBanner("Title");
  const titleId = useNamePart(ctx, id);
  const props = { ref, id: titleId, className: cx("title", className), ...rest };
  if (render) return <>{renderWithProps(render, { ...props, children })}</>;
  return <h2 {...props}>{children}</h2>;
}

export interface CookieBannerBodyProps extends PartProps<"div"> {
  /** One or two paragraphs: what the essential cookies do, and what the additional ones would. */
  children?: ReactNode;
}

/** The explanation: one or two paragraphs, held to a readable measure. */
function CookieBannerBody({ className, children, ref, ...rest }: CookieBannerBodyProps) {
  return (
    <div ref={ref} className={cx("body", className)} {...rest}>
      {children}
    </div>
  );
}

export interface CookieBannerActionsProps extends Omit<PartProps<"form">, "action" | "method"> {
  /** `CookieBanner.Accept`, `CookieBanner.Reject` and a link to the settings page. */
  children?: ReactNode;
}

/**
 * The wrapping row of choices: a `form method="post"` whose action is the
 * Root's, so the choice reaches your server without JavaScript. With a
 * handler on the Root the submit is taken in place, the way a dialog's
 * form is; without one it goes ahead.
 */
function CookieBannerActions({
  className,
  children,
  onSubmit,
  ref,
  ...rest
}: CookieBannerActionsProps) {
  const { action, handled, pending, choose } = useCookieBanner("Actions");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    onSubmit?.(event);
    if (event.defaultPrevented) return;
    // No handler and somewhere to post: the server records the choice.
    if (!handled && action) return;
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    const value = submitter instanceof HTMLButtonElement ? submitter.value : "";
    const choice = value === "accept" || value === "reject" ? value : pending.current;
    if (choice) choose(choice);
  }

  return (
    <form
      ref={ref}
      method="post"
      action={action}
      onSubmit={handleSubmit}
      className={cx("actions", className)}
      {...rest}
    >
      {children}
    </form>
  );
}

export interface CookieBannerChoiceProps extends Omit<ButtonProps, "name" | "type" | "value"> {
  /** The label. Say what the reader is choosing, not "OK" or "Got it". */
  children?: ReactNode;
}

/**
 * The accept button, "Accept additional cookies". A core Button carrying
 * `name="cookies"` and `value="accept"`, a submit inside the Actions form.
 */
function CookieBannerAccept({
  children = "Accept additional cookies",
  onClick,
  ...rest
}: CookieBannerChoiceProps) {
  const { pending } = useCookieBanner("Accept");
  return (
    <Button
      name="cookies"
      value="accept"
      type="submit"
      onClick={(event) => {
        pending.current = "accept";
        onClick?.(event);
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}

/**
 * The reject button, "Reject additional cookies". A core Button carrying
 * `name="cookies"` and `value="reject"`, a submit inside the Actions form.
 */
function CookieBannerReject({
  children = "Reject additional cookies",
  onClick,
  ...rest
}: CookieBannerChoiceProps) {
  const { pending } = useCookieBanner("Reject");
  return (
    <Button
      name="cookies"
      value="reject"
      type="submit"
      onClick={(event) => {
        pending.current = "reject";
        onClick?.(event);
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}

export interface CookieBannerConfirmationProps extends PartProps<"div"> {
  /**
   * The message and a `CookieBanner.Hide`. Defaults to "You've accepted
   * (or rejected) additional cookies. You can change your cookie settings
   * at any time." and the Hide button.
   */
  children?: ReactNode;
}

/**
 * What replaces the banner once the reader has chosen: a `role="status"`
 * live region holding the sentence and a Hide button. It is mounted empty
 * with the banner and filled on the choice, because a live region that
 * arrives with its content already in it is not announced. On the choice
 * focus moves here, to the Hide button when there is one and to the
 * region itself otherwise, because the button the reader pressed has gone
 * with the banner. The Root renders it; pass one through the Root's
 * `confirmation` prop only to change the words, and include a
 * `CookieBanner.Hide` when you do.
 */
function CookieBannerConfirmation({
  className,
  children,
  ref,
  ...rest
}: CookieBannerConfirmationProps) {
  const { choice } = useCookieBanner("Confirmation");
  const own = useRef<HTMLDivElement | null>(null);
  const verb = choice === "accept" ? "accepted" : "rejected";

  useEffect(() => {
    if (choice === null || !own.current) return;
    const target = own.current.querySelector<HTMLElement>("button") ?? own.current;
    target.focus();
  }, [choice]);

  return (
    <div
      ref={(node) => {
        own.current = node;
        if (typeof ref === "function") return ref(node);
        if (ref) ref.current = node;
      }}
      role="status"
      tabIndex={-1}
      className={cx("confirmation", className)}
      {...rest}
    >
      {choice !== null &&
        (children ?? (
          <>
            <p>
              You've {verb} additional cookies. You can change your cookie settings at any time.
            </p>
            <CookieBannerHide />
          </>
        ))}
    </div>
  );
}

export interface CookieBannerHideProps extends ButtonProps {
  /** The label. @default "Hide this message" */
  children?: ReactNode;
}

/**
 * The button that removes the confirmation, "Hide this message". Before
 * the region goes, focus moves on to the next thing the reader could have
 * tabbed to, or to `main` when nothing follows.
 */
function CookieBannerHide({
  children = "Hide this message",
  onClick,
  ...rest
}: CookieBannerHideProps) {
  const { hide } = useCookieBanner("Hide");
  return (
    <Button
      onClick={(event) => {
        onClick?.(event);
        hide();
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}

export const CookieBanner = {
  Root: CookieBannerRoot,
  Title: CookieBannerTitle,
  Body: CookieBannerBody,
  Actions: CookieBannerActions,
  Accept: CookieBannerAccept,
  Reject: CookieBannerReject,
  Confirmation: CookieBannerConfirmation,
  Hide: CookieBannerHide,
};
