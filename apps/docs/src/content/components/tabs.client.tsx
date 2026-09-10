"use client";

import { Tabs } from "@loamui/core";

const frame = { inlineSize: "100%", maxInlineSize: "28rem" } as const;

export function TabsBasicDemo() {
  return (
    <div style={frame}>
      <Tabs.Root defaultValue="account">
        <Tabs.List>
          <Tabs.Tab value="account">Account</Tabs.Tab>
          <Tabs.Tab value="security">Security</Tabs.Tab>
          <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="account">Update your name and email address.</Tabs.Panel>
        <Tabs.Panel value="security">Change your password and enable 2FA.</Tabs.Panel>
        <Tabs.Panel value="notifications">Choose how you want to be notified.</Tabs.Panel>
      </Tabs.Root>
    </div>
  );
}

export function TabsIconsDemo() {
  return (
    <div style={frame}>
      <Tabs.Root defaultValue="files">
        <Tabs.List>
          <Tabs.Tab value="files">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6Zm7 1.5L18.5 9H13V3.5Z" />
            </svg>
            Files
          </Tabs.Tab>
          <Tabs.Tab value="team">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.69-8 6v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-3.31-3.58-6-8-6Z" />
            </svg>
            Team
          </Tabs.Tab>
          <Tabs.Tab value="settings">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M19.43 12.98a7.8 7.8 0 0 0 0-1.96l2.03-1.58-1.92-3.32-2.39.96a7.6 7.6 0 0 0-1.7-.98L15.1 3.5h-3.84l-.35 2.54a7.6 7.6 0 0 0-1.7.98l-2.39-.96-1.92 3.32 2.03 1.58a7.8 7.8 0 0 0 0 1.96l-2.03 1.58 1.92 3.32 2.39-.96c.52.4 1.09.73 1.7.98l.35 2.54h3.84l.35-2.54a7.6 7.6 0 0 0 1.7-.98l2.39.96 1.92-3.32-2.03-1.58ZM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
            </svg>
            Settings
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="files">All your documents in one place.</Tabs.Panel>
        <Tabs.Panel value="team">Invite teammates and manage roles.</Tabs.Panel>
        <Tabs.Panel value="settings">Configure your workspace preferences.</Tabs.Panel>
      </Tabs.Root>
    </div>
  );
}

export function TabsDisabledDemo() {
  return (
    <div style={frame}>
      <Tabs.Root defaultValue="overview">
        <Tabs.List>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="reports">Reports</Tabs.Tab>
          <Tabs.Tab value="billing" disabled>
            Billing
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="overview">Everything at a glance.</Tabs.Panel>
        <Tabs.Panel value="reports">Usage for the last month.</Tabs.Panel>
        <Tabs.Panel value="billing">Upgrade to unlock billing.</Tabs.Panel>
      </Tabs.Root>
    </div>
  );
}
