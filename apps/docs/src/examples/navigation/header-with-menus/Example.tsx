"use client";

import { Menu, Nav, SignpostLink } from "@loamui/core";
import "./example.css";

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Example() {
  return (
    <header className="header-with-menus">
      <a className="brand" href="/">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M5 19c0-7 4-13 14-14-1 10-7 14-14 14z" />
          <path d="M5 19c3-5 6-8 9-10" />
        </svg>
        Hedgerow
      </a>
      <Nav.Root aria-label="Primary">
        <Nav.List className="row">
          <Nav.Item>
            <Nav.Link href="/seeds" current>
              Seeds
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/plants">Plants</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Menu.Root>
              <Menu.Trigger render={<button type="button" className="trigger" />}>
                Learn
                <Chevron />
              </Menu.Trigger>
              <Menu.Popup>
                <Menu.Item href="/guides">Growing guides</Menu.Item>
                <Menu.Item href="/guides/sowing-calendar">Sowing calendar</Menu.Item>
                <Menu.Item href="/guides/seed-saving">Seed saving</Menu.Item>
                <Menu.Item href="/courses">Courses</Menu.Item>
              </Menu.Popup>
            </Menu.Root>
          </Nav.Item>
          <Nav.Item>
            <Menu.Root>
              <Menu.Trigger render={<button type="button" className="trigger" />}>
                Support
                <Chevron />
              </Menu.Trigger>
              <Menu.Popup>
                <Menu.Item href="/help">Help centre</Menu.Item>
                <Menu.Item href="/help/delivery">Delivery and returns</Menu.Item>
                <Menu.Item href="/contact">Contact us</Menu.Item>
                <Menu.Separator />
                <Menu.Item href="/accessibility">Accessibility</Menu.Item>
              </Menu.Popup>
            </Menu.Root>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/events">Open days</Nav.Link>
          </Nav.Item>
        </Nav.List>
      </Nav.Root>
      <div className="actions">
        <a href="/sign-in">Sign in</a>
        <SignpostLink href="/membership/join">Join the co-op</SignpostLink>
      </div>
    </header>
  );
}
