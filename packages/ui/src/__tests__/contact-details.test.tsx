import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { ContactDetails } from "../index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("ContactDetails", () => {
  it("is an address holding a description list, with tel: and mailto: links", async () => {
    const { container } = render(
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
      </ContactDetails.Root>,
    );
    const address = container.querySelector("address.loam-ContactDetails");
    expect(address).not.toBeNull();
    const dl = address!.querySelector(":scope > dl");
    expect(dl).not.toBeNull();
    const [dt, dd] = [dl!.querySelector("dt"), dl!.querySelector("dd")];
    expect(dt).toHaveTextContent("Phone");
    expect(dt!.compareDocumentPosition(dd!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole("link", { name: "020 7946 0000" }).getAttribute("href")).toMatch(
      /^tel:/,
    );
    expect(screen.getByRole("link", { name: "hello@example.com" }).getAttribute("href")).toMatch(
      /^mailto:/,
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
