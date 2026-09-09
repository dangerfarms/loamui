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
- **Contextualism.** Each status wraps its Badge in a region of its own kind, success, info or danger, so the pill takes its colour from where it sits, not from a prop; the save row is a primary region for the same reason.
- **Accessible & gatekept.** Every Select is named Role for Imogen Hartley, so a screen reader moving down the column knows whose role it is changing; each status says its state in words beside a dot that is decoration, and last active is a time element whose machine-readable value is the full moment.

## Example.tsx

```tsx
"use client";

import { Avatar, Badge, Button, Select, Table, Time } from "@loamui/core";
import "./example.css";

/* The moment the page was rendered, supplied rather than read from the
   clock, so the server and the browser write the same words. */
const NOW = "2026-09-08T09:00:00Z";

const ROLES = [
  ["admin", "Administrator"],
  ["editor", "Editor"],
  ["viewer", "Viewer"],
] as const;

const STATUS = {
  active: "Active",
  invited: "Invited",
  suspended: "Suspended",
} as const;

const MEMBERS: Array<{
  id: string;
  name: string;
  email: string;
  role: (typeof ROLES)[number][0];
  lastActive?: string;
  status: keyof typeof STATUS;
}> = [
  {
    id: "imogen",
    name: "Imogen Hartley",
    email: "imogen@hedgerow.example",
    role: "admin",
    lastActive: "2026-09-08T07:42:00Z",
    status: "active",
  },
  {
    id: "bryn",
    name: "Bryn Powell",
    email: "bryn@hedgerow.example",
    role: "editor",
    lastActive: "2026-09-07T08:15:00Z",
    status: "active",
  },
  {
    id: "sadia",
    name: "Sadia Rahman",
    email: "sadia@hedgerow.example",
    role: "editor",
    lastActive: "2026-09-05T11:20:00Z",
    status: "active",
  },
  {
    id: "tomos",
    name: "Tomos Ellis",
    email: "tomos@hedgerow.example",
    role: "viewer",
    status: "invited",
  },
  {
    id: "greta",
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
                    src={`https://picsum.photos/seed/hedgerow-${member.id}/96/96`}
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
                  {ROLES.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
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
/* The form is the root: the Table and the save button are its two rows.
   The one action is the form's primary one, so its row is a primary
   region and the Button takes the colour from where it sits. */
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

/* Core's Table is a limit for the form's scope, so its cells are shaped
   from a scope of its own; the Avatars, Selects, Times and Badges inside
   stay behind the donut. */
@scope (.users-table-with-roles .loam-Table) to ([class*="loam-"]) {
  /* The member is the row's header: the picture beside the name over
     the email, read as the row rather than as a figure. */
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

  /* The role cell is wide enough for its longest option, so the column
     does not resize as a choice changes. */
  td.role {
    min-inline-size: 12rem;
  }

  span.never {
    color: var(--loam-color-fg-muted);
  }

  /* Each status is a region of its own kind, so the Badge inside takes
     the colour from where it sits and says the state in words; the dot
     is a swatch and survives forced colours as an outline. */
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

