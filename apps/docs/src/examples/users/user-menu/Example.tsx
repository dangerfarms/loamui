"use client";

import { Avatar, Menu } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Menu.Root className="user-menu">
      <Menu.Trigger
        render={
          <button type="button" className="trigger">
            <Avatar
              name="Imogen Hartley"
              src="https://picsum.photos/seed/hedgerow-imogen/96/96"
              aria-hidden
            />
            <span className="loam-VisuallyHidden">Account menu for Imogen Hartley</span>
          </button>
        }
      />
      <Menu.Popup aria-labelledby="user-menu-account">
        <div className="account" id="user-menu-account">
          <strong>Imogen Hartley</strong>
          <span>imogen@hedgerow.example</span>
        </div>
        <Menu.Separator />
        <Menu.Item href="/plot">Your plot</Menu.Item>
        <Menu.Item href="/orders">Orders</Menu.Item>
        <Menu.Item href="/membership">Membership</Menu.Item>
        <Menu.Separator />
        <form method="post" action="/sign-out">
          <Menu.Item render={<button type="submit">Sign out</button>} />
        </form>
      </Menu.Popup>
    </Menu.Root>
  );
}
