import { Badge, Button, Card } from "@loamui/core";
import "./pricing.css";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "per month",
    blurb: "For one person trying things out.",
    features: ["1 project", "Community support", "Basic analytics"],
    cta: "Start for free",
  },
  {
    name: "Team",
    price: "$24",
    period: "per seat / month",
    blurb: "For small teams shipping together.",
    features: ["Unlimited projects", "Priority support", "Shared workspaces", "Audit log"],
    cta: "Choose Team",
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "billed annually",
    blurb: "For organisations with their own requirements.",
    features: ["Everything in Team", "SSO and SCIM", "Dedicated support", "Custom contracts"],
    cta: "Contact sales",
  },
];

export function PricingSection() {
  return (
    <section className="pricing" aria-labelledby="pricing-heading">
      <h2 id="pricing-heading">Plans and pricing</h2>
      <p className="lede">Start free, upgrade when the team grows. No card required.</p>
      <ul className="plans">
        {plans.map((plan) => (
          <li key={plan.name}>
            <Card className={plan.recommended ? "plan recommended" : "plan"}>
              <div className="head">
                <h3>{plan.name}</h3>
                {plan.recommended && <Badge>Recommended</Badge>}
              </div>
              <p className="price">
                {plan.price} <span>{plan.period}</span>
              </p>
              <p className="blurb">{plan.blurb}</p>
              <ul className="features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Button>{plan.cta}</Button>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
