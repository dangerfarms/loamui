import { SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="call-to-action" aria-labelledby="call-to-action-title">
      <h2 id="call-to-action-title">Ready to sow?</h2>
      <p className="lede">
        Order by Thursday and your packets are posted the same week, with a growing guide in every
        envelope.
      </p>
      <div className="actions">
        <SignpostLink href="/catalogue">Browse the catalogue</SignpostLink>
        <a href="/calendar">What to sow this month</a>
      </div>
    </section>
  );
}
