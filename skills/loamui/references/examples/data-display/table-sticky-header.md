---
title: Table with a sticky header
description: Twelve lines of seed stock in a Table inside a scroller of fixed height, the column headers staying in view as the rows pass under them.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Table with a sticky header

Twelve lines of seed stock in a Table inside a scroller of fixed height, the column headers staying in view as the rows pass under them.

An example in **Data display**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Table`
- Tags: table, sticky, scroll, stock, inventory, long list
- Live: https://loamui.com/examples/data-display/table-sticky-header

## Built to the pillars

- **Native CSS.** A real table with a caption and row headers; the header sticks with position: sticky on the header cells themselves, which is what the platform provides, so nothing is cloned or measured.
- **Modern CSS.** The Table is capped in block-size with overscroll contained, so a wheel at its end does not carry the page away; the header's rule is a box-shadow, because a collapsed border does not travel with a sticky cell.
- **Composition.** The Table's own element is the scroller, so the example caps its height there rather than wrapping it: a sticky header sticks to the nearest scrollport, and a wrapper of its own would carry the header away with the rows; the edge round it is the example's div.
- **Accessible & gatekept.** A scroller that only a pointer can move is out of reach of a keyboard, so the Table is declared a region named by its caption with a tab stop, which is what the Table would measure for itself once it overflows, and the focus ring marks it.

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
      <Table
        className="stock"
        role="region"
        aria-labelledby="table-sticky-header-caption"
        tabIndex={0}
      >
        <caption id="table-sticky-header-caption">
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
/* The Table's own element is the scroller, so the height is capped on
   it: a sticky header sticks to the nearest scrollport, and a wrapper
   with a height of its own around the Table would leave the header
   sticking to a box that scrolls away with the rows. The example's own
   div draws the edge round the scroller, and sizing the Table is
   placement, not a change to its recipe. */
@scope (.table-sticky-header) to ([class*="loam-"]) {
  :scope {
    border: 1px solid var(--loam-color-line);
    border-radius: var(--loam-radius-md);
  }
}

/* The Table is a limit of the donut above, so its height and the header
   cells are reached from a second scope rooted at it. Sticky needs a
   background, since the rows pass under it, and its rule is a shadow: a
   collapsed border does not travel with a sticky cell. */
@scope (.table-sticky-header div.stock) to ([class*="loam-"]) {
  :scope {
    max-block-size: 20rem;
    overscroll-behavior: contain;
  }

  thead th {
    background: var(--loam-color-bg);
    box-shadow: 0 1px 0 var(--loam-color-line-strong);
    inset-block-start: 0;
    position: sticky;
  }

  th.number,
  td.number {
    text-align: end;
  }

  td.number {
    font-variant-numeric: lining-nums tabular-nums;
    white-space: nowrap;
  }

  /* A variety is a name: it holds one line and the table scrolls, rather
     than breaking mid-word to fit. */
  tbody th {
    font-weight: 500;
    white-space: nowrap;
  }
}
```

