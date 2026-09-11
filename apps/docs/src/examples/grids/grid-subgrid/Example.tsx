"use client";

import { useId } from "react";
import { Button, Card } from "@loamui/core";
import "./example.css";

const WORKSHOPS = [
  {
    slug: "seed-saving",
    title: "Seed saving",
    when: "Saturday 19 September, 10am",
    description:
      "Which crops to save from first, isolation distances, and cleaning, drying and storing what you gather. Bring a crop you want to keep.",
  },
  {
    slug: "grafting",
    title: "Grafting fruit trees",
    when: "Saturday 6 February, 10am",
    description:
      "Whip-and-tongue grafting onto local rootstocks. Everyone takes home two trees on the rootstock of their choice, labelled and wrapped.",
  },
  {
    slug: "winter-pruning",
    title: "Winter pruning",
    when: "Sunday 17 January, 1pm",
    description: "Apples and pears in the member orchard, in the cold, with a flask.",
  },
];

export default function Example() {
  const instanceId = useId();
  return (
    <ul className="grid-subgrid" role="list">
      {WORKSHOPS.map((workshop) => (
        <Card
          key={workshop.slug}
          render={
            <li
              className="workshop"
              aria-labelledby={`${instanceId}-grid-subgrid-${workshop.slug}`}
            />
          }
        >
          <div className="head">
            <h3 id={`${instanceId}-grid-subgrid-${workshop.slug}`}>{workshop.title}</h3>
            <p className="when">{workshop.when}</p>
          </div>
          <p className="description">{workshop.description}</p>
          <div className="actions">
            <Button>Book a place</Button>
          </div>
        </Card>
      ))}
    </ul>
  );
}
