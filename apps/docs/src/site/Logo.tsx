import Link from "next/link";
import "./Logo.css";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="site-Logo" aria-label="LoamUI home">
      <span className="mark" aria-hidden>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          {/* performance bolt */}
          <path d="M13 2 4 13.5h6L11 22l9-11.5h-6L13 2z" fill="currentColor" />
        </svg>
      </span>
      <span className="word">
        Loam<span className="ui">UI</span>
      </span>
    </Link>
  );
}
