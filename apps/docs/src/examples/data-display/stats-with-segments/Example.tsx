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
