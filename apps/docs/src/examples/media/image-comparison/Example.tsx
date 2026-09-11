"use client";

import { useId, useState } from "react";
import type { CSSProperties } from "react";
import { Range } from "@loamui/core";
import "./example.css";

export default function Example() {
  const controlId = useId();
  const [position, setPosition] = useState(50);
  return (
    <figure className="image-comparison" style={{ "--_position": `${position}%` } as CSSProperties}>
      <div className="before">
        <img
          src="https://picsum.photos/id/59/1200/675"
          alt="Black-and-white photograph of wooden fence posts and wire above long grass"
          width="1200"
          height="675"
        />
      </div>
      <div className="after">
        <img
          src="https://picsum.photos/id/59/1200/675"
          alt="The same fence photograph in colour: weathered brown posts above golden grass"
          width="1200"
          height="675"
        />
      </div>
      <label htmlFor={controlId}>Reveal the colour photograph</label>
      <Range
        id={controlId}
        aria-valuetext={`${position}% colour photograph`}
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(event.currentTarget.valueAsNumber)}
      />
      <p className="value" aria-hidden="true">
        {position}% colour
      </p>
      <figcaption>
        One photograph in black and white and colour. Move the slider to compare the treatments.
      </figcaption>
    </figure>
  );
}
