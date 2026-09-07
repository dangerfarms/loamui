"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { Card, renderWithProps, cx } from "@loamui/core";
import type { PartProps, RenderProp } from "@loamui/core";
import { useNamePart, useNamedRoot } from "../../naming";

interface AccountFormContextValue {
  nameId: string;
  register: (id: string) => () => void;
  /** The name the Form carries unless it has one of its own. */
  labelling: { "aria-label"?: string; "aria-labelledby"?: string };
}

const AccountFormContext = createContext<AccountFormContextValue | null>(null);

function useAccountForm(part: string): AccountFormContextValue {
  const ctx = useContext(AccountFormContext);
  if (!ctx) {
    throw new Error(`${part} must be rendered inside <AccountForm.Root>.`);
  }
  return ctx;
}

export interface AccountFormRootProps extends PartProps<"div"> {
  children?: ReactNode;
}

/**
 * The shell an account form lives in: a title, an optional line saying
 * what will happen, one column of fields, a full-width action and a
 * footer line for the other path. One shell holds every form at the door
 * of an account: signing in, creating one, asking for a reset link. The
 * questions differ; the shape does not.
 *
 * The Root is a wrapper that caps the form at a readable width and
 * centres it in whatever holds it. The surface is `AccountForm.Card`, core
 * `Card` as core styles it, put inside the Root on a page of its own and
 * left out where the form already has a surface, a `Modal.Popup` say. The
 * `Form` names itself after the `Title` (`aria-labelledby`), in the first
 * render, so a screen reader lands on "Sign in, form" and not an anonymous
 * one.
 *
 * The fields are yours, composed from core `Field`, `Input`,
 * `PasswordInput` and `Checkbox`, and the judgment is in their attributes
 * and copy:
 *
 * - Signing in: email with `autoComplete="email"`, password with
 *   `autoComplete="current-password"`, so browsers and password managers
 *   fill both without guessing and know this is a password to look up.
 * - Creating an account: one name field (`autoComplete="name"`), because a
 *   single box holds every name the world writes in whatever order it
 *   comes; email with `inputMode="email"` so a phone offers the `@` key;
 *   password with `autoComplete="new-password"`, the value that tells a
 *   password manager to make one up and save it, with its rules stated
 *   before the field as a `Field.Description`. No confirm-password field:
 *   retyping catches fewer mistakes than seeing the value, and a password
 *   manager fills both boxes with the same string anyway. Consent as an
 *   unticked `Checkbox` with the terms linked inside its label, so agreeing
 *   is a choice made after reading.
 * - Resetting a password: one email field and a `Description` that says a
 *   link is coming. After submitting, show the same confirmation whether or
 *   not the address has an account, because "no account with that address"
 *   tells a stranger which addresses are customers. A core `Alert` in the
 *   form's place carries it.
 *
 * The Button says what happens ("Sign in", "Create account", "Send reset
 * link"), never "Submit". Errors are rendered by you after a failed
 * submit: an `ErrorSummary` as the first child of the form and a
 * `Field.Error` in each field, both in the words of the question.
 *
 * ```tsx
 * <AccountForm.Root>
 *   <AccountForm.Card>
 *     <AccountForm.Title>Sign in</AccountForm.Title>
 *     <AccountForm.Form action="/sign-in">
 *       <Field.Root>
 *         <Field.Label>Email address</Field.Label>
 *         <Input name="email" type="email" autoComplete="email" required />
 *       </Field.Root>
 *       <Field.Root>
 *         <Field.Label>Password</Field.Label>
 *         <PasswordInput name="password" autoComplete="current-password" required />
 *       </Field.Root>
 *       <Checkbox name="remember" label="Keep me signed in" />
 *       <AccountForm.Actions>
 *         <Button type="submit">Sign in</Button>
 *       </AccountForm.Actions>
 *     </AccountForm.Form>
 *     <AccountForm.Footer>
 *       No account? <a href="/sign-up">Create one</a>
 *     </AccountForm.Footer>
 *   </AccountForm.Card>
 * </AccountForm.Root>
 * ```
 */
function AccountFormRoot({ className, children, ref, ...rest }: AccountFormRootProps) {
  // The Root mints the name; the Form wears it and the Title renders it.
  // The Form's own aria-label or aria-labelledby wins there, so the Root
  // passes no naming props of its own here.
  const { nameId, register, labelling } = useNamedRoot({});
  const value = useMemo<AccountFormContextValue>(
    () => ({ nameId, register, labelling }),
    [nameId, register, labelling],
  );
  return (
    <AccountFormContext value={value}>
      <div ref={ref} className={cx("loam-AccountForm", className)} {...rest}>
        {children}
      </div>
    </AccountFormContext>
  );
}

export interface AccountFormTitleProps extends PartProps<"h1"> {
  /**
   * Render as a different heading: `render={<h2 />}` inside a page. The
   * part's classes and attributes merge onto the element it renders, the
   * same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/**
 * The heading, and the Form's accessible name. An `h1` by default; pass
 * `render={<h2 />}` inside a page. Its id is generated unless you give it
 * one.
 */
function AccountFormTitle({
  render,
  id,
  className,
  children,
  ref,
  ...rest
}: AccountFormTitleProps) {
  const ctx = useAccountForm("AccountForm.Title");
  const titleId = useNamePart(ctx, id);
  const props = {
    ref,
    id: titleId,
    className: cx("loam-AccountForm-title", className),
    children,
    ...rest,
  };
  if (render) {
    return <>{renderWithProps(render, props)}</>;
  }
  return <h1 {...props}>{children}</h1>;
}

export interface AccountFormDescriptionProps extends PartProps<"p"> {
  children?: ReactNode;
}

/**
 * One muted line under the title saying what the form does and what
 * happens next, so the visitor knows a link is coming before they type.
 */
function AccountFormDescription({
  className,
  children,
  ref,
  ...rest
}: AccountFormDescriptionProps) {
  return (
    <p ref={ref} className={cx("loam-AccountForm-description", className)} {...rest}>
      {children}
    </p>
  );
}

export interface AccountFormFormProps extends PartProps<"form"> {
  children?: ReactNode;
}

/**
 * The native `form`, one column of fields. `action` and `onSubmit` are its
 * own. It is named by the Title through `aria-labelledby`, from the first
 * render; your own `aria-label` or `aria-labelledby` takes over.
 */
function AccountFormForm({
  className,
  children,
  ref,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  ...rest
}: AccountFormFormProps) {
  const { labelling } = useAccountForm("AccountForm.Form");
  const named = ariaLabel != null || ariaLabelledby != null;
  return (
    <form
      ref={ref}
      className={cx("loam-AccountForm-form", className)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      {...(named ? {} : labelling)}
      {...rest}
    >
      {children}
    </form>
  );
}

export interface AccountFormActionsProps extends PartProps<"div"> {
  children?: ReactNode;
}

/** A single-cell grid for the submit Button, so it stretches to the form's width. */
function AccountFormActions({ className, children, ref, ...rest }: AccountFormActionsProps) {
  return (
    <div ref={ref} className={cx("loam-AccountForm-actions", className)} {...rest}>
      {children}
    </div>
  );
}

export interface AccountFormFooterProps extends PartProps<"p"> {
  children?: ReactNode;
}

/** One muted, centred line under the form, with a link to the other path. */
function AccountFormFooter({ className, children, ref, ...rest }: AccountFormFooterProps) {
  return (
    <p ref={ref} className={cx("loam-AccountForm-footer", className)} {...rest}>
      {children}
    </p>
  );
}

export const AccountForm = {
  Root: AccountFormRoot,
  /**
   * The surface: core `Card`, as core styles it. Put the parts inside it on
   * a page of its own; leave it out where the form already has a surface,
   * inside a `Modal.Popup` say, and put the parts straight in the Root.
   */
  Card,
  Title: AccountFormTitle,
  Description: AccountFormDescription,
  Form: AccountFormForm,
  Actions: AccountFormActions,
  Footer: AccountFormFooter,
};
