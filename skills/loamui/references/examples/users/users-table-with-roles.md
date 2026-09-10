---
title: Users table with roles
description: The team as a Table inside a form: a Select per row for the person's role, when they were last active written as a distance, a status pill, and one button to save the roles.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Users table with roles

The team as a Table inside a form: a Select per row for the person's role, when they were last active written as a distance, a status pill, and one button to save the roles.

An example in **Users**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Badge`, `Button`, `Select`, `Table`, `Time`
- Tags: table, team, roles, permissions, select, status, last active
- Live: https://loamui.com/examples/users/users-table-with-roles

## Built to the pillars

- **Native CSS.** Each role is a native select named by a label that is read but not seen, and the table sits in a method="post" form with one submit button, so a change is a form submission the browser can make with no script.
- **Modern CSS.** The form is the root and the Table a scope of its own past the donut; the role column is floored at a width that fits its longest option, so nothing shifts as a choice changes.
- **Composition.** Table, Select, Time and Badge are dropped into the cells as they are; Time is handed a fixed now so the server and the browser write the same words, and a member with no visit yet is plain text rather than an empty cell.
- **Contextualism.** Each status wraps its Badge in a region of its own kind, success, info or danger, so the pill takes its colour from where it sits, not from a prop; the save row is a primary region for the same reason, and primary is the brand slot, neutral until a theme fills it, so the row says where the form's action belongs rather than making it stand out.
- **Accessible & gatekept.** Every Select is named Role for Imogen Hartley, so a screen reader moving down the column knows whose role it is changing; each status says its state in words beside a dot that is decoration, and last active is a time element whose machine-readable value is the full moment.

## Example.tsx

```tsx
"use client";

import { Avatar, Badge, Button, Select, Table, Time } from "@loamui/core";
import "./example.css";

// The moment the page was rendered, supplied rather than read from the
// clock, so the server and the browser write the same words.
const NOW = "2026-09-08T09:00:00Z";

const ROLES = [
  { value: "admin", label: "Administrator" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

const STATUS: Record<string, string> = {
  active: "Active",
  invited: "Invited",
  suspended: "Suspended",
};

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive?: string;
  status: string;
  photo: number;
}

const MEMBERS: Member[] = [
  {
    id: "imogen",
    photo: 823,
    name: "Imogen Hartley",
    email: "imogen@hedgerow.example",
    role: "admin",
    lastActive: "2026-09-08T07:42:00Z",
    status: "active",
  },
  {
    id: "bryn",
    photo: 1005,
    name: "Bryn Powell",
    email: "bryn@hedgerow.example",
    role: "editor",
    lastActive: "2026-09-07T08:15:00Z",
    status: "active",
  },
  {
    id: "sadia",
    photo: 832,
    name: "Sadia Rahman",
    email: "sadia@hedgerow.example",
    role: "editor",
    lastActive: "2026-09-05T11:20:00Z",
    status: "active",
  },
  {
    id: "tomos",
    photo: 669,
    name: "Tomos Ellis",
    email: "tomos@hedgerow.example",
    role: "viewer",
    status: "invited",
  },
  {
    id: "greta",
    photo: 64,
    name: "Greta Lindqvist",
    email: "greta@hedgerow.example",
    role: "viewer",
    lastActive: "2026-08-24T17:05:00Z",
    status: "suspended",
  },
];

export default function Example() {
  return (
    <form className="users-table-with-roles" method="post" action="/team/roles">
      <Table>
        <caption>Team members and their roles. Change a role, then save.</caption>
        <thead>
          <tr>
            <Table.Th>Member</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Last active</Table.Th>
            <Table.Th>Status</Table.Th>
          </tr>
        </thead>
        <tbody>
          {MEMBERS.map((member) => (
            <tr key={member.id}>
              <th scope="row">
                <span className="member">
                  <Avatar
                    name={member.name}
                    src={`https://picsum.photos/id/${member.photo}/96/96`}
                    aria-hidden
                  />
                  <span className="text">
                    <strong>{member.name}</strong>
                    <span>{member.email}</span>
                  </span>
                </span>
              </th>
              <td className="role">
                <label className="loam-VisuallyHidden" htmlFor={`role-${member.id}`}>
                  Role for {member.name}
                </label>
                <Select
                  id={`role-${member.id}`}
                  name={`role[${member.id}]`}
                  defaultValue={member.role}
                >
                  {ROLES.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </Select>
              </td>
              <td>
                {member.lastActive ? (
                  <Time value={member.lastActive} locale="en-GB" relative={{ now: NOW }} />
                ) : (
                  <span className="never">Not yet</span>
                )}
              </td>
              <td>
                <span className={member.status}>
                  <Badge>
                    <Badge.Dot />
                    {STATUS[member.status]}
                  </Badge>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="actions">
        <Button type="submit">Save roles</Button>
      </div>
    </form>
  );
}
```

## example.css

```css
@scope (.users-table-with-roles) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    gap: var(--loam-space-md);
    margin: 0;
  }

  div.actions {
    --loam-context: primary;

    display: block flex;
    justify-content: end;
  }
}

@scope (.users-table-with-roles .loam-Table) to ([class*="loam-"]) {
  tbody th {
    font-weight: 400;
    text-align: start;
  }

  span.member {
    align-items: center;
    display: block flex;
    gap: var(--loam-space-sm);

    span.text {
      display: block grid;
      gap: calc(var(--loam-space-xs) / 2);

      strong {
        color: var(--loam-color-fg-strong);
        font-weight: 500;
        white-space: nowrap;
      }

      > span {
        color: var(--loam-color-fg-muted);
        font-size: var(--loam-text-xs);
      }
    }
  }

  td.role {
    min-inline-size: 12rem;
  }

  span.never {
    color: var(--loam-color-fg-muted);
  }

  span.active {
    --loam-context: success;
  }

  span.invited {
    --loam-context: info;
  }

  span.suspended {
    --loam-context: danger;
  }
}
```

