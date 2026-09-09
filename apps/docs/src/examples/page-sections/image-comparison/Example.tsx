"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { Range } from "@loamui/core";
import "./example.css";

export default function Example() {
  const [position, setPosition] = useState(50);
  return (
    <figure className="image-comparison" style={{ "--_position": `${position}%` } as CSSProperties}>
      <div className="before">
        <img
          src="https://picsum.photos/seed/hedgerow-bed-march/1200/675"
          alt="A raised bed of bare, freshly dug soil in March"
          width="1200"
          height="675"
        />
      </div>
      <div className="after">
        <img
          src="https://picsum.photos/seed/hedgerow-bed-july/1200/675"
          alt="The same bed in July, full of chard, climbing beans and calendula"
          width="1200"
          height="675"
        />
      </div>
      <Range
        aria-label="Reveal the bed in July"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(event.currentTarget.valueAsNumber)}
      />
      <figcaption>
        One raised bed at the nursery, March and July of the same year. Move the slider to compare.
      </figcaption>
    </figure>
  );
}
