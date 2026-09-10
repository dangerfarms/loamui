import type { CSSProperties } from "react";
import { Table } from "@loamui/core";
import type { ComponentContent } from "@/renderer/types";
import { TableSortDemo } from "./table.client";

const rows = [
  { invoice: "INV-1024", status: "Paid", amount: "$1,240.00" },
  { invoice: "INV-1025", status: "Pending", amount: "$820.00" },
  { invoice: "INV-1026", status: "Paid", amount: "$2,010.00" },
  { invoice: "INV-1027", status: "Overdue", amount: "$640.00" },
];

const quarters = [
  {
    invoice: "INV-1024",
    status: "Paid",
    q1: "$310.00",
    q2: "$310.00",
    q3: "$310.00",
    q4: "$310.00",
    total: "$1,240.00",
  },
  {
    invoice: "INV-1025",
    status: "Pending",
    q1: "$205.00",
    q2: "$205.00",
    q3: "$205.00",
    q4: "$205.00",
    total: "$820.00",
  },
  {
    invoice: "INV-1026",
    status: "Paid",
    q1: "$502.50",
    q2: "$502.50",
    q3: "$502.50",
    q4: "$502.50",
    total: "$2,010.00",
  },
];

const ledger = [
  { invoice: "INV-1024", status: "Paid", amount: "$1,240.00" },
  { invoice: "INV-1025", status: "Pending", amount: "$820.00" },
  { invoice: "INV-1026", status: "Paid", amount: "$2,010.00" },
  { invoice: "INV-1027", status: "Overdue", amount: "$640.00" },
  { invoice: "INV-1028", status: "Paid", amount: "$1,575.00" },
  { invoice: "INV-1029", status: "Pending", amount: "$390.00" },
  { invoice: "INV-1030", status: "Paid", amount: "$2,860.00" },
  { invoice: "INV-1031", status: "Paid", amount: "$710.00" },
  { invoice: "INV-1032", status: "Overdue", amount: "$1,120.00" },
  { invoice: "INV-1033", status: "Pending", amount: "$455.00" },
  { invoice: "INV-1034", status: "Paid", amount: "$3,300.00" },
  { invoice: "INV-1035", status: "Paid", amount: "$980.00" },
];

const doc: ComponentContent = {
  slug: "table",
  lead: "A styled data table composed from native thead/tbody/tr/th/td markup.",
  importLine: `import { Table } from "@loamui/core";`,
  demos: [
    {
      title: "Basic usage",
      description:
        'Native table markup inside Table: a caption names it, th scope="col" marks the header cells, and the component styles what you write. Nothing is re-implemented.',
      code: `<Table>
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
    <tr><td>INV-1027</td><td>Overdue</td><td>$640.00</td></tr>
  </tbody>
</Table>`,
      render: () => (
        <div style={{ inlineSize: "100%", maxInlineSize: "32rem" }}>
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
              {rows.map((r) => (
                <tr key={r.invoice}>
                  <td>{r.invoice}</td>
                  <td>{r.status}</td>
                  <td>{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ),
    },
    {
      title: "Striped",
      description:
        "Shade alternating body rows. Stripes help the eye hold a row across many columns; on a short, narrow table like this one they are noise, so reach for them when rows are long, not by default.",
      code: `<Table striped>
  {/* caption / thead / tbody */}
</Table>`,
      render: () => (
        <div style={{ inlineSize: "100%", maxInlineSize: "32rem" }}>
          <Table striped>
            <caption>Invoices</caption>
            <thead>
              <tr>
                <th scope="col">Invoice</th>
                <th scope="col">Status</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.invoice}>
                  <td>{r.invoice}</td>
                  <td>{r.status}</td>
                  <td>{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ),
    },
    {
      title: "Column borders",
      description:
        "Draw vertical borders between columns. Padding already separates columns of short values; borders earn their place when cells hold text that wraps, or numbers that would otherwise run into their neighbours.",
      code: `<Table withColumnBorders>
  {/* caption / thead / tbody */}
</Table>`,
      render: () => (
        <div style={{ inlineSize: "100%", maxInlineSize: "32rem" }}>
          <Table withColumnBorders>
            <caption>Invoices</caption>
            <thead>
              <tr>
                <th scope="col">Invoice</th>
                <th scope="col">Status</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.invoice}>
                  <td>{r.invoice}</td>
                  <td>{r.status}</td>
                  <td>{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ),
    },
    {
      title: "Highlight on hover",
      description:
        "Shade the row under the pointer; the highlight appears on pointer hover, so it is not visible in a static screenshot.",
      code: `<Table highlightOnHover>
  {/* caption / thead / tbody */}
</Table>`,
      render: () => (
        <div style={{ inlineSize: "100%", maxInlineSize: "32rem" }}>
          <Table highlightOnHover>
            <caption>Invoices</caption>
            <thead>
              <tr>
                <th scope="col">Invoice</th>
                <th scope="col">Status</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.invoice}>
                  <td>{r.invoice}</td>
                  <td>{r.status}</td>
                  <td>{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ),
    },
    {
      title: "Search and sort",
      description:
        "A sortable column is a Table.Th carrying the current sort and a Table.SortButton inside it. The parts announce and style; you hold the state, filter and sort the rows, and pass the result back as sort.",
      code: `const [sort, setSort] = useState({ column: "name", direction: "ascending" });

<Table>
  <caption>People</caption>
  <thead>
    <tr>
      {columns.map((column) => (
        <Table.Th
          key={column.key}
          sort={sort.column === column.key ? sort.direction : "none"}
        >
          <Table.SortButton
            onSortChange={(direction) => setSort({ column: column.key, direction })}
          >
            {column.label}
          </Table.SortButton>
        </Table.Th>
      ))}
    </tr>
  </thead>
  <tbody>{sortedRows.map((row) => …)}</tbody>
</Table>`,
      render: () => <TableSortDemo />,
    },
    {
      title: "Wider than its container",
      description:
        "The table scrolls in place instead of stretching the page. Only once it actually overflows does the wrapper become a focusable region named by the caption, so Tab reaches it and the arrow keys scroll it; the same table in a wider container adds no tab stop. Without a caption the region is named by labels.scrollable.",
      code: `<Table>
  <caption>Invoices by quarter</caption>
  <thead>
    <tr>
      <th scope="col">Invoice</th>
      <th scope="col">Status</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
      <th scope="col">Q3</th>
      <th scope="col">Q4</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>INV-1024</td><td>Paid</td><td>$310.00</td><td>$310.00</td><td>$310.00</td><td>$310.00</td><td>$1,240.00</td></tr>
    …
  </tbody>
</Table>`,
      render: () => (
        <div style={{ inlineSize: "100%", maxInlineSize: "24rem" }}>
          <Table>
            <caption>Invoices by quarter</caption>
            <thead>
              <tr>
                <th scope="col">Invoice</th>
                <th scope="col">Status</th>
                <th scope="col">Q1</th>
                <th scope="col">Q2</th>
                <th scope="col">Q3</th>
                <th scope="col">Q4</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {quarters.map((r) => (
                <tr key={r.invoice}>
                  <td>{r.invoice}</td>
                  <td>{r.status}</td>
                  <td>{r.q1}</td>
                  <td>{r.q2}</td>
                  <td>{r.q3}</td>
                  <td>{r.q4}</td>
                  <td>{r.total}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ),
    },
    {
      title: "Sticky header",
      description:
        "A long table capped in height scrolls in place, and stickyHeader keeps the column names at the top of the scroller while the rows pass beneath. The cap is --loam-table-block-size on the component's own element, so no wrapper is needed; once the rows overflow it, the wrapper becomes the same focusable region as a wide table does, named by the caption. The header cells take an opaque surface and their own bottom edge, which travels with them.",
      code: `<Table stickyHeader style={{ "--loam-table-block-size": "14rem" }}>
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
    …
  </tbody>
</Table>`,
      render: () => (
        <div style={{ inlineSize: "100%", maxInlineSize: "32rem" }}>
          <Table stickyHeader style={{ "--loam-table-block-size": "14rem" } as CSSProperties}>
            <caption>Invoices</caption>
            <thead>
              <tr>
                <th scope="col">Invoice</th>
                <th scope="col">Status</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {ledger.map((r) => (
                <tr key={r.invoice}>
                  <td>{r.invoice}</td>
                  <td>{r.status}</td>
                  <td>{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ),
    },
    {
      title: "Caption below the table",
      description:
        "Caption placement is the platform's own caption-side property, set on the <table> through tableProps (or a class of your own).",
      code: `<Table tableProps={{ style: { captionSide: "bottom" } }}>
  <caption>Recent invoices by status</caption>
  {/* thead / tbody */}
</Table>`,
      render: () => (
        <div style={{ inlineSize: "100%", maxInlineSize: "32rem" }}>
          <Table tableProps={{ style: { captionSide: "bottom" } }}>
            <caption>Recent invoices by status</caption>
            <thead>
              <tr>
                <th scope="col">Invoice</th>
                <th scope="col">Status</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.invoice}>
                  <td>{r.invoice}</td>
                  <td>{r.status}</td>
                  <td>{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ),
    },
  ],
  whenToUse: [
    "To compare structured records across shared attributes: rows are things, columns are facts about them, and the grid is what makes scanning a column meaningful.",
    "When users need to run their eye down one attribute across many records: amounts, statuses, dates.",
  ],
  whenNotToUse: [
    "For page layout. A table announces row and column semantics to assistive tech, and non-tabular content wrapped in those semantics becomes a maze to navigate. Use CSS grid.",
    "For records with one attribute each. That is a list; a one-column table adds table navigation overhead for nothing.",
    "When each record is rich, heterogeneous content. A grid of Cards reads better than cells straining to hold paragraphs.",
  ],
  howItWorks: [
    {
      title: "The markup is yours: keep it semantic",
      body: 'Table styles native thead/tbody/tr/th/td and re-implements nothing, so whatever semantics you write are exactly what assistive tech receives. That cuts both ways: mark header cells <th scope="col"> (or scope="row" for row headers) so each data cell is announced with its headers, and never reach for a table where the content is not actually tabular.',
    },
    {
      title: "Wide tables scroll in place",
      body: "The component's own element is a scroll wrapper (overflow: auto), so an overflowing table scrolls horizontally within its own container instead of stretching the page; only when it actually overflows does the wrapper become a focusable, labelled region, so a page of narrow tables adds no tab stops. The same wrapper scrolls vertically once --loam-table-block-size caps it, and stickyHeader keeps the header row at the top of that scroll. className, ref and the rest land on that wrapper; the <table> takes tableProps. Whether a table should instead reflow into cards or lists on small screens is your layout call. The component keeps the table a table and makes overflow survivable.",
    },
    {
      title: "Sorting is announced as well as drawn",
      body: 'A sortable column is Table.Th with sort and a Table.SortButton inside it. The cell carries aria-sort, which is what assistive technology reads as the column\'s state, and the button\'s hidden text says what a press will do ("Name sort descending"), so the control is understood before it is pressed. The arrow is drawn by the stylesheet from that same aria-sort, so state is declared once. The component never sorts the data: onSortChange asks for ascending or descending, you sort the rows and pass the result back, and a column that is sortable but not sorted says so with sort="none".',
    },
    {
      title: "Caption every table",
      body: "A <caption> names the table in its own words: it is what screen readers announce when listing the page's tables, and what sighted users read to know whether to bother scanning. The platform's caption-side property places it above or below (tableProps={{ style: { captionSide: 'bottom' } }}); a heading near the table is not a substitute, because it is not programmatically attached.",
    },
  ],
  accessibility: [
    "Renders a native <table>: row and column navigation, header association and table announcement all come from the platform, provided your markup supplies th, scope and caption.",
    "Give every table a <caption>: it is the table's accessible name, announced when screen-reader users list or enter the table.",
    'Mark header cells with scope (<th scope="col"> in thead, <th scope="row"> for row headers) so data cells are read with their headers as context.',
    "The scroll wrapper keeps horizontal overflow inside the component, so zoomed-in and small-viewport users scroll the table, not the whole page.",
    'When the table overflows its container, the wrapper becomes a focusable role="region" so keyboard users can reach it and scroll; it is named by the table\'s own <caption> when there is one, and by labels.scrollable ("Scrollable table") otherwise. A table that fits adds no tab stop.',
    "striped and highlightOnHover are visual aids only: never encode meaning in row shading, because assistive tech does not announce it.",
    "A sortable header is a <th aria-sort> holding a real <button>, so it is reached by Tab and toggled with Enter or Space; the button's name is the column plus a hidden suffix saying what a press will do, and labels.sort replaces those words.",
  ],
  props: [
    {
      name: "striped",
      type: "boolean",
      description: "Shade alternating body rows.",
    },
    {
      name: "highlightOnHover",
      type: "boolean",
      description: "Highlight the row under the pointer.",
    },
    {
      name: "withColumnBorders",
      type: "boolean",
      description: "Draw vertical borders between columns.",
    },
    {
      name: "stickyHeader",
      type: "boolean",
      description:
        "Keep the header row in view while the body scrolls beneath it. The scroller is the component's own element: cap it with --loam-table-block-size (or the layout around it).",
    },
    {
      name: "tableProps",
      type: "TableHTMLAttributes & { ref }",
      description: "Attributes for the <table> itself (caption-side, ref, id).",
    },
    {
      name: "labels",
      type: "{ scrollable?: string }",
      default: `{ scrollable: "Scrollable table" }`,
      description: "The scroll region's name when the table overflows and has no <caption>.",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLDivElement> & { ref }",
      description:
        "All native <div> props land on the scroll wrapper, the component's own element.",
    },
  ],
  cssProps: [
    {
      name: "--loam-table-block-size",
      syntax: "CSS length | none",
      default: "none",
      description:
        "The most the scroll wrapper may grow to, as its max-block-size. Set it and a longer table scrolls in place, the wrapper becoming a focusable region named by the caption once the rows overflow; pair it with stickyHeader to keep the column names in view.",
    },
  ],
  parts: [
    {
      name: "Table.Th",
      description:
        'A header cell: <th scope="col"> by default (scope is forwarded for row headers). With sort it carries aria-sort and gives the SortButton inside it the current state. Must be inside a Table.',
      props: [
        {
          name: "sort",
          type: '"ascending" | "descending" | "none"',
          description:
            'The column\'s current sort, emitted as aria-sort. "none" marks a column that can be sorted but is not; omit it for a header that is not sortable.',
        },
      ],
    },
    {
      name: "Table.SortButton",
      description:
        "The control in a sortable header: a LoamUI Button that toggles the column's sort. Its children are the column name; native <button> props are forwarded. Must be inside a Table.Th with sort.",
      props: [
        {
          name: "onSortChange",
          type: '(next: "ascending" | "descending") => void',
          description:
            "Called with the sort a press asks for: ascending from none or descending, descending from ascending. Sort the rows and pass the result back as the Th's sort.",
        },
        {
          name: "labels",
          type: "{ sort?: (column: string, next: SortDirection) => string }",
          default: `{ sort: (column, next) => \` sort \${next}\` }`,
          description:
            "The hidden text after the column name that says what a press will do; column is the children when they are text.",
        },
      ],
    },
  ],
};

export default doc;
