import type { FormHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "@loamui/core";

export interface ContactFormRootProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
  ref?: Ref<HTMLFormElement>;
}

/**
 * A contact form: one column of fields and a row of actions on a native
 * `form`. The fields are yours, composed from core `Field`, `Input` and
 * `Textarea`; the Root sets the rhythm between them and the Actions keep
 * the Button at its natural width.
 *
 * One column, always. A form is filled top to bottom, and fields set side
 * by side make the eye and the tab order disagree; a first and a last name
 * are two short rows, not one shared one. `action` and `onSubmit` are the
 * form's own, forwarded untouched.
 *
 * ```tsx
 * <ContactForm.Root action="/contact">
 *   <Field.Root>
 *     <Field.Label>Full name</Field.Label>
 *     <Input name="name" autoComplete="name" required />
 *   </Field.Root>
 *   <Field.Root>
 *     <Field.Label>Email address</Field.Label>
 *     <Field.Description>We'll only use this to reply.</Field.Description>
 *     <Input name="email" type="email" autoComplete="email" required />
 *   </Field.Root>
 *   <Field.Root>
 *     <Field.Label>Message</Field.Label>
 *     <Textarea name="message" rows={5} required />
 *   </Field.Root>
 *   <ContactForm.Actions>
 *     <Button type="submit">Send message</Button>
 *   </ContactForm.Actions>
 * </ContactForm.Root>
 * ```
 */
function ContactFormRoot({ className, children, ref, ...rest }: ContactFormRootProps) {
  return (
    <form ref={ref} className={cx("loam-ContactForm", className)} {...rest}>
      {children}
    </form>
  );
}

export interface ContactFormPartProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** A wrapping flex row for the submit Button, so it keeps its natural width. */
function ContactFormActions({ className, children, ref, ...rest }: ContactFormPartProps) {
  return (
    <div ref={ref} className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

export const ContactForm = {
  Root: ContactFormRoot,
  Actions: ContactFormActions,
};
