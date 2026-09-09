import { Rating, Table } from "@loamui/core";
import "./example.css";

const VARIETIES = [
  { variety: "Broad bean ‘Crimson Flowered’", since: 2019, rating: 4.7, reviews: 212, again: 91 },
  { variety: "Beetroot ‘Bull’s Blood’", since: 2017, rating: 4.4, reviews: 158, again: 84 },
  { variety: "Kale ‘Ragged Jack’", since: 2021, rating: 4.1, reviews: 96, again: 72 },
  { variety: "Lettuce ‘Bronze Arrow’", since: 2018, rating: 4.6, reviews: 187, again: 88 },
  { variety: "Tomato ‘Gardener’s Delight’", since: 2015, rating: 4.8, reviews: 341, again: 95 },
  { variety: "Squash ‘Crown Prince’", since: 2020, rating: 4.3, reviews: 121, again: 79 },
];

export default function Example() {
  return (
    <Table className="table-reviews" highlightOnHover>
      <caption>
        Member reviews of the most-grown varieties, to 8 September 2026: the rating, the count, and
        how many would grow it again.
      </caption>
      <thead>
        <tr>
          <th scope="col">Variety</th>
          <th scope="col" className="number">
            Listed since
          </th>
          <th scope="col">Rating</th>
          <th scope="col" className="number">
            Reviews
          </th>
          <th scope="col" className="split">
            Would grow again
          </th>
        </tr>
      </thead>
      <tbody>
        {VARIETIES.map((row) => (
          <tr key={row.variety}>
            <th scope="row">{row.variety}</th>
            <td className="number">{row.since}</td>
            <td>
              <Rating readOnly label="Average rating" value={row.rating} />
            </td>
            <td className="number">{row.reviews.toLocaleString("en")}</td>
            <td className="split">
              <span className="yes">
                {row.again}%<span className="loam-VisuallyHidden"> would</span>
              </span>
              <div className="bar" aria-hidden="true">
                <span style={{ inlineSize: `${row.again}%` }} />
              </div>
              <span className="no">
                {100 - row.again}%<span className="loam-VisuallyHidden"> would not</span>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
