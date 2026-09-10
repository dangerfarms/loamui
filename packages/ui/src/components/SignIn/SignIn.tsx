import type { FormHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";
import { Card } from "@loamui/core";
import type { CardProps } from "@loamui/core";
import { cx } from "../../utils";

export interface SignInRootProps extends CardProps {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/**
 * A sign-in card: a title, one column of fields, a full-width action and
 * a footer line for the other path. The surface is a core `Card`, capped
 * at a readable width and centred in whatever holds it.
 *
 * The fields are yours, composed from core `Field`, `Input` and `Checkbox`.
 * Give the email field `autoComplete="email"` and the password field
 * `autoComplete="current-password"`, so browsers and password managers fill
 * both without guessing.
 *
 * ```tsx
 * <SignIn.Root>
 *   <SignIn.Title>Sign in</SignIn.Title>
 *   <SignIn.Form action="/sign-in">
 *     <Field.Root>
 *       <Field.Label>Email address</Field.Label>
 *       <Input name="email" type="email" autoComplete="email" required />
 *     </Field.Root>
 *     <Field.Root>
 *       <Field.Label>Password</Field.Label>
 *       <Input name="password" type="password" autoComplete="current-password" required />
 *     </Field.Root>
 *     <Checkbox name="remember" label="Keep me signed in" />
 *     <SignIn.Actions>
 *       <Button type="submit">Sign in</Button>
 *     </SignIn.Actions>
 *   </SignIn.Form>
 *   <SignIn.Footer>
 *     No account? <a href="/sign-up">Create one</a>
 *   </SignIn.Footer>
 * </SignIn.Root>
 * ```
 */
function SignInRoot({ className, children, ref, ...rest }: SignInRootProps) {
  return (
    <Card ref={ref} className={cx("loam-SignIn", className)} {...rest}>
      {children}
    </Card>
  );
}

export interface SignInTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level; `h1` on a page of its own, `h2` inside a page. @default "h1" */
  render?: "h1" | "h2";
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/** The card's heading. An `h1` by default; pass `render="h2"` inside a page. */
function SignInTitle({ render: Tag = "h1", className, children, ref, ...rest }: SignInTitleProps) {
  return (
    <Tag ref={ref} className={cx("title", className)} {...rest}>
      {children}
    </Tag>
  );
}

export interface SignInFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
  ref?: Ref<HTMLFormElement>;
}

/** The native `form`, one column of fields. `action` and `onSubmit` are its own. */
function SignInForm({ className, children, ref, ...rest }: SignInFormProps) {
  return (
    <form ref={ref} className={cx("form", className)} {...rest}>
      {children}
    </form>
  );
}

export interface SignInActionsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** A grid wrapper for the submit Button, so it stretches to the card's width. */
function SignInActions({ className, children, ref, ...rest }: SignInActionsProps) {
  return (
    <div ref={ref} className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

export interface SignInFooterProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/** One muted, centred line under the form, with a link to the other path. */
function SignInFooter({ className, children, ref, ...rest }: SignInFooterProps) {
  return (
    <p ref={ref} className={cx("footer", className)} {...rest}>
      {children}
    </p>
  );
}

export const SignIn = {
  Root: SignInRoot,
  Title: SignInTitle,
  Form: SignInForm,
  Actions: SignInActions,
  Footer: SignInFooter,
};
