---
title: Table
description: Display rows and columns of data.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Table

A styled data table composed from native thead/tbody/tr/th/td markup.

## Import

```tsx
import { Table } from "@loamui/core";
```

## Usage

### Basic

```tsx
<Table>
  <caption>Invoices</caption>
  <thead>
    <tr>
      <th scope="col">Invoice</th>
      <th scope="col">Status</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>INV-1024</td><td>Paid</td><td>$1,240.00</td></tr>
    <tr><td>INV-1025</td><td>Pending</td><td>$820.00</td></tr>
    <tr><td>INV-1026</td><td>Paid</td><td>$2,010.00</td></tr>
  </tbody>
</Table>
```

### Striped

Shade alternating body rows.

```tsx
<Table striped>
  {/* caption / thead / tbody */}
</Table>
```

### Column borders

Draw vertical borders between columns.

```tsx
<Table withColumnBorders>
  {/* caption / thead / tbody */}
</Table>
```

### Highlight on hover

Shade the row under the pointer; the highlight appears on pointer hover, so it is not visible in a static screenshot.

```tsx
<Table highlightOnHover>
  {/* caption / thead / tbody */}
</Table>
```

### Caption below the table

captionSide places the <caption> under the table instead of above it.

```tsx
<Table captionSide="bottom">
  <caption>Recent invoices by status</caption>
  {/* thead / tbody */}
</Table>
```

## When to use it

- To compare structured records across shared attributes: rows are things, columns are facts about them, and the grid is what makes scanning a column meaningful.
- When users need to run their eye down one attribute across many records: amounts, statuses, dates.

## When not to

- For page layout. A table announces row and column semantics to assistive tech, and non-tabular content wrapped in those semantics becomes a maze to navigate. Use CSS grid.
- For records with one attribute each. That is a list; a one-column table adds table navigation overhead for nothing.
- When each record is rich, heterogeneous content. A grid of Cards reads better than cells straining to hold paragraphs.

## How it works

### The markup is yours: keep it semantic

Table styles native thead/tbody/tr/th/td and re-implements nothing, so whatever semantics you write are exactly what assistive tech receives. That cuts both ways: mark header cells <th scope="col"> (or scope="row" for row headers) so each data cell is announced with its headers, and never reach for a table where the content is not actually tabular.

### Wide tables scroll in place

The table ships inside a scroll wrapper with overflow-inline: auto, so an overflowing table scrolls horizontally within its own container instead of stretching the page. Whether a table should instead reflow into cards or lists on small screens is your layout call. The component keeps the table a table and makes overflow survivable.

### Caption every table

A <caption> names the table in its own words: it is what screen readers announce when listing the page's tables, and what sighted users read to know whether to bother scanning. captionSide places it above or below; a heading near the table is not a substitute, because it is not programmatically attached.

## Accessibility

- Renders a native <table>: row and column navigation, header association and table announcement all come from the platform, provided your markup supplies th, scope and caption.
- Give every table a <caption>: it is the table's accessible name, announced when screen-reader users list or enter the table.
- Mark header cells with scope (<th scope="col"> in thead, <th scope="row"> for row headers) so data cells are read with their headers as context.
- The scroll wrapper keeps horizontal overflow inside the component, so zoomed-in and small-viewport users scroll the table, not the whole page.
- striped and highlightOnHover are visual aids only: never encode meaning in row shading, because assistive tech does not announce it.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `striped` | `boolean` | — | Shade alternating body rows. |
| `highlightOnHover` | `boolean` | — | Highlight the row under the pointer. |
| `withColumnBorders` | `boolean` | — | Draw vertical borders between columns. |
| `captionSide` | `"top" \| "bottom"` | `"top"` | Which side to place a <caption>. |
| `...others` | `TableHTMLAttributes` | — | All native <table> props are forwarded. |

