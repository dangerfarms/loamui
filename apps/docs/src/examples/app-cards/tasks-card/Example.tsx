"use client";

import { Avatar, Card, Progress, Time } from "@loamui/core";
import "./example.css";

const TEAM = [
  { name: "Nia Prosser", seed: "hedgerow-nia" },
  { name: "Dafydd Rees", seed: "hedgerow-dafydd" },
  { name: "Amara Okonkwo", seed: "hedgerow-amara" },
  { name: "Tom Bradshaw", seed: "hedgerow-tom" },
];

export default function Example() {
  return (
    <Card render={<article className="tasks-card" aria-labelledby="tasks-card-title" />}>
      <p className="due">
        Due <Time value="2026-11-30" locale="en-GB" dateStyle="long" />
      </p>
      <h3 id="tasks-card-title">Spring catalogue 2027</h3>
      <p className="description">
        Every variety trialled this year written up, photographed and priced, ready for the printer
        in December.
      </p>
      <div className="progress">
        <Progress value={60} labels={{ value: (n) => `${n}% of tasks done` }}>
          Tasks done
        </Progress>
        <p className="count">
          12 <span>of 20</span>
        </p>
      </div>
      <div className="foot">
        <Avatar.Group more={3} aria-label="Working on this">
          {TEAM.map((member) => (
            <Avatar
              key={member.name}
              name={member.name}
              src={`https://picsum.photos/seed/${member.seed}/80/80`}
            />
          ))}
        </Avatar.Group>
      </div>
    </Card>
  );
}
