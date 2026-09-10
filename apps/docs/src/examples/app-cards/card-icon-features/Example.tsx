import { Badge, Button, Card, Price } from "@loamui/core";
import "./example.css";

// One stroked path per feature, drawn on a 24-unit grid in currentColor.
const FEATURES = [
  {
    name: "Six plants, hardened off",
    d: "M12 21V9M12 9C9 9 6 7 6 3c4 0 6 2 6 6zM12 13c0-4 2-6 6-6 0 4-3 6-6 6z",
  },
  {
    name: "Posted in the second week of May",
    d: "M2 7h11v9H2zM13 10h4l3 3v3h-7M5 19a2 2 0 1 0 .01 0M18 19a2 2 0 1 0 .01 0",
  },
  { name: "Peat-free compost", d: "M4 20h16M6 20V10l6-6 6 6v10M9 20v-4h6v4" },
  {
    name: "Raised from the co-op’s own seed",
    d: "M4 20c0-8 6-12 16-12-2 8-8 12-16 12zM4 20c4-4 8-6 12-8",
  },
];

export default function Example() {
  return (
    <Card
      render={<article className="card-icon-features" aria-labelledby="card-icon-features-title" />}
    >
      <img
        className="media"
        src="https://picsum.photos/id/530/800/500"
        alt="Succulents and young plants in a glass propagation case on the greenhouse bench"
        width="800"
        height="500"
      />
      <div className="head">
        <h3 id="card-icon-features-title">Tomato ‘Gardener’s Delight’ plant collection</h3>
        <p className="flag">
          <Badge>New for 2027</Badge>
        </p>
      </div>
      <p className="description">
        Six cordon plants, potted on twice and hardened off in the yard before they leave, so they
        go straight into a greenhouse border or a grow bag.
      </p>
      <ul className="features" role="list" aria-label="What you get">
        {FEATURES.map((feature) => (
          <li key={feature.name}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={feature.d} />
            </svg>
            {feature.name}
          </li>
        ))}
      </ul>
      <div className="foot">
        <p className="price">
          <Price value={18.5} currency="GBP" locale="en-GB">
            for six plants
          </Price>
        </p>
        <div className="actions">
          <Button>
            Add<span className="loam-VisuallyHidden"> the Gardener’s Delight collection</span> to
            basket
          </Button>
        </div>
      </div>
    </Card>
  );
}
