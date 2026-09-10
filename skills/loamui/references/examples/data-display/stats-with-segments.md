---
title: Share by segment
description: Device share as a Table: a row per device with its visits, its percentage and a Meter of that share, and the total in the foot, rather than one stacked bar that only colour could read.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Share by segment

Device share as a Table: a row per device with its visits, its percentage and a Meter of that share, and the total in the foot, rather than one stacked bar that only colour could read.

An example in **Data display**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Meter`, `Table`
- Tags: share, segments, breakdown, devices, analytics, meter
- Live: https://loamui.com/examples/data-display/stats-with-segments

## Built to the pillars

- **Native CSS.** A real table with a caption, column and row headers and a tfoot for the total; each share is a native meter, so the browser reports the value and the CSS only paints it.
- **Modern CSS.** The percentage sits at a fixed width in tabular figures so every bar starts on the same line and takes the rest of its cell; the figures are end-aligned to stack on their last digit.
- **Composition.** Table and Meter are dropped in as they come: the Table rules the rows and the header, the Meter its track and fill, and the example only lays the bar beside its figure.
- **Accessible & gatekept.** A stacked bar reads only by colour; a row per device says each share in text and as a named meter, and forced colours keep every bar because the Meter paints itself in system colours.

## Example.tsx

```tsx
import { Meter, Table } from "@loamui/core";
import "./example.css";

const SHARE = [
  { device: "Phone", visits: 14880, share: 62 },
  { device: "Laptop or desktop", visits: 6960, share: 29 },
  { device: "Tablet", visits: 2160, share: 9 },
];

const TOTAL = SHARE.reduce((sum, row) => sum + row.visits, 0);

export default function Example() {
  return (
    <Table className="stats-with-segments">
      <caption>How members reached the shop in August, by device.</caption>
      <thead>
        <tr>
          <th scope="col">Device</th>
          <th scope="col" className="number">
            Visits
          </th>
          <th scope="col" className="share">
            Share
          </th>
        </tr>
      </thead>
      <tbody>
        {SHARE.map((row) => (
          <tr key={row.device}>
            <th scope="row">{row.device}</th>
            <td className="number">{row.visits.toLocaleString("en")}</td>
            <td className="share">
              <span className="figure">{row.share}%</span>
              <Meter value={row.share} max={100} label={`${row.device}, share of visits`} />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">All devices</th>
          <td className="number">{TOTAL.toLocaleString("en")}</td>
          <td className="share">
            <span className="figure">100%</span>
          </td>
        </tr>
      </tfoot>
    </Table>
  );
}
```

## example.css

```css
@scope (.stats-with-segments) to ([class*="loam-"]) {
  th.number,
  td.number {
    text-align: end;
  }

  td.number {
    font-variant-numeric: lining-nums tabular-nums;
    white-space: nowrap;
  }

  tbody th,
  tfoot th {
    font-weight: 500;
    white-space: nowrap;
  }

  th.share {
    inline-size: 50%;
  }

  td.share {
    align-items: center;
    display: block flex;
    gap: var(--loam-space-sm);
    min-inline-size: 10rem;
  }

  span.figure {
    flex: none;
    font-variant-numeric: lining-nums tabular-nums;
    min-inline-size: 3.5ch;
    text-align: end;
  }

  tfoot td,
  tfoot th {
    border-block-end: 0;
    border-block-start: 1px solid var(--loam-color-line-strong);
    color: var(--loam-color-fg-strong);
    font-weight: 600;
  }
}
```

