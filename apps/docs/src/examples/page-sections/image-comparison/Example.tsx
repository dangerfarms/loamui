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
          src="https://picsum.photos/id/59/1200/675"
          alt="The lower field in March, dry grass along the fence line"
          width="1200"
          height="675"
        />
      </div>
      <div className="after">
        <img
          src="https://picsum.photos/id/542/1200/675"
          alt="The same field in July, green to the horizon under a summer storm"
          width="1200"
          height="675"
        />
      </div>
      <Range
        aria-label="Reveal the field in July"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(event.currentTarget.valueAsNumber)}
      />
      <figcaption>
        The lower field at the nursery, March and July of the same year. Move the slider to compare.
      </figcaption>
    </figure>
  );
}
