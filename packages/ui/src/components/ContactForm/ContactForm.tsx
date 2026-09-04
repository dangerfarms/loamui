import type { FormHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";

export interface ContactFormRootProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
  ref?: Ref<HTMLFormElement>;
}

/**
 * A contact form: a stack of fields and a row of actions on a native
 * `form`. The fields are yours, composed from core `Field`, `Input` and
 * `Textarea`; the parts here only arrange them.
 *
 * `action` and `onSubmit` are the form's own, forwarded untouched. A
 * `ContactForm.Row` puts two short fields side by side when the form is
 * wide enough and stacks them when it is not.
 *
 * ```tsx
 * <ContactForm.Root action="/contact">
 *   <ContactForm.Fields>
 *     <ContactForm.Row>
 *       <Field.Root>
 *         <Field.Label>First name</Field.Label>
 *         <Input name="given-name" autoComplete="given-name" required />
 *       </Field.Root>
 *       <Field.Root>
 *         <Field.Label>Last name</Field.Label>
 *         <Input name="family-name" autoComplete="family-name" required />
 *       </Field.Root>
 *     </ContactForm.Row>
 *     <Field.Root>
 *       <Field.Label>Email address</Field.Label>
 *       <Field.Description>We'll only use this to reply.</Field.Description>
 *       <Input name="email" type="email" autoComplete="email" required />
 *     </Field.Root>
 *     <Field.Root>
 *       <Field.Label>Message</Field.Label>
 *       <Textarea name="message" rows={5} required />
 *     </Field.Root>
 *   </ContactForm.Fields>
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

/** The stack of fields: one column, a large gap between fields. */
function ContactFormFields({ className, children, ref, ...rest }: ContactFormPartProps) {
  return (
    <div ref={ref} className={cx("fields", className)} {...rest}>
      {children}
    </div>
  );
}

/**
 * Two fields side by side when the form is wider than 36rem, stacked when
 * it is not. For short answers that belong together, like a first and a
 * last name; never for a field that takes a sentence.
 */
function ContactFormRow({ className, children, ref, ...rest }: ContactFormPartProps) {
  return (
    <div ref={ref} className={cx("row", className)} {...rest}>
      {children}
    </div>
  );
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
  Fields: ContactFormFields,
  Row: ContactFormRow,
  Actions: ContactFormActions,
};
