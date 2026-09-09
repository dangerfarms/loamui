import { Badge, Button, Card, Price } from "@loamui/core";
import "./example.css";

const PLANS = [
  {
    slug: "seedling",
    name: "Seedling",
    eyebrow: "Starter",
    description: "For a windowsill, a balcony or a first raised bed.",
    price: 24,
    features: [
      { text: "Six packets a year from the catalogue", included: true },
      { text: "Sowing calendar and growing guides", included: true },
      { text: "The seed-swap table at every open day", included: false },
      { text: "A bed on a member field", included: false },
    ],
  },
  {
    slug: "grower",
    name: "Grower",
    eyebrow: "Most popular",
    description: "For a household that sows most of what it eats.",
    price: 48,
    recommended: true,
    features: [
      { text: "Twelve packets a year from the catalogue", included: true },
      { text: "Sowing calendar and growing guides", included: true },
      { text: "The seed-swap table at every open day", included: true },
      { text: "A bed on a member field", included: false },
    ],
  },
  {
    slug: "plot-holder",
    name: "Plot-holder",
    eyebrow: "With a bed",
    description: "For a grower who wants ground of their own.",
    price: 120,
    features: [
      { text: "Twenty-four packets a year from the catalogue", included: true },
      { text: "Sowing calendar and growing guides", included: true },
      { text: "The seed-swap table at every open day", included: true },
      { text: "A ten square metre bed on a member field", included: true },
    ],
  },
];

export default function Example() {
  return (
    <ul className="pricing-table" role="list" aria-label="Membership plans">
      {PLANS.map((plan) => (
        <li key={plan.slug} className={plan.recommended ? "recommended" : undefined}>
          <Card
            render={<article className="plan" aria-labelledby={`pricing-table-${plan.slug}`} />}
          >
            <p className="eyebrow">
              <Badge>{plan.eyebrow}</Badge>
            </p>
            <h3 id={`pricing-table-${plan.slug}`}>{plan.name}</h3>
            <p className="description">{plan.description}</p>
            <p className="price">
              <Price value={plan.price} currency="GBP">
                a year
              </Price>
            </p>
            <ul className="features" role="list">
              {plan.features.map((feature) =>
                feature.included ? (
                  <li key={feature.text} className="feature">
                    {feature.text}
                  </li>
                ) : (
                  <li key={feature.text} className="exclusion">
                    <span className="loam-VisuallyHidden">Not included: </span>
                    <s>{feature.text}</s>
                  </li>
                ),
              )}
            </ul>
            <div className="actions">
              <Button>Choose {plan.name}</Button>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
