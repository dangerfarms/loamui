"use client";

import type { MouseEvent } from "react";
import { Header, UserMenu } from "@loamui/ui";
import type { Composition } from "./types";

/** The demo stays on the page: nothing here has a server to sign out of. */
function stay(event: MouseEvent<Element>) {
  event.preventDefault();
}

const userMenu: Composition = {
  slug: "user-menu",
  name: "User menu",
  category: "Navigation",
  description:
    "The signed-in person's menu: an avatar button that opens their name, email and account actions, ending with sign out.",
  lead: 'A core Menu with a specific trigger and a header. The trigger is a bare button around an Avatar, named for the person by hidden text, so a screen reader hears whose menu it is and not "button"; the header names the menu, so opening it announces the account; and SignOut posts a form when given an action, because ending a session is a change the server should see as a POST and not a link a prefetch could follow. Arrow keys, typeahead, Escape and focus return are Menu\'s own. The menu needs JavaScript to open, as every menu does: keep the account page in the navigation so nothing is lost without it.',
  importLine: `import { UserMenu } from "@loamui/ui";`,
  parts: [
    {
      name: "UserMenu.Root",
      description:
        "The composition's own span around the core Menu.Root, which is left as core renders it. Wrap the trigger and the popup in it; open state is Menu's own.",
    },
    {
      name: "UserMenu.Trigger",
      description:
        "The avatar button. Takes the person's name, for the initials and the accessible name (\"Account menu for Imogen Hartley\"), and an optional src for their picture. The Avatar is decorative; the name is real text hidden by core's .loam-VisuallyHidden, and children replace the default wording.",
    },
    {
      name: "UserMenu.Popup",
      description:
        "The core Menu.Popup, left as core renders it and named by the Header while one is rendered. Put the Header first, then the items.",
    },
    {
      name: "UserMenu.Header",
      description:
        "Who is signed in: the name over the email, in the composition's own div. Plain text before the items, so arrow keys skip it and it is heard as the menu's name instead.",
    },
    {
      name: "UserMenu.Item",
      description:
        "The core Menu.Item: a link with href, a button with onClick, or your router's link through render.",
    },
    { name: "UserMenu.Separator", description: "The core Menu.Separator, a real hr." },
    {
      name: "UserMenu.SignOut",
      description:
        'The last item, labelled "Sign out" unless you pass other words. With an action it is a submit button in a method="post" form; without one it is a button and onClick does the work.',
    },
  ],
  demos: [
    {
      title: "In a header",
      description:
        "The user menu sits in Header.Actions, where the account belongs. Open it with a click or ArrowDown, and the first item takes focus; Escape puts focus back on the avatar. The items are links because Profile and Settings are places, and sign out is set apart by a separator because it leaves rather than goes somewhere.",
      code: `<Header.Root>
  <Header.Brand>
    <a href="/">Loam</a>
  </Header.Brand>
  <Header.Nav aria-label="Primary">
    <li>
      <a href="/docs" aria-current="page">Docs</a>
    </li>
    <li>
      <a href="/components">Components</a>
    </li>
  </Header.Nav>
  <Header.Actions>
    <UserMenu.Root>
      <UserMenu.Trigger name="Imogen Hartley" />
      <UserMenu.Popup>
        <UserMenu.Header name="Imogen Hartley" email="imogen@example.com" />
        <UserMenu.Item href="/account">Profile</UserMenu.Item>
        <UserMenu.Item href="/settings">Settings</UserMenu.Item>
        <UserMenu.Separator />
        <UserMenu.SignOut onClick={stay} />
      </UserMenu.Popup>
    </UserMenu.Root>
  </Header.Actions>
</Header.Root>`,
      render: () => (
        <Header.Root>
          <Header.Brand>
            <a href="/">Loam</a>
          </Header.Brand>
          <Header.Nav aria-label="Primary">
            <li>
              <a href="/docs" aria-current="page">
                Docs
              </a>
            </li>
            <li>
              <a href="/components">Components</a>
            </li>
          </Header.Nav>
          <Header.Actions>
            <UserMenu.Root>
              <UserMenu.Trigger name="Imogen Hartley" />
              <UserMenu.Popup>
                <UserMenu.Header name="Imogen Hartley" email="imogen@example.com" />
                <UserMenu.Item href="/account">Profile</UserMenu.Item>
                <UserMenu.Item href="/settings">Settings</UserMenu.Item>
                <UserMenu.Separator />
                <UserMenu.SignOut onClick={stay} />
              </UserMenu.Popup>
            </UserMenu.Root>
          </Header.Actions>
        </Header.Root>
      ),
    },
    {
      title: "With a sign-out form",
      description:
        'Given an action, SignOut is a submit button inside a method="post" form, so signing out reaches the server as a POST with no script of your own. A hidden field the server wants, such as a CSRF token, is yours to add: render an Item as a submit button with a form attribute pointing at a form you write.',
      code: `<UserMenu.Root>
  <UserMenu.Trigger name="Rafael Okonkwo" />
  <UserMenu.Popup>
    <UserMenu.Header name="Rafael Okonkwo" email="rafael@example.com" />
    <UserMenu.Item href="/account">Profile</UserMenu.Item>
    <UserMenu.Separator />
    <UserMenu.SignOut action="/sign-out" onClick={stay} />
  </UserMenu.Popup>
</UserMenu.Root>`,
      render: () => (
        <UserMenu.Root>
          <UserMenu.Trigger name="Rafael Okonkwo" />
          <UserMenu.Popup>
            <UserMenu.Header name="Rafael Okonkwo" email="rafael@example.com" />
            <UserMenu.Item href="/account">Profile</UserMenu.Item>
            <UserMenu.Separator />
            <UserMenu.SignOut action="/sign-out" onClick={stay} />
          </UserMenu.Popup>
        </UserMenu.Root>
      ),
    },
  ],
  whenToUse: [
    "A signed-in product with a few account actions (profile, settings, billing) and sign out, gathered behind the person's avatar at the end of the header.",
    "Anywhere the visitor should be able to check which account they are in before acting: the header names the account when the menu opens, and the email tells two accounts apart.",
  ],
  whenNotToUse: [
    'A single sign-out action: a visible "Sign out" button or form needs no menu, and a menu with one item hides it for nothing.',
    "Site navigation: destinations everyone can reach belong in Header.Nav, where they are visible and crawlable; the user menu holds only what belongs to the account.",
  ],
};

export default userMenu;
