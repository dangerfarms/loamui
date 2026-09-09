import { Avatar, Time } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <div className="byline">
      <Avatar name="Nia Prosser" aria-hidden />
      <address>
        <a href="/growers/nia-prosser" rel="author">
          Nia Prosser
        </a>
      </address>
      <span>
        <Time value="2026-08-28" locale="en-GB" dateStyle="long" />
      </span>
      <span>
        Updated <Time value="2026-09-04" locale="en-GB" dateStyle="long" />
      </span>
      <span>6 min read</span>
    </div>
  );
}
