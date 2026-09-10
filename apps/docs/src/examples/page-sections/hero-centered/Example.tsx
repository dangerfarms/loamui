import { Badge, SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="hero-centered" aria-labelledby="hero-centered-title">
      <p className="eyebrow">
        <Badge>Membership</Badge>
        <span>From £3 a month</span>
      </p>
      <h1 id="hero-centered-title">Join the co-op that grows its own seed.</h1>
      <p className="lede">
        Members get first pick of every catalogue, a share of the seed we save each autumn and a
        vote on what the nursery grows next year.
      </p>
      <div className="actions">
        <SignpostLink href="/membership/join">Become a member</SignpostLink>
        <a href="/membership#tiers">Compare the tiers</a>
      </div>
    </section>
  );
}
