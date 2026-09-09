import { Avatar } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <button type="button" className="user-button">
      <Avatar
        name="Imogen Hartley"
        src="https://picsum.photos/seed/hedgerow-imogen/96/96"
        aria-hidden
      />
      <span className="text">
        <strong>Imogen Hartley</strong>
        <span>imogen@hedgerow.example</span>
      </span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m9 6 6 6-6 6" />
      </svg>
    </button>
  );
}
