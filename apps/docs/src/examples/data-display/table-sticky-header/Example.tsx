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
