import type { ReactNode } from "react";
import { Card, Price } from "@loamui/core";
import "./example.css";

interface Stat {
  label: string;
  value: ReactNode;
  /** The change on August, as a whole percentage; negative is down. */
  change: number;
}

const STATS: Stat[] = [
  { label: "Sales", value: <Price value={24145} currency="GBP" locale="en-GB" />, change: 9 },
  { label: "Orders posted", value: "2,318", change: 12 },
  { label: "New members", value: "186", change: -4 },
  { label: "Seed swaps", value: "57", change: 31 },
];

export default function Example() {
  return (
    <div className="stats-with-diff" role="group" aria-label="September so far, against August">
      {STATS.map((stat) => {
        const up = stat.change >= 0;
        return (
          <Card key={stat.label} render={<dl className="stat" />}>
            <dt>{stat.label}</dt>
            <dd className="value">{stat.value}</dd>
            <dd className="diff" data-direction={up ? "up" : "down"}>
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={up ? "M3 11l5-5 5 5" : "M3 5l5 5 5-5"} />
              </svg>
              <span className="loam-VisuallyHidden">{up ? "Up" : "Down"}</span>{" "}
              <span className="change">{Math.abs(stat.change)}%</span> on August
            </dd>
          </Card>
        );
      })}
    </div>
  );
}
