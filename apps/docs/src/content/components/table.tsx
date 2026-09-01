import { Table } from "@loamui/core";
import type { ComponentContent } from "@/renderer/types";

const rows = [
  { invoice: "INV-1024", status: "Paid", amount: "$1,240.00" },
  { invoice: "INV-1025", status: "Pending", amount: "$820.00" },
  { invoice: "INV-1026", status: "Paid", amount: "$2,010.00" },
  { invoice: "INV-1027", status: "Overdue", amount: "$640.00" },
];

const doc: ComponentContent = {
  slug: "table",
  lead: "A styled data table composed from native thead/tbody/tr/th/td markup.",
  importLine: `import { Table } from "@loamui/core";`,
  demos: [
    {
      title: "Basic",
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
      description: "Shade alternating body rows and add column borders.",
      code: `<Table striped withColumnBorders>
  {/* thead / tbody */}
</Table>`,
      render: () => (
        <div style={{ inlineSize: "100%", maxInlineSize: "32rem" }}>
          <Table striped withColumnBorders>
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
      description: "Rows highlight under the pointer; a caption labels the table.",
      code: `<Table highlightOnHover captionSide="bottom">
  <caption>Recent invoices by status</caption>
  {/* thead / tbody */}
</Table>`,
      render: () => (
        <div style={{ inlineSize: "100%", maxInlineSize: "32rem" }}>
          <Table highlightOnHover captionSide="bottom">
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
      body: "The table ships inside a scroll wrapper with overflow-inline: auto, so an overflowing table scrolls horizontally within its own container instead of stretching the page. Whether a table should instead reflow into cards or lists on small screens is your layout call. The component keeps the table a table and makes overflow survivable.",
    },
    {
      title: "Caption every table",
      body: "A <caption> names the table in its own words: it is what screen readers announce when listing the page's tables, and what sighted users read to know whether to bother scanning. captionSide places it above or below; a heading near the table is not a substitute, because it is not programmatically attached.",
    },
  ],
  accessibility: [
    "Renders a native <table>: row and column navigation, header association and table announcement all come from the platform, provided your markup supplies th, scope and caption.",
    "Give every table a <caption>: it is the table's accessible name, announced when screen-reader users list or enter the table.",
    'Mark header cells with scope (<th scope="col"> in thead, <th scope="row"> for row headers) so data cells are read with their headers as context.',
    "The scroll wrapper keeps horizontal overflow inside the component, so zoomed-in and small-viewport users scroll the table, not the whole page.",
    "striped and highlightOnHover are visual aids only: never encode meaning in row shading, because assistive tech does not announce it.",
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
      name: "captionSide",
      type: `"top" | "bottom"`,
      default: `"top"`,
      description: "Which side to place a <caption>.",
    },
    {
      name: "...others",
      type: "TableHTMLAttributes",
      description: "All native <table> props are forwarded.",
    },
  ],
};

export default doc;
