---
title: Table with a sticky header
description: Twelve lines of seed stock in a Table capped in height, the column headers staying in view as the rows pass under them.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Table with a sticky header

Twelve lines of seed stock in a Table capped in height, the column headers staying in view as the rows pass under them.

An example in **Data display**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Table`
- Tags: table, sticky, scroll, stock, inventory, long list
- Live: https://loamui.com/examples/data-display/table-sticky-header

## Built to the pillars

- **Native CSS.** A real table with a caption and row headers; the header sticks with position: sticky on the header cells themselves, which is what the platform provides and what Table's stickyHeader asks of it, so nothing is cloned or measured.
- **Modern CSS.** The cap is Table's public --loam-table-block-size, one custom property declared on the Table from the example's scope; the header's surface and its edge are Table's own, so the example paints nothing.
- **Composition.** Table with stickyHeader, as core ships it: the Table's own element is the scroller, so the cap goes on it through the public property rather than on a wrapper of the example's, and no rule reaches a header cell; the edge round it is the example's div.
- **Accessible & gatekept.** A scroller that only a pointer can move is out of reach of a keyboard, so once the rows overflow the cap the Table makes itself a region named by its caption with a tab stop, and the focus ring marks it; the header cells stay readable as they stick because Table paints them an opaque surface.

## Example.tsx

```tsx
import { Table } from "@loamui/core";
import "./example.css";

const STOCK = [
  { variety: "Broad bean ‘Crimson Flowered’", type: "Legume", packets: 140, germination: 92 },
  { variety: "Beetroot ‘Bull’s Blood’", type: "Root", packets: 62, germination: 88 },
  { variety: "Kale ‘Ragged Jack’", type: "Brassica", packets: 18, germination: 90 },
  { variety: "Lettuce ‘Bronze Arrow’", type: "Salad", packets: 205, germination: 95 },
  { variety: "Tomato ‘Gardener’s Delight’", type: "Fruit", packets: 9, germination: 96 },
  { variety: "Squash ‘Crown Prince’", type: "Cucurbit", packets: 47, germination: 91 },
  { variety: "Pea ‘Alderman’", type: "Legume", packets: 88, germination: 93 },
  { variety: "Carrot ‘Chantenay Red Cored’", type: "Root", packets: 156, germination: 84 },
  { variety: "Leek ‘Musselburgh’", type: "Allium", packets: 71, germination: 89 },
  { variety: "Chard ‘Rainbow’", type: "Leaf", packets: 112, germination: 87 },
  { variety: "Sweet pea ‘Cupani’", type: "Flower", packets: 233, germination: 82 },
  { variety: "Calendula ‘Indian Prince’", type: "Flower", packets: 64, germination: 94 },
];

export default function Example() {
  return (
    <div className="table-sticky-header">
      <Table stickyHeader className="stock">
        <caption>
          Seed stock on 8 September 2026, all 12 lines: scroll the list and the header stays.
        </caption>
        <thead>
          <tr>
            <th scope="col">Variety</th>
            <th scope="col">Type</th>
            <th scope="col" className="number">
              In stock
            </th>
            <th scope="col" className="number">
              Germination
            </th>
          </tr>
        </thead>
        <tbody>
          {STOCK.map((row) => (
            <tr key={row.variety}>
              <th scope="row">{row.variety}</th>
              <td>{row.type}</td>
              <td className="number">{row.packets.toLocaleString("en")}</td>
              <td className="number">{row.germination}%</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
```

## example.css

```css
@scope (.table-sticky-header) to ([class*="loam-"]) {
  :scope {
    border: 1px solid var(--loam-color-line);
    border-radius: var(--loam-radius-md);
  }
}

@scope (.table-sticky-header .loam-Table) to ([class*="loam-"]) {
  :scope {
    --loam-table-block-size: 20rem;
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
}
```

