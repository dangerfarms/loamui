---
title: Table with selection
description: This week's orders as a Table with a Checkbox per row and one in the header that selects them all, the selected rows tinted and their count read out in a status line.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Table with selection

This week's orders as a Table with a Checkbox per row and one in the header that selects them all, the selected rows tinted and their count read out in a status line.

An example in **Data display**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Checkbox`, `Price`, `Table`, `Time`
- Tags: table, selection, checkbox, bulk, orders, select all
- Live: https://loamui.com/examples/data-display/table-with-selection

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The boxes are native checkboxes, so Space toggles and a form would submit them; the header box is indeterminate when some rows are selected, which is the platform's own third state.
- **Modern CSS.** A selected row is detected with :has(input:checked) rather than declared with an attribute the page would have to keep in step; the figures are end-aligned in tabular numerals.
- **Composition.** Checkbox.Control is the bare box, named by aria-label because there is no room for a visible label in the cell; the page holds the set of selected ids and derives all and some from it.
- **Contextualism.** The tint is the primary soft token, so a region around the table re-answers it; the box, not the tint, is what says selected.
- **Accessible & gatekept.** Each box is named for its row, Select order HW-1042, and the header's is Select all orders; the count of selected rows is a status region, so a reader hears it change without leaving the table.

## Example.tsx

```tsx
"use client";

import { useState } from "react";
import { Checkbox, Price, Table, Time } from "@loamui/core";
import "./example.css";

const ORDERS = [
  { id: "HW-1042", member: "Mari Hughes", placed: "2026-09-08", items: 3, total: 14.6 },
  { id: "HW-1041", member: "Dafydd Rees", placed: "2026-09-08", items: 12, total: 41.2 },
  { id: "HW-1040", member: "Amara Okonkwo", placed: "2026-09-07", items: 1, total: 3.4 },
  { id: "HW-1039", member: "Tom Bradshaw", placed: "2026-09-07", items: 6, total: 22.8 },
  { id: "HW-1038", member: "Priya Natarajan", placed: "2026-09-05", items: 4, total: 11 },
  { id: "HW-1037", member: "Nia Prosser", placed: "2026-09-04", items: 8, total: 27.5 },
];

export default function Example() {
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());
  const all = selected.size === ORDERS.length;
  const some = selected.size > 0 && !all;

  const toggleAll = () => {
    setSelected(all ? new Set() : new Set(ORDERS.map((order) => order.id)));
  };
  const toggle = (id: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="table-with-selection">
      <Table className="orders" highlightOnHover>
        <caption>Orders placed this week, each with a box to select it.</caption>
        <thead>
          <tr>
            <th scope="col" className="select">
              <Checkbox.Control
                aria-label="Select all orders"
                checked={all}
                indeterminate={some}
                onChange={toggleAll}
              />
            </th>
            <th scope="col">Order</th>
            <th scope="col">Member</th>
            <th scope="col">Placed</th>
            <th scope="col" className="number">
              Items
            </th>
            <th scope="col" className="number">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {ORDERS.map((order) => (
            <tr key={order.id}>
              <td className="select">
                <Checkbox.Control
                  aria-label={`Select order ${order.id}`}
                  checked={selected.has(order.id)}
                  onChange={() => toggle(order.id)}
                />
              </td>
              <th scope="row">{order.id}</th>
              <td>{order.member}</td>
              <td>
                <Time value={order.placed} locale="en-GB" dateStyle="medium" />
              </td>
              <td className="number">{order.items}</td>
              <td className="number">
                <Price value={order.total} currency="GBP" locale="en-GB" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p className="status" role="status">
        {selected.size === 0
          ? "No orders selected."
          : `${selected.size} of ${ORDERS.length} orders selected.`}
      </p>
    </div>
  );
}
```

## example.css

```css
@scope (.table-with-selection) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    gap: var(--loam-space-sm);
  }

  p.status {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    font-variant-numeric: lining-nums tabular-nums;
    margin: 0;
  }
}

@scope (.table-with-selection div.orders) to ([class*="loam-"]) {
  /* Zero shrinks the column to its box. */
  th.select,
  td.select {
    inline-size: 0;
    padding-inline-end: 0;
  }

  th.number,
  td.number {
    text-align: end;
  }

  td.number {
    font-variant-numeric: lining-nums tabular-nums;
    white-space: nowrap;
  }

  tbody th {
    font-weight: 500;
    white-space: nowrap;
  }

  tbody tr:has(input:checked) {
    background: var(--loam-color-primary-soft);
  }
}
```

