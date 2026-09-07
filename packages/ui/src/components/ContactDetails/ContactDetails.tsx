import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "@loamui/core";

export interface ContactDetailsRootProps extends HTMLAttributes<HTMLElement> {
  /** `ContactDetails.Item`s, one per way to get in touch. */
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * How to reach an organisation or a person: phone, email, postal address,
 * hours, or a labelled list of links.
 *
 * The unit is the Root: an `address` element (contact information for its
 * nearest article, or for the page) holding a description list, so each
 * label and its value are associated. Make the phone number a `tel:` link
 * and the email a `mailto:` link, so a tap dials or opens the mail client;
 * keep a postal address's line breaks with `br`. Links take the page's
 * link styling. There are no layout props: a consumer wanting the pairs in
 * columns writes `grid-template-columns` on the `dl` in their own CSS.
 *
 * ```tsx
 * <ContactDetails.Root>
 *   <ContactDetails.Item>
 *     <ContactDetails.Label>Phone</ContactDetails.Label>
 *     <ContactDetails.Value>
 *       <a href="tel:+442079460000">020 7946 0000</a>
 *     </ContactDetails.Value>
 *   </ContactDetails.Item>
 *   <ContactDetails.Item>
 *     <ContactDetails.Label>Address</ContactDetails.Label>
 *     <ContactDetails.Value>
 *       1 Example Street
 *       <br />
 *       London EC1A 1AA
 *     </ContactDetails.Value>
 *   </ContactDetails.Item>
 * </ContactDetails.Root>
 * ```
 */
function ContactDetailsRoot({ className, children, ref, ...rest }: ContactDetailsRootProps) {
  return (
    <address ref={ref} className={cx("loam-ContactDetails", className)} {...rest}>
      <dl>{children}</dl>
    </address>
  );
}

export interface ContactDetailsItemProps extends HTMLAttributes<HTMLDivElement> {
  /** A `ContactDetails.Label` then a `ContactDetails.Value`, in that order. */
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/**
 * One pair: a `div` grouping a label and its value inside the Root's list.
 * It belongs inside a Root, which is the unit that stands alone.
 */
function ContactDetailsItem({ className, children, ref, ...rest }: ContactDetailsItemProps) {
  return (
    <div ref={ref} className={cx("item", className)} {...rest}>
      {children}
    </div>
  );
}

export interface ContactDetailsPartProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/** What the value is (Phone, Email, Address, Hours), a `dt`. Comes first in the markup. */
function ContactDetailsLabel({ className, children, ref, ...rest }: ContactDetailsPartProps) {
  return (
    <dt ref={ref} className={cx("label", className)} {...rest}>
      {children}
    </dt>
  );
}

/**
 * The value, a `dd`: a `tel:` or `mailto:` link, lines of a postal address
 * separated by `br`, plain text, or a short `ul` of links.
 */
function ContactDetailsValue({ className, children, ref, ...rest }: ContactDetailsPartProps) {
  return (
    <dd ref={ref} className={cx("value", className)} {...rest}>
      {children}
    </dd>
  );
}

export const ContactDetails = {
  Root: ContactDetailsRoot,
  Item: ContactDetailsItem,
  Label: ContactDetailsLabel,
  Value: ContactDetailsValue,
};
