import { Avatar } from "@loamui/core";
import "./example.css";

const icon = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export default function Example() {
  return (
    <div className="user-info-with-icons">
      <Avatar
        name="Bryn Powell"
        src="https://picsum.photos/seed/hedgerow-bryn/200/200"
        aria-hidden
      />
      <div className="text">
        <h2>Bryn Powell</h2>
        <p className="role">Head grower</p>
        <dl>
          <div>
            <dt className="loam-VisuallyHidden">Email</dt>
            <dd>
              <svg {...icon}>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              <a href="mailto:bryn@hedgerow.example">bryn@hedgerow.example</a>
            </dd>
          </div>
          <div>
            <dt className="loam-VisuallyHidden">Phone</dt>
            <dd>
              <svg {...icon}>
                <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
              </svg>
              <a href="tel:+441584870123">01584 870123</a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
