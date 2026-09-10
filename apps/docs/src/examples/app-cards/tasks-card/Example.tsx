"use client";

import { Avatar, Card, Progress, Time } from "@loamui/core";
import "./example.css";

const TEAM = [
  { name: "Nia Prosser", photo: 65 },
  { name: "Dafydd Rees", photo: 91 },
  { name: "Amara Okonkwo", photo: 375 },
  { name: "Tom Bradshaw", photo: 473 },
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
              src={`https://picsum.photos/id/${member.photo}/80/80`}
            />
          ))}
        </Avatar.Group>
      </div>
    </Card>
  );
}
