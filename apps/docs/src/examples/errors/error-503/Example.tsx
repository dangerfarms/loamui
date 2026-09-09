"use client";

import { Button } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="error-503" aria-labelledby="error-503-title">
      <p className="code">503</p>
      <h1 id="error-503-title">All our servers are busy</h1>
      <p className="description">
        More people are ordering seed than the shop can serve at once. Your basket is safe where it
        is: wait a minute, then refresh the page.
      </p>
      <div className="actions">
        <Button onClick={() => window.location.reload()}>Refresh the page</Button>
      </div>
    </section>
  );
}
