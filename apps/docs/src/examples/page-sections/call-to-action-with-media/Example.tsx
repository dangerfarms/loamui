import { SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section
      className="call-to-action-with-media"
      aria-labelledby="call-to-action-with-media-title"
    >
      <div className="inner">
        <div className="text">
          <h2 id="call-to-action-with-media-title">Sow along with us this spring</h2>
          <p className="lede">
            The sowing calendar tells you what to start each week, indoors or out, and the guide in
            every packet picks up where it leaves off.
          </p>
          <div className="actions">
            <SignpostLink href="/calendar">Open the sowing calendar</SignpostLink>
          </div>
        </div>
        <img
          className="media"
          src="https://picsum.photos/id/803/800/600"
          alt="Young plants growing on a bed of moss under the polytunnel lights"
          width="800"
          height="600"
        />
      </div>
    </section>
  );
}
