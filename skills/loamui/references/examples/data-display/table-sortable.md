---
title: Sortable table
description: The seed stock as a Table whose Variety, In stock and Price columns sort on a press, the rows sorted in the page's own state.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Sortable table

The seed stock as a Table whose Variety, In stock and Price columns sort on a press, the rows sorted in the page's own state.

An example in **Data display**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`, `Price`, `Table`
- Tags: table, sort, data, stock, inventory
- Live: https://loamui.com/examples/data-display/table-sortable

## Built to the pillars

- **Native CSS.** A real table with a caption, column headers and a row header per variety, so a cell is announced with the row and column it belongs to; the sort control is a button, not a header that happens to be clickable.
- **Modern CSS.** The figures are set end-aligned in tabular numerals so a column stacks on its last digit; the sort glyph is the Table's own, drawn from the aria-sort the header already carries.
- **Composition.** Table.Th carries the sort and Table.SortButton asks for the next one; the example sorts the rows in state and hands the result back, so the parts announce and style and the page decides the order.
- **Contextualism.** A short stock line wraps its Badge in a warning region, so Low takes the status colour from where it sits, not from a prop.
- **Accessible & gatekept.** Each sortable header carries aria-sort, and its button ends in hidden words that say what a press will do; the caption names the scroll region the Table becomes when it overflows.

## Example.tsx

```tsx
"use client";

import { useState } from "react";
import { Badge, Price, Table } from "@loamui/core";
import type { TableSortDirection } from "@loamui/core";
import "./example.css";

const STOCK = [
  { variety: "Broad bean ‘Crimson Flowered’", type: "Legume", packets: 140, price: 2.8 },
  { variety: "Beetroot ‘Bull’s Blood’", type: "Root", packets: 62, price: 2.4 },
  { variety: "Kale ‘Ragged Jack’", type: "Brassica", packets: 18, price: 2.6 },
  { variety: "Lettuce ‘Bronze Arrow’", type: "Salad", packets: 205, price: 2.2 },
  { variety: "Tomato ‘Gardener’s Delight’", type: "Fruit", packets: 9, price: 3 },
  { variety: "Squash ‘Crown Prince’", type: "Cucurbit", packets: 47, price: 3.4 },
];

type Column = "variety" | "packets" | "price";

interface Sort {
  column: Column;
  direction: TableSortDirection;
}

export default function Example() {
  const [sort, setSort] = useState<Sort>({ column: "variety", direction: "ascending" });

  const rows = [...STOCK].sort((a, b) => {
    const order =
      sort.column === "variety"
        ? a.variety.localeCompare(b.variety, "en")
        : a[sort.column] - b[sort.column];
    return sort.direction === "descending" ? -order : order;
  });

  const sortFor = (column: Column): TableSortDirection =>
    sort.column === column ? sort.direction : "none";
  const sortBy = (column: Column) => (direction: TableSortDirection) =>
    setSort({ column, direction });

  return (
    <Table className="table-sortable" highlightOnHover>
      <caption>Seed stock on 8 September 2026: packets on the shelf, by variety.</caption>
      <thead>
        <tr>
          <Table.Th sort={sortFor("variety")}>
            <Table.SortButton onSortChange={sortBy("variety")}>Variety</Table.SortButton>
          </Table.Th>
          <Table.Th>Type</Table.Th>
          <Table.Th sort={sortFor("packets")} className="number">
            <Table.SortButton onSortChange={sortBy("packets")}>In stock</Table.SortButton>
          </Table.Th>
          <Table.Th sort={sortFor("price")} className="number">
            <Table.SortButton onSortChange={sortBy("price")}>Price</Table.SortButton>
          </Table.Th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.variety}>
            <th scope="row">{row.variety}</th>
            <td>{row.type}</td>
            <td className="number">
              {row.packets.toLocaleString("en")}
              {row.packets < 20 && (
                <span className="low">
                  <Badge>Low</Badge>
                </span>
              )}
            </td>
            <td className="number">
              <Price value={row.price} currency="GBP" />
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
@scope (.table-sortable) to ([class*="loam-"]) {
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

  span.low {
    --loam-context: warning;

    margin-inline-start: var(--loam-space-sm);
  }
}
```

