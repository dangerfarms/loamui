"use client";

import { useId } from "react";
import { Badge, Card, SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  const instanceId = useId();
  return (
    <Card
      render={
        <article
          className="card-background-image"
          aria-labelledby={`${instanceId}-card-background-image-title`}
        />
      }
    >
      <img
        className="media"
        src="https://picsum.photos/id/33/900/600"
        alt=""
        width="900"
        height="600"
      />
      <div className="text">
        <p className="meta">
          <Badge>Members’ plots</Badge>
        </p>
        <h3 id={`${instanceId}-card-background-image-title`}>The walled garden after closing</h3>
        <p className="description">
          What the members who hold a plot inside the wall do with the hour after the gates shut,
          and why the co-op keeps that hour theirs.
        </p>
        <div className="actions">
          <SignpostLink href="/journal/walled-garden-after-closing">
            Read article
            <span className="loam-VisuallyHidden"> – The walled garden after closing</span>
          </SignpostLink>
        </div>
      </div>
    </Card>
  );
}
