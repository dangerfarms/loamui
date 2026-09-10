import { SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <div className="section-header">
      <div className="inner">
        <p className="eyebrow">Growing guides</p>
        <h2 id="section-header-title">Learn to grow from seed</h2>
        <p className="description">
          Short guides on sowing, pricking out and hardening off, written by the growers who supply
          the packets.
        </p>
        <div className="actions">
          <SignpostLink href="/guides">All guides</SignpostLink>
        </div>
      </div>
    </div>
  );
}
