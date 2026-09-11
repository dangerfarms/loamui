"use client";

import { useId } from "react";
import { Avatar, Time } from "@loamui/core";
import "./example.css";

// The moment the distance is written against: a value the server and the
// browser share, never Date.now(), so both write the same words.
const NOW = "2026-09-08T09:00:00Z";

export default function Example() {
  const instanceId = useId();
  return (
    <article className="comment-html" aria-labelledby={`${instanceId}-comment-html-author`}>
      <header>
        <Avatar name="Tom Bradshaw" aria-hidden />
        <a id={`${instanceId}-comment-html-author`} className="author" href="/members/tom-bradshaw">
          Tom Bradshaw
        </a>
        <Time value="2026-09-06T18:12:00Z" locale="en-GB" relative={{ now: NOW }} />
      </header>
      <div className="body">
        <p>
          Good write-up. One thing I would add from the{" "}
          <a href="/guides/autumn-broad-beans">autumn broad bean guide</a>:{" "}
          <strong>sow a spare row</strong>, because the losses to mice are never even along the bed.
          What worked on our plot last year:
        </p>
        <ul>
          <li>A double row, 20 cm apart, with the seed 5 cm deep.</li>
          <li>Netting the day the shoots show, not the day after.</li>
          <li>A top dressing of leaf mould in February.</li>
        </ul>
      </div>
    </article>
  );
}
