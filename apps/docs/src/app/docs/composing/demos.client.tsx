"use client";

import type { CSSProperties } from "react";
import { Badge, Button, Card, SignpostLink } from "@loamui/core";
import "./composing.css";

/** A hero: element styles for the type, a scoped rule for the box, two LoamUI parts. */
export function HeroDemo() {
  return (
    <section className="demo-hero">
      <div style={{ "--loam-context": "primary" } as CSSProperties}>
        <Badge>New</Badge>
      </div>
      <h2>Modern UI primitives for agent-assisted developers.</h2>
      <p className="lede">
        Three primitives your agent builds from, steeped in UX best practice and checked by
        deterministic gates.
      </p>
      <div className="actions">
        <SignpostLink href="/docs">Get started</SignpostLink>
        <a href="https://github.com/dangerfarms/loamui">Star on GitHub</a>
      </div>
    </section>
  );
}

/** A pricing card: Card is the surface, a scoped rule adds the anatomy, context marks the plan. */
export function PlanDemo() {
  return (
    <Card className="demo-plan" style={{ "--loam-context": "primary" } as CSSProperties}>
      <h3>
        Team <Badge>Most popular</Badge>
      </h3>
      <p className="price">
        £24 <small>per seat, per month</small>
      </p>
      <ul>
        <li>Unlimited projects</li>
        <li>Shared component library</li>
        <li>Priority support</li>
      </ul>
      <Button>Choose Team</Button>
    </Card>
  );
}
