"use client";

import { ContactDetails } from "@loamui/ui";
import type { Composition } from "./types";

const contactDetails: Composition = {
  slug: "contact-details",
  name: "Contact details",
  category: "Data display",
  description:
    "How to reach an organisation or person: phone, email, postal address, hours, or a labelled list of links.",
  lead: "The root is an address element, contact information for its nearest article or for the page, holding a description list so each label and its value are associated. The phone number is a tel: link and the email a mailto: link, so a tap dials or opens the mail client; a postal address keeps its line breaks. There are no layout props: the pairs sit in two columns, labels beside values, and stack in a narrow container.",
  importLine: `import { ContactDetails } from "@loamui/ui";`,
  parts: [
    {
      name: "ContactDetails.Root",
      description:
        "The unit: an address element holding a dl. Stands alone anywhere; for columns, write grid-template-columns on the dl in your own CSS.",
    },
    {
      name: "ContactDetails.Item",
      description: "One pair: a div grouping a Label and its Value inside the Root's list.",
    },
    {
      name: "ContactDetails.Label",
      description:
        "What the value is (Phone, Email, Address, Hours), a dt. Comes first in the markup.",
    },
    {
      name: "ContactDetails.Value",
      description:
        "The value, a dd: a tel: or mailto: link, address lines separated by br, plain text, or a short ul of links.",
    },
  ],
  demos: [
    {
      title: "Reach us",
      description:
        "Phone and email are real links, so a tap on a phone dials and a tap on the email opens the mail client. The postal address keeps its lines; the hours are plain text.",
      code: `<ContactDetails.Root>
  <ContactDetails.Item>
    <ContactDetails.Label>Phone</ContactDetails.Label>
    <ContactDetails.Value>
      <a href="tel:+442079460000">020 7946 0000</a>
    </ContactDetails.Value>
  </ContactDetails.Item>
  <ContactDetails.Item>
    <ContactDetails.Label>Email</ContactDetails.Label>
    <ContactDetails.Value>
      <a href="mailto:hello@example.com">hello@example.com</a>
    </ContactDetails.Value>
  </ContactDetails.Item>
  <ContactDetails.Item>
    <ContactDetails.Label>Address</ContactDetails.Label>
    <ContactDetails.Value>
      1 Example Street
      <br />
      London EC1A 1AA
    </ContactDetails.Value>
  </ContactDetails.Item>
  <ContactDetails.Item>
    <ContactDetails.Label>Hours</ContactDetails.Label>
    <ContactDetails.Value>Monday to Friday, 9am to 5pm</ContactDetails.Value>
  </ContactDetails.Item>
</ContactDetails.Root>`,
      render: () => (
        <ContactDetails.Root>
          <ContactDetails.Item>
            <ContactDetails.Label>Phone</ContactDetails.Label>
            <ContactDetails.Value>
              <a href="tel:+442079460000">020 7946 0000</a>
            </ContactDetails.Value>
          </ContactDetails.Item>
          <ContactDetails.Item>
            <ContactDetails.Label>Email</ContactDetails.Label>
            <ContactDetails.Value>
              <a href="mailto:hello@example.com">hello@example.com</a>
            </ContactDetails.Value>
          </ContactDetails.Item>
          <ContactDetails.Item>
            <ContactDetails.Label>Address</ContactDetails.Label>
            <ContactDetails.Value>
              1 Example Street
              <br />
              London EC1A 1AA
            </ContactDetails.Value>
          </ContactDetails.Item>
          <ContactDetails.Item>
            <ContactDetails.Label>Hours</ContactDetails.Label>
            <ContactDetails.Value>Monday to Friday, 9am to 5pm</ContactDetails.Value>
          </ContactDetails.Item>
        </ContactDetails.Root>
      ),
    },
    {
      title: "Quick links",
      description:
        "A labelled list of links is the same shape: the label is the dt and a short ul of links is the dd. The list drops its markers and indent inside a Value.",
      code: `<ContactDetails.Root>
  <ContactDetails.Item>
    <ContactDetails.Label>Support</ContactDetails.Label>
    <ContactDetails.Value>
      <ul>
        <li><a href="/help">Help centre</a></li>
        <li><a href="/status">Service status</a></li>
        <li><a href="mailto:support@example.com">support@example.com</a></li>
      </ul>
    </ContactDetails.Value>
  </ContactDetails.Item>
  <ContactDetails.Item>
    <ContactDetails.Label>Press</ContactDetails.Label>
    <ContactDetails.Value>
      <a href="mailto:press@example.com">press@example.com</a>
    </ContactDetails.Value>
  </ContactDetails.Item>
</ContactDetails.Root>`,
      render: () => (
        <ContactDetails.Root>
          <ContactDetails.Item>
            <ContactDetails.Label>Support</ContactDetails.Label>
            <ContactDetails.Value>
              <ul>
                <li>
                  <a href="/help">Help centre</a>
                </li>
                <li>
                  <a href="/status">Service status</a>
                </li>
                <li>
                  <a href="mailto:support@example.com">support@example.com</a>
                </li>
              </ul>
            </ContactDetails.Value>
          </ContactDetails.Item>
          <ContactDetails.Item>
            <ContactDetails.Label>Press</ContactDetails.Label>
            <ContactDetails.Value>
              <a href="mailto:press@example.com">press@example.com</a>
            </ContactDetails.Value>
          </ContactDetails.Item>
        </ContactDetails.Root>
      ),
    },
  ],
  whenToUse: [
    "The ways to reach an organisation or a person: a contact page, a footer's contact block, the byline area of an article whose author can be reached.",
    "A short labelled list of links (Support, Legal, Follow us) where each group has a name; the label-and-list pair is the same shape.",
  ],
  whenNotToUse: [
    "A form for the reader to send a message; that is ContactForm. Contact details tell the reader how to reach you, they do not take a message.",
    "A map or a booking widget; that is an Embed. Put the postal address here and the map beside it.",
  ],
};

export default contactDetails;
