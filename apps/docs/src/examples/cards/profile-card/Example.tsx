"use client";

import { useId, useState } from "react";
import { Avatar, Button, Card } from "@loamui/core";
import "./example.css";

export default function Example() {
  const name = useId();
  const [following, setFollowing] = useState(false);
  return (
    <Card render={<article className="profile-card" aria-labelledby={name} />}>
      <Avatar name="Imogen Hartley" src="https://picsum.photos/id/823/240/240" aria-hidden />
      <h2 id={name}>Imogen Hartley</h2>
      <p className="role">Steward, Lower Field plot</p>
      <dl className="stats">
        <div>
          <dt>Varieties saved</dt>
          <dd>38</dd>
        </div>
        <div>
          <dt>Seasons</dt>
          <dd>7</dd>
        </div>
        <div>
          <dt>Followers</dt>
          <dd>{following ? 213 : 212}</dd>
        </div>
      </dl>
      <div className="actions">
        <Button aria-pressed={following} onClick={() => setFollowing(!following)}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d={following ? "M5 12l4 4L19 6" : "M12 5v14M5 12h14"} />
          </svg>
          Follow
        </Button>
      </div>
    </Card>
  );
}
