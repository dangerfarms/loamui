import type { FormHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";
import { Card, renderWithProps, cx } from "@loamui/core";
import type { RenderProp } from "@loamui/core";
import type { CardProps } from "@loamui/core";

export interface SignInFormRootProps extends CardProps {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/**
 * A sign-in form: a title, one column of fields, a full-width action and
 * a footer line for the other path. The surface is a core `Card`, left as
 * core styles it; this composition only caps it at a readable width and
 * centres it in whatever holds it, then lays its parts out inside.
 *
 * The fields are yours, composed from core `Field`, `Input` and `Checkbox`.
 * Give the email field `autoComplete="email"` and the password field
 * `autoComplete="current-password"`, so browsers and password managers fill
 * both without guessing.
 *
 * ```tsx
 * <SignInForm.Root>
 *   <SignInForm.Title>Sign in</SignInForm.Title>
 *   <SignInForm.Form action="/sign-in">
 *     <Field.Root>
 *       <Field.Label>Email address</Field.Label>
 *       <Input name="email" type="email" autoComplete="email" required />
 *     </Field.Root>
 *     <Field.Root>
 *       <Field.Label>Password</Field.Label>
 *       <Input name="password" type="password" autoComplete="current-password" required />
 *     </Field.Root>
 *     <Checkbox name="remember" label="Keep me signed in" />
 *     <SignInForm.Actions>
 *       <Button type="submit">Sign in</Button>
 *     </SignInForm.Actions>
 *   </SignInForm.Form>
 *   <SignInForm.Footer>
 *     No account? <a href="/sign-up">Create one</a>
 *   </SignInForm.Footer>
 * </SignInForm.Root>
 * ```
 */
function SignInFormRoot({ className, children, ref, ...rest }: SignInFormRootProps) {
  return (
    <Card ref={ref} className={cx("loam-SignInForm", className)} {...rest}>
      {children}
    </Card>
  );
}

export interface SignInFormTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Render as a different heading: `render={<h2 />}` inside a page. The
   * part's classes and attributes merge onto the element it renders, the
   * same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/** The card's heading. An `h1` by default; pass `render={<h2 />}` inside a page. */
function SignInFormTitle({ render, className, children, ref, ...rest }: SignInFormTitleProps) {
  if (render) {
    return (
      <>{renderWithProps(render, { ref, className: cx("title", className), children, ...rest })}</>
    );
  }
  return (
    <h1 ref={ref} className={cx("title", className)} {...rest}>
      {children}
    </h1>
  );
}

export interface SignInFormFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
  ref?: Ref<HTMLFormElement>;
}

/** The native `form`, one column of fields. `action` and `onSubmit` are its own. */
function SignInFormForm({ className, children, ref, ...rest }: SignInFormFormProps) {
  return (
    <form ref={ref} className={cx("form", className)} {...rest}>
      {children}
    </form>
  );
}

export interface SignInFormActionsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** A grid wrapper for the submit Button, so it stretches to the card's width. */
function SignInFormActions({ className, children, ref, ...rest }: SignInFormActionsProps) {
  return (
    <div ref={ref} className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

export interface SignInFormFooterProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/** One muted, centred line under the form, with a link to the other path. */
function SignInFormFooter({ className, children, ref, ...rest }: SignInFormFooterProps) {
  return (
    <p ref={ref} className={cx("footer", className)} {...rest}>
      {children}
    </p>
  );
}

export const SignInForm = {
  Root: SignInFormRoot,
  Title: SignInFormTitle,
  Form: SignInFormForm,
  Actions: SignInFormActions,
  Footer: SignInFormFooter,
};
