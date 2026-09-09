---
title: Users table
description: The team as a Table: a picture and a name heading each row, their role, an email and a phone number as links, and a menu of actions at the end named for the person.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Users table

The team as a Table: a picture and a name heading each row, their role, an email and a phone number as links, and a menu of actions at the end named for the person.

An example in **Users**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Menu`, `Table`
- Tags: table, team, members, actions, menu, contacts
- Live: https://loamui.com/examples/users/users-table

## Built to the pillars

- **Native CSS.** A real table with a caption, column headers and a row header per person, so a cell is announced with the row and column it belongs to; the email and phone are mailto: and tel: links, and removing someone is a submit button in a method="post" form.
- **Modern CSS.** The Table's own element is the scroll wrapper and the example's root, so three cells are shaped from one scope while the Avatars and the Menus inside stay behind the donut; the actions column is sized to its button by an inline size of zero.
- **Composition.** Each row's Menu is the whole component, trigger and all, dropped into a cell: the trigger is Menu's default Button holding an icon and hidden words, and the items are links and a form.
- **Accessible & gatekept.** Every menu button is named Actions for Imogen Hartley, so a screen reader moving down the column knows whose actions each opens; the Avatar is hidden because the name is printed beside it, and the last column's header is read though not seen.

## Example.tsx

```tsx
"use client";

import { Avatar, Menu, Table } from "@loamui/core";
import "./example.css";

const MEMBERS = [
  {
    id: "imogen",
    name: "Imogen Hartley",
    role: "Steward, Lower Field",
    email: "imogen@hedgerow.example",
    phone: "01584 870101",
    tel: "+441584870101",
  },
  {
    id: "bryn",
    name: "Bryn Powell",
    role: "Head grower",
    email: "bryn@hedgerow.example",
    phone: "01584 870123",
    tel: "+441584870123",
  },
  {
    id: "sadia",
    name: "Sadia Rahman",
    role: "Seed librarian",
    email: "sadia@hedgerow.example",
    phone: "01584 870144",
    tel: "+441584870144",
  },
  {
    id: "tomos",
    name: "Tomos Ellis",
    role: "Open days coordinator",
    email: "tomos@hedgerow.example",
    phone: "01584 870162",
    tel: "+441584870162",
  },
  {
    id: "greta",
    name: "Greta Lindqvist",
    role: "Treasurer",
    email: "greta@hedgerow.example",
    phone: "01584 870187",
    tel: "+441584870187",
  },
];

export default function Example() {
  return (
    <Table className="users-table" highlightOnHover>
      <caption>The co-op&rsquo;s stewards and staff, with how to reach them.</caption>
      <thead>
        <tr>
          <Table.Th>Member</Table.Th>
          <Table.Th>Role</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Phone</Table.Th>
          <Table.Th>
            <span className="loam-VisuallyHidden">Actions</span>
          </Table.Th>
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
                {member.name}
              </span>
            </th>
            <td>{member.role}</td>
            <td>
              <a href={`mailto:${member.email}`}>{member.email}</a>
            </td>
            <td className="phone">
              <a href={`tel:${member.tel}`}>{member.phone}</a>
            </td>
            <td className="actions">
              <Menu.Root>
                <Menu.Trigger>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h.01M12 12h.01M19 12h.01" />
                  </svg>
                  <span className="loam-VisuallyHidden">Actions for {member.name}</span>
                </Menu.Trigger>
                <Menu.Popup>
                  <Menu.Item href={`/team/${member.id}/edit`}>Edit details</Menu.Item>
                  <Menu.Item href={`/team/${member.id}/role`}>Change role</Menu.Item>
                  <Menu.Separator />
                  <form method="post" action={`/team/${member.id}/remove`}>
                    <Menu.Item render={<button type="submit">Remove from team</button>} />
                  </form>
                </Menu.Popup>
              </Menu.Root>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
```

## example.css

```css
/* The Table's own element is the scroll wrapper, so it is this scope's
   root: the table and its cells are reachable, and the Avatars and the
   Menus inside are fenced by the donut. The Table already rules the rows
   and the header; this shapes three cells. */
@scope (.users-table) to ([class*="loam-"]) {
  /* The member is the row's header: read as the row, not as a figure,
     with the picture beside the name on one line. */
  tbody th {
    font-weight: 500;
    text-align: start;
  }

  span.member {
    align-items: center;
    display: block flex;
    gap: var(--loam-space-sm);
    white-space: nowrap;
  }

  /* A phone number is one token; it never breaks across lines. */
  td.phone {
    white-space: nowrap;
  }

  /* The actions column is as narrow as its button and sits at the end
     of the row; the Menu inside keeps its own styles. */
  td.actions {
    inline-size: 0;
    text-align: end;
  }

  /* The form is plumbing around the last item and has no box of its own. */
  form {
    margin: 0;
  }
}
```

