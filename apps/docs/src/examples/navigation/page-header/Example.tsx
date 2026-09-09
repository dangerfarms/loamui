"use client";

import { Badge, Breadcrumbs, Button, Time } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <header className="page-header" aria-labelledby="page-header-title">
      <Breadcrumbs.Root>
        <Breadcrumbs.Item href="/library">Seed library</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/library/tomatoes">Tomatoes</Breadcrumbs.Item>
        <Breadcrumbs.Item current>Gardener&rsquo;s Delight</Breadcrumbs.Item>
      </Breadcrumbs.Root>
      <div className="text">
        <h1 id="page-header-title">Gardener&rsquo;s Delight</h1>
        <p className="description">
          An open-pollinated cherry tomato, sweet and heavy-cropping, saved on the Lower Field plot
          since 2019 and offered to members every spring.
        </p>
        <ul className="meta">
          <li className="status">
            <Badge>Accepted into the library</Badge>
          </li>
          <li>
            Updated <Time value="2026-09-01" locale="en-GB" />
          </li>
          <li>Steward: Bryn Powell</li>
        </ul>
      </div>
      <div className="actions">
        <Button>Print label</Button>
        <span className="primary">
          <Button>Request seed</Button>
        </span>
      </div>
    </header>
  );
}
